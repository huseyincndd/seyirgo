import { z } from 'zod';

/** Boş string veya undefined → undefined; doluysa doğrula */
function optionalString(schema: z.ZodString) {
  return z.preprocess(
    (val) => {
      if (val === undefined || val === null || val === '') return undefined;
      return String(val).trim();
    },
    schema.optional()
  );
}

export const registerSchema = z
  .object({
    role: z.enum(['shipper', 'carrier']),
    firstName: z.string().min(2, 'Ad en az 2 karakter olmalı'),
    lastName: z.string().min(2, 'Soyad en az 2 karakter olmalı'),
    tcNo: optionalString(
      z.string().length(11, 'TC kimlik 11 haneli olmalı')
    ),
    birthYear: optionalString(
      z.string().regex(/^(19|20)\d{2}$/, 'Doğum yılı 4 haneli olmalı (örn: 1990)')
    ),
    companyTitle: z.string().min(2, 'Şirket ünvanı gerekli'),
    taxNo: z
      .string()
      .min(9, 'Vergi numarası en az 9 haneli olmalı')
      .max(11, 'Vergi numarası en fazla 11 haneli olmalı'),
    taxOffice: z.string().min(2, 'Vergi dairesi gerekli'),
    address: z.string().min(5, 'Fatura adresi en az 5 karakter olmalı'),
    email: z.string().email('Geçerli bir e-posta girin'),
    phone: z
      .string()
      .refine(
        (val) => val.replace(/\D/g, '').length >= 10,
        'Telefon numarası en az 10 haneli olmalı'
      ),
    password: z.string().min(8, 'Şifre en az 8 karakter olmalı'),
    passwordConfirm: z.string(),
    smsMarketing: z.boolean().optional().default(false),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Şifreler eşleşmiyor',
    path: ['passwordConfirm'],
  });

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta girin'),
  password: z.string().min(1, 'Şifre gerekli'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

/** API alan adı → form alan adı */
export const REGISTER_FIELD_MAP: Record<string, string> = {
  firstName: 'isim',
  lastName: 'soyisim',
  tcNo: 'tcKimlik',
  birthYear: 'dogumYili',
  companyTitle: 'sirketUnvani',
  taxNo: 'vergiNo',
  taxOffice: 'vergiDairesi',
  address: 'faturaAdresi',
  email: 'email',
  phone: 'telefon',
  password: 'sifre',
  passwordConfirm: 'sifreTekrar',
};

export const REGISTER_FIELD_LABELS: Record<string, string> = {
  firstName: 'Ad',
  lastName: 'Soyad',
  tcNo: 'TC Kimlik',
  birthYear: 'Doğum yılı',
  companyTitle: 'Şirket ünvanı',
  taxNo: 'Vergi no',
  taxOffice: 'Vergi dairesi',
  address: 'Fatura adresi',
  email: 'E-posta',
  phone: 'Telefon',
  password: 'Şifre',
  passwordConfirm: 'Şifre tekrar',
};
