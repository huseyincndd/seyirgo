
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Plus, Megaphone, MapPin, Calendar, Truck,
  CheckCircle, Clock, XCircle, ChevronRight, Package, Edit3, Trash2
} from 'lucide-react';

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
  pending:  { label: 'İncelemede', color: 'bg-yellow-50 text-yellow-700 border-yellow-100', icon: Clock },
  expired:  { label: 'Süresi Doldu', color: 'bg-red-50 text-red-600 border-red-100', icon: XCircle },
};

const MY_LISTINGS = [
  {
    id: 'IL-2026-001',
    cat: '1A',
    from: 'İstanbul', to: 'Ankara',
    vehicle: 'Tır / Kapalı Kasa',
    capacity: '25 Ton',
    date: '24 Nis 2026',
    status: 'active',
    matches: 3,
  },
  {
    id: 'IL-2026-002',
    cat: '1A',
    from: 'Bursa', to: 'İzmir',
    vehicle: 'Kamyon / Tenteli',
    capacity: '10 Ton',
    date: '27 Nis 2026',
    status: 'active',
    matches: 2,
  },
  {
    id: 'IL-2026-003',
    cat: '1B',
    from: 'Ankara', to: 'İstanbul',
    vehicle: 'Kapalı Kasa Kamyon',
    capacity: '5 Ton',
    date: '20 Nis 2026',
    status: 'expired',
    matches: 0,
  },
];

export default function IlanlarimPage() {
  const router = useRouter();
  const [listings, setListings] = useState(MY_LISTINGS);

  const handleDelete = (id: string) => {
    if (confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
      setListings(prev => prev.filter(l => l.id !== id));
    }
  };

  const activeCount = listings.filter(l => l.status === 'active').length;
  const totalMatches = listings.reduce((sum, l) => sum + l.matches, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-5 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">İlanlarım</h1>
            <p className="text-xs text-slate-500 font-medium">Yayındaki ve geçmiş ilanlarınız</p>
          </div>
        </div>
        <Link href="/carrier/ilan-ekle"
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

        {/* İlan Listesi */}
        {listings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Megaphone size={48} className="text-gray-200 mx-auto mb-4" />
            <div className="font-bold text-gray-400">Henüz ilan vermediniz</div>
            <p className="text-sm text-gray-400 mt-1 mb-6">İlan vererek uygun yüklerle eşleşin.</p>
            <Link href="/carrier/ilan-ekle"
              className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-all">
              <Plus size={18} /> İlk İlanınızı Verin
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map(ilan => {
              const status = STATUS_MAP[ilan.status];
              const cat = CAT_MAP[ilan.cat];
              const StatusIcon = status.icon;
              return (
                <div key={ilan.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-5">
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${cat.color}`}>{ilan.cat} — {cat.label}</span>
                        <span className="text-xs text-gray-400 font-mono">{ilan.id}</span>
                      </div>
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${status.color}`}>
                        <StatusIcon size={12} /> {status.label}
                      </span>
                    </div>

                    {/* Route */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1 text-sm font-bold text-gray-500">
                        <MapPin size={14} className="text-green-500" /> {ilan.from}
                      </div>
                      <ChevronRight size={16} className="text-gray-300" />
                      <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                        <MapPin size={14} className="text-brand-orange" /> {ilan.to}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Araç</div>
                        <div className="text-xs font-bold text-slate-700">{ilan.vehicle}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Kapasite</div>
                        <div className="text-xs font-bold text-slate-700">{ilan.capacity}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tarih</div>
                        <div className="text-xs font-bold text-slate-700">{ilan.date}</div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      {ilan.matches > 0 ? (
                        <Link href="/carrier/uygun-yukler"
                          className="flex items-center gap-2 text-sm font-bold text-brand-dark hover:underline">
                          <Package size={15} className="text-brand-orange" />
                          {ilan.matches} yük eşleşmesi
                          <ChevronRight size={14} />
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-400">Henüz eşleşme yok</span>
                      )}
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit3 size={15} />
                        </button>
                        <button onClick={() => handleDelete(ilan.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
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

        {/* Yeni ilan CTA */}
        {listings.length > 0 && (
          <Link href="/carrier/ilan-ekle"
            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-brand-dark hover:text-brand-dark hover:bg-white transition-all font-bold text-sm">
            <Plus size={18} /> Yeni İlan Ver
          </Link>
        )}
      </div>
    </div>
  );
}
