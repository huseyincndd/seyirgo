import React from 'react';
import { Package, Truck, FileText, CheckCircle, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Activity {
  id: string;
  type: 'load_created' | 'offer_received' | 'offer_accepted' | 'transit_started' | 'completed' | 'payment';
  title: string;
  description: string;
  time: string;
}

interface RecentActivityProps {
  userType: 'shipper' | 'carrier';
}

const SHIPPER_ACTIVITIES: Activity[] = [
  { id: '1', type: 'offer_received', title: 'Yeni teklif alındı', description: 'İstanbul - Ankara yükünüze 3 yeni teklif geldi', time: '5 dk önce' },
  { id: '2', type: 'transit_started', title: 'Taşıma başladı', description: '34 ABC 123 plakalı araç yola çıktı', time: '2 saat önce' },
  { id: '3', type: 'completed', title: 'Taşıma tamamlandı', description: 'Bursa - İzmir taşıması başarıyla teslim edildi', time: '1 gün önce' },
  { id: '4', type: 'payment', title: 'Ödeme yapıldı', description: '₺8,500 tutarında ödeme aktarıldı', time: '2 gün önce' },
];

const CARRIER_ACTIVITIES: Activity[] = [
  { id: '1', type: 'offer_accepted', title: 'Teklifiniz kabul edildi', description: 'Ankara - Konya taşıması için teklifiniz onaylandı', time: '30 dk önce' },
  { id: '2', type: 'transit_started', title: 'Taşıma başladı', description: 'İstanbul - Bursa yükünü teslim aldınız', time: '3 saat önce' },
  { id: '3', type: 'payment', title: 'Ödeme alındı', description: '₺12,500 hesabınıza aktarıldı', time: '1 gün önce' },
  { id: '4', type: 'completed', title: 'Taşıma tamamlandı', description: 'Antalya teslimatı başarıyla gerçekleşti', time: '2 gün önce' },
];

const activityConfig: Record<Activity['type'], { icon: LucideIcon; color: string }> = {
  load_created: { icon: Package, color: 'bg-blue-100 text-blue-600' },
  offer_received: { icon: FileText, color: 'bg-purple-100 text-purple-600' },
  offer_accepted: { icon: CheckCircle, color: 'bg-green-100 text-green-600' },
  transit_started: { icon: Truck, color: 'bg-orange-100 text-orange-600' },
  completed: { icon: CheckCircle, color: 'bg-green-100 text-green-600' },
  payment: { icon: DollarSign, color: 'bg-emerald-100 text-emerald-600' },
};

const RecentActivity: React.FC<RecentActivityProps> = ({ userType }) => {
  const activities = userType === 'shipper' ? SHIPPER_ACTIVITIES : CARRIER_ACTIVITIES;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Son Aktiviteler</h3>
        <button className="text-sm font-bold text-brand-accent hover:underline">
          Tümünü Gör
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;
          
          return (
            <div key={activity.id} className="flex items-start gap-3 group cursor-pointer">
              <div className={`w-9 h-9 rounded-lg ${config.color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 group-hover:text-brand-dark transition-colors">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
