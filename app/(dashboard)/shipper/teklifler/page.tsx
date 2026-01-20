
'use client';
import React, { useState } from 'react';
import { 
  FileText, 
  Star, 
  Check, 
  X, 
  Eye,
  Phone,
  MessageSquare,
  Truck,
  Clock,
  ArrowRight,
  Filter,
  ChevronDown,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
  MapPin
} from 'lucide-react';

// Örnek teklif verileri
const OFFERS = [
  {
    id: 'TK-001',
    loadId: 'YK-2024-001',
    loadTitle: '12 Palet Tekstil Ürünü',
    route: 'İstanbul → Ankara',
    carrier: {
      name: 'Hızlı Nakliyat Ltd.',
      rating: 4.8,
      completedJobs: 234,
      verified: true,
    },
    price: 11800,
    originalPrice: 12500,
    note: 'Araç yarın sabah müsait, hızlı teslimat yapabiliriz.',
    createdAt: '2 saat önce',
    status: 'pending',
  },
  {
    id: 'TK-002',
    loadId: 'YK-2024-001',
    loadTitle: '12 Palet Tekstil Ürünü',
    route: 'İstanbul → Ankara',
    carrier: {
      name: 'Güven Lojistik A.Ş.',
      rating: 4.5,
      completedJobs: 156,
      verified: true,
    },
    price: 12200,
    originalPrice: 12500,
    note: 'Sigortalı taşıma yapıyoruz.',
    createdAt: '5 saat önce',
    status: 'pending',
  },
  {
    id: 'TK-003',
    loadId: 'YK-2024-001',
    loadTitle: '12 Palet Tekstil Ürünü',
    route: 'İstanbul → Ankara',
    carrier: {
      name: 'Yıldırım Taşımacılık',
      rating: 4.9,
      completedJobs: 312,
      verified: true,
    },
    price: 11500,
    originalPrice: 12500,
    note: 'En uygun fiyat garantisi.',
    createdAt: '1 gün önce',
    status: 'pending',
  },
  {
    id: 'TK-004',
    loadId: 'YK-2024-004',
    loadTitle: 'Mobilya ve Ev Eşyası',
    route: 'Kayseri → Ankara',
    carrier: {
      name: 'Anadolu Kargo',
      rating: 4.6,
      completedJobs: 89,
      verified: false,
    },
    price: 8900,
    originalPrice: 9200,
    createdAt: '3 saat önce',
    status: 'pending',
  },
  {
    id: 'TK-005',
    loadId: 'YK-2024-002',
    loadTitle: 'Makine Parçaları',
    route: 'Bursa → İzmir',
    carrier: {
      name: 'Express Lojistik',
      rating: 4.7,
      completedJobs: 178,
      verified: true,
    },
    price: 8200,
    originalPrice: 8750,
    createdAt: '6 saat önce',
    status: 'accepted',
  },
];

const statusConfig: Record<string, { label: string, color: string, badgeBg: string, icon: any }> = {
  pending: { label: 'Bekliyor', color: 'text-yellow-600', badgeBg: 'bg-yellow-50 border-yellow-100', icon: Clock },
  accepted: { label: 'Kabul Edildi', color: 'text-green-600', badgeBg: 'bg-green-50 border-green-100', icon: CheckCircle2 },
  rejected: { label: 'Reddedildi', color: 'text-red-600', badgeBg: 'bg-red-50 border-red-100', icon: XCircle },
};

type FilterStatus = 'all' | 'pending' | 'accepted' | 'rejected';

