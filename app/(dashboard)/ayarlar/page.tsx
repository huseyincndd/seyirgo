'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  User,
  Building2,
  Bell,
  Shield,
  Mail,
  Save,
  Check,
  AlertCircle,
  LogOut,
  ChevronRight,
  Loader2,
  ShieldCheck,
  FileText,
  Truck,
  Package,
} from 'lucide-react';
import { useSession } from '@/app/providers/SessionProvider';
import { apiFetch } from '@/lib/client-api';
import { getUserDisplayName, getUserInitials } from '@/lib/user-display';

const PLAN_LABELS: Record<string, string> = {
  free: 'Ücretsiz',
  standard: 'Standart',
  premium: 'Premium',
  business: 'Kurumsal',
};

export default function AyarlarPage() {
  const { user, loading, refresh, logout } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tcNo: '',
    birthYear: '',
  });

  const [companyData, setCompanyData] = useState({
    companyName: '',
    taxNo: '',
    taxOffice: '',
    address: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    newOffers: true,
    statusUpdates: true,
    marketing: false,
  });

  useEffect(() => {
    if (!user) return;
    setProfileData({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
      tcNo: user.tcNo ?? '',
      birthYear: user.birthYear ?? '',
    });
    setCompanyData({
      companyName: user.companyTitle ?? '',
      taxNo: user.taxNo ?? '',
      taxOffice: user.taxOffice ?? '',
      address: user.address ?? '',
    });
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const res = await apiFetch('/api/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        companyTitle: companyData.companyName,
        taxNo: companyData.taxNo,
        taxOffice: companyData.taxOffice,
        address: companyData.address,
      }),
    });
    setSaving(false);
    if (!res.success) {
      setError(res.error ?? 'Kaydedilemedi');
      return;
    }
    await refresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-dark" size={36} />
      </div>
    );
  }

  const isCarrier = user.role === 'carrier';
  const initials = getUserInitials(user.firstName, user.lastName);
  const displayName = getUserDisplayName(user.firstName, user.lastName);
  const docsPath = isCarrier ? '/carrier/belgeler' : '/shipper/belgeler';
  const planLabel = PLAN_LABELS[user.subscriptionPlan ?? 'free'] ?? 'Ücretsiz';
  const docsSubmitted = user.onboarding.documentsSubmitted;
  const docsApproved = user.onboarding.documentsApproved;

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'company', label: 'Şirket', icon: Building2 },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'account', label: 'Hesap', icon: Shield },
  ];

  const inputClass =
    'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/5 text-sm font-medium text-slate-800';
  const labelClass = 'block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5';

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-5 lg:px-8 py-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Ayarlar</h1>
            <p className="text-sm text-slate-500 mt-0.5">Hesap ve uygulama tercihlerinizi yönetin</p>
          </div>
          {saved && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-100 rounded-xl text-sm font-semibold">
              <Check size={16} /> Kaydedildi
            </div>
          )}
        </div>
      </header>

      <div className="p-5 lg:p-8 max-w-5xl mx-auto space-y-6">
        {/* Özet kart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row gap-5">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black shrink-0 ${isCarrier ? 'bg-brand-orange' : 'bg-brand-dark'}`}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-slate-900">{displayName}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${isCarrier ? 'bg-orange-50 text-brand-orange border-orange-100' : 'bg-blue-50 text-brand-dark border-blue-100'}`}
              >
                {isCarrier ? <Truck size={12} /> : <Package size={12} />}
                {isCarrier ? 'Taşıyıcı' : 'Yük veren'}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                {planLabel} plan
              </span>
              {user.isVerified ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
                  <ShieldCheck size={12} /> Doğrulanmış
                </span>
              ) : docsSubmitted ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                  Belgeler inceleniyor
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">
                  Doğrulama bekleniyor
                </span>
              )}
            </div>
          </div>
          <Link
            href={docsPath}
            className="self-start sm:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FileText size={16} />
            Belgelerim
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sekmeler */}
          <div className="lg:w-56 shrink-0">
            <nav className="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm flex lg:flex-col gap-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${active ? 'bg-brand-dark text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Icon size={17} className={active ? 'text-brand-orange' : 'text-gray-400'} />
                    {tab.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 whitespace-nowrap lg:mt-2 lg:border-t lg:border-gray-100 lg:pt-3"
              >
                <LogOut size={17} />
                Çıkış yap
              </button>
            </nav>
          </div>

          {/* İçerik */}
          <div className="flex-1 min-w-0">
            {error && (
              <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {activeTab === 'profile' && (
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h2 className="text-lg font-black text-slate-900">Profil bilgileri</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Ad</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Soyad</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>E-posta</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        disabled
                        className={`${inputClass} pl-10 bg-gray-50 text-gray-500 cursor-not-allowed`}
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">E-posta değişikliği için destek ile iletişime geçin.</p>
                  </div>
                  <div>
                    <label className={labelClass}>Telefon</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="5XX XXX XX XX"
                      className={inputClass}
                    />
                  </div>
                  {profileData.tcNo && (
                    <div>
                      <label className={labelClass}>TC Kimlik No</label>
                      <input type="text" value={profileData.tcNo} disabled className={`${inputClass} bg-gray-50 text-gray-500`} />
                    </div>
                  )}
                  {profileData.birthYear && (
                    <div>
                      <label className={labelClass}>Doğum yılı</label>
                      <input type="text" value={profileData.birthYear} disabled className={`${inputClass} bg-gray-50 text-gray-500`} />
                    </div>
                  )}
                </div>
                <SaveBar saving={saving} onSave={handleSave} />
              </section>
            )}

            {activeTab === 'company' && (
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h2 className="text-lg font-black text-slate-900">Şirket bilgileri</h2>
                <p className="text-sm text-gray-500 -mt-2">Fatura ve resmi evraklar için kullanılır.</p>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Şirket ünvanı</label>
                    <input
                      type="text"
                      value={companyData.companyName}
                      onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Vergi no</label>
                      <input
                        type="text"
                        value={companyData.taxNo}
                        onChange={(e) => setCompanyData({ ...companyData, taxNo: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Vergi dairesi</label>
                      <input
                        type="text"
                        value={companyData.taxOffice}
                        onChange={(e) => setCompanyData({ ...companyData, taxOffice: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Adres</label>
                    <textarea
                      value={companyData.address}
                      onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
                <SaveBar saving={saving} onSave={handleSave} />
              </section>
            )}

            {activeTab === 'notifications' && (
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                <h2 className="text-lg font-black text-slate-900">Bildirim tercihleri</h2>
                <p className="text-sm text-gray-500 -mt-4">Tercihler şimdilik yalnızca bu cihazda saklanır.</p>
                <ToggleGroup
                  title="Kanallar"
                  items={[
                    { key: 'emailNotifications', label: 'E-posta', desc: 'Önemli güncellemeler ve faturalar' },
                    { key: 'smsNotifications', label: 'SMS', desc: 'Acil durumlar ve güvenlik kodları' },
                    { key: 'pushNotifications', label: 'Mobil', desc: 'Uygulama içi anlık uyarılar' },
                  ]}
                  state={notifications}
                  setState={setNotifications}
                />
                <ToggleGroup
                  title="Konular"
                  items={[
                    { key: 'newOffers', label: 'Yeni teklifler', desc: 'İlanlarınıza gelen teklifler' },
                    { key: 'statusUpdates', label: 'Durum güncellemeleri', desc: 'Yüklendi, teslim edildi vb.' },
                    { key: 'marketing', label: 'Kampanya ve duyuru', desc: 'SeyirGo yenilikleri' },
                  ]}
                  state={notifications}
                  setState={setNotifications}
                />
              </section>
            )}

            {activeTab === 'account' && (
              <section className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-black text-slate-900 mb-4">Hesap durumu</h2>
                  <dl className="space-y-3 text-sm">
                    <Row label="Hesap türü" value={isCarrier ? 'Taşıyıcı' : 'Yük veren'} />
                    <Row label="Abonelik" value={planLabel} />
                    <Row label="Profil" value={user.onboarding.profileCompleted ? 'Tamamlandı' : 'Eksik'} />
                    <Row
                      label="Belgeler"
                      value={
                        docsApproved
                          ? 'Onaylandı'
                          : docsSubmitted
                            ? 'İnceleniyor'
                            : 'Eksik'
                      }
                    />
                    {isCarrier && (
                      <Row
                        label="Araç"
                        value={
                          user.onboarding.hasVehicle
                            ? `${user.vehicleCount ?? 0} kayıtlı`
                            : 'Henüz eklenmedi'
                        }
                      />
                    )}
                  </dl>
                  <Link
                    href={docsPath}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:underline"
                  >
                    Belgeler sayfasına git <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5">
                  <h3 className="font-bold text-amber-900 text-sm">Şifre değiştirme</h3>
                  <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
                    Şifre sıfırlama özelliği yakında eklenecek. Şimdilik kayıt sırasında belirlediğiniz şifreyi kullanın.
                  </p>
                </div>

                <div className="bg-red-50 rounded-2xl border border-red-100 p-5">
                  <h3 className="font-bold text-red-800 text-sm">Hesabı sil</h3>
                  <p className="text-xs text-red-700/80 mt-1 leading-relaxed">
                    Hesabınızı sildiğinizde tüm verileriniz, geçmiş taşımalarınız ve faturalarınız kalıcı olarak silinir. Bu işlem geri alınamaz.
                  </p>
                  <button
                    type="button"
                    disabled
                    className="mt-3 px-4 py-2 bg-red-200 text-red-400 text-xs font-bold rounded-lg cursor-not-allowed"
                  >
                    Yakında
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
      <dt className="text-gray-500 font-medium">{label}</dt>
      <dd className="font-bold text-slate-800 text-right">{value}</dd>
    </div>
  );
}

function SaveBar({ saving, onSave }: { saving: boolean; onSave: () => void }) {
  return (
    <div className="pt-4 border-t border-gray-100 flex justify-end">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark text-white text-sm font-bold rounded-xl hover:opacity-95 disabled:opacity-60 transition-opacity"
      >
        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        {saving ? 'Kaydediliyor...' : 'Kaydet'}
      </button>
    </div>
  );
}

function ToggleGroup<T extends Record<string, boolean>>({
  title,
  items,
  state,
  setState,
}: {
  title: string;
  items: { key: keyof T & string; label: string; desc: string }[];
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => {
          const checked = state[item.key as keyof T] as boolean;
          return (
            <label
              key={item.key}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${checked ? 'bg-slate-50 border-slate-200' : 'border-gray-100 hover:border-gray-200'}`}
            >
              <div>
                <p className="text-sm font-bold text-slate-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setState({ ...state, [item.key]: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-brand-dark focus:ring-brand-dark/20"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}

