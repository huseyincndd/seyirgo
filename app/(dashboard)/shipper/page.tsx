'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Truck, Navigation, CheckCircle2, Plus, Loader2, MapPin, ChevronRight, Calendar, Eye } from 'lucide-react';
import { useSession } from '@/app/providers/SessionProvider';
import DashboardPageHeader from '@/app/components/dashboard/DashboardPageHeader';
import EmptyPanel from '@/app/components/dashboard/EmptyPanel';
import { apiFetch } from '@/lib/client-api';
import type { SerializedCargoListing } from '@/lib/cargo-listings/serialize';

export default function ShipperDashboard() {
  const { user, loading: authLoading } = useSession();
  const [loads, setLoads] = useState<SerializedCargoListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await apiFetch<SerializedCargoListing[]>('/api/shipper/listings');
      if (res.success && res.data) {
        setLoads(res.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (authLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-dark" size={36} />
      </div>
    );
  }

  const activeCount = loads.filter(l => l.status === 'active').length;
  const totalMatches = loads.reduce((sum, l) => sum + (l.matchCount || 0), 0);
  const totalViews = loads.reduce((sum, l) => sum + (l.viewCount || 0), 0);

  const stats = [
    { label: 'Aktif İlanlarım', value: loading ? '-' : activeCount.toString(), sub: 'Sistemde yayında', icon: Package, color: 'bg-blue-50 text-brand-dark' },
    { label: 'Eşleşen Taşıyıcı', value: loading ? '-' : totalMatches.toString(), sub: `${totalViews} kez görüntülendi`, icon: Truck, color: 'bg-orange-50 text-brand-orange' },
    { label: 'Aktif Taşıma', value: '0', sub: 'Devam eden yok', icon: Navigation, color: 'bg-green-50 text-green-600' },
    { label: 'Tamamlanan İş', value: '0', sub: 'Bu ay', icon: CheckCircle2, color: 'bg-slate-50 text-slate-600' },
  ];

  const recentLoads = loads.slice(0, 3); // Son 3 ilan

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      <DashboardPageHeader
        firstName={user.firstName}
        lastName={user.lastName}
        role="shipper"
        action={{ label: 'Yeni İlan Ver', href: '/shipper/yeni-ilan' }}
        subtitle={user.companyTitle ? `${user.companyTitle} — yüklerinizi yönetin` : undefined}
      />

      <div className="p-5 lg:p-8 max-w-[1400px] mx-auto space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div className="text-3xl font-black text-slate-900">{s.value}</div>
              <div className="text-sm font-semibold text-slate-600">{s.label}</div>
              <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-slate-900">Aktif Taşıma</span>
                <Link href="/shipper/aktif-tasimalar" className="text-xs font-bold text-brand-dark hover:underline">Tümü</Link>
              </div>
              <EmptyPanel
                icon={Truck}
                title="Aktif taşımanız yok"
                description="İlan verip taşıyıcı eşleşmesi aldığınızda taşımalar burada görünecek."
                action={{ label: 'Yeni İlan Ver', href: '/shipper/yeni-ilan' }}
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Son İlanlarım</h3>
                <Link href="/shipper/yukler" className="text-xs font-bold text-brand-dark hover:underline">Tümü</Link>
              </div>
              
              {loading ? (
                <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-gray-400" /></div>
              ) : recentLoads.length === 0 ? (
                <EmptyPanel
                  icon={Package}
                  title="Henüz ilanınız yok"
                  description="İlk yük ilanınızı oluşturarak taşıyıcılarla eşleşmeye başlayın."
                  action={{ label: 'İlan Ver', href: '/shipper/yeni-ilan' }}
                />
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentLoads.map(load => (
                    <div key={load.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                            {load.categoryId}
                          </span>
                          <span className="font-bold text-slate-900 text-sm">
                            {load.details?.yukCinsi || 'Belirtilmemiş Yük'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                            <MapPin size={12} className="text-green-500" /> {load.route.from}
                          </div>
                          <ChevronRight size={12} className="text-gray-300" />
                          <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                            <MapPin size={12} className="text-brand-orange" /> {load.route.to}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-gray-400">
                          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded"><Eye size={12} /> {load.viewCount || 0} görüntülenme</span>
                          <span className="flex items-center gap-1 text-brand-orange bg-orange-50 px-1.5 py-0.5 rounded"><Truck size={12} /> {load.matchCount || 0} taşıyıcı havuzunda</span>
                        </div>
                      </div>
                      <Link href="/shipper/yukler" className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm transition-all text-gray-400 hover:text-brand-dark">
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/shipper/yeni-ilan" className="bg-brand-dark text-white rounded-2xl p-5 flex flex-col items-center text-center gap-2 col-span-2 hover:bg-slate-800 transition-all">
              <Plus size={22} />
              <span className="font-black text-sm">Yeni İlan Ver</span>
            </Link>
            <Link href="/shipper/yukler" className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-2 hover:shadow-md transition-all">
              <Package size={22} className="text-brand-dark" />
              <span className="font-black text-sm">Yüklerim</span>
              <span className="text-[11px] text-gray-400">{loading ? '-' : loads.length} ilan</span>
            </Link>
            <Link href="/shipper/aktif-tasimalar" className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-2 hover:shadow-md transition-all">
              <Truck size={22} className="text-green-600" />
              <span className="font-black text-sm">Taşımalar</span>
              <span className="text-[11px] text-gray-400">0 aktif</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
