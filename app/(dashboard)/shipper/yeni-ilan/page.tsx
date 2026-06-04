
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Truck, Home, Car, FileText, Ship, Construction, Warehouse,
  CheckCircle, ChevronRight, Upload, Shield, Send, Plus, Minus, Info,
  MapPin, Calendar
} from 'lucide-react';
import { CITIES, getDefaultDistricts, CUSTOMS_GATES } from '@/app/data/locations';
import { useSession } from '@/app/providers/SessionProvider';

// ─── KATEGORİLER (Yük Veren Perspektifi) ─────────────────────────────────────
const CATEGORIES = [
  {
    id: '1A', code: '1A', shortLabel: 'Karayolu',
    label: 'Karayolu Yüküm Var / Karayolu Aracı Arıyorum',
    desc: 'Tır, kamyon veya kamyonet ile taşınacak yük',
    icon: Truck, color: 'blue',
  },
  {
    id: '1B', code: '1B', shortLabel: 'Ev / Ofis',
    label: 'Ev / Ofis Eşyam Var / Nakliyat Aracı Arıyorum',
    desc: 'Evden eve ya da ofisten ofise taşıma',
    icon: Home, color: 'indigo',
  },
  {
    id: '1C', code: '1C', shortLabel: 'Araç Taşıma',
    label: 'Taşınacak Aracım Var / Çekici Arıyorum',
    desc: 'Otomobil, iş makinesi veya özel araç taşıma',
    icon: Car, color: 'purple',
  },
  {
    id: '1D', code: '1D', shortLabel: 'Kurye',
    label: 'Parsiyel / Evrak / Kargo Gönderimim Var',
    desc: 'Kargo, kurye veya parsiyel gönderi',
    icon: FileText, color: 'green',
  },
  {
    id: '1E', code: '1E', shortLabel: 'Intermodal',
    label: 'Intermodal Yüküm Var / Araç Arıyorum',
    desc: 'Kara-Deniz-Hava-Demiryolu kombine taşıma',
    icon: Ship, color: 'cyan',
  },
  {
    id: '1F', code: '1F', shortLabel: 'Proje',
    label: 'Proje Taşımacılığı Yüküm Var / Taşıyıcı Arıyorum',
    desc: 'Ağır yük, gabari dışı veya özel ekipman gerektiren',
    icon: Construction, color: 'yellow',
  },
  {
    id: '1G', code: '1G', shortLabel: 'Depolama',
    label: 'Depolanacak Eşyam Var / Antrepo / Depo Arıyorum',
    desc: 'Kısa ya da uzun süreli depolama ihtiyacı',
    icon: Warehouse, color: 'slate',
  },
];

const COLOR_MAP: Record<string, { ring: string; bg: string; icon: string; badge: string; active: string }> = {
  blue:   { ring: 'ring-brand-dark border-brand-dark',    bg: 'bg-blue-50',   icon: 'text-brand-dark',   badge: 'bg-brand-dark text-white',    active: 'bg-brand-dark' },
  indigo: { ring: 'ring-indigo-600 border-indigo-600',    bg: 'bg-indigo-50', icon: 'text-indigo-600',   badge: 'bg-indigo-600 text-white',    active: 'bg-indigo-600' },
  purple: { ring: 'ring-purple-600 border-purple-600',    bg: 'bg-purple-50', icon: 'text-purple-600',   badge: 'bg-purple-600 text-white',    active: 'bg-purple-600' },
  green:  { ring: 'ring-green-600 border-green-600',      bg: 'bg-green-50',  icon: 'text-green-600',    badge: 'bg-green-600 text-white',     active: 'bg-green-600' },
  cyan:   { ring: 'ring-cyan-600 border-cyan-600',        bg: 'bg-cyan-50',   icon: 'text-cyan-600',     badge: 'bg-cyan-600 text-white',      active: 'bg-cyan-600' },
  yellow: { ring: 'ring-yellow-600 border-yellow-600',    bg: 'bg-yellow-50', icon: 'text-yellow-700',   badge: 'bg-yellow-600 text-white',    active: 'bg-yellow-600' },
  slate:  { ring: 'ring-slate-600 border-slate-600',      bg: 'bg-slate-50',  icon: 'text-slate-600',    badge: 'bg-slate-600 text-white',     active: 'bg-slate-600' },
};

