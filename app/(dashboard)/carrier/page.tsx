
'use client';
import React from 'react';
import Link from 'next/link';
import {
  Truck, MapPin, Package, Bell, Search, ChevronRight,
  Calendar, Star, Clock, Navigation, ArrowRight,
  CheckCircle2, Megaphone, Plus, Phone
} from 'lucide-react';

const STATS = [
  { label: 'Aktif İlanlarım', value: '2', sub: '3 yük eşleşmesi var', icon: Megaphone, color: 'bg-orange-50 text-brand-orange' },
  { label: 'Uygun Yükler', value: '5', sub: 'Bugün güncellendi', icon: Package, color: 'bg-blue-50 text-brand-dark' },
  { label: 'Araçlarım', value: '2', sub: '1 yolda, 1 müsait', icon: Truck, color: 'bg-slate-50 text-slate-600' },
  { label: 'Tamamlanan İş', value: '14', sub: 'Bu ay', icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
];

const ACTIVE_JOB = {
  id: '#TS-2026-001',
  from: 'Bursa',
  fromSub: 'Nilüfer',
  to: 'İzmir',
  toSub: 'Kemalpaşa',
  cargo: 'Tekstil Ürünleri',
  weight: '6.2 Ton',
  plate: '16 KA 202',
  vehicle: 'Volvo FH',
  eta: 'Bugün, 15:00',
  progress: 60,
};

const MATCHED_LOADS = [
  { id: 1, from: 'İstanbul', to: 'Ankara', type: 'Otomotiv Parçaları', date: 'Yarın', match: 98, cat: '1A' },
  { id: 2, from: 'Bursa', to: 'İzmir', type: 'Tekstil Ürünleri', date: '27 Nis', match: 95, cat: '1A' },
  { id: 3, from: 'İstanbul', to: 'Konya', type: 'Elektronik Malzeme', date: '25 Nis', match: 92, cat: '1A' },
];

const QUICK_ACTIONS = [
  { label: 'İlan Ver', sub: 'Yeni yük eşleşmesi', href: '/carrier/ilan-ekle', color: 'bg-brand-orange text-white', icon: Plus },
  { label: 'Uygun Yükler', sub: 'Eşleşmeleri gör', href: '/carrier/uygun-yukler', color: 'bg-brand-dark text-white', icon: Search },
  { label: 'Araçlarım', sub: '2 araç', href: '/carrier/araclarim', color: 'bg-white text-slate-700', icon: Truck },
  { label: 'Aktif Taşıma', sub: '1 devam ediyor', href: '/carrier/aktif-tasimalar', color: 'bg-white text-slate-700', icon: Navigation },
];

export default function CarrierDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Genel Bakış</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Hoş geldin Mehmet, yollar açık.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-gray-200">
            <div className="w-9 h-9 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-sm">MK</div>
            <div className="text-sm leading-tight">
              <div className="font-bold text-slate-900">Mehmet Kaya</div>
              <div className="text-xs text-slate-500">Taşıyıcı</div>
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

          {/* LEFT: Aktif Taşıma + Hızlı İşlemler */}
          <div className="lg:col-span-2 space-y-6">

            {/* Aktif Taşıma */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-bold text-slate-900">Aktif Taşıma</span>
                  <span className="text-xs font-mono text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded">{ACTIVE_JOB.id}</span>
                </div>
                <Link href="/carrier/aktif-tasimalar" className="text-xs font-bold text-brand-orange flex items-center gap-1 hover:underline">
                  Detay <ChevronRight size={14} />
                </Link>
              </div>

              <div className="p-6">
                {/* Route */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 bg-green-50 rounded-xl p-3 text-center border border-green-100">
                    <div className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">Çıkış</div>
                    <div className="font-black text-slate-900 text-lg">{ACTIVE_JOB.from}</div>
                    <div className="text-xs text-gray-500">{ACTIVE_JOB.fromSub}</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-brand-orange text-white p-2 rounded-full animate-bounce shadow-md">
                      <Truck size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-brand-orange">Yolda</span>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Varış</div>
                    <div className="font-black text-slate-900 text-lg">{ACTIVE_JOB.to}</div>
                    <div className="text-xs text-gray-500">{ACTIVE_JOB.toSub}</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span className="font-medium">Rota İlerlemesi</span>
                    <span className="font-bold text-brand-orange">{ACTIVE_JOB.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-orange rounded-full transition-all" style={{ width: `${ACTIVE_JOB.progress}%` }} />
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Yük', value: ACTIVE_JOB.cargo },
                    { label: 'Ağırlık', value: ACTIVE_JOB.weight },
                    { label: 'T. Varış', value: ACTIVE_JOB.eta, icon: Clock },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">{item.label}</div>
                      <div className="text-sm font-bold text-slate-800">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hızlı İşlemler */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {QUICK_ACTIONS.map((a, i) => (
                <Link key={i} href={a.href}
                  className={`${a.color} rounded-2xl p-5 flex flex-col items-center justify-center text-center border border-gray-100 hover:shadow-lg transition-all active:scale-[0.97] group`}
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

          {/* RIGHT: Eşleşen Yükler + Araç Durumu */}
          <div className="space-y-6">

            {/* Eşleşen Yükler */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">İlanlarıma Eşleşen Yükler</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Otomatik eşleştirme</p>
                </div>
                <Link href="/carrier/uygun-yukler" className="text-xs font-bold text-brand-orange hover:underline">Tümü</Link>
              </div>

              <div className="divide-y divide-gray-100">
                {MATCHED_LOADS.map(load => (
                  <div key={load.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                        <span>{load.from}</span>
                        <ArrowRight size={13} className="text-gray-300" />
                        <span className="text-brand-dark">{load.to}</span>
                      </div>
                      <span className="text-[10px] font-bold bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">
                        %{load.match}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mb-0.5">
                          <Package size={11} /> {load.type}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar size={11} /> {load.date}
                        </div>
                      </div>
                      <Link href="/carrier/uygun-yukler"
                        className="flex items-center gap-1.5 bg-brand-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <Phone size={11} /> Bilgileri Gör
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-gray-50">
                <Link href="/carrier/uygun-yukler" className="flex items-center justify-center gap-2 text-xs font-bold text-brand-dark hover:underline">
                  Tüm eşleşmeleri gör <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Araç Durumu */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Araç Durumu</h3>
                <Link href="/carrier/araclarim" className="text-xs font-bold text-brand-orange hover:underline">Yönet</Link>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"></span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900">34 VP 1923</div>
                    <div className="text-xs text-gray-500">Mercedes Actros</div>
                  </div>
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Yolda</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300 flex-shrink-0"></span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900">35 KA 202</div>
                    <div className="text-xs text-gray-500">Ford Cargo</div>
                  </div>
                  <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">Müsait</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
