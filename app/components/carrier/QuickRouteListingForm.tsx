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
  Map,
  Ban,
} from 'lucide-react';
import { apiFetch } from '@/lib/client-api';
import { COUNTRIES, COUNTRIES_WITH_CITIES, TURKEY_CITIES, TURKEY_REGIONS, DISTRICTS } from '@/app/data/locations';
import type { Vehicle } from '@/app/types';
import type { SerializedCarrierListing } from '@/lib/carrier-listings/serialize';
import { RoutePreviewCard } from './RoutePreviewCard';

type DestinationMode = 'SPECIFIC_LOCATION' | 'REGION' | 'TURKEY_WIDE' | 'INTERNATIONAL';

export function QuickRouteListingForm() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [vehicleId, setVehicleId] = useState('');
  
  // Origin states
  const [originCountry, setOriginCountry] = useState('Türkiye');
  const [originCity, setOriginCity] = useState('');
  const [originDistrict, setOriginDistrict] = useState('');

  // Destination states
  const [destMode, setDestMode] = useState<DestinationMode>('SPECIFIC_LOCATION');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [destinationDistrict, setDestinationDistrict] = useState('');
  const [destinationRegion, setDestinationRegion] = useState('');
  const [destinationExcludedRegions, setDestinationExcludedRegions] = useState<string[]>([]);

  // Extras
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
    switch (destMode) {
      case 'TURKEY_WIDE': return 'Türkiye Geneli';
      case 'REGION': return destinationRegion ? `${destinationRegion} Bölgesi` : 'Bölge Seçiniz';
      case 'SPECIFIC_LOCATION': return destinationCity ? `${destinationCity} / ${destinationDistrict || 'Merkez'}` : 'Şehir Seçiniz';
      case 'INTERNATIONAL': return destinationCountry ? `${destinationCountry} ${destinationCity ? `- ${destinationCity}` : ''}` : 'Ülke Seçiniz';
      default: return null;
    }
  }, [destMode, destinationCity, destinationDistrict, destinationRegion, destinationCountry]);

  const canSubmit = useMemo(() => {
    if (!vehicleId || !originCity || !originDistrict) return false;
    if (destMode === 'SPECIFIC_LOCATION' && !destinationCity) return false;
    if (destMode === 'REGION' && !destinationRegion) return false;
    if (destMode === 'INTERNATIONAL' && !destinationCountry) return false;
    return true;
  }, [vehicleId, originCity, originDistrict, destMode, destinationCity, destinationRegion, destinationCountry]);

  const toggleExcludedRegion = (reg: string) => {
    setDestinationExcludedRegions(prev => 
      prev.includes(reg) ? prev.filter(r => r !== reg) : [...prev, reg]
    );
  };

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
        originCountry,
        originCity,
        originDistrict,
        destinationType: destMode,
        destinationCountry: destMode === 'INTERNATIONAL' ? destinationCountry : undefined,
        destinationCity: (destMode === 'SPECIFIC_LOCATION' || destMode === 'INTERNATIONAL') ? destinationCity : undefined,
        destinationDistrict: destMode === 'SPECIFIC_LOCATION' ? destinationDistrict : undefined,
        destinationRegion: destMode === 'REGION' ? destinationRegion : undefined,
        destinationExcludedRegions: destMode === 'TURKEY_WIDE' ? destinationExcludedRegions : [],
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

        <div className="lg:hidden">
          <RoutePreviewCard
            from={originCity ? `${originCity} / ${originDistrict || 'Merkez'}` : null}
            to={previewTo}
            isTurkeyWide={destMode === 'TURKEY_WIDE'}
            plate={selectedVehicle?.plate}
            vehicleMeta={vehicleMeta}
            compact
          />
        </div>

        {/* Araç Seçimi */}
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
          </div>
        </section>

        {/* Kalkış Yeri */}
        <section className="bg-white rounded-3xl border border-gray-100/80 shadow-sm shadow-slate-200/40 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50/80 to-white">
            <StepLabel n={2} title="Kalkış Yeri" />
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Kalkış İli</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none" />
                  <select
                    value={originCity}
                    onChange={(e) => {
                      setOriginCity(e.target.value);
                      setOriginDistrict('');
                    }}
                    className={`${selectCls} pl-11`}
                    required
                  >
                    <option value="">İl seçin…</option>
                    {TURKEY_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className={labelCls}>Kalkış İlçesi</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none" />
                  <select
                    value={originDistrict}
                    onChange={(e) => setOriginDistrict(e.target.value)}
                    className={`${selectCls} pl-11`}
                    required
                    disabled={!originCity}
                  >
                    <option value="">İlçe seçin…</option>
                    {originCity && DISTRICTS[originCity]?.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            {fieldErrors.originCity && <p className="text-xs text-red-600 mt-1.5 font-semibold">{fieldErrors.originCity}</p>}
          </div>
        </section>

        {/* Varış Yeri */}
        <section className="bg-white rounded-3xl border border-gray-100/80 shadow-sm shadow-slate-200/40 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50/80 to-white">
            <StepLabel n={3} title="Nereye Gidiyorsunuz?" />
          </div>
          <div className="p-5 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <DestCard active={destMode === 'SPECIFIC_LOCATION'} onClick={() => setDestMode('SPECIFIC_LOCATION')} icon={MapPin} title="Belirli Konum" desc="Şehir/İlçe" />
              <DestCard active={destMode === 'REGION'} onClick={() => setDestMode('REGION')} icon={Map} title="Bölgeye" desc="Marmara, Ege vb." />
              <DestCard active={destMode === 'TURKEY_WIDE'} onClick={() => setDestMode('TURKEY_WIDE')} icon={Globe} title="Tüm Türkiye" desc="Hariç tutma var" />
              <DestCard active={destMode === 'INTERNATIONAL'} onClick={() => setDestMode('INTERNATIONAL')} icon={Globe} title="Yurtdışı" desc="Uluslararası" />
            </div>

            <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
              {destMode === 'SPECIFIC_LOCATION' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Varış İli</label>
                    <select
                      value={destinationCity}
                      onChange={(e) => {
                        setDestinationCity(e.target.value);
                        setDestinationDistrict('');
                      }}
                      className={selectCls}
                      required
                    >
                      <option value="">İl seçin…</option>
                      {TURKEY_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Varış İlçesi (Opsiyonel)</label>
                    <select
                      value={destinationDistrict}
                      onChange={(e) => setDestinationDistrict(e.target.value)}
                      className={selectCls}
                      disabled={!destinationCity}
                    >
                      <option value="">Tüm İlçeler</option>
                      {destinationCity && DISTRICTS[destinationCity]?.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {destMode === 'REGION' && (
                <div>
                  <label className={labelCls}>Hangi Bölge?</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(TURKEY_REGIONS).map((r: string) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setDestinationRegion(r)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                          destinationRegion === r
                            ? 'bg-brand-dark border-brand-dark text-white shadow-sm'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {destMode === 'TURKEY_WIDE' && (
                <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Ban size={16} className="text-amber-600" />
                    <p className="text-sm font-bold text-amber-900">Gitmek İstemediğiniz Bölgeler (Opsiyonel)</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(TURKEY_REGIONS).map((r: string) => {
                      const excluded = destinationExcludedRegions.includes(r);
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => toggleExcludedRegion(r)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            excluded
                              ? 'bg-red-50 border-red-200 text-red-700'
                              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {excluded && <Ban size={10} className="inline mr-1" />}
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {destMode === 'INTERNATIONAL' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Gidilecek Ülke</label>
                    <select
                      value={destinationCountry}
                      onChange={(e) => {
                        setDestinationCountry(e.target.value);
                        setDestinationCity('');
                      }}
                      className={selectCls}
                      required
                    >
                      <option value="">Ülke seçin…</option>
                      {COUNTRIES.filter((c: string) => c !== 'Türkiye').map((c: string) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Şehir (Opsiyonel)</label>
                    <select
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      className={selectCls}
                      disabled={!destinationCountry}
                    >
                      <option value="">Tüm Şehirler</option>
                      {destinationCountry && COUNTRIES_WITH_CITIES[destinationCountry]?.map((c: string) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Opsiyonel Ek Bilgiler */}
        <section className="bg-white rounded-3xl border border-gray-100/80 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowExtras(!showExtras)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
          >
            <span className="text-sm font-bold text-gray-600">Ek bilgi (opsiyonel)</span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${showExtras ? 'rotate-180' : ''}`} />
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

      <aside className="hidden lg:block sticky top-24 space-y-4">
        <RoutePreviewCard
          from={originCity ? `${originCity} / ${originDistrict || 'Merkez'}` : null}
          to={previewTo}
          isTurkeyWide={destMode === 'TURKEY_WIDE'}
          plate={selectedVehicle?.plate}
          vehicleMeta={vehicleMeta}
        />
        <p className="text-[11px] text-gray-400 text-center leading-relaxed px-2">
          İlan yayınlandığında eşleşme önerileri en yakın zamanda sunulacaktır.
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

function DestCard({ active, onClick, icon: Icon, title, desc }: { active: boolean; onClick: () => void; icon: React.ComponentType<{ size?: number; className?: string }>; title: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-3 rounded-2xl border-2 text-center transition-all duration-200 ${
        active
          ? 'border-brand-orange bg-orange-50 shadow-sm'
          : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
    >
      <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${active ? 'bg-brand-orange text-white' : 'bg-gray-100 text-gray-400'}`}>
        <Icon size={16} />
      </div>
      <p className="font-bold text-slate-900 text-[11px] sm:text-xs leading-tight mb-0.5">{title}</p>
      <p className="text-[9px] text-gray-500 leading-tight">{desc}</p>
    </button>
  );
}

function SubmitButton({ saving, disabled }: { saving: boolean; disabled: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled || saving}
      className="w-full py-4 bg-gradient-to-r from-brand-orange to-orange-500 text-white font-black text-base rounded-2xl shadow-xl shadow-brand-orange/30 hover:shadow-brand-orange/40 active:scale-[0.99] disabled:opacity-45 disabled:shadow-none disabled:hover:scale-100 flex items-center justify-center gap-2.5 transition-all"
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
const selectCls = 'w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm font-semibold text-slate-800 outline-none focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 bg-white transition-shadow appearance-none';