// ─── FORM SEÇENEKLERİ ─────────────────────────────────────────────────────────

// 1A — Karayolu
const TASIT_TIPI   = ['Hepsi', 'Kamyon', 'Tır', '8 Teker Kamyon', '10 Teker Kamyon', 'Tır 13-60', 'Kırkayak', 'Tır - Kısa Dorse', 'Midilli', 'Kamyonet'];
const KASA_TIP     = ['Hepsi', 'Açık Kasa', 'Kapalı Kasa', 'Kayar Çadır', 'Frigolu', 'Damperli', 'Tenteli Kasa', 'Açık Dorse', 'Kapalı Dorse'];
const YUK_TIPI     = ['Tam Araç', '1 Kapak', '2 Kapak', '1 Palet', '2 Palet', '3 Palet', 'Parça Yük', 'Yük Üstü'];
const GONDERI_TIPI = ['Palet', 'Döküm', 'Kolili', 'Balya', 'Bobin', 'Diğerleri'];
const YUKLEME_TIPI = ['Yandan Yükleme', 'Arkadan Yükleme', 'Üstten Yükleme'];

// 1B — Ev/Ofis
const ESYA_TIPI_1B   = ['Mobilya', 'Elektrikli Eşya', 'Kişisel Eşya', 'Ofis Malzemeleri', 'Piyano / Müzik', 'Antika / Sanat', 'Spor Ekipmanı', 'Koli / Paket'];
const HIZMET_TIPI_1B = ['Paketleme Hizmeti', 'Montaj / Demontaj', 'Asansörlü Taşıma', 'Sigortalı Taşıma', 'Depo Bekleme', 'Asansörsüz'];

// 1C — Araç Taşıma
const ARAC_TIPI_1C = ['Otomobil', 'SUV / Jeep', 'Kamyonet', 'Minibüs / Midibüs', 'Motosiklet', 'İş Makinesi', 'Tekne / Jet-ski', 'Karavan'];
const CEKICI_TIP   = ['Çift Katlı Çekici', 'Tek Katlı Platform', 'Kapalı Çekici', 'Vinçli Çekici', 'Mega Çekici'];

// 1D — Kurye
const GONDERI_TIPI_1D  = ['Evrak', 'Küçük Paket', 'Orta Paket', 'Büyük Paket', 'Palet', 'Tehlikeli Madde'];
const TESLIMAT_TIPI_1D = ['Kapıya Teslim', 'Şubeye Bırakma', 'Aynı Gün', 'Ertesi Gün', '2-3 Gün', 'Uluslararası'];

// 1E — Intermodal
const MODAL_TIPI      = ['Karayolu', 'Demiryolu', 'Deniz Yolu', 'Hava Yolu'];
const KONTEYNER_TIPI  = ["20' Standart", "40' Standart", "40' High Cube", 'Reefer', 'Open Top', 'Flat Rack', 'Tanker'];

// 1F — Proje
const EKIPMAN_TIPI_1F = ['Platform Dorse', 'Lowbed', 'Modüler Platform', 'Mobil Vinç', 'Forklift', 'Escort Aracı', 'Pilot Araç'];

// 1G — Depolama
const DEPO_TIPI     = ['Kapalı Antrepo', 'Açık Saha', 'Soğuk Hava', 'Donmuş Depo', 'Kimyasal Depo', 'Gümrüklü Antrepo'];
const ESYA_TIPI_1G  = ['Elektronik', 'Gıda', 'Kimyasal', 'Tekstil', 'Makine / Ekipman', 'Tüketim Malı', 'Palet', 'Konteyner'];

type CategoryId = '1A' | '1B' | '1C' | '1D' | '1E' | '1F' | '1G';

