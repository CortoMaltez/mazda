import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

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
      if (!token || !["CLIENT", "CONSULTANT", "ADMIN"].includes(token.role as string)) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }

    // Routes admin (ADMIN seulement)
    const adminRoutes = ["/admin"];
    if (adminRoutes.some(route => path.startsWith(route))) {
      if (!token || token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // Routes consultant (CONSULTANT+ avec permissions)
    const consultantRoutes = ["/consultant"];
    if (consultantRoutes.some(route => path.startsWith(route))) {
      if (!token || !["CONSULTANT", "ADMIN"].includes(token.role as string)) {
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