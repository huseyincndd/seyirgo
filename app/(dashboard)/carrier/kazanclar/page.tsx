'use client';
import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft,
  Calendar,
  Download,
  CreditCard,
  Building2,
  Clock,
  CheckCircle,
  Filter,
  ChevronRight
} from 'lucide-react';

// Örnek kazanç verileri
const EARNINGS = [
  {
    id: 'KZ-001',
    loadId: 'YK-2024-102',
    description: 'Elektronik Malzeme - İstanbul → Bursa',
    amount: 4800,
    date: '17 Ocak 2026',
    status: 'completed',
  },
  {
    id: 'KZ-002',
    loadId: 'YK-2023-445',
    description: 'Tekstil Ürünleri - İstanbul → Ankara',
    amount: 11500,
    date: '15 Ocak 2026',
    status: 'completed',
  },
  {
    id: 'KZ-003',
    loadId: 'YK-2023-444',
    description: 'Elektronik Malzeme - İstanbul → İzmir',
    amount: 8200,
    date: '12 Ocak 2026',
    status: 'completed',
  },
  {
    id: 'KZ-004',
    loadId: 'YK-2023-443',
    description: 'Mobilya Ürünleri - Kayseri → Bursa',
    amount: 9800,
    date: '8 Ocak 2026',
    status: 'completed',
  },
  {
    id: 'KZ-005',
    loadId: 'YK-2023-441',
    description: 'Gıda Ürünleri - Antalya → Ankara',
    amount: 14200,
    date: '28 Aralık 2025',
    status: 'completed',
  },
];

// Para çekme işlemleri
const WITHDRAWALS = [
  {
    id: 'CK-001',
    amount: 25000,
    date: '10 Ocak 2026',
    status: 'completed',
    method: 'Havale',
    account: '****1234',
  },
  {
    id: 'CK-002',
    amount: 15000,
    date: '28 Aralık 2025',
    status: 'completed',
    method: 'Havale',
    account: '****1234',
  },
];

// Aylık kazanç verileri (grafik için)
const MONTHLY_DATA = [
  { month: 'Ağu', amount: 28500 },
  { month: 'Eyl', amount: 35200 },
  { month: 'Eki', amount: 42800 },
  { month: 'Kas', amount: 38900 },
  { month: 'Ara', amount: 45600 },
  { month: 'Oca', amount: 48500 },
];

export default function KazanclarPage() {
  const [activeTab, setActiveTab] = useState<'earnings' | 'withdrawals'>('earnings');
  const [dateRange, setDateRange] = useState('month');

  const totalEarnings = EARNINGS.reduce((sum, e) => sum + e.amount, 0);
  const thisMonthEarnings = 48500;
  const availableBalance = 23500;
  const pendingBalance = 4800;

  const maxAmount = Math.max(...MONTHLY_DATA.map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Kazançlarım</h1>
          <p className="text-gray-500 font-medium mt-1">Gelirlerinizi takip edin ve yönetin</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-200 transition-colors">
          <Download size={18} />
          Rapor İndir
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Wallet size={24} className="text-white/70" />
            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">Çekilebilir</span>
          </div>
          <p className="text-3xl font-black">₺{availableBalance.toLocaleString()}</p>
          <p className="text-sm text-orange-100 mt-1">Mevcut Bakiye</p>
          <button className="mt-4 w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-bold transition-colors">
            Para Çek
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
              <Clock size={20} />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900">₺{pendingBalance.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Bekleyen Ödeme</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900">₺{thisMonthEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Bu Ay Kazanç</p>
          <p className="text-xs text-green-600 font-bold mt-1 flex items-center gap-1">
            <ArrowUpRight size={12} /> +18% geçen aya göre
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-brand-dark">
              <Wallet size={20} />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900">₺{totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Toplam Kazanç</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900">Aylık Kazanç Grafiği</h3>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium"
          >
            <option value="month">Son 6 Ay</option>
            <option value="year">Son 1 Yıl</option>
          </select>
        </div>

        {/* Simple Bar Chart */}
        <div className="flex items-end gap-4 h-48">
          {MONTHLY_DATA.map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative">
                <div 
                  className="w-full bg-gradient-to-t from-brand-orange to-orange-400 rounded-t-lg transition-all hover:from-brand-orange hover:to-orange-300"
                  style={{ height: `${(data.amount / maxAmount) * 160}px` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-gray-500">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs & Transactions */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('earnings')}
            className={`flex-1 px-6 py-4 text-sm font-bold transition-colors ${
              activeTab === 'earnings'
                ? 'text-brand-orange border-b-2 border-brand-orange bg-orange-50/50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Kazançlar
          </button>
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`flex-1 px-6 py-4 text-sm font-bold transition-colors ${
              activeTab === 'withdrawals'
                ? 'text-brand-orange border-b-2 border-brand-orange bg-orange-50/50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Para Çekme İşlemleri
          </button>
        </div>

        {/* Content */}
        <div className="divide-y divide-gray-100">
          {activeTab === 'earnings' && EARNINGS.map((earning) => (
            <div key={earning.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <ArrowUpRight size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{earning.description}</p>
                  <p className="text-xs text-gray-500 mt-0.5">#{earning.loadId} • {earning.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-green-600">+₺{earning.amount.toLocaleString()}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                    <CheckCircle size={10} /> Tamamlandı
                  </span>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'withdrawals' && WITHDRAWALS.map((withdrawal) => (
            <div key={withdrawal.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <ArrowDownLeft size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">Para Çekme - {withdrawal.method}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Hesap: {withdrawal.account} • {withdrawal.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-gray-900">₺{withdrawal.amount.toLocaleString()}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                    <CheckCircle size={10} /> Tamamlandı
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Account */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Banka Hesabım</h3>
          <button className="text-brand-accent text-sm font-bold hover:underline">
            Düzenle
          </button>
        </div>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
            <Building2 size={24} className="text-brand-dark" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">Garanti BBVA</p>
            <p className="text-sm text-gray-500">TR12 **** **** **** **** 1234</p>
          </div>
          <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
            Doğrulanmış
          </span>
        </div>
      </div>
    </div>
  );
}
