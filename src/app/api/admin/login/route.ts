import { NextResponse } from "next/server";
import { createAdminCookieValue, getAdminToken } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = String(formData.get("token") ?? "").trim();
  const adminToken = getAdminToken();

  if (!adminToken || token !== adminToken) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url));
  }

  const response = NextResponse.redirect(new URL("/admin", request.url));
  const cookieValue = createAdminCookieValue();

  if (!cookieValue) {
    return NextResponse.json(
      { error: "Admin session signing is not configured." },
      { status: 500 }
    );
  }

  response.cookies.set("admin_auth", cookieValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  });

  return response;
}
