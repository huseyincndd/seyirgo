
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Route, 
  Plus, 
  Calendar, 
  Truck, 
  Package, 
  Bell,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
  MapPin,
  Zap,
  Filter,
  Navigation,
  RefreshCw,
  ChevronRight,
  Settings2
} from 'lucide-react';

// Örnek rota verileri
const MY_ROUTES = [
  {
    id: 'RT-2024-001',
    origin: 'İstanbul',
    originDistrict: 'Esenyurt',
    destination: 'Ankara',
    destinationDistrict: 'Ostim',
    stops: ['Eskişehir'],
    departureDate: '21 Ocak 2026',
    departureTime: '08:00',
    flexible: true,
    vehicle: {
      plate: '34 ABC 123',
      type: 'Tır',
    },
    capacity: '15 Ton',
    acceptedTypes: ['Paletli', 'Parsiyel', 'Komple'],
    minPrice: 8000,
    status: 'active',
    matchCount: 5, // Eşleşen yük sayısı
    autoAccept: true,
    createdAt: '17 Ocak 2026',
  },
  {
    id: 'RT-2024-002',
    origin: 'Bursa',
    originDistrict: 'Nilüfer',
    destination: 'İzmir',
    destinationDistrict: 'Kemalpaşa',
    stops: [],
    departureDate: '23 Ocak 2026',
    departureTime: '06:00',
    flexible: false,
    vehicle: {
      plate: '34 DEF 456',
      type: 'Kamyon',
    },
    capacity: '10 Ton',
    acceptedTypes: ['Paletli', 'Dökme'],
    minPrice: 5500,
    status: 'active',
    matchCount: 3,
    autoAccept: false,
    createdAt: '16 Ocak 2026',
  },
  {
    id: 'RT-2024-003',
    origin: 'Antalya',
    originDistrict: 'Aksu',
    destination: 'İstanbul',
    destinationDistrict: 'Tuzla',
    stops: ['Konya', 'Afyon'],
    departureDate: '18 Ocak 2026',
    departureTime: '05:00',
    flexible: true,
    vehicle: {
      plate: '34 ABC 123',
      type: 'Tır',
    },
    capacity: '20 Ton',
    acceptedTypes: ['Soğuk Zincir'],
    minPrice: 12000,
    status: 'completed',
    matchCount: 0,
    autoAccept: false,
    createdAt: '15 Ocak 2026',
  },
];

const statusConfig: Record<string, { label: string, color: string, badgeBg: string, icon: any, border: string }> = {
  active: { 
     label: 'Yayında', 
     color: 'text-green-600', 
     badgeBg: 'bg-green-50 border-green-100',
     border: 'border-green-200 hover:border-green-400',
     icon: Zap 
  },
  pending: { 
     label: 'Onay Bekliyor', 
     color: 'text-yellow-600', 
     badgeBg: 'bg-yellow-50 border-yellow-100',
     border: 'border-yellow-200 hover:border-yellow-400',
     icon: Clock 
  },
  completed: { 
     label: 'Tamamlandı', 
     color: 'text-gray-500', 
     badgeBg: 'bg-gray-50 border-gray-100',
     border: 'border-gray-200 hover:border-gray-300',
     icon: CheckCircle 
  },
  cancelled: { 
     label: 'İptal', 
     color: 'text-red-600', 
     badgeBg: 'bg-red-50 border-red-100',
     border: 'border-red-200 hover:border-red-400',
     icon: XCircle 
  },
};

type FilterStatus = 'all' | 'active' | 'completed';

