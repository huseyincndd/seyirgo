'use client';

import React from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface EmptyPanelProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; href: string };
}

export default function EmptyPanel({ icon: Icon, title, description, action }: EmptyPanelProps) {
  return (
    <div className="p-10 text-center">
      <Icon size={40} className="text-gray-200 mx-auto mb-4" />
      <p className="font-bold text-slate-700">{title}</p>
      <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">{description}</p>
      {action && (
        <Link
          href={action.href}
          className="inline-flex mt-5 px-5 py-2.5 bg-brand-dark text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
