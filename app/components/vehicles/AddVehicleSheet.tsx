'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Truck,
  Sparkles,
  FileText,
  Ruler,
  Package,
} from 'lucide-react';
import { apiFetch } from '@/lib/client-api';
import { formatPlateInput } from '@/lib/vehicles/plate';
import {
  CAPACITY_PRESETS_TON,
  getTypeOption,
  getYearOptions,
  POPULAR_BRANDS,
  VEHICLE_TYPE_OPTIONS,
  BODY_TYPES,
  VEHICLE_FEATURES,
} from '@/lib/vehicles/constants';
import type { Vehicle } from '@/app/types';
import type { z } from 'zod';
import type { vehicleTypeEnum } from '@/lib/validations/vehicle';

type VehicleTypeValue = z.infer<typeof vehicleTypeEnum>;

export interface VehicleFormValues {
  plate: string;
  brand: string;
  model: string;
  year: string;
  type: VehicleTypeValue | '';
  bodyType: string;
  trailerType: string;
  capacity: string;
  length: string;
  width: string;
  height: string;
  volume: string;
  features: string[];
}

const EMPTY_FORM: VehicleFormValues = {
  plate: '',
  brand: '',
  model: '',
  year: '',
  type: '',
  bodyType: '',
  trailerType: '',
  capacity: '',
  length: '',
  width: '',
  height: '',
  volume: '',
  features: [],
};

const STEPS = [
  { id: 1, title: 'Kimlik', subtitle: 'Plaka ve marka' },
  { id: 2, title: 'Tip', subtitle: 'Kasa ve dorse' },
  { id: 3, title: 'Ölçüler', subtitle: 'Kapasite ve ebatlar' },
  { id: 4, title: 'Donanım', subtitle: 'Ek özellikler' },
  { id: 5, title: 'Onay', subtitle: 'Önizleme' },
] as const;

interface AddVehicleSheetProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (vehicle: Vehicle) => void;
  isOnboarding?: boolean;
}

