
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight,
  Package, 
  MapPin, 
  Calendar, 
  Truck, 
  Scale,
  FileText,
  DollarSign,
  CheckCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  Settings2,
  Box,
  LayoutGrid,
  Container,
  ShieldAlert,
  ThermometerSnowflake,
  Navigation
} from 'lucide-react';

// --- MOCK DATA ---
const CITIES = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 
  'Gaziantep', 'Mersin', 'Kayseri', 'Eskişehir', 'Kocaeli', 'Samsun', 
  'Denizli', 'Trabzon', 'Diyarbakır', 'Erzurum', 'Malatya', 'Şanlıurfa',
  'Van', 'Batman', 'Mardin', 'Elazığ', 'Manisa', 'Balıkesir', 'Aydın'
];

const LOAD_TYPES = [
  { value: 'palet', label: 'Paletli Yük', icon: Box },
  { value: 'dokme', label: 'Dökme Yük', icon: LayoutGrid },
  { value: 'parsiyel', label: 'Parsiyel', icon: Package },
  { value: 'komple', label: 'Komple', icon: Truck },
  { value: 'konteyner', label: 'Konteyner', icon: Container },
  { value: 'tehlikeli', label: 'Tehlikeli (ADR)', icon: ShieldAlert },
  { value: 'soguk', label: 'Soğuk Zincir', icon: ThermometerSnowflake },
];

const VEHICLE_TYPES = [
  { value: 'tir', label: 'Tır', sub: '25+ Ton' },
  { value: 'kamyon', label: 'Kamyon', sub: '10-25 Ton' },
  { value: 'kamyonet', label: 'Kamyonet', sub: '3-10 Ton' },
  { value: 'panelvan', label: 'Panelvan', sub: '1-3 Ton' },
  { value: 'frigo', label: 'Frigorifik', sub: 'Soğutuculu' },
  { value: 'tenteli', label: 'Tenteli', sub: 'Standart' },
];

