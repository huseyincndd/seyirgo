import React from 'react';
import Link from 'next/link';
import { LucideIcon, Plus, FileText, Truck, ChevronRight, Route, Package } from 'lucide-react';

interface QuickAction {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: 'blue' | 'orange' | 'green' | 'purple';
}

interface QuickActionsProps {
  userType: 'shipper' | 'carrier';
}

const SHIPPER_ACTIONS: QuickAction[] = [
  { 
    label: 'Yeni Yük İlanı', 
    description: 'Yeni bir yük ilanı oluştur',
    href: '/shipper/yeni-ilan',
    icon: Plus,
    color: 'blue'
  },
  { 
    label: 'Teklifleri İncele', 
    description: 'Gelen teklifleri görüntüle',
    href: '/shipper/teklifler',
    icon: FileText,
    color: 'green'
  },
  { 
    label: 'Aktif Taşımalar', 
    description: 'Devam eden taşımaları takip et',
    href: '/shipper/aktif-tasimalar',
    icon: Truck,
    color: 'purple'
  },
];

const CARRIER_ACTIONS: QuickAction[] = [
  { 
    label: 'Rota Ekle', 
    description: 'Yeni rota oluştur, yük bul',
    href: '/carrier/rota-ekle',
    icon: Plus,
    color: 'orange'
  },
  { 
    label: 'Uygun Yükler', 
    description: 'Rotalarına eşleşen yükleri gör',
    href: '/carrier/uygun-yukler',
    icon: Package,
    color: 'purple'
  },
  { 
    label: 'Tekliflerim', 
    description: 'Verdiğin teklifleri görüntüle',
    href: '/carrier/tekliflerim',
    icon: FileText,
    color: 'green'
  },
];

const colorClasses = {
  blue: 'bg-blue-50 text-brand-dark hover:bg-blue-100 border-blue-100',
  orange: 'bg-orange-50 text-brand-orange hover:bg-orange-100 border-orange-100',
  green: 'bg-green-50 text-green-600 hover:bg-green-100 border-green-100',
  purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-100',
};

const QuickActions: React.FC<QuickActionsProps> = ({ userType }) => {
  const actions = userType === 'shipper' ? SHIPPER_ACTIONS : CARRIER_ACTIONS;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Hızlı İşlemler</h3>
      
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          const colors = colorClasses[action.color];
          
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all group ${colors}`}
            >
              <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center flex-shrink-0">
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{action.label}</p>
                <p className="text-xs opacity-70">{action.description}</p>
              </div>
              <ChevronRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
