
'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardOnboarding from '../components/dashboard/DashboardOnboarding';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Kullanıcı tipini path'den belirle
  const userType: 'shipper' | 'carrier' = pathname.startsWith('/carrier') ? 'carrier' : 'shipper';

  return (
    <>
      <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-800">
        
        {/* Sidebar - Desktop (Fixed) */}
        <div className="hidden lg:block fixed left-0 top-0 bottom-0 z-40">
          <Sidebar 
            userType={userType} 
            userName="Mehmet Kaya"
            companyName="ABC Lojistik A.Ş."
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[60]">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* Sidebar Panel */}
            <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-2xl animate-in slide-in-from-left duration-300">
              <Sidebar 
                userType={userType}
                userName="Mehmet Kaya"
                companyName="ABC Lojistik A.Ş."
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Wrapper */}
        <div className="lg:pl-[280px] min-h-screen flex flex-col transition-all duration-300">
          
          {/* Header */}
          <DashboardHeader 
            userType={userType}
            userName="Mehmet Kaya"
            onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            isMobileMenuOpen={isMobileMenuOpen}
          />

          {/* Page Content */}
          <main className="flex-1 relative z-0">
            {children}
          </main>
        </div>

      </div>

      {/* Onboarding Tour */}
      <DashboardOnboarding userType={userType} />
    </>
  );
}
