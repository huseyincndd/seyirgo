
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  ArrowRight,
  Package,
  Calendar,
  MapPin,
  Truck
} from 'lucide-react';

// Örnek yük verileri
const LOADS = [
  {
    id: 'YK-2024-001',
    title: '12 Palet Tekstil Ürünü',
    origin: 'İstanbul / Hadımköy',
    destination: 'Ankara / Ostim',
    date: '20 Ocak 2026',
    weight: '5,000 kg',
    type: 'Tır',
    price: '12,500',
    status: 'pending',
    offersCount: 5,
  },
  {
    id: 'YK-2024-002',
    title: 'Makine Parçaları',
    origin: 'Bursa / Nilüfer',
    destination: 'İzmir / Çiğli',
    date: '22 Ocak 2026',
    weight: '3,200 kg',
    type: 'Kamyon',
    price: '8,750',
    status: 'active',
    offersCount: 0,
  },
  {
    id: 'YK-2024-003',
    title: 'Gıda Ürünleri (Soğuk Zincir)',
    origin: 'Antalya / Merkez',
    destination: 'İstanbul / Tuzla',
    date: '18 Ocak 2026',
    weight: '8,000 kg',
    type: 'Frigo',
    status: 'in_transit',
    price: '15,000'
  },
  {
    id: 'YK-2024-004',
    title: 'Mobilya ve Ev Eşyası',
    origin: 'Kayseri / OSB',
    destination: 'Ankara / Siteler',
    date: '25 Ocak 2026',
    weight: '6,500 kg',
    type: 'Tır',
    price: '9,200',
    status: 'pending',
    offersCount: 3,
  },
  {
    id: 'YK-2024-005',
    title: 'Elektronik Malzeme',
    origin: 'İstanbul / Tuzla',
    destination: 'Konya / Merkez',
    date: '15 Ocak 2026',
    weight: '2,100 kg',
    type: 'Kamyon',
    price: '5,800',
    status: 'completed',
  },
];

const statusConfig: Record<string, { label: string, color: string }> = {
  pending: { label: 'Teklif Bekliyor', color: 'bg-yellow-100 text-yellow-700' },
  active: { label: 'Aktif', color: 'bg-green-100 text-green-700' },
  in_transit: { label: 'Taşımada', color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Tamamlandı', color: 'bg-gray-100 text-gray-600' },
  cancelled: { label: 'İptal', color: 'bg-red-100 text-red-600' },
};

type FilterStatus = 'all' | 'pending' | 'active' | 'in_transit' | 'completed';

export default function YuklerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredLoads = LOADS.filter(load => {
    const matchesSearch = load.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         load.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         load.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || load.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Yüklerim</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Tüm ilanlarınızı buradan yönetin.</p>
        </div>
        <Link 
          href="/shipper/yeni-ilan"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-brand-dark/20"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Yeni İlan</span>
        </Link>
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Yük ara (başlık, kalkış, varış)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-dark/10 focus:border-brand-dark transition-all placeholder:font-medium"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-2">
                <Filter size={14} /> Filtre:
              </span>
              {(['all', 'pending', 'active', 'in_transit', 'completed'] as FilterStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                    filterStatus === status
                      ? 'bg-brand-dark text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'Tümü' : statusConfig[status].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loads Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Yük Bilgisi</th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Rota</th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Tarih</th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Fiyat</th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">Durum</th>
                  <th className="text-left py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-wider">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLoads.map((load) => {
                  const status = statusConfig[load.status];
                  return (
                    <tr key={load.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-brand-dark group-hover:bg-brand-dark group-hover:text-white transition-colors">
                            <Package size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{load.title}</p>
                            <p className="text-xs text-gray-500 font-medium">#{load.id} • {load.weight} • {load.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                          <span>{load.origin.split('/')[0]}</span>
                          <ArrowRight size={14} className="text-gray-400" />
                          <span>{load.destination.split('/')[0]}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-gray-600">{load.date}</span>
                      </td>
                      <td className="py-4 px-6">
                        {load.price ? (
                          <span className="font-black text-gray-900">₺{load.price}</span>
                        ) : (
                          <span className="text-gray-400 font-medium">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${status.color}`}>
                            {status.label}
                          </span>
                          {load.offersCount && load.offersCount > 0 ? (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-md animate-pulse">
                              {load.offersCount} Teklif
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <button 
                            onClick={() => setOpenMenuId(openMenuId === load.id ? null : load.id)}
                            className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <MoreVertical size={18} />
                          </button>
                          
                          {openMenuId === load.id && (
                            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
                              <button className="w-full px-4 py-2 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <Eye size={14} /> Detay
                              </button>
                              <button className="w-full px-4 py-2 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <Edit2 size={14} /> Düzenle
                              </button>
                              <button className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
                                <Trash2 size={14} /> Sil
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            {filteredLoads.map((load) => {
              const status = statusConfig[load.status];
              return (
                <div key={load.id} className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${status.color}`}>
                          {status.label}
                        </span>
                        {load.offersCount && load.offersCount > 0 ? (
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full">
                            {load.offersCount} Teklif
                          </span>
                        ) : null}
                      </div>
                      <p className="font-bold text-gray-900">{load.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">#{load.id}</p>
                    </div>
                    {load.price && <span className="font-black text-gray-900 text-lg">₺{load.price}</span>}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-bold mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <MapPin size={16} className="text-brand-dark" /> 
                    <span>{load.origin.split('/')[0]}</span>
                    <ArrowRight size={14} className="text-gray-400" />
                    <span>{load.destination.split('/')[0]}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {load.date}</span>
                      <span className="flex items-center gap-1"><Truck size={14} /> {load.type}</span>
                    </div>
                    <button className="text-xs font-bold text-white bg-brand-dark px-4 py-2 rounded-lg shadow-md shadow-brand-dark/20">Detay</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredLoads.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                 <Package size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-900 font-bold">Yük bulunamadı</p>
              <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">Arama kriterlerinizi değiştirin veya sağ üstten yeni yük ilanı oluşturun.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
