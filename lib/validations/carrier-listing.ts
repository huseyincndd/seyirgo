import { z } from 'zod';

export const createCarrierListingSchema = z
  .object({
    vehicleId: z.string().min(1, 'Araç seçin'),
    originCity: z.string().min(2, 'Kalkış ili seçin'),
    destinationType: z.enum(['SPECIFIC_CITY', 'TURKEY_WIDE']),
    destinationCity: z.string().optional(),
    note: z.string().max(300).optional(),
    availableFrom: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.destinationType === 'SPECIFIC_CITY') {
      if (!data.destinationCity?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Varış ili seçin',
          path: ['destinationCity'],
        });
      } else if (data.destinationCity === data.originCity) {
        ctx.addIssue({
          code: 'custom',
          message: 'Varış ili kalkış ile aynı olamaz',
          path: ['destinationCity'],
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
