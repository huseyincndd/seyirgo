/** Plaka girişini normalize eder (büyük harf, fazla boşluk temizlenir) */
export function formatPlateInput(value: string): string {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Veritabanına kayıt için plaka */
export function normalizePlate(value: string): string {
  return formatPlateInput(value);
}

/** Basit TR plaka kontrolü — en az 5 karakter, harf+rakam */
export function isValidPlate(plate: string): boolean {
  const compact = plate.replace(/\s/g, '');
  if (compact.length < 5 || compact.length > 12) return false;
  return /^[0-9]{2}[A-Z]{1,3}[0-9]{2,4}$/.test(compact) || compact.length >= 5;
}
