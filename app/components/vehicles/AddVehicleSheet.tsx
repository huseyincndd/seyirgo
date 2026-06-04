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
} from 'lucide-react';
import { apiFetch } from '@/lib/client-api';
import { formatPlateInput } from '@/lib/vehicles/plate';
import {
  CAPACITY_PRESETS_TON,
  getTypeOption,
  getYearOptions,
  POPULAR_BRANDS,
  VEHICLE_TYPE_OPTIONS,
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
  capacity: string;
}

const EMPTY_FORM: VehicleFormValues = {
  plate: '',
  brand: '',
  model: '',
  year: '',
  type: '',
  capacity: '',
};

const STEPS = [
  { id: 1, title: 'Kimlik', subtitle: 'Plaka ve marka' },
  { id: 2, title: 'Özellikler', subtitle: 'Tip ve kapasite' },
  { id: 3, title: 'Onay', subtitle: 'Önizleme' },
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
  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1);
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

  const validateStep = (s: 1 | 2 | 3): boolean => {
    const err: Record<string, string> = {};
    if (s >= 1) {
      if (form.plate.replace(/\s/g, '').length < 5) err.plate = 'Geçerli plaka girin';
      if (form.brand.trim().length < 2) err.brand = 'Marka seçin veya yazın';
    }
    if (s >= 2) {
      if (!form.type) err.type = 'Araç tipi seçin';
      const cap = parseFloat(form.capacity.replace(',', '.'));
      if (!cap || cap <= 0) err.capacity = 'Kapasite girin';
    }
    setFieldErrors(err);
    return Object.keys(err).length === 0;
  };

  const goNext = () => {
    if (step === 1 && validateStep(1)) setStep(2);
    else if (step === 2 && validateStep(2)) setStep(3);
  };

  const goBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setSaving(true);
    setGlobalError(null);

    const capacityNum = parseFloat(form.capacity.replace(',', '.'));

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
        else if (mapped.type || mapped.capacity) setStep(2);
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
  const capacityDisplay = form.capacity ? `${form.capacity} ton` : 'â€”';

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
                      className={`h-1 rounded-full transition-all ${done || active ? 'bg-brand-orange' : 'bg-white/20'}`}
                    />
                    <p
                      className={`text-[9px] font-bold mt-1 truncate ${active ? 'text-white' : 'text-white/40'}`}
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
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {globalError && (
            <div className="mb-4 flex items-start gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              {globalError}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
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
                  <label className={labelCls}>Model yÄ±lÄ±</label>
                  <select
                    value={form.year}
                    onChange={(e) => setField('year', e.target.value)}
                    className={`${inputCls} appearance-none`}
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
            <div className="space-y-5">
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
                <label className={labelCls}>Yük kapasitesi (ton) *</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {capacityPresets.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setField('capacity', String(c))}
                      className={`min-w-[3rem] px-3 py-2 text-sm font-bold rounded-xl border transition-colors ${
                        form.capacity === String(c)
                          ? 'bg-brand-dark text-white border-brand-dark'
                          : 'border-gray-200 text-gray-700 hover:border-brand-dark/30'
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
                  placeholder="Özel kapasite"
                  className={`${inputCls} ${fieldErrors.capacity ? errCls : ''}`}
                />
                {fieldErrors.capacity && <p className={errTextCls}>{fieldErrors.capacity}</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Bilgileri kontrol edin. Kaydettikten sonra araç belgelerini demo olarak iletebilirsiniz.
              </p>
              <VehiclePreviewCard
                plate={form.plate}
                brand={form.brand}
                model={form.model}
                year={form.year}
                typeLabel={typeLabel}
                capacityLabel={capacityDisplay}
              />
            </div>
          )}

          {step === 'success' && createdVehicle && (
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} className="text-green-600" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900">{createdVehicle.plate}</p>
                <p className="text-sm text-gray-500">
                  {createdVehicle.brand} {createdVehicle.model}
                  {createdVehicle.year ? ` Â· ${createdVehicle.year}` : ''}
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-left flex gap-2">
                <FileText size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  Listede aracınızı açıp <strong>ruhsat</strong> ve <strong>sigorta</strong> için demo
                  belge butonlarını kullanın.
                </p>
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
              className="flex-1 py-3.5 bg-brand-dark text-white font-bold text-sm rounded-xl hover:opacity-95 transition-opacity"
            >
              Tamam
            </button>
          ) : (
            <>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  disabled={saving}
                  className="px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-white transition-colors disabled:opacity-50"
                >
                  <ChevronLeft size={18} className="inline -ml-0.5" />
                  Geri
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-white"
                >
                  Ä°ptal
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex-1 py-3.5 bg-brand-orange text-white font-bold text-sm rounded-xl hover:opacity-95 flex items-center justify-center gap-1 shadow-md shadow-brand-orange/20"
                >
                  Devam
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saving}
                  className="flex-1 py-3.5 bg-brand-dark text-white font-bold text-sm rounded-xl hover:opacity-95 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      AracÄ± kaydet
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
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
}: {
  plate: string;
  brand: string;
  model: string;
  year: string;
  typeLabel: string;
  capacityLabel: string;
}) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden">
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center">
          <Truck size={20} />
        </div>
        <div>
          <p className="text-lg font-black tracking-wide">{plate || 'â€”'}</p>
          <p className="text-xs text-white/70">
            {brand}
            {model ? ` Â· ${model}` : ''}
            {year ? ` Â· ${year}` : ''}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-gray-100">
        <PreviewCell label="Tip" value={typeLabel || 'â€”'} />
        <PreviewCell label="Kapasite" value={capacityLabel} />
      </div>
    </div>
  );
}

function PreviewCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-3">
      <p className="text-[10px] font-bold text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
    </div>
  );
}

const labelCls = 'block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5';
const inputCls =
  'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/10 transition-all';
const errCls = 'border-red-300 focus:border-red-400 focus:ring-red-100';
const errTextCls = 'text-xs text-red-600 font-medium mt-1';


