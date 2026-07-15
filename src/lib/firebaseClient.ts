import "client-only";
import type { FirebaseApp } from "firebase/app";
import { getApps, initializeApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import { getAuth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

type FirebaseClientResult = {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  error: Error | null;
};

export type FirebaseClientConfigStatus = {
  configured: boolean;
  missingKeys: string[];
  message: string;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
};

const requiredFirebaseClientKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID"
] as const;

function getFirebaseClientConfigStatus(): FirebaseClientConfigStatus {
  const missingKeys = requiredFirebaseClientKeys.filter((key) => {
    switch (key) {
      case "NEXT_PUBLIC_FIREBASE_API_KEY":
        return !firebaseConfig.apiKey;
      case "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN":
        return !firebaseConfig.authDomain;
      case "NEXT_PUBLIC_FIREBASE_PROJECT_ID":
        return !firebaseConfig.projectId;
      case "NEXT_PUBLIC_FIREBASE_APP_ID":
        return !firebaseConfig.appId;
    }
  });

  return {
    configured: missingKeys.length === 0,
    missingKeys,
    message: missingKeys.length
      ? `Missing Firebase client configuration: ${missingKeys.join(", ")}.`
      : ""
  };
}

const firebaseClientConfigStatus = getFirebaseClientConfigStatus();

export const isFirebaseClientConfigured = firebaseClientConfigStatus.configured;
export const firebaseClientConfigError = isFirebaseClientConfigured
  ? null
  : new Error(
      `${firebaseClientConfigStatus.message} Add the missing NEXT_PUBLIC_FIREBASE_* variables in your environment.`
    );

let cachedClient: FirebaseClientResult | null = null;

export function getFirebaseClient(): FirebaseClientResult {
  if (cachedClient) {
    return cachedClient;
  }

  if (!isFirebaseClientConfigured) {
    cachedClient = {
      app: null,
      auth: null,
      db: null,
      error: firebaseClientConfigError ?? new Error("Missing Firebase client configuration.")
    };
    return cachedClient;
  }

  try {
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    cachedClient = {
      app,
      auth: getAuth(app),
      db: getFirestore(app),
      error: null
    };
    return cachedClient;
  } catch (error) {
    cachedClient = {
      app: null,
      auth: null,
      db: null,
      error: error as Error
    };
    return cachedClient;
  }
}

const firebaseClient = getFirebaseClient();

export const auth = firebaseClient.auth;
export const db = firebaseClient.db;
export const firebaseClientError = firebaseClient.error;
