import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import InfoSection from './components/InfoSection';
import SimpleSteps from './components/SimpleSteps';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <SimpleSteps />
        <Features />
        <InfoSection />
        
        
        {/* CTA Banner Section */}
        <section className="bg-brand-accent py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Hemen Başlamaya Hazır Mısınız?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              SeyirGo ailesine katılın, yükünüzü hafifletin veya aracınızla kazanmaya başlayın.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/kayit?tab=yuk-veren" className="bg-white text-brand-accent hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition">
                Yük Ver (Ücretsiz)
              </a>
              <a href="/kayit?tab=yuk-tasiyan" className="bg-brand-dark text-white hover:bg-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transition">
                Taşıyıcı Ol
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
