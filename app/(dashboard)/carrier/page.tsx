'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Truck, 
  MapPin, 
  TrendingUp, 
  Package, 
  Bell, 
  Search, 
  ChevronRight, 
  Calendar, 
  MoreHorizontal,
  Wallet,
  Star,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Navigation,
  FileText,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

// --- MOCK DATA ---
const STATS = [
  { label: 'Aylık Kazanç', value: '₺84.500', change: '+%12', isPositive: true, icon: Wallet },
  { label: 'Tamamlanan İş', value: '14', change: 'Bu ay', isPositive: true, icon: CheckCircle2 },
  { label: 'Toplam Mesafe', value: '8.240 km', change: 'Ort. 600km/iş', isPositive: true, icon: Navigation },
  { label: 'Sürücü Puanı', value: '4.9/5', change: 'Mükemmel', isPositive: true, icon: Star },
];

const ACTIVE_JOB = {
  id: '#TR-8821',
  from: 'İstanbul, Tuzla',
  to: 'Ankara, Akyurt',
  cargo: 'Endüstriyel Elektronik',
  weight: '4.2 Ton',
  price: '18.500 ₺',
  status: 'Yolda',
  progress: 65,
  plate: '34 VP 1923',
  vehicle: 'Mercedes-Benz Actros',
  eta: 'Bugün, 18:30'
};

const RECOMMENDED_LOADS = [
  { id: 1, from: 'Ankara', to: 'İzmir', type: 'Paletli Gıda', date: 'Yarın', price: '22.000 ₺', match: 98 },
  { id: 2, from: 'Ankara', to: 'Antalya', type: 'Mobilya', date: '25 Oca', price: '28.500 ₺', match: 85 },
  { id: 3, from: 'Ankara', to: 'İstanbul', type: 'Tekstil', date: '26 Oca', price: '16.000 ₺', match: 74 },
];

