
'use client';
import React, { useState } from 'react';
import { 
  Truck, Home, Car, Bike, Ship, Construction, Warehouse, 
  ArrowRight, Layers, Anchor, ChevronDown, CheckCircle2, Users, Search 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Data Structure
type ServiceType = 'shipper' | 'carrier';

interface ServiceItem {
  id: string;
  category: ServiceType;
  title: string;
  description: string;
  icon: any;
  features?: string[];
  ctaText?: string;
}

const SERVICES: ServiceItem[] = [
  // --- A) Yük Veren / Araç Arayan (Shipper) ---
  {
    id: '1A',
    category: 'shipper',
    title: 'Karayolu Taşımacılığı',
    description: 'Yükünüzü taşıyacak tır, kamyon veya kamyonet sahiplerine ilan açın, en uygun teklifi seçin.',
    icon: Truck,
    features: ['Binlerce Araç Sahibi', 'Fiyat Karşılaştırma', 'Onaylı Taşıyıcılar'],
    ctaText: 'Araç Bul'
  },
  {
    id: '1B',
    category: 'shipper',
    title: 'Ev & Ofis Lojistiği',
    description: 'Evden eve nakliye firmalarından teklif toplayın, taşınma sürecinizi yönetin.',
    icon: Home,
    features: ['Nakliye Firmaları', 'Müşteri Yorumları', 'Rekabetçi Teklifler'],
    ctaText: 'Firma Bul'
  },
  {
    id: '1C',
    category: 'shipper',
    title: 'Araç Taşıma & Çekici',
    description: 'Yolda mı kaldınız veya araç mı transfer edeceksiniz? Bölgedeki çekicilere ulaşın.',
    icon: Car,
    features: ['Çekici Ağı', 'Çoklu Taşıyıcılar', 'Hızlı Eşleşme'],
    ctaText: 'Çekici Çağır'
  },
  {
    id: '1D',
    category: 'shipper',
    title: 'Kurye & Parsiyel',
    description: 'Acil gönderileriniz için motorlu veya araçlı kurye firmalarıyla eşleşin.',
    icon: Bike,
    features: ['Kurye Profilleri', 'Hızlı Teslimat Ağı', 'Anlık İletişim'],
    ctaText: 'Kurye Bul'
  },
  {
    id: '1E',
    category: 'shipper',
    title: 'İntermodal Taşımacılık',
    description: 'Farklı taşıma modlarını (Gemi, Tren, Uçak) organize eden lojistik firmalarına ulaşın.',
    icon: Ship,
    features: ['Lojistik Firmaları', 'Global Acenteler', 'Teklif Toplama'],
    ctaText: 'Hizmet Al'
  },
  {
    id: '1F',
    category: 'shipper',
    title: 'Proje Taşımacılığı',
    description: 'Gabari dışı yükleriniz için lowbed ve özel ekipman sahibi firmaları bulun.',
    icon: Construction,
    features: ['Proje Firmaları', 'Özel Ekipman Ağı', 'Firma Profilleri'],
    ctaText: 'Firma Ara'
  },
  {
    id: '1G',
    category: 'shipper',
    title: 'Depolama Çözümleri',
    description: 'Eşyalarınız için kiralık depo alanı sunan işletmeleri ve antrepoları görüntüleyin.',
    icon: Warehouse,
    features: ['Kiralık Depolar', 'Antrepo İlanları', 'Alan Karşılaştırma'],
    ctaText: 'Depo Bul'
  },

  // --- B) Aracım Var / Yük Arayan (Carrier) ---
  {
    id: '1AA',
    category: 'carrier',
    title: 'Karayolu Yükü',
    description: 'Aracınız boş kalmasın. Rotanızdaki binlerce yük ilanını görüntüleyin ve teklif verin.',
    icon: Truck,
    features: ['Komisyonsuz İlanlar', 'Doğrudan Müşteri', 'Dönüş Yükleri'],
    ctaText: 'Yükleri Gör'
  },
  {
    id: '1BB',
    category: 'carrier',
    title: 'Ev & Ofis İşleri',
    description: 'Nakliye firmanız için evden eve taşımacılık taleplerine ulaşın.',
    icon: Home,
    features: ['Taşınma Talepleri', 'Kurumsal Müşteriler', 'İş Fırsatları'],
    ctaText: 'İşleri Gör'
  },
  {
    id: '1CC',
    category: 'carrier',
    title: 'Çekici Yükleri',
    description: 'Oto taşıyıcınız veya çekiciniz için yolda kalmış veya transfer edilecek araç ilanları.',
    icon: Car,
    features: ['Acil Çağrılar', 'Transfer İşleri', '7/24 İlan Akışı'],
    ctaText: 'Çağrıları Gör'
  },
  {
    id: '1DD',
    category: 'carrier',
    title: 'Kurye Gönderileri',
    description: 'Motosikletiniz veya hafif ticari aracınızla dağıtım yaparak kazanç sağlayın.',
    icon: Bike,
    features: ['Paket Dağıtımı', 'Evrak Gönderileri', 'Bölgesel İşler'],
    ctaText: 'Paketleri Gör'
  },
  {
    id: '1EE',
    category: 'carrier',
    title: 'İntermodal Transfer',
    description: 'Liman veya havaalanı transferleri için taşıma ihalelerine katılın.',
    icon: Ship,
    features: ['Liman Transferleri', 'Düzenli Seferler', 'Konteyner İşleri'],
    ctaText: 'İhaleleri Gör'
  },
  {
    id: '1FF',
    category: 'carrier',
    title: 'Proje Yükleri',
    description: 'Lowbed aracınız için ağır tonajlı ve özel proje yükü ilanlarını inceleyin.',
    icon: Construction,
    features: ['Ağır Nakliye', 'Fabrika Taşımaları', 'Özel Projeler'],
    ctaText: 'Yük Ara'
  },
  {
    id: '1GG',
    category: 'carrier',
    title: 'Depo Müşterisi',
    description: 'Deponuzda boş yer mi var? Eşya depolamak isteyen müşterilere ulaşın.',
    icon: Warehouse,
    features: ['Depo Arayanlar', 'Uzun Dönem', 'Kurumsal Talepler'],
    ctaText: 'Müşteri Bul'
  },
];

const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ServiceType>('shipper');

  const isShipper = activeTab === 'shipper';
  // Theme constants
  const themeAccent = isShipper ? 'text-brand-accent' : 'text-brand-orange';
  const themeBg = isShipper ? 'bg-brand-dark' : 'bg-brand-orange';
  const themeBorder = isShipper ? 'hover:border-brand-accent' : 'hover:border-brand-orange';
  const themeButton = isShipper ? 'bg-brand-dark hover:bg-brand-accent' : 'bg-brand-orange hover:bg-orange-600';
  const themeGradient = isShipper 
    ? 'from-blue-50 to-white' 
    : 'from-orange-50 to-white';

  const filteredServices = SERVICES.filter(s => s.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-brand-accent selection:text-white">
      <Navbar variant="white" />
      
      <main className="flex-grow">
        
        {/* --- 1. HERO SECTION: Corporate Style (Dark & Cinematic) --- */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-brand-dark overflow-hidden pt-[80px] lg:pt-[140px]">
          
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
               alt="Logistics Services" 
               className="w-full h-full object-cover opacity-30" 
             />
             {/* Gradient Overlays */}
             <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/60"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          {/* Content */}
          <div className="container mx-auto max-w-6xl relative z-10 text-center px-6 mt-6">
             
             {/* Badge */}
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-blue-100 text-xs font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Users size={14} className="text-brand-accent" />
                <span>Dijital Pazaryeri Platformu</span>
             </div>
             
             {/* Headline */}
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1] drop-shadow-2xl">
               Yük Verenle Taşıyıcıyı <br className="hidden md:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-light">Buluşturan Güç.</span>
             </h1>
             
             {/* Description - UPDATED TO REFLECT INTERMEDIARY ROLE */}
             <p className="text-lg md:text-xl text-blue-100/70 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
               SeyirGo bir nakliye firması değil, lojistiğin dijital çözüm ortağıdır. 
               Yükünüz için en doğru taşıyıcıyı, aracınız için en karlı yükü bulmanızı sağlıyoruz.
             </p>
          </div>
          
           {/* Bottom Fade */}
           <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent z-20"></div>
        </section>


        {/* --- 2. TABS & CONTENT SECTION --- */}
        <section className="relative -mt-16 z-30 pb-24">
           <div className="container mx-auto px-6 max-w-7xl">
              
              {/* Floating Tab Switcher */}
              <div className="bg-white rounded-2xl shadow-2xl p-2 max-w-2xl mx-auto mb-16 flex relative z-40 border border-gray-100">
                  <button 
                     onClick={() => setActiveTab('shipper')}
                     className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl transition-all duration-300 ${isShipper ? 'bg-brand-dark text-white shadow-lg ring-1 ring-black/5' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                     <div className={`p-1.5 rounded-lg ${isShipper ? 'bg-white/20' : 'bg-gray-200 text-gray-600'}`}>
                        <Truck size={20} />
                     </div>
                     <div className="text-left">
                        <div className="font-bold text-sm md:text-base leading-tight">Yük Verenim</div>
                        <div className={`text-[10px] font-medium opacity-80 ${isShipper ? 'text-blue-200' : 'text-gray-400'}`}>Hizmet Arıyorum</div>
                     </div>
                  </button>

                  <button 
                     onClick={() => setActiveTab('carrier')}
                     className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl transition-all duration-300 ${!isShipper ? 'bg-brand-orange text-white shadow-lg ring-1 ring-black/5' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                     <div className={`p-1.5 rounded-lg ${!isShipper ? 'bg-white/20' : 'bg-gray-200 text-gray-600'}`}>
                        <Car size={20} />
                     </div>
                     <div className="text-left">
                        <div className="font-bold text-sm md:text-base leading-tight">Taşıyıcıyım</div>
                        <div className={`text-[10px] font-medium opacity-80 ${!isShipper ? 'text-orange-100' : 'text-gray-400'}`}>Müşteri Arıyorum</div>
                     </div>
                  </button>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                 {filteredServices.map((service, idx) => (
                    <div 
                       key={service.id} 
                       className={`group bg-gradient-to-b ${themeGradient} rounded-3xl p-1 border border-transparent transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-200`}
                    >
                       <div className="bg-white rounded-[1.3rem] p-8 h-full flex flex-col relative overflow-hidden border border-gray-100/50">
                          
                          {/* Badge Number (1A, 1B...) */}
                          <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl font-black text-sm text-white shadow-sm ${isShipper ? 'bg-brand-dark' : 'bg-brand-orange'}`}>
                             {service.id}
                          </div>

                          {/* Icon */}
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-6 shadow-sm ${isShipper ? 'bg-blue-50 text-brand-dark' : 'bg-orange-50 text-brand-orange'}`}>
                             <service.icon size={32} strokeWidth={1.5} />
                          </div>

                          {/* Text */}
                          <h3 className="text-xl font-bold text-gray-900 mb-3 pr-8">
                             {service.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                             {service.description}
                          </p>

                          {/* Features List */}
                          <div className="mt-auto mb-8">
                             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Platform Özellikleri</div>
                             <ul className="space-y-2">
                                {service.features?.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                    <CheckCircle2 size={14} className={themeAccent} />
                                    {feature}
                                    </li>
                                ))}
                             </ul>
                          </div>

                          {/* Button - Uses dynamic CTA Text now */}
                          <button className={`w-full py-3 rounded-xl text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-lg ${themeButton}`}>
                             {service.ctaText || (isShipper ? 'Teklif Topla' : 'İlanları Gör')} <ArrowRight size={16} />
                          </button>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-20 border-t border-gray-200 pt-16 text-center">
                 <h3 className="text-2xl font-bold text-brand-dark mb-4">Size nasıl yardımcı olabiliriz?</h3>
                 <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
                    Platformumuz, aradığınız hizmeti sağlayan binlerce onaylı tedarikçi ile sizi bir araya getirir. 
                    Özel bir talebiniz varsa destek ekibimizle görüşebilirsiniz.
                 </p>
                 <a href="/iletisim" className="inline-flex items-center gap-2 text-brand-dark font-black hover:text-brand-accent transition-colors border-b-2 border-brand-dark hover:border-brand-accent pb-0.5">
                    Destek Ekibine Ulaşın <ArrowRight size={18} />
                 </a>
              </div>

           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
