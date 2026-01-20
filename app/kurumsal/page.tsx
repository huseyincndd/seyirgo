
'use client';
import React from 'react';
import { Target, Globe, ShieldCheck, Users, Zap, TrendingUp, ArrowRight, Anchor, Truck, Box, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CorporatePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 selection:bg-brand-accent selection:text-white">
      <Navbar variant="white" />
      
      <main className="flex-grow">
        
        {/* --- 1. HERO SECTION: Cinematic & Deep --- */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-brand-dark overflow-hidden pt-[80px] lg:pt-[140px]">
          
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
               alt="Global Logistics Network" 
               className="w-full h-full object-cover opacity-40" 
             />
             {/* Gradient Overlays */}
             <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/70 to-brand-dark/90"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          {/* Content */}
          <div className="container mx-auto max-w-6xl relative z-10 text-center px-6">
             
             {/* Badge */}
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-blue-100 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                SeyirGo Hikayesi
             </div>
             
             {/* Headline */}
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1] animate-in fade-in zoom-in-95 duration-1000 delay-150 drop-shadow-2xl">
               Lojistiğin <br className="hidden md:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-light">Dijital İşletim Sistemi.</span>
             </h1>
             
             {/* Description */}
             <p className="text-lg md:text-2xl text-blue-100/80 font-medium max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
               Geleneksel nakliye süreçlerini teknolojiyle sıfırdan tasarlıyoruz. <br className="hidden md:block"/>
               Yük verenler için hız, taşıyıcılar için kazanç, herkes için güven.
             </p>

             {/* Scroll Indicator */}
             <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce text-white/30 hidden md:block">
                <ChevronDown size={32} />
             </div>
          </div>

          {/* Seamless Transition to White Section */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-20"></div>
        </section>

        {/* --- 2. THE PROBLEM & SOLUTION (Split) --- */}
        <section className="py-24 bg-white relative z-20">
           <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                 
                 {/* Left: Text */}
                 <div>
                    <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-8 tracking-tight">
                       Neden Buradayız?
                    </h2>
                    <div className="space-y-6 text-lg text-gray-500 leading-relaxed">
                       <p>
                          Türkiye, Avrupa'nın en büyük kamyon parkına sahip ülkelerinden biri. Ancak her gün binlerce araç <strong className="text-brand-dark">boş dönüyor</strong> ve binlerce yük veren <strong className="text-brand-dark">araç bulamıyor.</strong>
                       </p>
                       <p>
                          Bu verimsizlik sadece para kaybı değil, aynı zamanda zaman kaybı ve çevre kirliliği demek.
                       </p>
                       <p className="pl-6 border-l-4 border-brand-orange italic text-gray-700 font-medium">
                          "SeyirGo olarak biz, karmaşık telefon trafiğini ve güvensiz pazarlıkları bitirip; tek tuşla çalışan, şeffaf bir pazar yeri kurduk."
                       </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-12">
                       <div>
                          <div className="text-4xl font-black text-brand-dark mb-1">2024</div>
                          <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Kuruluş Yılı</div>
                       </div>
                       <div>
                          <div className="text-4xl font-black text-brand-dark mb-1">%100</div>
                          <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">Yerli Yazılım</div>
                       </div>
                    </div>
                 </div>

                 {/* Right: Visual Concept */}
                 <div className="relative">
                    <div className="aspect-square rounded-[2.5rem] bg-gray-100 overflow-hidden relative border border-gray-200 shadow-2xl">
                       {/* Background Map Effect */}
                       <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center grayscale"></div>
                       
                       {/* Floating Cards */}
                       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full p-8 flex flex-col justify-center items-center gap-6">
                          
                          {/* Shipper Card */}
                          <div className="bg-white p-5 rounded-2xl shadow-xl w-64 transform -rotate-6 translate-y-4 border border-gray-100 z-10">
                             <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-brand-dark"><Box size={20} /></div>
                                <div>
                                   <div className="text-xs font-bold text-gray-400 uppercase">Yük Veren</div>
                                   <div className="text-sm font-bold text-gray-900">İstanbul Fabrika</div>
                                </div>
                             </div>
                             <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-accent w-3/4"></div>
                             </div>
                             <div className="mt-2 text-[10px] text-right text-brand-accent font-bold">Araç Aranıyor...</div>
                          </div>

                          {/* Connection Line */}
                          <div className="h-12 w-0.5 border-l-2 border-dashed border-gray-300 z-0"></div>

                          {/* Carrier Card */}
                          <div className="bg-brand-dark p-5 rounded-2xl shadow-xl w-64 transform rotate-6 -translate-y-4 z-20">
                             <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-white/10 rounded-lg text-brand-orange"><Truck size={20} /></div>
                                <div>
                                   <div className="text-xs font-bold text-gray-400 uppercase">Taşıyıcı</div>
                                   <div className="text-sm font-bold text-white">34 AB 123</div>
                                </div>
                             </div>
                             <button className="w-full py-2 bg-brand-orange text-white text-xs font-bold rounded-lg hover:bg-white hover:text-brand-orange transition-colors">
                                Teklif Ver
                             </button>
                          </div>

                       </div>
                    </div>
                 </div>

              </div>
           </div>
        </section>

        {/* --- 3. BENTO GRID: MISSION & VALUES --- */}
        <section className="py-24 bg-gray-50/50 border-t border-gray-200">
           <div className="container mx-auto px-6 max-w-7xl">
              
              <div className="max-w-3xl mb-12">
                 <h2 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tight mb-6">Değerlerimiz</h2>
                 <p className="text-xl text-gray-500 font-light">
                    Sadece yazılım üretmiyoruz, lojistik sektöründe güven ve verimlilik kültürünü yeniden inşa ediyoruz.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(280px,auto)]">
                 
                 {/* 1. Large Card: Vision */}
                 <div className="md:col-span-2 lg:col-span-2 bg-brand-dark rounded-[2rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand-light/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10">
                       <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brand-accent mb-6 backdrop-blur-md">
                          <Globe size={32} />
                       </div>
                       <h3 className="text-3xl font-bold text-white mb-4">Global Vizyon</h3>
                       <p className="text-gray-300 text-lg leading-relaxed">
                          Hedefimiz sadece Türkiye'nin değil, bölgenin en büyük dijital lojistik ağı olmak. Sınırları kaldıran, veriye dayalı bir ekosistem yaratıyoruz.
                       </p>
                    </div>
                    <div className="mt-8 relative z-10">
                       <span className="text-brand-accent font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform cursor-pointer">
                          Geleceği Gör <ArrowRight size={20} />
                       </span>
                    </div>
                 </div>

                 {/* 2. Tall Card: Trust */}
                 <div className="md:col-span-1 lg:col-span-1 row-span-2 bg-white rounded-[2rem] p-8 border border-gray-200 flex flex-col shadow-sm hover:shadow-xl transition-shadow">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                       <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-4">Sıfır Risk Politikası</h3>
                    <p className="text-gray-500 mb-6 flex-grow">
                       SeyirGo'da anonimlik yoktur. Tüm taşıyıcılar belgeli, tüm yük verenler onaylıdır.
                    </p>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-bold text-gray-700">Belge Kontrolü</span>
                       </div>
                       <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-bold text-gray-700">Sigorta Güvencesi</span>
                       </div>
                       <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-bold text-gray-700">7/24 Canlı Destek</span>
                       </div>
                    </div>
                 </div>

                 {/* 3. Standard Card: Speed */}
                 <div className="md:col-span-1 bg-white rounded-[2rem] p-8 border border-gray-200 shadow-sm hover:border-brand-orange/50 transition-colors">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-brand-orange mb-6">
                       <Zap size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-brand-dark mb-3">Hız Odaklı</h3>
                    <p className="text-gray-500 text-sm">
                       Yapay zeka algoritmamız en uygun aracı milisaniyeler içinde bulur.
                    </p>
                 </div>

                 {/* 4. Standard Card: People */}
                 <div className="md:col-span-2 bg-brand-accent rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
                    <div className="relative z-10 text-white md:w-2/3">
                       <div className="flex items-center gap-3 mb-4">
                          <Users size={28} className="text-white" />
                          <h3 className="text-2xl font-bold">Önce İnsan</h3>
                       </div>
                       <p className="text-white/90 text-lg">
                          Teknoloji araçtır, asıl amacımız insanların hayatını kolaylaştırmaktır. Kamyoncu dostuyuz, KOBİ destekçisiyiz.
                       </p>
                    </div>
                    <div className="relative z-10 mt-6 md:mt-0">
                       <div className="text-5xl font-black text-white/30 group-hover:text-white/50 transition-colors">
                          %99
                       </div>
                       <div className="text-xs font-bold text-white/60 uppercase tracking-widest text-right">Memnuniyet</div>
                    </div>
                 </div>

                 {/* 5. Standard Card: Innovation */}
                 <div className="md:col-span-1 bg-gray-900 rounded-[2rem] p-8 text-white flex flex-col justify-center items-center text-center">
                    <Target size={40} className="text-brand-orange mb-4" />
                    <h3 className="text-xl font-bold mb-2">Hedef Odaklı</h3>
                    <p className="text-gray-400 text-sm">Her gün daha iyi bir sürüm.</p>
                 </div>

              </div>
           </div>
        </section>

        {/* --- 4. TEAM / CULTURE (Simplified) --- */}
        <section className="py-24 bg-white border-b border-gray-100">
           <div className="container mx-auto px-6 max-w-5xl text-center">
              <span className="text-brand-accent font-bold text-xs uppercase tracking-widest mb-4 block">Kültürümüz</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-8">
                 Arka Planda Büyük Bir Ekip Var
              </h2>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-12">
                 SeyirGo; yazılım mühendisleri, lojistik uzmanları ve operasyon yöneticilerinden oluşan tutkulu bir ekip tarafından İstanbul'da geliştirilmektedir.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="h-48 rounded-2xl bg-gray-100 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"></div>
                 <div className="h-48 rounded-2xl bg-gray-100 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500 md:mt-8"></div>
                 <div className="h-48 rounded-2xl bg-gray-100 bg-[url('https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"></div>
                 <div className="h-48 rounded-2xl bg-gray-100 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500 md:mt-8"></div>
              </div>
           </div>
        </section>

        {/* --- 5. CTA: Direct & Impactful --- */}
        <section className="py-24 bg-brand-dark relative overflow-hidden">
           {/* Grid Background */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
           
           <div className="container mx-auto px-6 relative z-10 text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                 Lojistiği Değiştirmeye <br />
                 <span className="text-brand-orange">Hazır Mısınız?</span>
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                 <a href="/kayit" className="bg-white text-brand-dark hover:bg-gray-100 font-bold py-4 px-10 rounded-xl shadow-2xl transition-transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    Hemen Başlayın <ArrowRight size={20} />
                 </a>
                 <a href="/iletisim" className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 font-bold py-4 px-10 rounded-xl transition-colors flex items-center justify-center">
                    Bizimle İletişime Geçin
                 </a>
              </div>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default CorporatePage;
