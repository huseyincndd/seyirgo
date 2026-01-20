
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Truck,
  FileText,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User2,
  Bell,
  Search,
  Plus,
  MapPin,
  Clock,
  Star,
  Building2,
  Route,
  Navigation,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  userType: 'shipper' | 'carrier';
  userName?: string;
  companyName?: string;
  onClose?: () => void; // For mobile menu closing
}

// Menü öğeleri - Yük Veren için
const SHIPPER_MENU = [
  { id: 'sb-dash', label: 'Genel Bakış', href: '/shipper', icon: LayoutDashboard },
  { id: 'sb-loads', label: 'Yüklerim', href: '/shipper/yukler', icon: Package },
  { id: 'sb-new', label: 'Yeni Yük İlanı', href: '/shipper/yeni-ilan', icon: Plus },
  { id: 'sb-offers', label: 'Teklifler', href: '/shipper/teklifler', icon: FileText },
  { id: 'sb-active', label: 'Aktif Taşımalar', href: '/shipper/aktif-tasimalar', icon: Truck },
  { id: 'sb-history', label: 'Geçmiş', href: '/shipper/gecmis', icon: Clock },
  { id: 'sb-payments', label: 'Ödemeler', href: '/shipper/odemeler', icon: Wallet },
];

// Menü öğeleri - Taşıyıcı için
const CARRIER_MENU = [
  { id: 'cb-dash', label: 'Genel Bakış', href: '/carrier', icon: LayoutDashboard },
  { id: 'cb-routes', label: 'Rotalarım', href: '/carrier/rotalarim', icon: Route },
  { id: 'cb-new-route', label: 'Rota Ekle', href: '/carrier/rota-ekle', icon: Plus },
  { id: 'cb-loads', label: 'Uygun Yükler', href: '/carrier/uygun-yukler', icon: Package },
  { id: 'cb-offers', label: 'Tekliflerim', href: '/carrier/tekliflerim', icon: FileText },
  { id: 'cb-active', label: 'Aktif Taşımalar', href: '/carrier/aktif-tasimalar', icon: Truck },
  { id: 'cb-vehicles', label: 'Araçlarım', href: '/carrier/araclarim', icon: Navigation },
  { id: 'cb-history', label: 'Geçmiş', href: '/carrier/gecmis', icon: Clock },
  { id: 'cb-earnings', label: 'Kazançlar', href: '/carrier/kazanclar', icon: Wallet },
];

const BOTTOM_MENU = [
  { label: 'Ayarlar', href: '/ayarlar', icon: Settings },
  { label: 'Yardım', href: '/yardim', icon: HelpCircle },
];

const Sidebar: React.FC<SidebarProps> = ({ 
  userType, 
  userName = 'Kullanıcı',
  companyName = 'Firma Adı',
  onClose
}) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isShipper = userType === 'shipper';
  const menuItems = isShipper ? SHIPPER_MENU : CARRIER_MENU;
  
  // Theme Config
  const activeClass = isShipper 
    ? 'bg-brand-dark text-white shadow-md shadow-brand-dark/20' 
    : 'bg-brand-orange text-white shadow-md shadow-brand-orange/20';
    
  const badgeClass = isShipper
    ? 'bg-blue-50 text-brand-dark border-blue-100'
    : 'bg-orange-50 text-brand-orange border-orange-100';

  const isActive = (href: string) => {
    // Exact match for root dashboard pages, startsWith for subpages
    if (href === '/shipper' || href === '/carrier') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside 
      className={`
        bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300 ease-in-out relative
        ${isCollapsed ? 'w-[80px]' : 'w-[280px]'}
      `}
    >
      {/* Logo Area */}
      <div className={`h-[72px] flex items-center border-b border-gray-100 px-5 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed ? (
          <Link href="/" onClick={onClose} className="flex-shrink-0">
            <img 
              src="https://villaqrmenu.b-cdn.net/seyirgo/logoseyirgo.png" 
              alt="SeyirGo" 
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>
        ) : (
          <Link href="/" onClick={onClose} className="flex items-center justify-center">
            <div className={`w-10 h-10 ${isShipper ? 'bg-brand-dark' : 'bg-brand-orange'} rounded-xl flex items-center justify-center shadow-md`}>
              <span className="text-white font-black text-xl">S</span>
            </div>
          </Link>
        )}
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors hidden lg:flex`}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* User Profile Card */}
      <div className={`p-4 ${isCollapsed ? 'px-2' : ''}`}>
        <div className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${isCollapsed ? 'justify-center border-transparent' : 'border-gray-100 bg-gray-50/50'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm ${isShipper ? 'bg-brand-dark' : 'bg-brand-orange'}`}>
            {userName.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
              <p className="text-[10px] text-gray-500 font-medium truncate uppercase tracking-wide">{companyName}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
        
        {/* Main Section */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Ana Menü
            </div>
          )}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  id={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 group
                    ${isCollapsed ? 'justify-center' : ''}
                    ${active 
                      ? activeClass
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon 
                    size={20} 
                    className={`transition-colors ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} 
                    strokeWidth={active ? 2.5 : 2}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Divider & Secondary Section */}
        <div>
           {!isCollapsed && (
            <div className="px-2 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Hesap & Destek
            </div>
          )}
          <nav className="space-y-1">
            {BOTTOM_MENU.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 group
                    ${isCollapsed ? 'justify-center' : ''}
                    ${active 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-100 bg-white">
        {!isCollapsed && (
           <div className={`mb-4 px-3 py-2 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 ${badgeClass}`}>
              {isShipper ? <ShieldCheck size={14} /> : <Truck size={14} />}
              {isShipper ? 'Yük Veren Hesabı' : 'Taşıyıcı Hesabı'}
           </div>
        )}
        <button
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all w-full
            text-red-600 hover:bg-red-50
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut size={20} strokeWidth={2.5} />
          {!isCollapsed && <span>Çıkış Yap</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
