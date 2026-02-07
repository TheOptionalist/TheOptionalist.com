import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminCookieValid } from "./src/lib/adminAuth";

const redirects: Record<string, string> = {
  "/index.html": "/",
  "/Anthropology/index.html": "/anthropology",
  "/PSIR/index.html": "/psir",
  "/Blogs/index.html": "/blogs",
  "/Stories/index.html": "/stories",
  "/Anthropology/UPSC_CSE/Neanderthal.html": "/anthropology/upsc-cse/neanderthal",
  "/Anthropology/UPSC_CSE/Homo_erectus.html": "/anthropology/upsc-cse/homo-erectus",
  "/Anthropology/UGC_NET/Neanderthal.html": "/anthropology/ugc-net/neanderthal",
  "/PSIR/UPSC_CSE/Introduction.html": "/psir/upsc-cse/introduction",
  "/PSIR/UGC_NET/Introduction.html": "/psir/ugc-net/introduction",
  "/Anthropology/Ivy_Leagues/Neanderthal.html": "/anthropology",
  "/PSIR/Ivy_Leagues/Introduction.html": "/psir"
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (isAdminRoute || isAdminApiRoute) {
    const isLoginRoute = pathname === "/admin/login";
    const isAuthRoute =
      pathname === "/api/admin/login" || pathname === "/api/admin/logout";
    const cookie = request.cookies.get("admin_auth")?.value;
    const isValid = isAdminCookieValid(cookie);

    if (!isValid) {
      if (isAdminApiRoute && !isAuthRoute) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      if (isAdminRoute && !isLoginRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        url.searchParams.set("error", "1");
        return NextResponse.redirect(url);
      }
    }
  }

  const target = redirects[pathname];
  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
    "/index.html",
    "/Anthropology/:path*",
    "/PSIR/:path*",
    "/Blogs/:path*",
    "/Stories/:path*"
  ]
};
