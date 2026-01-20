import React from 'react';
import { 
  ShieldCheck, BellRing, Users, MousePointer2, 
  Zap, Smartphone, Wallet, Star
} from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-light/10 text-brand-dark px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4">
             <Star size={14} className="text-brand-orange fill-brand-orange" />
             <span>Benzersiz Özellikler</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4 md:mb-6 tracking-tight">
            Neden <span className="text-brand-accent">SeyirGo?</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed px-2">
            Klasik nakliye süreçlerini unutun. SeyirGo, teknolojiyi lojistikle birleştirerek size zaman ve para kazandıran akıllı bir ekosistem sunar.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] md:auto-rows-[minmax(200px,auto)]">
          
          {/* Card 1: Main Value Prop (Large) */}
          <div className="md:col-span-2 row-span-2 bg-brand-dark rounded-3xl p-6 md:p-12 relative overflow-hidden group min-h-[300px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-brand-accent/30"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center text-brand-accent mb-6 backdrop-blur-sm">
                <Zap className="w-6 h-6 md:w-9 md:h-9" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Yapay Zeka Destekli Hızlı Eşleşme</h3>
                <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
                  İlanınız saniyeler içinde analiz edilir. Konum, araç tipi ve yük özelliklerine göre en uygun taşıyıcılar otomatik belirlenir ve anında bildirim gönderilir. Beklemek yok.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Mobile/Notifications (Tall) */}
          <div className="md:col-span-1 lg:col-span-1 row-span-2 bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100 hover:border-brand-accent/30 transition-all group flex flex-col min-h-[350px]">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white shadow-sm rounded-xl flex items-center justify-center text-brand-orange mb-6 group-hover:scale-110 transition-transform">
              <BellRing className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-brand-dark mb-3">Akıllı Bildirimler</h3>
            <p className="text-gray-500 text-sm mb-8 flex-grow">
              Sürekli ekran başında beklemenize gerek yok. Fırsat ayağınıza gelir.
            </p>
            <div className="mt-auto bg-white rounded-xl p-4 shadow-lg border border-gray-100 transform group-hover:translate-y-[-5px] transition-transform">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-white"><Smartphone size={16} /></div>
                  <span className="text-xs font-bold text-gray-700">Yeni Bildirim</span>
               </div>
               <div className="text-xs text-gray-400">
                  "İstanbul - Ankara arası 2 ton yük ilanı açıldı. Hemen teklif ver!"
               </div>
            </div>
          </div>

          {/* Card 3: Free (Small/Square) */}
          <div className="md:col-span-1 bg-brand-accent rounded-3xl p-6 md:p-8 text-white relative overflow-hidden group min-h-[200px]">
            <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
               <Wallet size={100} className="md:w-[120px] md:h-[120px]" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">Yük Verenler İçin</h3>
            <div className="text-3xl md:text-4xl font-black mb-1">ÜCRETSİZ</div>
            <p className="text-white/80 text-xs md:text-sm">İlan açmak tamamen bedava.</p>
          </div>

          {/* Card 4: Trust (Small/Square) */}
          <div className="md:col-span-1 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-shadow group min-h-[200px]">
            <ShieldCheck size={40} className="text-green-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-brand-dark">Doğrulanmış Hesaplar</h3>
            <p className="text-gray-500 text-xs mt-2">
              Tüm taşıyıcıların belgeleri kontrol edilir. Güvenli ticaret esastır.
            </p>
          </div>

          {/* Card 5: Bidding (Wide) */}
          <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-r from-gray-900 to-brand-dark rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
             <div className="relative z-10 mb-6 md:mb-0 md:pr-8 w-full md:w-auto">
                <div className="flex items-center gap-3 mb-3">
                   <MousePointer2 className="text-brand-orange w-6 h-6 md:w-8 md:h-8" />
                   <h3 className="text-xl md:text-2xl font-bold">Teklif Usulü Çalışma</h3>
                </div>
                <p className="text-gray-300 text-sm">
                   Sabit fiyat dayatması yok. Taşıyıcılar rekabetçi fiyatlarını sunar, yük verenler bütçesine ve puana göre seçim yapar.
                </p>
             </div>
             <div className="relative z-10 flex-shrink-0 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 w-full md:w-auto min-w-[200px]">
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2 mb-2">
                   <span className="text-gray-300">Teklif 1</span>
                   <span className="font-bold text-brand-accent">8.500 ₺</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2 mb-2">
                   <span className="text-gray-300">Teklif 2</span>
                   <span className="font-bold text-white">9.200 ₺</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-300">Teklif 3</span>
                   <span className="font-bold text-brand-orange">8.000 ₺</span>
                </div>
             </div>
          </div>

          {/* Card 6: Community (Small) */}
          <div className="md:col-span-1 lg:col-span-2 bg-blue-50 border border-blue-100 rounded-3xl p-6 md:p-8 flex items-center justify-between hover:bg-blue-100 transition-colors">
             <div>
                <h3 className="text-lg md:text-xl font-bold text-brand-dark mb-1">Büyüyen Aile</h3>
                <p className="text-brand-light text-sm">Türkiye'nin her yerindeyiz.</p>
             </div>
             <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                      <Users size={20} className="text-gray-500" />
                   </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-dark text-white flex items-center justify-center text-xs font-bold">
                   +5K
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;