import { z } from 'zod';
import { isValidPlate, normalizePlate } from '@/lib/vehicles/plate';

export const vehicleTypeEnum = z.enum([
  'TIR',
  'KAMYON',
  'KAMYONET',
  'PANELVAN',
  'FRIGO',
  'TENTELI',
  'DAMPERLI',
  'LOWBED',
]);

export const createVehicleSchema = z.object({
  plate: z
    .string()
    .min(1, 'Plaka gerekli')
    .transform((v) => normalizePlate(v))
    .refine((v) => v.length >= 5, 'Geçerli bir plaka girin (örn. 34 ABC 123)')
    .refine(isValidPlate, 'Plaka formatı geçersiz'),
  brand: z
    .string()
    .min(2, 'Marka en az 2 karakter olmalı')
    .max(60, 'Marka çok uzun')
    .transform((v) => v.trim()),
  model: z
    .string()
    .max(60, 'Model çok uzun')
    .optional()
    .transform((v) => (v?.trim() ? v.trim() : undefined)),
  year: z
    .string()
    .optional()
    .transform((v) => (v?.trim() ? v.trim() : undefined))
    .refine(
      (v) => {
        if (!v) return true;
        const y = parseInt(v, 10);
        const now = new Date().getFullYear();
        return y >= 1990 && y <= now + 1;
      },
      { message: 'Geçerli bir model yılı seçin' }
    ),
  type: vehicleTypeEnum,
  capacity: z
    .number()
    .positive('Kapasite 0\'dan büyük olmalı')
    .max(120, 'Kapasite en fazla 120 ton olabilir'),
  capacityUnit: z.enum(['kg', 'ton']).default('ton'),
  bodyType: z.string().optional().nullable(),
  trailerType: z.string().optional().nullable(),
  length: z.number().optional().nullable(),
  width: z.number().optional().nullable(),
  height: z.number().optional().nullable(),
  volume: z.number().optional().nullable(),
  features: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export const updateVehicleSchema = createVehicleSchema
  .partial()
  .extend({
    plate: createVehicleSchema.shape.plate.optional(),
    status: z.enum(['AVAILABLE', 'ACTIVE', 'MAINTENANCE']).optional(),
  });

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;

/** UI etiketlerini Prisma enum'a çevir */
export const VEHICLE_TYPE_LABEL_TO_ENUM: Record<string, z.infer<typeof vehicleTypeEnum>> = {
  Tır: 'TIR',
  Kamyon: 'KAMYON',
  Kamyonet: 'KAMYONET',
  Panelvan: 'PANELVAN',
  Frigorifik: 'FRIGO',
  Frigo: 'FRIGO',
  Tenteli: 'TENTELI',
  Damperli: 'DAMPERLI',
  Lowbed: 'LOWBED',
};

export const VEHICLE_TYPE_ENUM_TO_LABEL: Record<z.infer<typeof vehicleTypeEnum>, string> = {
  TIR: 'Tır',
  KAMYON: 'Kamyon',
  KAMYONET: 'Kamyonet',
  PANELVAN: 'Panelvan',
  FRIGO: 'Frigorifik',
  TENTELI: 'Tenteli',
  DAMPERLI: 'Damperli',
  LOWBED: 'Lowbed',
};

export function zodFieldErrors(error: z.ZodError): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  error.issues.forEach((issue) => {
    const key = issue.path[0]?.toString() ?? 'form';
    if (!out[key]) out[key] = [];
    out[key].push(issue.message);
  });
  return out;
}
