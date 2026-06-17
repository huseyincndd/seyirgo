'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Package, MapPin, Calendar, Truck, Phone, Eye,
  X, CheckCircle, ArrowRight, Filter, Search, Info, Lock, Loader2
} from 'lucide-react';
import { apiFetch } from '@/lib/client-api';
import type { SerializedCargoListing } from '@/lib/cargo-listings/serialize';

type MatchItem = SerializedCargoListing & {
  matchedVehicle: string;
  matchScore: number;
  shipper: {
    firstName: string;
    lastName: string;
    companyTitle: string;
    phone: string;
    email: string;
  };
};

const CAT_LABELS: Record<string, string> = {
  'Tümü': 'Tümü',
  '1A': 'Karayolu',
  '1B': 'Ev/Ofis',
  '1C': 'Araç Taşıma',
  '1D': 'Kurye',
  '1E': 'Intermodal',
  '1F': 'Proje',
  '1G': 'Depolama',
};

// ─── ANA SAYFA ────────────────────────────────────────────────────────────────

export default function UygunYuklerPage() {
  const router = useRouter();
  const [loads, setLoads] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [selectedLoad, setSelectedLoad] = useState<MatchItem | null>(null);
  const [viewedIds, setViewedIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchMatches() {
      const res = await apiFetch<MatchItem[]>('/api/carrier/matches');
      if (res.success && res.data) {
        setLoads(res.data);
      }
      setLoading(false);
    }
    fetchMatches();
  }, []);

  const filtered = loads.filter(l => {
    const matchCat = catFilter === 'Tümü' || l.categoryId === catFilter;
    const matchSearch = search === '' ||
      l.route.from.toLowerCase().includes(search.toLowerCase()) ||
      l.route.to.toLowerCase().includes(search.toLowerCase()) ||
      (l.details?.yukCinsi || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleViewInfo = async (load: MatchItem) => {
    setSelectedLoad(load);
    if (!viewedIds.includes(load.id)) {
      setViewedIds(prev => [...prev, load.id]);
      // Bildirimi API'ye gönder (viewCount artar)
      await apiFetch(`/api/shipper/listings/${load.id}/view`, { method: 'POST' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-dark" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-5 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Uygun Yükler</h1>
            <p className="text-xs text-slate-500 font-medium">İlanlarınıza eşleşen yük talepleri</p>
          </div>
        </div>
        <span className="bg-brand-dark text-white text-xs font-bold px-3 py-1.5 rounded-full">
          {filtered.length} Eşleşme
        </span>
      </header>

      <div className="p-5 lg:p-8 max-w-4xl mx-auto space-y-5">

        {/* Bilgi Notu */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
          <Info size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 leading-relaxed">
            Araç ilanlarınıza uyan tüm yük taleplerini görüntülüyorsunuz.
            <span className="font-bold"> "Bilgileri Gör"</span> butonuna basarak yük sahibinin iletişim bilgilerini açabilir, doğrudan arayabilirsiniz.
          </p>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Şehir veya yük tipi ara..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(CAT_LABELS).map(([key, label]) => (
              <button key={key} onClick={() => setCatFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  catFilter === key
                    ? 'bg-brand-dark text-white border-brand-dark'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Yük Listesi */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Package size={48} className="text-gray-200 mx-auto mb-4" />
            <div className="font-bold text-gray-400">Eşleşen yük bulunamadı</div>
            <p className="text-sm text-gray-400 mt-1">Sistem rotanıza uygun bir yük ilanı bulamadı. Yeni bir rota ekleyebilir veya daha sonra tekrar kontrol edebilirsiniz.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(load => {
              const isViewed = viewedIds.includes(load.id);
              return (
                <div key={load.id} className={`bg-white rounded-2xl border shadow-sm transition-all hover:shadow-md ${
                  isViewed ? 'border-gray-100' : 'border-gray-200'
                }`}>
                  <div className="p-5">
                    {/* Top Row */}
                    <div className="flex items-start justify-between mb-4 gap-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="bg-brand-dark text-white text-[10px] font-black px-2 py-1 rounded-lg">{load.categoryId}</span>
                        <div className="flex items-center gap-2 text-base font-black text-slate-900">
                          <span>{load.route.from}</span>
                          <ArrowRight size={16} className="text-gray-300" />
                          <span className="text-brand-dark">{load.route.to}</span>
                        </div>
                        {isViewed && (
                          <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                            <Eye size={11} /> İletişime Geçildi
                          </span>
                        )}
                      </div>
                      <div className="flex-shrink-0 bg-green-50 border border-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        %{load.matchScore} eşleşme
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Yük Tipi</div>
                        <div className="text-sm font-bold text-slate-700 truncate" title={load.details?.yukCinsi}>{load.details?.yukCinsi || 'Belirtilmemiş'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Ağırlık</div>
                        <div className="text-sm font-bold text-slate-700">{load.details?.agirlik ? `${load.details.agirlik} Ton` : 'Belirtilmemiş'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Araç Eşleşmesi</div>
                        <div className="text-sm font-bold text-slate-700">{load.matchedVehicle}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Yükleme Tarihi</div>
                        <div className="text-sm font-bold text-slate-700 flex items-center gap-1 truncate" title={load.details?.yuklemeTarihi || 'Belirtilmemiş'}>
                          <Calendar size={13} className="text-brand-orange" /> {load.details?.yuklemeTarihi || 'Belirtilmemiş'}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleViewInfo(load)}
                        className="flex-1 flex items-center justify-center gap-2 bg-brand-dark text-white font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-all text-sm"
                      >
                        {isViewed ? <><Eye size={16} /> İletişim Bilgilerini Gör</> : <><Lock size={16} /> Bilgileri Gör</>}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── İletişim Bilgileri Modal ─────────────────────────────────────── */}
      {selectedLoad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedLoad(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="bg-brand-dark text-white px-6 py-5 flex items-center justify-between">
              <div>
                <div className="font-black text-lg">İletişim Bilgileri</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {selectedLoad.route.from} → {selectedLoad.route.to} • {selectedLoad.details?.yukCinsi}
                </div>
              </div>
              <button onClick={() => setSelectedLoad(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">

              {/* Onay İkonu */}
              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl p-4">
                <CheckCircle size={24} className="text-green-500 flex-shrink-0" />
                <div className="text-sm text-green-800">
                  <span className="font-bold">İletişim bilgileri açıldı.</span> Yük sahibine ilanı Seyirgo üzerinden gördüğünüzü belirterek teklifinizi sunabilirsiniz.
                </div>
              </div>

              {/* Kişi Bilgileri */}
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Yük Sahibi</div>
                  <div className="font-black text-slate-900 text-lg">{selectedLoad.shipper.firstName} {selectedLoad.shipper.lastName}</div>
                  {selectedLoad.shipper.companyTitle && <div className="text-sm text-gray-500">{selectedLoad.shipper.companyTitle}</div>}
                </div>

                <a href={`tel:${selectedLoad.shipper.phone}`}
                  className="flex items-center gap-4 bg-green-50 border-2 border-green-200 rounded-xl p-4 hover:bg-green-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <Phone size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-0.5">Telefon — Hemen Ara</div>
                    <div className="font-black text-slate-900 text-xl tracking-wide">{selectedLoad.shipper.phone}</div>
                  </div>
                </a>
              </div>

              {/* Yük Özeti */}
              <div className="border-t border-gray-100 pt-4">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">İlan Detayı</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] font-bold text-gray-400 uppercase">Güzergah</div>
                    <div className="text-xs font-bold text-slate-700 mt-0.5 leading-tight">{selectedLoad.route.from} → {selectedLoad.route.to}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <div className="text-[9px] font-bold text-gray-400 uppercase">Tarih Esnekliği</div>
                    <div className="text-xs font-bold text-slate-700 mt-0.5 leading-tight">
                      {selectedLoad.details?.yuklemeTarihiTipi === 'flexible' ? 'Zamanı Belli Değil' : selectedLoad.details?.yuklemeTarihi || 'Belirtilmemiş'}
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => setSelectedLoad(null)}
                className="w-full py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
