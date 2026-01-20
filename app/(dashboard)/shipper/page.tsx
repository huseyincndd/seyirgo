
'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Package, 
  TrendingUp, 
  Truck, 
  Clock, 
  Plus, 
  ArrowRight,
  FileText,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Calendar,
  Wallet,
  Bell,
  Star,
  Navigation,
  ShieldCheck,
  User,
  MoreHorizontal
} from 'lucide-react';

// --- MOCK DATA ---
const STATS = [
  { label: 'Aktif İlan', value: '3', change: '2 Beklemede', isPositive: true, icon: Package },
  { label: 'Gelen Teklifler', value: '12', change: '5 Yeni', isPositive: true, icon: FileText },
  { label: 'Yoldaki Yük', value: '1', change: 'Tahmini: 2s', isPositive: true, icon: Truck },
  { label: 'Toplam Harcama', value: '₺42.500', change: 'Bu Ay', isPositive: false, icon: Wallet },
];

const ACTIVE_SHIPMENT = {
  id: 'TS-2024-089',
  loadTitle: 'Endüstriyel Mutfak Ekipmanı',
  carrier: 'Öztürk Lojistik',
  plate: '34 VP 1923',
  driverName: 'Ahmet Yılmaz',
  origin: 'İstanbul, İkitelli',
  destination: 'Antalya, Muratpaşa',
  status: 'Yolda',
  progress: 72,
  eta: 'Bugün, 20:30',
  lastUpdate: 'Burdur civarında seyir halinde',
};

const PENDING_OFFERS = [
  { id: 'TK-001', load: 'Ofis Mobilyaları', carrier: 'Hızlı Nakliyat', price: '11.800 ₺', rating: 4.8, date: '10 dk önce' },
  { id: 'TK-002', load: 'Tekstil Kolileri', carrier: 'Güven Lojistik', price: '8.200 ₺', rating: 4.5, date: '1 saat önce' },
  { id: 'TK-003', load: 'Ofis Mobilyaları', carrier: 'Yıldırım Taşımacılık', price: '12.500 ₺', rating: 4.9, date: '2 saat önce' },
];

const RECENT_LOADS = [
  { id: 'YK-101', title: 'Ofis Mobilyaları', from: 'İstanbul', to: 'Ankara', status: 'Teklif Bekliyor', date: 'Bugün' },
  { id: 'YK-102', title: 'Tekstil Kolileri', from: 'Bursa', to: 'İzmir', status: 'Yayında', date: 'Dün' },
  { id: 'YK-103', title: 'Makine Parçası', from: 'Kocaeli', to: 'Adana', status: 'Tamamlandı', date: '18 Ocak' },
];

