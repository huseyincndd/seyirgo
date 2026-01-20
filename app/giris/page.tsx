'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2, User } from 'lucide-react';
// Import path updated for App Router structure
import Navbar from '../components/Navbar';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Giriş bilgileri:', formData);
    // Real app would handle auth here
    // Şimdilik demo olarak shipper dashboard'a yönlendir
    // İleride kullanıcı tipine göre yönlendirme yapılacak
    router.push('/shipper');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans">
      {/* Navbar with Solid variant for white background */}
      <Navbar variant="solid" />
      
      {/* Main Container - Adjusted Padding for Fixed Navbar */}
      <div className="flex flex-grow pt-[80px] lg:pt-[90px] h-screen overflow-hidden">
      
        {/* LEFT SIDE: BRANDING (Hidden on Mobile, Fixed on Desktop) */}
        <div className="hidden lg:flex lg:w-5/12 bg-[#002B5B] relative flex-col justify-between p-16 text-white h-full shadow-[4px_0_24px_rgba(0,0,0,0.1)] z-10">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop" 
               alt="Logistics Background" 
               className="w-full h-full object-cover opacity-20 mix-blend-overlay"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-[#002B5B] via-[#002B5B]/95 to-[#002B5B]/80"></div>
             {/* Abstract Grid Pattern */}
             <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          </div>

          {/* Brand Content */}
          <div className="relative z-10 mt-12">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-md border border-white/10 mb-8 shadow-sm">
                <ShieldCheck size={16} className="text-brand-accent" />
                <span className="font-bold tracking-wider text-xs uppercase text-white">Kurumsal Panel</span>
             </div>
             <h2 className="text-4xl xl:text-5xl font-black leading-tight mb-6 tracking-tight drop-shadow-lg">
               Lojistikte <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-200">Güçlü Partner.</span>
             </h2>
             <div className="space-y-5 max-w-sm mt-8">
                <div className="flex items-start gap-4 text-blue-50/90 group">
                   <div className="p-1 rounded bg-white/10 mt-0.5"><CheckCircle2 size={16} className="text-brand-accent" /></div>
                   <span className="text-sm font-medium leading-relaxed group-hover:text-white transition-colors">Tüm operasyonlarınızı tek bir panelden yönetin.</span>
                </div>
                <div className="flex items-start gap-4 text-blue-50/90 group">
                   <div className="p-1 rounded bg-white/10 mt-0.5"><CheckCircle2 size={16} className="text-brand-accent" /></div>
                   <span className="text-sm font-medium leading-relaxed group-hover:text-white transition-colors">Anlık bildirim ve canlı araç takip sistemi.</span>
                </div>
                <div className="flex items-start gap-4 text-blue-50/90 group">
                   <div className="p-1 rounded bg-white/10 mt-0.5"><CheckCircle2 size={16} className="text-brand-accent" /></div>
                   <span className="text-sm font-medium leading-relaxed group-hover:text-white transition-colors">KVKK uyumlu, doğrulanmış güvenilir lojistik ağı.</span>
                </div>
             </div>
          </div>

          {/* Footer Info */}
          <div className="relative z-10 flex justify-between items-center border-t border-white/10 pt-6 mt-auto">
             <p className="text-xs text-blue-300/80 font-medium">© 2024 SeyirGo Lojistik A.Ş.</p>
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
               <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
               <span className="text-[10px] font-bold text-green-300 uppercase tracking-wider">Sistem Aktif</span>
             </div>
          </div>
        </div>

        {/* RIGHT SIDE: FORM (Scrollable & Responsive) */}
        <div className="w-full lg:w-7/12 flex flex-col items-center bg-[#F0F2F5] relative overflow-y-auto h-full px-4 sm:px-6">
           
           {/* Mobile Background Decoration (Visible only on mobile) */}
           <div className="lg:hidden absolute top-0 left-0 w-full h-64 bg-brand-dark"></div>
           <div className="lg:hidden absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#002B5B 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

           {/* Form Card Container */}
           {/* FIX: justify-center changed to justify-start on mobile to prevent top clipping when keyboard opens */}
           <div className="w-full max-w-[450px] bg-white p-8 md:p-12 rounded-xl shadow-xl lg:shadow-none lg:bg-transparent lg:p-0 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 border border-gray-100 lg:border-none my-10 lg:my-auto flex flex-col justify-center">
              
              <div className="mb-10 text-center lg:text-left">
                 <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-brand-dark mx-auto lg:mx-0 mb-4 shadow-sm border border-blue-100">
                    <User size={24} />
                 </div>
                 <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">Tekrar Hoş Geldiniz</h1>
                 <p className="text-gray-500 font-medium text-sm">Devam etmek için hesap bilgilerinizi girin.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                 
                 <div className="space-y-5">
                    <div>
                       <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">E-Posta Adresi</label>
                       <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-dark transition-colors">
                             <Mail size={18} />
                          </div>
                          <input 
                             type="email" 
                             name="email"
                             value={formData.email}
                             onChange={handleChange}
                             className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-dark/10 focus:border-brand-dark outline-none transition-all text-gray-900 font-semibold text-sm placeholder:text-gray-400 shadow-sm"
                             placeholder="isim@sirketiniz.com"
                             required
                          />
                       </div>
                    </div>

                    <div>
                       <div className="flex justify-between items-center mb-2 ml-1">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Şifre</label>
                          <button type="button" className="text-xs font-bold text-brand-accent hover:text-brand-dark transition-colors">Şifremi Unuttum?</button>
                       </div>
                       <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-dark transition-colors">
                             <Lock size={18} />
                          </div>
                          <input 
                             type="password" 
                             name="password"
                             value={formData.password}
                             onChange={handleChange}
                             className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-dark/10 focus:border-brand-dark outline-none transition-all text-gray-900 font-semibold text-sm placeholder:text-gray-400 shadow-sm"
                             placeholder="••••••••"
                             required
                          />
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center ml-1">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-brand-dark border-gray-300 rounded focus:ring-brand-dark cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 font-semibold cursor-pointer select-none">
                      Beni hatırla
                    </label>
                 </div>

                 <button
                    type="submit"
                    className="w-full bg-brand-dark text-white font-bold py-4 rounded-lg hover:bg-[#003B7B] transition-all transform active:scale-[0.99] shadow-lg shadow-brand-dark/20 flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                 >
                    Giriş Yap <ArrowRight size={18} />
                 </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                 <p className="text-gray-600 text-sm font-medium">
                    Henüz hesabınız yok mu?{' '}
                    <button onClick={() => router.push('/kayit')} className="text-brand-dark font-black hover:text-brand-accent transition-colors underline decoration-2 underline-offset-4 ml-1">
                       Hemen Kayıt Olun
                    </button>
                 </p>
              </div>

              {/* Test Login Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">Test Girişleri</p>
                 <div className="space-y-3">
                    <button
                       onClick={() => router.push('/carrier')}
                       className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white font-bold py-3 rounded-lg hover:from-[#FF5722] hover:to-[#FF7B32] transition-all transform hover:scale-[1.02] active:scale-[0.99] shadow-md flex items-center justify-center gap-2 text-sm"
                    >
                       <User size={18} />
                       Taşıyıcı Olarak Giriş Yap
                    </button>
                    <button
                       onClick={() => router.push('/shipper')}
                       className="w-full bg-gradient-to-r from-[#002B5B] to-[#003B7B] text-white font-bold py-3 rounded-lg hover:from-[#003B7B] hover:to-[#004B8B] transition-all transform hover:scale-[1.02] active:scale-[0.99] shadow-md flex items-center justify-center gap-2 text-sm"
                    >
                       <User size={18} />
                       Yük Veren Olarak Giriş Yap
                    </button>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;