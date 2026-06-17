import { z } from 'zod';

export const createCarrierListingSchema = z
  .object({
    vehicleId: z.string().min(1, 'Araç seçin'),
    originCountry: z.string().default('Türkiye'),
    originCity: z.string().min(1, 'Kalkış ili seçin'),
    originDistrict: z.string().min(1, 'Kalkış ilçesi seçin'),
    destinationType: z.enum(['SPECIFIC_CITY', 'SPECIFIC_LOCATION', 'REGION', 'TURKEY_WIDE', 'INTERNATIONAL']),
    destinationCountry: z.string().optional().nullable(),
    destinationCity: z.string().optional().nullable(),
    destinationDistrict: z.string().optional().nullable(),
    destinationRegion: z.string().optional().nullable(),
    destinationExcludedRegions: z.array(z.string()).optional().default([]),
    note: z.string().max(300).optional().nullable(),
    availableFrom: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.destinationType === 'SPECIFIC_LOCATION' || data.destinationType === 'SPECIFIC_CITY') {
      if (!data.destinationCity?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Varış ili seçin',
          path: ['destinationCity'],
        });
      }
    } else if (data.destinationType === 'REGION') {
      if (!data.destinationRegion?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Bölge seçin',
          path: ['destinationRegion'],
        });
      }
    } else if (data.destinationType === 'INTERNATIONAL') {
      if (!data.destinationCountry?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Ülke seçin',
          path: ['destinationCountry'],
        });
      }
    }
  });

export type CreateCarrierListingInput = z.infer<typeof createCarrierListingSchema>;

export function zodListingFieldErrors(error: z.ZodError): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  error.issues.forEach((issue) => {
    const key = issue.path[0]?.toString() ?? 'form';
    if (!out[key]) out[key] = [];
    out[key].push(issue.message);
  });
  return out;
}
