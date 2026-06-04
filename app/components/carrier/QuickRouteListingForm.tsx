'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Truck,
  MapPin,
  Globe,
  Loader2,
  AlertCircle,
  Send,
  Plus,
  Calendar,
  Check,
  ChevronDown,
} from 'lucide-react';
import { apiFetch } from '@/lib/client-api';
import { CITIES } from '@/app/data/locations';
import type { Vehicle } from '@/app/types';
import type { SerializedCarrierListing } from '@/lib/carrier-listings/serialize';
import { RoutePreviewCard } from './RoutePreviewCard';

const POPULAR_CITIES = [
  'İstanbul',
  'Ankara',
  'İzmir',
  'Bursa',
  'Antalya',
  'Adana',
  'Konya',
  'Gaziantep',
  'Kocaeli',
  'Mersin',
];

const ALL_CITIES = [...new Set([...POPULAR_CITIES, ...CITIES])];

type DestinationMode = 'SPECIFIC_CITY' | 'TURKEY_WIDE';

export function QuickRouteListingForm() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [vehicleId, setVehicleId] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [destMode, setDestMode] = useState<DestinationMode>('SPECIFIC_CITY');
  const [destinationCity, setDestinationCity] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [note, setNote] = useState('');
  const [showExtras, setShowExtras] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const loadVehicles = useCallback(async () => {
    setLoadingVehicles(true);
    const res = await apiFetch<Vehicle[]>('/api/vehicles');
    if (res.success && res.data) {
      setVehicles(res.data);
      if (res.data.length === 1) setVehicleId(res.data[0].id);
    }
    setLoadingVehicles(false);
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const selectedVehicle = useMemo(
    () => vehicles.find((v) => v.id === vehicleId),
    [vehicles, vehicleId]
  );

  const previewTo = useMemo(() => {
    if (!originCity) return null;
    if (destMode === 'TURKEY_WIDE') return 'Türkiye geneli';
    return destinationCity || null;
  }, [originCity, destMode, destinationCity]);

  const canSubmit =
    vehicleId &&
    originCity &&
    (destMode === 'TURKEY_WIDE' || destinationCity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    setError(null);
    setFieldErrors({});

    const res = await apiFetch<SerializedCarrierListing>('/api/carrier/listings', {
      method: 'POST',
      body: JSON.stringify({
        vehicleId,
        originCity,
        destinationType: destMode,
        destinationCity: destMode === 'SPECIFIC_CITY' ? destinationCity : undefined,
        availableFrom: availableFrom || undefined,
        note: note.trim() || undefined,
      }),
    });

    setSaving(false);

    if (!res.success) {
      setError(res.error ?? 'İlan yayınlanamadı');
      if (res.errors) {
        const mapped: Record<string, string> = {};
        Object.entries(res.errors).forEach(([k, v]) => {
          mapped[k] = v[0] ?? '';
        });
        setFieldErrors(mapped);
      }
      return;
    }

    router.push('/carrier/ilanlarim?created=1');
    router.refresh();
  };

  if (loadingVehicles) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-3">
        <Loader2 className="animate-spin text-brand-orange" size={40} />
        <p className="text-sm font-semibold text-gray-400">Filonuz yükleniyor…</p>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/50 p-10 sm:p-14 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mx-auto mb-6">
          <Truck size={36} className="text-brand-orange" />
        </div>
        <h2 className="text-xl font-black text-slate-900">Önce bir araç ekleyin</h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Müsaitlik ilanı, filonuzdaki bir araca bağlanır.
        </p>
        <Link
          href="/carrier/araclarim"
          className="mt-8 inline-flex items-center gap-2 bg-brand-dark text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:opacity-95 transition-opacity"
        >
          <Plus size={20} />
          Araç ekle
        </Link>
      </div>
    );
  }

  const vehicleMeta = selectedVehicle
    ? `${selectedVehicle.brand ?? ''} ${selectedVehicle.model ?? ''} · ${selectedVehicle.type}`.trim()
    : undefined;

  return (
    <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8 lg:items-start">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 text-red-800 rounded-2xl text-sm border border-red-100">
            <AlertCircle size={20} className="shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Mobil önizleme */}
        <div className="lg:hidden">
          <RoutePreviewCard
            from={originCity || null}
            to={previewTo}
            isTurkeyWide={destMode === 'TURKEY_WIDE'}
            plate={selectedVehicle?.plate}
            vehicleMeta={vehicleMeta}
            compact
          />
        </div>

        {/* Araç */}
        <section className="bg-white rounded-3xl border border-gray-100/80 shadow-sm shadow-slate-200/40 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50/80 to-white">
            <StepLabel n={1} title="Hangi araç müsait?" />
          </div>
          <div className="p-4 pt-3 overflow-hidden">
            <div className="flex gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory py-2 px-1 -mx-1">
              {vehicles.map((v) => {
                const selected = vehicleId === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVehicleId(v.id)}
                    className={`snap-start shrink-0 w-[200px] max-w-[85vw] text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                      selected
                        ? 'border-brand-orange bg-gradient-to-br from-orange-50 to-white ring-2 ring-brand-orange/30 ring-offset-0'
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          selected ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <Truck size={18} />
                      </div>
                      {selected && (
                        <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center">
                          <Check size={14} strokeWidth={3} />
                        </span>
                      )}
                    </div>
                    <p className="font-black text-slate-900 tracking-wider mt-3 text-lg">
                      {v.plate}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                      {v.brand} {v.model}
                    </p>
                    <span
                      className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        selected
                          ? 'bg-brand-orange/15 text-brand-orange'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {v.type} · {v.capacityLabel ?? `${v.capacity} ton`}
                    </span>
                  </button>
                );
              })}
            </div>
            {fieldErrors.vehicleId && (
              <p className="text-xs text-red-600 mt-2 font-semibold">{fieldErrors.vehicleId}</p>
            )}
          </div>
        </section>

        {/* Güzergah */}
        <section className="bg-white rounded-3xl border border-gray-100/80 shadow-sm shadow-slate-200/40 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50/80 to-white">
            <StepLabel n={2} title="Nereye gidiyorsunuz?" />
          </div>
          <div className="p-5 space-y-5">
            <div>
              <label className={labelCls}>Kalkış noktası</label>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {POPULAR_CITIES.slice(0, 6).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setOriginCity(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      originCity === c
                        ? 'bg-brand-dark text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none"
                />
                <select
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  className={`${selectCls} pl-11 appearance-none`}
                  required
                >
                  <option value="">İl seçin…</option>
                  {ALL_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
              {fieldErrors.originCity && (
                <p className="text-xs text-red-600 mt-1.5 font-semibold">{fieldErrors.originCity}</p>
              )}
            </div>

            <div>
              <label className={labelCls}>Varış tercihi</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DestCard
                  active={destMode === 'SPECIFIC_CITY'}
                  onClick={() => setDestMode('SPECIFIC_CITY')}
                  icon={MapPin}
                  title="Belirli şehir"
                  desc="Tek hat · örn. Ankara → İzmir"
                  accent="dark"
                />
                <DestCard
                  active={destMode === 'TURKEY_WIDE'}
                  onClick={() => {
                    setDestMode('TURKEY_WIDE');
                    setDestinationCity('');
                  }}
                  icon={Globe}
                  title="Türkiye geneli"
                  desc="Kalkıştan her ile uygun"
                  accent="orange"
                />
              </div>

              {destMode === 'SPECIFIC_CITY' && (
                <div className="mt-3 relative animate-in fade-in slide-in-from-top-1 duration-200">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-orange pointer-events-none"
                  />
                  <select
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                    className={`${selectCls} pl-11 appearance-none`}
                    required
                  >
                    <option value="">Varış ili…</option>
                    {ALL_CITIES.filter((c) => c !== originCity).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              )}
              {fieldErrors.destinationCity && (
                <p className="text-xs text-red-600 mt-1.5 font-semibold">
                  {fieldErrors.destinationCity}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Opsiyonel - collapsible */}
        <section className="bg-white rounded-3xl border border-gray-100/80 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowExtras(!showExtras)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
          >
            <span className="text-sm font-bold text-gray-600">Ek bilgi (opsiyonel)</span>
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform ${showExtras ? 'rotate-180' : ''}`}
            />
          </button>
          {showExtras && (
            <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-50 pt-4">
              <div>
                <label className={labelCls}>
                  <Calendar size={12} className="inline mr-1 opacity-60" />
                  Müsaitlik tarihi
                </label>
                <input
                  type="date"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  className={selectCls}
                />
              </div>
              <div>
                <label className={labelCls}>Not</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Hafta içi, frigo…"
                  maxLength={300}
                  className={selectCls}
                />
              </div>
            </div>
          )}
        </section>

        <div className="lg:hidden sticky bottom-0 z-10 -mx-1 px-1 pt-2 pb-4 bg-gradient-to-t from-[#F8F9FC] via-[#F8F9FC] to-transparent">
          <SubmitButton saving={saving} disabled={!canSubmit} />
        </div>
        <div className="hidden lg:block">
          <SubmitButton saving={saving} disabled={!canSubmit} />
        </div>
      </form>

      {/* Desktop sticky preview */}
      <aside className="hidden lg:block sticky top-24 space-y-4">
        <RoutePreviewCard
          from={originCity || null}
          to={previewTo}
          isTurkeyWide={destMode === 'TURKEY_WIDE'}
          plate={selectedVehicle?.plate}
          vehicleMeta={vehicleMeta}
        />
        <p className="text-[11px] text-gray-400 text-center leading-relaxed px-2">
          İlan yayınlandığında yük verenler bu rotayı görür. Eşleşme önerileri yakında.
        </p>
      </aside>
    </div>
  );
}

function StepLabel({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-7 h-7 rounded-lg bg-brand-orange text-white text-xs font-black flex items-center justify-center shadow-sm">
        {n}
      </span>
      <h2 className="text-sm font-black text-slate-900">{title}</h2>
    </div>
  );
}

function DestCard({
  active,
  onClick,
  icon: Icon,
  title,
  desc,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  accent: 'dark' | 'orange';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 overflow-hidden ${
        active
          ? accent === 'orange'
            ? 'border-brand-orange bg-gradient-to-br from-orange-50 via-white to-white shadow-md shadow-orange-100/40'
            : 'border-brand-dark bg-gradient-to-br from-slate-50 via-white to-white shadow-md shadow-slate-200/50'
          : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
      }`}
    >
      {active && (
        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center">
          <Check size={12} strokeWidth={3} />
        </span>
      )}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
          active
            ? accent === 'orange'
              ? 'bg-brand-orange text-white'
              : 'bg-brand-dark text-white'
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        <Icon size={20} />
      </div>
      <p className="font-bold text-slate-900 text-sm pr-6">{title}</p>
      <p className="text-[11px] text-gray-500 mt-1 leading-snug">{desc}</p>
    </button>
  );
}

function SubmitButton({ saving, disabled }: { saving: boolean; disabled: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled || saving}
      className="w-full py-4 bg-gradient-to-r from-brand-orange to-orange-500 text-white font-black text-base rounded-2xl shadow-xl shadow-brand-orange/30 hover:shadow-brand-orange/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-45 disabled:shadow-none disabled:hover:scale-100 flex items-center justify-center gap-2.5 transition-all"
    >
      {saving ? (
        <>
          <Loader2 size={22} className="animate-spin" />
          Yayınlanıyor…
        </>
      ) : (
        <>
          <Send size={20} />
          İlanı yayınla
        </>
      )}
    </button>
  );
}

const labelCls = 'block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2';
const selectCls =
  'w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm font-semibold text-slate-800 outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 bg-white transition-shadow';
