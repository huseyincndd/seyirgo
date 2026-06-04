'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Truck,
  Plus,
  CheckCircle,
  Wrench,
  Loader2,
  Navigation,
} from 'lucide-react';
import { apiFetch } from '@/lib/client-api';
import { useSession } from '@/app/providers/SessionProvider';
import type { Vehicle } from '@/app/types';
import { AddVehicleSheet } from '@/app/components/vehicles/AddVehicleSheet';
import { VehicleCard } from '@/app/components/vehicles/VehicleCard';

export default function AraclarimPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useSession();

  const [isOnboarding, setIsOnboarding] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [fleetCount, setFleetCount] = useState(0);

  const loadVehicles = useCallback(async () => {
    setLoading(true);
    const res = await apiFetch<Vehicle[]>('/api/vehicles');
    if (res.success && res.data) {
      setVehicles(res.data);
      setFleetCount(res.data.length);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadVehicles();
    const onboarding = searchParams.get('onboarding') === '1';
    setIsOnboarding(onboarding);
    if (onboarding) setShowAdd(true);
  }, [loadVehicles, searchParams]);

  const handleVehicleAdded = async (vehicle: Vehicle) => {
    await loadVehicles();
    await refresh();
    setHighlightId(vehicle.id);
  };

  const handleSheetClose = () => {
    setShowAdd(false);
    if (isOnboarding && fleetCount > 0) {
      router.push('/carrier');
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu aracı filonuzdan kaldırmak istediğinize emin misiniz?')) return;
    const res = await apiFetch(`/api/vehicles/${id}`, { method: 'DELETE' });
    if (res.success) {
      if (highlightId === id) setHighlightId(null);
      await loadVehicles();
      await refresh();
    }
  };

  const counts = {
    available: vehicles.filter((v) => v.status === 'available').length,
    transit: vehicles.filter((v) => v.status === 'active').length,
    service: vehicles.filter((v) => v.status === 'maintenance').length,
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-orange" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-24">
      <div className="bg-gradient-to-br from-brand-dark via-slate-900 to-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-5 pt-8 pb-10">
          {isOnboarding && (
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-bold">
              <Navigation size={14} />
              Kurulum · Adım 3
            </div>
          )}
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Araçlarım</h1>
              <p className="text-sm text-white/70 mt-1 max-w-sm">
                Filonuzu tanımlayın; ilan vermek ve teklif almak için en az bir araç gerekir.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAdd(true)}
              className="shrink-0 flex items-center gap-2 bg-brand-orange text-white text-sm font-bold px-4 py-3 rounded-xl shadow-lg shadow-brand-orange/30 hover:opacity-95 transition-opacity"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Araç ekle</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-8">
            <StatChip icon={CheckCircle} label="Müsait" value={counts.available} />
            <StatChip icon={Truck} label="Yolda" value={counts.transit} />
            <StatChip icon={Wrench} label="Bakımda" value={counts.service} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 -mt-4 space-y-4">
        {vehicles.length === 0 ? (
          <EmptyFleet onAdd={() => setShowAdd(true)} isOnboarding={isOnboarding} />
        ) : (
          <>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
              {vehicles.length} araç kayıtlı
            </p>
            <div className="space-y-3">
              {vehicles.map((v) => (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  highlight={highlightId === v.id}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowAdd(true)}
              className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-brand-orange hover:text-brand-orange hover:bg-white transition-all font-bold text-sm"
            >
              <Plus size={18} />
              Başka araç ekle
            </button>
          </>
        )}
      </div>

      <AddVehicleSheet
        open={showAdd}
        onClose={handleSheetClose}
        onSuccess={handleVehicleAdded}
        isOnboarding={isOnboarding}
      />
    </div>
  );
}

function StatChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl px-3 py-2.5 text-center border border-white/10">
      <Icon size={16} className="mx-auto text-brand-orange mb-1" />
      <div className="text-xl font-black">{value}</div>
      <p className="text-[10px] font-semibold text-white/60">{label}</p>
    </div>
  );
}

function EmptyFleet({
  onAdd,
  isOnboarding,
}: {
  onAdd: () => void;
  isOnboarding: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 sm:p-12 text-center">
      <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-5">
        <Truck size={40} className="text-brand-orange" />
      </div>
      <h2 className="text-xl font-black text-slate-900">Henüz araç yok</h2>
      <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
        {isOnboarding
          ? 'İlk aracınızı ekleyerek taşımacılığa başlayın. Plaka, tip ve kapasite birkaç adımda tamamlanır.'
          : 'Filonuza araç ekleyerek uygun yükleri görebilir ve ilan verebilirsiniz.'}
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-8 inline-flex items-center gap-2 bg-brand-dark text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-95 shadow-lg shadow-brand-dark/20 transition-opacity"
      >
        <Plus size={20} />
        İlk aracı ekle
      </button>
    </div>
  );
}
