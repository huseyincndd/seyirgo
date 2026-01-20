'use client';
import React from 'react';
import { MapPin, BellRing, MousePointerClick, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Talebini Gir",
    desc: "Uygulamaya girip yükünün detaylarını ve güzergahını belirle. İlanın saniyeler içinde hazır.",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Eşleşme Sağlansın",
    desc: "Sistemimiz, bölgedeki onaylı ve puanı yüksek taşıyıcılara anında bildirim gönderir.",
    icon: BellRing,
  },
  {
    id: 3,
    title: "Teklifi Seç",
    desc: "Gelen fiyat tekliflerini ve sürücü profillerini incele. Sana en uygun olanı onayla.",
    icon: MousePointerClick,
  },
  {
    id: 4,
    title: "Yola Çıksın",
    desc: "Araç kapına gelsin, yükleme yapılsın. Teslimat tamamlanana kadar canlı takip et.",
    icon: Truck,
  }
];

const SimpleSteps: React.FC = () => {
  return (
    <section className="py-24 bg-white relative border-b border-gray-100">
      
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
                <span className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-3 block">
                    OPERASYONEL MÜKEMMELLİK
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tight leading-[1.1]">
                    Lojistikte <br/>
                    <span className="relative inline-block">
                        Belirsizlik Yok,
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-orange opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                           <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                        </svg>
                    </span>
                    <br/>
                    <span className="text-gray-400">Tam Kontrol Var.</span>
                </h2>
            </div>
            <div className="max-w-md">
                <p className="text-gray-500 font-medium leading-relaxed">
                    Sürprizlere yer bırakmayan dijital altyapımızla süreçleri optimize ettik. 
                    Uçtan uca şeffaf, planlı ve güvenilir bir nakliye deneyimi sunuyoruz.
                </p>
            </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
            
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[2px] bg-gray-100">
               {/* Animated Progress Indicator */}
               <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent animate-[shimmer_3s_infinite] transform -skew-x-12"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {steps.map((step, index) => (
                    <div key={step.id} className="relative group">
                        
                        {/* Mobile Connector Line */}
                        {index !== steps.length - 1 && (
                            <div className="lg:hidden absolute left-[28px] top-[60px] bottom-[-48px] w-[2px] bg-gray-100 z-0"></div>
                        )}

                        {/* Step Marker */}
                        <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white border-4 border-gray-50 text-brand-dark shadow-sm group-hover:border-brand-orange group-hover:text-brand-orange transition-all duration-300 mb-8 mx-auto lg:mx-0">
                            <step.icon size={24} strokeWidth={2.5} />
                            
                            {/* Number Badge */}
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-dark text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                {step.id}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-center lg:text-left px-4 lg:px-0">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-dark transition-colors flex items-center justify-center lg:justify-start gap-2">
                                {step.title}
                                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-orange" />
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                {step.desc}
                            </p>
                        </div>

                        {/* Hover Bottom Bar */}
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-8 hidden lg:block"></div>
                    </div>
                ))}
            </div>

        </div>

        {/* Bottom Tagline */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3 text-sm font-bold text-gray-400 uppercase tracking-wider">
                <CheckCircle2 size={18} className="text-green-500" />
                <span>Komisyon Yok</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-400 uppercase tracking-wider">
                <CheckCircle2 size={18} className="text-green-500" />
                <span>Ücretsiz Üyelik</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-400 uppercase tracking-wider">
                <CheckCircle2 size={18} className="text-green-500" />
                <span>7/24 Destek</span>
            </div>
        </div>

      </div>
    </section>
  );
};

export default SimpleSteps;
