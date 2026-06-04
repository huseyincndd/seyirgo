'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getUserDisplayName, getUserInitials } from '@/lib/user-display';

interface DashboardPageHeaderProps {
  title?: string;
  subtitle?: string;
  firstName?: string;
  lastName?: string;
  role: 'shipper' | 'carrier';
  action?: { label: string; href: string };
}

export default function DashboardPageHeader({
  title = 'Genel Bakış',
  subtitle,
  firstName,
  lastName,
  role,
  action,
}: DashboardPageHeaderProps) {
  const name = getUserDisplayName(firstName, lastName);
  const initials = getUserInitials(firstName, lastName);
  const isShipper = role === 'shipper';
  const defaultSubtitle = isShipper
    ? `Hoş geldin ${firstName || 'Kullanıcı'}, yüklerini buradan yönet.`
    : `Hoş geldin ${firstName || 'Kullanıcı'}, yollar açık.`;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
      <div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">{title}</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle ?? defaultSubtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        {action && (
          <Link
            href={action.href}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-brand-dark text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-all shadow-sm"
          >
            <Plus size={16} /> {action.label}
          </Link>
        )}
        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-gray-200">
          <div
            className={`w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-sm ${
              isShipper ? 'bg-brand-dark' : 'bg-brand-orange'
            }`}
          >
            {initials}
          </div>
          <div className="text-sm leading-tight">
            <div className="font-bold text-slate-900">{name}</div>
            <div className="text-xs text-slate-500">{isShipper ? 'Yük Veren' : 'Taşıyıcı'}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
