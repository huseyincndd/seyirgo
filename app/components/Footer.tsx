'use client';
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
            <div className="mb-6 bg-white w-fit p-2 rounded">
                 <img 
                  src="https://villaqrmenu.b-cdn.net/seyirgo/logoseyirgo.png" 
                  alt="SeyirGo Logo" 
                  className="h-12 w-auto"
                />
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              SeyirGo, Türkiye&apos;nin 81 iline hizmet veren, yük veren ile taşıyıcıyı en hızlı ve güvenli şekilde buluşturan dijital lojistik platformudur.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-2 rounded hover:bg-brand-accent transition"><Facebook size={18} /></a>
              <a href="#" className="bg-white/10 p-2 rounded hover:bg-brand-accent transition"><Twitter size={18} /></a>
              <a href="#" className="bg-white/10 p-2 rounded hover:bg-brand-accent transition"><Instagram size={18} /></a>
              <a href="#" className="bg-white/10 p-2 rounded hover:bg-brand-accent transition"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-brand-light pb-2 inline-block">Hızlı Erişim</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-brand-accent transition">Anasayfa</a></li>
              <li><a href="#" className="hover:text-brand-accent transition">Kurumsal</a></li>
              <li><a href="#" className="hover:text-brand-accent transition">Hizmetlerimiz</a></li>
              <li><a href="#" className="hover:text-brand-accent transition">Hesapla</a></li>
              <li><a href="#" className="hover:text-brand-accent transition">Blog</a></li>
              <li><a href="#" className="hover:text-brand-accent transition">İletişim</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-brand-light pb-2 inline-block">Yasal</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-brand-accent transition">Kullanım Koşulları</a></li>
              <li><a href="#" className="hover:text-brand-accent transition">Gizlilik Politikası</a></li>
              <li><a href="#" className="hover:text-brand-accent transition">KVKK Aydınlatma</a></li>
              <li><a href="#" className="hover:text-brand-accent transition">Çerez Politikası</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-brand-light pb-2 inline-block">İletişim</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-brand-accent shrink-0" />
                <span>Teknopark İstanbul, Sanayi Mah.<br />Pendik / İstanbul</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-brand-accent shrink-0" />
                <span>0850 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-brand-accent shrink-0" />
                <span>info@seyirgo.net</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-light pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SeyirGo Lojistik A.Ş. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
