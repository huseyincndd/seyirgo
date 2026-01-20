'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, Facebook, Linkedin, Instagram, Youtube, Globe, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { NAV_ITEMS, CONTACT_INFO } from '../constants';

interface NavbarProps {
  variant?: 'default' | 'solid' | 'white';
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'default' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Styles
  const isSolid = variant === 'solid';
  const isWhite = variant === 'white';
  
  // NAVBAR FIXED BEHAVIOR:
  // If solid (Auth pages): Always white, always full padding, always shadow.
  // If white (Corporate pages): Always white with full features, SAME SIZE as default.
  // If default (Home): Transparent initially, becomes white on scroll, SAME SIZE always.
  
  const navbarBg = isSolid 
    ? 'bg-white shadow-sm border-b border-gray-200 py-4 lg:py-5' // Increased padding for solid state
    : isWhite
      ? 'bg-white shadow-sm border-b border-gray-100 py-4' // Always white for corporate - SAME padding as scrolled
      : scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 py-4' 
        : 'bg-transparent py-4 border-b border-gray-200/30';
    
  const textColor = 'text-brand-dark';
  const logoHeight = isSolid ? 'h-10 lg:h-12' : 'h-10 lg:h-12'; // SAME logo size for default and white variants

  return (
    <header className={`w-full fixed top-0 left-0 z-[60] transition-all duration-300 ease-in-out ${navbarBg}`}>
      
      {/* Top Bar - Desktop Only - COMPLETELY HIDDEN ON SOLID PAGES per request for cleaner look */}
      {!isSolid && (
        <div className={`hidden lg:block border-b mb-2 pb-2 transition-colors duration-500 ${scrolled || isWhite ? 'border-gray-100' : 'border-gray-200/50'}`}>
          <div className="max-w-[1600px] mx-auto px-8 flex justify-between items-center h-6 text-xs font-medium">
             <div className="flex items-center gap-6">
                <div className={`flex items-center gap-6 ${textColor}`}>
                  <a href={`tel:${CONTACT_INFO.phone1.replace(/\s/g, '')}`} className="flex items-center hover:text-brand-accent transition group font-semibold">
                     <Phone size={14} className="mr-2 text-brand-orange" /> 
                     <span className="tracking-wide">{CONTACT_INFO.phone1}</span>
                  </a>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center hover:text-brand-accent transition font-medium">
                     <Mail size={14} className="mr-2 text-brand-light" /> {CONTACT_INFO.email}
                  </a>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <a href="#" className={`flex items-center gap-1.5 transition hover:text-brand-accent ${textColor} font-bold`}>
                   <Globe size={13} /> TR
                </a>
             </div>
          </div>
        </div>
      )}

      {/* Main Navbar Content */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-50 relative group">
            <img 
              src="https://villaqrmenu.b-cdn.net/seyirgo/logoseyirgo.png" 
              alt="SeyirGo Logo" 
              className={`transition-all duration-300 object-contain ${logoHeight}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <nav className="flex space-x-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-bold tracking-wide uppercase transition duration-300 relative group py-2 ${textColor} hover:text-brand-accent`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            <div className={`flex items-center space-x-4 border-l border-gray-300 pl-8`}>
               {/* Hide Login/Register buttons if we are ON the Login/Register page (solid variant) */}
               {!isSolid && (
                 <>
                   <Link href="/giris" className={`text-sm font-bold px-4 py-2 transition flex items-center gap-2 ${textColor} hover:text-brand-accent`}>
                     <LogIn size={18} /> Giriş
                   </Link>
                   <Link href="/kayit" className="bg-brand-dark hover:bg-brand-accent text-white px-6 py-2.5 rounded-sm font-bold transition shadow-lg shadow-brand-dark/20 text-sm flex items-center gap-2 tracking-wide uppercase">
                     <UserPlus size={18} /> Kayıt Ol
                   </Link>
                 </>
               )}
               {isSolid && (
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <ShieldCheck size={16} className="text-brand-accent"/>
                    Güvenli Giriş
                  </div>
               )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2 z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none rounded-lg text-brand-dark"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 lg:hidden transition-all duration-300 ease-in-out flex flex-col pt-32 px-6 pb-6 overflow-y-auto ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <nav className="space-y-6 mb-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-xl font-bold text-gray-800 hover:text-brand-accent border-b border-gray-100 pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-4 mb-8">
          <Link href="/kayit" className="w-full bg-brand-dark text-white py-4 rounded-sm font-bold text-lg shadow-xl flex items-center justify-center gap-2 uppercase tracking-wider" onClick={() => setIsMenuOpen(false)}>
             <UserPlus size={20} /> Kayıt Ol
          </Link>
          <Link href="/giris" className="w-full bg-gray-100 text-brand-dark py-4 rounded-sm font-bold text-lg hover:bg-gray-200 flex items-center justify-center gap-2 uppercase tracking-wider" onClick={() => setIsMenuOpen(false)}>
             <LogIn size={20} /> Giriş Yap
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;