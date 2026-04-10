
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Truck, Home, Car, FileText, Ship, Construction, Warehouse,
  CheckCircle, ChevronRight, Upload, Shield, Send, X, Info, Plus, Minus,
  MapPin, Calendar, User, Building2, Phone, Mail, CreditCard, Package
} from 'lucide-react';
import { CITIES, getDefaultDistricts, CUSTOMS_GATES } from '@/app/data/locations';

// ─── KATEGORİLER ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: '1A', code: '1AA', shortLabel: 'Karayolu',
    label: 'Karayolu Aracım Var / Karayolu Yük Arıyorum',
    desc: 'Tır, kamyon, kamyonet ile karayolu taşımacılığı',
    icon: Truck, color: 'orange',
  },
  {
    id: '1B', code: '1BB', shortLabel: 'Ev / Ofis',
    label: 'Aracım Var / Ev-Ofis Eşyası Taşıyabilirim',
    desc: 'Nakliyat, evden eve taşıma hizmeti',
    icon: Home, color: 'blue',
  },
  {
    id: '1C', code: '1CC', shortLabel: 'Araç Taşıma',
    label: 'Araç Taşıyacak Aracım / Çekicim Var',
    desc: 'Oto çekici, araç taşıma platformu hizmeti',
    icon: Car, color: 'purple',
  },
  {
    id: '1D', code: '1DD', shortLabel: 'Kurye',
    label: 'Kurye Firmam Var / Parsiyel Eşya Taşıyabilirim',
    desc: 'Kargo, parsiyel, evrak teslimat hizmeti',
    icon: FileText, color: 'green',
  },
  {
    id: '1E', code: '1EE', shortLabel: 'Intermodal',
    label: 'Intermodal Taşıma Yapıyorum / Yük Arıyorum',
    desc: 'Kara-Deniz-Hava-Demiryolu kombine taşımacılık',
    icon: Ship, color: 'cyan',
  },
  {
    id: '1F', code: '1FF', shortLabel: 'Proje',
    label: 'Projeli Taşıma Yapabilirim / Yük Arıyorum',
    desc: 'Ağır yük, gabari dışı proje taşımacılığı',
    icon: Construction, color: 'yellow',
  },
  {
    id: '1G', code: '1GG', shortLabel: 'Depolama',
    label: 'Antrepo / Depom Var / Depolamak İsteyen Firma Arıyorum',
    desc: 'Antrepo, soğuk hava deposu, lojistik merkezi',
    icon: Warehouse, color: 'slate',
  },
];

const COLOR_MAP: Record<string, { ring: string; bg: string; icon: string; badge: string }> = {
  orange: { ring: 'ring-brand-orange border-brand-orange', bg: 'bg-orange-50', icon: 'text-brand-orange', badge: 'bg-brand-orange text-white' },
  blue:   { ring: 'ring-blue-500 border-blue-500',        bg: 'bg-blue-50',   icon: 'text-blue-500',   badge: 'bg-blue-500 text-white' },
  purple: { ring: 'ring-purple-500 border-purple-500',    bg: 'bg-purple-50', icon: 'text-purple-500', badge: 'bg-purple-500 text-white' },
  green:  { ring: 'ring-green-600 border-green-600',      bg: 'bg-green-50',  icon: 'text-green-600',  badge: 'bg-green-600 text-white' },
  cyan:   { ring: 'ring-cyan-600 border-cyan-600',        bg: 'bg-cyan-50',   icon: 'text-cyan-600',   badge: 'bg-cyan-600 text-white' },
  yellow: { ring: 'ring-yellow-600 border-yellow-600',    bg: 'bg-yellow-50', icon: 'text-yellow-700', badge: 'bg-yellow-600 text-white' },
  slate:  { ring: 'ring-slate-600 border-slate-600',      bg: 'bg-slate-50',  icon: 'text-slate-600',  badge: 'bg-slate-600 text-white' },
};

// ─── FORM VERİLERİ ─────────────────────────────────────────────────────────────

