'use client';
import React, { useState } from 'react';
import { Search, MapPin, Truck, Package, ArrowRight, Loader2 } from 'lucide-react';
import { CITIES } from '@/app/data/locations';
import Link from 'next/link';

export default function QuickSearch() {
  const [searchType, setSearchType] = useState<'load' | 'vehicle'>('load');
  const [fromCountry, setFromCountry] = useState('Türkiye');
  const [fromCity, setFromCity] = useState('');
  const [toCountry, setToCountry] = useState('Türkiye');
  const [toCity, setToCity] = useState('');
  
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromCity && !toCity) return; // Require at least one city if possible, or just search
    
    setIsSearching(true);
    setHasSearched(false);
    
    // Simulate API call and random result count
    setTimeout(() => {
      // Mock logic: More results if city is Istanbul, etc.
      const base = searchType === 'load' ? 450 : 200;
      const randomOffset = Math.floor(Math.random() * 100);
      setResultCount(base + randomOffset);
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  const inputCls = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition-all placeholder:text-gray-400";

  return (
    <section className="py-16 bg-white relative z-10 -mt-12 sm:-mt-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
          
          {/* Header Tabs */}
          <div className="flex flex-row border-b border-gray-100">
            <button
              onClick={() => setSearchType('load')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 sm:py-5 text-sm sm:text-base font-bold transition-colors ${
                searchType === 'load' 
                  ? 'bg-brand-dark text-white' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Package size={20} />
              Yük Ara (Taşıyıcılar İçin)
            </button>
            <button
              onClick={() => setSearchType('vehicle')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 sm:py-5 text-sm sm:text-base font-bold transition-colors ${
                searchType === 'vehicle' 
                  ? 'bg-brand-orange text-white' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Truck size={20} />
              Araç Ara (Yük Verenler İçin)
            </button>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Hızlı Sorgulama</h2>
              <p className="text-sm text-gray-500 mt-2">Nereden nereye gitmek istediğinizi seçin, anında sistemdeki ilanları görüntüleyin.</p>
            </div>

            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Nereden */}
                <div className="relative">
                  <div className="absolute -left-3 top-4 w-1.5 h-1.5 rounded-full bg-brand-dark"></div>
                  <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-3 pl-2 flex items-center gap-2">
                    <MapPin size={16} className={searchType === 'load' ? 'text-brand-dark' : 'text-brand-orange'} /> 
                    Nereden (Kalkış)
                  </label>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      value={fromCountry} 
                      onChange={(e) => setFromCountry(e.target.value)} 
                      className={inputCls} 
                      placeholder="Ülke"
                    />
                    <select 
                      value={fromCity} 
                      onChange={(e) => setFromCity(e.target.value)} 
                      className={`${inputCls} appearance-none`}
                    >
                      <option value="">Tüm Şehirler</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Nereye */}
                <div className="relative">
                  <div className="absolute -left-3 top-4 w-1.5 h-1.5 rounded-full bg-brand-orange"></div>
                  <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-3 pl-2 flex items-center gap-2">
                    <MapPin size={16} className={searchType === 'load' ? 'text-brand-dark' : 'text-brand-orange'} /> 
                    Nereye (Varış)
                  </label>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      value={toCountry} 
                      onChange={(e) => setToCountry(e.target.value)} 
                      className={inputCls} 
                      placeholder="Ülke"
                    />
                    <select 
                      value={toCity} 
                      onChange={(e) => setToCity(e.target.value)} 
                      className={`${inputCls} appearance-none`}
                    >
                      <option value="">Tüm Şehirler</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="pt-4 border-t border-gray-100 flex justify-center">
                <button
                  type="submit"
                  disabled={isSearching}
                  className={`w-full md:w-auto px-12 py-4 rounded-xl text-white font-black text-lg shadow-xl shadow-[color:rgba(0,0,0,0.1)] flex items-center justify-center gap-3 transition-transform hover:-translate-y-0.5 active:scale-[0.98] ${
                    searchType === 'load' ? 'bg-brand-dark hover:bg-slate-800' : 'bg-brand-orange hover:bg-orange-600'
                  }`}
                >
                  {isSearching ? (
                    <><Loader2 size={24} className="animate-spin" /> Sorgulanıyor...</>
                  ) : (
                    <><Search size={24} /> İlanları Ara</>
                  )}
                </button>
              </div>
            </form>

            {/* Results Area */}
            <div className={`mt-8 overflow-hidden transition-all duration-500 ease-in-out ${hasSearched ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className={`p-6 rounded-2xl border ${searchType === 'load' ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100'} text-center space-y-4`}>
                <div className="flex items-center justify-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${searchType === 'load' ? 'bg-brand-dark text-white' : 'bg-brand-orange text-white'}`}>
                    {searchType === 'load' ? <Package size={24} /> : <Truck size={24} />}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Bulunan İlan Sayısı</p>
                    <p className={`text-4xl font-black ${searchType === 'load' ? 'text-brand-dark' : 'text-brand-orange'}`}>
                      {resultCount} <span className="text-lg font-medium text-gray-600">Aktif İlan</span>
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm max-w-lg mx-auto">
                  Belirttiğiniz rotada şu anda <span className="font-bold text-slate-800">{resultCount} adet</span> {searchType === 'load' ? 'yük' : 'araç'} ilanı bulunuyor.
                </p>

                <div className="pt-4">
                  <Link 
                    href="/giris" 
                    className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-colors ${
                      searchType === 'load' 
                        ? 'bg-brand-dark text-white hover:bg-slate-800' 
                        : 'bg-brand-orange text-white hover:bg-orange-600'
                    }`}
                  >
                    İlanların Devamını Görmek İçin Tıklayınız <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
