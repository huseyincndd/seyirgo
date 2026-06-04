
'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { SessionProvider, useSession } from '../providers/SessionProvider';
import OnboardingBanner from '../components/onboarding/OnboardingBanner';
import { Loader2 } from 'lucide-react';

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, logout } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userType = user?.role ?? (pathname.startsWith('/carrier') ? 'carrier' : 'shipper');
  const userName = user ? `${user.firstName} ${user.lastName}` : 'Kullanıcı';
  const companyName = user?.companyTitle || 'Firma Adı';
  const onboardingStep = user?.onboarding.onboardingStep ?? 'done';
  const hasVehicle = user?.onboarding.hasVehicle ?? true;
  const profileCompleted = user?.onboarding.profileCompleted ?? true;
  const documentsSubmitted = user?.onboarding.documentsSubmitted ?? true;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-dark" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-800">
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 z-40">
        <Sidebar
          userType={userType}
          userName={userName}
          companyName={companyName}
          onClose={() => setIsMobileMenuOpen(false)}
          onLogout={logout}
          onboardingStep={onboardingStep}
          hasVehicle={hasVehicle}
          profileCompleted={profileCompleted}
          documentsSubmitted={documentsSubmitted}
        />
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-2xl">
            <Sidebar
              userType={userType}
              userName={userName}
              companyName={companyName}
              onClose={() => setIsMobileMenuOpen(false)}
              onLogout={logout}
              onboardingStep={onboardingStep}
              hasVehicle={hasVehicle}
              profileCompleted={profileCompleted}
              documentsSubmitted={documentsSubmitted}
            />
          </div>
        </div>
      )}

      <div className="lg:pl-[280px] min-h-screen flex flex-col">
          <DashboardHeader
            userType={userType}
            userName={userName}
            userEmail={user?.email}
            onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            isMobileMenuOpen={isMobileMenuOpen}
            onLogout={logout}
          />

        {user && (
          <OnboardingBanner role={user.role} onboardingStep={user.onboarding.onboardingStep} />
        )}

        <main className="flex-1 relative z-0">{children}</main>
      </div>
    </div>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SessionProvider>
      <DashboardShell>{children}</DashboardShell>
    </SessionProvider>
  );
}