export default function YeniIlanPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    // Step 1: Load Info
    title: '',
    description: '',
    loadType: '',
    weight: '',
    weightUnit: 'ton',
    volume: '',
    
    // Step 2: Route Info
    originCity: '',
    originDistrict: '',
    originAddress: '',
    destinationCity: '',
    destinationDistrict: '',
    destinationAddress: '',
    
    // Step 3: Transport Info
    vehicleType: '',
    loadDate: '',
    deliveryDate: '',
    isFlexible: false,
    
    // Step 4: Price & Notes
    price: '',
    priceType: 'fixed', // fixed, negotiable
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Yeni ilan:', formData);
    router.push('/shipper/yukler');
  };

  const steps = [
    { number: 1, title: 'Yük Bilgileri', icon: Package },
    { number: 2, title: 'Rota Bilgileri', icon: MapPin },
    { number: 3, title: 'Araç & Tarih', icon: Calendar },
    { number: 4, title: 'Fiyat & Onay', icon: CheckCircle },
  ];

  const inputClass = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/10 font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-medium";
  const labelClass = "text-xs font-bold text-gray-400 uppercase ml-1 mb-2 block";

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
           <button 
             onClick={() => router.back()}
             className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
           >
             <ArrowLeft size={20} />
           </button>
           <div>
             <h1 className="text-xl font-black text-slate-900 tracking-tight">Yeni Yük İlanı</h1>
             <p className="text-xs text-slate-500 font-medium">Yük bilgilerini gir, taşıyıcılar seni bulsun.</p>
           </div>
        </div>
        <div className="hidden sm:block">
           <span className="bg-brand-dark/10 text-brand-dark text-xs font-bold px-3 py-1.5 rounded-full">
              Taslak Kaydediliyor...
           </span>
        </div>
      </header>

      <div className="p-4 lg:p-8 max-w-5xl mx-auto">
         
         {/* --- STEPPER --- */}
         <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex items-center justify-between min-w-[300px] relative px-4">
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10"></div>
               <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-dark rounded-full -z-10 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
               ></div>

               {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;

                  return (
                     <div key={step.number} className="flex flex-col items-center gap-2 bg-[#F8F9FC] px-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                           isActive ? 'bg-brand-dark border-brand-dark text-white scale-110 shadow-lg shadow-brand-dark/20' : 
                           isCompleted ? 'bg-green-600 border-green-600 text-white' : 
                           'bg-white border-gray-300 text-gray-400'
                        }`}>
                           {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-brand-dark' : 'text-gray-400'}`}>
                           {step.title}
                        </span>
                     </div>
                  )
               })}
            </div>
         </div>

         <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            
            <div className="p-6 md:p-10 min-h-[400px]">
               
               {/* STEP 1: LOAD INFO */}
               {currentStep === 1 && (
                  <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className={labelClass}>Yük Başlığı</label>
                           <input
                              type="text"
                              name="title"
                              placeholder="Örn: 12 Palet Tekstil"
                              value={formData.title}
                              onChange={handleChange}
                              className={inputClass}
                              required
                           />
                        </div>
                        <div>
                           <label className={labelClass}>Yük Tipi</label>
                           <select
                              name="loadType"
                              value={formData.loadType}
                              onChange={handleChange}
                              className={`${inputClass} appearance-none`}
                              required
                           >
                              <option value="">Seçiniz</option>
                              {LOAD_TYPES.map(type => (
                                 <option key={type.value} value={type.value}>{type.label}</option>
                              ))}
                           </select>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                           <label className={labelClass}>Ağırlık</label>
                           <div className="flex gap-2">
                              <input
                                 type="number"
                                 name="weight"
                                 placeholder="Miktar"
                                 value={formData.weight}
                                 onChange={handleChange}
                                 className={inputClass}
                                 required
                              />
                              <select
                                 name="weightUnit"
                                 value={formData.weightUnit}
                                 onChange={handleChange}
                                 className="px-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-700 outline-none"
                              >
                                 <option value="kg">KG</option>
                                 <option value="ton">Ton</option>
                              </select>
                           </div>
                        </div>
                        <div>
                           <label className={labelClass}>Hacim (Opsiyonel)</label>
                           <input
                              type="text"
                              name="volume"
                              placeholder="Örn: 24 m³"
                              value={formData.volume}
                              onChange={handleChange}
                              className={inputClass}
                           />
                        </div>
                     </div>

                     <div>
                        <label className={labelClass}>Açıklama / Notlar</label>
                        <textarea
                           name="description"
                           placeholder="Yükün içeriği, paketleme şekli veya dikkat edilmesi gerekenler..."
                           value={formData.description}
                           onChange={handleChange}
                           rows={4}
                           className={`${inputClass} resize-none`}
                        />
                     </div>
                  </div>
               )}

               {/* STEP 2: ROUTE INFO */}
               {currentStep === 2 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
                     <div className="flex flex-col md:flex-row gap-8 relative">
                        {/* Connector Line */}
                        <div className="hidden md:block absolute top-[40px] left-[50px] right-[50px] h-[2px] bg-gray-100 z-0">
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-gray-300">
                              <ArrowRight size={20} />
                           </div>
                        </div>

                        {/* Origin */}
                        <div className="flex-1 relative z-10">
                           <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-brand-dark mb-4 shadow-sm mx-auto md:mx-0">
                              <Navigation size={24} />
                           </div>
                           <h3 className="text-lg font-black text-slate-900 mb-4 text-center md:text-left">Yükleme Noktası</h3>
                           <div className="space-y-4">
                              <div>
                                 <label className={labelClass}>İl</label>
                                 <select
                                    name="originCity"
                                    value={formData.originCity}
                                    onChange={handleChange}
                                    className={`${inputClass} appearance-none`}
                                 >
                                    <option value="">İl Seçin...</option>
                                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                 </select>
                              </div>
                              <input
                                 type="text"
                                 name="originDistrict"
                                 placeholder="İlçe"
                                 value={formData.originDistrict}
                                 onChange={handleChange}
                                 className={inputClass}
                              />
                              <textarea
                                 name="originAddress"
                                 placeholder="Tam Adres (Opsiyonel)"
                                 value={formData.originAddress}
                                 onChange={handleChange}
                                 rows={2}
                                 className={`${inputClass} resize-none text-sm font-normal`}
                              />
                           </div>
                        </div>

                        {/* Destination */}
                        <div className="flex-1 relative z-10">
                           <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center text-brand-orange mb-4 shadow-sm mx-auto md:mx-0">
                              <MapPin size={24} />
                           </div>
                           <h3 className="text-lg font-black text-slate-900 mb-4 text-center md:text-left">Teslimat Noktası</h3>
                           <div className="space-y-4">
                              <div>
                                 <label className={labelClass}>İl</label>
                                 <select
                                    name="destinationCity"
                                    value={formData.destinationCity}
                                    onChange={handleChange}
                                    className={`${inputClass} appearance-none`}
                                 >
                                    <option value="">İl Seçin...</option>
                                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                 </select>
                              </div>
                              <input
                                 type="text"
                                 name="destinationDistrict"
                                 placeholder="İlçe"
                                 value={formData.destinationDistrict}
                                 onChange={handleChange}
                                 className={inputClass}
                              />
                              <textarea
                                 name="destinationAddress"
                                 placeholder="Tam Adres (Opsiyonel)"
                                 value={formData.destinationAddress}
                                 onChange={handleChange}
                                 rows={2}
                                 className={`${inputClass} resize-none text-sm font-normal`}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* STEP 3: TRANSPORT & DATE */}
               {currentStep === 3 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
                     
                     {/* Vehicle Selection */}
                     <div>
                        <label className={labelClass}>İstenen Araç Tipi</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                           {VEHICLE_TYPES.map(type => (
                              <button
                                 type="button"
                                 key={type.value}
                                 onClick={() => handleSelectChange('vehicleType', type.value)}
                                 className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-1 ${
                                    formData.vehicleType === type.value
                                       ? 'bg-brand-dark border-brand-dark text-white shadow-md' 
                                       : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                                 }`}
                              >
                                 <Truck size={24} className={formData.vehicleType === type.value ? 'text-brand-orange' : 'text-gray-400'} />
                                 <span className="text-sm font-bold">{type.label}</span>
                                 <span className={`text-[10px] font-medium ${formData.vehicleType === type.value ? 'text-gray-300' : 'text-gray-400'}`}>{type.sub}</span>
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Dates */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                        <div>
                           <label className={labelClass}>Yükleme Tarihi</label>
                           <input
                              type="date"
                              name="loadDate"
                              value={formData.loadDate}
                              onChange={handleChange}
                              className={inputClass}
                           />
                        </div>
                        <div>
                           <label className={labelClass}>Teslim Tarihi</label>
                           <input
                              type="date"
                              name="deliveryDate"
                              value={formData.deliveryDate}
                              onChange={handleChange}
                              className={inputClass}
                           />
                        </div>
                     </div>

                     <label className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl cursor-pointer border border-blue-100">
                        <input
                           type="checkbox"
                           name="isFlexible"
                           checked={formData.isFlexible}
                           onChange={handleChange}
                           className="w-5 h-5 rounded border-gray-300 text-brand-dark focus:ring-brand-dark"
                        />
                        <div>
                           <span className="font-bold text-brand-dark text-sm">Tarih Esnekliği</span>
                           <p className="text-xs text-blue-700/70 mt-0.5">Tarihlerde ±1-2 gün esneklik sağlayabilirim, daha uygun fiyatlı teklifleri görebilirim.</p>
                        </div>
                     </label>
                  </div>
               )}

               {/* STEP 4: PRICE & CONFIRM */}
               {currentStep === 4 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
                     
                     <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <label className={labelClass}>Fiyatlandırma Tercihi</label>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                           <label className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              formData.priceType === 'fixed' ? 'bg-white border-brand-dark shadow-sm ring-1 ring-brand-dark/10' : 'bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200'
                           }`}>
                              <input
                                 type="radio"
                                 name="priceType"
                                 value="fixed"
                                 checked={formData.priceType === 'fixed'}
                                 onChange={handleChange}
                                 className="sr-only"
                              />
                              <DollarSign size={20} />
                              <span className="font-bold text-sm">Sabit Fiyat</span>
                           </label>
                           <label className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              formData.priceType === 'negotiable' ? 'bg-white border-brand-dark shadow-sm ring-1 ring-brand-dark/10' : 'bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200'
                           }`}>
                              <input
                                 type="radio"
                                 name="priceType"
                                 value="negotiable"
                                 checked={formData.priceType === 'negotiable'}
                                 onChange={handleChange}
                                 className="sr-only"
                              />
                              <Settings2 size={20} />
                              <span className="font-bold text-sm">Teklif Usulü</span>
                           </label>
                        </div>

                        {formData.priceType === 'fixed' && (
                           <div className="relative animate-in fade-in slide-in-from-top-2">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-black text-lg">₺</span>
                              <input
                                 type="number"
                                 name="price"
                                 placeholder="Hedef Fiyatınız"
                                 value={formData.price}
                                 onChange={handleChange}
                                 className={`${inputClass} pl-10 text-lg`}
                              />
                           </div>
                        )}
                     </div>

                     {/* Summary Card */}
                     <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 relative bg-white">
                        <div className="absolute -top-3 left-6 bg-white px-2 text-xs font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1">
                           <Info size={14} /> İlan Özeti
                        </div>
                        
                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <div className="text-xl font-black text-slate-900">{formData.title || '(Başlık Girilmedi)'}</div>
                              <div className="text-sm text-gray-500 font-medium mt-1">
                                 {formData.originCity || '?'} <span className="text-gray-300 mx-1">→</span> {formData.destinationCity || '?'}
                              </div>
                           </div>
                           <div className="bg-blue-50 text-brand-dark px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100">
                              {VEHICLE_TYPES.find(v => v.value === formData.vehicleType)?.label || 'Araç Seçilmedi'}
                           </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                           <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-[10px] text-gray-400 font-bold uppercase">Yükleme</div>
                              <div className="font-bold text-gray-800">{formData.loadDate || '-'}</div>
                           </div>
                           <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-[10px] text-gray-400 font-bold uppercase">Ağırlık</div>
                              <div className="font-bold text-gray-800">{formData.weight ? `${formData.weight} ${formData.weightUnit}` : '-'}</div>
                           </div>
                           <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-[10px] text-gray-400 font-bold uppercase">Yük Tipi</div>
                              <div className="font-bold text-gray-800">{LOAD_TYPES.find(l => l.value === formData.loadType)?.label || '-'}</div>
                           </div>
                        </div>
                     </div>

                  </div>
               )}

            </div>

            {/* --- FOOTER ACTIONS --- */}
            <div className="bg-gray-50 px-6 py-5 border-t border-gray-200 flex justify-between items-center">
               {currentStep > 1 ? (
                  <button
                     type="button"
                     onClick={() => setCurrentStep(prev => prev - 1)}
                     className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                     <ChevronLeft size={18} /> Geri
                  </button>
               ) : (
                  <div></div>
               )}

               <button
                  type={currentStep === 4 ? 'submit' : 'button'}
                  onClick={() => currentStep < 4 && setCurrentStep(prev => prev + 1)}
                  className={`px-8 py-3 rounded-xl text-white font-bold shadow-lg transition-all transform active:scale-[0.98] flex items-center gap-2 ${
                     currentStep === 4 
                        ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' 
                        : 'bg-brand-dark hover:bg-slate-800 shadow-brand-dark/20'
                  }`}
               >
                  {currentStep === 4 ? (
                     <>İlanı Yayınla <CheckCircle size={18} /></>
                  ) : (
                     <>Devam Et <ChevronRight size={18} /></>
                  )}
               </button>
            </div>

         </form>
      </div>
    </div>
  );
}
