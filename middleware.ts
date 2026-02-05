import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
    "/index.html",
    "/Anthropology/:path*",
    "/PSIR/:path*",
    "/Blogs/:path*",
    "/Stories/:path*"
  ]
};
