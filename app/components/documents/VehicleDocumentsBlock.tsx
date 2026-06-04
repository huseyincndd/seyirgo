'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/client-api';
import { DemoDocumentRow, type DocStatus } from './DemoDocumentRow';

interface VehicleDocItem {
  type: string;
  title: string;
  description: string;
  hint?: string;
  required: boolean;
  status: DocStatus;
  demoFileName?: string | null;
  id: string | null;
}

interface VehicleDocumentsBlockProps {
  vehicleId: string;
  plate: string;
  defaultOpen?: boolean;
}

export function VehicleDocumentsBlock({
  vehicleId,
  plate,
  defaultOpen = false,
}: VehicleDocumentsBlockProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [items, setItems] = useState<VehicleDocItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await apiFetch<{ items: VehicleDocItem[] }>(
      `/api/documents/vehicle/${vehicleId}`
    );
    if (res.success && res.data) {
      setItems(res.data.items);
    }
    setLoading(false);
    setLoaded(true);
  }, [vehicleId]);

  useEffect(() => {
    if (open && !loaded) {
      load();
    }
  }, [open, loaded, load]);

  return (
    <div className="mt-3 border-t border-gray-100 pt-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left text-xs font-semibold text-gray-600 hover:text-brand-dark"
      >
        <span>Araç belgeleri (demo) — {plate}</span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <div className="mt-2 bg-gray-50/80 rounded-xl px-3">
          {loading && (
            <div className="flex justify-center py-4">
              <Loader2 size={18} className="animate-spin text-gray-400" />
            </div>
          )}
          {!loading &&
            items.map((item) => (
              <DemoDocumentRow
                key={item.type}
                title={item.title}
                description={item.description}
                hint={item.hint}
                required={item.required}
                status={item.status}
                demoFileName={item.demoFileName}
                onSubmit={async () => {
                  const res = await apiFetch(`/api/documents/vehicle/${vehicleId}`, {
                    method: 'POST',
                    body: JSON.stringify({ type: item.type }),
                  });
                  if (res.success) await load();
                }}
                onVerify={async () => {
                  if (!item.id) return;
                  const res = await apiFetch(
                    `/api/documents/vehicle/doc/${item.id}/verify`,
                    { method: 'POST' }
                  );
                  if (res.success) await load();
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
}

