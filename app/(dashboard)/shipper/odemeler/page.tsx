'use client';
import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Building2,
  Download,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  FileText,
  ChevronRight,
  Landmark,
  MoreVertical,
  MapPin
} from 'lucide-react';

// Örnek ödeme verileri
const PAYMENTS = [
  {
    id: 'OD-2024-001',
    type: 'payment',
    description: 'YK-2024-001 - Tekstil Ürünleri',
    carrier: 'Hızlı Nakliyat Ltd.',
    amount: 11500,
    date: '17 Ocak 2026',
    status: 'completed',
    paymentMethod: 'Havale/EFT',
    invoiceId: 'FAT-2024-001'
  },
  {
    id: 'OD-2024-002',
    type: 'payment',
    description: 'YK-2024-002 - Makine Parçaları',
    carrier: 'Express Lojistik',
    amount: 8200,
    date: '15 Ocak 2026',
    status: 'completed',
    paymentMethod: 'Kredi Kartı',
    invoiceId: 'FAT-2024-002'
  },
  {
    id: 'OD-2024-003',
    type: 'payment',
    description: 'YK-2024-003 - Gıda Ürünleri',
    carrier: 'Soğuk Zincir A.Ş.',
    amount: 14200,
    date: '12 Ocak 2026',
    status: 'pending',
    paymentMethod: 'Havale/EFT',
    invoiceId: '-'
  },
  {
    id: 'OD-2024-004',
    type: 'refund',
    description: 'İade: YK-2023-887 İptal',
    carrier: 'Anadolu Kargo',
    amount: 6500,
    date: '5 Ocak 2026',
    status: 'completed',
    paymentMethod: 'Cüzdan',
    invoiceId: 'IADE-2024-001'
  },
];

// Ödeme yöntemleri
const PAYMENT_METHODS = [
  { id: 'pm-1', type: 'card', last4: '4242', brand: 'Visa', bank: 'Garanti BBVA', expiry: '12/28', isDefault: true },
  { id: 'pm-2', type: 'bank', name: 'Şirket Hesabı', iban: 'TR12 **** **** 5678', bank: 'Yapı Kredi', isDefault: false },
];

const statusConfig: Record<string, { label: string, color: string, badgeBg: string, icon: any }> = {
  completed: { label: 'Tamamlandı', color: 'text-green-600', badgeBg: 'bg-green-50 border-green-100', icon: CheckCircle2 },
  pending: { label: 'Beklemede', color: 'text-yellow-600', badgeBg: 'bg-yellow-50 border-yellow-100', icon: Clock },
  failed: { label: 'Başarısız', color: 'text-red-600', badgeBg: 'bg-red-50 border-red-100', icon: AlertCircle },
};

