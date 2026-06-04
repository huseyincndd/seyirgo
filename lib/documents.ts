import type { UserDocumentType, VehicleDocumentType, UserRole } from '@prisma/client';

export interface DocumentDefinition {
  type: UserDocumentType | VehicleDocumentType;
  title: string;
  description: string;
  hint?: string;
}

export const CARRIER_USER_DOCUMENTS: DocumentDefinition[] = [
  {
    type: 'TAX_PLATE',
    title: 'Vergi Levhası',
    description: 'Güncel vergi levhası — firma unvanı ve VKN görünür olmalı.',
    hint: 'PDF veya net fotoğraf',
  },
  {
    type: 'TRADE_REGISTRY',
    title: 'Ticaret Sicil Gazetesi',
    description: 'Şirket kuruluş veya güncel ticaret sicil kaydı.',
  },
  {
    type: 'SIGNATURE_CIRCULAR',
    title: 'İmza Sirküleri',
    description: 'Yetkili imza sahiplerini gösteren imza sirküleri.',
  },
  {
    type: 'TRANSPORT_LICENSE',
    title: 'K Belgesi (Taşımacılık Yetki Belgesi)',
    description: 'Yetki belgesi türü ve geçerlilik tarihi platformda doğrulanır.',
    hint: 'K1, K2 veya K3',
  },
  {
    type: 'SRC_CERTIFICATE',
    title: 'SRC Belgesi',
    description: 'Sürücü mesleki yeterlilik belgesi (SRC 1/3/4).',
  },
  {
    type: 'DRIVER_LICENSE',
    title: 'Ehliyet',
    description: 'Geçerli sürücü belgesi — ön ve arka yüz.',
  },
];

export const SHIPPER_USER_DOCUMENTS: DocumentDefinition[] = [
  {
    type: 'TAX_PLATE',
    title: 'Vergi Levhası',
    description: 'Firma vergi levhası — yük ilanı ve faturalama için zorunlu.',
  },
  {
    type: 'TRADE_REGISTRY',
    title: 'Ticaret Sicil / Faaliyet Belgesi',
    description: 'Şirketin faaliyet alanını gösteren resmi belge.',
  },
  {
    type: 'SIGNATURE_CIRCULAR',
    title: 'İmza Sirküleri',
    description: 'Sözleşme ve ödeme onayları için yetkili imza bilgisi.',
  },
];

export const VEHICLE_DOCUMENTS: DocumentDefinition[] = [
  {
    type: 'VEHICLE_REGISTRATION',
    title: 'Araç Ruhsatı',
    description: 'Plaka ve şasi bilgisi araç kaydıyla eşleşmeli.',
  },
  {
    type: 'TRAFFIC_INSURANCE',
    title: 'Zorunlu Trafik Sigortası',
    description: 'Geçerlilik tarihi dolmamış poliçe.',
  },
  {
    type: 'CARGO_INSURANCE',
    title: 'Taşıma / Kasko (Opsiyonel)',
    description: 'Yük taşımacılığı için ek teminat — önerilir.',
    hint: 'Zorunlu değil, demo için gösterilir',
  },
];

export function getRequiredUserDocuments(role: UserRole): DocumentDefinition[] {
  return role === 'CARRIER' ? CARRIER_USER_DOCUMENTS : SHIPPER_USER_DOCUMENTS;
}

export function getRequiredUserDocumentTypes(role: UserRole): UserDocumentType[] {
  return getRequiredUserDocuments(role).map((d) => d.type as UserDocumentType);
}

export function getRequiredVehicleDocumentTypes(): VehicleDocumentType[] {
  return ['VEHICLE_REGISTRATION', 'TRAFFIC_INSURANCE'];
}

export function isUserDocumentSubmitted(
  status: string | undefined | null
): boolean {
  return status === 'PENDING' || status === 'APPROVED';
}

export function isUserDocumentApproved(status: string | undefined | null): boolean {
  return status === 'APPROVED';
}
