'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2, Info, ChevronRight } from 'lucide-react';
import { apiFetch } from '@/lib/client-api';
import { useSession } from '@/app/providers/SessionProvider';
import { DemoDocumentRow, type DocStatus } from './DemoDocumentRow';

interface DocItem {
  type: string;
  title: string;
  description: string;
  hint?: string;
  status: DocStatus;
  demoFileName?: string | null;
}

interface UserDocumentsPanelProps {
  role: 'carrier' | 'shipper';
  onboarding?: boolean;
}

export function UserDocumentsPanel({ role, onboarding = false }: UserDocumentsPanelProps) {
  const router = useRouter();
  const { refresh } = useSession();
  const [items, setItems] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await apiFetch<{ items: DocItem[] }>('/api/documents/user');
    if (res.success && res.data) {
      setItems(res.data.items);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const allSubmitted = items.length > 0 && items.every((i) => i.status === 'PENDING' || i.status === 'APPROVED');
  const allApproved = items.length > 0 && items.every((i) => i.status === 'APPROVED');

  const handleContinue = async () => {
    await refresh();
    if (role === 'carrier') {
      router.push('/carrier/araclarim?onboarding=1');
    } else {
      router.push('/shipper');
    }
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-brand-dark" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {onboarding && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
          <Info className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-semibold text-amber-900">Demo belge akışı</p>
            <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
              Gerçek dosya yüklemesi yok. Her belge için küçük <strong>Demo gönder</strong> ve
              sunumda onay simülasyonu için <strong>Demo doğrula</strong> kullanın.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-dark/10 flex items-center justify-center text-brand-dark">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Firma Belgeleri</h1>
            <p className="text-xs text-gray-500">
              {role === 'carrier'
                ? 'Taşımacılık yetkisi ve sürücü belgeleri — metin açıklamalı demo'
                : 'Yük ilanı için firma doğrulama belgeleri — demo'}
            </p>
          </div>
        </div>
        <div className="px-5">
          {items.map((item) => (
            <DemoDocumentRow
              key={item.type}
              title={item.title}
              description={item.description}
              hint={item.hint}
              status={item.status}
              demoFileName={item.demoFileName}
              onSubmit={async () => {
                const res = await apiFetch('/api/documents/user', {
                  method: 'POST',
                  body: JSON.stringify({ type: item.type }),
                });
                if (res.success) await load();
              }}
              onVerify={async () => {
                const res = await apiFetch(`/api/documents/user/${item.type}/verify`, {
                  method: 'POST',
                });
                if (res.success) {
                  await load();
                  await refresh();
                }
              }}
            />
          ))}
        </div>
      </div>

      {onboarding && allSubmitted && (
        <button
          type="button"
          onClick={handleContinue}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-dark text-white rounded-xl font-semibold text-sm hover:opacity-95 transition-opacity"
        >
          {allApproved ? 'Belgeler onaylı — devam et' : 'Belgeler gönderildi — devam et'}
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