// Taşıt tipleri (1A için) – kategori bazında farklılaşabilir
const TASIT_TIPI = ['Hepsi', 'Kamyon', 'Tır', '8 Teker Kamyon', '10 Teker Kamyon', 'Tır 13-60', 'Kırkayak', 'Tır - Kısa Dorse', 'Midilli', 'Kamyonet'];
const KASA_TIP   = ['Hepsi', 'Açık Kasa', 'Kapalı Kasa', 'Kayar Çadır', 'Frigolu', 'Damperli', 'Tenteli Kasa', 'Açık Dorse', 'Kapalı Dorse'];
const YUK_TIPI   = ['Tam Araç', '1 Kapak', '2 Kapak', '1 Palet', '2 Palet', '3 Palet', 'Parça Yük', 'Yük Üstü'];
const GONDERI_TIPI = ['Palet', 'Döküm', 'Kolili', 'Balya', 'Bobin', 'Diğerleri'];
const YUKLEME_TIPI = ['Yandan Yükleme', 'Arkadan Yükleme', 'Üstten Yükleme'];

// 1B kategorisi için özel alanlar
const ESYA_TIPI = ['Mobilya', 'Elektrikli Eşya', 'Kişisel Eşya', 'Ofis Malzemeleri', 'Piyano / Müzik', 'Antika / Sanat', 'Spor Ekipmanı', 'Diğer'];
const HIZMET_TIPI_1B = ['Asansörlü Taşıma', 'Paketleme Hizmeti', 'Montaj / Demontaj', 'Sigortalı Taşıma', 'Depolama', 'Şehir İçi', 'Şehirler Arası'];

// 1C kategorisi
const ARAC_TIPI_1C = ['Otomobil', 'SUV / Jeep', 'Kamyonet', 'Minibüs / Midibüs', 'Motosiklet', 'İş Makinesi', 'Tekne / Jet-ski', 'Karavan'];
const CEKICI_TIPI  = ['Çift Katlı Çekici', 'Tek Katlı Platform', 'Kapalı Çekici', 'Vinçli Çekici', 'Mega Çekici'];

// 1D kategorisi
const TESLIMAT_TIPI = ['Kapıya Teslim', 'Şubeye Teslim', 'Aynı Gün Teslimat', 'Ertesi Gün Teslimat', '2-3 Gün Teslimat', 'Uluslararası'];
const GONDERI_TIPI_1D = ['Evrak', 'Küçük Paket', 'Orta Paket', 'Büyük Paket', 'Palet', 'Tehlikeli Madde'];

// 1E kategorisi
const MODAL_TIPI = ['Karayolu', 'Demiryolu', 'Deniz Yolu', 'Hava Yolu'];
const KONTEYNER_TIPI = ['20\' Standart', '40\' Standart', '40\' High Cube', 'Reefer', 'Open Top', 'Flat Rack', 'Tanker'];

// 1F kategorisi
const EKIPMAN_TIPI = ['Platform Dorse', 'Lowbed', 'Modüler Platform', 'Mobil Vinç', 'Forklift', 'Escort Aracı', 'Pilot Araç'];

// 1G kategorisi
const DEPO_TIPI = ['Kapalı Antrepo', 'Açık Saha', 'Soğuk Hava Deposu', 'Donmuş Depo', 'Kimyasal Depo', 'Gümrüklü Antrepo', 'Cross-Dock'];
const DEPO_HIZMET = ['Paletli Raf Sistemi', 'Zeminde İstif', 'WMS Sistemi', 'CCTV Güvenlik', 'Yangın Söndürme', 'Sigortalı Depolama'];

type CategoryId = '1A' | '1B' | '1C' | '1D' | '1E' | '1F' | '1G';