interface FormState {
  firma: string; yetkiliAdi: string; tcKimlik: string; mail: string;
  telefon: string; faturaAdres: string; yukCinsi: string; yuklemeTarihi: string;
  kalkisUlke: string; kalkisSehir: string; kalkisIlce: string;
  cikisGumruk: string; kalkisPostaKod: string;
  varisUlke: string; varisSehir: string; varisIlce: string;
  varisGumruk: string; varisPostaKod: string;
  tasitTipi: string[]; kasaTip: string[]; yukTipi: string[];
  gonderiTipi: string[]; yuklemeTipi: string[]; tasitDiger: string;
  isiKontrol: string[]; isiSeviye: string; nem: string; havalandirma: string;
  adet: string; agirlik: string; en: string; boy: string;
  yukseklik: string; toplamHacim: string; toplamAgirlik: string;
  fiyatBeklenti: string; fiyatTipi: string;
  ozet: string; dosyalar: File[];
}

const initialForm: FormState = {
  firma: '', yetkiliAdi: '', tcKimlik: '',
  mail: '', telefon: '', faturaAdres: '',
  yukCinsi: '', yuklemeTarihi: '',
  kalkisUlke: 'Türkiye', kalkisSehir: '', kalkisIlce: '', cikisGumruk: '', kalkisPostaKod: '',
  varisUlke: 'Türkiye', varisSehir: '', varisIlce: '', varisGumruk: '', varisPostaKod: '',
  tasitTipi: [], kasaTip: [], yukTipi: [], gonderiTipi: [], yuklemeTipi: [], tasitDiger: '',
  isiKontrol: [], isiSeviye: '', nem: '', havalandirma: '',
  adet: '', agirlik: '', en: '', boy: '', yukseklik: '', toplamHacim: '', toplamAgirlik: '',
  fiyatBeklenti: '', fiyatTipi: 'teklif',
  ozet: '', dosyalar: [],
};

// ─── YARDIMCI BİLEŞENLER ──────────────────────────────────────────────────────

