import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { hasPermission } from "@/lib/auth-logic";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Routes publiques (VISITOR)
    const publicRoutes = ["/", "/auth/signin", "/auth/signup"];
    if (publicRoutes.includes(path)) {
      return NextResponse.next();
    }

    // Routes client (CLIENT+)
    const clientRoutes = ["/dashboard", "/dashboard/calculator"];
    if (clientRoutes.some(route => path.startsWith(route))) {
      if (!token || !hasPermission(token.role as string, "CLIENT")) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }

    // Routes admin (ADMIN seulement)
    const adminRoutes = ["/admin"];
    if (adminRoutes.some(route => path.startsWith(route))) {
      if (!token || !hasPermission(token.role as string, "ADMIN")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // Routes consultant (CONSULTANT+ avec permissions)
    const consultantRoutes = ["/consultant"];
    if (consultantRoutes.some(route => path.startsWith(route))) {
      if (!token || !hasPermission(token.role as string, "CONSULTANT")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/consultant/:path*",
    "/api/:path*",
  ],
}; 