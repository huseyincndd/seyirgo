import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';
import { registerSchema } from '@/lib/validations/auth';
import { jsonError, jsonOk } from '@/lib/api-response';
import {
  computeOnboarding,
  toPrismaOnboardingStep,
  toPrismaRole,
} from '@/lib/onboarding';
import { buildSessionPayload } from '@/lib/auth/user-session';
import { setSessionCookie } from '@/lib/auth/session';
import { getPostAuthRedirect } from '@/lib/onboarding';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

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
    const existing = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
    if (existing) {
      return jsonError('Bu e-posta adresi zaten kayıtlı.', 409);
    }

    const passwordHash = await hashPassword(data.password);
    const role = toPrismaRole(data.role);

    const userData = {
      email: data.email.toLowerCase(),
      passwordHash,
      role,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone.trim(),
      tcNo: data.tcNo?.trim() || null,
      birthYear: data.birthYear?.trim() || null,
      companyTitle: data.companyTitle.trim(),
      taxNo: data.taxNo.trim(),
      taxOffice: data.taxOffice.trim(),
      address: data.address.trim(),
      smsMarketing: data.smsMarketing ?? false,
    };

    const onboardingPreview = computeOnboarding(
      { ...userData, role },
      0,
      { submitted: false, approved: false }
    );

    const user = await prisma.user.create({
      data: {
        ...userData,
        profileCompleted: onboardingPreview.profileCompleted,
        profileCompletedAt: onboardingPreview.profileCompleted ? new Date() : null,
        onboardingStep: toPrismaOnboardingStep(onboardingPreview.onboardingStep),
      },
    });

    const sessionPayload = buildSessionPayload(user, 0);
    await setSessionCookie(sessionPayload);

    return jsonOk({
      user: {
        id: user.id,
        email: user.email,
        role: sessionPayload.role,
        firstName: user.firstName,
        lastName: user.lastName,
        onboarding: {
          profileCompleted: sessionPayload.profileCompleted,
          documentsSubmitted: sessionPayload.documentsSubmitted,
          documentsApproved: sessionPayload.documentsApproved,
          hasVehicle: sessionPayload.hasVehicle,
          onboardingStep: sessionPayload.onboardingStep,
        },
      },
      redirectTo: getPostAuthRedirect(sessionPayload.role, {
        profileCompleted: sessionPayload.profileCompleted,
        documentsSubmitted: sessionPayload.documentsSubmitted,
        documentsApproved: sessionPayload.documentsApproved,
        hasVehicle: sessionPayload.hasVehicle,
        onboardingStep: sessionPayload.onboardingStep,
      }),
    }, 201);
  } catch (error) {
    console.error('[register]', error);
    return jsonError('Kayıt sırasında bir hata oluştu.', 500);
  }
}
