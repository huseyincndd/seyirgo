'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Plus, Megaphone, Loader2, Trash2, CheckCircle } from 'lucide-react';
import { apiFetch } from '@/lib/client-api';
import type { SerializedCarrierListing } from '@/lib/carrier-listings/serialize';
import { RoutePreviewCard } from '@/app/components/carrier/RoutePreviewCard';

export default function IlanlarimPage() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<SerializedCarrierListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreated, setShowCreated] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await apiFetch<SerializedCarrierListing[]>('/api/carrier/listings');
    if (res.success && res.data) setListings(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    if (searchParams.get('created') === '1') {
      setShowCreated(true);
      const t = setTimeout(() => setShowCreated(false), 6000);
      return () => clearTimeout(t);
    }
  }, [load, searchParams]);

  const handleDelete = async (id: string) => {
    if (!confirm('Bu rota ilanını kaldırmak istiyor musunuz?')) return;
    const res = await apiFetch(`/api/carrier/listings/${id}`, { method: 'DELETE' });
    if (res.success) await load();
  };

  const activeCount = listings.filter((l) => l.status === 'active').length;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-orange" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] pb-20">
      <div className="bg-gradient-to-br from-brand-dark via-slate-900 to-slate-950 text-white">
        <div className="max-w-3xl mx-auto px-5 pt-8 pb-10 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">İlanlarım</h1>
            <p className="text-sm text-white/60 mt-1">Yayında olan rota ilanları</p>
          </div>
          <Link
            href="/carrier/ilan-ekle"
            className="shrink-0 flex items-center gap-2 bg-brand-orange text-white text-sm font-bold px-5 py-3 rounded-2xl shadow-lg shadow-brand-orange/30 hover:opacity-95"
          >
            <Plus size={18} />
            Yeni ilan
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 -mt-4 space-y-4">
        {showCreated && (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-sm font-semibold text-emerald-800 shadow-sm">
            <CheckCircle size={20} className="shrink-0" />
            Rota ilanınız yayında!
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-3xl font-black text-brand-orange">{activeCount}</p>
            <p className="text-xs font-bold text-gray-500 mt-1">Aktif rota</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-3xl font-black text-slate-900">{listings.length}</p>
            <p className="text-xs font-bold text-gray-500 mt-1">Toplam</p>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-5">
              <Megaphone size={32} className="text-brand-orange" />
            </div>
            <h2 className="text-lg font-black text-slate-900">Henüz rota ilanı yok</h2>
            <p className="text-sm text-gray-500 mt-2 mb-8 max-w-xs mx-auto">
              Araç ve güzergah seçerek dakikalar içinde müsaitlik ilanı oluşturun.
            </p>
            <Link
              href="/carrier/ilan-ekle"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange to-orange-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-brand-orange/25"
            >
              <Plus size={20} />
              İlk ilanı ver
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((ilan) => (
              <article
                key={ilan.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex justify-end mb-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(ilan.id)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      aria-label="Sil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <RoutePreviewCard
                    from={ilan.route.from}
                    to={ilan.route.to}
                    isTurkeyWide={ilan.destinationType === 'TURKEY_WIDE'}
                    plate={ilan.vehicle.plate}
                    vehicleMeta={`${ilan.vehicle.type} · ${ilan.vehicle.capacityLabel}`}
                    compact
                  />
                  {ilan.note && (
                    <p className="text-xs text-gray-500 mt-3 px-1 italic">&quot;{ilan.note}&quot;</p>
                  )}
                </div>
              </article>
            ))}

            <Link
              href="/carrier/ilan-ekle"
              className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-brand-orange hover:text-brand-orange font-bold text-sm transition-colors"
            >
              <Plus size={18} />
              Başka rota ekle
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
