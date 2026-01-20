export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: any;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: any;
}

// Dashboard & Business Types
export type UserRole = 'shipper' | 'carrier';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  tcNo?: string;
  birthYear?: string;
  companyTitle: string;
  taxNo: string;
  taxOffice: string;
  address: string;
  createdAt: string;
  isVerified: boolean;
}

export interface Load {
  id: string;
  title: string;
  origin: string;
  destination: string;
  date: string;
  weight: number;
  weightUnit: 'kg' | 'ton';
  type: 'tir' | 'kamyon' | 'panelvan' | 'frigo';
  description?: string;
  price?: number;
  status: 'pending' | 'active' | 'in_transit' | 'completed' | 'cancelled';
  offersCount?: number;
  createdBy: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  type: 'tir' | 'kamyon' | 'panelvan' | 'frigo';
  capacity: number;
  capacityUnit: 'kg' | 'ton';
  status: 'active' | 'available' | 'maintenance';
  ownerId: string;
}

export interface Offer {
  id: string;
  loadId: string;
  carrierId: string;
  carrierName: string;
  price: number;
  note?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt: string;
}

export interface Transport {
  id: string;
  loadId: string;
  carrierId: string;
  vehicleId: string;
  status: 'loading' | 'in_transit' | 'delivered' | 'completed';
  progress: number;
  eta?: string;
  startedAt: string;
  completedAt?: string;
}
