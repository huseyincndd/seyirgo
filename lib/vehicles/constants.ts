import type { LucideIcon } from 'lucide-react';
import {
  Truck,
  Container,
  Car,
  Snowflake,
  Layers,
  Construction,
  Minus,
} from 'lucide-react';
import type { z } from 'zod';
import type { vehicleTypeEnum } from '@/lib/validations/vehicle';

type VehicleTypeValue = z.infer<typeof vehicleTypeEnum>;

export interface VehicleTypeOption {
  value: VehicleTypeValue;
  label: string;
  description: string;
  icon: LucideIcon;
  suggestedCapacities: number[];
}

export const VEHICLE_TYPE_OPTIONS: VehicleTypeOption[] = [
  {
    value: 'TIR',
    label: 'Tır',
    description: 'Uzun yol, ağır yük',
    icon: Truck,
    suggestedCapacities: [18, 24, 40],
  },
  {
    value: 'KAMYON',
    label: 'Kamyon',
    description: 'Orta/ ağır tonaj',
    icon: Container,
    suggestedCapacities: [12, 18, 24],
  },
  {
    value: 'KAMYONET',
    label: 'Kamyonet',
    description: 'Hafif ticari',
    icon: Car,
    suggestedCapacities: [1.5, 3.5, 5],
  },
  {
    value: 'PANELVAN',
    label: 'Panelvan',
    description: 'Şehir içi, parsiyel',
    icon: Car,
    suggestedCapacities: [1, 1.5, 3.5],
  },
  {
    value: 'FRIGO',
    label: 'Frigorifik',
    description: 'Soğuk zincir',
    icon: Snowflake,
    suggestedCapacities: [12, 18, 24],
  },
  {
    value: 'TENTELI',
    label: 'Tenteli',
    description: 'Genel kargo',
    icon: Layers,
    suggestedCapacities: [12, 18, 24],
  },
  {
    value: 'DAMPERLI',
    label: 'Damperli',
    description: 'İnşaat, hafriyat',
    icon: Construction,
    suggestedCapacities: [18, 24, 40],
  },
  {
    value: 'LOWBED',
    label: 'Lowbed',
    description: 'Ağır makine, özel',
    icon: Minus,
    suggestedCapacities: [40, 60, 80],
  },
];

export const POPULAR_BRANDS = [
  'Mercedes-Benz',
  'Volvo',
  'MAN',
  'Scania',
  'Ford',
  'Iveco',
  'Renault',
  'BMC',
  'Isuzu',
  'DAF',
];

export const CAPACITY_PRESETS_TON = [1.5, 3.5, 7.5, 12, 18, 24, 40];

export function getYearOptions(): string[] {
  const current = new Date().getFullYear();
  const years: string[] = [];
  for (let y = current; y >= 1995; y--) {
    years.push(String(y));
  }
  return years;
}

export function getTypeOption(value: string): VehicleTypeOption | undefined {
  return VEHICLE_TYPE_OPTIONS.find((t) => t.value === value);
}

export const BODY_TYPES = [
  'Açık Kasa',
  'Kapalı Kasa',
  'Tenteli',
  'Frigo',
  'Damper',
  'Lowbed',
  'Konteyner Taşıyıcı',
  'Tanker',
  'Silobas',
  'Oto Taşıyıcı',
  'Canlı Hayvan',
  'Cam Taşıyıcı',
];

export const VEHICLE_FEATURES = [
  'Liftli (Lifty)',
  'Yandan Açılır',
  'Üstten Açılır',
  'ADR (Tehlikeli Madde)',
  'Askılı Kasa',
  'Rampa',
  'Soğutucu Ünite',
  'Isıtıcı Ünite',
  'GPS / Araç Takip',
  'Hassas Süspansiyon',
];
