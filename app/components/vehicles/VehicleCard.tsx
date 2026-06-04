'use client';

import React, { useState } from 'react';
import { Truck, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Vehicle } from '@/app/types';
import { VehicleDocumentsBlock } from '@/app/components/documents/VehicleDocumentsBlock';

const STATUS_MAP: Record<string, { label: string; color: string; dot: string }> = {
  available: { label: 'Müsait', color: 'bg-green-50 text-green-700 border-green-100', dot: 'bg-green-500' },
  active: { label: 'Yolda', color: 'bg-blue-50 text-blue-700 border-blue-100', dot: 'bg-blue-500 animate-pulse' },
  maintenance: { label: 'Bakımda', color: 'bg-yellow-50 text-yellow-700 border-yellow-100', dot: 'bg-yellow-400' },
};

interface VehicleCardProps {
  vehicle: Vehicle;
  highlight?: boolean;
  onDelete: (id: string) => void;
}

export function VehicleCard({ vehicle, highlight = false, onDelete }: VehicleCardProps) {
  const [docsOpen, setDocsOpen] = useState(highlight);
  const s = STATUS_MAP[vehicle.status] ?? STATUS_MAP.available;

  return (
    <article
      className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${
        highlight ? 'border-brand-orange ring-2 ring-brand-orange/20' : 'border-gray-200'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Truck size={22} className="text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-slate-900 text-lg tracking-wide truncate">
                {vehicle.plate}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {[vehicle.brand, vehicle.model, vehicle.year].filter(Boolean).join(' · ')}
              </p>
            </div>
          </div>
          <span
            className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${s.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <InfoPill label="Tip" value={vehicle.type} />
          <InfoPill label="Kapasite" value={vehicle.capacityLabel ?? `${vehicle.capacity} ton`} />
        </div>

        <button
          type="button"
          onClick={() => setDocsOpen(!docsOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-gray-600 py-2 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span>Araç belgeleri (demo)</span>
          {docsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {docsOpen && (
          <div className="mt-2 px-1">
            <VehicleDocumentsBlock
              vehicleId={vehicle.id}
              plate={vehicle.plate}
              defaultOpen
            />
          </div>
        )}

        <div className="flex gap-2 pt-4 mt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => onDelete(vehicle.id)}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Trash2 size={14} />
            Sil
          </button>
        </div>
      </div>
    </article>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl px-3 py-2.5">
      <p className="text-[10px] font-bold text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">{value}</p>
    </div>
  );
}

