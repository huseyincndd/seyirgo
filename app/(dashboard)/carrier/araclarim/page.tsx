
'use client';
import React, { useState } from 'react';
import { 
  Truck, 
  Plus, 
  Edit2, 
  Trash2, 
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Wrench,
  FileText,
  Camera,
  X,
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  Info,
  Box,
  Scale,
  ArrowRight
} from 'lucide-react';

// --- VISUAL ASSETS (CUSTOM SVGS) ---
const VehicleVisual = ({ type, className = "w-full h-full" }: { type: string, className?: string }) => {
  const colorClass = "fill-current"; // Uses text color of parent
  
  switch(type) {
    case 'tir': // Semi-Trailer
      return (
        <svg viewBox="0 0 200 80" className={className} xmlns="http://www.w3.org/2000/svg">
           {/* Trailer */}
           <path d="M50 10 H190 V55 H50 V10 Z" className="fill-gray-200" />
           <rect x="50" y="10" width="140" height="45" rx="2" className={colorClass} fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
           <line x1="140" y1="55" x2="140" y2="70" stroke="currentColor" strokeWidth="2" />
           <line x1="155" y1="55" x2="155" y2="70" stroke="currentColor" strokeWidth="2" />
           <line x1="170" y1="55" x2="170" y2="70" stroke="currentColor" strokeWidth="2" />
           <circle cx="140" cy="70" r="6" className={colorClass} />
           <circle cx="155" cy="70" r="6" className={colorClass} />
           <circle cx="170" cy="70" r="6" className={colorClass} />
           {/* Cab */}
           <path d="M10 55 H45 V25 L35 25 L30 35 H10 V55 Z" className={colorClass} fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
           <circle cx="20" cy="70" r="6" className={colorClass} />
           <circle cx="38" cy="70" r="6" className={colorClass} />
           <line x1="45" y1="45" x2="50" y2="45" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case 'kirkayak': // 8x2 Rigid
      return (
        <svg viewBox="0 0 200 80" className={className} xmlns="http://www.w3.org/2000/svg">
           {/* Body */}
           <path d="M45 15 H190 V55 H45 V15 Z" className={colorClass} fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
           {/* Cab */}
           <path d="M10 55 H45 V15 L35 15 L10 55 Z" className={colorClass} fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
           <path d="M10 55 H45 V25 L35 25 L30 35 H10 V55 Z" className={colorClass} fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
           
           {/* Wheels */}
           <circle cx="20" cy="70" r="6" className={colorClass} />
           <circle cx="35" cy="70" r="6" className={colorClass} />
           <circle cx="155" cy="70" r="6" className={colorClass} />
           <circle cx="175" cy="70" r="6" className={colorClass} />
        </svg>
      );
    case 'onteker': // 6x2 Rigid
      return (
        <svg viewBox="0 0 200 80" className={className} xmlns="http://www.w3.org/2000/svg">
           {/* Body */}
           <rect x="50" y="20" width="120" height="35" rx="1" className={colorClass} fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
           {/* Cab */}
           <path d="M15 55 H50 V20 L40 20 L35 30 H15 V55 Z" className={colorClass} fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
           {/* Wheels */}
           <circle cx="30" cy="70" r="6" className={colorClass} />
           <circle cx="140" cy="70" r="6" className={colorClass} />
           <circle cx="155" cy="70" r="6" className={colorClass} />
        </svg>
      );
    case 'kamyonet': // Light Truck
      return (
        <svg viewBox="0 0 200 80" className={className} xmlns="http://www.w3.org/2000/svg">
           {/* Body */}
           <rect x="60" y="25" width="100" height="30" rx="1" className={colorClass} fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
           {/* Cab */}
           <path d="M30 55 H60 V25 L50 25 L40 35 H30 V55 Z" className={colorClass} fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
           {/* Wheels */}
           <circle cx="45" cy="68" r="5" className={colorClass} />
           <circle cx="140" cy="68" r="5" className={colorClass} />
        </svg>
      );
    case 'panelvan': // Van
      return (
         <svg viewBox="0 0 200 80" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M40 60 H160 V25 H60 L40 45 V60 Z" className={colorClass} fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
            <line x1="60" y1="25" x2="60" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2"/>
            <circle cx="60" cy="68" r="5" className={colorClass} />
            <circle cx="140" cy="68" r="5" className={colorClass} />
         </svg>
      );
    default:
      return <Truck />;
  }
};

// --- MOCK DATA ---

const MY_VEHICLES = [
  {
    id: 'ARC-001',
    plate: '34 ABC 123',
    type: 'Tır',
    brand: 'Mercedes-Benz Actros',
    year: 2021,
    capacity: 25,
    capacityUnit: 'ton',
    status: 'active',
    currentLoad: 'YK-2024-102 - Elektronik Malzeme',
    documents: {
      insurance: { valid: true, expiresAt: '15 Haziran 2026' },
      inspection: { valid: true, expiresAt: '20 Mart 2026' },
      license: { valid: true, expiresAt: '10 Aralık 2026' },
    },
  },
  {
    id: 'ARC-002',
    plate: '34 DEF 456',
    type: 'Kamyon',
    brand: 'Volvo FH',
    year: 2020,
    capacity: 12,
    capacityUnit: 'ton',
    status: 'available',
    currentLoad: null,
    documents: {
      insurance: { valid: true, expiresAt: '22 Şubat 2026' },
      inspection: { valid: false, expiresAt: '5 Ocak 2026' },
      license: { valid: true, expiresAt: '18 Temmuz 2026' },
    },
  },
];

const VEHICLE_TYPES = [
  { 
     id: 'tir', 
     label: 'Tır (Semi-Treyler)', 
     desc: 'Uluslararası standart', 
     dims: { l: '13.60m', w: '2.45m', h: '2.70m' }, 
     maxWeight: 27000,
     axles: '5 Aks'
  },
  { 
     id: 'kirkayak', 
     label: 'Kırkayak (8x2)', 
     desc: 'Yüksek tonajlı rijit', 
     dims: { l: '8.20m', w: '2.45m', h: '2.60m' }, 
     maxWeight: 21000,
     axles: '4 Aks'
  },
  { 
     id: 'onteker', 
     label: 'On Teker (6x2)', 
     desc: 'Orta mesafe taşımacılık', 
     dims: { l: '7.20m', w: '2.45m', h: '2.50m' }, 
     maxWeight: 15000,
     axles: '3 Aks' 
  },
  { 
     id: 'kamyonet', 
     label: 'Kamyonet', 
     desc: 'Şehir içi dağıtım', 
     dims: { l: '4.50m', w: '2.20m', h: '2.20m' }, 
     maxWeight: 3500,
     axles: '2 Aks'
  },
  { 
     id: 'panelvan', 
     label: 'Panelvan', 
     desc: 'Hızlı kargo / parsiyel', 
     dims: { l: '3.50m', w: '1.80m', h: '1.90m' }, 
     maxWeight: 1500,
     axles: '2 Aks'
  },
];

const BODY_TYPES = [
  { id: 'tenteli', label: 'Tenteli' },
  { id: 'acik', label: 'Açık Kasa' },
  { id: 'frigo', label: 'Frigo (Soğutuculu)' },
  { id: 'damperli', label: 'Damperli' },
  { id: 'konteyner', label: 'Konteyner Taşıyıcı' },
];

const statusConfig = {
  active: { label: 'Yolda / Aktif', color: 'bg-green-100 text-green-700 border-green-200', icon: Truck },
  available: { label: 'Müsait', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle },
  maintenance: { label: 'Bakımda', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Wrench },
};

export default function AraclarimPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
  // Modal Form State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    plate: '', brand: '', year: '',
    type: '', bodyType: '', capacity: '',
    docInsurance: '', docInspection: ''
  });

  const activeCount = MY_VEHICLES.filter(v => v.status === 'active').length;
  const availableCount = MY_VEHICLES.filter(v => v.status === 'available').length;
  const selectedVehicleType = VEHICLE_TYPES.find(v => v.id === formData.type);

  // Form Handlers
  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
  const resetForm = () => {
    setStep(1);
    setFormData({ plate: '', brand: '', year: '', type: '', bodyType: '', capacity: '', docInsurance: '', docInspection: '' });
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 lg:py-5 flex items-center justify-between">
        <div>
           <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Araçlarım</h1>
           <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">Filonuzdaki araçları yönetin ve belge durumlarını takip edin.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 transform active:scale-[0.98]"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span className="hidden sm:inline">Yeni Araç Ekle</span>
        </button>
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">

        {/* --- STATS & FILTERS --- */}
        <div className="flex flex-col md:flex-row gap-4">
           {/* Stats */}
           <div className="grid grid-cols-3 gap-4 flex-grow">
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-4">
                 <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                    <Truck size={20} />
                 </div>
                 <div>
                    <div className="text-2xl font-black text-slate-900 leading-none">{activeCount}</div>
                    <div className="text-xs font-bold text-gray-400 mt-1 uppercase">Aktif</div>
                 </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-4">
                 <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <CheckCircle size={20} />
                 </div>
                 <div>
                    <div className="text-2xl font-black text-slate-900 leading-none">{availableCount}</div>
                    <div className="text-xs font-bold text-gray-400 mt-1 uppercase">Müsait</div>
                 </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-4">
                 <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600">
                    <Truck size={20} />
                 </div>
                 <div>
                    <div className="text-2xl font-black text-slate-900 leading-none">{MY_VEHICLES.length}</div>
                    <div className="text-xs font-bold text-gray-400 mt-1 uppercase">Toplam</div>
                 </div>
              </div>
           </div>
           
           {/* Search */}
           <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                 <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                    type="text" 
                    placeholder="Plaka ara..." 
                    className="w-full h-full pl-10 pr-4 bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-orange"
                 />
              </div>
              <button className="h-full aspect-square bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-brand-dark transition-colors">
                 <Filter size={18} />
              </button>
           </div>
        </div>

        {/* --- VEHICLES GRID --- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {MY_VEHICLES.map((vehicle) => {
            const status = statusConfig[vehicle.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const hasDocumentIssue = !vehicle.documents.insurance.valid || 
                                     !vehicle.documents.inspection.valid || 
                                     !vehicle.documents.license.valid;

            return (
              <div key={vehicle.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
                <div className="p-6">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-brand-orange group-hover:bg-orange-50 transition-colors p-2">
                         {/* Dynamic Icon based on type (simplified for list) */}
                         <VehicleVisual type={vehicle.type === 'Tır' ? 'tir' : vehicle.type === 'Kamyon' ? 'onteker' : 'panelvan'} className="w-full h-full" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-black text-slate-900 text-xl tracking-tight">{vehicle.plate}</h3>
                          {hasDocumentIssue && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-bold border border-red-100">
                               <AlertCircle size={12} /> Sorun Var
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-bold text-gray-700">{vehicle.brand}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{vehicle.type} • {vehicle.year} Model • {vehicle.capacity} {vehicle.capacityUnit}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <button onClick={() => setOpenMenuId(openMenuId === vehicle.id ? null : vehicle.id)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical size={20} />
                      </button>
                      {openMenuId === vehicle.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-10">
                          <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Edit2 size={14} /> Düzenle</button>
                          <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 size={14} /> Sil</button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status & Alerts */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${status.color}`}>
                      <StatusIcon size={14} /> {status.label}
                    </span>
                  </div>
                  {vehicle.status === 'active' && vehicle.currentLoad && (
                    <div className="mb-6 p-4 bg-green-50/50 rounded-xl border border-green-100 flex items-start gap-3">
                       <div className="p-1.5 bg-green-100 rounded-full text-green-600 mt-0.5"><Truck size={14} /></div>
                       <div>
                          <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-0.5">Mevcut Taşıma</p>
                          <p className="text-sm font-bold text-green-900">{vehicle.currentLoad}</p>
                       </div>
                    </div>
                  )}

                  {/* Document Summary */}
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Belge Durumu</p>
                    <div className="space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2.5">
                           <CheckCircle size={16} className="text-green-500" />
                           <span className="font-semibold text-gray-600">Muayene</span>
                        </div>
                        <span className="text-xs font-bold font-mono text-gray-400">{vehicle.documents.inspection.expiresAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* --- ADD VEHICLE WIZARD MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm transition-opacity" onClick={resetForm}></div>
          <div className="bg-white rounded-3xl w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[95vh] overflow-hidden relative z-10 shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
               <div>
                  <h2 className="text-xl font-black text-slate-900">Yeni Araç Ekle</h2>
                  <p className="text-sm text-gray-500 font-medium">Lütfen araç bilgilerini eksiksiz giriniz.</p>
               </div>
               <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={24} />
               </button>
            </div>

            {/* Progress Bar */}
            <div className="px-8 pt-6 pb-2">
               <div className="flex items-center justify-between relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full -z-10"></div>
                  <div 
                     className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-orange rounded-full -z-10 transition-all duration-500 ease-out" 
                     style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                  ></div>
                  
                  {[
                    { id: 1, label: 'Kimlik Bilgisi' },
                    { id: 2, label: 'Yapı & Boyut' },
                    { id: 3, label: 'Belgeler' }
                  ].map((s) => (
                    <div key={s.id} className="flex flex-col items-center gap-2 bg-white px-2">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${step >= s.id ? 'border-brand-orange bg-brand-orange text-white' : 'border-gray-200 text-gray-400 bg-white'}`}>
                          {step > s.id ? <CheckCircle size={16} /> : s.id}
                       </div>
                       <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s.id ? 'text-brand-dark' : 'text-gray-300'}`}>{s.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8">
               
               {/* STEP 1: BASIC INFO */}
               {step === 1 && (
                  <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Plaka</label>
                           <div className="relative">
                              <div className="absolute inset-y-0 left-0 w-10 bg-blue-700 rounded-l-xl flex flex-col items-center justify-center text-[8px] font-bold text-white z-10">
                                 <span>TR</span>
                              </div>
                              <input 
                                type="text" 
                                className="w-full pl-14 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 uppercase placeholder:text-gray-300 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                                placeholder="34 ABC 123"
                                value={formData.plate}
                                onChange={(e) => setFormData({...formData, plate: e.target.value.toUpperCase()})}
                              />
                           </div>
                        </div>
                        
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Marka / Model</label>
                           <input 
                              type="text" 
                              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                              placeholder="Örn: Mercedes-Benz Actros"
                              value={formData.brand}
                              onChange={(e) => setFormData({...formData, brand: e.target.value})}
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Model Yılı</label>
                           <input 
                              type="number" 
                              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                              placeholder="2023"
                              value={formData.year}
                              onChange={(e) => setFormData({...formData, year: e.target.value})}
                           />
                        </div>
                     </div>
                     
                     <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                        <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-800 leading-relaxed font-medium">
                           Lütfen ruhsatta yazan bilgileri eksiksiz giriniz. Hatalı plaka veya model bilgisi, sistem tarafından yapılan otomatik belge kontrollerinde sorun yaratabilir.
                        </p>
                     </div>
                  </div>
               )}

               {/* STEP 2: TYPE & DIMENSIONS (VISUAL) */}
               {step === 2 && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
                     
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Left: Type Grid */}
                        <div className="lg:col-span-7 space-y-4">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Araç Tipi Seçiniz</label>
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {VEHICLE_TYPES.map((type) => (
                                 <button
                                    key={type.id}
                                    onClick={() => setFormData({...formData, type: type.id})}
                                    className={`relative flex flex-col items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 h-32 group hover:scale-[1.02] ${formData.type === type.id ? 'border-brand-orange bg-orange-50/50 ring-2 ring-brand-orange/20' : 'border-gray-100 bg-white hover:border-brand-orange/30'}`}
                                 >
                                    <div className={`w-full h-16 mb-2 flex items-center justify-center ${formData.type === type.id ? 'text-brand-orange' : 'text-gray-400 group-hover:text-brand-orange'}`}>
                                       <VehicleVisual type={type.id} />
                                    </div>
                                    <span className={`text-xs font-bold text-center leading-tight ${formData.type === type.id ? 'text-brand-dark' : 'text-gray-600'}`}>{type.label}</span>
                                    
                                    {formData.type === type.id && (
                                       <div className="absolute top-2 right-2 w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-sm">
                                          <CheckCircle size={12} />
                                       </div>
                                    )}
                                 </button>
                              ))}
                           </div>

                           <div className="space-y-3 pt-6">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Kasa Tipi</label>
                              <div className="flex flex-wrap gap-2">
                                 {BODY_TYPES.map((body) => (
                                    <button
                                       key={body.id}
                                       onClick={() => setFormData({...formData, bodyType: body.id})}
                                       className={`px-4 py-2.5 rounded-lg text-xs font-bold border transition-all ${formData.bodyType === body.id ? 'bg-brand-dark text-white border-brand-dark' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                                    >
                                       {body.label}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>

                        {/* Right: Technical Specs Preview (BluePrint Style) */}
                        <div className="lg:col-span-5">
                           <div className="bg-brand-dark rounded-2xl p-6 text-white h-full relative overflow-hidden flex flex-col">
                              {/* Grid Background */}
                              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                              
                              {selectedVehicleType ? (
                                 <div className="relative z-10 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                       <div>
                                          <h3 className="text-xl font-black text-brand-orange">{selectedVehicleType.label}</h3>
                                          <p className="text-gray-400 text-xs font-medium mt-1">{selectedVehicleType.desc}</p>
                                       </div>
                                       <div className="px-3 py-1 rounded bg-white/10 border border-white/10 text-xs font-mono">
                                          {selectedVehicleType.axles}
                                       </div>
                                    </div>

                                    {/* Visual Representation */}
                                    <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-4 flex items-center justify-center mb-6 relative">
                                       {/* Dimensions - Length */}
                                       <div className="absolute bottom-2 left-4 right-4 flex items-center gap-2">
                                          <div className="h-2 w-px bg-gray-500"></div>
                                          <div className="h-px bg-gray-500 flex-1 relative">
                                             <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-dark px-1 text-[10px] text-gray-300 font-mono">
                                                {selectedVehicleType.dims.l}
                                             </span>
                                          </div>
                                          <div className="h-2 w-px bg-gray-500"></div>
                                       </div>
                                       {/* Dimensions - Height */}
                                       <div className="absolute top-4 bottom-4 right-2 flex flex-col items-center gap-2">
                                          <div className="w-2 h-px bg-gray-500"></div>
                                          <div className="w-px bg-gray-500 flex-1 relative">
                                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-dark py-1 text-[10px] text-gray-300 font-mono rotate-90 whitespace-nowrap">
                                                {selectedVehicleType.dims.h}
                                             </span>
                                          </div>
                                          <div className="w-2 h-px bg-gray-500"></div>
                                       </div>

                                       <div className="w-full text-brand-orange">
                                          <VehicleVisual type={selectedVehicleType.id} />
                                       </div>
                                    </div>

                                    {/* Data Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                       <div className="bg-white/5 rounded-lg p-3">
                                          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Maks. Kapasite</div>
                                          <div className="text-lg font-bold text-white flex items-end gap-1">
                                             {selectedVehicleType.maxWeight / 1000} <span className="text-xs mb-1 text-gray-400">Ton</span>
                                          </div>
                                       </div>
                                       <div className="bg-white/5 rounded-lg p-3">
                                          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Genişlik</div>
                                          <div className="text-lg font-bold text-white flex items-end gap-1">
                                             {selectedVehicleType.dims.w}
                                          </div>
                                       </div>
                                    </div>

                                 </div>
                              ) : (
                                 <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                    <Info size={40} className="mb-4 opacity-50" />
                                    <p className="text-sm font-medium">Lütfen soldan bir araç tipi seçiniz.</p>
                                 </div>
                              )}
                           </div>
                        </div>

                     </div>

                  </div>
               )}

               {/* STEP 3: DOCUMENTS */}
               {step === 3 && (
                  <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                     <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 items-center mb-6">
                        <AlertCircle size={20} className="text-orange-600 flex-shrink-0" />
                        <p className="text-xs text-orange-800 leading-relaxed font-bold">
                           Lütfen belgelerinizin son geçerlilik tarihlerini giriniz. Sistemimiz E-Devlet entegrasyonu ile otomatik doğrulama yapacaktır.
                        </p>
                     </div>

                     <div className="space-y-4">
                        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-orange transition-colors group">
                           <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-brand-orange group-hover:bg-orange-50 transition-colors">
                                    <FileText size={20} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-gray-900">Trafik Sigortası</p>
                                    <p className="text-xs text-gray-400">Zorunlu Mali Sorumluluk</p>
                                 </div>
                              </div>
                           </div>
                           <input 
                              type="date" 
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-brand-orange"
                           />
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-orange transition-colors group">
                           <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-brand-orange group-hover:bg-orange-50 transition-colors">
                                    <CheckCircle size={20} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-gray-900">Araç Muayenesi</p>
                                    <p className="text-xs text-gray-400">TÜVTÜRK Geçerlilik</p>
                                 </div>
                              </div>
                           </div>
                           <input 
                              type="date" 
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-brand-orange"
                           />
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-orange transition-colors group">
                           <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-brand-orange group-hover:bg-orange-50 transition-colors">
                                    <Truck size={20} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-gray-900">K1 / L1 Belgesi</p>
                                    <p className="text-xs text-gray-400">Yetki Belgesi</p>
                                 </div>
                              </div>
                           </div>
                           <input 
                              type="date" 
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-brand-orange"
                           />
                        </div>
                     </div>
                  </div>
               )}

            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
               <button 
                  onClick={step === 1 ? resetForm : handleBack}
                  className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
               >
                  {step === 1 ? 'İptal' : <><ChevronLeft size={16} /> Geri</>}
               </button>

               <button 
                  onClick={step === 3 ? resetForm : handleNext}
                  className="px-8 py-3 rounded-xl bg-brand-orange text-white font-bold shadow-lg shadow-brand-orange/20 hover:bg-orange-600 transition-all transform active:scale-[0.98] flex items-center gap-2 text-sm"
               >
                  {step === 3 ? 'Kaydet ve Tamamla' : <>Devam Et <ChevronRight size={16} /></>}
               </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
