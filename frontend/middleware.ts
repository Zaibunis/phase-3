import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/signin', '/signup'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public routes
  if (publicRoutes.includes(pathname)) return NextResponse.next();

  // Allow Next.js internals
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon'))
    return NextResponse.next();

  // Safely check cookies
  let hasSessionCookie = false;
  try {
    hasSessionCookie = Boolean(request.cookies.get('authjs.session-token'));
  } catch (err) {
    // Edge runtime may not support .get() fully
    hasSessionCookie = false;
  }

  const hasAuthHeader = request.headers.get('authorization')?.startsWith('Bearer ') ?? false;
  const hasValidAuth = hasSessionCookie || hasAuthHeader;

  // Protect chat route example
  if (pathname.startsWith('/chat') && !hasValidAuth) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next|api|favicon.ico).*)"], };