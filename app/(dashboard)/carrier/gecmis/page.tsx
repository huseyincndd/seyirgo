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
  Wallet
} from 'lucide-react';

// Örnek geçmiş verisi
const HISTORY = [
  {
    id: 'TS-2023-089',
    loadId: 'YK-2023-445',
    loadTitle: 'Tekstil Ürünleri',
    origin: 'İstanbul / Merter',
    destination: 'Ankara / Siteler',
    shipper: 'Merter Tekstil A.Ş.',
    earning: 11500,
    date: '15 Ocak 2026',
    status: 'completed',
    rating: 5,
    review: 'Profesyonel ve hızlı teslimat.',
  },
  {
    id: 'TS-2023-088',
    loadId: 'YK-2023-444',
    loadTitle: 'Elektronik Malzeme',
    origin: 'İstanbul / Tuzla',
    destination: 'İzmir / Çiğli',
    shipper: 'Tech Import Ltd.',
    earning: 8200,
    date: '12 Ocak 2026',
    status: 'completed',
    rating: 4,
    review: 'Güvenilir taşıyıcı.',
  },
  {
    id: 'TS-2023-087',
    loadId: 'YK-2023-443',
    loadTitle: 'Mobilya Ürünleri',
    origin: 'Kayseri / OSB',
    destination: 'Bursa / Nilüfer',
    shipper: 'Kayseri Mobilya A.Ş.',
    earning: 9800,
    date: '8 Ocak 2026',
    status: 'completed',
    rating: 5,
  },
  {
    id: 'TS-2023-086',
    loadId: 'YK-2023-442',
    loadTitle: 'İnşaat Malzemesi',
    origin: 'Eskişehir / Merkez',
    destination: 'Konya / OSB',
    shipper: 'Yapı Market A.Ş.',
    earning: 0,
    date: '3 Ocak 2026',
    status: 'cancelled',
    cancelReason: 'Yük sahibi tarafından iptal edildi',
  },
  {
    id: 'TS-2023-085',
    loadId: 'YK-2023-441',
    loadTitle: 'Gıda Ürünleri',
    origin: 'Antalya / Merkez',
    destination: 'Ankara / Merkez',
    shipper: 'Fresh Foods Ltd.',
    earning: 14200,
    date: '28 Aralık 2025',
    status: 'completed',
    rating: 5,
    review: 'Soğuk zincir mükemmel korundu.',
  },
];

type FilterStatus = 'all' | 'completed' | 'cancelled';

export default function CarrierGecmisPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [dateRange, setDateRange] = useState('all');

  const filteredHistory = HISTORY.filter(item => 
    filterStatus === 'all' || item.status === filterStatus
  );

  const completedCount = HISTORY.filter(h => h.status === 'completed').length;
  const cancelledCount = HISTORY.filter(h => h.status === 'cancelled').length;
  const totalEarned = HISTORY.filter(h => h.status === 'completed').reduce((sum, h) => sum + h.earning, 0);
  const avgRating = HISTORY.filter(h => h.rating).reduce((sum, h) => sum + (h.rating || 0), 0) / 
                    HISTORY.filter(h => h.rating).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Taşıma Geçmişim</h1>
          <p className="text-gray-500 font-medium mt-1">
            Toplam {HISTORY.length} taşıma kaydı
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-200 transition-colors">
          <Download size={18} />
          Rapor İndir
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{completedCount}</p>
              <p className="text-sm text-gray-500">Tamamlanan</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
              <XCircle size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{cancelledCount}</p>
              <p className="text-sm text-gray-500">İptal Edilen</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">₺{totalEarned.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Toplam Kazanç</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
              <Star size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{avgRating.toFixed(1)}</p>
              <p className="text-sm text-gray-500">Ortalama Puan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 flex-wrap flex-1">
            <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
              <Filter size={16} /> Durum:
            </span>
            {([
              { value: 'all', label: 'Tümü' },
              { value: 'completed', label: 'Tamamlanan' },
              { value: 'cancelled', label: 'İptal' },
            ] as { value: FilterStatus; label: string }[]).map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterStatus === filter.value
                    ? 'bg-brand-orange text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium"
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
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-300 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Left - Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {item.status === 'completed' ? (
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-lg uppercase">
                      Tamamlandı
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded-lg uppercase">
                      İptal
                    </span>
                  )}
                  <span className="text-xs text-gray-400">#{item.id}</span>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-1">{item.loadTitle}</h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span>{item.origin.split(' / ')[0]}</span>
                  <ArrowRight size={14} className="text-gray-400" />
                  <span>{item.destination.split(' / ')[0]}</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Package size={12} /> {item.shipper}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {item.date}
                  </span>
                </div>

                {/* Rating & Review */}
                {item.status === 'completed' && item.rating && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            size={14} 
                            className={star <= item.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      {item.review && (
                        <span className="text-sm text-gray-600 italic">"{item.review}"</span>
                      )}
                    </div>
                  </div>
                )}

                {item.status === 'cancelled' && item.cancelReason && (
                  <p className="mt-2 text-sm text-red-600">{item.cancelReason}</p>
                )}
              </div>

              {/* Right - Earning & Actions */}
              <div className="flex items-center gap-4 lg:border-l lg:border-gray-100 lg:pl-6">
                <div className="text-right">
                  {item.status === 'completed' ? (
                    <p className="text-xl font-black text-green-600">+₺{item.earning.toLocaleString()}</p>
                  ) : (
                    <p className="text-xl font-black text-gray-400">-</p>
                  )}
                </div>
                <button className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                  <Eye size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 py-12 text-center">
            <Clock size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Geçmiş kayıt bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}
