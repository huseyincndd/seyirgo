'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Megaphone } from 'lucide-react';
import { QuickRouteListingForm } from '@/app/components/carrier/QuickRouteListingForm';

export default function IlanEklePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8F9FC] pb-28 lg:pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-[#0a2540] to-slate-950 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-5 pt-6 pb-16 lg:pb-20">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <ArrowLeft size={16} />
            </span>
            Geri
          </button>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-brand-orange text-xs font-bold mb-4">
                <Megaphone size={14} />
                Müsaitlik ilanı
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Rota ilanı ver
              </h1>
              <p className="text-white/65 mt-3 text-sm sm:text-base leading-relaxed">
                Aracını seç, kalkış ve varışı belirle —{' '}
                <span className="text-white font-semibold">30 saniyede</span> yayında.
              </p>
            </div>

            <div className="flex gap-2 text-[11px] font-bold text-white/50 shrink-0">
              <ExamplePill from="Ankara" to="İstanbul" />
              <ExamplePill from="İzmir" to="Türkiye" wide />
            </div>
          </div>
        </div>
      </div>

      {/* Form card overlap */}
      <div className="relative max-w-5xl mx-auto px-5 -mt-10 lg:-mt-14">
        <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] border border-white shadow-2xl shadow-slate-300/20 p-4 sm:p-6 lg:p-8">
          <QuickRouteListingForm />
        </div>

        <p className="text-center mt-8 text-sm text-gray-400">
          Aktif ilanlarınız{' '}
          <Link
            href="/carrier/ilanlarim"
            className="font-bold text-brand-dark hover:text-brand-orange transition-colors"
          >
            İlanlarım
          </Link>
          {' '}sayfasında listelenir.
        </p>
      </div>
    </div>
  );
}

function ExamplePill({
  from,
  to,
  wide,
}: {
  from: string;
  to: string;
  wide?: boolean;
}) {
  return (
    <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
      <span className="text-white/80">{from}</span>
      <span className="text-brand-orange">→</span>
      <span className="text-white/80">{wide ? 'Geneli' : to}</span>
    </div>
  );
}
