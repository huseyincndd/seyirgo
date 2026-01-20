
'use client';
import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare,
  Navigation,
  Package,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Camera,
  FileCheck,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Calendar,
  User
} from 'lucide-react';

// Örnek aktif taşıma verileri
const ACTIVE_TRANSPORTS = [
  {
    id: 'TS-2024-001',
    loadId: 'YK-2024-102',
    loadTitle: 'Elektronik Malzeme',
    origin: 'İstanbul',
    originDistrict: 'Tuzla',
    destination: 'Bursa',
    destinationDistrict: 'OSB',
    shipper: {
      name: 'Tech Import Ltd.',
      phone: '+90 532 123 45 67',
      contact: 'Mehmet Bey',
    },
    vehicle: {
      plate: '34 ABC 123',
      type: 'Kamyon',
    },
    status: 'in_transit',
    progress: 45,
    currentLocation: 'Yalova yakınları',
    startedAt: '18 Ocak 2026, 10:00',
    estimatedArrival: '18 Ocak 2026, 14:00',
    price: 4800,
    updates: [
      { time: '12:30', message: 'Yalova\'dan geçildi', type: 'info' },
      { time: '11:00', message: 'Gebze çıkışı yapıldı', type: 'info' },
      { time: '10:00', message: 'Yükleme tamamlandı, yola çıkıldı', type: 'success' },
    ],
  },
  {
    id: 'TS-2024-002',
    loadId: 'YK-2024-101',
    loadTitle: 'Mobilya Ürünleri',
    origin: 'İstanbul',
    originDistrict: 'Esenyurt',
    destination: 'Ankara',
    destinationDistrict: 'Siteler',
    shipper: {
      name: 'ABC Mobilya A.Ş.',
      phone: '+90 532 987 65 43',
      contact: 'Ayşe Hanım',
    },
    vehicle: {
      plate: '34 DEF 456',
      type: 'Tır',
    },
    status: 'loading',
    progress: 10,
    currentLocation: 'İstanbul / Esenyurt - Yükleme noktası',
    startedAt: '18 Ocak 2026, 13:00',
    estimatedArrival: '19 Ocak 2026, 06:00',
    price: 9500,
    updates: [
      { time: '13:30', message: 'Yükleme devam ediyor', type: 'info' },
      { time: '13:00', message: 'Yükleme noktasına varıldı', type: 'success' },
    ],
  },
];

const statusConfig: Record<string, { label: string, color: string, badgeBg: string, icon: any, progressColor: string }> = {
  loading: { 
    label: 'Yükleniyor', 
    color: 'text-yellow-600', 
    badgeBg: 'bg-yellow-50 border-yellow-100',
    icon: Package,
    progressColor: 'bg-yellow-500'
  },
  in_transit: { 
    label: 'Yolda', 
    color: 'text-blue-600', 
    badgeBg: 'bg-blue-50 border-blue-100',
    icon: Truck,
    progressColor: 'bg-blue-500'
  },
  arrived: { 
    label: 'Varış Noktasında', 
    color: 'text-orange-600', 
    badgeBg: 'bg-orange-50 border-orange-100',
    icon: MapPin,
    progressColor: 'bg-orange-500'
  },
  delivered: { 
    label: 'Teslim Edildi', 
    color: 'text-green-600', 
    badgeBg: 'bg-green-50 border-green-100',
    icon: CheckCircle,
    progressColor: 'bg-green-500'
  },
};

