
'use client';
import React from 'react';
import Link from 'next/link';
import {
  Package, Truck, Clock, Plus, ArrowRight,
  CheckCircle2, ChevronRight, MapPin, Bell,
  Navigation, ShieldCheck, Phone
} from 'lucide-react';

const STATS = [
  { label: 'Aktif İlanlarım', value: '3', sub: '2 eşleşme var', icon: Package, color: 'bg-blue-50 text-brand-dark' },
  { label: 'Eşleşen Taşıyıcı', value: '5', sub: 'Bugün güncellendi', icon: Truck, color: 'bg-orange-50 text-brand-orange' },
  { label: 'Aktif Taşıma', value: '1', sub: 'Yolda, T.V: 20:30', icon: Navigation, color: 'bg-green-50 text-green-600' },
  { label: 'Tamamlanan İş', value: '8', sub: 'Bu ay', icon: CheckCircle2, color: 'bg-slate-50 text-slate-600' },
];

const ACTIVE_SHIPMENT = {
  id: 'TS-2026-089',
  cargo: 'Endüstriyel Mutfak Ekipmanı',
  carrier: 'Öztürk Lojistik',
  carrierPhone: '0532 111 22 33',
  plate: '34 VP 1923',
  from: 'İstanbul', fromSub: 'İkitelli',
  to: 'Antalya', toSub: 'Muratpaşa',
  progress: 72,
  eta: 'Bugün, 20:30',
};

const RECENT_LOADS = [
  { id: 'YK-101', title: 'Ofis Mobilyaları', from: 'İstanbul', to: 'Ankara', status: 'active', matches: 3, date: 'Bugün' },
  { id: 'YK-102', title: 'Tekstil Kolileri', from: 'Bursa', to: 'İzmir', status: 'active', matches: 2, date: 'Dün' },
  { id: 'YK-103', title: 'Makine Parçası', from: 'Kocaeli', to: 'Adana', status: 'expired', matches: 0, date: '18 Nis' },
];

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  active:  { label: 'Yayında', color: 'bg-green-100 text-green-700' },
  expired: { label: 'Süresi Doldu', color: 'bg-gray-100 text-gray-500' },
};

