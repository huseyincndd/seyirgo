
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Truck, MapPin, Package, Clock, CheckCircle,
  Navigation, ChevronRight, Calendar, Phone, X
} from 'lucide-react';

const JOBS = [
  {
    id: '#TS-2026-001',
    from: 'Bursa', fromSub: 'Nilüfer',
    to: 'İzmir', toSub: 'Kemalpaşa',
    cargo: 'Tekstil Ürünleri',
    weight: '6.2 Ton',
    plate: '16 KA 202',
    vehicle: 'Volvo FH — Tır',
    date: '24 Nis 2026',
    eta: 'Bugün, 15:00',
    status: 'transit',
    progress: 60,
    shipper: { name: 'Fatma Demir', phone: '0544 987 65 43' },
  },
  {
    id: '#TS-2026-002',
    from: 'İstanbul', fromSub: 'Bağcılar',
    to: 'Ankara', toSub: 'Ostim',
    cargo: 'Otomotiv Parçaları',
    weight: '8.5 Ton',
    plate: '34 VP 1923',
    vehicle: 'Mercedes Actros — Tır',
    date: '26 Nis 2026',
    eta: '26 Nis, 12:00',
    status: 'loading',
    progress: 10,
    shipper: { name: 'Mehmet Yılmaz', phone: '0532 123 45 67' },
  },
];

const STATUS_MAP: Record<string, { label: string; color: string; dot: string }> = {
  loading:   { label: 'Yükleniyor', color: 'bg-yellow-50 text-yellow-700 border-yellow-100', dot: 'bg-yellow-400' },
  transit:   { label: 'Yolda', color: 'bg-green-50 text-green-700 border-green-100', dot: 'bg-green-500' },
  delivered: { label: 'Teslim Edildi', color: 'bg-blue-50 text-blue-700 border-blue-100', dot: 'bg-blue-500' },
};

export default function AktifTasimalarPage() {
  const router = useRouter();
  const [contactJob, setContactJob] = useState<typeof JOBS[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-5 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Aktif Taşımalar</h1>
            <p className="text-xs text-slate-500 font-medium">Devam eden işleriniz</p>
          </div>
        </div>
        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
          {JOBS.length} Aktif
        </span>
      </header>

      <div className="p-5 lg:p-8 max-w-3xl mx-auto space-y-4">

        {JOBS.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <Truck size={48} className="text-gray-200 mx-auto mb-4" />
            <div className="font-bold text-gray-400">Aktif taşıma bulunmuyor</div>
          </div>
        ) : (
          JOBS.map(job => {
            const s = STATUS_MAP[job.status];
            return (
              <div key={job.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">

                  {/* ID + Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">{job.id}</span>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${s.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${job.status === 'transit' ? 'animate-pulse' : ''}`}></span>
                      {s.label}
                    </span>
                  </div>

                  {/* Route */}
                  <div className="flex items-stretch gap-3 mb-4">
                    <div className="flex-1 bg-green-50 rounded-xl p-3 text-center border border-green-100">
                      <div className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">Çıkış</div>
                      <div className="font-black text-slate-900">{job.from}</div>
                      <div className="text-xs text-gray-500">{job.fromSub}</div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1">
                      <Truck size={16} className="text-brand-orange" />
                      <ChevronRight size={14} className="text-gray-300" />
                    </div>
                    <div className="flex-1 bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
                      <div className="text-[10px] font-bold text-brand-orange uppercase tracking-wider mb-1">Varış</div>
                      <div className="font-black text-slate-900">{job.to}</div>
                      <div className="text-xs text-gray-500">{job.toSub}</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>İlerleme</span>
                      <span className="font-bold text-brand-orange">{job.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-orange rounded-full" style={{ width: `${job.progress}%` }} />
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Yük</div>
                      <div className="text-xs font-bold text-slate-700">{job.cargo}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Ağırlık</div>
                      <div className="text-xs font-bold text-slate-700">{job.weight}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Plaka</div>
                      <div className="text-xs font-bold text-slate-700">{job.plate}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">T. Varış</div>
                      <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        <Clock size={11} className="text-brand-orange" /> {job.eta}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => setContactJob(job)}
                      className="flex-1 flex items-center justify-center gap-2 bg-brand-dark text-white text-sm font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-all"
                    >
                      <Phone size={15} /> Yük Sahibini Ara
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                      <CheckCircle size={15} /> Tamamla
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Ara Modal */}
      {contactJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setContactJob(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-brand-dark text-white px-6 py-5 flex items-center justify-between">
              <div>
                <div className="font-black text-lg">Yük Sahibi</div>
                <div className="text-xs text-gray-400">{contactJob.cargo} — {contactJob.from} → {contactJob.to}</div>
              </div>
              <button onClick={() => setContactJob(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className="font-black text-slate-900 text-xl">{contactJob.shipper.name}</div>
              </div>
              <a href={`tel:${contactJob.shipper.phone}`}
                className="flex items-center justify-center gap-3 bg-green-500 text-white font-black text-xl py-4 rounded-2xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
              >
                <Phone size={24} /> {contactJob.shipper.phone}
              </a>
              <button onClick={() => setContactJob(null)} className="w-full py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