export default function CarrierAktifTasimalarPage() {
  const [expandedId, setExpandedId] = useState<string | null>(ACTIVE_TRANSPORTS[0]?.id || null);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 lg:py-5 flex items-center justify-between shadow-sm">
        <div>
           <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Aktif Taşımalarım</h1>
           <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">
              Şu an <span className="font-bold text-brand-orange">{ACTIVE_TRANSPORTS.length}</span> aktif operasyon yürütülüyor.
           </p>
        </div>
        <div className="hidden sm:block">
           <div className="flex items-center gap-2 text-xs font-bold bg-green-50 px-3 py-1.5 rounded-lg text-green-700 border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Canlı Takip Aktif
           </div>
        </div>
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">

        {ACTIVE_TRANSPORTS.map((transport) => {
          const status = statusConfig[transport.status] || statusConfig.loading;
          const StatusIcon = status.icon;
          const isExpanded = expandedId === transport.id;

          return (
            <div 
              key={transport.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Main Card Content */}
              <div className="p-6">
                <div className="flex flex-col xl:flex-row gap-8">
                  
                  {/* Left Column: Journey & Status */}
                  <div className="flex-1">
                    
                    {/* Header Line */}
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${status.badgeBg} ${status.color}`}>
                             <StatusIcon size={12} strokeWidth={3} />
                             {status.label}
                          </span>
                          <span className="text-xs font-mono text-gray-400">ID: {transport.id}</span>
                       </div>
                       <div className="text-right hidden sm:block">
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tahmini Varış</div>
                          <div className="text-sm font-bold text-slate-900">{transport.estimatedArrival}</div>
                       </div>
                    </div>

                    {/* Visual Journey WITH MAP BACKGROUND */}
                    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm group bg-gray-50 min-h-[220px]">
                        
                        {/* 1. Map Layer (Background) */}
                        <div className="absolute inset-0 z-0">
                           <iframe 
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195884.26596670594!2d30.469226!3d38.737753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c8f97e7b5c2e25%3A0x4a4b4d1c2a9b8c6d!2sAfyonkarahisar!5e0!3m2!1str!2str!4v1708450000000!5m2!1str!2str" 
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 grayscale-[0.2] group-hover:grayscale-0"
                              style={{ border: 0, pointerEvents: 'none' }} 
                              allowFullScreen 
                              loading="lazy" 
                           ></iframe>
                           {/* Gradient Overlay for Readability (Vignette) */}
                           <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none"></div>
                        </div>

                        {/* 2. Static Pin (Random position visual) */}
                        <div className="absolute top-1/2 left-[55%] transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-100 group-hover:scale-110 transition-transform duration-300">
                           <div className="relative">
                              <div className="w-4 h-4 bg-brand-orange rounded-full animate-ping absolute"></div>
                              <div className="w-4 h-4 bg-brand-orange rounded-full border-2 border-white shadow-lg"></div>
                              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold shadow-md border border-gray-100 whitespace-nowrap">
                                {transport.currentLocation}
                              </div>
                           </div>
                        </div>

                        {/* 3. Content Layer */}
                        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 h-full">
                           
                           {/* Origin Card */}
                           <div className="relative flex items-center gap-4 bg-white/90 backdrop-blur-sm p-3 md:pr-6 rounded-xl shadow-sm border border-white/50 w-full md:w-auto">
                              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100">
                                 <Navigation size={18} className="text-gray-700" />
                              </div>
                              <div>
                                 <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Kalkış</div>
                                 <div className="text-base font-black text-slate-900 leading-none">{transport.origin}</div>
                                 <div className="text-xs font-bold text-gray-500 mt-0.5">{transport.originDistrict}</div>
                              </div>
                           </div>

                           {/* Connector Line (Desktop) */}
                           <div className="hidden md:flex flex-1 items-center justify-center relative">
                              <div className="w-full h-0.5 bg-gray-300/50 rounded-full mx-4 relative">
                                 <div className={`absolute top-0 left-0 h-full ${status.progressColor} rounded-full opacity-80`} style={{width: `${transport.progress}%`}}></div>
                              </div>
                           </div>

                           {/* Destination Card */}
                           <div className="relative flex items-center gap-4 bg-white/90 backdrop-blur-sm p-3 md:pl-6 rounded-xl shadow-sm border border-white/50 w-full md:w-auto md:text-right md:flex-row-reverse">
                              <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange border border-brand-orange/20">
                                 <MapPin size={18} className="fill-brand-orange text-white" />
                              </div>
                              <div>
                                 <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Varış</div>
                                 <div className="text-base font-black text-slate-900 leading-none">{transport.destination}</div>
                                 <div className="text-xs font-bold text-gray-500 mt-0.5">{transport.destinationDistrict}</div>
                              </div>
                           </div>

                        </div>
                    </div>

                    {/* Progress Bar (Mobile) & Actions */}
                    <div className="space-y-6 mt-4">
                       {/* Mobile Progress */}
                       <div className="md:hidden">
                          <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                             <span>İlerleme</span>
                             <span>%{transport.progress}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className={`h-full ${status.progressColor}`} style={{ width: `${transport.progress}%` }}></div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500 flex items-center gap-1 bg-gray-50 px-2 py-1.5 rounded border border-gray-100 w-fit">
                             <MapPin size={10} className="text-brand-orange" /> 
                             Konum: <span className="font-bold text-slate-700">{transport.currentLocation}</span>
                          </div>
                       </div>

                       {/* Driver Actions */}
                       <div className="flex flex-wrap gap-3">
                          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-brand-orange text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-orange/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                             <Camera size={16} /> Fotoğraf Ekle
                          </button>
                          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-gray-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                             <AlertCircle size={16} /> Sorun Bildir
                          </button>
                          {transport.status === 'in_transit' && (
                             <button className="flex-1 sm:flex-none px-4 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                                <FileCheck size={16} /> Teslim Et
                             </button>
                          )}
                       </div>
                    </div>

                  </div>

                  {/* Right Column: Details */}
                  <div className="xl:w-80 xl:border-l xl:border-gray-100 xl:pl-8 space-y-6">
                     
                     <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-500 shadow-sm">
                              <User size={20} />
                           </div>
                           <div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase">Yük Sahibi</div>
                              <div className="text-sm font-bold text-slate-900">{transport.shipper.name}</div>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button className="flex-1 py-2 bg-brand-dark text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1">
                              <Phone size={14} /> Ara
                           </button>
                           <button className="flex-1 py-2 bg-white border border-gray-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                              <MessageSquare size={14} /> Mesaj
                           </button>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                           <div className="flex items-center gap-2">
                              <Package size={16} className="text-gray-400" />
                              <span className="text-sm font-medium text-gray-600">Yük</span>
                           </div>
                           <span className="text-sm font-bold text-slate-900">{transport.loadTitle}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                           <div className="flex items-center gap-2">
                              <Truck size={16} className="text-gray-400" />
                              <span className="text-sm font-medium text-gray-600">Araç</span>
                           </div>
                           <span className="text-sm font-bold text-slate-900">{transport.vehicle.plate}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 border border-green-100">
                           <span className="text-sm font-bold text-green-700">Kazanç</span>
                           <span className="text-lg font-black text-green-700">₺{transport.price.toLocaleString()}</span>
                        </div>
                     </div>

                  </div>

                </div>
              </div>

              {/* Updates Accordion */}
              <div className="border-t border-gray-100">
                 <button 
                    onClick={() => setExpandedId(isExpanded ? null : transport.id)}
                    className="w-full flex items-center justify-between px-6 py-3 bg-gray-50/50 hover:bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider transition-colors"
                 >
                    <span>Canlı Akış & Güncellemeler</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                 </button>
                 
                 {isExpanded && (
                    <div className="px-6 py-4 bg-gray-50/50 space-y-4">
                       {transport.updates.map((update, idx) => (
                          <div key={idx} className="flex gap-4 relative">
                             {idx !== transport.updates.length - 1 && (
                                <div className="absolute left-[15px] top-[30px] bottom-[-20px] w-0.5 bg-gray-200"></div>
                             )}
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                update.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                             }`}>
                                {update.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                             </div>
                             <div>
                                <div className="text-sm font-bold text-slate-800">{update.message}</div>
                                <div className="text-xs text-gray-500 font-medium">{update.time}</div>
                             </div>
                          </div>
                       ))}
                    </div>
                 )}
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {ACTIVE_TRANSPORTS.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-200 py-20 px-6 text-center shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
               <Truck size={40} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Aktif Taşıma Yok</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
               Şu anda yolda olan veya yükleme aşamasında bir operasyonunuz bulunmuyor.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
