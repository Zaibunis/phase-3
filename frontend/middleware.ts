import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes anyone can access
const publicRoutes = ["/", "/signin", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public pages
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // For all other routes (chat, dashboard), allow request
  // Client-side auth will handle actual access
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
