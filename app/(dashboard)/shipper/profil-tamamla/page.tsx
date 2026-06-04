'use client';

import React from 'react';
import ProfileCompletionForm from '@/app/components/onboarding/ProfileCompletionForm';
import { useSession } from '@/app/providers/SessionProvider';
import { Loader2 } from 'lucide-react';

export default function ShipperProfilTamamlaPage() {
  const { loading } = useSession();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-dark" size={32} />
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-8 max-w-4xl mx-auto">
      <ProfileCompletionForm role="shipper" />
    </div>
  );
}
