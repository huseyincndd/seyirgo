'use client';

import React from 'react';
import ProfileCompletionForm from '@/app/components/onboarding/ProfileCompletionForm';
import { useSession } from '@/app/providers/SessionProvider';
import { Loader2 } from 'lucide-react';

export default function CarrierProfilTamamlaPage() {
  const { user, loading } = useSession();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-orange" size={32} />
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-8 max-w-4xl mx-auto">
      <ProfileCompletionForm role="carrier" />
    </div>
  );
}