export default function OdemelerPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPayments = PAYMENTS.filter(p => 
    filterStatus === 'all' || p.status === filterStatus
  );

  const totalPaid = PAYMENTS.filter(p => p.status === 'completed' && p.type === 'payment')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = PAYMENTS.filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Finans & Ödemeler</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">
            Bu ay toplam <span className="font-bold text-brand-dark">₺{totalPaid.toLocaleString()}</span> ödeme yaptınız.
          </p>
        </div>
        <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
          <Download size={18} />
          <span>Ekstre İndir</span>
        </button>
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
              <ArrowUpRight size={24} />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 leading-none">₺{totalPaid.toLocaleString()}</p>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Toplam Ödenen</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 border border-yellow-100">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 leading-none">₺{pendingAmount.toLocaleString()}</p>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Bekleyen Ödeme</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-dark border border-blue-100">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 leading-none">{PAYMENTS.length}</p>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Toplam İşlem</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column: Transaction History */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Filter Bar */}
            <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-200 p-2 shadow-sm">
                <div className="flex items-center gap-2 overflow-x-auto p-1">
                  {(['all', 'completed', 'pending'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFilterStatus(filter)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        filterStatus === filter
                          ? 'bg-brand-dark text-white shadow-md'
                          : 'bg-transparent text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {filter === 'all' ? 'Tümü' : statusConfig[filter]?.label || filter}
                    </button>
                  ))}
                </div>
                <div className="hidden sm:flex items-center gap-2 pr-4 border-l border-gray-100 pl-4">
                   <Calendar size={16} className="text-gray-400" />
                   <span className="text-xs font-bold text-gray-600">Bu Ay</span>
                </div>
            </div>

            {/* Transactions List */}
            <div className="space-y-4">
              {filteredPayments.map((payment) => {
                const status = statusConfig[payment.status];
                const StatusIcon = status.icon;
                const isRefund = payment.type === 'refund';

                return (
                  <div key={payment.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all group">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isRefund ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-orange-50 text-brand-orange border border-orange-100'
                      }`}>
                        {isRefund ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>

                      {/* Main Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                           <h3 className="font-bold text-slate-900 text-sm">{payment.description}</h3>
                           <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded border self-start sm:self-auto ${status.badgeBg} ${status.color}`}>
                              <StatusIcon size={10} /> {status.label}
                           </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
                          <span className="flex items-center gap-1"><Building2 size={12} /> {payment.carrier}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="flex items-center gap-1"><Calendar size={12} /> {payment.date}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span>{payment.paymentMethod}</span>
                        </div>
                      </div>

                      {/* Amount & Actions */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 pl-0 sm:pl-4 sm:border-l border-gray-100">
                        <div className={`text-lg font-black ${isRefund ? 'text-blue-600' : 'text-slate-900'}`}>
                          {isRefund ? '+' : '-'}₺{payment.amount.toLocaleString()}
                        </div>
                        <button className="text-xs font-bold text-gray-400 hover:text-brand-dark flex items-center gap-1 transition-colors">
                           <FileText size={12} /> Fatura <ChevronRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredPayments.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 py-12 text-center">
                  <Wallet size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium text-sm">Görüntülenecek işlem bulunamadı.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Payment Methods & Billing */}
          <div className="space-y-6">
            
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-slate-900 text-lg">Kayıtlı Kartlar</h3>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-brand-dark hover:text-white transition-colors">
                  <Plus size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <div 
                    key={method.id}
                    className={`relative p-4 rounded-xl border transition-all group ${
                      method.isDefault 
                        ? 'bg-brand-dark text-white border-brand-dark shadow-lg shadow-brand-dark/20' 
                        : 'bg-white text-slate-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                       <div className="font-bold text-sm tracking-wide">{method.bank}</div>
                       {method.type === 'card' ? <CreditCard size={18} className="opacity-70" /> : <Landmark size={18} className="opacity-70" />}
                    </div>
                    <div className="text-lg font-mono mb-2">
                       {method.type === 'card' ? `•••• •••• •••• ${method.last4}` : method.iban}
                    </div>
                    <div className="flex items-center justify-between text-xs opacity-70 font-medium">
                       <span>{method.type === 'card' ? method.brand : method.name}</span>
                       <span>{method.type === 'card' ? method.expiry : ''}</span>
                    </div>
                    
                    {method.isDefault && (
                       <div className="absolute top-0 right-0 p-2">
                          <div className="bg-white/20 backdrop-blur-sm p-1 rounded-full"><CheckCircle2 size={12} className="text-green-400" /></div>
                       </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-slate-900 text-lg">Fatura Bilgileri</h3>
                <button className="text-xs font-bold text-brand-orange hover:underline">Düzenle</button>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                <div className="flex items-start gap-3">
                   <Building2 size={16} className="text-gray-400 mt-0.5" />
                   <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Firma Ünvanı</p>
                      <p className="text-sm font-bold text-slate-900">ABC Lojistik Ltd. Şti.</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <FileText size={16} className="text-gray-400 mt-0.5" />
                   <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Vergi No</p>
                      <p className="text-sm font-bold text-slate-900">1234567890</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <MapPin size={16} className="text-gray-400 mt-0.5" />
                   <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Adres</p>
                      <p className="text-sm font-medium text-slate-700 leading-snug">
                         Merkez Mah. İş Cad. No:123, <br/> Şişli / İstanbul
                      </p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}