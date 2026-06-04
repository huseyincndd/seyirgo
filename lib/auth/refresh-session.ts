import { prisma } from '@/lib/prisma';
import { computeOnboarding, toPrismaOnboardingStep } from '@/lib/onboarding';
import { getUserDocumentStats } from '@/lib/documents-stats';
import { buildSessionPayload } from './user-session';
import { setSessionCookie } from './session';

/** Profil, belge veya araç değişikliğinden sonra oturumu güncelle */
export async function refreshUserSession(userId: string): Promise<void> {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: { _count: { select: { vehicles: true } } },
  });

  const docStats = await getUserDocumentStats(userId, user.role);
  const onboarding = computeOnboarding(user, user._count.vehicles, docStats);
  const profileCompleted = onboarding.profileCompleted;

  let documentStatus: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED' = 'NONE';
  if (docStats.approved) documentStatus = 'APPROVED';
  else if (docStats.submitted) documentStatus = 'PENDING';

  await prisma.user.update({
    where: { id: userId },
    data: {
      profileCompleted,
      profileCompletedAt: profileCompleted ? user.profileCompletedAt ?? new Date() : null,
      onboardingStep: toPrismaOnboardingStep(onboarding.onboardingStep),
      documentStatus,
      isVerified: docStats.approved,
    },
  });

  const updatedUser = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const payload = buildSessionPayload(updatedUser, user._count.vehicles, docStats);
  await setSessionCookie(payload);
}