export default function ShipperDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 lg:py-5 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Genel Bakış</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">Hoş geldin, yüklerini buradan yönetebilirsin.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/shipper/yeni-ilan"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-brand-dark/20 transform active:scale-[0.98]"
          >
            <Plus size={18} strokeWidth={2.5} />
            Yeni İlan Oluştur
          </Link>
          <button className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-200">
             <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">
                MK
             </div>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">

        {/* --- 1. KEY METRICS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-purple-50 text-purple-600' : idx === 2 ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={22} strokeWidth={2} />
                </div>
                {stat.change && (
                   <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
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
              
              {/* SECTION: ACTIVE SHIPMENT (Live Tracking) */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                 <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                       <h3 className="font-bold text-slate-900">Aktif Taşıma</h3>
                       <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 ml-2">Canlı Takip</span>
                    </div>
                    <Link href="/shipper/aktif-tasimalar" className="text-xs font-bold text-brand-dark hover:text-brand-orange flex items-center gap-1 transition-colors">
                       Detaylar <ChevronRight size={14} />
                    </Link>
                 </div>

                 <div className="p-6">
                    {/* Route Visual */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 relative">
                       {/* Line Connector (Desktop) */}
                       <div className="hidden md:block absolute top-[22px] left-[40px] right-[40px] h-[2px] bg-gray-100 z-0">
                          <div className="h-full bg-brand-dark transition-all duration-1000" style={{ width: `${ACTIVE_SHIPMENT.progress}%` }}></div>
                       </div>

                       {/* Origin */}
                       <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2">
                          <div className="w-12 h-12 rounded-full bg-blue-50 border-4 border-white shadow-sm flex items-center justify-center text-brand-dark">
                             <Navigation size={20} className="rotate-45" />
                          </div>
                          <div className="md:text-center">
                             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Çıkış</div>
                             <div className="font-bold text-slate-900 text-lg">{ACTIVE_SHIPMENT.origin.split(',')[0]}</div>
                             <div className="text-xs text-gray-500">{ACTIVE_SHIPMENT.origin.split(',')[1]}</div>
                          </div>
                       </div>

                       {/* Truck Icon (Animated) */}
                       <div className="relative z-10 hidden md:flex flex-col items-center">
                          <div className="bg-brand-dark text-white p-2 rounded-full shadow-lg shadow-brand-dark/20 animate-bounce">
                             <Truck size={20} />
                          </div>
                          <div className="mt-2 text-xs font-bold text-brand-dark bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                             {ACTIVE_SHIPMENT.lastUpdate}
                          </div>
                       </div>

                       {/* Destination */}
                       <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2">
                          <div className="w-12 h-12 rounded-full bg-orange-50 border-4 border-white shadow-sm flex items-center justify-center text-brand-orange">
                             <MapPin size={20} />
                          </div>
                          <div className="md:text-center">
                             <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Varış</div>
                             <div className="font-bold text-slate-900 text-lg">{ACTIVE_SHIPMENT.destination.split(',')[0]}</div>
                             <div className="text-xs text-gray-500">{ACTIVE_SHIPMENT.destination.split(',')[1]}</div>
                          </div>
                       </div>
                    </div>

                    {/* Job Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Yük</div>
                          <div className="font-semibold text-slate-800 flex items-center gap-2">
                             <Package size={16} className="text-gray-400" /> {ACTIVE_SHIPMENT.loadTitle}
                          </div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Taşıyıcı</div>
                          <div className="font-semibold text-slate-800">{ACTIVE_SHIPMENT.carrier}</div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Araç / Sürücü</div>
                          <div className="font-bold text-slate-800 text-sm">{ACTIVE_SHIPMENT.plate}</div>
                          <div className="text-xs text-gray-500">{ACTIVE_SHIPMENT.driverName}</div>
                       </div>
                       <div>
                          <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Tahmini Varış</div>
                          <div className="font-bold text-green-600 flex items-center gap-2">
                             <Clock size={16} /> {ACTIVE_SHIPMENT.eta}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* SECTION: RECENT LOADS */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                 <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Son İlanlarınız</h3>
                    <Link href="/shipper/yukler" className="text-xs font-bold text-gray-500 hover:text-brand-dark">Tümü</Link>
                 </div>
                 <div className="divide-y divide-gray-100">
                    {RECENT_LOADS.map((load) => (
                       <div key={load.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-brand-dark">
                                <Package size={20} />
                             </div>
                             <div>
                                <div className="font-bold text-slate-900 text-sm">{load.title}</div>
                                <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                                   <span className="flex items-center gap-1"><MapPin size={10} /> {load.from} - {load.to}</span>
                                   <span>•</span>
                                   <span>{load.date}</span>
                                </div>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                load.status === 'Teklif Bekliyor' ? 'bg-yellow-100 text-yellow-700' :
                                load.status === 'Yayında' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-600'
                             }`}>
                                {load.status}
                             </span>
                             <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500" />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

           </div>

           {/* RIGHT COLUMN (1/3) */}
           <div className="space-y-8">
              
              {/* PENDING OFFERS (Action Required) */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                 <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-orange-50/30">
                    <div className="flex items-center gap-2">
                       <Bell size={18} className="text-brand-orange" />
                       <h3 className="font-bold text-slate-900">Bekleyen Teklifler</h3>
                    </div>
                    <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{PENDING_OFFERS.length}</span>
                 </div>
                 <div className="divide-y divide-gray-100">
                    {PENDING_OFFERS.map((offer) => (
                       <div key={offer.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                             <div>
                                <div className="font-bold text-slate-900 text-sm">{offer.carrier}</div>
                                <div className="text-xs text-gray-500">{offer.load}</div>
                             </div>
                             <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                <Star size={10} fill="currentColor" /> {offer.rating}
                             </div>
                          </div>
                          <div className="flex justify-between items-end mt-2">
                             <div className="text-xs text-gray-400">{offer.date}</div>
                             <div className="text-right">
                                <div className="font-black text-brand-dark">{offer.price}</div>
                                <Link href="/shipper/teklifler" className="text-[10px] font-bold text-blue-600 hover:underline">İncele</Link>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="grid grid-cols-2 gap-3">
                 <Link href="/shipper/yeni-ilan" className="bg-brand-dark text-white p-4 rounded-xl shadow-md hover:bg-slate-800 transition-all flex flex-col items-center text-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Plus size={20} />
                    </div>
                    <span className="font-bold text-sm">İlan Ver</span>
                 </Link>
                 <Link href="/shipper/teklifler" className="bg-white border border-gray-200 text-slate-700 p-4 rounded-xl shadow-sm hover:border-brand-orange hover:shadow-md transition-all flex flex-col items-center text-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:text-brand-orange transition-colors">
                       <FileText size={20} />
                    </div>
                    <span className="font-bold text-sm">Teklifler</span>
                 </Link>
              </div>

              {/* SUPPORT BANNER */}
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex items-start gap-4">
                 <div className="p-2 bg-white rounded-lg text-brand-dark shadow-sm">
                    <ShieldCheck size={20} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-brand-dark">Yardım Merkezi</h4>
                    <p className="text-xs text-blue-800/70 mt-1 leading-relaxed">
                       İlan verme veya ödemelerle ilgili desteğe mi ihtiyacınız var?
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
