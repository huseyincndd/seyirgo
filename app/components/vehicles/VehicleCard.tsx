'use client';

import React, { useState } from 'react';
import { Truck, Trash2, ChevronDown, ChevronUp, AlertCircle, FileText, Ruler, CheckCircle2 } from 'lucide-react';
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
      className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${
        highlight ? 'border-brand-orange ring-2 ring-brand-orange/20' : 'border-gray-200'
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
              <Truck size={26} className="text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-slate-900 text-xl tracking-tight truncate flex flex-wrap items-center gap-2">
                {vehicle.plate}
                {!vehicle.isActive && (
                   <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                     <AlertCircle size={10} />
                     Belge Bekliyor
                   </span>
                )}
              </h3>
              <p className="text-sm font-medium text-gray-500 truncate mt-0.5">
                {[vehicle.brand, vehicle.model, vehicle.year].filter(Boolean).join(' · ')}
              </p>
            </div>
          </div>
          {vehicle.isActive && (
            <span
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border shrink-0 ${s.color}`}
            >
              <span className={`w-2 h-2 rounded-full ${s.dot}`} />
              {s.label}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <InfoPill label="Tip / Kasa" value={`${vehicle.type}${vehicle.bodyType ? ` (${vehicle.bodyType})` : ''}`} />
          <InfoPill label="Kapasite" value={vehicle.capacityLabel ?? `${vehicle.capacity} ton`} />
          <InfoPill label="Hacim" value={vehicle.volume ? `${vehicle.volume} m³` : '—'} />
          <InfoPill label="Dorse" value={vehicle.trailerType || '—'} />
        </div>

        {((vehicle.length && vehicle.width && vehicle.height) || (vehicle.features && vehicle.features.length > 0)) && (
          <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 mb-4">
            {vehicle.length && vehicle.width && vehicle.height && (
              <div className="flex items-center gap-4 mb-3 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <Ruler size={16} className="text-gray-400" />
                  <span><strong className="text-slate-800">{vehicle.length}</strong>m x <strong className="text-slate-800">{vehicle.width}</strong>m x <strong className="text-slate-800">{vehicle.height}</strong>m</span>
                </div>
              </div>
            )}
            
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {vehicle.features.map(f => (
                  <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
                    <CheckCircle2 size={12} className="text-brand-orange" />
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setDocsOpen(!docsOpen)}
          className="w-full flex items-center justify-between text-sm font-bold text-gray-700 py-3 px-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all"
        >
          <span className="flex items-center gap-2">
             <FileText size={16} className="text-brand-dark" />
             Araç belgeleri (demo)
          </span>
          {docsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {docsOpen && (
          <div className="mt-3 px-1 animate-in slide-in-from-top-2 duration-200">
            <VehicleDocumentsBlock
              vehicleId={vehicle.id}
              plate={vehicle.plate}
              defaultOpen
            />
          </div>
        )}

        <div className="flex gap-2 pt-5 mt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => onDelete(vehicle.id)}
            className="flex-1 py-3 border border-red-100 bg-red-50/50 rounded-xl text-xs font-bold text-red-600 hover:bg-red-100 hover:border-red-200 transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            Aracı Sil
          </button>
        </div>
      </div>
    </article>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-slate-800 mt-1 truncate">{value}</p>
    </div>
  );
}
