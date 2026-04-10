'use client';
import React, { useState } from 'react';
import { CheckCircle2, Minus, CreditCard, ShieldCheck, ArrowRight, Star } from 'lucide-react';

export default function CarrierSubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const carrierPlans = [
    {
      id: 'free',
      name: 'Standart',
      desc: 'Sistemi denemek ve ayda birkaç iş almak isteyen bireysel taşıyıcılar için.',
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        { name: 'Aktif yük ilanlarını görüntüleme', included: true },
        { name: 'Aylık 3 teklif verme hakkı', included: true },
        { name: 'Standart profil görünürlüğü', included: true },
        { name: 'Temel e-posta desteği', included: true },
        { name: 'Doğrudan yük verenle iletişim', included: false },
        { name: 'Arama sonuçlarında öne çıkma', included: false },
        { name: 'Otomatik yük eşleştirme bildirimleri', included: false },
      ],
      current: false,
    },
    {
      id: 'pro',
      name: 'Profesyonel',
      desc: 'Düzenli iş almak ve kapasitesini tam kullanmak isteyen profesyonel taşıyıcılar.',
      priceMonthly: 499,
      priceYearly: 399,
      features: [
        { name: 'Sınırsız aktif yük görüntüleme', included: true },
        { name: 'Sınırsız teklif verme hakkı', included: true },
        { name: 'Öncelikli profil görünürlüğü', included: true },
        { name: '7/24 Öncelikli destek', included: true },
        { name: 'Doğrudan yük verenle iletişim', included: true },
        { name: 'Arama sonuçlarında öne çıkma', included: false },
        { name: 'Otomatik yük eşleştirme bildirimleri (SMS)', included: true },
      ],
      popular: true,
      popularText: 'En Çok Tercih Edilen',
      current: true, // Mevcut plan bu olsun varsayalım
    },
    {
      id: 'fleet',
      name: 'Filo / Kurumsal',
      desc: 'Birden fazla aracı olan ve filolarını yönetmek isteyen kurumsal lojistik firmaları.',
      priceMonthly: 1299,
      priceYearly: 999,
      features: [
        { name: 'Tüm Pro özellikleri dahil', included: true },
        { name: 'Sınırsız araç ve sürücü ekleme', included: true },
        { name: 'VIP Rozetli profil', included: true },
        { name: 'Özel müşteri temsilcisi', included: true },
        { name: 'Arama sonuçlarında en üstte çıkma', included: true },
        { name: 'Filo performans raporlaması', included: true },
        { name: 'API Erişimi ve Entegrasyonlar', included: true },
      ],
      current: false,
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <CreditCard className="text-brand-orange" size={32} /> 
            Abonelik Planım
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-medium max-w-2xl">
            İşinizi büyütmek ve daha fazla yük veren firmaya ulaşmak için size en uygun planı seçin veya mevcut planınızı yönetin.
          </p>
        </div>

        {/* Current Plan Summary Card */}
        <div className="bg-gradient-to-r from-brand-orange to-amber-500 rounded-2xl p-4 text-white shadow-lg shadow-brand-orange/20 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Star size={24} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">Mevcut Planınız</p>
            <p className="text-xl font-black">Profesyonel Plan</p>
            <p className="text-xs text-white/90">Bitiş: 15.05.2026</p>
          </div>
        </div>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
          <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-gray-400'}`}>Aylık Ödeme</span>
          <button 
            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-8 bg-brand-orange rounded-full relative transition-colors focus:outline-none shadow-inner"
          >
            <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform duration-300 shadow-sm ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-1'}`}></div>
          </button>
          <span className={`text-sm font-bold flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-gray-400'}`}>
            Yıllık Ödeme
            <span className="bg-green-100 text-green-700 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-black animate-pulse">
              %20 İndirim
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {carrierPlans.map((plan) => {
          const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
          const isFree = price === 0;

          return (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-3xl p-6 lg:p-8 transition-all duration-300 flex flex-col h-full ${
                plan.popular 
                  ? 'ring-4 shadow-xl ring-brand-orange scale-100 lg:scale-105 z-10' 
                  : 'border border-gray-200 shadow-sm hover:shadow-md'
              } ${plan.current ? 'bg-orange-50/30' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black text-white tracking-widest uppercase shadow-md bg-brand-orange">
                  {plan.popularText}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
                  {plan.name}
                  {plan.current && <ShieldCheck size={18} className="text-brand-orange" />}
                </h3>
                <p className="text-xs text-gray-500 min-h-[48px] leading-relaxed">{plan.desc}</p>
              </div>

              <div className="mb-6 flex items-end gap-1">
                {isFree ? (
                  <span className="text-4xl font-black text-slate-900">₺0</span>
                ) : (
                  <>
                    <span className="text-4xl font-black text-slate-900">₺{price}</span>
                    <span className="text-gray-500 font-medium mb-1 text-sm">/ ay</span>
                  </>
                )}
              </div>
              
              {billingCycle === 'yearly' && !isFree ? (
                <div className="text-[10px] text-green-600 font-bold mb-6 bg-green-50 w-fit px-3 py-1 rounded-full">
                  Yıllık faturalandırılır (₺{price * 12} / yıl)
                </div>
              ) : (
                <div className="h-6 mb-6"></div> // spacer to keep cards aligned
              )}

              <div className="mb-8 mt-auto">
                <button 
                  disabled={plan.current}
                  className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-sm ${
                  plan.current 
                    ? 'bg-green-100 text-green-700 cursor-not-allowed border border-green-200'
                    : plan.popular
                      ? 'bg-brand-orange text-white hover:bg-orange-600 shadow-md shadow-brand-orange/20'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-brand-orange hover:text-brand-orange'
                }`}>
                  {plan.current ? 'Mevcut Planınız' : isFree ? 'Bu Plana Düş' : 'Plana Geçiş Yap'}
                </button>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Plana Dahil Olanlar</div>
                {plan.features.map((feature, i) => (
                  <div key={i} className={`flex items-start gap-2 ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                    <div className="mt-0.5 flex-shrink-0">
                      {feature.included ? (
                        <CheckCircle2 size={16} className="text-brand-orange" />
                      ) : (
                        <Minus size={16} className="text-gray-300" />
                      )}
                    </div>
                    <span className={`text-xs font-medium leading-relaxed ${!feature.included && 'line-through opacity-70'}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Extra Info Banner */}
      <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Güvenli Ödeme ve Şeffaflık</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Planınızı dilediğiniz zaman iptal edebilir veya değiştirebilirsiniz. Sürpriz ücretler veya gizli maliyetler yoktur. Kart bilgileriniz iyzico güvencesiyle saklanır.
            </p>
          </div>
        </div>
        <button className="flex-shrink-0 text-sm font-bold text-brand-orange hover:text-orange-700 flex items-center gap-1">
          Daha fazla bilgi <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}
