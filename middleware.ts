import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/auth/constants';
import { getSessionFromToken } from '@/lib/auth/session';
import {
  CARRIER_DOCUMENTS_REQUIRED_PATHS,
  CARRIER_VEHICLE_REQUIRED_PATHS,
  SHIPPER_DOCUMENTS_REQUIRED_PATHS,
  getDashboardPath,
  getDocumentsPath,
  getProfileCompletionPath,
} from '@/lib/onboarding';

const AUTH_ROUTES = ['/giris', '/kayit'];
const PROTECTED_PREFIXES = ['/carrier', '/shipper', '/ayarlar'];

const CARRIER_ONBOARDING_ALLOWED = [
  '/carrier/profil-tamamla',
  '/carrier/belgeler',
  '/carrier/araclarim',
  '/ayarlar',
];

const SHIPPER_ONBOARDING_ALLOWED = [
  '/shipper/profil-tamamla',
  '/shipper/belgeler',
  '/ayarlar',
];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  let session = null;
  try {
    session = await getSessionFromToken(token);
  } catch {
    session = null;
  }

  if (session && isAuthRoute(pathname)) {
    if (!session.profileCompleted) {
      return NextResponse.redirect(new URL(getProfileCompletionPath(session.role), request.url));
    }
    if (!session.documentsSubmitted) {
      return NextResponse.redirect(new URL(getDocumentsPath(session.role), request.url));
    }
    if (session.role === 'carrier' && !session.hasVehicle) {
      return NextResponse.redirect(new URL('/carrier/araclarim?onboarding=1', request.url));
    }
    return NextResponse.redirect(new URL(getDashboardPath(session.role), request.url));
  }

  if (!session && isProtectedPath(pathname)) {
    const loginUrl = new URL('/giris', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!session) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/carrier') && session.role === 'shipper') {
    return NextResponse.redirect(new URL('/shipper', request.url));
  }
  if (pathname.startsWith('/shipper') && session.role === 'carrier') {
    return NextResponse.redirect(new URL('/carrier', request.url));
  }

  if (session.role === 'carrier') {
    if (!session.profileCompleted) {
      const allowed = CARRIER_ONBOARDING_ALLOWED.some(
        (p) => pathname === p || pathname.startsWith(`${p}/`)
      );
      if (!allowed && pathname.startsWith('/carrier')) {
        return NextResponse.redirect(
          new URL('/carrier/profil-tamamla', request.url)
        );
      }
    } else if (!session.documentsSubmitted) {
      const onDocs =
        pathname === '/carrier/belgeler' || pathname.startsWith('/carrier/belgeler');
      const onProfile = pathname.startsWith('/carrier/profil-tamamla');
      const onSettings = pathname.startsWith('/ayarlar');

      if (
        pathname.startsWith('/carrier') &&
        !onDocs &&
        !onProfile &&
        !onSettings
      ) {
        return NextResponse.redirect(
          new URL('/carrier/belgeler?onboarding=1', request.url)
        );
      }

      if (CARRIER_DOCUMENTS_REQUIRED_PATHS.some((p) => pathname.startsWith(p))) {
        return NextResponse.redirect(
          new URL('/carrier/belgeler?onboarding=1', request.url)
        );
      }
    } else if (!session.hasVehicle) {
      const onVehiclePage =
        pathname === '/carrier/araclarim' || pathname.startsWith('/carrier/araclarim');
      const onDocs =
        pathname === '/carrier/belgeler' || pathname.startsWith('/carrier/belgeler');
      const onProfilePage = pathname.startsWith('/carrier/profil-tamamla');
      const onSettings = pathname.startsWith('/ayarlar');

      if (
        pathname.startsWith('/carrier') &&
        !onVehiclePage &&
        !onDocs &&
        !onProfilePage &&
        !onSettings
      ) {
        return NextResponse.redirect(
          new URL('/carrier/araclarim?onboarding=1', request.url)
        );
      }

      if (CARRIER_VEHICLE_REQUIRED_PATHS.some((p) => pathname.startsWith(p))) {
        return NextResponse.redirect(
          new URL('/carrier/araclarim?onboarding=1', request.url)
        );
      }
    }
  }

  if (session.role === 'shipper') {
    if (!session.profileCompleted) {
      const allowed = SHIPPER_ONBOARDING_ALLOWED.some(
        (p) => pathname === p || pathname.startsWith(`${p}/`)
      );
      if (!allowed && pathname.startsWith('/shipper')) {
        return NextResponse.redirect(
          new URL('/shipper/profil-tamamla', request.url)
        );
      }
    } else if (!session.documentsSubmitted) {
      const onDocs =
        pathname === '/shipper/belgeler' || pathname.startsWith('/shipper/belgeler');
      const onProfile = pathname.startsWith('/shipper/profil-tamamla');
      const onSettings = pathname.startsWith('/ayarlar');

      if (
        pathname.startsWith('/shipper') &&
        !onDocs &&
        !onProfile &&
        !onSettings
      ) {
        return NextResponse.redirect(
          new URL('/shipper/belgeler?onboarding=1', request.url)
        );
      }

      if (SHIPPER_DOCUMENTS_REQUIRED_PATHS.some((p) => pathname.startsWith(p))) {
        return NextResponse.redirect(
          new URL('/shipper/belgeler?onboarding=1', request.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
