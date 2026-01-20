
'use client';
import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Star, 
  ArrowRight,
  Download,
  Eye,
  Filter,
  Calendar,
  Package,
  Truck,
  FileText,
  Search,
  CheckCircle2,
  AlertOctagon
} from 'lucide-react';

// Örnek geçmiş verisi
const HISTORY = [
  {
    id: 'TS-2023-156',
    loadId: 'YK-2023-890',
    loadTitle: 'Tekstil Ürünleri',
    origin: 'İstanbul / Merter',
    destination: 'Ankara / Siteler',
    carrier: 'Hızlı Nakliyat Ltd.',
    price: 11500,
    date: '15 Ocak 2026',
    status: 'completed',
    rating: 5,
    review: 'Zamanında ve sorunsuz teslimat yapıldı.',
  },
  {
    id: 'TS-2023-155',
    loadId: 'YK-2023-889',
    loadTitle: 'Elektronik Malzeme',
    origin: 'İstanbul / Tuzla',
    destination: 'İzmir / Çiğli',
    carrier: 'Express Lojistik',
    price: 8200,
    date: '12 Ocak 2026',
    status: 'completed',
    rating: 4,
    review: 'İyi bir taşıma deneyimi.',
  },
  {
    id: 'TS-2023-154',
    loadId: 'YK-2023-888',
    loadTitle: 'Mobilya Ürünleri',
    origin: 'Kayseri / OSB',
    destination: 'Bursa / Nilüfer',
    carrier: 'Güven Lojistik A.Ş.',
    price: 9800,
    date: '8 Ocak 2026',
    status: 'completed',
    rating: 5,
  },
  {
    id: 'TS-2023-153',
    loadId: 'YK-2023-887',
    loadTitle: 'İnşaat Malzemesi',
    origin: 'Eskişehir / Merkez',
    destination: 'Konya / OSB',
    carrier: 'Anadolu Kargo',
    price: 6500,
    date: '3 Ocak 2026',
    status: 'cancelled',
    cancelReason: 'Taşıyıcı tarafından iptal edildi',
  },
  {
    id: 'TS-2023-152',
    loadId: 'YK-2023-886',
    loadTitle: 'Gıda Ürünleri',
    origin: 'Antalya / Merkez',
    destination: 'Ankara / Merkez',
    carrier: 'Soğuk Zincir A.Ş.',
    price: 14200,
    date: '28 Aralık 2025',
    status: 'completed',
    rating: 5,
    review: 'Soğuk zincir mükemmel korundu.',
  },
];

type FilterStatus = 'all' | 'completed' | 'cancelled';

export default function GecmisPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [dateRange, setDateRange] = useState('all');

  const filteredHistory = HISTORY.filter(item => 
    filterStatus === 'all' || item.status === filterStatus
  );

  const completedCount = HISTORY.filter(h => h.status === 'completed').length;
  const cancelledCount = HISTORY.filter(h => h.status === 'cancelled').length;
  const totalSpent = HISTORY.filter(h => h.status === 'completed').reduce((sum, h) => sum + h.price, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Taşıma Geçmişi</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">
            Toplam <span className="font-bold text-brand-dark">{HISTORY.length}</span> arşivlenmiş kayıt.
          </p>
        </div>
        <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
          <Download size={18} />
          <span>Rapor İndir</span>
        </button>
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 leading-none">{completedCount}</p>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Tamamlanan</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 border border-red-100">
                <XCircle size={24} />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 leading-none">{cancelledCount}</p>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">İptal Edilen</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-dark border border-blue-100">
                <Package size={24} />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 leading-none">₺{totalSpent.toLocaleString()}</p>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Toplam Harcama</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 p-2">
            <div className="flex items-center gap-2 flex-wrap flex-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-2">
                <Filter size={14} /> Durum:
              </span>
              {([
                { value: 'all', label: 'Tümü' },
                { value: 'completed', label: 'Tamamlanan' },
                { value: 'cancelled', label: 'İptal' },
              ] as { value: FilterStatus; label: string }[]).map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    filterStatus === filter.value
                      ? 'bg-brand-dark text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 border-l border-gray-100 pl-4">
              <Calendar size={16} className="text-gray-400" />
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="all">Tüm Zamanlar</option>
                <option value="month">Son 1 Ay</option>
                <option value="quarter">Son 3 Ay</option>
                <option value="year">Son 1 Yıl</option>
              </select>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-brand-orange/50 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                
                {/* Left - Icon & Main Info */}
                <div className="flex items-start gap-4 flex-1">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                   }`}>
                      {item.status === 'completed' ? <CheckCircle2 size={24} /> : <AlertOctagon size={24} />}
                   </div>
                   
                   <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                         <h3 className="text-lg font-black text-slate-900">{item.loadTitle}</h3>
                         <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded">#{item.id}</span>
                         {item.status === 'completed' ? (
                            <span className="text-[10px] font-bold uppercase text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100">Tamamlandı</span>
                         ) : (
                            <span className="text-[10px] font-bold uppercase text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-100">İptal</span>
                         )}
                      </div>

                      <div className="flex items-center gap-3 text-sm font-bold text-gray-600 mb-3">
                         <span>{item.origin.split(' / ')[0]}</span>
                         <ArrowRight size={14} className="text-gray-300" />
                         <span>{item.destination.split(' / ')[0]}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
                         <div className="flex items-center gap-1.5">
                            <Truck size={14} className="text-gray-400" />
                            {item.carrier}
                         </div>
                         <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-gray-400" />
                            {item.date}
                         </div>
                      </div>

                      {/* Cancel Reason */}
                      {item.status === 'cancelled' && item.cancelReason && (
                         <div className="mt-3 bg-red-50 p-3 rounded-lg border border-red-100 inline-block">
                            <p className="text-xs text-red-700 font-medium flex items-center gap-2">
                               <XCircle size={14} />
                               <span className="font-bold">İptal Nedeni:</span> {item.cancelReason}
                            </p>
                         </div>
                      )}

                      {/* Review */}
                      {item.status === 'completed' && item.rating && (
                         <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-3">
                            <div className="flex gap-0.5">
                               {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                     key={star}
                                     size={12} 
                                     className={star <= item.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
                                  />
                               ))}
                            </div>
                            {item.review && (
                               <span className="text-xs text-gray-500 italic border-l border-gray-200 pl-3">"{item.review}"</span>
                            )}
                         </div>
                      )}
                   </div>
                </div>

                {/* Right - Price & Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:pl-6 lg:border-l border-gray-100">
                   <div className="text-left lg:text-right">
                      <div className="text-2xl font-black text-slate-900">₺{item.price.toLocaleString()}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tutar</div>
                   </div>
                   
                   <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 font-bold text-xs rounded-lg hover:bg-gray-50 hover:text-brand-dark transition-all">
                      <FileText size={14} /> Detaylar
                   </button>
                </div>

              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredHistory.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 py-16 text-center shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                <Clock size={32} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Kayıt Bulunamadı</h3>
              <p className="text-gray-500 text-sm font-medium">Bu filtreleme kriterlerine uygun geçmiş kayıt yok.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
