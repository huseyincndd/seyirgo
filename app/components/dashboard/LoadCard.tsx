import React from 'react';
import { MapPin, Calendar, Package, Truck, ArrowRight, Clock, DollarSign } from 'lucide-react';

export interface LoadData {
  id: string;
  title: string;
  origin: string;
  destination: string;
  date: string;
  weight: string;
  type: string;
  price?: string;
  status: 'pending' | 'active' | 'in_transit' | 'completed' | 'cancelled';
  offersCount?: number;
}

interface LoadCardProps {
  load: LoadData;
  userType: 'shipper' | 'carrier';
  onViewDetails?: (id: string) => void;
  onMakeOffer?: (id: string) => void;
}

const statusConfig = {
  pending: { label: 'Teklif Bekliyor', color: 'bg-yellow-100 text-yellow-700' },
  active: { label: 'Aktif', color: 'bg-green-100 text-green-700' },
  in_transit: { label: 'Taşımada', color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Tamamlandı', color: 'bg-gray-100 text-gray-600' },
  cancelled: { label: 'İptal', color: 'bg-red-100 text-red-600' },
};

const LoadCard: React.FC<LoadCardProps> = ({ 
  load, 
  userType,
  onViewDetails,
  onMakeOffer
}) => {
  const isShipper = userType === 'shipper';
  const accentColor = isShipper ? 'brand-dark' : 'brand-orange';
  const status = statusConfig[load.status];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${status.color}`}>
              {status.label}
            </span>
            {load.offersCount !== undefined && load.offersCount > 0 && (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-brand-accent/10 text-brand-accent">
                {load.offersCount} Teklif
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-dark transition-colors">
            {load.title}
          </h3>
        </div>
        <span className="text-xs font-medium text-gray-400">#{load.id}</span>
      </div>

      {/* Route */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="font-semibold text-gray-900">{load.origin}</span>
          </div>
        </div>
        <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
        <div className="flex-1 text-right">
          <div className="flex items-center gap-2 text-sm justify-end">
            <span className="font-semibold text-gray-900">{load.destination}</span>
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <Calendar size={14} className="mx-auto text-gray-400 mb-1" />
          <p className="text-xs font-bold text-gray-700">{load.date}</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <Package size={14} className="mx-auto text-gray-400 mb-1" />
          <p className="text-xs font-bold text-gray-700">{load.weight}</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <Truck size={14} className="mx-auto text-gray-400 mb-1" />
          <p className="text-xs font-bold text-gray-700">{load.type}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {load.price && (
          <div className="flex items-center gap-1">
            <span className="text-lg font-black text-gray-900">{load.price}</span>
            <span className="text-xs text-gray-400 font-medium">TL</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 ml-auto">
          <button 
            onClick={() => onViewDetails?.(load.id)}
            className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Detay
          </button>
          {userType === 'carrier' && load.status === 'pending' && (
            <button 
              onClick={() => onMakeOffer?.(load.id)}
              className="px-4 py-2 text-sm font-bold text-white bg-brand-orange hover:brightness-110 rounded-lg transition-all"
            >
              Teklif Ver
            </button>
          )}
          {userType === 'shipper' && load.status === 'pending' && load.offersCount && load.offersCount > 0 && (
            <button 
              onClick={() => onViewDetails?.(load.id)}
              className="px-4 py-2 text-sm font-bold text-white bg-brand-dark hover:brightness-110 rounded-lg transition-all"
            >
              Teklifleri Gör
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadCard;
