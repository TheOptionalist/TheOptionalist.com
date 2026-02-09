import "server-only";
import { cookies } from "next/headers";
import type { DecodedIdToken } from "firebase-admin/auth";
import { getFirebaseAdmin } from "./firebaseAdmin";

type ServerSession = {
  user: DecodedIdToken | null;
  error: Error | null;
};

type ProfileRecord = {
  email?: string;
  program?: string | null;
  course?: string | null;
  createdAt?: unknown;
};

type ProfileResult = {
  profile: ProfileRecord | null;
  error: Error | null;
};

export async function getServerSession(): Promise<ServerSession> {
  const session = cookies().get("session")?.value;
  if (!session) {
    return { user: null, error: null };
  }

  const { auth, error } = getFirebaseAdmin();
  if (!auth) {
    return { user: null, error };
  }

  try {
    const user = await auth.verifySessionCookie(session, true);
    return { user, error: null };
  } catch (err) {
    return { user: null, error: err as Error };
  }
}

export async function getProfileByUid(uid: string): Promise<ProfileResult> {
  const { db, error } = getFirebaseAdmin();
  if (!db) {
    return { profile: null, error };
  }

  try {
    const snapshot = await db.collection("profiles").doc(uid).get();
    if (!snapshot.exists) {
      return { profile: null, error: null };
    }
    return { profile: snapshot.data() as ProfileRecord, error: null };
  } catch (err) {
    return { profile: null, error: err as Error };
  }
}
