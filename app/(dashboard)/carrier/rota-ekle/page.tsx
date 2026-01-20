
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Truck, 
  Package,
  Clock,
  CheckCircle,
  Info,
  Route,
  Navigation,
  Plus,
  X,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Wallet,
  Settings2,
  Box,
  ThermometerSnowflake,
  ShieldAlert,
  Container,
  LayoutGrid,
  Scale
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

const MY_VEHICLES = [
  { id: 'v1', plate: '34 ABC 123', type: 'Tır', capacity: '25 Ton', brand: 'Mercedes Actros', available: true },
  { id: 'v2', plate: '34 DEF 456', type: 'Kamyon', capacity: '12 Ton', brand: 'Volvo FH', available: true },
  { id: 'v3', plate: '16 GHI 789', type: 'Panelvan', capacity: '3 Ton', brand: 'Ford Transit', available: false },
];

export default function RotaEklePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    originCity: '', originDistrict: '',
    destinationCity: '', destinationDistrict: '',
    stops: [] as string[],
    departureDate: '', departureTime: '',
    flexibleDate: false, flexibleDays: '1',
    selectedVehicle: '',
    availableCapacity: '', capacityUnit: 'ton',
    acceptedLoadTypes: [] as string[],
    minPrice: '', maxDistance: '',
    notes: '', autoAccept: false,
  });

  const [newStop, setNewStop] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleLoadTypeToggle = (type: string) => {
    const current = formData.acceptedLoadTypes;
    if (current.includes(type)) {
      setFormData({ ...formData, acceptedLoadTypes: current.filter(t => t !== type) });
    } else {
      setFormData({ ...formData, acceptedLoadTypes: [...current, type] });
    }
  };

  const addStop = () => {
    if (newStop && !formData.stops.includes(newStop)) {
      setFormData({ ...formData, stops: [...formData.stops, newStop] });
      setNewStop('');
    }
  };

  const removeStop = (city: string) => {
    setFormData({ ...formData, stops: formData.stops.filter(s => s !== city) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Rota İlanı:', formData);
    router.push('/carrier/rotalarim');
  };

  const selectedVehicle = MY_VEHICLES.find(v => v.id === formData.selectedVehicle);

  const steps = [
    { number: 1, title: 'Güzergah', icon: Route },
    { number: 2, title: 'Zaman & Araç', icon: Calendar },
    { number: 3, title: 'Tercihler', icon: Settings2 },
    { number: 4, title: 'Özet', icon: CheckCircle },
  ];

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
             <h1 className="text-xl font-black text-slate-900 tracking-tight">Yeni Rota Oluştur</h1>
             <p className="text-xs text-slate-500 font-medium">Yük bulmak için güzergahını belirle.</p>
           </div>
        </div>
        <div className="hidden sm:block">
           <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold px-3 py-1.5 rounded-full">
              Taslak Kaydedildi
           </span>
        </div>
      </header>

      <div className="p-4 lg:p-8 max-w-5xl mx-auto">
         
         {/* --- STEPPER --- */}
         <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex items-center justify-between min-w-[300px] relative px-4">
               {/* Line Background */}
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10"></div>
               {/* Active Line */}
               <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-orange rounded-full -z-10 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
               ></div>

               {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;

                  return (
                     <div key={step.number} className="flex flex-col items-center gap-2 bg-[#F8F9FC] px-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                           isActive ? 'bg-brand-orange border-brand-orange text-white scale-110 shadow-lg shadow-brand-orange/20' : 
                           isCompleted ? 'bg-green-500 border-green-500 text-white' : 
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
            
            {/* --- STEP CONTENT --- */}
            <div className="p-6 md:p-10 min-h-[400px]">
               
               {/* STEP 1: ROUTE */}
               {currentStep === 1 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
                     <div className="flex flex-col md:flex-row gap-6 relative">
                        {/* Visual Connector (Desktop) */}
                        <div className="hidden md:block absolute top-[42px] left-[50px] right-[50px] h-[2px] bg-gray-100 -z-0">
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-300">
                              <Truck size={16} />
                           </div>
                        </div>

                        {/* Origin */}
                        <div className="flex-1 relative z-10">
                           <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-brand-dark mb-4 shadow-sm mx-auto md:mx-0">
                              <Navigation size={24} />
                           </div>
                           <h3 className="text-lg font-black text-slate-900 mb-4 text-center md:text-left">Kalkış Noktası</h3>
                           <div className="space-y-3">
                              <div>
                                 <label className="text-xs font-bold text-gray-400 uppercase ml-1">İl Seçiniz</label>
                                 <select
                                    name="originCity"
                                    value={formData.originCity}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                                 >
                                    <option value="">İl Seçin...</option>
                                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                 </select>
                              </div>
                              <input
                                 type="text"
                                 name="originDistrict"
                                 placeholder="İlçe (Opsiyonel)"
                                 value={formData.originDistrict}
                                 onChange={handleChange}
                                 className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 focus:border-brand-orange outline-none transition-all text-sm placeholder:text-gray-400"
                              />
                           </div>
                        </div>

                        {/* Destination */}
                        <div className="flex-1 relative z-10">
                           <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center text-brand-orange mb-4 shadow-sm mx-auto md:mx-0">
                              <MapPin size={24} />
                           </div>
                           <h3 className="text-lg font-black text-slate-900 mb-4 text-center md:text-left">Varış Noktası</h3>
                           <div className="space-y-3">
                              <div>
                                 <label className="text-xs font-bold text-gray-400 uppercase ml-1">İl Seçiniz</label>
                                 <select
                                    name="destinationCity"
                                    value={formData.destinationCity}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                                 >
                                    <option value="">İl Seçin...</option>
                                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                 </select>
                              </div>
                              <input
                                 type="text"
                                 name="destinationDistrict"
                                 placeholder="İlçe (Opsiyonel)"
                                 value={formData.destinationDistrict}
                                 onChange={handleChange}
                                 className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 focus:border-brand-orange outline-none transition-all text-sm placeholder:text-gray-400"
                              />
                           </div>
                        </div>
                     </div>

                     {/* Stops */}
                     <div className="pt-6 border-t border-gray-100">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                           <Route size={16} className="text-gray-400" />
                           Ara Duraklar (Opsiyonel)
                        </label>
                        <div className="flex gap-2 mb-3">
                           <select
                              value={newStop}
                              onChange={(e) => setNewStop(e.target.value)}
                              className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 focus:border-brand-orange outline-none text-sm"
                           >
                              <option value="">Şehir Seçin</option>
                              {CITIES.filter(c => c !== formData.originCity && c !== formData.destinationCity && !formData.stops.includes(c))
                                 .map(c => <option key={c} value={c}>{c}</option>)}
                           </select>
                           <button
                              type="button"
                              onClick={addStop}
                              className="px-5 py-3 bg-brand-dark text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                           >
                              <Plus size={20} />
                           </button>
                        </div>
                        {formData.stops.length > 0 && (
                           <div className="flex flex-wrap gap-2">
                              {formData.stops.map((stop) => (
                                 <div key={stop} className="flex items-center gap-2 pl-3 pr-2 py-1.5 bg-gray-100 rounded-lg border border-gray-200">
                                    <span className="text-sm font-bold text-gray-700">{stop}</span>
                                    <button type="button" onClick={() => removeStop(stop)} className="p-1 hover:bg-gray-200 rounded-md text-gray-500">
                                       <X size={14} />
                                    </button>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
               )}

               {/* STEP 2: DATE & VEHICLE */}
               {currentStep === 2 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
                     
                     {/* Date Section */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-400 uppercase ml-1">Hareket Tarihi</label>
                           <div className="relative">
                              <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-orange" />
                              <input
                                 type="date"
                                 name="departureDate"
                                 value={formData.departureDate}
                                 onChange={handleChange}
                                 className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-800 focus:border-brand-orange outline-none transition-all"
                              />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-400 uppercase ml-1">Tahmini Saat</label>
                           <div className="relative">
                              <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                 type="time"
                                 name="departureTime"
                                 value={formData.departureTime}
                                 onChange={handleChange}
                                 className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-800 focus:border-brand-orange outline-none transition-all"
                              />
                           </div>
                        </div>
                     </div>

                     <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                        <input
                           type="checkbox"
                           name="flexibleDate"
                           id="flexibleDate"
                           checked={formData.flexibleDate}
                           onChange={handleChange}
                           className="w-5 h-5 rounded text-brand-orange focus:ring-brand-orange border-gray-300"
                        />
                        <label htmlFor="flexibleDate" className="flex-1 cursor-pointer">
                           <div className="text-sm font-bold text-brand-dark">Tarih Esnekliği Var</div>
                           <div className="text-xs text-blue-600/70">Belirtilen tarihin ±1-2 gün civarında yük alabilirim.</div>
                        </label>
                     </div>

                     {/* Vehicle Section */}
                     <div className="pt-4 border-t border-gray-100">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-4 block">Hangi Araçla Gidiyorsunuz?</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                           {MY_VEHICLES.map((vehicle) => (
                              <button
                                 key={vehicle.id}
                                 type="button"
                                 onClick={() => vehicle.available && setFormData({ ...formData, selectedVehicle: vehicle.id })}
                                 disabled={!vehicle.available}
                                 className={`relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                                    !vehicle.available 
                                       ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
                                       : formData.selectedVehicle === vehicle.id
                                          ? 'bg-orange-50/50 border-brand-orange ring-1 ring-brand-orange/20'
                                          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                 }`}
                              >
                                 <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    formData.selectedVehicle === vehicle.id ? 'bg-brand-orange text-white' : 'bg-gray-100 text-gray-500'
                                 }`}>
                                    <Truck size={24} />
                                 </div>
                                 <div className="flex-1">
                                    <div className="font-bold text-slate-900">{vehicle.plate}</div>
                                    <div className="text-xs text-gray-500 font-medium mt-0.5">{vehicle.brand}</div>
                                    <div className="text-xs font-bold text-gray-400 mt-2 bg-gray-100 inline-block px-2 py-0.5 rounded">
                                       {vehicle.capacity} • {vehicle.type}
                                    </div>
                                 </div>
                                 {formData.selectedVehicle === vehicle.id && (
                                    <div className="absolute top-4 right-4 text-brand-orange">
                                       <CheckCircle size={18} />
                                    </div>
                                 )}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               )}

               {/* STEP 3: PREFERENCES */}
               {currentStep === 3 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
                     
                     {/* Capacity */}
                     <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-3 block">Müsait Kapasite</label>
                        <div className="flex gap-0 bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange transition-all">
                           <div className="pl-4 py-3 flex items-center justify-center bg-gray-50 border-r border-gray-200">
                              <Scale size={20} className="text-gray-400" />
                           </div>
                           <input 
                              type="number"
                              name="availableCapacity"
                              value={formData.availableCapacity}
                              onChange={handleChange}
                              placeholder="Miktar"
                              className="flex-1 px-4 py-3 outline-none font-bold text-gray-900"
                           />
                           <select 
                              name="capacityUnit"
                              value={formData.capacityUnit}
                              onChange={handleChange}
                              className="bg-gray-50 border-l border-gray-200 px-4 py-3 font-bold text-gray-600 outline-none cursor-pointer hover:bg-gray-100"
                           >
                              <option value="ton">Ton</option>
                              <option value="kg">KG</option>
                              <option value="m3">m³</option>
                              <option value="palet">Palet</option>
                           </select>
                        </div>
                     </div>

                     {/* Load Types */}
                     <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-3 block">Kabul Edilen Yük Tipleri</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                           {LOAD_TYPES.map((type) => {
                              const isSelected = formData.acceptedLoadTypes.includes(type.value);
                              return (
                                 <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => handleLoadTypeToggle(type.value)}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2 ${
                                       isSelected 
                                          ? 'bg-brand-dark border-brand-dark text-white shadow-md' 
                                          : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                    }`}
                                 >
                                    <type.icon size={24} strokeWidth={1.5} />
                                    <span className="text-xs font-bold text-center">{type.label}</span>
                                 </button>
                              )
                           })}
                        </div>
                     </div>

                     {/* Price & Auto Accept */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                        <div>
                           <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-3 block">Min. Fiyat Beklentisi</label>
                           <div className="relative">
                              <Wallet size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />
                              <input 
                                 type="number"
                                 name="minPrice"
                                 value={formData.minPrice}
                                 onChange={handleChange}
                                 placeholder="Tutar (TL)"
                                 className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-900 focus:border-brand-orange outline-none"
                              />
                           </div>
                        </div>

                        <div className="bg-orange-50 rounded-xl p-4 flex items-start gap-3 border border-orange-100">
                           <input
                              type="checkbox"
                              name="autoAccept"
                              id="autoAccept"
                              checked={formData.autoAccept}
                              onChange={handleChange}
                              className="mt-1 w-5 h-5 rounded text-brand-orange focus:ring-brand-orange border-gray-300"
                           />
                           <label htmlFor="autoAccept" className="cursor-pointer">
                              <div className="text-sm font-bold text-brand-dark">Otomatik Kabul Et</div>
                              <p className="text-xs text-orange-800/70 mt-1 leading-relaxed">
                                 Kriterlerime uyan yükler için otomatik teklif verilsin. (Önerilen)
                              </p>
                           </label>
                        </div>
                     </div>
                  </div>
               )}

               {/* STEP 4: SUMMARY */}
               {currentStep === 4 && (
                  <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-300">
                     
                     {/* Summary Ticket */}
                     <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden relative">
                        {/* Cutouts */}
                        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#F8F9FC] rounded-full border border-gray-200 z-10"></div>
                        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#F8F9FC] rounded-full border border-gray-200 z-10"></div>
                        
                        <div className="p-8 pb-10 border-b-2 border-dashed border-gray-200 bg-gradient-to-br from-brand-dark to-slate-900 text-white relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                           
                           <div className="flex justify-between items-start mb-8 relative z-10">
                              <div>
                                 <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Kalkış</div>
                                 <div className="text-2xl font-black">{formData.originCity || '-'}</div>
                                 <div className="text-sm text-white/70">{formData.originDistrict}</div>
                              </div>
                              <div className="flex flex-col items-center px-4">
                                 <Truck size={24} className="text-brand-orange mb-2" />
                                 <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                    <div className="w-12 h-0.5 bg-white/20"></div>
                                    <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                 </div>
                                 <div className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded mt-2 text-white">
                                    {formData.stops.length} Durak
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Varış</div>
                                 <div className="text-2xl font-black">{formData.destinationCity || '-'}</div>
                                 <div className="text-sm text-white/70">{formData.destinationDistrict}</div>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                 <div className="text-[10px] text-white/50 uppercase font-bold mb-1">Tarih</div>
                                 <div className="font-bold">{formData.departureDate || '-'}</div>
                              </div>
                              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                 <div className="text-[10px] text-white/50 uppercase font-bold mb-1">Araç</div>
                                 <div className="font-bold">{selectedVehicle?.plate || '-'}</div>
                              </div>
                              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                 <div className="text-[10px] text-white/50 uppercase font-bold mb-1">Kapasite</div>
                                 <div className="font-bold">{formData.availableCapacity} {formData.capacityUnit}</div>
                              </div>
                              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                 <div className="text-[10px] text-white/50 uppercase font-bold mb-1">Min. Fiyat</div>
                                 <div className="font-bold text-brand-orange">{formData.minPrice ? `₺${formData.minPrice}` : '-'}</div>
                              </div>
                           </div>
                        </div>

                        <div className="p-8 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
                           <div className="text-sm text-gray-500 font-medium">
                              <span className="font-bold text-gray-900">Kabul Edilen Yükler:</span>{' '}
                              {formData.acceptedLoadTypes.length > 0 
                                 ? formData.acceptedLoadTypes.map(t => LOAD_TYPES.find(l => l.value === t)?.label).join(', ') 
                                 : 'Tümü'}
                           </div>
                           <div className="text-xs text-gray-400 font-mono">
                              REF: RT-{Math.floor(Math.random() * 10000)}
                           </div>
                        </div>
                     </div>

                     <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                        <AlertCircle size={20} className="text-brand-accent flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-900 leading-relaxed">
                           Rotanızı yayınladığınızda, kriterlerinize uyan yükler için otomatik bildirim alacaksınız. Yük verenler de profilinizi görüntüleyip size doğrudan teklif gönderebilecek.
                        </p>
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
                        : 'bg-brand-orange hover:bg-orange-600 shadow-brand-orange/20'
                  }`}
               >
                  {currentStep === 4 ? (
                     <>Rotayı Yayınla <CheckCircle size={18} /></>
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
