export function getUserDisplayName(firstName?: string, lastName?: string): string {
  return [firstName, lastName].filter(Boolean).join(' ') || 'Kullanıcı';
}

export function getUserInitials(firstName?: string, lastName?: string): string {
  const a = firstName?.charAt(0) ?? '';
  const b = lastName?.charAt(0) ?? '';
  return (a + b).toUpperCase() || 'K';
}
