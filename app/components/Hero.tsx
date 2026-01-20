'use client';
import React, { useState, useEffect } from 'react';
import { 
  Truck, Package, MapPin, ArrowRight, Home, Car, Bike, Ship, Construction, Warehouse, 
  Circle, CheckCircle2, ChevronRight, PackageCheck, ArrowLeft, Info, Play
} from 'lucide-react';

type UserType = 'shipper' | 'carrier';
type CategoryId = 'road' | 'moving' | 'vehicle' | 'courier' | 'intermodal' | 'project' | 'storage';

interface Category {
  id: CategoryId;
  label: string;
  icon: any;
}

const CATEGORIES: Category[] = [
  { id: 'road', label: 'Tır/Kamyon', icon: Truck },
  { id: 'moving', label: 'Evden Eve', icon: Home },
  { id: 'vehicle', label: 'Oto Çekici', icon: Car },
  { id: 'courier', label: 'Moto Kurye', icon: Bike },
  { id: 'intermodal', label: 'Deniz/Hava', icon: Ship },
  { id: 'project', label: 'Proje Yükü', icon: Construction },
  { id: 'storage', label: 'Depolama', icon: Warehouse },
];

const Hero: React.FC = () => {
  const [step, setStep] = useState<0 | 1>(0); // 0: Selection, 1: Form
  const [activeTab, setActiveTab] = useState<UserType>('shipper');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('road');
  const [isExiting, setIsExiting] = useState(false); // Controls the exit animation of step 0

  // Handle Initial Selection with Smooth Exit Animation
  const handleSelection = (type: UserType) => {
    setIsExiting(true); // Trigger exit animation
    
    // Wait for exit animation to complete before switching state
    setTimeout(() => {
        setActiveTab(type);
        setStep(1);
        setIsExiting(false);
    }, 400); // Matches the duration-300 + little buffer
  };

  // Handle Back
  const handleBack = () => {
    setStep(0);
  };

  // Dynamic Styles based on Active Tab
  const isShipper = activeTab === 'shipper';
  const themeColor = isShipper ? 'text-brand-dark' : 'text-brand-orange';
  const themeBg = isShipper ? 'bg-brand-dark' : 'bg-brand-orange';
  const themeRing = isShipper ? 'focus-within:ring-brand-dark' : 'focus-within:ring-brand-orange';

  return (
    <div className="relative w-full min-h-[900px] lg:h-screen flex flex-col justify-center items-center overflow-hidden bg-gray-50">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Logistics Background"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/95 to-gray-50/20 lg:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 w-full h-full flex flex-col justify-center pt-24 pb-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* --- LEFT SIDE: TEXT CONTENT --- */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm mx-auto lg:mx-0">
                <span className={`w-2 h-2 rounded-full animate-pulse ${step === 1 && !isShipper ? 'bg-brand-orange' : 'bg-brand-accent'}`}></span>
                <span className="text-[11px] font-bold tracking-widest uppercase text-brand-dark">Lojistiğin Yeni Yüzyılı</span>
             </div>

             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-brand-dark">
               Yükünüz İçin <br />
               <span className={`text-transparent bg-clip-text bg-gradient-to-r ${step === 1 && !isShipper ? 'from-brand-orange to-yellow-500' : 'from-brand-accent to-brand-light'}`}>
                 Akıllı Rota.
               </span>
             </h1>
             
             <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
               SeyirGo, yapay zeka destekli altyapısıyla yük verenleri ve taşıyıcıları saniyeler içinde buluşturur. 
               Endüstriyel taşımacılıktan bireysel lojistiğe, <span className="text-brand-dark font-bold underline decoration-brand-accent decoration-2 underline-offset-4">güvenle taşıyoruz.</span>
             </p>

             <div className="hidden md:flex items-center gap-8 pt-6 opacity-80 justify-center lg:justify-start">
                <div className="flex flex-col">
                    <span className="text-3xl font-bold text-brand-dark">12K+</span>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Operasyon</span>
                </div>
                <div className="w-px h-10 bg-gray-300"></div>
                <div className="flex flex-col">
                    <span className="text-3xl font-bold text-brand-dark">81</span>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Hizmet İli</span>
                </div>
             </div>
          </div>

          {/* --- RIGHT SIDE: INTERACTIVE CARD --- */}
          <div className="lg:col-span-5 w-full">
            <div className={`bg-white rounded-[2rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border border-gray-100 relative overflow-hidden transition-all duration-500 ease-out flex flex-col ${step === 0 ? 'min-h-[550px]' : 'min-h-[500px]'}`}>
               
               {/* STEP 0: SELECTION SCREEN */}
               {step === 0 && (
                 <div 
                    className={`p-6 flex flex-col h-full transition-all duration-300 ease-in-out transform ${
                        isExiting 
                        ? 'opacity-0 -translate-x-10 scale-95 blur-sm' // EXIT ANIMATION
                        : 'opacity-100 translate-x-0 scale-100 blur-0 animate-in fade-in zoom-in-95 duration-500' // ENTRY ANIMATION
                    }`}
                 >
                    <div className="mb-6 text-center">
                       <h3 className="text-2xl font-black text-brand-dark tracking-tight">Hoş Geldiniz</h3>
                       <p className="text-gray-400 text-sm mt-1">İşlem türünüzü seçerek hemen başlayın.</p>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                       
                       {/* Shipper Button */}
                       <button 
                          onClick={() => handleSelection('shipper')}
                          className="group relative w-full h-36 md:h-52 rounded-3xl overflow-hidden shadow-lg hover:shadow-brand-dark/30 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                       >
                          {/* Image Background */}
                          <img 
                            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80"
                            alt="Yüküm Var"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-950/90 to-blue-900/40 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Decorative Icon */}
                          <div className="absolute -right-8 -bottom-8 text-white opacity-5 transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                             <PackageCheck size={160} />
                          </div>

                          <div className="relative z-10 flex flex-col justify-center h-full px-8 text-left">
                             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm w-fit px-3 py-1 rounded-full text-[10px] font-bold text-blue-50 mb-2 border border-white/10 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse"></span>
                                HIZLI TEKLİF AL
                             </div>
                             <div className="flex items-center justify-between mt-1">
                                 <div>
                                     <span className="block text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-sm">YÜKÜM VAR</span>
                                     <span className="text-gray-200 text-sm font-medium mt-1 block max-w-[200px] leading-tight opacity-90">Uygun araç bul, yükünü güvenle taşıt.</span>
                                 </div>
                                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/10 group-hover:bg-white group-hover:text-brand-dark transition-all">
                                     <ArrowRight size={24} />
                                 </div>
                             </div>
                          </div>
                       </button>

                       {/* Carrier Button */}
                       <button 
                          onClick={() => handleSelection('carrier')}
                          className="group relative w-full h-36 md:h-52 rounded-3xl overflow-hidden shadow-lg hover:shadow-orange-900/30 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                       >
                          {/* Image Background */}
                          <img 
                            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80"
                            alt="Aracım Var"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-950 via-amber-900/90 to-amber-700/40 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Decorative Icon */}
                          <div className="absolute -right-8 -bottom-8 text-white opacity-5 transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
                             <Truck size={160} />
                          </div>

                          <div className="relative z-10 flex flex-col justify-center h-full px-8 text-left">
                             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm w-fit px-3 py-1 rounded-full text-[10px] font-bold text-orange-50 mb-2 border border-white/10 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-200 animate-pulse"></span>
                                KOMİSYONSUZ
                             </div>
                             <div className="flex items-center justify-between mt-1">
                                 <div>
                                     <span className="block text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-sm">ARACIM VAR</span>
                                     <span className="text-gray-200 text-sm font-medium mt-1 block max-w-[200px] leading-tight opacity-90">Yük bul, boş dönme, hemen kazan.</span>
                                 </div>
                                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/10 group-hover:bg-white group-hover:text-brand-orange transition-all">
                                     <ArrowRight size={24} />
                                 </div>
                             </div>
                          </div>
                       </button>

                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-[10px] uppercase font-bold tracking-wider opacity-60">
                       <CheckCircle2 size={12} className="text-gray-500" />
                       30 Saniyede Ücretsiz İşlem
                    </div>
                 </div>
               )}

               {/* STEP 1: FORM SCREEN (Staggered Animation) */}
               {step === 1 && (
                 <div className="flex flex-col h-full overflow-hidden">
                    
                    {/* Header - Stagger 1 */}
                    <div 
                        className="p-6 pb-2 flex items-center justify-between animate-[slideInRight_0.5s_ease-out_forwards] opacity-0"
                        style={{ animationDelay: '0ms' }}
                    >
                       <button 
                         onClick={handleBack}
                         className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-gray-800 transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-50 group"
                       >
                         <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Seçime Dön
                       </button>
                       <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-opacity-10 animate-in zoom-in duration-300 ${isShipper ? 'bg-brand-dark text-brand-dark' : 'bg-brand-orange text-brand-orange'}`}>
                         {isShipper ? 'Yük Veren' : 'Yük Taşıyan'}
                       </span>
                    </div>

                    {/* Content */}
                    <div className="px-6 md:px-8 py-2 flex-1 flex flex-col gap-6">
                       
                       {/* Categories Grid - Stagger 2 */}
                       <div className="animate-[slideInRight_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '100ms' }}>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                             {isShipper ? 'Ne Taşıyacağız?' : 'Araç Tipiniz'}
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                             {CATEGORIES.map((cat) => {
                                const isSelected = selectedCategory === cat.id;
                                return (
                                   <button
                                      key={cat.id}
                                      onClick={() => setSelectedCategory(cat.id)}
                                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200 h-[80px] ${
                                         isSelected 
                                           ? `${isShipper ? 'border-brand-dark bg-blue-50/50 text-brand-dark' : 'border-brand-orange bg-orange-50/50 text-brand-orange'} shadow-sm ring-1 ${isShipper ? 'ring-brand-dark' : 'ring-brand-orange'} scale-105` 
                                           : 'border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100 hover:scale-105'
                                      }`}
                                   >
                                      <cat.icon size={20} strokeWidth={isSelected ? 2.5 : 2} className="mb-1.5" />
                                      <span className="text-[9px] font-bold text-center leading-tight">{cat.label}</span>
                                   </button>
                                )
                             })}
                          </div>
                       </div>

                       {/* Inputs - Stagger 3 */}
                       <div className="relative animate-[slideInRight_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '200ms' }}>
                          {selectedCategory !== 'storage' && (
                             <div className="absolute left-[20px] top-[28px] bottom-[28px] w-[2px] border-l-2 border-dashed border-gray-200 z-0"></div>
                          )}

                          <div className={`space-y-3`}>
                             {/* From */}
                             <div className={`relative bg-gray-50 rounded-xl px-4 py-3 flex items-center transition-all ring-1 ring-transparent ${themeRing}`}>
                                <div className={`w-3 h-3 rounded-full shrink-0 mr-4 ring-2 ring-white shadow-sm ${isShipper ? 'bg-brand-accent' : 'bg-brand-orange'}`}></div>
                                <div className="flex-1">
                                   <label className="block text-[9px] font-bold text-gray-400 uppercase">Nereden</label>
                                   <input type="text" placeholder="İl, İlçe..." className="w-full bg-transparent text-sm font-bold text-gray-800 placeholder:text-gray-300 focus:outline-none" />
                                </div>
                             </div>

                             {/* To */}
                             {selectedCategory !== 'storage' && (
                                 <div className={`relative bg-gray-50 rounded-xl px-4 py-3 flex items-center transition-all ring-1 ring-transparent ${themeRing}`}>
                                    <div className="w-3 h-3 rounded-full bg-brand-dark shrink-0 mr-4 ring-2 ring-white shadow-sm"></div>
                                    <div className="flex-1">
                                       <label className="block text-[9px] font-bold text-gray-400 uppercase">Nereye</label>
                                       <input type="text" placeholder="İl, İlçe..." className="w-full bg-transparent text-sm font-bold text-gray-800 placeholder:text-gray-300 focus:outline-none" />
                                    </div>
                                 </div>
                             )}
                          </div>
                       </div>

                       {/* Action Button - Stagger 4 */}
                       <div className="mt-auto animate-[slideInUp_0.6s_ease-out_forwards] opacity-0" style={{ animationDelay: '300ms' }}>
                           <button className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-transform hover:-translate-y-0.5 active:scale-[0.98] ${themeBg}`}>
                              {isShipper ? 'Fiyat Hesapla' : 'Yükleri Gör'}
                              <ArrowRight size={20} />
                           </button>
                       </div>

                    </div>
                    
                    {/* Bottom Info - Stagger 5 */}
                    <div className="px-8 pb-6 pt-2 text-center animate-in fade-in duration-700 delay-500 fill-mode-backwards">
                       <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                          <Info size={12} />
                          <span>Devam ederek <a href="#" className="underline">Hizmet Şartları</a>'nı kabul edersiniz.</span>
                       </p>
                    </div>

                    {/* Custom Keyframes for Tailwind (Injecting style for cleaner component) */}
                    <style>{`
                        @keyframes slideInRight {
                            from { transform: translateX(50px); opacity: 0; }
                            to { transform: translateX(0); opacity: 1; }
                        }
                        @keyframes slideInUp {
                            from { transform: translateY(20px); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                    `}</style>

                 </div>
               )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Hero;