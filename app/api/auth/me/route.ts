import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { jsonError, jsonOk } from '@/lib/api-response';
import { toAppRole, fromPrismaOnboardingStep } from '@/lib/onboarding';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return jsonError('Oturum bulunamadı', 401);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { _count: { select: { vehicles: true } } },
  });

  if (!user) {
    return jsonError('Kullanıcı bulunamadı', 404);
  }

  return jsonOk({
    id: user.id,
    email: user.email,
    role: toAppRole(user.role),
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    tcNo: user.tcNo,
    birthYear: user.birthYear,
    companyTitle: user.companyTitle,
    taxNo: user.taxNo,
    taxOffice: user.taxOffice,
    address: user.address,
    isVerified: user.isVerified,
    subscriptionPlan: user.subscriptionPlan.toLowerCase(),
    vehicleCount: user._count.vehicles,
    onboarding: {
      profileCompleted: session.profileCompleted,
      documentsSubmitted: session.documentsSubmitted,
      documentsApproved: session.documentsApproved,
      hasVehicle: session.hasVehicle,
      onboardingStep: session.onboardingStep,
    },
  });
}
