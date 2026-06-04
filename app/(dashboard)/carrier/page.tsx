'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Truck, Package, ChevronRight, Navigation, ArrowRight,
  CheckCircle2, Megaphone, Plus, Search, Loader2,
} from 'lucide-react';
import { useSession } from '@/app/providers/SessionProvider';
import DashboardPageHeader from '@/app/components/dashboard/DashboardPageHeader';
import EmptyPanel from '@/app/components/dashboard/EmptyPanel';
import { apiFetch } from '@/lib/client-api';
import type { Vehicle } from '@/app/types';

const VEHICLE_STATUS: Record<string, { label: string; color: string; dot: string }> = {
  available: { label: 'Müsait', color: 'bg-green-50 text-green-700 border-green-100', dot: 'bg-green-500' },
  active: { label: 'Yolda', color: 'bg-blue-50 text-blue-700 border-blue-100', dot: 'bg-blue-500' },
  maintenance: { label: 'Bakımda', color: 'bg-yellow-50 text-yellow-700 border-yellow-100', dot: 'bg-yellow-400' },
};

export default function CarrierDashboard() {
  const { user, loading } = useSession();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehiclesLoading, setVehiclesLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    apiFetch<Vehicle[]>('/api/vehicles').then((res) => {
      if (res.success && res.data) setVehicles(res.data);
      setVehiclesLoading(false);
    });
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-orange" size={36} />
      </div>
    );
  }

  const vehicleCount = user.vehicleCount ?? vehicles.length;
  const availableCount = vehicles.filter((v) => v.status === 'available').length;
  const activeCount = vehicles.filter((v) => v.status === 'active').length;

  const stats = [
    { label: 'Aktif İlanlarım', value: '0', sub: 'Henüz ilan yok', icon: Megaphone, color: 'bg-orange-50 text-brand-orange' },
    { label: 'Uygun Yükler', value: '0', sub: 'Eşleşme bekleniyor', icon: Package, color: 'bg-blue-50 text-brand-dark' },
    {
      label: 'Araçlarım',
      value: String(vehicleCount),
      sub: vehicleCount > 0 ? `${availableCount} müsait, ${activeCount} yolda` : 'Araç ekleyin',
      icon: Truck,
      color: 'bg-slate-50 text-slate-600',
    },
    { label: 'Tamamlanan İş', value: '0', sub: 'Bu ay', icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
  ];

  const quickActions = [
    { label: 'İlan Ver', sub: 'Kapasite ilanı', href: '/carrier/ilan-ekle', color: 'bg-brand-orange text-white', icon: Plus },
    { label: 'Uygun Yükler', sub: 'Yük ara', href: '/carrier/uygun-yukler', color: 'bg-brand-dark text-white', icon: Search },
    { label: 'Araçlarım', sub: `${vehicleCount} araç`, href: '/carrier/araclarim', color: 'bg-white text-slate-700', icon: Truck },
    { label: 'Aktif Taşıma', sub: '0 devam ediyor', href: '/carrier/aktif-tasimalar', color: 'bg-white text-slate-700', icon: Navigation },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      <DashboardPageHeader
        firstName={user.firstName}
        lastName={user.lastName}
        role="carrier"
        subtitle={
          user.companyTitle
            ? `${user.companyTitle} — filonuzu yönetin`
            : undefined
        }
      />

      <div className="p-5 lg:p-8 max-w-[1400px] mx-auto space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-0.5">{s.value}</div>
              <div className="text-sm font-semibold text-slate-600">{s.label}</div>
              <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <span className="font-bold text-slate-900">Aktif Taşıma</span>
                <Link href="/carrier/aktif-tasimalar" className="text-xs font-bold text-brand-orange flex items-center gap-1 hover:underline">
                  Tümü <ChevronRight size={14} />
                </Link>
              </div>
              <EmptyPanel
                icon={Truck}
                title="Aktif taşımanız yok"
                description="İlan verip yük eşleşmesi aldığınızda taşımalarınız burada görünecek."
                action={{ label: 'Uygun Yükleri Gör', href: '/carrier/uygun-yukler' }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((a, i) => (
                <Link
                  key={i}
                  href={a.href}
                  className={`${a.color} rounded-2xl p-5 flex flex-col items-center justify-center text-center border border-gray-100 hover:shadow-lg transition-all`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${i < 2 ? 'bg-white/20' : 'bg-gray-100'}`}>
                    <a.icon size={22} />
                  </div>
                  <div className="font-black text-sm">{a.label}</div>
                  <div className={`text-[11px] mt-0.5 ${i < 2 ? 'opacity-70' : 'text-gray-400'}`}>{a.sub}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Eşleşen Yükler</h3>
                <Link href="/carrier/uygun-yukler" className="text-xs font-bold text-brand-orange hover:underline">Tümü</Link>
              </div>
              <EmptyPanel
                icon={Package}
                title="Henüz eşleşme yok"
                description="İlan verdiğinizde size uygun yükler burada listelenecek."
                action={{ label: 'İlan Ver', href: '/carrier/ilan-ekle' }}
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Araç Durumu</h3>
                <Link href="/carrier/araclarim" className="text-xs font-bold text-brand-orange hover:underline">Yönet</Link>
              </div>
              {vehiclesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="animate-spin text-gray-400" size={24} />
                </div>
              ) : vehicles.length === 0 ? (
                <EmptyPanel
                  icon={Truck}
                  title="Araç eklenmedi"
                  description="Filosunuza araç ekleyerek ilan verebilirsiniz."
                  action={{ label: 'Araç Ekle', href: '/carrier/araclarim' }}
                />
              ) : (
                <div className="space-y-3">
                  {vehicles.slice(0, 4).map((v) => {
                    const s = VEHICLE_STATUS[v.status] ?? VEHICLE_STATUS.available;
                    return (
                      <div key={v.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-slate-900">{v.plate}</div>
                          <div className="text-xs text-gray-500 truncate">
                            {[v.brand, v.model].filter(Boolean).join(' ') || v.type}
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${s.color}`}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
