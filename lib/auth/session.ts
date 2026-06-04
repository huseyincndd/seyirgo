import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { AppOnboardingStep, AppRole } from '@/lib/onboarding';
import { SESSION_COOKIE, SESSION_MAX_AGE } from './constants';

export interface SessionPayload {
  userId: string;
  email: string;
  role: AppRole;
  firstName: string;
  lastName: string;
  companyTitle: string;
  profileCompleted: boolean;
  documentsSubmitted: boolean;
  documentsApproved: boolean;
  hasVehicle: boolean;
  onboardingStep: AppOnboardingStep;
}

function getSecret(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ??
    (process.env.NODE_ENV === 'development'
      ? 'seyirgo-dev-secret-min-32-characters!!'
      : undefined);
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET ortam değişkeni en az 32 karakter olmalıdır.');
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(payload: SessionPayload): Promise<void> {
  const token = await createSessionToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/** Middleware için — cookies() yerine ham token */
export async function getSessionFromToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  return verifySessionToken(token);
}
