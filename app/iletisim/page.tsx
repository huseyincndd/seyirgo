'use client';
import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Send, MessageSquare, 
  LifeBuoy, Clock, ArrowRight, CheckCircle2 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-brand-accent selection:text-white">
      <Navbar variant="white" />
      
      <main className="flex-grow">
        
        {/* --- 1. HERO SECTION: Corporate Style --- */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-brand-dark overflow-hidden pt-[80px] lg:pt-[140px]">
          
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
               alt="Customer Support" 
               className="w-full h-full object-cover opacity-30" 
             />
             {/* Gradient Overlays */}
             <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/70 to-brand-dark/90"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          {/* Content */}
          <div className="container mx-auto max-w-6xl relative z-10 text-center px-6">
             
             {/* Badge */}
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-blue-100 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <LifeBuoy size={14} className="text-brand-orange" />
                <span>7/24 Destek Hattı</span>
             </div>
             
             {/* Headline */}
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1] animate-in fade-in zoom-in-95 duration-1000 delay-150 drop-shadow-2xl">
               Her Zaman <br className="hidden md:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-light">Yanınızdayız.</span>
             </h1>
             
             {/* Description */}
             <p className="text-lg md:text-2xl text-blue-100/80 font-medium max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
               Sorularınız, önerileriniz veya iş birlikleri için bize dilediğiniz kanaldan ulaşabilirsiniz. Ekibimiz en kısa sürede dönüş yapacaktır.
             </p>

             {/* Scroll Indicator */}
             <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce text-white/30 hidden md:block">
                <ArrowRight size={32} className="rotate-90" />
             </div>
          </div>
          
           {/* Seamless Transition to White Section */}
           <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-20"></div>
        </section>

        {/* --- 2. CONTACT CONTENT (Split Layout) --- */}
        <section className="relative py-24 bg-white z-20">
           <div className="container mx-auto px-6 max-w-7xl">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                 
                 {/* LEFT: Contact Info Cards */}
                 <div className="lg:col-span-5 space-y-6">
                    
                    {/* Main Info Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-brand-accent/20 transition-colors"></div>
                       
                       <h3 className="text-2xl font-bold text-brand-dark mb-8">İletişim Bilgileri</h3>
                       
                       <div className="space-y-8">
                          {/* Address */}
                          <div className="flex items-start gap-5">
                             <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-dark flex items-center justify-center flex-shrink-0">
                                <MapPin size={24} />
                             </div>
                             <div>
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Genel Merkez</h4>
                                <p className="text-gray-800 font-medium leading-relaxed">
                                   Teknopark İstanbul, Sanayi Mah. <br />
                                   Teknopark Bulvarı No:1 <br />
                                   Pendik / İstanbul
                                </p>
                             </div>
                          </div>

                          {/* Phone */}
                          <div className="flex items-start gap-5">
                             <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center flex-shrink-0">
                                <Phone size={24} />
                             </div>
                             <div>
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Çağrı Merkezi</h4>
                                <p className="text-xl font-bold text-gray-900 mb-1">0850 123 45 67</p>
                                <p className="text-sm text-gray-500">Hafta içi: 09:00 - 18:00</p>
                             </div>
                          </div>

                          {/* Email */}
                          <div className="flex items-start gap-5">
                             <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                                <Mail size={24} />
                             </div>
                             <div>
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">E-Posta</h4>
                                <a href="mailto:info@seyirgo.net" className="text-lg font-bold text-brand-accent hover:text-brand-dark transition-colors">info@seyirgo.net</a>
                                <p className="text-sm text-gray-500 mt-1">Ortalama yanıt süresi: 2 saat</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Secondary Card: Help Center */}
                    <div className="bg-brand-dark rounded-3xl p-8 shadow-xl text-white relative overflow-hidden group">
                       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                       <div className="absolute -bottom-4 -right-4 text-white/5 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                          <MessageSquare size={120} />
                       </div>
                       
                       <div className="relative z-10">
                          <h3 className="text-xl font-bold mb-2">Canlı Destek</h3>
                          <p className="text-blue-200 text-sm mb-6 leading-relaxed max-w-[80%]">
                             Operasyonel sorunlarınız için destek ekibimizle anlık görüşebilirsiniz.
                          </p>
                          <button className="bg-white text-brand-dark px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-accent hover:text-white transition-all shadow-lg flex items-center gap-2">
                             <MessageSquare size={18} /> Sohbete Başla
                          </button>
                       </div>
                    </div>

                 </div>

                 {/* RIGHT: Contact Form */}
                 <div className="lg:col-span-7">
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gray-100 h-full">
                       
                       <div className="mb-10">
                          <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Bize Yazın</h3>
                          <p className="text-gray-500">
                             Formu doldurun, uzman ekibimiz konuyu inceleyip size dönüş yapsın.
                          </p>
                       </div>

                       {formStatus === 'success' ? (
                          <div className="h-[400px] flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 size={40} />
                             </div>
                             <h4 className="text-2xl font-bold text-gray-900 mb-2">Mesajınız Alındı!</h4>
                             <p className="text-gray-500 max-w-xs mx-auto mb-8">
                                En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz.
                             </p>
                             <button 
                                onClick={() => setFormStatus('idle')}
                                className="text-brand-dark font-bold hover:text-brand-accent underline"
                             >
                                Yeni mesaj gönder
                             </button>
                          </div>
                       ) : (
                          <form onSubmit={handleSubmit} className="space-y-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                   <label className="text-xs font-bold text-gray-500 uppercase ml-1">Adınız Soyadınız</label>
                                   <input type="text" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-dark/10 focus:border-brand-dark outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400" placeholder="İsim Soyisim" />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-xs font-bold text-gray-500 uppercase ml-1">E-Posta Adresi</label>
                                   <input type="email" required className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-dark/10 focus:border-brand-dark outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400" placeholder="ornek@email.com" />
                                </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                   <label className="text-xs font-bold text-gray-500 uppercase ml-1">Telefon</label>
                                   <input type="tel" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-dark/10 focus:border-brand-dark outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400" placeholder="05XX XXX XX XX" />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-xs font-bold text-gray-500 uppercase ml-1">Konu</label>
                                   <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-dark/10 focus:border-brand-dark outline-none transition-all font-medium text-gray-900 cursor-pointer appearance-none">
                                      <option>Genel Bilgi</option>
                                      <option>Yük Veren Desteği</option>
                                      <option>Taşıyıcı Başvurusu</option>
                                      <option>Muhasebe & Finans</option>
                                      <option>Şikayet & Öneri</option>
                                   </select>
                                </div>
                             </div>

                             <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Mesajınız</label>
                                <textarea required rows={5} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-dark/10 focus:border-brand-dark outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400 resize-none" placeholder="Size nasıl yardımcı olabiliriz?"></textarea>
                             </div>

                             <div className="pt-4">
                                <button 
                                   disabled={formStatus === 'submitting'}
                                   type="submit" 
                                   className="w-full bg-brand-orange text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                   {formStatus === 'submitting' ? (
                                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                   ) : (
                                      <>Gönder <Send size={18} /></>
                                   )}
                                </button>
                             </div>
                             
                             <p className="text-xs text-center text-gray-400">
                                Gönder butonuna tıklayarak <a href="#" className="underline hover:text-gray-600">Kişisel Verilerin Korunması</a> kanununu kabul etmiş sayılırsınız.
                             </p>
                          </form>
                       )}
                    </div>
                 </div>

              </div>

           </div>
        </section>

        {/* --- 3. MAP SECTION --- */}
        <section className="h-[400px] w-full bg-gray-200 relative">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.929068463994!2d29.324867976550796!3d40.93922337136025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cadb1da984620f%3A0x660602f37e42d99d!2sTeknopark%20Istanbul!5e0!3m2!1sen!2str!4v1708450000000!5m2!1sen!2str" 
             width="100%" 
             height="100%" 
             style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1)' }} 
             allowFullScreen 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
           ></iframe>
           
           {/* Overlay Gradient for smooth blending */}
           <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
