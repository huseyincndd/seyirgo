'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Truck, Package, MapPin, ArrowRight, Home, Car, Bike, Ship, Construction, Warehouse, 
  Circle, CheckCircle2, ChevronRight, PackageCheck, ArrowLeft, Info, Play, FileText
} from 'lucide-react';

type UserType = 'shipper' | 'carrier';
type CategoryId = '1A' | '1B' | '1C' | '1D' | '1E' | '1F' | '1G';

interface Category {
  id: CategoryId;
  code: string;
  shortLabel: string;
  shipperLabel: string;
  carrierLabel: string;
  shipperCode: string;
  carrierCode: string;
  icon: any;
}

// KARAYOLU KATEGORİLERİ
const CATEGORIES: Category[] = [
  { 
    id: '1A', 
    code: '1A/1AA',
    shortLabel: 'Karayolu',
    shipperLabel: 'Karayolu Yüküm Var / Karayolu Aracı Arıyorum',
    carrierLabel: 'Karayolu Aracım Var / Karayolu Yük Arıyorum',
    shipperCode: '1A',
    carrierCode: '1AA',
    icon: Truck 
  },
  { 
    id: '1B', 
    code: '1B/1BB',
    shortLabel: 'Ev/Ofis',
    shipperLabel: 'Ev / Ofis Eşyam Var / Araç Arıyorum',
    carrierLabel: 'Aracım Var / Ev-Ofis Eşyası Taşıyabilirim',
    shipperCode: '1B',
    carrierCode: '1BB',
    icon: Home 
  },
  { 
    id: '1C', 
    code: '1C/1CC',
    shortLabel: 'Araç Taşıma',
    shipperLabel: 'Taşınacak Küçük veya Büyük Aracım Var / Taşıyıcı (Çekici) Arıyorum',
    carrierLabel: 'Küçük ve Büyük Araçları Taşıyacak Aracım ve Çekicim Var / Taşınacak Araç Arıyorum',
    shipperCode: '1C',
    carrierCode: '1CC',
    icon: Car 
  },
  { 
    id: '1D', 
    code: '1D/1DD',
    shortLabel: 'Kurye',
    shipperLabel: 'Parsiyel Kargolanacak Evrak ve Eşyam Var / Kurye Firması Arıyorum',
    carrierLabel: 'Kurye Firmam Var / Parsiyel Evrak ve Eşya Taşıyabilirim',
    shipperCode: '1D',
    carrierCode: '1DD',
    icon: FileText 
  },
  { 
    id: '1E', 
    code: '1E/1EE',
    shortLabel: 'Intermodal',
    shipperLabel: 'Intermodal Yüküm Var (Kara-Deniz-Hava-Demiryolu) / Araç Arıyorum',
    carrierLabel: 'Intermodal Taşıma Yapıyorum (Kara-Deniz-Hava-Demiryolu) / Yük Arıyorum',
    shipperCode: '1E',
    carrierCode: '1EE',
    icon: Ship 
  },
  { 
    id: '1F', 
    code: '1F/1FF',
    shortLabel: 'Proje',
    shipperLabel: 'Proje Taşımacılığı Yüküm Var / Taşıyıcı Arıyorum',
    carrierLabel: 'Projeli Taşıma Yapabilirim / Yük Arıyorum',
    shipperCode: '1F',
    carrierCode: '1FF',
    icon: Construction 
  },
  { 
    id: '1G', 
    code: '1G/1GG',
    shortLabel: 'Depolama',
    shipperLabel: 'Depolanacak Eşyam Var / Antrepo veya Depo Arıyorum',
    carrierLabel: 'Antrepo ve Depom Var / Eşya Depolamak İsteyen Firma Arıyorum',
    shipperCode: '1G',
    carrierCode: '1GG',
    icon: Warehouse 
  },
];

