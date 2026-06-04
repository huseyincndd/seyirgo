'use client';

import React, { useState } from 'react';
import { FileText, CheckCircle2, Clock, Loader2 } from 'lucide-react';

export type DocStatus = 'MISSING' | 'PENDING' | 'APPROVED' | 'REJECTED';

interface DemoDocumentRowProps {
  title: string;
  description: string;
  hint?: string;
  required?: boolean;
  status: DocStatus;
  demoFileName?: string | null;
  onSubmit: () => Promise<void>;
  onVerify: () => Promise<void>;
}

const STATUS_BADGE: Record<DocStatus, { label: string; className: string }> = {
  MISSING: { label: 'Eksik', className: 'bg-gray-100 text-gray-600' },
  PENDING: { label: 'İnceleniyor', className: 'bg-amber-50 text-amber-700' },
  APPROVED: { label: 'Onaylandı', className: 'bg-green-50 text-green-700' },
  REJECTED: { label: 'Reddedildi', className: 'bg-red-50 text-red-600' },
};

export function DemoDocumentRow({
  title,
  description,
  hint,
  required = true,
  status,
  demoFileName,
  onSubmit,
  onVerify,
}: DemoDocumentRowProps) {
  const [busy, setBusy] = useState<'submit' | 'verify' | null>(null);
  const badge = STATUS_BADGE[status];

  const handleSubmit = async () => {
    setBusy('submit');
    try {
      await onSubmit();
    } finally {
      setBusy(null);
    }
  };

  const handleVerify = async () => {
    setBusy('verify');
    try {
      await onVerify();
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 py-4 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
        <FileText size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {!required && (
            <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Opsiyonel
            </span>
          )}
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badge.className}`}>
            {badge.label}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
        {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
        {demoFileName && status !== 'MISSING' && (
          <p className="text-[11px] text-brand-dark/70 mt-1.5 font-medium">
            Demo dosya: {demoFileName}
          </p>
        )}
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {status === 'APPROVED' ? (
          <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium px-2 py-1">
            <CheckCircle2 size={14} />
            Tamam
          </span>
        ) : (
          <>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={busy !== null || status === 'PENDING'}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              {busy === 'submit' ? (
                <Loader2 size={12} className="animate-spin" />
              ) : status === 'PENDING' ? (
                'Gönderildi'
              ) : (
                'Demo gönder'
              )}
            </button>
            <button
              type="button"
              onClick={handleVerify}
              disabled={busy !== null || status === 'MISSING'}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-brand-dark text-white hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              {busy === 'verify' ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                'Demo doğrula'
              )}
            </button>
          </>
        )}
        {status === 'PENDING' && (
          <Clock size={14} className="text-amber-500 ml-0.5" />
        )}
      </div>
    </div>
  );
}