export default function CarrierDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* --- HEADER SECTION --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 lg:py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Genel Bakış</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">Hoş geldin Mehmet, yollar senin.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-200">
             <div className="w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-sm">
                MK
             </div>
             <div className="text-sm">
                <div className="font-bold text-slate-900">Mehmet Kaya</div>
                <div className="text-xs text-slate-500">Filo Yöneticisi</div>
             </div>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">

        {/* --- 1. KEY METRICS (Professional Cards) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${idx === 0 ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={22} strokeWidth={2} />
                </div>
                {idx === 0 && (
                   <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp size={12} /> {stat.change}
                   </span>
                )}
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* --- 2. MAIN DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* LEFT COLUMN (2/3) */}
           <div className="lg:col-span-2 space-y-8">
              
              {/* SECTION: ACTIVE JOB */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                 <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                       <h3 className="font-bold text-slate-900">Aktif Taşıma</h3>
                       <span className="text-xs font-mono text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-200 ml-2">{ACTIVE_JOB.id}</span>
                    </div>
                    <Link href="/carrier/aktif-tasimalar" className="text-xs font-bold text-brand-orange hover:text-orange-700 flex items-center gap-1">
                       Detaylar <ChevronRight size={14} />
                    </Link>
                 </div>

                 <div className="p-6">
                    {/* Route Visual */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 relative">
                       {/* Line Connector (Desktop) */}
                       <div className="hidden md:block absolute top-[22px] left-[40px] right-[40px] h-[2px] bg-gray-100 z-0">
                          <div className="h-full bg-brand-orange/20 w-[65%]"></div>
                       </div>

                       {/* Origin */}
                       <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2">
                          <div className="w-12 h-12 rounded-full bg-green-50 border-4 border-white shadow-sm flex items-center justify-center text-green-600">
                             <Navigation size={20} className="rotate-45" />
                          </div>
                          <div className="md:text-center">
                             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Çıkış</div>
                             <div className="font-bold text-slate-900 text-lg">{ACTIVE_JOB.from.split(',')[0]}</div>
                             <div className="text-xs text-gray-500">{ACTIVE_JOB.from.split(',')[1]}</div>
                          </div>
                       </div>

                       {/* Truck Icon (Animated) */}
                       <div className="relative z-10 hidden md:flex flex-col items-center">
                          <div className="bg-brand-orange text-white p-2 rounded-full shadow-lg shadow-brand-orange/20 animate-bounce">
                             <Truck size={20} />
                          </div>
                          <div className="mt-2 text-xs font-bold text-brand-orange bg-orange-50 px-2 py-1 rounded-full">
                             Yolda
                          </div>
                       </div>

                       {/* Destination */}
                       <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2">
                          <div className="w-12 h-12 rounded-full bg-gray-50 border-4 border-white shadow-sm flex items-center justify-center text-gray-400">
                             <MapPin size={20} />
                          </div>
                          <div className="md:text-center">
                             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Varış</div>
                             <div className="font-bold text-slate-900 text-lg">{ACTIVE_JOB.to.split(',')[0]}</div>
                             <div className="text-xs text-gray-500">{ACTIVE_JOB.to.split(',')[1]}</div>
                          </div>
                       </div>
                    </div>

                    {/* Job Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Yük Tipi</div>
                          <div className="font-semibold text-slate-800 flex items-center gap-2">
                             <Package size={16} className="text-brand-orange" /> {ACTIVE_JOB.cargo}
                          </div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Ağırlık</div>
                          <div className="font-semibold text-slate-800">{ACTIVE_JOB.weight}</div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Kazanç</div>
                          <div className="font-bold text-green-600 text-lg">{ACTIVE_JOB.price}</div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Tahmini Varış</div>
                          <div className="font-semibold text-slate-800 flex items-center gap-2">
                             <Clock size={16} className="text-brand-orange" /> {ACTIVE_JOB.eta}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* SECTION: EARNINGS CHART (CSS Only - Minimal) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-brand-dark rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    
                    <div className="relative z-10">
                       <div className="flex items-center gap-2 mb-2">
                          <Wallet size={18} className="text-brand-orange" />
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Net Bakiye</span>
                       </div>
                       <div className="text-4xl font-black tracking-tight mb-1">₺24.750</div>
                       <div className="text-sm text-gray-400">Önümüzdeki hakediş: 12 Şubat</div>
                    </div>

                    <div className="relative z-10 mt-6">
                       <div className="flex items-end gap-2 h-16 opacity-80">
                          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                             <div key={i} className="flex-1 bg-gradient-to-t from-brand-orange to-brand-accent rounded-t-sm hover:opacity-100 transition-opacity cursor-pointer" style={{ height: `${h}%` }}></div>
                          ))}
                       </div>
                       <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-mono">
                          <span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span>
                       </div>
                    </div>
                 </div>

                 {/* Quick Actions Grid */}
                 <div className="grid grid-cols-2 gap-4">
                    <Link href="/carrier/rota-ekle" className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-brand-orange hover:shadow-md transition-all group flex flex-col justify-center items-center text-center">
                       <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-brand-orange mb-3 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                          <MapPin size={24} />
                       </div>
                       <span className="font-bold text-slate-900">Rota Ekle</span>
                       <span className="text-xs text-gray-400 mt-1">Dönüş yükü bul</span>
                    </Link>
                    <Link href="/carrier/uygun-yukler" className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-brand-accent hover:shadow-md transition-all group flex flex-col justify-center items-center text-center">
                       <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-brand-dark mb-3 group-hover:bg-brand-dark group-hover:text-white transition-colors">
                          <Search size={24} />
                       </div>
                       <span className="font-bold text-slate-900">Yük Ara</span>
                       <span className="text-xs text-gray-400 mt-1">Tüm ilanları gör</span>
                    </Link>
                    <Link href="/carrier/araclarim" className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all group flex flex-col justify-center items-center text-center">
                       <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 mb-3 group-hover:bg-gray-800 group-hover:text-white transition-colors">
                          <Truck size={24} />
                       </div>
                       <span className="font-bold text-slate-900">Araçlarım</span>
                       <span className="text-xs text-gray-400 mt-1">2 Araç Yönet</span>
                    </Link>
                    <Link href="/carrier/tekliflerim" className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all group flex flex-col justify-center items-center text-center">
                       <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <FileText size={24} />
                       </div>
                       <span className="font-bold text-slate-900">Teklifler</span>
                       <span className="text-xs text-gray-400 mt-1">Son durum</span>
                    </Link>
                 </div>
              </div>

           </div>

           {/* RIGHT COLUMN (1/3) */}
           <div className="space-y-8">
              
              {/* RECOMMENDED LOADS (List Style) */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                 <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Dönüş Yükleri</h3>
                    <Link href="/carrier/uygun-yukler" className="text-xs font-bold text-brand-orange">Tümü</Link>
                 </div>
                 <div className="divide-y divide-gray-100">
                    {RECOMMENDED_LOADS.map((load) => (
                       <div key={load.id} className="p-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                                <span className="text-gray-500">{load.from}</span>
                                <ArrowRight size={14} className="text-gray-300" />
                                <span className="text-brand-dark">{load.to}</span>
                             </div>
                             <div className="bg-green-50 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-100">
                                %{load.match} Eşleşme
                             </div>
                          </div>
                          
                          <div className="flex justify-between items-end">
                             <div>
                                <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                   <Package size={12} /> {load.type}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                   <Calendar size={12} /> {load.date}
                                </div>
                             </div>
                             <div className="text-right">
                                <div className="text-sm font-black text-slate-900">{load.price}</div>
                                <button className="text-[10px] font-bold text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                                   Teklif Ver
                                </button>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="p-3 bg-gray-50 text-center">
                    <p className="text-[10px] text-gray-500">
                       Bu öneriler aktif rotanıza göre oluşturulmuştur.
                    </p>
                 </div>
              </div>

              {/* VEHICLE STATUS */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                 <h3 className="font-bold text-slate-900 mb-4">Filo Durumu</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-100"></div>
                       <div className="flex-1">
                          <div className="text-sm font-bold text-slate-900">34 VP 1923</div>
                          <div className="text-xs text-gray-500">Mercedes Actros - Yolda</div>
                       </div>
                       <div className="text-xs font-bold text-slate-700 bg-gray-100 px-2 py-1 rounded">
                          Tır
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                       <div className="flex-1">
                          <div className="text-sm font-bold text-slate-900">35 KA 202</div>
                          <div className="text-xs text-gray-500">Ford Cargo - Park Halinde</div>
                       </div>
                       <div className="text-xs font-bold text-slate-700 bg-gray-100 px-2 py-1 rounded">
                          Kamyon
                       </div>
                    </div>
                 </div>
                 <button className="w-full mt-6 py-2.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    Araç Yönetimi
                 </button>
              </div>

              {/* SUPPORT BANNER */}
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex items-start gap-4">
                 <div className="p-2 bg-white rounded-lg text-brand-accent shadow-sm">
                    <ShieldCheck size={20} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-brand-dark">Yardım Merkezi</h4>
                    <p className="text-xs text-blue-400 mt-1 leading-relaxed">
                       Ödemeler veya rotalarla ilgili sorun mu yaşıyorsunuz?
                    </p>
                    <Link href="/iletisim" className="text-xs font-bold text-brand-accent mt-2 inline-block hover:underline">
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