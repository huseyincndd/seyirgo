'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { UserDocumentsPanel } from '@/app/components/documents/UserDocumentsPanel';

export default function CarrierBelgelerPage() {
  const searchParams = useSearchParams();
  const [onboarding, setOnboarding] = useState(false);

  useEffect(() => {
    setOnboarding(searchParams.get('onboarding') === '1');
  }, [searchParams]);

  return (
    <div className="p-4 md:p-8">
      <UserDocumentsPanel role="carrier" onboarding={onboarding} />
    </div>
  );
}
