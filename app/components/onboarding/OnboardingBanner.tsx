'use client';

import Link from 'next/link';
import { AlertCircle, ChevronRight, ShieldCheck, Truck, User2 } from 'lucide-react';
import type { OnboardingStep } from '@/app/types';

interface OnboardingBannerProps {
  role: 'shipper' | 'carrier';
  onboardingStep: OnboardingStep;
}

export default function OnboardingBanner({ role, onboardingStep }: OnboardingBannerProps) {
  if (onboardingStep === 'done') return null;

  const isCarrier = role === 'carrier';

  if (onboardingStep === 'profile') {
    const href = isCarrier ? '/carrier/profil-tamamla' : '/shipper/profil-tamamla';
    return (
      <Banner
        icon={User2}
        message="Profilinizi tamamlayarak platformu kullanmaya başlayın."
        cta="Profili Tamamla"
        href={href}
        variant={isCarrier ? 'orange' : 'navy'}
      />
    );
  }

  if (onboardingStep === 'documents') {
    const href = isCarrier
      ? '/carrier/belgeler?onboarding=1'
      : '/shipper/belgeler?onboarding=1';
    return (
      <Banner
        icon={ShieldCheck}
        message="Firma belgelerinizi demo olarak gönderin — sunumda Demo doğrula ile onay simüle edilir."
        cta="Belgeler"
        href={href}
        variant={isCarrier ? 'orange' : 'navy'}
      />
    );
  }

  if (onboardingStep === 'vehicle' && isCarrier) {
    return (
      <Banner
        icon={Truck}
        message="İlan verebilmek ve teklif gönderebilmek için en az bir araç eklemeniz gerekiyor."
        cta="Araç Ekle"
        href="/carrier/araclarim?onboarding=1"
        variant="orange"
      />
    );
  }

  return null;
}

function Banner({
  icon: Icon,
  message,
  cta,
  href,
  variant,
}: {
  icon: React.ComponentType<{ size?: number }>;
  message: string;
  cta: string;
  href: string;
  variant: 'orange' | 'navy';
}) {
  const styles =
    variant === 'orange'
      ? 'bg-orange-50 border-orange-200 text-orange-900'
      : 'bg-blue-50 border-blue-200 text-brand-dark';

  return (
    <div className={`mx-5 lg:mx-8 mt-4 p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center gap-3 ${styles}`}>
      <div className="flex items-start gap-3 flex-1">
        <AlertCircle size={20} className="shrink-0 mt-0.5" />
        <p className="text-sm font-semibold">{message}</p>
      </div>
      <Link
        href={href}
        className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-white shrink-0 ${
          variant === 'orange' ? 'bg-brand-orange' : 'bg-brand-dark'
        }`}
      >
        <Icon size={16} />
        {cta}
        <ChevronRight size={16} />
      </Link>
    </div>
  );
}
