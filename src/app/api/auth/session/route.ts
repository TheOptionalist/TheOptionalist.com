import { NextResponse } from "next/server";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";

const SESSION_COOKIE_NAME = "session";
// Firebase session cookies allow up to 14 days.
const SESSION_EXPIRES_IN_MS = 1000 * 60 * 60 * 24 * 14;

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization") ?? "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.replace("Bearer ", "").trim()
    : "";

  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 401 });
  }

  const { auth, error } = getFirebaseAdmin();
  if (!auth) {
    return NextResponse.json({ error: error?.message ?? "Missing admin config." }, { status: 500 });
  }

  try {
    const sessionCookie = await auth.createSessionCookie(token, {
      expiresIn: SESSION_EXPIRES_IN_MS
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_EXPIRES_IN_MS / 1000
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Invalid token." }, { status: 401 });
  }
}
