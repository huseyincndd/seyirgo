'use client';

import Link from 'next/link';
import { Package, Truck, Navigation, CheckCircle2, Plus, Loader2 } from 'lucide-react';
import { useSession } from '@/app/providers/SessionProvider';
import DashboardPageHeader from '@/app/components/dashboard/DashboardPageHeader';
import EmptyPanel from '@/app/components/dashboard/EmptyPanel';

export default function ShipperDashboard() {
  const { user, loading } = useSession();

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-dark" size={36} />
      </div>
    );
  }

  const stats = [
    { label: 'Aktif İlanlarım', value: '0', sub: 'Henüz ilan yok', icon: Package, color: 'bg-blue-50 text-brand-dark' },
    { label: 'Eşleşen Taşıyıcı', value: '0', sub: 'Eşleşme bekleniyor', icon: Truck, color: 'bg-orange-50 text-brand-orange' },
    { label: 'Aktif Taşıma', value: '0', sub: 'Devam eden yok', icon: Navigation, color: 'bg-green-50 text-green-600' },
    { label: 'Tamamlanan İş', value: '0', sub: 'Bu ay', icon: CheckCircle2, color: 'bg-slate-50 text-slate-600' },
  ];

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
              <EmptyPanel
                icon={Package}
                title="Henüz ilanınız yok"
                description="İlk yük ilanınızı oluşturarak taşıyıcılarla eşleşmeye başlayın."
                action={{ label: 'İlan Ver', href: '/shipper/yeni-ilan' }}
              />
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
              <span className="text-[11px] text-gray-400">0 ilan</span>
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
