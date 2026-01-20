
'use client';
import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  Check, 
  X, 
  ArrowRight,
  Eye,
  Trash2,
  Filter,
  AlertCircle,
  Package,
  CheckCircle2,
  Wallet,
  Building2,
  Calendar,
  XCircle
} from 'lucide-react';

// Örnek teklifler
const MY_OFFERS = [
  {
    id: 'TK-C001',
    loadId: 'YK-2024-101',
    loadTitle: 'Mobilya Ürünleri',
    route: 'İstanbul → Ankara',
    origin: 'İstanbul',
    destination: 'Ankara',
    shipper: 'ABC Mobilya A.Ş.',
    myPrice: 9500,
    originalPrice: 9800,
    createdAt: '2 saat önce',
    status: 'pending',
    note: 'Yarın sabah yola çıkabilirim, öğleden sonra teslimat.',
  },
  {
    id: 'TK-C002',
    loadId: 'YK-2024-102',
    loadTitle: 'Elektronik Malzeme',
    route: 'İstanbul → Bursa',
    origin: 'İstanbul',
    destination: 'Bursa',
    shipper: 'Tech Import Ltd.',
    myPrice: 4800,
    originalPrice: 5200,
    createdAt: '5 saat önce',
    status: 'accepted',
    note: 'Sigortalı taşıma yapıyorum, hassas yük tecrübem var.',
  },
  {
    id: 'TK-C003',
    loadId: 'YK-2024-103',
    loadTitle: 'İnşaat Malzemesi',
    route: 'Kocaeli → Eskişehir',
    origin: 'Kocaeli',
    destination: 'Eskişehir',
    shipper: 'Yapı Market A.Ş.',
    myPrice: 7200,
    originalPrice: 7500,
    createdAt: '1 gün önce',
    status: 'rejected',
    rejectReason: 'Başka bir taşıyıcı tercih edildi.',
  },
  {
    id: 'TK-C004',
    loadId: 'YK-2024-105',
    loadTitle: 'Gıda Ürünleri',
    route: 'Antalya → Ankara',
    origin: 'Antalya',
    destination: 'Ankara',
    shipper: 'Fresh Foods Ltd.',
    myPrice: 12000,
    originalPrice: 12500,
    createdAt: '3 saat önce',
    status: 'pending',
  },
];

const statusConfig: Record<string, { label: string, color: string, badgeBg: string, icon: any, border: string }> = {
  pending: { 
     label: 'Değerlendirmede', 
     color: 'text-yellow-600', 
     badgeBg: 'bg-yellow-50 border-yellow-100',
     border: 'border-yellow-200 hover:border-yellow-400',
     icon: Clock 
  },
  accepted: { 
     label: 'Kabul Edildi', 
     color: 'text-green-600', 
     badgeBg: 'bg-green-50 border-green-100',
     border: 'border-green-200 hover:border-green-400',
     icon: CheckCircle2 
  },
  rejected: { 
     label: 'Reddedildi', 
     color: 'text-red-600', 
     badgeBg: 'bg-red-50 border-red-100',
     border: 'border-red-200 hover:border-red-400',
     icon: XCircle 
  },
};

type FilterStatus = 'all' | 'pending' | 'accepted' | 'rejected';

