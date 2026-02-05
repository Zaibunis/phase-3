import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/signin", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1️⃣ Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 2️⃣ Allow Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // 3️⃣ Allow HF / serverless safe approach
  // Middleware cannot reliably read client-side JWT in localStorage,
  // so we just allow protected routes to load, client-side auth will block access if not signed in
  return NextResponse.next();
}

// 4️⃣ Match everything except internal Next.js paths
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