export default function RotalarimPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredRoutes = MY_ROUTES.filter(route => 
    filterStatus === 'all' || route.status === filterStatus
  );

  const activeCount = MY_ROUTES.filter(r => r.status === 'active').length;
  const totalMatches = MY_ROUTES.filter(r => r.status === 'active').reduce((sum, r) => sum + r.matchCount, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 lg:py-5 flex items-center justify-between shadow-sm">
        <div>
           <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Rotalarım</h1>
           <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">
              <span className="font-bold text-brand-orange">{activeCount} aktif</span> rota üzerinde <span className="font-bold text-brand-orange">{totalMatches} eşleşen</span> yük var.
           </p>
        </div>
        <Link 
          href="/carrier/rota-ekle"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 transform active:scale-[0.98]"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span className="hidden sm:inline">Yeni Rota Ekle</span>
        </Link>
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
                  <Route size={24} />
               </div>
               <div>
                  <div className="text-3xl font-black text-slate-900 leading-none">{activeCount}</div>
                  <div className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wide">Aktif Rota</div>
               </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange border border-orange-100">
                  <Package size={24} />
               </div>
               <div>
                  <div className="text-3xl font-black text-slate-900 leading-none">{totalMatches}</div>
                  <div className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wide">Eşleşen Yük</div>
               </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 border border-purple-100">
                  <Zap size={24} />
               </div>
               <div>
                  <div className="text-3xl font-black text-slate-900 leading-none">
                     {MY_ROUTES.filter(r => r.autoAccept).length}
                  </div>
                  <div className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wide">Otomatik Kabul</div>
               </div>
            </div>
         </div>

         {/* --- FILTERS --- */}
         <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 pr-4 border-r border-gray-200 mr-2 text-gray-400">
               <Filter size={18} />
               <span className="text-xs font-bold uppercase hidden sm:inline">Filtrele</span>
            </div>
            {([
               { value: 'all', label: 'Tümü' },
               { value: 'active', label: 'Aktif' },
               { value: 'completed', label: 'Tamamlanan' },
            ] as { value: FilterStatus; label: string }[]).map((filter) => (
               <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                     filterStatus === filter.value
                        ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/20'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
               >
                  {filter.label}
               </button>
            ))}
         </div>

         {/* --- ROUTES LIST --- */}
         <div className="space-y-6">
            {filteredRoutes.map((route) => {
               const status = statusConfig[route.status] || statusConfig.active;
               const StatusIcon = status.icon;

               return (
                  <div 
                     key={route.id}
                     className={`bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-lg relative overflow-hidden group ${status.border}`}
                  >
                     {/* Top Bar */}
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                           <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${status.badgeBg} ${status.color}`}>
                              <StatusIcon size={12} strokeWidth={3} />
                              {status.label}
                           </span>
                           <span className="text-xs font-mono text-gray-400">ID: {route.id}</span>
                           {route.autoAccept && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold rounded-lg uppercase tracking-wide">
                                 <Zap size={12} fill="currentColor" /> Otomatik Kabul
                              </span>
                           )}
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="relative">
                              <button 
                                 onClick={() => setOpenMenuId(openMenuId === route.id ? null : route.id)}
                                 className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                 <MoreVertical size={20} />
                              </button>
                              {openMenuId === route.id && (
                                 <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20">
                                    <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                       <Eye size={14} /> Detayları Gör
                                    </button>
                                    <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                       <Edit2 size={14} /> Düzenle
                                    </button>
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
                                       <Trash2 size={14} /> Rotayı Sil
                                    </button>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>

                     {/* Main Content Grid */}
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Route Visualization (Timeline) */}
                        <div className="lg:col-span-7 flex flex-col justify-center">
                           <div className="flex items-center gap-4 relative">
                              {/* Connector Line */}
                              <div className="absolute left-[24px] top-[40px] bottom-[40px] w-0.5 bg-gray-200 z-0"></div>

                              {/* Origin */}
                              <div className="relative z-10 w-full">
                                 <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 border-4 border-white shadow-sm flex items-center justify-center text-brand-dark flex-shrink-0">
                                       <Navigation size={20} />
                                    </div>
                                    <div>
                                       <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Çıkış</div>
                                       <div className="text-lg font-black text-slate-900">{route.origin}</div>
                                       <div className="text-sm text-gray-500 font-medium">{route.originDistrict}</div>
                                    </div>
                                 </div>

                                 {/* Stops */}
                                 {route.stops.map((stop, idx) => (
                                    <div key={idx} className="flex items-center gap-4 mb-8 pl-3">
                                       <div className="w-6 h-6 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center text-orange-600 flex-shrink-0 z-10">
                                          <div className="w-2 h-2 rounded-full bg-current"></div>
                                       </div>
                                       <div className="bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                                          <div className="text-xs font-bold text-orange-800">{stop}</div>
                                       </div>
                                    </div>
                                 ))}

                                 {/* Destination */}
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-brand-orange border-4 border-white shadow-sm flex items-center justify-center text-white flex-shrink-0">
                                       <MapPin size={20} />
                                    </div>
                                    <div>
                                       <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Varış</div>
                                       <div className="text-lg font-black text-slate-900">{route.destination}</div>
                                       <div className="text-sm text-gray-500 font-medium">{route.destinationDistrict}</div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Details & Actions */}
                        <div className="lg:col-span-5 bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col justify-between">
                           
                           <div className="space-y-4 mb-6">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-400 shadow-sm">
                                    <Calendar size={16} />
                                 </div>
                                 <div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase">Tarih</div>
                                    <div className="text-sm font-bold text-slate-900">
                                       {route.departureDate} <span className="text-gray-400 font-normal">• {route.departureTime}</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-400 shadow-sm">
                                    <Truck size={16} />
                                 </div>
                                 <div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase">Araç</div>
                                    <div className="text-sm font-bold text-slate-900">
                                       {route.vehicle.plate} <span className="text-gray-400 font-normal">({route.vehicle.type})</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-400 shadow-sm">
                                    <Package size={16} />
                                 </div>
                                 <div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase">Kapasite</div>
                                    <div className="text-sm font-bold text-slate-900">{route.capacity}</div>
                                 </div>
                              </div>
                           </div>

                           {/* Match Action Area */}
                           {route.status === 'active' ? (
                              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                 <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                       <span className="relative flex h-3 w-3">
                                         <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${route.matchCount > 0 ? 'bg-brand-orange' : 'bg-gray-400'}`}></span>
                                         <span className={`relative inline-flex rounded-full h-3 w-3 ${route.matchCount > 0 ? 'bg-brand-orange' : 'bg-gray-400'}`}></span>
                                       </span>
                                       <span className="text-sm font-bold text-gray-700">
                                          {route.matchCount > 0 ? `${route.matchCount} Uygun Yük` : 'Yük Bekleniyor'}
                                       </span>
                                    </div>
                                    <div className="text-xs font-bold text-gray-900">
                                       Min: ₺{route.minPrice.toLocaleString()}
                                    </div>
                                 </div>
                                 
                                 <Link 
                                    href="/carrier/uygun-yukler"
                                    className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                                       route.matchCount > 0 
                                          ? 'bg-brand-orange text-white hover:bg-orange-600 shadow-lg shadow-brand-orange/20' 
                                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                 >
                                    Yükleri İncele <ChevronRight size={16} />
                                 </Link>
                              </div>
                           ) : (
                              <div className="bg-gray-100 rounded-xl p-4 text-center">
                                 <p className="text-sm font-bold text-gray-500">Bu rota tamamlanmıştır.</p>
                              </div>
                           )}

                        </div>
                     </div>
                  </div>
               );
            })}

            {/* Empty State */}
            {filteredRoutes.length === 0 && (
               <div className="bg-white rounded-3xl border border-gray-200 py-20 px-6 text-center shadow-sm">
                  <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg shadow-orange-100">
                     <Route size={40} className="text-brand-orange" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Rota Bulunamadı</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                     Kriterlerinize uygun bir rota kaydı bulunmuyor. Yeni bir rota oluşturarak iş fırsatlarını yakalayın.
                  </p>
                  <Link 
                     href="/carrier/rota-ekle"
                     className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-brand-orange/30 transform hover:-translate-y-1"
                  >
                     <Plus size={20} />
                     İlk Rotanı Ekle
                  </Link>
               </div>
            )}
         </div>

      </div>
    </div>
  );
}
