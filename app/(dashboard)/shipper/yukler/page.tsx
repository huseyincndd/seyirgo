'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Plus, Package, MapPin, Calendar, Truck,
  CheckCircle, Clock, XCircle, ChevronRight, Trash2,
  Edit3, Search, Loader2, Eye
} from 'lucide-react';
import { apiFetch } from '@/lib/client-api';
import type { SerializedCargoListing } from '@/lib/cargo-listings/serialize';

const CAT_MAP: Record<string, { label: string; color: string }> = {
  '1A': { label: 'Karayolu', color: 'bg-blue-100 text-blue-700' },
  '1B': { label: 'Ev/Ofis', color: 'bg-indigo-100 text-indigo-700' },
  '1C': { label: 'Araç Taşıma', color: 'bg-purple-100 text-purple-700' },
  '1D': { label: 'Kurye', color: 'bg-green-100 text-green-700' },
  '1E': { label: 'Intermodal', color: 'bg-cyan-100 text-cyan-700' },
  '1F': { label: 'Proje', color: 'bg-yellow-100 text-yellow-700' },
  '1G': { label: 'Depolama', color: 'bg-slate-100 text-slate-700' },
};

const STATUS_MAP: Record<string, { label: string; color: string; icon: React.ComponentType<{size: number}> }> = {
  active:   { label: 'Yayında', color: 'bg-green-50 text-green-700 border-green-100', icon: CheckCircle },
  paused:   { label: 'Durduruldu', color: 'bg-yellow-50 text-yellow-700 border-yellow-100', icon: Clock },
  expired:  { label: 'Süresi Doldu', color: 'bg-red-50 text-red-600 border-red-100', icon: XCircle },
};

export default function YuklerPage() {
  const router = useRouter();
  const [loads, setLoads] = useState<SerializedCargoListing[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadListings = useCallback(async () => {
    setLoading(true);
    const res = await apiFetch<SerializedCargoListing[]>('/api/shipper/listings');
    if (res.success && res.data) {
      setLoads(res.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  const filtered = loads.filter(l =>
    search === '' ||
    l.details.yukCinsi?.toLowerCase().includes(search.toLowerCase()) ||
    l.route.from.toLowerCase().includes(search.toLowerCase()) ||
    l.route.to.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
      const res = await apiFetch(`/api/shipper/listings/${id}`, { method: 'DELETE' });
      if (res.success) {
        setLoads(prev => prev.filter(l => l.id !== id));
      }
    }
  };

  const activeCount = loads.filter(l => l.status === 'active').length;
  const totalMatches = 0; // Eşleşme sistemi ileride bağlanacak

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
        <Loader2 className="animate-spin text-brand-dark" size={32} />
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
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Yüklerim</h1>
            <p className="text-xs text-slate-500 font-medium">Yük ilanlarınızı yönetin</p>
          </div>
        </div>
        <Link href="/shipper/yeni-ilan"
          className="flex items-center gap-2 bg-brand-dark text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm">
          <Plus size={16} /> Yeni İlan
        </Link>
      </header>

      <div className="p-5 lg:p-8 max-w-3xl mx-auto space-y-5">

        {/* Özet */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="text-3xl font-black text-slate-900 mb-1">{activeCount}</div>
            <div className="text-sm font-semibold text-slate-600">Aktif İlan</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="text-3xl font-black text-brand-orange mb-1">{totalMatches}</div>
            <div className="text-sm font-semibold text-slate-600">Toplam Eşleşme</div>
          </div>
        </div>

        {/* Arama */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="İlan, şehir veya yük tipi ara..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition-all shadow-sm"
          />
        </div>

        {/* Liste */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Package size={48} className="text-gray-200 mx-auto mb-4" />
            <div className="font-bold text-gray-400">İlan bulunamadı</div>
            <p className="text-sm text-gray-400 mt-1 mb-6">Henüz ilan vermediniz veya arama sonucu boş.</p>
            <Link href="/shipper/yeni-ilan"
              className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-all">
              <Plus size={18} /> İlk İlanınızı Verin
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(load => {
              const status = STATUS_MAP[load.status as keyof typeof STATUS_MAP] || STATUS_MAP['active'];
              const cat = CAT_MAP[load.categoryId as keyof typeof CAT_MAP] || CAT_MAP['1A'];
              const StatusIcon = status.icon;
              return (
                <div key={load.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-5">
                    {/* Top */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${cat.color}`}>{load.categoryId} — {cat.label}</span>
                        <span className="text-xs text-gray-400 font-mono">{load.id.slice(0,8)}...</span>
                      </div>
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${status.color}`}>
                        <StatusIcon size={12} /> {status.label}
                      </span>
                    </div>

                    {/* Başlık */}
                    <div className="font-black text-slate-900 text-lg mb-3">{load.details?.yukCinsi || 'Belirtilmemiş Yük'}</div>

                    {/* Route */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1 text-sm font-bold text-gray-500">
                        <MapPin size={14} className="text-green-500" /> {load.route.from}
                      </div>
                      <ChevronRight size={14} className="text-gray-300" />
                      <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                        <MapPin size={14} className="text-brand-orange" /> {load.route.to}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-gray-400">
                      <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md"><Eye size={12} /> {load.viewCount || 0} görüntülenme</span>
                      <span className="flex items-center gap-1 text-brand-orange bg-orange-50 px-2 py-1 rounded-md"><Truck size={12} /> {load.matchCount || 0} taşıyıcı havuzunda</span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Ağırlık</div>
                        <div className="text-xs font-bold text-slate-700">{load.details?.agirlik || '-'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Araç Tercihi</div>
                        <div className="text-xs font-bold text-slate-700 line-clamp-1">{load.details?.tasitTipi?.[0] || 'Farketmez'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tarih</div>
                        <div className="text-xs font-bold text-slate-700 flex items-center gap-1 line-clamp-1">
                          <Calendar size={11} className="text-brand-orange shrink-0" /> {load.details?.yuklemeTarihi || '-'}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">Henüz eşleşme yok</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleDelete(load.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filtered.length > 0 && (
          <Link href="/shipper/yeni-ilan"
            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-brand-dark hover:text-brand-dark hover:bg-white transition-all font-bold text-sm">
            <Plus size={18} /> Yeni İlan Ver
          </Link>
        )}
      </div>
    </div>
  );
}
