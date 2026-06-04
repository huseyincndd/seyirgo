'use client';

import React from 'react';
import { ArrowRight, Globe, MapPin, Truck, Sparkles } from 'lucide-react';

interface RoutePreviewCardProps {
  from: string | null;
  to: string | null;
  isTurkeyWide: boolean;
  plate?: string;
  vehicleMeta?: string;
  compact?: boolean;
}

export function RoutePreviewCard({
  from,
  to,
  isTurkeyWide,
  plate,
  vehicleMeta,
  compact = false,
}: RoutePreviewCardProps) {
  const ready = Boolean(from && to);

  if (!from && !to && !plate) {
    return (
      <div
        className={`rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 ${compact ? 'p-5' : 'p-8'} text-center`}
      >
        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Sparkles size={24} className="text-gray-300" />
        </div>
        <p className="text-sm font-bold text-gray-400">Rota önizlemesi</p>
        <p className="text-xs text-gray-400 mt-1 max-w-[200px] mx-auto">
          Araç ve güzergah seçtikçe burada canlı görünür
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#002B5B] via-slate-900 to-slate-950 text-white shadow-xl ${compact ? 'p-5' : 'p-6'}`}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2" />

      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-4 relative">
        {ready ? 'İlan özeti' : 'Hazırlanıyor'}
      </p>

      <div className="relative space-y-0">
        <div className="flex gap-3">
          <div className="flex flex-col items-center pt-1">
            <div className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/30" />
            <div className="w-0.5 flex-1 min-h-[2rem] bg-gradient-to-b from-emerald-400/80 to-brand-orange/80 my-1" />
          </div>
          <div className="pb-4 flex-1 min-w-0">
            <p className="text-[10px] font-bold text-white/50 uppercase">Kalkış</p>
            <p className={`font-black truncate ${compact ? 'text-lg' : 'text-xl'}`}>
              {from || '—'}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className={`w-3 h-3 rounded-full ring-4 ${
                isTurkeyWide
                  ? 'bg-brand-orange ring-brand-orange/30'
                  : 'bg-brand-orange ring-brand-orange/30'
              }`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-white/50 uppercase">Varış</p>
            <div className="flex items-center gap-2">
              {isTurkeyWide ? (
                <Globe size={18} className="text-brand-orange shrink-0" />
              ) : (
                <MapPin size={18} className="text-brand-orange shrink-0" />
              )}
              <p className={`font-black truncate ${compact ? 'text-lg' : 'text-xl'}`}>
                {to || '—'}
              </p>
            </div>
            {isTurkeyWide && from && (
              <p className="text-xs text-brand-orange/90 font-semibold mt-1">
                {from} çıkışlı · Türkiye sınırları içi
              </p>
            )}
          </div>
        </div>
      </div>

      {plate && (
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3 relative">
          <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center shadow-lg shadow-brand-orange/30">
            <Truck size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-black tracking-wide">{plate}</p>
            {vehicleMeta && (
              <p className="text-[11px] text-white/60 truncate">{vehicleMeta}</p>
            )}
          </div>
          {ready && (
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full border border-emerald-500/30">
              Hazır
            </span>
          )}
        </div>
      )}

      {!ready && from && (
        <p className="text-xs text-white/40 mt-3 relative flex items-center gap-1">
          <ArrowRight size={12} />
          Varış seçimini tamamlayın
        </p>
      )}
    </div>
  );
}
