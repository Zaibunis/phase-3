import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that anyone can access
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

  // 3️⃣ Protected routes (chat/dashboard etc.)
  // Middleware cannot reliably read client-side JWT in HF Spaces.
  // So just allow the route to load. Client-side AuthContext will block unauthorized access.
  return NextResponse.next();
}

// 4️⃣ Match all routes except internal Next.js paths
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