export default function TekliflerPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const filteredOffers = OFFERS.filter(offer => 
    filterStatus === 'all' || offer.status === filterStatus
  );

  const pendingCount = OFFERS.filter(o => o.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Gelen Teklifler</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">
            İlanlarınıza gelen <span className="font-bold text-brand-dark">{pendingCount}</span> yeni teklif var.
          </p>
        </div>
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm inline-flex flex-wrap gap-2 w-full md:w-auto">
          {([
            { value: 'all', label: 'Tümü' },
            { value: 'pending', label: 'Bekleyenler', count: pendingCount },
            { value: 'accepted', label: 'Kabul Edilenler' },
            { value: 'rejected', label: 'Reddedilenler' },
          ] as { value: FilterStatus; label: string; count?: number }[]).map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                filterStatus === filter.value
                  ? 'bg-brand-dark text-white shadow-md'
                  : 'bg-transparent text-gray-500 hover:bg-gray-50'
              }`}
            >
              {filter.label}
              {filter.count !== undefined && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                  filterStatus === filter.value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Offers List */}
        <div className="space-y-4">
          {filteredOffers.map((offer) => {
             const status = statusConfig[offer.status];
             const StatusIcon = status.icon;
             
             return (
              <div 
                key={offer.id}
                className={`bg-white rounded-2xl border transition-all duration-300 group overflow-hidden ${
                  selectedOffer === offer.id 
                    ? 'border-brand-dark shadow-lg ring-1 ring-brand-dark/5' 
                    : 'border-gray-200 hover:border-brand-orange/50 hover:shadow-md'
                }`}
              >
                {/* Main Content */}
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    
                    {/* Carrier Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange font-black text-xl flex-shrink-0 border border-brand-orange/20">
                          {offer.carrier.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-bold text-lg text-slate-900 leading-tight">{offer.carrier.name}</h3>
                            {offer.carrier.verified && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-wide">
                                <ShieldCheck size={10} /> Doğrulanmış
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                            <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-100">
                              <Star size={12} fill="currentColor" />
                              {offer.carrier.rating}
                            </span>
                            <span>{offer.carrier.completedJobs} Başarılı İş</span>
                          </div>
                        </div>
                      </div>

                      {/* Load & Route Info */}
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                               <span className="text-[10px] font-bold text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded">#{offer.loadId}</span>
                               <span className="text-xs font-bold text-slate-700">{offer.loadTitle}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-brand-dark">
                              <span className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" /> {offer.route.split(' → ')[0]}</span>
                              <ArrowRight size={14} className="text-gray-300" />
                              <span className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" /> {offer.route.split(' → ')[1]}</span>
                            </div>
                          </div>
                          
                          {offer.note && (
                            <div className="text-xs text-gray-500 italic border-l-2 border-gray-200 pl-3 sm:max-w-xs">
                              "{offer.note}"
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="lg:text-right lg:border-l lg:border-gray-100 lg:pl-8 flex flex-row lg:flex-col justify-between items-center lg:items-end">
                      <div>
                         <div className="flex items-center lg:justify-end gap-2 mb-1">
                           <span className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${status.badgeBg} ${status.color}`}>
                              <StatusIcon size={12} /> {status.label}
                           </span>
                         </div>
                         <div className="text-3xl font-black text-slate-900 tracking-tight">₺{offer.price.toLocaleString()}</div>
                         <div className="flex items-center lg:justify-end gap-2 text-xs font-bold mt-1">
                            <span className="text-gray-400 line-through">₺{offer.originalPrice.toLocaleString()}</span>
                            <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                               %{Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100)} Avantaj
                            </span>
                         </div>
                         <p className="text-[10px] text-gray-400 mt-2 flex items-center lg:justify-end gap-1">
                           <Clock size={10} /> {offer.createdAt}
                         </p>
                      </div>

                      {offer.status === 'pending' && (
                        <div className="flex items-center gap-2 mt-4 lg:w-full">
                          <button className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 font-bold text-xs rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 border border-transparent transition-all flex items-center justify-center gap-2">
                            <X size={16} /> Reddet
                          </button>
                          <button className="flex-1 px-4 py-2.5 bg-brand-dark text-white font-bold text-xs rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-brand-dark/20 hover:shadow-green-600/20 flex items-center justify-center gap-2">
                            <Check size={16} /> Kabul Et
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Toggle Details Button */}
                <button 
                  onClick={() => setSelectedOffer(selectedOffer === offer.id ? null : offer.id)}
                  className="w-full py-2 bg-gray-50 border-t border-gray-100 text-[10px] font-bold text-gray-500 hover:text-brand-dark hover:bg-gray-100 transition-colors flex items-center justify-center gap-1 uppercase tracking-widest"
                >
                  {selectedOffer === offer.id ? 'Detayları Gizle' : 'Detayları Göster'}
                  <ChevronDown size={14} className={`transition-transform ${selectedOffer === offer.id ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanded Details */}
                {selectedOffer === offer.id && (
                  <div className="p-6 border-t border-gray-100 bg-gray-50/50 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-2">Taşıyıcı İletişim</div>
                        <div className="space-y-2">
                           <button className="w-full flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-brand-orange transition-colors">
                              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center"><Phone size={16} /></div>
                              0532 *** ** ** (Görüntüle)
                           </button>
                           <button className="w-full flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-brand-orange transition-colors">
                              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center"><MessageSquare size={16} /></div>
                              Mesaj Gönder
                           </button>
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-2">Araç Bilgisi</div>
                        <div className="flex items-center gap-3 mb-2">
                           <Truck size={24} className="text-gray-300" />
                           <div>
                              <div className="text-sm font-bold text-slate-900">Mercedes-Benz Actros</div>
                              <div className="text-xs text-gray-500">2021 Model • Tır</div>
                           </div>
                        </div>
                        <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded inline-block border border-green-100 font-bold">
                           K1 Yetki Belgesi Var
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-1">Teslimat Başarısı</div>
                        <div className="text-2xl font-black text-brand-dark">%98</div>
                        <div className="text-[10px] text-gray-400">Son 12 ayda</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty State */}
          {filteredOffers.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 py-16 text-center shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                <FileText size={32} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Teklif Bulunamadı</h3>
              <p className="text-gray-500 text-sm font-medium">Bu kategoride görüntülenecek teklif yok.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
