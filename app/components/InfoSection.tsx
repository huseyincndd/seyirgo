'use client';

import React, { useState } from 'react';
import { MousePointerClick, Bell, ListChecks, TrendingUp, Handshake, Wallet } from 'lucide-react';

const InfoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shipper' | 'carrier'>('shipper');

  return (
    <section id="corporate" className="py-16 md:py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r from-brand-accent to-brand-orange opacity-20"></div>

      <div className="container mx-auto px-4">
        
        <div className="text-center mb-10 md:mb-16">
          <span className="text-brand-accent font-bold tracking-widest uppercase text-[10px] md:text-xs bg-brand-accent/5 px-3 py-1 rounded-full border border-brand-accent/10">ÇALIŞMA MANTIĞI</span>
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark mt-4 mb-4 tracking-tight">Sistem Nasıl Çalışır?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8 text-sm md:text-base px-2">
            SeyirGo klasik bir ilan sitesi değildir. Yük ve araç sahiplerini anlık bildirimlerle buluşturan bir teklif platformudur.
          </p>
          
          {/* Responsive Toggle Button Container */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0 p-1.5 bg-gray-100 rounded-2xl sm:rounded-xl border border-gray-200 max-w-md mx-auto sm:max-w-none w-full sm:w-fit sm:inline-flex">
             <button 
               onClick={() => setActiveTab('shipper')}
               className={`w-full sm:w-auto px-6 md:px-8 py-3 rounded-xl sm:rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'shipper' ? 'bg-white text-brand-dark shadow-md ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}
             >
               Yük Verenim
             </button>
             <button 
               onClick={() => setActiveTab('carrier')}
               className={`w-full sm:w-auto px-6 md:px-8 py-3 rounded-xl sm:rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'carrier' ? 'bg-white text-brand-dark shadow-md ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}
             >
               Yük Taşıyanım
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
            {activeTab === 'shipper' ? (
              <>
                <div className="relative p-6 md:p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-brand-accent/30 transition-all group">
                  <div className="absolute -top-4 left-6 md:-top-6 md:left-8 w-10 h-10 md:w-12 md:h-12 bg-brand-accent text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg shadow-brand-accent/20">1</div>
                  <div className="mt-4 md:mt-4">
                     <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm text-brand-accent">
                        <MousePointerClick size={28} className="md:w-8 md:h-8" />
                     </div>
                     <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Talebini Oluştur</h3>
                     <p className="text-gray-600 leading-relaxed text-sm">
                        Yükünün veya eşyanın detaylarını (ağırlık, ölçü, tarih) sisteme gir. İlan vermek tamamen <strong className="text-green-600">ücretsizdir.</strong>
                     </p>
                  </div>
                </div>

                <div className="relative p-6 md:p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-brand-accent/30 transition-all group">
                   <div className="absolute top-1/2 -left-6 hidden lg:block text-gray-300 transform -translate-y-1/2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                   </div>
                  <div className="absolute -top-4 left-6 md:-top-6 md:left-8 w-10 h-10 md:w-12 md:h-12 bg-brand-accent text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg shadow-brand-accent/20">2</div>
                  <div className="mt-4 md:mt-4">
                     <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm text-brand-accent">
                        <Bell size={28} className="md:w-8 md:h-8" />
                     </div>
                     <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Sistem Bildirsin</h3>
                     <p className="text-gray-600 leading-relaxed text-sm">
                        Sistemimiz, kriterlerine uyan araç sahiplerine <strong className="text-brand-dark">anında bildirim</strong> gönderir. Sen arama yapmazsın, sistem çalışır.
                     </p>
                  </div>
                </div>

                <div className="relative p-6 md:p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-brand-accent/30 transition-all group">
                   <div className="absolute top-1/2 -left-6 hidden lg:block text-gray-300 transform -translate-y-1/2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                   </div>
                  <div className="absolute -top-4 left-6 md:-top-6 md:left-8 w-10 h-10 md:w-12 md:h-12 bg-brand-accent text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg shadow-brand-accent/20">3</div>
                  <div className="mt-4 md:mt-4">
                     <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm text-brand-accent">
                        <ListChecks size={28} className="md:w-8 md:h-8" />
                     </div>
                     <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Teklifleri Seç</h3>
                     <p className="text-gray-600 leading-relaxed text-sm">
                        Gelen teklifleri fiyata ve taşıyıcı puanına göre karşılaştır. Sana en uygun olanı onayla ve taşıma başlasın.
                     </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="relative p-6 md:p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-brand-orange/30 transition-all group">
                  <div className="absolute -top-4 left-6 md:-top-6 md:left-8 w-10 h-10 md:w-12 md:h-12 bg-brand-orange text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg shadow-brand-orange/20">1</div>
                  <div className="mt-4 md:mt-4">
                     <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm text-brand-orange">
                        <TrendingUp size={28} className="md:w-8 md:h-8" />
                     </div>
                     <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Rotanı Belirle</h3>
                     <p className="text-gray-600 leading-relaxed text-sm">
                        Hizmet verdiğin bölgeyi veya gideceğin rotayı sisteme kaydet. Aracının boş kalmasını engelle.
                     </p>
                  </div>
                </div>

                <div className="relative p-6 md:p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-brand-orange/30 transition-all group">
                  <div className="absolute -top-4 left-6 md:-top-6 md:left-8 w-10 h-10 md:w-12 md:h-12 bg-brand-orange text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg shadow-brand-orange/20">2</div>
                  <div className="mt-4 md:mt-4">
                     <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm text-brand-orange">
                        <Handshake size={28} className="md:w-8 md:h-8" />
                     </div>
                     <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Bildirim & Teklif</h3>
                     <p className="text-gray-600 leading-relaxed text-sm">
                        Uygun bir yük girildiğinde telefonuna bildirim gelir. Detayları incele ve müşteriye <strong className="text-brand-dark">kendi fiyat teklifini</strong> sun.
                     </p>
                  </div>
                </div>

                <div className="relative p-6 md:p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-brand-orange/30 transition-all group">
                  <div className="absolute -top-4 left-6 md:-top-6 md:left-8 w-10 h-10 md:w-12 md:h-12 bg-brand-orange text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg shadow-brand-orange/20">3</div>
                  <div className="mt-4 md:mt-4">
                     <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-sm text-brand-orange">
                        <Wallet size={28} className="md:w-8 md:h-8" />
                     </div>
                     <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">İşi Kap & Kazan</h3>
                     <p className="text-gray-600 leading-relaxed text-sm">
                        Müşteri teklifini onayladığında iş senindir. Teslimatı yap, ödemeni güvenle al. İlk ay üyelik <strong className="text-green-600">ücretsizdir.</strong>
                     </p>
                  </div>
                </div>
              </>
            )}
        </div>

      </div>
    </section>
  );
};

export default InfoSection;