function toggleArr(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

function CheckboxGrid({ items, selected, onToggle, cols = 3 }: {
  items: string[]; selected: string[]; onToggle: (v: string) => void; cols?: number;
}) {
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {items.map(item => {
        const active = selected.includes(item);
        return (
          <button key={item} type="button" onClick={() => onToggle(item)}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg border text-xs font-semibold transition-all text-left ${
              active ? 'bg-brand-dark border-brand-dark text-white shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 border ${active ? 'bg-white border-white' : 'border-gray-300'}`}>
              {active && <CheckCircle size={10} className="text-brand-dark" strokeWidth={3} />}
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

const inputCls = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition-all placeholder:text-gray-300";

// ─── ANA SAYFA ─────────────────────────────────────────────────────────────────
export default function YeniIlanPage() {
  const router = useRouter();
  const { user } = useSession();
  const [selectedCat, setSelectedCat] = useState<CategoryId | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);

  React.useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      firma: user.companyTitle || prev.firma,
      yetkiliAdi: `${user.firstName} ${user.lastName}`.trim(),
      mail: user.email || prev.mail,
      telefon: user.phone || prev.telefon,
      faturaAdres: user.address || prev.faturaAdres,
      tcKimlik: user.tcNo || prev.tcKimlik,
    }));
  }, [user]);
  const [captcha, setCaptcha] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const category = CATEGORIES.find(c => c.id === selectedCat);
  const colors = category ? COLOR_MAP[category.color] : COLOR_MAP.blue;

  const set = (field: keyof FormState, value: unknown) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const toggleCheck = (field: 'tasitTipi' | 'kasaTip' | 'yukTipi' | 'gonderiTipi' | 'yuklemeTipi' | 'isiKontrol', val: string) =>
    setForm(prev => ({ ...prev, [field]: toggleArr(prev[field] as string[], val) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captcha) { alert('Lütfen robot olmadığınızı doğrulayın.'); return; }
    console.log('Yük İlanı:', { category: selectedCat, ...form });
    setSubmitted(true);
    setTimeout(() => router.push('/shipper/yukler'), 1800);
  };

  // ─── KATEGORİ SEÇİM EKRANI ──────────────────────────────────────────────────
  if (!showForm) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] pb-20">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Yeni Yük İlanı Ver</h1>
              <p className="text-xs text-slate-500 font-medium">Hangi kategoride ilan vermek istiyorsunuz?</p>
            </div>
          </div>
          <span className="hidden sm:block bg-brand-dark/10 text-brand-dark text-xs font-bold px-3 py-1.5 rounded-full">
            Adım 1 / 2 — Kategori Seçimi
          </span>
        </header>

        <div className="p-6 lg:p-10 max-w-5xl mx-auto">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3 mb-8">
            <Info size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 leading-relaxed">
              Yükünüzün türüne uygun kategoriyi seçin. Seçiminize göre size özel ilan formu açılacak.
              İlanınız uygun taşıyıcılarla otomatik eşleştirilecek.
            </p>
          </div>

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
                    isSelected ? `${c.ring} ring-2 bg-white shadow-lg` : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle size={20} className={c.icon} />
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

          {selectedCat && category && (
            <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 border-t-2 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.15)] sm:relative sm:mt-6 sm:p-5 sm:rounded-2xl sm:border-2 sm:shadow-none ${colors.ring} ${colors.bg} flex flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-4 sm:animate-none`}>
              <div className="hidden sm:block">
                <div className={`text-xs font-black uppercase tracking-wider mb-1 ${colors.icon}`}>Seçilen Kategori</div>
                <div className="font-black text-slate-900 text-lg">{category.label}</div>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-brand-dark text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg whitespace-nowrap active:scale-[0.98]"
              >
                İlan Formuna Geç <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── BAŞARI EKRANI ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">İlan Yayınlandı!</h2>
          <p className="text-gray-500 mb-6">
            <span className="font-bold text-slate-700">{category?.shortLabel}</span> kategorisinde yük ilanınız başarıyla oluşturuldu.
            Uygun taşıyıcılarla eşleştirme başlatıldı.
          </p>
          <div className="text-xs text-gray-400">Yüklerim sayfasına yönlendiriliyorsunuz...</div>
        </div>
      </div>
    );
  }

  // ─── İLAN FORMU ─────────────────────────────────────────────────────────────
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
            <p className="text-xs text-slate-500 font-medium hidden sm:block">{category?.label}</p>
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

          {/* ── 1: FİRMA / KİŞİ BİLGİLERİ ─────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-widest">
                {category?.code} {category?.label}
              </span>
              <span className={`text-[10px] font-bold px-2 py-1 rounded ${colors.badge}`}>Yük Veren</span>
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
                  <input value={form.faturaAdres} onChange={e => set('faturaAdres', e.target.value)} className={inputCls} placeholder="Opsiyonel" />
                </FormRow>
                <FormRow label={selectedCat === '1G' ? 'Eşya Cinsi' : selectedCat === '1D' ? 'Gönderi Cinsi' : 'Yükün Cinsi'} required>
                  <input value={form.yukCinsi} onChange={e => set('yukCinsi', e.target.value)} className={inputCls}
                    placeholder={selectedCat === '1G' ? 'Mobilya, Tekstil, Makine...' : selectedCat === '1D' ? 'Evrak, Küçük Koli...' : 'Tekstil, Gıda, Makine...'} />
                </FormRow>
                <FormRow label={selectedCat === '1G' ? 'Depolama Tarihi' : 'Yükleme Tarihi'} required>
                  <input type="date" value={form.yuklemeTarihi} onChange={e => set('yuklemeTarihi', e.target.value)} className={inputCls} />
                </FormRow>
              </div>
            </div>
          </div>

          {/* ── 2: GÜZERGAH / KONUM BİLGİLERİ ──────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 lg:p-7">
              <SectionTitle>
                {selectedCat === '1G' ? 'YÜKÜN BULUNDUĞU YER VE TESLİM YERİ' : 'YÜK BİLGİLERİM (GÜZERGAH)'}
              </SectionTitle>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Kalkış / Yükün Bulunduğu Yer */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <MapPin size={12} className="text-brand-dark" />
                    </div>
                    {selectedCat === '1G' ? 'Yükün Şu Anki Konumu' : 'Yükün Bulunduğu Yer (Yükleme)'}
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

                {/* Varış / Teslim Edilecek Yer */}
                {selectedCat !== '1G' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                        <MapPin size={12} className="text-brand-orange" />
                      </div>
                      Yükün Teslim Edileceği Yer
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

                {/* 1G için depo adresi */}
                {selectedCat === '1G' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                        <Warehouse size={12} className="text-slate-600" />
                      </div>
                      Depo / Antrepo Tercihleri
                    </div>
                    <select value={form.varisSehir} onChange={e => { set('varisSehir', e.target.value); set('varisIlce', ''); }} className={`${inputCls} appearance-none`}>
                      <option value="">Tercih Edilen Şehir / Bölge</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={form.varisIlce} onChange={e => set('varisIlce', e.target.value)} className={`${inputCls} appearance-none`} disabled={!form.varisSehir}>
                      <option value="">İlçe Seçin</option>
                      {form.varisSehir && getDefaultDistricts(form.varisSehir).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <input value={form.varisPostaKod} onChange={e => set('varisPostaKod', e.target.value)} className={inputCls} placeholder="Tahmini Süre (gün/ay)" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── 3: TALEP EDİLEN ARAÇ / HİZMET DETAYLARI ────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 lg:p-7">
              <SectionTitle>
                {selectedCat === '1A' && 'TALEP ETTİĞİM ARAÇ MODELİ VE YÜK DETAY BİLGİLERİ'}
                {selectedCat === '1B' && 'TAŞINACAK EŞYA TİPLERİ VE İSTEDİĞİM HİZMETLER'}
                {selectedCat === '1C' && 'TAŞINACAK ARACIM VE İHTİYACIM OLAN EKİPMAN'}
                {selectedCat === '1D' && 'GÖNDERİ DETAYLARI VE TESLİMAT TERCİHLERİM'}
                {selectedCat === '1E' && 'INTERMODAL TAŞIMA DETAYLARI'}
                {selectedCat === '1F' && 'PROJE YÜKÜ DETAYLARI VE TALEP ETTİĞİM EKIPMAN'}
                {selectedCat === '1G' && 'DEPOLANACAK EŞYA VE DEPO TERCİHLERİM'}
              </SectionTitle>

              {/* 1A — Karayolu */}
              {selectedCat === '1A' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Taşıt Tipi</div>
                      <CheckboxGrid items={TASIT_TIPI} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)}
                        className={`${inputCls} mt-2`} placeholder="Diğer ise yazınız..." />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Kasa Tipi</div>
                      <CheckboxGrid items={KASA_TIP} selected={form.kasaTip} onToggle={v => toggleCheck('kasaTip', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Yük Tipi</div>
                      <CheckboxGrid items={YUK_TIPI} selected={form.yukTipi} onToggle={v => toggleCheck('yukTipi', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Gönderi Tipi</div>
                      <CheckboxGrid items={GONDERI_TIPI} selected={form.gonderiTipi} onToggle={v => toggleCheck('gonderiTipi', v)} cols={3} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Yükleme Tipi</div>
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
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Taşınacak Eşya Tipleri</div>
                      <CheckboxGrid items={ESYA_TIPI_1B} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">İstediğim Hizmetler</div>
                      <CheckboxGrid items={HIZMET_TIPI_1B} selected={form.kasaTip} onToggle={v => toggleCheck('kasaTip', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <FormRow label="Kat / Apartman">
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)} className={inputCls} placeholder="3. kat, asansör yok..." />
                    </FormRow>
                    <FormRow label="Odası Sayısı">
                      <input value={form.adet} onChange={e => set('adet', e.target.value)} className={inputCls} placeholder="3+1, 2+1..." />
                    </FormRow>
                  </div>
                </div>
              )}

              {/* 1C — Araç Taşıma */}
              {selectedCat === '1C' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Taşınacak Araç Tipi</div>
                      <CheckboxGrid items={ARAC_TIPI_1C} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">İstenen Çekici / Platform Tipi</div>
                      <CheckboxGrid items={CEKICI_TIP} selected={form.kasaTip} onToggle={v => toggleCheck('kasaTip', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <FormRow label="Araç Markası / Modeli">
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)} className={inputCls} placeholder="BMW 5 Serisi, Forklift..." />
                    </FormRow>
                    <FormRow label="Araç Durumu">
                      <input value={form.adet} onChange={e => set('adet', e.target.value)} className={inputCls} placeholder="Çalışıyor, Arızalı, Hasarlı..." />
                    </FormRow>
                  </div>
                </div>
              )}

              {/* 1D — Kurye */}
              {selectedCat === '1D' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Gönderi Tipi</div>
                      <CheckboxGrid items={GONDERI_TIPI_1D} selected={form.gonderiTipi} onToggle={v => toggleCheck('gonderiTipi', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Teslimat Tercihi</div>
                      <CheckboxGrid items={TESLIMAT_TIPI_1D} selected={form.yuklemeTipi} onToggle={v => toggleCheck('yuklemeTipi', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <FormRow label="Ağırlık">
                      <input value={form.agirlik} onChange={e => set('agirlik', e.target.value)} className={inputCls} placeholder="kg" />
                    </FormRow>
                    <FormRow label="Boyut (En x Boy x Y)">
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)} className={inputCls} placeholder="30x20x15 cm" />
                    </FormRow>
                    <FormRow label="Adet">
                      <input value={form.adet} onChange={e => set('adet', e.target.value)} className={inputCls} placeholder="Kaç parça?" />
                    </FormRow>
                  </div>
                </div>
              )}

              {/* 1E — Intermodal */}
              {selectedCat === '1E' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">İstenen Taşıma Modları</div>
                      <CheckboxGrid items={MODAL_TIPI} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Konteyner Tipi</div>
                      <CheckboxGrid items={KONTEYNER_TIPI} selected={form.kasaTip} onToggle={v => toggleCheck('kasaTip', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <FormRow label="Çıkış Limanı / Noktası">
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)} className={inputCls} placeholder="İstanbul, Mersin Limanı..." />
                    </FormRow>
                    <FormRow label="Varış Ülkesi / Noktası">
                      <input value={form.varisIlce} onChange={e => set('varisIlce', e.target.value)} className={inputCls} placeholder="Almanya, Rotterdam..." />
                    </FormRow>
                  </div>
                </div>
              )}

              {/* 1F — Proje */}
              {selectedCat === '1F' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Talep Ettiğim Ekipmanlar</div>
                      <CheckboxGrid items={EKIPMAN_TIPI_1F} selected={form.tasitTipi} onToggle={v => toggleCheck('tasitTipi', v)} cols={2} />
                    </div>
                    <div className="space-y-3">
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Yük Ölçüleri</div>
                      <FormRow label="Ağırlık (Ton)">
                        <input value={form.agirlik} onChange={e => set('agirlik', e.target.value)} className={inputCls} placeholder="Ton" />
                      </FormRow>
                      <FormRow label="Uzunluk (m)">
                        <input value={form.boy} onChange={e => set('boy', e.target.value)} className={inputCls} placeholder="Metre" />
                      </FormRow>
                      <FormRow label="Genişlik (m)">
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
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Eşya / Ürün Tipi</div>
                      <CheckboxGrid items={ESYA_TIPI_1G} selected={form.gonderiTipi} onToggle={v => toggleCheck('gonderiTipi', v)} cols={2} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">İstenen Depo Tipi</div>
                      <CheckboxGrid items={DEPO_TIPI} selected={form.kasaTip} onToggle={v => toggleCheck('kasaTip', v)} cols={2} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <FormRow label="Toplam Alan (m²)">
                      <input value={form.adet} onChange={e => set('adet', e.target.value)} className={inputCls} placeholder="m²" />
                    </FormRow>
                    <FormRow label="Depolama Süresi">
                      <input value={form.tasitDiger} onChange={e => set('tasitDiger', e.target.value)} className={inputCls} placeholder="1 ay, 3 ay, süresiz..." />
                    </FormRow>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── 4: ÖZEL KOŞULLAR ─────────────────────────────────────────────── */}
          {(selectedCat === '1A' || selectedCat === '1E' || selectedCat === '1G') && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 lg:p-7">
                <SectionTitle>ISI KONTROLÜ, NEM VE ÖZEL KOŞULLAR</SectionTitle>
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
                    <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Isı Aralığı (°C)</div>
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
                    <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Nem (%)</div>
                    <input value={form.nem} onChange={e => set('nem', e.target.value)} className={inputCls} placeholder="% nem" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Havalandırma</div>
                    <input value={form.havalandirma} onChange={e => set('havalandirma', e.target.value)} className={inputCls} placeholder="Gerekli / Gerekmez" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 5: ÖLÇÜ VE AĞIRLIK ───────────────────────────────────────────── */}
          {selectedCat !== '1G' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 lg:p-7">
                <SectionTitle>YÜK ÖLÇÜ VE AĞIRLIK BİLGİLERİ</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {[
                    { label: 'Adet', field: 'adet' as keyof FormState, ph: '#' },
                    { label: 'Ağırlık', field: 'agirlik' as keyof FormState, ph: 'Ton/KG' },
                    { label: 'En (m)', field: 'en' as keyof FormState, ph: 'm' },
                    { label: 'Boy (m)', field: 'boy' as keyof FormState, ph: 'm' },
                    { label: 'Yükseklik (m)', field: 'yukseklik' as keyof FormState, ph: 'm' },
                    { label: 'Hacim (m³)', field: 'toplamHacim' as keyof FormState, ph: 'm³' },
                  ].map(({ label, field, ph }) => (
                    <div key={field} className="col-span-1">
                      <div className="text-[10px] font-black text-gray-500 uppercase tracking-wide mb-1.5">{label}</div>
                      <input type="number" value={form[field] as string} onChange={e => set(field, e.target.value)} className={inputCls} placeholder={ph} />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-wide mb-1.5">Toplam Ağırlık</div>
                    <input type="number" value={form.toplamAgirlik} onChange={e => set('toplamAgirlik', e.target.value)} className={inputCls} placeholder="Ton" />
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* ── 7: ÖZET ──────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 lg:p-7">
              <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Özet / Ek Notlar</div>
              <textarea value={form.ozet} onChange={e => set('ozet', e.target.value)} rows={4}
                className={`${inputCls} resize-none`}
                placeholder="Yükünüz hakkında eklemek istediğiniz önemli bilgiler, özel koşullar veya talepler..." />
            </div>
          </div>

          {/* ── 8: DOSYA + CAPTCHA + GÖNDER ──────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 lg:p-7 space-y-4">
              {/* Dosya Yükleme */}
              <div>
                <div className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Upload size={14} /> Dosya Yükle
                </div>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-brand-dark transition-all">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm font-semibold text-gray-500">İrsaliye, fatura veya yük görseli yükleyin</span>
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
                  className="w-5 h-5 rounded accent-brand-dark" />
                <div className="flex items-center gap-2 flex-1">
                  <Shield size={20} className="text-green-600" />
                  <div>
                    <div className="text-sm font-bold text-gray-800">Ben Robot Değilim</div>
                    <div className="text-xs text-gray-500">İlanınızın gerçek bir yük sahibi tarafından verildiğini onaylayın</div>
                  </div>
                </div>
              </label>

              {/* GÖNDER */}
              <button
                type="submit"
                className="w-full py-4 bg-brand-dark text-white font-black text-lg rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-brand-dark/20 flex items-center justify-center gap-3 active:scale-[0.99]"
              >
                <Send size={22} />
                GÖNDER — İLANI YAYINLA
              </button>

              <p className="text-center text-xs text-gray-400 leading-relaxed">
                İlanınız yayınlandığında uygun taşıyıcılarla otomatik eşleştirme başlayacak.
                Gelen teklifleri <span className="font-bold text-gray-600">Teklifler</span> sayfasından takip edebilirsiniz.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
