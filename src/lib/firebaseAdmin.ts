import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

type FirebaseAdminResult = {
  auth: ReturnType<typeof getAuth> | null;
  db: ReturnType<typeof getFirestore> | null;
  error: Error | null;
};

export function getFirebaseAdmin(): FirebaseAdminResult {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    return {
      auth: null,
      db: null,
      error: new Error(
        "Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY."
      )
    };
  }

  const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({ projectId, clientEmail, privateKey })
      });

  return { auth: getAuth(app), db: getFirestore(app), error: null };
}
