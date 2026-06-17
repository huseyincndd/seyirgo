import { z } from 'zod';

export const createCargoListingSchema = z.object({
  categoryId: z.string().min(1, 'Kategori seçimi zorunludur'),
  
  originCountry: z.string().min(1, 'Kalkış ülkesi zorunludur'),
  originCity: z.string().min(1, 'Kalkış ili zorunludur'),
  originDistrict: z.string().min(1, 'Kalkış ilçesi zorunludur'),
  
  destinationCountry: z.string().min(1, 'Varış ülkesi zorunludur'),
  destinationCity: z.string().min(1, 'Varış ili zorunludur'),
  destinationDistrict: z.string().min(1, 'Varış ilçesi zorunludur'),
  
  cargoDetails: z.record(z.string(), z.any()),
});

export type CreateCargoListingInput = z.infer<typeof createCargoListingSchema>;

export function zodCargoFieldErrors(error: z.ZodError) {
  const result: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const path = issue.path.join('.');
    if (!result[path]) result[path] = [];
    result[path].push(issue.message);
  }
  return result;
}
