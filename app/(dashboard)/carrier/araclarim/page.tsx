
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Truck, Plus, X, CheckCircle, Clock,
  Wrench, MapPin, Calendar, ChevronRight
} from 'lucide-react';

const STATUS_MAP: Record<string, { label: string; color: string; dot: string }> = {
  available: { label: 'Müsait', color: 'bg-green-50 text-green-700 border-green-100', dot: 'bg-green-500' },
  transit:   { label: 'Yolda', color: 'bg-blue-50 text-blue-700 border-blue-100', dot: 'bg-blue-500 animate-pulse' },
  service:   { label: 'Bakımda', color: 'bg-yellow-50 text-yellow-700 border-yellow-100', dot: 'bg-yellow-400' },
};

type Vehicle = {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: string;
  type: string;
  capacity: string;
  status: keyof typeof STATUS_MAP;
  activeIlan?: string;
  nextService?: string;
};

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    plate: '34 VP 1923',
    brand: 'Mercedes',
    model: 'Actros 1845',
    year: '2021',
    type: 'Tır',
    capacity: '25 Ton',
    status: 'available',
    nextService: 'Ağustos 2026',
  },
  {
    id: 'v2',
    plate: '16 KA 202',
    brand: 'Volvo',
    model: 'FH 460',
    year: '2020',
    type: 'Tır',
    capacity: '25 Ton',
    status: 'transit',
    activeIlan: 'IL-2026-002',
    nextService: 'Mayıs 2026',
  },
];

const VEHICLE_TYPES = ['Tır', 'Kamyon', 'Kamyonet', 'Panelvan', 'Frigorifik', 'Tenteli', 'Damperli', 'Lowbed'];

const emptyForm = { plate: '', brand: '', model: '', year: '', type: '', capacity: '' };

export default function AraclarimPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newV: Vehicle = {
      id: `v${Date.now()}`,
      plate: form.plate,
      brand: form.brand,
      model: form.model,
      year: form.year,
      type: form.type,
      capacity: form.capacity,
      status: 'available',
    };
    setVehicles(prev => [...prev, newV]);
    setForm(emptyForm);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu aracı silmek istediğinize emin misiniz?')) {
      setVehicles(prev => prev.filter(v => v.id !== id));
    }
  };

  const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-medium focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition-all";

  const counts = {
    available: vehicles.filter(v => v.status === 'available').length,
    transit:   vehicles.filter(v => v.status === 'transit').length,
    service:   vehicles.filter(v => v.status === 'service').length,
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-5 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Araçlarım</h1>
            <p className="text-xs text-slate-500 font-medium">Filoyu yönet</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-brand-dark text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm">
          <Plus size={16} /> Araç Ekle
        </button>
      </header>

      <div className="p-5 lg:p-8 max-w-3xl mx-auto space-y-5">

        {/* Özet */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: 'available', label: 'Müsait', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            { key: 'transit',   label: 'Yolda',  icon: Truck,        color: 'text-blue-600',  bg: 'bg-blue-50' },
            { key: 'service',   label: 'Bakımda', icon: Wrench,      color: 'text-yellow-600', bg: 'bg-yellow-50' },
          ].map(item => (
            <div key={item.key} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
              <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <item.icon size={18} className={item.color} />
              </div>
              <div className="text-2xl font-black text-slate-900">{counts[item.key as keyof typeof counts]}</div>
              <div className="text-xs text-gray-500 font-medium">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Araç Listesi */}
        {vehicles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Truck size={48} className="text-gray-200 mx-auto mb-4" />
            <div className="font-bold text-gray-400">Henüz araç eklemediniz</div>
            <p className="text-sm text-gray-400 mt-1 mb-6">Aracınızı ekleyerek ilan verebilirsiniz.</p>
            <button onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-all">
              <Plus size={18} /> Araç Ekle
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {vehicles.map(v => {
              const s = STATUS_MAP[v.status];
              return (
                <div key={v.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-5">
                    {/* Top */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                          <Truck size={22} className="text-white" />
                        </div>
                        <div>
                          <div className="font-black text-slate-900 text-lg">{v.plate}</div>
                          <div className="text-sm text-gray-500">{v.brand} {v.model} · {v.year}</div>
                        </div>
                      </div>
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${s.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                        {s.label}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Araç Tipi</div>
                        <div className="text-sm font-bold text-slate-700">{v.type}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Kapasite</div>
                        <div className="text-sm font-bold text-slate-700">{v.capacity}</div>
                      </div>
                      {v.nextService && (
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Sonraki Bakım</div>
                          <div className="text-sm font-bold text-slate-700 flex items-center gap-1">
                            <Wrench size={12} className="text-yellow-500" /> {v.nextService}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Aktif İlan */}
                    {v.activeIlan && (
                      <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5 mb-4">
                        <span className="text-xs font-bold text-brand-orange">Aktif İlan:</span>
                        <span className="text-xs font-mono text-slate-700">{v.activeIlan}</span>
                        <ChevronRight size={14} className="text-orange-300 ml-auto" />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors"
                      >
                        Aracı Sil
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {vehicles.length > 0 && (
          <button onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-brand-dark hover:text-brand-dark hover:bg-white transition-all font-bold text-sm">
            <Plus size={18} /> Yeni Araç Ekle
          </button>
        )}
      </div>

      {/* ─── Araç Ekle Modal ──────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>

            <div className="bg-brand-dark text-white px-6 py-5 flex items-center justify-between">
              <div className="font-black text-lg">Yeni Araç Ekle</div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Plaka *</label>
                  <input required value={form.plate} onChange={e => setForm(f => ({ ...f, plate: e.target.value }))}
                    placeholder="34 AB 1234" className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Yıl</label>
                  <input value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                    placeholder="2022" className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Marka *</label>
                  <input required value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                    placeholder="Mercedes, Volvo..." className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Model</label>
                  <input value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
                    placeholder="Actros, FH..." className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Araç Tipi *</label>
                  <select required value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className={`${inputCls} appearance-none`}>
                    <option value="">Seçiniz</option>
                    {VEHICLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Kapasite</label>
                  <input value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}
                    placeholder="25 Ton" className={inputCls} />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                  İptal
                </button>
                <button type="submit"
                  className="flex-1 py-3 bg-brand-dark text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-sm">
                  Araç Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