interface FormState {
  // Firma/Kişi Bilgileri
  firma: string;
  yetkiliAdi: string;
  tcKimlik: string;
  mail: string;
  telefon: string;
  faturaAdres: string;
  // Araç/Hizmet Cinsi
  hizmetCinsi: string;
  musaitTarih: string;
  // Güzergah
  kalkisUlke: string;
  kalkisSehir: string;
  kalkisIlce: string;
  cikisGumruk: string;
  kalkisPostaKod: string;
  varisUlke: string;
  varisSehir: string;
  varisIlce: string;
  varisGumruk: string;
  varisPostaKod: string;
  // Taşıt/Araç Seçimleri
  tasitTipi: string[];
  kasaTip: string[];
  yukTipi: string[];
  gonderiTipi: string[];
  yuklemeTipi: string[];
  tasitDiger: string;
  // Özel koşullar
  isiKontrol: string[];
  isiSeviye: string;
  nem: string;
  havalandirma: string;
  // Ölçüler
  adet: string;
  agirlik: string;
  en: string;
  boy: string;
  yukseklik: string;
  toplamHacim: string;
  toplamAgirlik: string;
  // Özet
  ozet: string;
  // Dosya
  dosyalar: File[];
}

const initialForm: FormState = {
  firma: 'Yıldız Lojistik Ltd. Şti.', yetkiliAdi: 'Mehmet Kaya', tcKimlik: '', mail: 'mehmet@yildizlojistik.com',
  telefon: '0532 XXX XX XX', faturaAdres: '', hizmetCinsi: '', musaitTarih: '',
  kalkisUlke: 'Türkiye', kalkisSehir: '', kalkisIlce: '', cikisGumruk: '', kalkisPostaKod: '',
  varisUlke: 'Türkiye', varisSehir: '', varisIlce: '', varisGumruk: '', varisPostaKod: '',
  tasitTipi: [], kasaTip: [], yukTipi: [], gonderiTipi: [], yuklemeTipi: [], tasitDiger: '',
  isiKontrol: [], isiSeviye: '', nem: '', havalandirma: '',
  adet: '', agirlik: '', en: '', boy: '', yukseklik: '', toplamHacim: '', toplamAgirlik: '',
  ozet: '', dosyalar: [],
};

// ─── YARDIMCI FONKSİYONLAR ────────────────────────────────────────────────────