export default function TekliflerimPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const filteredOffers = MY_OFFERS.filter(offer => 
    filterStatus === 'all' || offer.status === filterStatus
  );

  const pendingCount = MY_OFFERS.filter(o => o.status === 'pending').length;
  const acceptedCount = MY_OFFERS.filter(o => o.status === 'accepted').length;

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 lg:py-5 flex items-center justify-between shadow-sm">
        <div>
           <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Tekliflerim</h1>
           <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">
              Toplam <span className="font-bold text-brand-orange">{MY_OFFERS.length}</span> teklifiniz bulunmaktadır.
           </p>
        </div>
        <div className="hidden sm:block">
           <div className="flex items-center gap-2 text-xs font-bold bg-gray-50 px-3 py-1.5 rounded-lg text-gray-500 border border-gray-200">
              <Clock size={14} /> Son güncelleme: Şimdi
           </div>
        </div>
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">

         {/* --- STATS GRID --- */}
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 border border-yellow-100">
                  <Clock size={24} />
               </div>
               <div>
                  <div className="text-3xl font-black text-slate-900 leading-none">{pendingCount}</div>
                  <div className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wide">Bekleyen</div>
               </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
                  <CheckCircle2 size={24} />
               </div>
               <div>
                  <div className="text-3xl font-black text-slate-900 leading-none">{acceptedCount}</div>
                  <div className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wide">Kabul Edilen</div>
               </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange border border-orange-100">
                  <FileText size={24} />
               </div>
               <div>
                  <div className="text-3xl font-black text-slate-900 leading-none">{MY_OFFERS.length}</div>
                  <div className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wide">Toplam Teklif</div>
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
               { value: 'pending', label: 'Beklemede' },
               { value: 'accepted', label: 'Kabul Edilen' },
               { value: 'rejected', label: 'Reddedilen' },
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

         {/* --- OFFERS LIST --- */}
         <div className="space-y-4">
            {filteredOffers.map((offer) => {
               const status = statusConfig[offer.status] || statusConfig.pending;
               const StatusIcon = status.icon;

               return (
                  <div 
                     key={offer.id}
                     className={`bg-white rounded-2xl border-2 p-5 transition-all hover:shadow-lg group relative overflow-hidden ${status.border}`}
                  >
                     {/* Background decorative status indicator */}
                     <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] rounded-bl-full pointer-events-none ${offer.status === 'accepted' ? 'bg-green-600' : offer.status === 'rejected' ? 'bg-red-600' : 'bg-yellow-500'}`}></div>

                     <div className="flex flex-col lg:flex-row lg:items-center gap-6 relative z-10">
                        
                        {/* LEFT: Main Info */}
                        <div className="flex-1">
                           <div className="flex items-center gap-3 mb-3">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${status.badgeBg} ${status.color}`}>
                                 <StatusIcon size={12} strokeWidth={3} />
                                 {status.label}
                              </span>
                              <span className="text-xs font-mono text-gray-400">REF: {offer.id}</span>
                           </div>

                           <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                              <h3 className="font-black text-slate-900 text-lg">{offer.loadTitle}</h3>
                              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                              <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                                 <span>{offer.origin}</span>
                                 <ArrowRight size={14} className="text-gray-400" />
                                 <span>{offer.destination}</span>
                              </div>
                           </div>

                           <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
                              <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                 <Building2 size={14} className="text-gray-400" /> 
                                 {offer.shipper}
                              </div>
                              <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                 <Calendar size={14} className="text-gray-400" /> 
                                 {offer.createdAt}
                              </div>
                           </div>

                           {/* Notes Section */}
                           {(offer.note || (offer.status === 'rejected' && offer.rejectReason)) && (
                              <div className="mt-4 flex gap-3">
                                 {offer.note && (
                                    <div className="text-xs text-gray-500 italic bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 max-w-md">
                                       <span className="font-bold text-gray-700 not-italic mr-1">Notunuz:</span> 
                                       "{offer.note}"
                                    </div>
                                 )}
                                 {offer.status === 'rejected' && offer.rejectReason && (
                                    <div className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100 flex items-center gap-2">
                                       <AlertCircle size={14} />
                                       <span className="font-bold">Red Nedeni:</span> {offer.rejectReason}
                                    </div>
                                 )}
                              </div>
                           )}
                        </div>

                        {/* RIGHT: Price & Actions */}
                        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:gap-2 pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0">
                           
                           <div className="text-left lg:text-right">
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Teklifiniz</div>
                              <div className="text-2xl font-black text-brand-dark flex items-center gap-1">
                                 <span className="text-lg text-gray-400 font-normal">₺</span>
                                 {offer.myPrice.toLocaleString()}
                              </div>
                              {offer.originalPrice > offer.myPrice && (
                                 <div className="text-xs text-green-600 font-bold mt-1 bg-green-50 px-2 py-0.5 rounded inline-block">
                                    Piyasadan {((offer.originalPrice - offer.myPrice) / offer.originalPrice * 100).toFixed(0)}% düşük
                                 </div>
                              )}
                           </div>

                           <div className="flex gap-2 mt-2">
                              {offer.status === 'pending' && (
                                 <button className="p-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100" title="Teklifi İptal Et">
                                    <Trash2 size={18} />
                                 </button>
                              )}
                              <button className="px-5 py-2.5 bg-brand-orange text-white text-sm font-bold rounded-xl shadow-lg shadow-brand-orange/20 hover:bg-orange-600 transition-all flex items-center gap-2">
                                 <Eye size={16} /> <span className="hidden sm:inline">Detayları Gör</span>
                              </button>
                           </div>

                        </div>
                     </div>
                  </div>
               );
            })}

            {/* Empty State */}
            {filteredOffers.length === 0 && (
               <div className="bg-white rounded-3xl border border-gray-200 py-16 text-center shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                     <FileText size={32} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">Teklif Bulunamadı</h3>
                  <p className="text-gray-500 text-sm">Bu filtreye uygun herhangi bir teklifiniz yok.</p>
               </div>
            )}
         </div>

      </div>
    </div>
  );
}
