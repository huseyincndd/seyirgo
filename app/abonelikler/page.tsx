'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle2, Package, Truck, Minus, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type PlanType = 'shipper' | 'carrier';

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState<PlanType>('carrier'); // Default to carrier since they usually buy plans
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Carrier Plans
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
      cta: 'Ücretsiz Başla',
      popular: false,
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
      cta: 'Pro\'ya Geç',
      popular: true,
      popularText: 'En Çok Tercih Edilen',
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
      cta: 'Bizimle İletişime Geç',
      popular: false,
    },
  ];

  // Shipper Plans
  const shipperPlans = [
    {
      id: 'free',
      name: 'Yük Veren - Standart',
      desc: 'Arada sırada yük gönderimi yapan bireysel veya KOBİ işletmeler için.',
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        { name: 'Sınırsız yük ilanı verme', included: true },
        { name: 'Gelen teklifleri inceleme', included: true },
        { name: 'Taşıyıcı profillerini görme', included: true },
        { name: 'Standart müşteri desteği', included: true },
        { name: 'İlanı anında "Acil" olarak işaretleme', included: false },
        { name: 'Özel Taşıyıcı Yöneticisi', included: false },
      ],
      cta: 'Hemen İlan Ver',
      popular: true,
      popularText: 'Ücretsiz',
    },
    {
      id: 'pro',
      name: 'Kurumsal Gönderici',
      desc: 'Sürekli sevkiyatı olan ve lojistiği hızlıca çözmek isteyen büyük işletmeler.',
      priceMonthly: 899,
      priceYearly: 749,
      features: [
        { name: 'Tüm Standart özellikler', included: true },
        { name: 'Taşıyıcılardan öncelikli teklif alma', included: true },
        { name: 'VIP / Doğrulanmış Taşıyıcı Filtresi', included: true },
        { name: '7/24 Özel destek hattı', included: true },
        { name: 'İlanları "Acil" olarak işaretleme', included: true },
        { name: 'Aylık taşıma maliyet raporları', included: true },
      ],
      cta: 'Kurumsal Planı Seç',
      popular: false,
    },
  ];

  const currentPlans = activeTab === 'carrier' ? carrierPlans : shipperPlans;

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-sans">
      <Navbar variant="white" />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
              İhtiyacınıza Uygun Planı Seçin
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              SeyirGo, ister yük sahibi olun ister taşıyıcı, işinizi büyütmeniz için şeffaf ve avantajlı abonelik modelleri sunar.
            </p>
          </div>

          {/* Toggle Switches */}
          <div className="flex flex-col items-center gap-8 mb-16">
            
            {/* User Type Toggle */}
            <div className="flex p-1 bg-white rounded-2xl shadow-sm border border-gray-200">
              <button
                onClick={() => setActiveTab('carrier')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'carrier'
                    ? 'bg-brand-orange text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Truck size={18} /> Taşıyıcı Paketleri
              </button>
              <button
                onClick={() => setActiveTab('shipper')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'shipper'
                    ? 'bg-brand-dark text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Package size={18} /> Yük Veren Paketleri
              </button>
            </div>

            {/* Billing Cycle Toggle (only relevant for paid plans) */}
            <div className="flex items-center gap-4">
              <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-gray-500'}`}>Aylık Ödeme</span>
              <button 
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-8 bg-brand-dark rounded-full relative transition-colors focus:outline-none"
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform duration-300 shadow-sm ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
              <span className={`text-sm font-bold flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-gray-500'}`}>
                Yıllık Ödeme
                <span className="bg-green-100 text-green-700 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-black animate-pulse">
                  %20 İndirim
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
            {currentPlans.map((plan, index) => {
              const themeColor = activeTab === 'shipper' ? 'brand-dark' : 'brand-orange';
              const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
              const isFree = price === 0;

              return (
                <div 
                  key={plan.id}
                  className={`relative bg-white rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    plan.popular 
                      ? `ring-4 shadow-xl scale-105 lg:z-10 bg-gradient-to-b from-white to-gray-50/50 ${activeTab === 'shipper' ? 'ring-brand-dark' : 'ring-brand-orange'}` 
                      : 'border border-gray-200 shadow-lg'
                  }`}
                >
                  {plan.popular && (
                    <div className={`absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black text-white tracking-widest uppercase shadow-md ${activeTab === 'shipper' ? 'bg-brand-dark' : 'bg-brand-orange'}`}>
                      {plan.popularText}
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-500 min-h-[40px] leading-relaxed">{plan.desc}</p>
                  </div>

                  <div className="mb-8 flex items-end gap-2">
                    {isFree ? (
                      <span className="text-4xl font-black text-slate-900">₺0</span>
                    ) : (
                      <>
                        <span className="text-4xl font-black text-slate-900">₺{price}</span>
                        <span className="text-gray-500 font-medium mb-1">/ ay</span>
                      </>
                    )}
                  </div>
                  
                  {billingCycle === 'yearly' && !isFree && (
                    <div className="text-xs text-green-600 font-bold mb-6 bg-green-50 w-fit px-3 py-1 rounded-full">
                      Yıllık faturalandırılır (₺{price * 12} / yıl)
                    </div>
                  )}
                  {billingCycle === 'monthly' && !isFree && (
                    <div className="text-xs text-transparent mb-6">
                      Spacer
                    </div>
                  )}
                  {isFree && <div className="text-xs text-transparent mb-6">Spacer</div>}

                  <Link href={`/kayit?tab=${activeTab === 'shipper' ? 'yuk-veren' : 'yuk-tasiyan'}`}>
                    <button className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all mb-8 shadow-md ${
                      plan.popular
                        ? activeTab === 'shipper' 
                            ? 'bg-brand-dark text-white hover:bg-slate-800' 
                            : 'bg-brand-orange text-white hover:bg-orange-600'
                        : 'bg-white border-2 border-gray-200 text-gray-800 hover:border-gray-300 hover:bg-gray-50'
                    }`}>
                      {plan.cta}
                    </button>
                  </Link>

                  <div className="space-y-4">
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Plana Dahil Olanlar</div>
                    {plan.features.map((feature, i) => (
                      <div key={i} className={`flex items-start gap-3 ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        <div className="mt-0.5 flex-shrink-0">
                          {feature.included ? (
                            <CheckCircle2 size={18} className={activeTab === 'shipper' ? 'text-brand-dark' : 'text-brand-orange'} />
                          ) : (
                            <Minus size={18} className="text-gray-300" />
                          )}
                        </div>
                        <span className={`text-sm font-medium ${!feature.included && 'line-through'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

          {/* FAQ or Info Section */}
          <div className="mt-24 max-w-4xl mx-auto border-t border-gray-200 pt-16">
            <h3 className="text-2xl font-black text-slate-900 text-center mb-10">Sıkça Sorulan Sorular</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle size={18} className="text-brand-orange" /> Aboneliğimi istediğim zaman iptal edebilir miyim?
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Evet, aylık planlarda aboneliğinizi dilediğiniz zaman iptal edebilirsiniz. Yıllık planlarda ise iptal işlemleri dönem sonunda gerçekleşir.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle size={18} className="text-brand-orange" /> Komisyon alıyor musunuz?
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  SeyirGo sadece platform abonelik ücreti ile çalışır. Taşıyıcı ile yük veren arasında gerçekleşen ticaretten herhangi bir komisyon kesintisi yapmayız.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle size={18} className="text-brand-orange" /> Ücretsiz planla iş alabilir miyim?
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Evet, Standart planımızla sisteme üye olup ilanları görüntüleyebilir ve sınırlı sayıda teklif vererek iş alabilirsiniz.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <HelpCircle size={18} className="text-brand-orange" /> Yük vermek her zaman ücretsiz mi?
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Bireysel ve standart yükverenler için sistemimiz ücretsizdir. Sadece ekstra özellikler (VIP araç, öncelik) isteyen kurumsal firmalar için premium planlarımız mevcuttur.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Banner at the bottom */}
          <div className="mt-20 bg-gradient-to-r from-brand-dark to-slate-900 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Hâlâ kararsız mısınız?</h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Ücretsiz planımızla sisteme dahil olun, SeyirGo&apos;nun avantajlı dünyasını hemen keşfedin. Memnun kalırsanız istediğiniz zaman Pro plana geçebilirsiniz.
              </p>
              <Link href="/kayit" className="inline-flex items-center gap-2 bg-white text-brand-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all active:scale-95 shadow-xl">
                Ücretsiz Üye Ol <ArrowRight size={20} />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
