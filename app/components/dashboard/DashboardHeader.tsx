
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  Menu,
  X,
  User2,
  Settings,
  LogOut,
  HelpCircle,
  Package,
  Truck,
  CheckCircle
} from 'lucide-react';

interface DashboardHeaderProps {
  userType: 'shipper' | 'carrier';
  userName?: string;
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

// Örnek bildirimler
const NOTIFICATIONS = [
  { id: 1, title: 'Yeni Teklif Geldi', desc: 'İstanbul - Ankara yükünüz için yeni bir teklif var.', time: '2 dk önce', unread: true, type: 'offer' },
  { id: 2, title: 'Taşıma Tamamlandı', desc: '#8821 no\'lu taşıma başarıyla teslim edildi.', time: '1 saat önce', unread: true, type: 'success' },
  { id: 3, title: 'Ödeme Alındı', desc: 'Hesabınıza 12.500 TL ödeme girişi yapıldı.', time: '3 saat önce', unread: false, type: 'info' },
];

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userType, 
  userName = 'Kullanıcı',
  onMenuToggle,
  isMobileMenuOpen = false
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const isShipper = userType === 'shipper';
  const accentText = isShipper ? 'text-brand-dark' : 'text-brand-orange';
  const accentBg = isShipper ? 'bg-brand-dark' : 'bg-brand-orange';
  const ringFocus = isShipper ? 'focus:ring-brand-dark/20' : 'focus:ring-brand-orange/20';
  
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-[45] shadow-sm">
      
      {/* Left Side - Mobile Menu & Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center w-full max-w-md">
          <div className="relative w-full group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
            <input
              type="text"
              placeholder="İlan no, plaka veya şehir ara..."
              className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 placeholder:text-gray-400 outline-none focus:bg-white focus:border-gray-300 focus:ring-4 transition-all ${ringFocus}`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
               <span className="text-[10px] font-bold text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">⌘K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-3 lg:gap-5">
        
        {/* Mobile Search Trigger */}
        <button className="md:hidden p-2.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className={`relative p-2.5 rounded-full transition-all duration-200 ${showNotifications ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-500'}`}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)}></div>
              <div className="absolute right-0 top-full mt-3 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <h3 className="font-bold text-slate-900 text-sm">Bildirimler</h3>
                  <button className={`text-xs font-bold ${accentText} hover:underline`}>
                    Tümünü Okundu Say
                  </button>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {NOTIFICATIONS.length > 0 ? NOTIFICATIONS.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors relative ${notif.unread ? 'bg-blue-50/30' : ''}`}
                    >
                      {notif.unread && <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentBg}`}></div>}
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                           notif.type === 'offer' ? 'bg-yellow-100 text-yellow-600' :
                           notif.type === 'success' ? 'bg-green-100 text-green-600' :
                           'bg-blue-100 text-blue-600'
                        }`}>
                           {notif.type === 'success' ? <CheckCircle size={14} /> : <Bell size={14} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900">{notif.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.desc}</p>
                          <p className="text-[10px] text-gray-400 mt-1.5 font-medium">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  )) : (
                     <div className="p-8 text-center text-gray-500 text-sm">Hiç bildiriminiz yok.</div>
                  )}
                </div>
                <div className="p-3 border-t border-gray-100 text-center bg-gray-50/50">
                  <Link href="/bildirimler" className={`text-xs font-bold ${accentText} hover:underline`}>
                    Tüm Geçmişi Gör
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

        {/* Profile */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className={`flex items-center gap-3 pl-1 pr-2 py-1 rounded-full border transition-all duration-200 group ${
               showProfile ? 'bg-gray-50 border-gray-200 ring-2 ring-gray-100' : 'border-transparent hover:bg-gray-50'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm ${accentBg}`}>
              {userName.charAt(0)}
            </div>
            <div className="hidden lg:block text-left mr-1">
              <p className="text-xs font-bold text-slate-900 leading-none mb-0.5">{userName}</p>
              <p className="text-[10px] text-gray-500 font-medium">{isShipper ? 'Yük Veren' : 'Taşıyıcı'}</p>
            </div>
            <ChevronDown size={14} className={`hidden lg:block text-gray-400 transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <>
               <div className="fixed inset-0 z-30" onClick={() => setShowProfile(false)}></div>
               <div className="absolute right-0 top-full mt-3 w-[240px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                     <p className="text-sm font-black text-slate-900">{userName}</p>
                     <p className="text-xs text-gray-500 mt-0.5 font-medium truncate">ahmet@firma.com</p>
                     <div className={`mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isShipper ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {isShipper ? <Package size={10} /> : <Truck size={10} />}
                        {isShipper ? 'Kurumsal Hesap' : 'Onaylı Taşıyıcı'}
                     </div>
                  </div>
                  <div className="py-2">
                     <Link href="/ayarlar" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <User2 size={16} className="text-gray-400" /> Profilim
                     </Link>
                     <Link href="/ayarlar" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Settings size={16} className="text-gray-400" /> Ayarlar
                     </Link>
                     <Link href="/yardim" className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <HelpCircle size={16} className="text-gray-400" /> Yardım Merkezi
                     </Link>
                  </div>
                  <div className="border-t border-gray-100 py-2 bg-red-50/10">
                     <button className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors w-full text-left">
                        <LogOut size={16} /> Çıkış Yap
                     </button>
                  </div>
               </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
