import type { OnboardingStep, UserRole } from '@prisma/client';

export type AppRole = 'shipper' | 'carrier';
export type AppOnboardingStep = 'profile' | 'documents' | 'vehicle' | 'done';

export interface OnboardingState {
  profileCompleted: boolean;
  documentsSubmitted: boolean;
  documentsApproved: boolean;
  hasVehicle: boolean;
  onboardingStep: AppOnboardingStep;
}

export interface ProfileFields {
  firstName: string;
  lastName: string;
  phone: string;
  companyTitle: string;
  taxNo: string;
  taxOffice: string;
  address: string;
}

export function isProfileComplete(user: ProfileFields): boolean {
  return (
    user.firstName.trim().length > 0 &&
    user.lastName.trim().length > 0 &&
    user.phone.trim().length > 0 &&
    user.companyTitle.trim().length > 0 &&
    user.taxNo.trim().length > 0 &&
    user.taxOffice.trim().length > 0 &&
    user.address.trim().length > 0
  );
}

export function computeOnboarding(
  user: ProfileFields & { role: UserRole },
  vehicleCount: number,
  docStats: { submitted: boolean; approved: boolean }
): OnboardingState {
  const profileCompleted = isProfileComplete(user);

  if (!profileCompleted) {
    return {
      profileCompleted: false,
      documentsSubmitted: false,
      documentsApproved: false,
      hasVehicle: false,
      onboardingStep: 'profile',
    };
  }

  if (!docStats.submitted) {
    return {
      profileCompleted: true,
      documentsSubmitted: false,
      documentsApproved: false,
      hasVehicle: false,
      onboardingStep: 'documents',
    };
  }

  if (user.role === 'CARRIER' && vehicleCount === 0) {
    return {
      profileCompleted: true,
      documentsSubmitted: true,
      documentsApproved: docStats.approved,
      hasVehicle: false,
      onboardingStep: 'vehicle',
    };
  }

  return {
    profileCompleted: true,
    documentsSubmitted: true,
    documentsApproved: docStats.approved,
    hasVehicle: user.role === 'CARRIER' ? vehicleCount > 0 : true,
    onboardingStep: 'done',
  };
}

export function toPrismaOnboardingStep(step: AppOnboardingStep): OnboardingStep {
  switch (step) {
    case 'profile':
      return 'PROFILE';
    case 'documents':
      return 'DOCUMENTS';
    case 'vehicle':
      return 'VEHICLE';
    case 'done':
      return 'DONE';
  }
}

export function fromPrismaOnboardingStep(step: OnboardingStep): AppOnboardingStep {
  switch (step) {
    case 'PROFILE':
      return 'profile';
    case 'DOCUMENTS':
      return 'documents';
    case 'VEHICLE':
      return 'vehicle';
    case 'DONE':
      return 'done';
  }
}

export function toAppRole(role: UserRole): AppRole {
  return role === 'CARRIER' ? 'carrier' : 'shipper';
}

export function toPrismaRole(role: AppRole): UserRole {
  return role === 'carrier' ? 'CARRIER' : 'SHIPPER';
}

export function getDashboardPath(role: AppRole): string {
  return role === 'carrier' ? '/carrier' : '/shipper';
}

export function getProfileCompletionPath(role: AppRole): string {
  return role === 'carrier' ? '/carrier/profil-tamamla' : '/shipper/profil-tamamla';
}

export function getDocumentsPath(role: AppRole, withOnboardingQuery = false): string {
  const base = role === 'carrier' ? '/carrier/belgeler' : '/shipper/belgeler';
  return withOnboardingQuery ? `${base}?onboarding=1` : base;
}

export function getPostAuthRedirect(role: AppRole, onboarding: OnboardingState): string {
  if (!onboarding.profileCompleted) {
    return getProfileCompletionPath(role);
  }
  if (!onboarding.documentsSubmitted) {
    return getDocumentsPath(role, true);
  }
  if (role === 'carrier' && !onboarding.hasVehicle) {
    return '/carrier/araclarim?onboarding=1';
  }
  return getDashboardPath(role);
}

/** Taşıyıcı için araç zorunlu sayfalar */
export const CARRIER_VEHICLE_REQUIRED_PATHS = [
  '/carrier/ilan-ekle',
  '/carrier/uygun-yukler',
  '/carrier/ilanlarim',
];

/** Belgeler tamamlanmadan kilitli sayfalar */
export const CARRIER_DOCUMENTS_REQUIRED_PATHS = [
  ...CARRIER_VEHICLE_REQUIRED_PATHS,
  '/carrier/aktif-tasimalar',
  '/carrier/gecmis',
  '/carrier/kazanclar',
];

export const SHIPPER_DOCUMENTS_REQUIRED_PATHS = [
  '/shipper/yukler',
  '/shipper/yeni-ilan',
  '/shipper/aktif-tasimalar',
];