export function AddVehicleSheet({
  open,
  onClose,
  onSuccess,
  isOnboarding = false,
}: AddVehicleSheetProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 'success'>(1);
  const [form, setForm] = useState<VehicleFormValues>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [createdVehicle, setCreatedVehicle] = useState<Vehicle | null>(null);

  const years = useMemo(() => getYearOptions(), []);
  const selectedType = form.type ? getTypeOption(form.type) : undefined;
  const capacityPresets = selectedType?.suggestedCapacities ?? CAPACITY_PRESETS_TON;

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setForm(EMPTY_FORM);
    setFieldErrors({});
    setGlobalError(null);
    setCreatedVehicle(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !saving) onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, saving]);

  if (!open) return null;

  const setField = <K extends keyof VehicleFormValues>(key: K, value: VehicleFormValues[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setFieldErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const toggleFeature = (feature: string) => {
    setForm((f) => {
      if (f.features.includes(feature)) {
        return { ...f, features: f.features.filter((x) => x !== feature) };
      }
      return { ...f, features: [...f.features, feature] };
    });
  };

  const validateStep = (s: number): boolean => {
    const err: Record<string, string> = {};
    if (s >= 1) {
      if (form.plate.replace(/\s/g, '').length < 5) err.plate = 'Geçerli plaka girin';
      if (form.brand.trim().length < 2) err.brand = 'Marka seçin veya yazın';
    }
    if (s >= 2) {
      if (!form.type) err.type = 'Araç tipi seçin';
    }
    if (s >= 3) {
      const cap = parseFloat(form.capacity.replace(',', '.'));
      if (!cap || cap <= 0) err.capacity = 'Kapasite girin';
    }
    setFieldErrors(err);
    return Object.keys(err).length === 0;
  };

  const goNext = () => {
    if (step === 1 && validateStep(1)) setStep(2);
    else if (step === 2 && validateStep(2)) setStep(3);
    else if (step === 3 && validateStep(3)) setStep(4);
    else if (step === 4) setStep(5);
  };

  const goBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
    else if (step === 5) setStep(4);
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    setSaving(true);
    setGlobalError(null);

    const capacityNum = parseFloat(form.capacity.replace(',', '.'));
    const lengthNum = form.length ? parseFloat(form.length.replace(',', '.')) : null;
    const widthNum = form.width ? parseFloat(form.width.replace(',', '.')) : null;
    const heightNum = form.height ? parseFloat(form.height.replace(',', '.')) : null;
    const volumeNum = form.volume ? parseFloat(form.volume.replace(',', '.')) : null;

    const res = await apiFetch<Vehicle>('/api/vehicles', {
      method: 'POST',
      body: JSON.stringify({
        plate: form.plate,
        brand: form.brand.trim(),
        model: form.model.trim() || undefined,
        year: form.year || undefined,
        type: form.type,
        capacity: capacityNum,
        capacityUnit: 'ton',
        bodyType: form.bodyType || undefined,
        trailerType: form.trailerType || undefined,
        length: lengthNum,
        width: widthNum,
        height: heightNum,
        volume: volumeNum,
        features: form.features,
        isActive: false, // Yeni araç belge yüklenene kadar inaktif kalır.
      }),
    });

    setSaving(false);

    if (!res.success) {
      setGlobalError(res.error ?? 'Araç eklenemedi');
      if (res.errors) {
        const mapped: Record<string, string> = {};
        Object.entries(res.errors).forEach(([k, v]) => {
          mapped[k] = v[0] ?? '';
        });
        setFieldErrors(mapped);
        if (mapped.plate || mapped.brand) setStep(1);
        else if (mapped.type) setStep(2);
        else if (mapped.capacity) setStep(3);
      }
      return;
    }

    if (res.data) {
      setCreatedVehicle(res.data);
      setStep('success');
      onSuccess(res.data);
    }
  };

  const typeLabel = selectedType?.label ?? '';
  const capacityDisplay = form.capacity ? `${form.capacity} ton` : '—';
  const volumeDisplay = form.volume ? `${form.volume} m³` : '—';

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-vehicle-title"
    >
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={() => !saving && step !== 'success' && onClose()}
      />

      <div className="relative w-full sm:max-w-lg max-h-[94vh] sm:max-h-[90vh] flex flex-col bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-dark to-slate-900 text-white px-5 pt-5 pb-4 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mb-1">
                {isOnboarding ? 'Kurulum · Adım 3' : 'Filo yönetimi'}
              </p>
              <h2 id="add-vehicle-title" className="text-xl font-black tracking-tight">
                {step === 'success' ? 'Araç eklendi' : 'Yeni araç ekle'}
              </h2>
              {step !== 'success' && (
                <p className="text-xs text-white/70 mt-0.5">
                  {STEPS.find((s) => s.id === step)?.subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50"
              aria-label="Kapat"
            >
              <X size={20} />
            </button>
          </div>

          {step !== 'success' && (
            <div className="flex gap-2 mt-4">
              {STEPS.map((s) => {
                const done = typeof step === 'number' && step > s.id;
                const active = step === s.id;
                return (
                  <div key={s.id} className="flex-1">
                    <div
                      className={`h-1.5 rounded-full transition-all ${done || active ? 'bg-brand-orange' : 'bg-white/20'}`}
                    />
                    <p
                      className={`text-[9px] font-bold mt-1.5 truncate ${active ? 'text-white' : 'text-white/40'}`}
                    >
                      {s.title}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 custom-scrollbar">
          {globalError && (
            <div className="mb-4 flex items-start gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              {globalError}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className={labelCls}>Plaka *</label>
                <input
                  autoFocus
                  value={form.plate}
                  onChange={(e) => setField('plate', formatPlateInput(e.target.value))}
                  placeholder="34 ABC 123"
                  className={`${inputCls} text-lg font-black tracking-widest text-center uppercase ${fieldErrors.plate ? errCls : ''}`}
                />
                {fieldErrors.plate && <p className={errTextCls}>{fieldErrors.plate}</p>}
                <p className="text-[11px] text-gray-400 mt-1.5 text-center">
                  Büyük harf otomatik uygulanır
                </p>
              </div>

              <div>
                <label className={labelCls}>Marka *</label>
                <input
                  value={form.brand}
                  onChange={(e) => setField('brand', e.target.value)}
                  placeholder="Örn. Mercedes-Benz"
                  className={`${inputCls} ${fieldErrors.brand ? errCls : ''}`}
                />
                {fieldErrors.brand && <p className={errTextCls}>{fieldErrors.brand}</p>}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {POPULAR_BRANDS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setField('brand', b)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                        form.brand === b
                          ? 'bg-brand-orange/10 border-brand-orange text-brand-orange'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Model</label>
                  <input
                    value={form.model}
                    onChange={(e) => setField('model', e.target.value)}
                    placeholder="Actros, FH..."
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Model yılı</label>
                  <select
                    value={form.year}
                    onChange={(e) => setField('year', e.target.value)}
                    className={`${inputCls} appearance-none bg-white`}
                  >
                    <option value="">Seçiniz</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className={labelCls}>Araç tipi *</label>
                <div className="grid grid-cols-2 gap-2">
                  {VEHICLE_TYPE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const selected = form.type === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setField('type', opt.value);
                          if (!form.capacity && opt.suggestedCapacities[1]) {
                            setField('capacity', String(opt.suggestedCapacities[1]));
                          }
                        }}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          selected
                            ? 'border-brand-orange bg-orange-50 shadow-sm'
                            : 'border-gray-100 hover:border-gray-200 bg-white'
                        }`}
                      >
                        <Icon
                          size={20}
                          className={selected ? 'text-brand-orange' : 'text-gray-400'}
                        />
                        <p className="text-sm font-bold text-slate-900 mt-2">{opt.label}</p>
                        <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                          {opt.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.type && <p className={errTextCls}>{fieldErrors.type}</p>}
              </div>

              <div>
                <label className={labelCls}>Kasa Tipi</label>
                <div className="flex flex-wrap gap-1.5">
                  {BODY_TYPES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setField('bodyType', b === form.bodyType ? '' : b)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        form.bodyType === b
                          ? 'bg-brand-dark text-white border-brand-dark shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls}>Römork / Dorse Tipi (Opsiyonel)</label>
                <input
                  value={form.trailerType}
                  onChange={(e) => setField('trailerType', e.target.value)}
                  placeholder="Örn. Mega, Optima, Jumbo..."
                  className={inputCls}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className={labelCls}>Maksimum Yük Kapasitesi (ton) *</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {capacityPresets.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setField('capacity', String(c))}
                      className={`min-w-[3rem] px-3 py-2 text-sm font-bold rounded-xl border transition-colors ${
                        form.capacity === String(c)
                          ? 'bg-brand-orange text-white border-brand-orange shadow-sm'
                          : 'border-gray-200 text-gray-700 hover:border-brand-orange/30 bg-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  inputMode="decimal"
                  value={form.capacity}
                  onChange={(e) => setField('capacity', e.target.value.replace(/[^\d.,]/g, ''))}
                  placeholder="Özel kapasite (örn: 15.5)"
                  className={`${inputCls} ${fieldErrors.capacity ? errCls : ''}`}
                />
                {fieldErrors.capacity && <p className={errTextCls}>{fieldErrors.capacity}</p>}
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Ruler size={16} className="text-gray-400" />
                  <h3 className="text-sm font-bold text-slate-800">Kasa Ölçüleri (Metre)</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Uzunluk</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={form.length}
                      onChange={(e) => setField('length', e.target.value.replace(/[^\d.,]/g, ''))}
                      placeholder="13.6"
                      className={`${inputCls} text-center`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Genişlik</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={form.width}
                      onChange={(e) => setField('width', e.target.value.replace(/[^\d.,]/g, ''))}
                      placeholder="2.45"
                      className={`${inputCls} text-center`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Yükseklik</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={form.height}
                      onChange={(e) => setField('height', e.target.value.replace(/[^\d.,]/g, ''))}
                      placeholder="2.7"
                      className={`${inputCls} text-center`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelCls}>Hacim (m³)</label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={form.volume}
                    onChange={(e) => setField('volume', e.target.value.replace(/[^\d.,]/g, ''))}
                    placeholder="Örn: 90"
                    className={`${inputCls} pl-10`}
                  />
                  <Package size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-2">
                <label className={labelCls}>Donanım ve Ek Özellikler</label>
                <span className="text-[10px] text-brand-orange font-bold px-2 py-0.5 bg-brand-orange/10 rounded-full">
                  Opsiyonel
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Aracınızın sahip olduğu donanımları seçmeniz, yük eşleşmelerinde sizi bir adım öne çıkaracaktır.
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {VEHICLE_FEATURES.map((feat) => {
                  const selected = form.features.includes(feat);
                  return (
                    <button
                      key={feat}
                      type="button"
                      onClick={() => toggleFeature(feat)}
                      className={`flex items-start gap-2 p-3 rounded-xl border-2 text-left transition-all ${
                        selected
                          ? 'border-brand-dark bg-slate-50 shadow-sm'
                          : 'border-gray-100 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <div className={`mt-0.5 shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        selected ? 'bg-brand-dark border-brand-dark' : 'bg-white border-gray-300'
                      }`}>
                        {selected && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span className={`text-xs font-bold leading-tight ${selected ? 'text-brand-dark' : 'text-slate-600'}`}>
                        {feat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3">
                <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Belge Onayı Gerekiyor</h4>
                  <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
                    Aracınız kaydedilecek ancak <strong>ruhsat ve sigorta</strong> belgeleri sisteme yüklenip onaylanana kadar <strong>pasif (inaktif)</strong> olarak listelenecektir.
                  </p>
                </div>
              </div>

              <VehiclePreviewCard
                plate={form.plate}
                brand={form.brand}
                model={form.model}
                year={form.year}
                typeLabel={typeLabel}
                capacityLabel={capacityDisplay}
                bodyType={form.bodyType}
                volume={volumeDisplay}
              />

              {form.features.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Seçili Donanımlar</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {form.features.map(f => (
                      <span key={f} className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'success' && createdVehicle && (
            <div className="text-center space-y-4 py-2 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 tracking-tight">{createdVehicle.plate}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {createdVehicle.brand} {createdVehicle.model}
                  {createdVehicle.year ? ` · ${createdVehicle.year}` : ''}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-left flex gap-3 mx-2">
                <FileText size={24} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-blue-900">Sonraki Adım: Belgeler</h4>
                  <p className="text-xs text-blue-800/80 leading-relaxed mt-1">
                    Aracınızın ilanlarda görünebilmesi için belgelerinin onaylanması gereklidir. Listeden aracınızı bulup demo belgeleri yükleyebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 py-4 border-t border-gray-100 bg-gray-50/80 flex gap-2">
          {step === 'success' ? (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 bg-brand-dark text-white font-bold text-sm rounded-xl hover:opacity-95 transition-all shadow-lg shadow-brand-dark/20"
            >
              Araçlarım'a Dön
            </button>
          ) : (
            <>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  disabled={saving}
                  className="px-4 py-3.5 border border-gray-200 bg-white rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <ChevronLeft size={18} className="inline -ml-0.5" />
                  <span className="hidden sm:inline ml-1">Geri</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="px-4 py-3.5 border border-gray-200 bg-white rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
              )}
              {step < 5 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex-1 py-3.5 bg-brand-orange text-white font-bold text-sm rounded-xl hover:opacity-95 flex items-center justify-center gap-1 shadow-lg shadow-brand-orange/20 transition-all active:scale-[0.98]"
                >
                  Devam
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saving}
                  className="flex-1 py-3.5 bg-brand-dark text-white font-bold text-sm rounded-xl hover:opacity-95 flex items-center justify-center gap-2 disabled:opacity-60 transition-all shadow-lg shadow-brand-dark/20"
                >
                  {saving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Aracı Kaydet
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </div>
  );
}

function VehiclePreviewCard({
  plate,
  brand,
  model,
  year,
  typeLabel,
  capacityLabel,
  bodyType,
  volume,
}: {
  plate: string;
  brand: string;
  model: string;
  year: string;
  typeLabel: string;
  capacityLabel: string;
  bodyType?: string;
  volume?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shrink-0">
          <Truck size={24} className="text-brand-orange" />
        </div>
        <div>
          <p className="text-xl font-black tracking-widest">{plate || '—'}</p>
          <p className="text-xs text-white/70 font-medium mt-0.5">
            {brand}
            {model ? ` · ${model}` : ''}
            {year ? ` · ${year}` : ''}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-gray-100">
        <PreviewCell label="Tip / Kasa" value={`${typeLabel || '—'}${bodyType ? ` (${bodyType})` : ''}`} />
        <PreviewCell label="Kapasite" value={capacityLabel} />
        <PreviewCell label="Hacim" value={volume || '—'} />
        <PreviewCell label="Durum" value="İnaktif (Belge Bekliyor)" valueClass="text-amber-600" />
      </div>
    </div>
  );
}

function PreviewCell({ label, value, valueClass = 'text-slate-800' }: { label: string; value: string, valueClass?: string }) {
  return (
    <div className="bg-white p-3.5">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className={`text-sm font-bold mt-1 ${valueClass}`}>{value}</p>
    </div>
  );
}

const labelCls = 'block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1';
const inputCls =
  'w-full px-4 py-3.5 border-2 border-gray-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-brand-dark focus:ring-4 focus:ring-brand-dark/10 transition-all bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder:text-gray-400 placeholder:font-medium';
const errCls = 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30';
const errTextCls = 'text-xs text-red-600 font-bold mt-1.5 ml-1';
