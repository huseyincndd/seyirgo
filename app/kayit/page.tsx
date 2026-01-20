'use client';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Truck, ArrowLeft, User2, Building2, Mail, Phone, Lock, ChevronRight, ArrowRight, X, FileText, Check, AlertCircle } from 'lucide-react';
// Import path updated for App Router structure
import Navbar from '../components/Navbar';

// Country codes data
const COUNTRY_CODES = [
  { code: 'TR', dial: '+90', flag: '🇹🇷' },
  { code: 'US', dial: '+1', flag: '🇺🇸' },
  { code: 'DE', dial: '+49', flag: '🇩🇪' },
  { code: 'GB', dial: '+44', flag: '🇬🇧' },
  { code: 'FR', dial: '+33', flag: '🇫🇷' },
  { code: 'NL', dial: '+31', flag: '🇳🇱' },
  { code: 'RU', dial: '+7', flag: '🇷🇺' },
  { code: 'AZ', dial: '+994', flag: '🇦🇿' },
];

const KVKK_TEXT = `
SEYİRGO LOJİSTİK A.Ş. 
KİŞİSEL VERİLERİN KORUNMASI VE İŞLENMESİ AYDINLATMA METNİ

1. Veri Sorumlusu
6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; veri sorumlusu olarak SeyirGo Lojistik A.Ş. ("Şirket") tarafından aşağıda açıklanan kapsamda işlenebilecektir.

2. Kişisel Verilerin Hangi Amaçla İşleneceği
Toplanan kişisel verileriniz;
- Lojistik ve taşımacılık faaliyetlerinin yürütülmesi,
- Yük veren ve taşıyıcı eşleştirmelerinin yapılması,
- Faturalandırma ve finansal mutabakat süreçleri,
- Müşteri destek hizmetlerinin sağlanması,
- Hukuki yükümlülüklerin yerine getirilmesi,
amaçlarıyla işlenecektir.

3. İşlenen Kişisel Veriler
Kimlik Bilgileri: Ad, soyad, T.C. kimlik numarası, doğum yılı.
İletişim Bilgileri: Telefon numarası, e-posta adresi, adres bilgileri.
Finansal Bilgiler: Vergi numarası, vergi dairesi, banka hesap bilgileri.
İşlem Güvenliği: IP adresi, log kayıtları, şifre bilgileri.

4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi
Kişisel verileriniz, internet sitemiz, mobil uygulamamız ve çağrı merkezimiz kanalıyla elektronik ortamda toplanmaktadır. Bu veriler, "sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması" ve "veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi" hukuki sebeplerine dayanarak işlenmektedir.

5. Kişisel Verilerin Aktarılması
Kişisel verileriniz; kanunen yetkili kamu kurumlarına, iş ortaklarımıza ve tedarikçilerimize, KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları çerçevesinde aktarılabilecektir.

6. Veri Sahibinin Hakları
KVKK'nın 11. maddesi uyarınca veri sahipleri; kişisel veri işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını öğrenme, yurt içi veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenen verilerin düzeltilmesini isteme haklarına sahiptir.
`;

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<'shipper' | 'carrier' | null>(null);

  // Form State
  const [countryCode, setCountryCode] = useState('+90');
  const [formData, setFormData] = useState({
    isim: '', soyisim: '', tcKimlik: '', dogumYili: '',
    sirketUnvani: '', vergiNo: '', vergiDairesi: '', faturaAdresi: '',
    email: '', telefon: '', sifre: '', sifreTekrar: '',
    kvkkOnay: false, smsOnay: false,
  });

  // KVKK Modal State
  const [showKvkkModal, setShowKvkkModal] = useState(false);
  const [canApproveKvkk, setCanApproveKvkk] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleTypeSelect = (type: 'shipper' | 'carrier') => {
    setUserType(type);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kvkkOnay) {
      alert('Lütfen KVKK aydınlatma metnini onaylayın.');
      return;
    }
    // Combine country code with phone for submission if needed
    const fullPhone = `${countryCode}${formData.telefon}`;
    console.log('Registration Data:', { ...formData, fullPhone });
    
    // Redirect after registration
    router.push('/giris');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Checkbox handling
    if (type === 'checkbox') {
        // Special handling for KVKK to open modal instead of checking directly
        if (name === 'kvkkOnay') {
            if (!formData.kvkkOnay) {
                // If checking, open modal
                setShowKvkkModal(true);
                // Reset scroll approval state
                setCanApproveKvkk(false);
            } else {
                // If unchecking, allow directly
                setFormData({ ...formData, [name]: false });
            }
        } else {
            // Normal checkbox (smsOnay)
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({ ...formData, [name]: checked });
        }
        return;
    }
    setFormData({ ...formData, [name]: value });
  };

  // Special handler for numeric only fields (TC, Phone, Tax, Year)
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    setFormData({ ...formData, [name]: numericValue });
  };

  // KVKK Scroll Handler
  const handleKvkkScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Check if scrolled to bottom (with small buffer)
    if (scrollHeight - scrollTop <= clientHeight + 20) {
        setCanApproveKvkk(true);
    }
  };

  const confirmKvkk = () => {
      setFormData({ ...formData, kvkkOnay: true });
      setShowKvkkModal(false);
  };

  // Helper variables for styling based on selection
  const isShipper = userType === 'shipper';
  const accentColor = isShipper ? 'text-brand-dark' : 'text-brand-orange';
  const bgAccent = isShipper ? 'bg-brand-dark' : 'bg-brand-orange';
  const borderFocus = isShipper ? 'focus:border-brand-dark' : 'focus:border-brand-orange';
  const ringFocus = isShipper ? 'focus:ring-brand-dark/10' : 'focus:ring-brand-orange/10';
  // Shared input class string to avoid repetition
  const inputClass = `w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none transition-all ${borderFocus} ${ringFocus} focus:ring-2 font-medium text-sm text-gray-900 placeholder:text-gray-400 shadow-sm disabled:bg-gray-100`;

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans">
      <Navbar variant="solid" />
      
      {/* Main Container */}
      <div className="flex flex-grow pt-[80px] lg:pt-[90px] h-screen overflow-hidden">
      
        {/* LEFT SIDE: BRANDING (Fixed) */}
        <div className="hidden lg:flex lg:w-5/12 bg-[#002B5B] relative flex-col justify-between p-16 text-white h-full shadow-[4px_0_24px_rgba(0,0,0,0.1)] z-10">
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1964&auto=format&fit=crop" 
               alt="Logistics Network" 
               className="w-full h-full object-cover opacity-20 mix-blend-overlay"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-[#002B5B] via-[#002B5B]/95 to-[#002B5B]/80"></div>
          </div>

          <div className="relative z-10 mt-12">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-md border border-white/10 mb-8 shadow-sm">
                <Truck size={16} className="text-white" />
                <span className="font-bold tracking-wider text-xs uppercase text-white">Partner Programı</span>
             </div>
             <h2 className="text-4xl xl:text-5xl font-black leading-tight mb-6 tracking-tight drop-shadow-lg">
               Birlikte <br/>
               <span className="text-brand-orange">Büyüyoruz.</span>
             </h2>
             <p className="text-blue-100/90 text-lg font-medium leading-relaxed max-w-sm">
               Binlerce kurumsal firma ve güvenilir taşıyıcı arasına katılın. İş hacminizi artırın.
             </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-auto">
             <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-3xl font-black mb-1">12B+</div>
                <div className="text-xs text-blue-200 font-bold uppercase tracking-wider">Başarılı Operasyon</div>
             </div>
             <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-3xl font-black mb-1">81</div>
                <div className="text-xs text-blue-200 font-bold uppercase tracking-wider">İlde Hizmet</div>
             </div>
          </div>
        </div>

        {/* RIGHT SIDE: CONTENT AREA - Scrollable */}
        <div className="w-full lg:w-7/12 flex flex-col bg-[#F0F2F5] overflow-y-auto h-full relative px-4 sm:px-6">
           
           {/* Mobile Decoration */}
           <div className="lg:hidden absolute top-0 left-0 w-full h-48 bg-brand-dark"></div>
           
           <div className="w-full max-w-2xl mx-auto flex-grow flex flex-col justify-start lg:justify-center min-h-full relative z-10 my-8 lg:my-auto">
              
              <div className="bg-white rounded-xl shadow-xl lg:shadow-none lg:bg-transparent p-6 md:p-10 border border-gray-100 lg:border-none">
                  {/* Header / Nav */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 lg:border-none">
                     {step === 2 ? (
                       <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm transition-colors group">
                          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Seçime Dön
                       </button>
                     ) : (
                       <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Adım 1/2</div>
                     )}
                     
                     <div className="flex items-center gap-2">
                        <span className={`h-1.5 w-8 rounded-full transition-colors ${step === 1 ? 'bg-brand-dark' : 'bg-gray-200'}`}></span>
                        <span className={`h-1.5 w-8 rounded-full transition-colors ${step === 2 ? (isShipper ? 'bg-brand-dark' : 'bg-brand-orange') : 'bg-gray-200'}`}></span>
                     </div>
                  </div>

                  {/* STEP 1: SELECTION */}
                  {step === 1 && (
                     <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Hesap Türünü Seçin</h1>
                        <p className="text-gray-500 mb-10 text-base md:text-lg font-medium">Size uygun olan profili seçerek işlemlerinize başlayın.</p>

                        <div className="grid grid-cols-1 gap-5">
                           {/* Shipper Option */}
                           <button 
                              onClick={() => handleTypeSelect('shipper')}
                              className="group relative p-6 md:p-8 rounded-xl border-2 border-gray-200 hover:border-brand-dark hover:bg-blue-50/50 transition-all text-left flex items-center gap-5 md:gap-8 bg-gray-50/50"
                           >
                              <div className="w-16 h-16 bg-white text-brand-dark rounded-xl flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform shadow-md border border-gray-100">
                                 <Package size={32} />
                              </div>
                              <div className="flex-grow">
                                 <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 group-hover:text-brand-dark">Yük Veren</h3>
                                 <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
                                    Uygun araç bul, fiyat teklifi al ve yükünü güvenle taşıt.
                                 </p>
                              </div>
                              <div className="text-gray-300 group-hover:text-brand-dark transition-colors">
                                 <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                           </button>

                           {/* Carrier Option */}
                           <button 
                              onClick={() => handleTypeSelect('carrier')}
                              className="group relative p-6 md:p-8 rounded-xl border-2 border-gray-200 hover:border-brand-orange hover:bg-orange-50/50 transition-all text-left flex items-center gap-5 md:gap-8 bg-gray-50/50"
                           >
                              <div className="w-16 h-16 bg-white text-brand-orange rounded-xl flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform shadow-md border border-gray-100">
                                 <Truck size={32} />
                              </div>
                              <div className="flex-grow">
                                 <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 group-hover:text-brand-orange">Yük Taşıyan</h3>
                                 <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
                                    Yük bul, rotanı planla ve boş dönmeden kazanç sağla.
                                 </p>
                              </div>
                              <div className="text-gray-300 group-hover:text-brand-orange transition-colors">
                                 <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                           </button>
                        </div>

                        <div className="mt-10 text-center border-t border-gray-100 pt-8">
                           <p className="text-gray-600 font-medium text-sm">
                              Zaten hesabınız var mı?{' '}
                              <button onClick={() => router.push('/giris')} className="text-brand-dark font-black hover:text-brand-accent underline decoration-2 underline-offset-4 transition-colors">
                                 Giriş Yap
                              </button>
                           </p>
                        </div>
                     </div>
                  )}

                  {/* STEP 2: FORM */}
                  {step === 2 && (
                     <div className="animate-in slide-in-from-right-8 fade-in duration-500">
                        <div className="mb-8">
                           <span className={`inline-block py-1.5 px-4 rounded-md text-[10px] font-extrabold uppercase tracking-widest mb-3 border ${isShipper ? 'bg-blue-50 text-brand-dark border-blue-100' : 'bg-orange-50 text-brand-orange border-orange-100'}`}>
                              {isShipper ? 'Yük Veren Üyeliği' : 'Taşıyıcı Üyeliği'}
                           </span>
                           <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Kayıt Formu</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                           
                           {/* Personal Info Group */}
                           <div className="space-y-4">
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-2">
                                 <User2 size={14} /> Kişisel Bilgiler
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <input type="text" name="isim" placeholder="Adınız" className={inputClass} value={formData.isim} onChange={handleChange} required />
                                 <input type="text" name="soyisim" placeholder="Soyadınız" className={inputClass} value={formData.soyisim} onChange={handleChange} required />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <input 
                                    type="text" 
                                    name="tcKimlik" 
                                    maxLength={11} 
                                    inputMode="numeric"
                                    placeholder="TC Kimlik No (11 Hane)" 
                                    className={inputClass} 
                                    value={formData.tcKimlik} 
                                    onChange={handleNumericChange} 
                                    required 
                                 />
                                 <input 
                                    type="text" 
                                    name="dogumYili" 
                                    maxLength={4} 
                                    inputMode="numeric"
                                    placeholder="Doğum Yılı (Örn: 1990)" 
                                    className={inputClass} 
                                    value={formData.dogumYili} 
                                    onChange={handleNumericChange} 
                                    required 
                                 />
                              </div>
                           </div>

                           {/* Company Info Group */}
                           <div className="space-y-4">
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-2">
                                 <Building2 size={14} /> Kurumsal Bilgiler
                              </h4>
                              <input type="text" name="sirketUnvani" placeholder="Şirket Ünvanı" className={inputClass} value={formData.sirketUnvani} onChange={handleChange} required />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <input type="text" name="vergiDairesi" placeholder="Vergi Dairesi" className={inputClass} value={formData.vergiDairesi} onChange={handleChange} required />
                                 <input 
                                    type="text" 
                                    name="vergiNo" 
                                    placeholder="Vergi No" 
                                    inputMode="numeric"
                                    maxLength={10}
                                    className={inputClass} 
                                    value={formData.vergiNo} 
                                    onChange={handleNumericChange} 
                                    required 
                                 />
                              </div>
                              <textarea name="faturaAdresi" rows={2} placeholder="Fatura Adresi" className={`${inputClass} resize-none`} value={formData.faturaAdresi} onChange={handleChange} required></textarea>
                           </div>

                           {/* Security Info Group */}
                           <div className="space-y-4">
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 border-b border-gray-100 pb-2">
                                 <Lock size={14} /> İletişim & Güvenlik
                              </h4>
                              
                              <div className="grid grid-cols-1 gap-4">
                                 {/* PHONE INPUT WITH COUNTRY SELECTOR */}
                                 <div className="relative flex">
                                    <div className="relative">
                                        <select 
                                            value={countryCode}
                                            onChange={(e) => setCountryCode(e.target.value)}
                                            className={`appearance-none h-full pl-3 pr-8 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg outline-none font-medium text-gray-700 text-sm focus:ring-0 cursor-pointer hover:bg-gray-100 transition-colors ${borderFocus}`}
                                        >
                                            {COUNTRY_CODES.map((country) => (
                                                <option key={country.code} value={country.dial}>
                                                    {country.flag} {country.dial}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                            <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                        </div>
                                    </div>
                                    <input 
                                        type="tel" 
                                        name="telefon" 
                                        inputMode="numeric"
                                        placeholder="5XX XXX XX XX" 
                                        className={`flex-1 px-4 py-3 bg-white border border-gray-300 rounded-r-lg outline-none transition-all ${borderFocus} ${ringFocus} focus:ring-2 font-medium text-sm text-gray-900 placeholder:text-gray-400 shadow-sm`} 
                                        value={formData.telefon} 
                                        onChange={handleNumericChange} 
                                        required 
                                    />
                                 </div>

                                 <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-3.5 text-gray-400" />
                                    <input type="email" name="email" placeholder="E-Posta Adresi" className={`pl-11 ${inputClass}`} value={formData.email} onChange={handleChange} required />
                                 </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <input type="password" name="sifre" placeholder="Şifre Oluştur" className={inputClass} value={formData.sifre} onChange={handleChange} required />
                                 <input type="password" name="sifreTekrar" placeholder="Şifre Tekrar" className={inputClass} value={formData.sifreTekrar} onChange={handleChange} required />
                              </div>
                           </div>

                           {/* Checkboxes */}
                           <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                              <label className="flex items-start gap-3 cursor-pointer mb-3 relative group">
                                 {/* Checkbox itself */}
                                 <input 
                                   type="checkbox" 
                                   name="kvkkOnay" 
                                   checked={formData.kvkkOnay} 
                                   onChange={handleChange} 
                                   className={`mt-0.5 w-4 h-4 rounded ${accentColor} focus:ring-0 cursor-pointer border-gray-300 pointer-events-auto`} 
                                 />
                                 <div className="text-xs text-gray-600 font-medium leading-relaxed select-none">
                                    <span 
                                        onClick={() => setShowKvkkModal(true)} 
                                        className="underline decoration-gray-400 hover:text-gray-900 ml-1 cursor-pointer font-bold"
                                    >
                                        KVKK Aydınlatma Metni
                                    </span>
                                    'ni okudum ve onaylıyorum.
                                 </div>
                              </label>

                              <label className="flex items-start gap-3 cursor-pointer">
                                 <input type="checkbox" name="smsOnay" checked={formData.smsOnay} onChange={handleChange} className={`mt-0.5 w-4 h-4 rounded ${accentColor} focus:ring-0 cursor-pointer border-gray-300`} />
                                 <span className="text-xs text-gray-600 font-medium leading-relaxed">Kampanya ve duyurulardan haberdar olmak istiyorum.</span>
                              </label>
                           </div>

                           <button type="submit" className={`w-full py-4 rounded-lg text-white font-bold text-sm uppercase tracking-wide shadow-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-[0.99] ${bgAccent}`}>
                              Kayıt İşlemini Tamamla <ArrowRight size={18} />
                           </button>
                        </form>
                     </div>
                  )}
              </div>

           </div>
        </div>
      </div>

      {/* KVKK Modal */}
      {showKvkkModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm transition-opacity"
                onClick={() => setShowKvkkModal(false)}
            ></div>
            
            {/* Modal Content */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col relative z-10 animate-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isShipper ? 'bg-blue-100 text-brand-dark' : 'bg-orange-100 text-brand-orange'}`}>
                            <FileText size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">KVKK Aydınlatma Metni</h3>
                            <p className="text-xs text-gray-500 font-medium">Lütfen metni sonuna kadar okuyunuz.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowKvkkModal(false)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Text Area */}
                <div 
                    ref={modalContentRef}
                    onScroll={handleKvkkScroll}
                    className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 text-sm text-gray-600 leading-relaxed font-medium bg-white"
                >
                    {KVKK_TEXT.split('\n').map((line, i) => (
                        <p key={i} className={`${line.startsWith('SEYİRGO') || /^\d+\./.test(line) ? 'font-bold text-gray-900 text-base mt-4' : ''}`}>
                            {line}
                        </p>
                    ))}
                    {/* Extra padding at bottom to ensure scroll triggers easily */}
                    <div className="h-4"></div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-medium">
                        {!canApproveKvkk ? (
                            <span className="text-brand-orange flex items-center gap-1.5 animate-pulse">
                                <AlertCircle size={14} />
                                Onaylamak için sona kadar kaydırın
                            </span>
                        ) : (
                            <span className="text-green-600 flex items-center gap-1.5">
                                <Check size={14} />
                                Metin okundu
                            </span>
                        )}
                    </div>
                    
                    <div className="flex w-full sm:w-auto gap-3">
                        <button 
                            onClick={() => setShowKvkkModal(false)}
                            className="flex-1 sm:flex-none px-6 py-3 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                            Vazgeç
                        </button>
                        <button 
                            onClick={confirmKvkk}
                            disabled={!canApproveKvkk}
                            className={`flex-1 sm:flex-none px-8 py-3 rounded-lg text-sm font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
                                ${canApproveKvkk 
                                    ? `${bgAccent} hover:brightness-110 active:scale-95 cursor-pointer` 
                                    : 'bg-gray-300 cursor-not-allowed opacity-70'
                                }`}
                        >
                            <Check size={16} /> Okudum, Onaylıyorum
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;