export default function ShipperDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Genel Bakış</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Hoş geldin, yüklerini buradan yönet.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/shipper/yeni-ilan"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-brand-dark text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-all shadow-sm">
            <Plus size={16} /> Yeni İlan Ver
          </Link>
          <button className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-gray-200">
            <div className="w-9 h-9 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">AK</div>
            <div className="text-sm leading-tight">
              <div className="font-bold text-slate-900">Ahmet Koç</div>
              <div className="text-xs text-slate-500">Yük Veren</div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-5 lg:p-8 max-w-[1400px] mx-auto space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
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

          {/* LEFT: Aktif Taşıma + Son İlanlar */}
          <div className="lg:col-span-2 space-y-6">

            {/* Aktif Taşıma */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-bold text-slate-900">Aktif Taşıma</span>
                  <span className="text-xs font-mono text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded">{ACTIVE_SHIPMENT.id}</span>
                </div>
                <Link href="/shipper/aktif-tasimalar" className="text-xs font-bold text-brand-dark flex items-center gap-1 hover:underline">
                  Detay <ChevronRight size={14} />
                </Link>
              </div>

              <div className="p-6">
                {/* Route */}
                <div className="flex items-stretch gap-3 mb-5">
                  <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                    <div className="text-[10px] font-bold text-brand-dark uppercase tracking-wider mb-1">Çıkış</div>
                    <div className="font-black text-slate-900">{ACTIVE_SHIPMENT.from}</div>
                    <div className="text-xs text-gray-500">{ACTIVE_SHIPMENT.fromSub}</div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="bg-brand-dark text-white p-1.5 rounded-full animate-bounce">
                      <Truck size={14} />
                    </div>
                    <ChevronRight size={12} className="text-gray-300" />
                  </div>
                  <div className="flex-1 bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
                    <div className="text-[10px] font-bold text-brand-orange uppercase tracking-wider mb-1">Varış</div>
                    <div className="font-black text-slate-900">{ACTIVE_SHIPMENT.to}</div>
                    <div className="text-xs text-gray-500">{ACTIVE_SHIPMENT.toSub}</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span className="font-medium">Rota İlerlemesi</span>
                    <span className="font-bold text-brand-dark">{ACTIVE_SHIPMENT.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-dark rounded-full" style={{ width: `${ACTIVE_SHIPMENT.progress}%` }} />
                  </div>
                </div>

                {/* Info + CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    {[
                      { label: 'Yük', value: ACTIVE_SHIPMENT.cargo },
                      { label: 'Taşıyıcı', value: ACTIVE_SHIPMENT.carrier },
                      { label: 'T. Varış', value: ACTIVE_SHIPMENT.eta },
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">{item.label}</div>
                        <div className="text-xs font-bold text-slate-700 leading-snug">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <a href={`tel:${ACTIVE_SHIPMENT.carrierPhone}`}
                    className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold px-4 py-3 rounded-xl hover:bg-green-600 transition-colors text-sm sm:w-36 shadow-md whitespace-nowrap">
                    <Phone size={16} /> Taşıyıcıyı Ara
                  </a>
                </div>
              </div>
            </div>

            {/* Son İlanlarım */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Son İlanlarım</h3>
                <Link href="/shipper/yukler" className="text-xs font-bold text-brand-dark hover:underline">Tümü</Link>
              </div>
              <div className="divide-y divide-gray-100">
                {RECENT_LOADS.map(load => {
                  const s = STATUS_LABEL[load.status];
                  return (
                    <div key={load.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-brand-dark flex-shrink-0">
                          <Package size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{load.title}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <MapPin size={10} /> {load.from} → {load.to}
                            <span className="text-gray-300 mx-1">·</span> {load.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {load.matches > 0 && (
                          <span className="text-xs font-bold text-brand-orange bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">
                            {load.matches} eşleşme
                          </span>
                        )}
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Hızlı İşlemler + Destek */}
          <div className="space-y-6">

            {/* Hızlı İşlemler */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/shipper/yeni-ilan"
                className="bg-brand-dark text-white rounded-2xl p-5 flex flex-col items-center text-center gap-2 hover:bg-slate-800 transition-all shadow-md group">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus size={22} />
                </div>
                <span className="font-black text-sm">İlan Ver</span>
                <span className="text-[11px] opacity-70">Yük ilanı oluştur</span>
              </Link>
              <Link href="/shipper/aktif-tasimalar"
                className="bg-white border border-gray-200 text-slate-700 rounded-2xl p-5 flex flex-col items-center text-center gap-2 hover:border-brand-dark hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                  <Truck size={22} />
                </div>
                <span className="font-black text-sm">Taşımalar</span>
                <span className="text-[11px] text-gray-400">1 aktif yolda</span>
              </Link>
              <Link href="/shipper/yukler"
                className="bg-white border border-gray-200 text-slate-700 rounded-2xl p-5 flex flex-col items-center text-center gap-2 hover:border-brand-dark hover:shadow-md transition-all col-span-2 group">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-brand-dark group-hover:scale-110 transition-transform">
                  <Package size={22} />
                </div>
                <span className="font-black text-sm">Tüm İlanlarım</span>
                <span className="text-[11px] text-gray-400">3 aktif ilan · 5 eşleşme</span>
              </Link>
            </div>

            {/* Destek */}
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl text-brand-dark shadow-sm flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-dark">Yardım Merkezi</h4>
                <p className="text-xs text-blue-800/70 mt-1 leading-relaxed">
                  İlan verme veya eşleşmeyle ilgili sorun mu yaşıyorsunuz?
                </p>
                <Link href="/iletisim" className="text-xs font-bold text-blue-600 mt-2 inline-block hover:underline">
                  Destek Talebi Oluştur
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
