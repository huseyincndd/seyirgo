'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User2, Building2, Save, Loader2, AlertCircle } from 'lucide-react';
import { apiFetch } from '@/lib/client-api';
import { useSession } from '@/app/providers/SessionProvider';
import type { UserRole } from '@/app/types';

interface ProfileCompletionFormProps {
  role: UserRole;
}

export default function ProfileCompletionForm({ role }: ProfileCompletionFormProps) {
  const router = useRouter();
  const { user, refresh } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    tcNo: '',
    birthYear: '',
    companyTitle: '',
    taxNo: '',
    taxOffice: '',
    address: '',
  });

  useEffect(() => {
    if (!user) return;
    setForm({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phone: user.phone ?? '',
      tcNo: user.tcNo ?? '',
      birthYear: user.birthYear ?? '',
      companyTitle: user.companyTitle ?? '',
      taxNo: user.taxNo ?? '',
      taxOffice: user.taxOffice ?? '',
      address: user.address ?? '',
    });
  }, [user]);

  const isCarrier = role === 'carrier';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await apiFetch('/api/users/me', {
      method: 'PATCH',
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.success) {
      setError(res.error ?? 'Güncelleme başarısız');
      return;
    }
    await refresh();
    router.refresh();
    router.push(
      role === 'carrier'
        ? '/carrier/belgeler?onboarding=1'
        : '/shipper/belgeler?onboarding=1'
    );
  };

  const required = [
    form.firstName,
    form.lastName,
    form.phone,
    form.companyTitle,
    form.taxNo,
    form.taxOffice,
    form.address,
  ];
  const progress = Math.round((required.filter((v) => v.trim()).length / 7) * 100);

  const inputCls =
    'w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-brand-dark font-semibold text-sm';
  const labelCls = 'block text-xs font-bold text-gray-500 uppercase mb-2';
  const btnClass = isCarrier ? 'bg-brand-orange hover:bg-[#e85f2f]' : 'bg-brand-dark hover:bg-[#003B7B]';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <span className={`text-xs font-bold uppercase ${isCarrier ? 'text-brand-orange' : 'text-brand-dark'}`}>
          Adım 1 — Profil
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-2">Profilinizi Tamamlayın</h1>
        <p className="text-slate-500 text-sm mt-2">
          {isCarrier
            ? 'Şirket bilgilerinizi tamamladıktan sonra araç ekleyeceksiniz.'
            : 'Yük ilanı verebilmek için bilgilerinizi doldurun.'}
        </p>
        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${isCarrier ? 'bg-brand-orange' : 'bg-brand-dark'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1">{progress}% tamamlandı</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6 shadow-sm">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <section className="space-y-4">
          <h2 className="text-sm font-black flex items-center gap-2">
            <User2 size={16} /> Kişisel Bilgiler
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Ad</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Soyad</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} className={inputCls} required />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Telefon</label>
              <input name="phone" value={form.phone} onChange={handleChange} className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>TC Kimlik (opsiyonel)</label>
              <input name="tcNo" value={form.tcNo} onChange={handleChange} className={inputCls} maxLength={11} />
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-4 border-t border-gray-100">
          <h2 className="text-sm font-black flex items-center gap-2">
            <Building2 size={16} /> Şirket Bilgileri
          </h2>
          <div>
            <label className={labelCls}>Şirket Ünvanı</label>
            <input name="companyTitle" value={form.companyTitle} onChange={handleChange} className={inputCls} required />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Vergi No</label>
              <input name="taxNo" value={form.taxNo} onChange={handleChange} className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Vergi Dairesi</label>
              <input name="taxOffice" value={form.taxOffice} onChange={handleChange} className={inputCls} required />
            </div>
          </div>
          <div>
            <label className={labelCls}>Fatura / İş Adresi</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows={3} className={inputCls} required />
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 ${btnClass}`}
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {role === 'carrier' ? 'Kaydet ve Araç Ekle' : 'Kaydet ve Panele Git'}
        </button>
      </form>
    </div>
  );
}
