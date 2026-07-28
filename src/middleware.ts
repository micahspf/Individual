import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Lightweight route protection hint — full auth checks happen in server components/API.
// Auth.js edge middleware can be added later with auth.config split if needed.
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Allow through; requireAdmin() enforces role server-side.
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
