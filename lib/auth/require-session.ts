import { getSession, type SessionPayload } from './session';
import { jsonError } from '@/lib/api-response';

export async function requireSession(): Promise<
  { session: SessionPayload } | { error: Response }
> {
  const session = await getSession();
  if (!session) {
    return { error: jsonError('Oturum bulunamadı. Lütfen giriş yapın.', 401) };
  }
  return { session };
}