function toggleArr(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

function CheckboxGrid({ items, selected, onToggle, cols = 3 }: {
  items: string[];
  selected: string[];
  onToggle: (v: string) => void;
  cols?: number;
}) {
  return (
    <div className={`grid gap-1.5`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {items.map(item => {
        const active = selected.includes(item);
        return (
          <button
            key={item}
            type="button"
            onClick={() => onToggle(item)}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg border text-xs font-semibold transition-all text-left ${
              active
                ? 'bg-brand-orange border-brand-orange text-white shadow-sm'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 border ${active ? 'bg-white border-white' : 'border-gray-300'}`}>
              {active && <CheckCircle size={10} className="text-brand-orange" strokeWidth={3} />}
            </div>
            <span className="leading-tight">{item}</span>
          </button>
        );
      })}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-brand-dark text-white text-center py-2.5 px-4 text-xs font-bold uppercase tracking-widest rounded-xl mb-4">
      {children}
    </div>
  );
}

function FormRow({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1.5">
      <label className="text-xs font-bold text-gray-600 sm:w-36 sm:pt-2.5 flex-shrink-0">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all placeholder:text-gray-300";

// ─── ANA SAYFA ─────────────────────────────────────────────────────────────────
export default function IlanEklePage() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState<CategoryId | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [captcha, setCaptcha] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const category = CATEGORIES.find(c => c.id === selectedCat);
  const colors = category ? COLOR_MAP[category.color] : COLOR_MAP.orange;

  const set = (field: keyof FormState, value: unknown) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const toggleCheck = (field: 'tasitTipi' | 'kasaTip' | 'yukTipi' | 'gonderiTipi' | 'yuklemeTipi' | 'isiKontrol', val: string) =>
    setForm(prev => ({ ...prev, [field]: toggleArr(prev[field] as string[], val) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captcha) { alert('Lütfen robot olmadığınızı doğrulayın.'); return; }
    console.log('Taşıyıcı İlanı:', { category: selectedCat, ...form });
    setSubmitted(true);
    setTimeout(() => router.push('/carrier/ilanlarim'), 1800);
  };

  // ─── KATEGORİ SEÇİM EKRANI ──────────────────────────────────────────────────
  if (!showForm) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] pb-20">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Taşıyıcı İlanı Ver</h1>
              <p className="text-xs text-slate-500 font-medium">Hangi hizmet kategorisinde ilan vermek istiyorsunuz?</p>
            </div>
          </div>
          <span className="hidden sm:block bg-brand-orange/10 text-brand-orange text-xs font-bold px-3 py-1.5 rounded-full">
            Adım 1 / 2 — Kategori Seçimi
          </span>
        </header>

        <div className="p-6 lg:p-10 max-w-5xl mx-auto">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3 mb-8">
            <Info size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 leading-relaxed">
              Vermek istediğiniz hizmet türünü seçin. Seçiminize göre size özel ilan formu açılacak. 
              İlanınız yük verenlerle otomatik olarak eşleştirilecek.
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const c = COLOR_MAP[cat.color];
              const isSelected = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCat(cat.id as CategoryId)}
                  className={`relative flex flex-col items-start p-5 rounded-2xl border-2 text-left transition-all hover:shadow-lg active:scale-[0.98] ${
                    isSelected
                      ? `${c.ring} ring-2 bg-white shadow-lg`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle size={20} className="text-brand-orange" />
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isSelected ? c.bg : 'bg-gray-50'}`}>
                    <Icon size={24} className={isSelected ? c.icon : 'text-gray-400'} />
                  </div>
                  <div className={`text-[10px] font-black uppercase tracking-widest mb-1.5 ${isSelected ? c.icon : 'text-gray-400'}`}>
                    Kod: {cat.code}
                  </div>
                  <div className="font-black text-slate-900 text-sm mb-2">{cat.shortLabel}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{cat.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Category Info */}
          {selectedCat && category && (
            <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 border-t-2 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.15)] sm:relative sm:mt-6 sm:p-5 sm:rounded-2xl sm:border-2 sm:shadow-none ${colors.ring} ${colors.bg} flex flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-4 sm:animate-none`}>
              <div className="hidden sm:block">
                <div className={`text-xs font-black uppercase tracking-wider mb-1 ${colors.icon}`}>Seçilen Kategori</div>
                <div className="font-black text-slate-900 text-lg">{category.label}</div>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/30 whitespace-nowrap active:scale-[0.98]"
              >
                İlan Formuna Geç <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── BAŞARI EKRANI ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">İlan Yayınlandı!</h2>
          <p className="text-gray-500 mb-6">
            <span className="font-bold text-slate-700">{category?.shortLabel}</span> kategorisinde ilanınız başarıyla oluşturuldu. 
            Uygun yük ilanlarıyla eşleştirme başlatıldı.
          </p>
          <div className="text-xs text-gray-400">İlanlarım sayfasına yönlendiriliyorsunuz...</div>
        </div>
      </div>
    );
  }

  // ─── İLAN FORMU ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8F9FC] pb-20 text-slate-800">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-4 lg:px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-base lg:text-xl font-black text-slate-900 tracking-tight">
              {category?.code} — {category?.shortLabel} İlanı
            </h1>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {category?.label}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide ${colors.badge}`}>
            {category?.code}
          </span>
          <span className="hidden sm:block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">
            Adım 2 / 2 — İlan Formu
          </span>
        </div>
      </header>

      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── BÖLÜM 1: FİRMA / KİŞİ BİLGİLERİ ──────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-widest">
                {category?.code} {category?.label}
              </span>
              <span className={`text-[10px] font-bold px-2 py-1 rounded ${colors.badge}`}>Taşıyıcı</span>
            </div>

            <div className="p-5 lg:p-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormRow label="Kayıtlı Firma">
                  <input readOnly value={form.firma} className={`${inputCls} bg-gray-50 text-gray-500 cursor-not-allowed`} />
                </FormRow>
                <FormRow label="Yetkili Adı Soyadı" required>
                  <input value={form.yetkiliAdi} onChange={e => set('yetkiliAdi', e.target.value)} className={inputCls} placeholder="Ad Soyad" />
                </FormRow>
                <FormRow label="TC Kimlik No">
                  <input value={form.tcKimlik} onChange={e => set('tcKimlik', e.target.value)} className={inputCls} placeholder="___________" maxLength={11} />
                </FormRow>
                <FormRow label="Mail Adresi" required>
                  <input type="email" value={form.mail} onChange={e => set('mail', e.target.value)} className={inputCls} />
                </FormRow>
                <FormRow label="Telefon" required>
                  <input value={form.telefon} onChange={e => set('telefon', e.target.value)} className={inputCls} />
                </FormRow>
                <FormRow label="Fatura Adresi">
                  <input value={form.faturaAdres} onChange={e => set('faturaAdres', e.target.value)} className={inputCls} placeholder="Fatura adresi (opsiyonel)" />
                </FormRow>
                <FormRow label={selectedCat === '1G' ? 'Depo Cinsi' : selectedCat === '1D' ? 'Hizmet Cinsi' : 'Araç Cinsi'} required>
                  <input value={form.hizmetCinsi} onChange={e => set('hizmetCinsi', e.target.value)} className={inputCls}
                    placeholder={selectedCat === '1G' ? 'Antrepo, Soğuk Hava Deposu...' : selectedCat === '1D' ? 'Kargo, Kurye, Parsiyel...' : 'Tır, Kamyon, Frigorifik...'} />
                </FormRow>
                <FormRow label="Müsait Tarih" required>
                  <input type="date" value={form.musaitTarih} onChange={e => set('musaitTarih', e.target.value)} className={inputCls} />
                </FormRow>
              </div>
            </div>
          </div>

          {/* ── BÖLÜM 2: GÜZERGAH BİLGİLERİ ───────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 lg:p-7">
              <SectionTitle>
                {selectedCat === '1G' ? 'DEPO / ANTREPO KONUM BİLGİLERİ' : 'GÜZERGAH BİLGİLERİ'}
              </SectionTitle>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Kalkış */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <MapPin size={12} className="text-brand-dark" />
                    </div>
                    {selectedCat === '1G' ? 'Depo Konumu' : 'Kalkış Bilgileri'}
                  </div>
                  <input value={form.kalkisUlke} onChange={e => set('kalkisUlke', e.target.value)} className={inputCls} placeholder="Ülke" />
                  
                  <select value={form.kalkisSehir} onChange={e => { set('kalkisSehir', e.target.value); set('kalkisIlce', ''); }} className={`${inputCls} appearance-none`} required>
                    <option value="">Şehir / İl Seçin</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  
                  <select value={form.kalkisIlce} onChange={e => set('kalkisIlce', e.target.value)} className={`${inputCls} appearance-none`} disabled={!form.kalkisSehir}>
                    <option value="">İlçe Seçin</option>
                    {form.kalkisSehir && getDefaultDistricts(form.kalkisSehir).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>

                  <div className="grid grid-cols-2 gap-3">
                    <select value={form.cikisGumruk} onChange={e => set('cikisGumruk', e.target.value)} className={`${inputCls} appearance-none`}>
                      <option value="">Çıkış Gümrüğü (Opsiyonel)</option>
                      {CUSTOMS_GATES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <input value={form.kalkisPostaKod} onChange={e => set('kalkisPostaKod', e.target.value)} className={inputCls} placeholder="Posta Kodu" />
                  </div>
                </div>

                {/* Varış */}
                {selectedCat !== '1G' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                        <MapPin size={12} className="text-brand-orange" />
                      </div>
                      Varış Bilgileri
                    </div>
                    <input value={form.varisUlke} onChange={e => set('varisUlke', e.target.value)} className={inputCls} placeholder="Ülke" />
                    
                    <select value={form.varisSehir} onChange={e => { set('varisSehir', e.target.value); set('varisIlce', ''); }} className={`${inputCls} appearance-none`}>
                      <option value="">Şehir / İl Seçin</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    
                    <select value={form.varisIlce} onChange={e => set('varisIlce', e.target.value)} className={`${inputCls} appearance-none`} disabled={!form.varisSehir}>
                      <option value="">İlçe Seçin</option>
                      {form.varisSehir && getDefaultDistricts(form.varisSehir).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>

                    <div className="grid grid-cols-2 gap-3">
                      <select value={form.varisGumruk} onChange={e => set('varisGumruk', e.target.value)} className={`${inputCls} appearance-none`}>
                        <option value="">Varış Gümrüğü (Opsiyonel)</option>
                        {CUSTOMS_GATES.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                      <input value={form.varisPostaKod} onChange={e => set('varisPostaKod', e.target.value)} className={inputCls} placeholder="Posta Kodu" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── BÖLÜM 3: ARAÇ / HİZMET DETAYLARI ─────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 lg:p-7">
              <SectionTitle>
                {selectedCat === '1A' && 'ARACIM VE KABULEDEBİLECEĞİM YÜK TİPLERİ'}
                {selectedCat === '1B' && 'TAŞIYACAĞIM EŞYA TİPLERİ VE HİZMETLER'}
                {selectedCat === '1C' && 'ARAÇ TAŞIMA KAPASİTEM VE EKİPMANLARIM'}
                {selectedCat === '1D' && 'KURYE HİZMETLERİM VE TESLİMAT BİLGİLERİ'}
                {selectedCat === '1E' && 'INTERMODAL TAŞIMA KAPASİTEM'}
                {selectedCat === '1F' && 'PROJE TAŞIMACILIĞI EKİPMANLARIM'}
                {selectedCat === '1G' && 'DEPO / ANTREPO ÖZELLİKLERİM'}
              </SectionTitle>

              {/* 1A — Karayolu */}
              {selectedCat === '1A' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Taşıt Tipim</div>
                      <CheckboxGrid items={TASIT_TIPI} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)}
                        className={`${inputCls} mt-2`} placeholder="Diğer ise yazınız..." />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Kasa Tipim</div>
                      <CheckboxGrid items={KASA_TIP} selected={form.kasaTip} onToggle={v => toggleCheck('kasaTip', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Yük Kapasitem</div>
                      <CheckboxGrid items={YUK_TIPI} selected={form.yukTipi} onToggle={v => toggleCheck('yukTipi', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Kabul Ettiğim Gönderi Tipi</div>
                      <CheckboxGrid items={GONDERI_TIPI} selected={form.gonderiTipi} onToggle={v => toggleCheck('gonderiTipi', v)} cols={3} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Yükleme Tipim</div>
                      <CheckboxGrid items={YUKLEME_TIPI} selected={form.yuklemeTipi} onToggle={v => toggleCheck('yuklemeTipi', v)} cols={1} />
                    </div>
                  </div>
                </div>
              )}

              {/* 1B — Ev/Ofis */}
              {selectedCat === '1B' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Taşıyabileceğim Eşya Tipleri</div>
                      <CheckboxGrid items={ESYA_TIPI} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Sunduğum Hizmetler</div>
                      <CheckboxGrid items={HIZMET_TIPI_1B} selected={form.kasaTip} onToggle={v => toggleCheck('kasaTip', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <FormRow label="Araç Tipi">
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)} className={inputCls} placeholder="Kamyonet, Kamyon..." />
                    </FormRow>
                    <FormRow label="Hizmet Bölgesi">
                      <input value={form.varisIlce} onChange={e => set('varisIlce', e.target.value)} className={inputCls} placeholder="Tüm Türkiye, İstanbul..." />
                    </FormRow>
                  </div>
                </div>
              )}

              {/* 1C — Araç Taşıma */}
              {selectedCat === '1C' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Taşıyabileceğim Araç Tipleri</div>
                      <CheckboxGrid items={ARAC_TIPI_1C} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Çekici / Platform Tipim</div>
                      <CheckboxGrid items={CEKICI_TIPI} selected={form.kasaTip} onToggle={v => toggleCheck('kasaTip', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <FormRow label="Adet Kapasitesi">
                      <input value={form.adet} onChange={e => set('adet', e.target.value)} className={inputCls} placeholder="Kaç adet araç taşıyabilirsiniz?" />
                    </FormRow>
                    <FormRow label="Plaka / Araç Bilgisi">
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)} className={inputCls} placeholder="Araç plakası ve modeli" />
                    </FormRow>
                  </div>
                </div>
              )}

              {/* 1D — Kurye */}
              {selectedCat === '1D' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Teslimat Hizmetlerim</div>
                      <CheckboxGrid items={TESLIMAT_TIPI} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Kabul Ettiğim Gönderi Tipleri</div>
                      <CheckboxGrid items={GONDERI_TIPI_1D} selected={form.gonderiTipi} onToggle={v => toggleCheck('gonderiTipi', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <FormRow label="Maks. Ağırlık">
                      <input value={form.agirlik} onChange={e => set('agirlik', e.target.value)} className={inputCls} placeholder="kg" />
                    </FormRow>
                    <FormRow label="Hizmet İlleri">
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)} className={inputCls} placeholder="Tüm Türkiye..." />
                    </FormRow>
                    <FormRow label="Günlük Kapasite">
                      <input value={form.adet} onChange={e => set('adet', e.target.value)} className={inputCls} placeholder="Adet / gün" />
                    </FormRow>
                  </div>
                </div>
              )}

              {/* 1E — Intermodal */}
              {selectedCat === '1E' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Kullandığım Taşıma Modları</div>
                      <CheckboxGrid items={MODAL_TIPI} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Konteyner Tipleri</div>
                      <CheckboxGrid items={KONTEYNER_TIPI} selected={form.kasaTip} onToggle={v => toggleCheck('kasaTip', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <FormRow label="Hizmet Limanları / Noktaları">
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)} className={inputCls} placeholder="İstanbul, Mersin, İzmir Limanı..." />
                    </FormRow>
                    <FormRow label="Ülkeler / Güzergahlar">
                      <input value={form.varisIlce} onChange={e => set('varisIlce', e.target.value)} className={inputCls} placeholder="Almanya, Hollanda, Çin..." />
                    </FormRow>
                  </div>
                </div>
              )}

              {/* 1F — Proje */}
              {selectedCat === '1F' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Sahip Olduğum Ekipmanlar</div>
                      <CheckboxGrid items={EKIPMAN_TIPI} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                    </div>
                    <div className="space-y-3">
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Kapasite Bilgileri</div>
                      <FormRow label="Maks. Ağırlık">
                        <input value={form.agirlik} onChange={e => set('agirlik', e.target.value)} className={inputCls} placeholder="Ton" />
                      </FormRow>
                      <FormRow label="Maks. Uzunluk">
                        <input value={form.boy} onChange={e => set('boy', e.target.value)} className={inputCls} placeholder="Metre" />
                      </FormRow>
                      <FormRow label="Maks. Genişlik">
                        <input value={form.en} onChange={e => set('en', e.target.value)} className={inputCls} placeholder="Metre" />
                      </FormRow>
                    </div>
                  </div>
                </div>
              )}

              {/* 1G — Depolama */}
              {selectedCat === '1G' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Depo Tiplerim</div>
                      <CheckboxGrid items={DEPO_TIPI} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Sunduğum Hizmetler</div>
                      <CheckboxGrid items={DEPO_HIZMET} selected={form.kasaTip} onToggle={v => toggleCheck('kasaTip', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <FormRow label="Toplam Alan (m²)">
                      <input value={form.adet} onChange={e => set('adet', e.target.value)} className={inputCls} placeholder="1000 m²" />
                    </FormRow>
                    <FormRow label="Min. Depolama Süresi">
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)} className={inputCls} placeholder="7 gün, 1 ay..." />
                    </FormRow>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── BÖLÜM 4: ÖZEL KOŞULLAR (sadece bazı kategoriler için) ────── */}
          {(selectedCat === '1A' || selectedCat === '1E' || selectedCat === '1G') && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 lg:p-7">
                <SectionTitle>ÖZEL KOŞULLAR VE EKİPMAN</SectionTitle>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Isı Kontrolü</div>
                    <CheckboxGrid
                      items={['Frigolu', 'Isıtmalı', 'Donmuş Yük', 'Ambient']}
                      selected={form.isiKontrol}
                      onToggle={v => toggleCheck('isiKontrol', v)}
                      cols={1}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Isı Aralığı</div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => set('isiSeviye', String(Number(form.isiSeviye || '0') - 1))} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                        <Minus size={14} />
                      </button>
                      <input value={form.isiSeviye} onChange={e => set('isiSeviye', e.target.value)} className={`${inputCls} text-center`} placeholder="°C" />
                      <button type="button" onClick={() => set('isiSeviye', String(Number(form.isiSeviye || '0') + 1))} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Nem Kontrolü</div>
                    <input value={form.nem} onChange={e => set('nem', e.target.value)} className={inputCls} placeholder="% nem" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Havalandırma</div>
                    <input value={form.havalandirma} onChange={e => set('havalandirma', e.target.value)} className={inputCls} placeholder="Var / Yok" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── BÖLÜM 5: ÖLÇÜ VE KAPASİTE ─────────────────────────────────── */}
          {selectedCat !== '1G' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 lg:p-7">
                <SectionTitle>ARAÇ KAPASİTESİ VE ÖLÇÜLER</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {[
                    { label: 'Adet', field: 'adet' as keyof FormState, placeholder: '#' },
                    { label: 'Max Ağırlık', field: 'agirlik' as keyof FormState, placeholder: 'Ton' },
                    { label: 'En (m)', field: 'en' as keyof FormState, placeholder: 'm' },
                    { label: 'Boy (m)', field: 'boy' as keyof FormState, placeholder: 'm' },
                    { label: 'Yükseklik (m)', field: 'yukseklik' as keyof FormState, placeholder: 'm' },
                    { label: 'Hacim (m³)', field: 'toplamHacim' as keyof FormState, placeholder: 'm³' },
                  ].map(({ label, field, placeholder }) => (
                    <div key={field} className="col-span-1">
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-wide mb-1.5">{label}</div>
                      <input
                        type="number"
                        value={form[field] as string}
                        onChange={e => set(field, e.target.value)}
                        className={inputCls}
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-wide mb-1.5">Max Yük (Ton)</div>
                    <input
                      type="number"
                      value={form.toplamAgirlik}
                      onChange={e => set('toplamAgirlik', e.target.value)}
                      className={inputCls}
                      placeholder="Ton"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── BÖLÜM 6: ÖZET ─────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 lg:p-7">
              <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Özet / Ek Notlar</div>
              <textarea
                value={form.ozet}
                onChange={e => set('ozet', e.target.value)}
                rows={4}
                className={`${inputCls} resize-none`}
                placeholder="Hizmetiniz hakkında eklemek istediğiniz bilgileri yazınız... (referanslar, özel koşullar, fiyat bilgisi vb.)"
              />
            </div>
          </div>

          {/* ── BÖLÜM 7: DOSYA + CAPTCHA + GÖNDER ─────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 lg:p-7 space-y-4">
              {/* Dosya Yükleme */}
              <div>
                <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Upload size={14} /> Dosya Yükle
                </div>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-brand-orange transition-all">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm font-semibold text-gray-500">Belge, sigorta, araç ruhsatı yükleyin</span>
                  <span className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 10MB)</span>
                  <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png"
                    onChange={e => set('dosyalar', Array.from(e.target.files || []))} />
                </label>
                {form.dosyalar.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.dosyalar.map((f, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                        <FileText size={12} /> {f.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* CAPTCHA */}
              <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" checked={captcha} onChange={e => setCaptcha(e.target.checked)}
                  className="w-5 h-5 rounded accent-brand-orange" />
                <div className="flex items-center gap-2 flex-1">
                  <Shield size={20} className="text-green-600" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">Ben Robot Değilim</div>
                    <div className="text-xs text-gray-500">İlanınızın gerçek bir taşıyıcı tarafından verildiğini onaylayın</div>
                  </div>
                </div>
              </label>

              {/* GÖNDER butonu */}
              <button
                type="submit"
                className="w-full py-4 bg-brand-orange text-white font-black text-lg rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-brand-orange/30 flex items-center justify-center gap-3 active:scale-[0.99]"
              >
                <Send size={22} />
                GÖNDER — İLANI YAYINLA
              </button>

              <p className="text-center text-xs text-gray-400 leading-relaxed">
                İlanınız yayınlandığında uygun yük sahipleriyle otomatik eşleştirme başlayacak. 
                Bildirimleri <span className="font-bold text-gray-600">Ayarlar</span> bölümünden yönetebilirsiniz.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
