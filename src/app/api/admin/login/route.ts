import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminToken } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = String(formData.get("token") ?? "").trim();
  const adminToken = getAdminToken();

  if (!adminToken || token !== adminToken) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url));
  }

  const cookieStore = cookies();
  cookieStore.set("admin_auth", adminToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });

  return NextResponse.redirect(new URL("/admin", request.url));
}
