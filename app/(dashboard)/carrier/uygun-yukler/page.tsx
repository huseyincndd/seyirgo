
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Package,
  Route,
  ArrowRight,
  Bell,
  Clock,
  Truck,
  Plus,
  Info,
  RefreshCw,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Wallet,
  Weight,
  Box,
  CheckCircle2,
  Navigation,
  Star,
  Zap
} from 'lucide-react';

// --- MOCK DATA ---

// Aktif rotalar ve eşleşen yükler
const ROUTE_MATCHES = [
  {
    route: {
      id: 'RT-2024-001',
      origin: 'İstanbul',
      destination: 'Ankara',
      stops: ['Eskişehir'],
      date: '21 Ocak 2026',
      vehicle: '34 ABC 123',
      vehicleType: 'Tır',
      capacity: '15 Ton',
      matchCount: 4
    },
    loads: [
      {
        id: 'YK-2024-101',
        title: 'Mobilya Ürünleri',
        company: 'Yıldız Mobilya A.Ş.',
        rating: 4.8,
        origin: 'İstanbul, Esenyurt',
        destination: 'Ankara, Siteler',
        distance: '450 km',
        date: '21 Ocak',
        weight: '4.5 Ton',
        volume: '30 m³',
        type: 'Paletli',
        price: '18.500 ₺',
        matchScore: 98,
      },
      {
        id: 'YK-2024-107',
        title: 'Elektronik Malzeme',
        company: 'Tekno Lojistik',
        rating: 4.9,
        origin: 'İstanbul, Tuzla',
        destination: 'Eskişehir, OSB',
        distance: '280 km',
        date: '21 Ocak',
        weight: '2.8 Ton',
        volume: '15 m³',
        type: 'Koli',
        price: '12.200 ₺',
        matchScore: 92,
      },
      {
        id: 'YK-2024-108',
        title: 'Tekstil Hammaddesi',
        company: 'Kumaşsan Tekstil',
        rating: 4.5,
        origin: 'İstanbul, Hadımköy',
        destination: 'Ankara, Ostim',
        distance: '460 km',
        date: '22 Ocak',
        weight: '5.2 Ton',
        volume: '40 m³',
        type: 'Çuval',
        price: '16.900 ₺',
        matchScore: 88,
      },
      {
        id: 'YK-2024-109',
        title: 'Otomotiv Parçaları',
        company: 'OtoYedek Ltd.',
        rating: 4.7,
        origin: 'İstanbul, Gebze',
        destination: 'Ankara, Ostim',
        distance: '410 km',
        date: '21 Ocak',
        weight: '3.1 Ton',
        volume: '10 m³',
        type: 'Paletli',
        price: '14.200 ₺',
        matchScore: 85,
      },
    ],
  },
  {
    route: {
      id: 'RT-2024-002',
      origin: 'Bursa',
      destination: 'İzmir',
      stops: [],
      date: '23 Ocak 2026',
      vehicle: '34 DEF 456',
      vehicleType: 'Kamyon',
      capacity: '10 Ton',
      matchCount: 2
    },
    loads: [
      {
        id: 'YK-2024-110',
        title: 'Tekstil Ürünleri',
        company: 'Bursa Kumaş',
        rating: 5.0,
        origin: 'Bursa, Nilüfer',
        destination: 'İzmir, Kemalpaşa',
        distance: '330 km',
        date: '23 Ocak',
        weight: '6.2 Ton',
        volume: '35 m³',
        type: 'Rulo',
        price: '13.800 ₺',
        matchScore: 95,
      },
      {
        id: 'YK-2024-111',
        title: 'Makine Parçaları',
        company: 'Makine Sanayi',
        rating: 4.6,
        origin: 'Bursa, OSB',
        destination: 'İzmir, Çiğli',
        distance: '350 km',
        date: '23 Ocak',
        weight: '4.5 Ton',
        volume: '12 m³',
        type: 'Paletli',
        price: '11.500 ₺',
        matchScore: 90,
      },
    ],
  },
];

// Eşleşme bekleyen rotalar
const PENDING_ROUTES = [
  {
    id: 'RT-2024-003',
    origin: 'Antalya',
    destination: 'Konya',
    stops: [],
    date: '25 Ocak 2026',
    vehicle: '34 ABC 123',
    vehicleType: 'Tır',
  },
];

