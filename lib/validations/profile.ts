import { z } from 'zod';

export const profileUpdateSchema = z.object({
  firstName: z.string().min(2, 'Ad en az 2 karakter olmalı'),
  lastName: z.string().min(2, 'Soyad en az 2 karakter olmalı'),
  phone: z.string().min(10, 'Telefon numarası geçersiz'),
  tcNo: z.string().length(11).optional().or(z.literal('')),
  birthYear: z.string().length(4).optional().or(z.literal('')),
  companyTitle: z.string().min(2, 'Şirket ünvanı gerekli'),
  taxNo: z.string().min(10, 'Vergi numarası geçersiz'),
  taxOffice: z.string().min(2, 'Vergi dairesi gerekli'),
  address: z.string().min(10, 'Adres gerekli'),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