const Hero: React.FC = () => {
  const [step, setStep] = useState<0 | 1>(0); // 0: Selection, 1: Form
  const [activeTab, setActiveTab] = useState<UserType>('shipper');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('1A');
  // Handle Initial Selection
  const handleSelection = (type: UserType) => {
      setActiveTab(type);
      setStep(1);
      
      // Mobilde seçim yapınca aşağıya kaydırma işlemi
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setTimeout(() => {
          const element = document.getElementById('categories-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
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
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-center lg:items-stretch w-full">
          
          {/* --- LEFT SIDE: TEXT CONTENT (Slogan) --- */}
          <div className={`flex flex-col justify-center space-y-6 lg:space-y-8 text-center lg:text-left transition-all duration-700 ease-in-out overflow-hidden ${
              step === 0 
                ? 'w-full lg:w-7/12 opacity-100 lg:pr-20' 
                : 'w-full lg:w-0 opacity-0 lg:p-0 h-0 lg:h-auto'
          }`}>
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm mx-auto lg:mx-0 whitespace-nowrap">
                <span className={`w-2 h-2 rounded-full animate-pulse bg-brand-accent`}></span>
                <span className="text-[11px] font-bold tracking-widest uppercase text-brand-dark">Lojistiğin Yeni Yüzyılı</span>
             </div>

             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-brand-dark whitespace-nowrap">
               Yükünüz İçin <br />
               <span className={`text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-light`}>
                 Akıllı Rota.
               </span>
             </h1>
             
             <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed min-w-[500px]">
               SeyirGo, yapay zeka destekli altyapısıyla yük verenleri ve taşıyıcıları saniyeler içinde buluşturur. 
               Endüstriyel taşımacılıktan bireysel lojistiğe, <span className="text-brand-dark font-bold underline decoration-brand-accent decoration-2 underline-offset-4">güvenle taşıyoruz.</span>
             </p>

             <div className="hidden md:flex items-center gap-8 pt-6 opacity-80 justify-center lg:justify-start min-w-[500px]">
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

          {/* --- MIDDLE: WELCOME BOX (Moves Left) --- */}
          <div className={`transition-all duration-700 ease-in-out flex flex-col justify-center ${
              step === 0 
                ? 'w-full lg:w-5/12'
                : 'w-full lg:w-3/12'
          }`}>
             <div className={`bg-white rounded-[2rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border border-gray-100 relative overflow-hidden flex flex-col h-[580px] transition-all duration-500`}>
                  <div className="p-6 flex flex-col h-full">
                    {/* Header showing current state when collapsed/selected */}

                    <div className={`mb-6 text-center transition-all duration-300 ${step === 1 ? 'scale-90 opacity-80' : ''}`}>
                       <h3 className="text-2xl font-black text-brand-dark tracking-tight">Hoş Geldiniz</h3>
                       <p className="text-gray-400 text-sm mt-1">İşlem türünüzü seçerek hemen başlayın.</p>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                       
                       {/* Shipper Button */}
                       <button 
                          onClick={() => handleSelection('shipper')}
                          className={`group relative w-full h-full rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${
                              step === 1 && activeTab !== 'shipper' ? 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0' : ''
                          } ${step === 1 && activeTab === 'shipper' ? 'ring-4 ring-brand-accent ring-offset-2' : ''}`}
                       >
                          <img 
                            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80"
                            alt="Yüküm Var"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-950/90 to-blue-900/40 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <div className={`relative z-10 flex flex-col justify-center h-full px-6 text-left ${step === 1 ? 'items-center text-center' : ''}`}>
                             <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm w-fit px-3 py-1 rounded-full text-[10px] font-bold text-blue-50 mb-2 border border-white/10 shadow-sm ${step === 1 ? 'hidden' : ''}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse"></span>
                                HIZLI TEKLİF AL
                             </div>
                             <div>
                                 <span className="block text-3xl md:text-3xl font-black text-white tracking-tight drop-shadow-sm">YÜKÜM VAR</span>
                                 <span className={`text-gray-200 text-xs font-medium mt-1 block leading-tight opacity-90 ${step === 1 ? 'hidden' : ''}`}>Uygun araç bul, yükünü güvenle taşıt.</span>
                             </div>
                          </div>
                       </button>

                       {/* Carrier Button */}
                       <button 
                          onClick={() => handleSelection('carrier')}
                          className={`group relative w-full h-full rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${
                              step === 1 && activeTab !== 'carrier' ? 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0' : ''
                          } ${step === 1 && activeTab === 'carrier' ? 'ring-4 ring-brand-orange ring-offset-2' : ''}`}
                       >
                          <img 
                            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80"
                            alt="Aracım Var"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-950 via-amber-900/90 to-amber-700/40 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <div className={`relative z-10 flex flex-col justify-center h-full px-6 text-left ${step === 1 ? 'items-center text-center' : ''}`}>
                             <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm w-fit px-3 py-1 rounded-full text-[10px] font-bold text-orange-50 mb-2 border border-white/10 shadow-sm ${step === 1 ? 'hidden' : ''}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-200 animate-pulse"></span>
                                KOMİSYONSUZ
                             </div>
                             <div>
                                 <span className="block text-3xl md:text-3xl font-black text-white tracking-tight drop-shadow-sm">ARACIM VAR</span>
                                 <span className={`text-gray-200 text-xs font-medium mt-1 block leading-tight opacity-90 ${step === 1 ? 'hidden' : ''}`}>Yük bul, boş dönme, hemen kazan.</span>
                             </div>
                          </div>
                       </button>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-[10px] uppercase font-bold tracking-wider opacity-60">
                       <CheckCircle2 size={12} className="text-gray-500" />
                       30 Saniyede Ücretsiz İşlem
                    </div>
                 </div>
             </div>
          </div>

          {/* --- RIGHT SIDE: CATEGORIES / FORM (Expands) --- */}
          {step === 1 && (
            <div id="categories-section" className={`flex flex-col justify-center transition-all duration-700 ease-in-out lg:pl-8 animate-[slideInRight_0.4s_ease-out_forwards] ${
               step === 1 ? 'w-full lg:w-9/12 opacity-100 mt-4 lg:mt-0' : 'w-0 opacity-0 overflow-hidden'
            }`}>
                 <div className="bg-white rounded-[2rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col h-[70vh] min-h-[500px] lg:h-[580px] w-full relative">
                     
                     {/* Header */}
                     <div className="p-5 lg:p-6 flex items-center justify-between border-b border-gray-50 bg-white z-10 flex-none shrink-0">
                        <button 
                          onClick={handleBack}
                          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-dark transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-50 group"
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-200">
                             <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> 
                          </div>
                          <span>Seçime Dön</span>
                        </button>
                        <span className={`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-opacity-10 animate-in zoom-in duration-300 ${isShipper ? 'bg-brand-dark text-brand-dark' : 'bg-brand-orange text-brand-orange'}`}>
                          {isShipper ? 'Yük Veren' : 'Yük Taşıyan'}
                        </span>
                     </div>

                     {/* Scrollable Content */}
                     <div className="flex-1 overflow-y-auto custom-scrollbar p-5 lg:p-8 flex flex-col bg-gray-50/30">
                        <div className="flex-1 flex flex-col gap-6 lg:gap-8 pb-4">
                           
                           {/* STEP Title */}
                           <div>
                              <h2 className="text-2xl font-bold text-gray-800 mb-2">Kategorinizi Seçin</h2>
                              <p className="text-gray-500 text-sm">Size en uygun taşıma tipini belirleyin.</p>
                           </div>

                           {/* Categories Grid - Adjusted to show all */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
                              {CATEGORIES.map((cat, index) => {
                                 const isSelected = selectedCategory === cat.id;
                                 const categoryCode = isShipper ? cat.shipperCode : cat.carrierCode;
                                 const categoryLabel = isShipper ? cat.shipperLabel : cat.carrierLabel;
                                 return (
                                    <button
                                       key={cat.id}
                                       onClick={() => setSelectedCategory(cat.id)}
                                       className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200 group hover:shadow-md ${
                                          isSelected 
                                            ? `${isShipper ? 'border-brand-dark bg-blue-50/50 ring-1 ring-brand-dark' : 'border-brand-orange bg-orange-50/50 ring-1 ring-brand-orange'} shadow-sm` 
                                            : 'border-gray-100 bg-white hover:border-gray-300'
                                       }`}
                                       style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                       <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                          isSelected
                                            ? (isShipper ? 'bg-brand-dark text-white' : 'bg-brand-orange text-white')
                                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                       }`}>
                                          <cat.icon size={18} />
                                       </div>
                                       <div>
                                          <span className={`block text-xs font-bold mb-1 opacity-70 ${isSelected ? (isShipper ? 'text-brand-dark' : 'text-brand-orange') : 'text-gray-400'}`}>
                                             {categoryCode}
                                          </span>
                                          <span className={`text-sm font-semibold leading-tight block ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                                             {categoryLabel}
                                          </span>
                                       </div>
                                    </button>
                                 )
                              })}
                           </div>
                        </div>
                     </div>
                     
                     {/* Action Button - Sticky Bottom */}
                     <div className="p-5 lg:p-6 border-t border-gray-100 bg-white z-20 flex-none shrink-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                        <div className={`animate-in slide-in-from-bottom-4 duration-500`}>
                          <Link href="/giris" className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-transform hover:-translate-y-0.5 active:scale-[0.98] ${themeBg}`}>
                              Devam Et
                              <ArrowRight size={20} />
                          </Link>
                        </div>
                     </div>
                 </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Hero;