export default function UygunYuklerPage() {
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>(
    ROUTE_MATCHES.map(rm => rm.route.id)
  );

  const toggleRoute = (routeId: string) => {
    setExpandedRoutes(prev => 
      prev.includes(routeId) 
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    );
  };

  const totalMatches = ROUTE_MATCHES.reduce((sum, rm) => sum + rm.loads.length, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
       
       {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 lg:py-5 flex items-center justify-between shadow-sm">
        <div>
           <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Uygun Yükler</h1>
           <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">
              Rotalarınıza uygun <span className="text-brand-orange font-bold underline decoration-orange-200 decoration-2">{totalMatches} yük</span> bulundu.
           </p>
        </div>
        <div className="flex gap-3">
           <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
              <RefreshCw size={18} />
              <span className="hidden md:inline">Yenile</span>
           </button>
           <Link 
              href="/carrier/rota-ekle"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 transform active:scale-[0.98]"
           >
              <Plus size={18} strokeWidth={2.5} />
              <span className="hidden sm:inline">Yeni Rota</span>
           </Link>
        </div>
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">

        {/* Info Box */}
        <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-brand-dark flex-shrink-0">
            <Info size={20} />
          </div>
          <div>
            <h3 className="font-bold text-brand-dark mb-1 text-sm">Akıllı Eşleşme Sistemi</h3>
            <p className="text-sm text-blue-900/70 leading-relaxed">
              Bu sayfadaki yükler, oluşturduğunuz rotalar (Konum, Tarih, Araç Tipi) baz alınarak otomatik listelenmiştir. 
              Beğendiğiniz yüklere hemen teklif vererek işi alabilirsiniz.
            </p>
          </div>
        </div>

        {/* Route Matches */}
        {ROUTE_MATCHES.length > 0 ? (
          <div className="space-y-8">
            {ROUTE_MATCHES.map((routeMatch) => {
              const isExpanded = expandedRoutes.includes(routeMatch.route.id);
              
              return (
                <div 
                  key={routeMatch.route.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Route Header (Accordion Trigger) */}
                  <div 
                    className={`p-5 cursor-pointer transition-colors ${isExpanded ? 'bg-gray-50/80 border-b border-gray-100' : 'bg-white hover:bg-gray-50'}`}
                    onClick={() => toggleRoute(routeMatch.route.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      
                      {/* Left: Route Info */}
                      <div className="flex items-start md:items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0 ${isExpanded ? 'bg-brand-dark' : 'bg-gray-400'}`}>
                          <Route size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-black text-lg text-slate-900">{routeMatch.route.origin}</span>
                            <div className="flex items-center text-gray-300">
                                <div className="w-2 h-0.5 bg-gray-300"></div>
                                <ArrowRight size={14} className="mx-1" />
                                <div className="w-2 h-0.5 bg-gray-300"></div>
                            </div>
                            <span className="font-black text-lg text-slate-900">{routeMatch.route.destination}</span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500">
                             <span className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">
                                <Calendar size={12} /> {routeMatch.route.date}
                             </span>
                             <span className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">
                                <Truck size={12} /> {routeMatch.route.vehicle}
                             </span>
                             {routeMatch.route.stops.length > 0 && (
                                <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                                   <MapPin size={12} /> {routeMatch.route.stops.length} Durak
                                </span>
                             )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Right: Match Stats & Toggle */}
                      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-none border-gray-100">
                        <div className="flex items-center gap-2">
                           <span className="flex h-3 w-3 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-orange"></span>
                            </span>
                            <span className="text-sm font-bold text-brand-orange">{routeMatch.loads.length} Uygun Yük</span>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isExpanded ? 'bg-white border-gray-200 rotate-180 text-brand-dark' : 'bg-transparent border-transparent text-gray-400'}`}>
                          <ChevronDown size={20} />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Loads Grid (Expanded Content) */}
                  {isExpanded && (
                    <div className="p-5 md:p-6 bg-gray-50/30">
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                        {routeMatch.loads.map((load) => (
                          <div key={load.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-brand-orange/50 hover:shadow-lg transition-all duration-300 group relative">
                             
                             {/* Match Score Badge */}
                             <div className="absolute top-4 right-4 bg-green-50 text-green-700 text-[10px] font-black px-2 py-1 rounded border border-green-100 flex items-center gap-1">
                                <Zap size={10} fill="currentColor" /> %{load.matchScore} Eşleşme
                             </div>

                             {/* Header */}
                             <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-brand-dark border border-blue-100 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-colors">
                                   <Package size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                   <h4 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-brand-orange transition-colors">{load.title}</h4>
                                   <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs font-bold text-gray-500">{load.company}</span>
                                      <div className="flex items-center text-[10px] font-bold text-orange-400 bg-orange-50 px-1 rounded">
                                         <Star size={10} className="mr-0.5 fill-current" /> {load.rating}
                                      </div>
                                   </div>
                                </div>
                             </div>

                             {/* Route Line */}
                             <div className="relative pl-4 border-l-2 border-gray-100 ml-2 mb-4 space-y-3">
                                <div className="relative">
                                   <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-brand-dark"></div>
                                   <div className="text-xs font-bold text-gray-400 uppercase">Nereden</div>
                                   <div className="font-bold text-slate-800 text-sm">{load.origin}</div>
                                </div>
                                <div className="relative">
                                   <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-brand-orange border-2 border-white shadow-sm"></div>
                                   <div className="text-xs font-bold text-gray-400 uppercase">Nereye</div>
                                   <div className="font-bold text-slate-800 text-sm">{load.destination}</div>
                                   <div className="absolute top-0 right-0 text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                                      {load.distance}
                                   </div>
                                </div>
                             </div>

                             {/* Details Badges */}
                             <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-gray-100">
                                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-xs font-medium text-gray-600">
                                   <Weight size={14} /> {load.weight}
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-xs font-medium text-gray-600">
                                   <Box size={14} /> {load.volume}
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-xs font-medium text-gray-600">
                                   <Truck size={14} /> {load.type}
                                </div>
                             </div>

                             {/* Footer: Price & Action */}
                             <div className="flex items-center justify-between">
                                <div>
                                   <div className="text-[10px] font-bold text-gray-400 uppercase">Tahmini Kazanç</div>
                                   <div className="text-xl font-black text-brand-dark flex items-center gap-1">
                                      <Wallet size={18} className="text-gray-300" /> {load.price}
                                   </div>
                                </div>
                                <button className="px-6 py-2.5 bg-brand-dark text-white text-sm font-bold rounded-xl shadow-lg shadow-brand-dark/20 hover:bg-brand-orange hover:shadow-brand-orange/20 transition-all transform active:scale-[0.98]">
                                   Teklif Ver
                                </button>
                             </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Pending Routes - No matches yet */}
        {PENDING_ROUTES.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-gray-400" />
              Eşleşme Bekleyen Diğer Rotalarınız
            </h3>
            <div className="space-y-3">
              {PENDING_ROUTES.map((route) => (
                <div key={route.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      <Route size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold text-gray-900">{route.origin}</span>
                        <ArrowRight size={14} className="text-gray-300" />
                        <span className="font-bold text-gray-900">{route.destination}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{route.date} • {route.vehicle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="px-3 py-1.5 bg-gray-200 text-gray-600 text-[10px] uppercase font-bold rounded-lg whitespace-nowrap">
                        Henüz eşleşme yok
                     </span>
                     <button className="p-2 hover:bg-white rounded-lg text-gray-400 transition-colors">
                        <Bell size={16} />
                     </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 flex items-center gap-2 bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
              <Bell size={12} />
              Yeni uygun yükler eklendiğinde size bildirim göndereceğiz.
            </p>
          </div>
        )}

        {/* Empty State - No routes */}
        {ROUTE_MATCHES.length === 0 && PENDING_ROUTES.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-200 py-20 px-6 text-center shadow-sm">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg shadow-orange-100">
              <Route size={40} className="text-brand-orange" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Henüz Aktif Rota Yok</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
              Size uygun yükleri bulabilmemiz için öncelikle hangi güzergahta çalışacağınızı bilmemiz gerekiyor.
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
  );
}
