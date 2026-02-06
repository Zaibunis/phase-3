import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const publicRoutes = ["/", "/signin", "/signup", "/api/auth/*"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route =>
    pathname === route ||
    (route.endsWith('/*') && pathname.startsWith(route.slice(0, -2)))
  )) {
    return NextResponse.next();
  }

  // Allow static assets and Next.js internals
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/public/") ||
    /\.(css|js|png|jpg|jpeg|gif|svg|ico|webp)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // For all other routes, allow request to proceed
  // Authentication will be handled client-side in the components
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
