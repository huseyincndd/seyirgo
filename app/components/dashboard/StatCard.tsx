import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'blue' | 'orange' | 'green' | 'purple';
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-brand-dark',
    icon: 'bg-brand-dark/10 text-brand-dark',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-brand-orange',
    icon: 'bg-brand-orange/10 text-brand-orange',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    icon: 'bg-green-100 text-green-600',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    icon: 'bg-purple-100 text-purple-600',
  },
};

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  color = 'blue'
}) => {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-black text-gray-900">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.isPositive ? (
                <TrendingUp size={14} className="text-green-500" />
              ) : (
                <TrendingDown size={14} className="text-red-500" />
              )}
              <span className={`text-xs font-bold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.value}
              </span>
              <span className="text-xs text-gray-400 ml-1">bu ay</span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
