import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth/require-session';
import { refreshUserSession } from '@/lib/auth/refresh-session';
import { profileUpdateSchema } from '@/lib/validations/profile';
import { jsonError, jsonOk } from '@/lib/api-response';
import { toAppRole, fromPrismaOnboardingStep } from '@/lib/onboarding';

export async function GET() {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  const user = await prisma.user.findUnique({
    where: { id: auth.session.userId },
    include: { _count: { select: { vehicles: true } } },
  });

  if (!user) return jsonError('Kullanıcı bulunamadı', 404);

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
    vehicleCount: user._count.vehicles,
    onboarding: {
      profileCompleted: user.profileCompleted,
      hasVehicle: user.role === 'CARRIER' ? user._count.vehicles > 0 : true,
      onboardingStep: fromPrismaOnboardingStep(user.onboardingStep),
    },
  });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  try {
    const body = await request.json();
    const parsed = profileUpdateSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString() ?? 'form';
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(issue.message);
      });
      return jsonError('Form doğrulama hatası', 400, fieldErrors);
    }

    const data = parsed.data;

    await prisma.user.update({
      where: { id: auth.session.userId },
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phone: data.phone.trim(),
        tcNo: data.tcNo?.trim() || null,
        birthYear: data.birthYear?.trim() || null,
        companyTitle: data.companyTitle.trim(),
        taxNo: data.taxNo.trim(),
        taxOffice: data.taxOffice.trim(),
        address: data.address.trim(),
      },
    });

    await refreshUserSession(auth.session.userId);

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: auth.session.userId },
      include: { _count: { select: { vehicles: true } } },
    });

    return jsonOk({
      message: 'Profil güncellendi',
      onboarding: {
        profileCompleted: user.profileCompleted,
        hasVehicle: user.role === 'CARRIER' ? user._count.vehicles > 0 : true,
        onboardingStep: fromPrismaOnboardingStep(user.onboardingStep),
      },
    });
  } catch (error) {
    console.error('[users/me PATCH]', error);
    return jsonError('Profil güncellenemedi', 500);
  }
}
