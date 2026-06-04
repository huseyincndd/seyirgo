import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth/password';
import { loginSchema } from '@/lib/validations/auth';
import { jsonError, jsonOk } from '@/lib/api-response';
import { buildSessionPayload } from '@/lib/auth/user-session';
import { setSessionCookie } from '@/lib/auth/session';
import { getPostAuthRedirect } from '@/lib/onboarding';
import { getUserDocumentStats } from '@/lib/documents-stats';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Geçersiz giriş bilgileri', 400);
    }

    const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { _count: { select: { vehicles: true } } },
    });

    if (!user) {
      return jsonError('E-posta veya şifre hatalı.', 401);
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return jsonError('E-posta veya şifre hatalı.', 401);
    }

    const docStats = await getUserDocumentStats(user.id, user.role);
    const sessionPayload = buildSessionPayload(user, user._count.vehicles, docStats);
    await setSessionCookie(sessionPayload);

    const redirectTo = getPostAuthRedirect(sessionPayload.role, {
      profileCompleted: sessionPayload.profileCompleted,
      documentsSubmitted: sessionPayload.documentsSubmitted,
      documentsApproved: sessionPayload.documentsApproved,
      hasVehicle: sessionPayload.hasVehicle,
      onboardingStep: sessionPayload.onboardingStep,
    });

    return jsonOk({
      user: {
        id: user.id,
        email: user.email,
        role: sessionPayload.role,
        firstName: user.firstName,
        lastName: user.lastName,
        companyTitle: user.companyTitle,
        onboarding: {
          profileCompleted: sessionPayload.profileCompleted,
          documentsSubmitted: sessionPayload.documentsSubmitted,
          documentsApproved: sessionPayload.documentsApproved,
          hasVehicle: sessionPayload.hasVehicle,
          onboardingStep: sessionPayload.onboardingStep,
        },
      },
      redirectTo,
    });
  } catch (error) {
    console.error('[login]', error);
    return jsonError('Giriş sırasında bir hata oluştu.', 500);
  }
}
