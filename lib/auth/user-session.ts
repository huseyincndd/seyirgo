import type { User } from '@prisma/client';
import { computeOnboarding, toAppRole } from '@/lib/onboarding';
import type { DocumentStats } from '@/lib/documents-stats';
import type { SessionPayload } from './session';

export function buildSessionPayload(
  user: User,
  vehicleCount: number,
  docStats: DocumentStats = { submitted: false, approved: false }
): SessionPayload {
  const onboarding = computeOnboarding(user, vehicleCount, docStats);

  return {
    userId: user.id,
    email: user.email,
    role: toAppRole(user.role),
    firstName: user.firstName,
    lastName: user.lastName,
    companyTitle: user.companyTitle,
    profileCompleted: onboarding.profileCompleted,
    documentsSubmitted: onboarding.documentsSubmitted,
    documentsApproved: onboarding.documentsApproved,
    hasVehicle: onboarding.hasVehicle,
    onboardingStep: onboarding.onboardingStep,
  };
}
