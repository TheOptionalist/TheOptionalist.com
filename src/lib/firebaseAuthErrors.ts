import "client-only";

type FirebaseAuthLikeError = {
  code?: string;
  message?: string;
};

export type FirebaseAuthErrorDetails = {
  code: string | null;
  message: string;
  hint: string;
};

const DEFAULT_FIREBASE_AUTH_MESSAGE =
  "Firebase auth could not complete the request. Please verify your Firebase Console settings.";

const ERROR_HINTS: Record<string, string> = {
  "auth/api-key-expired":
    "Your Firebase Web API key appears expired or invalid. Refresh the Web API key in Firebase Console and update NEXT_PUBLIC_FIREBASE_API_KEY.",
  "auth/invalid-api-key":
    "Your Firebase Web API key is invalid. Check NEXT_PUBLIC_FIREBASE_API_KEY and make sure it belongs to the correct Firebase project.",
  "auth/unauthorized-domain":
    "This domain is not authorized for Firebase Authentication. Add the current site to Firebase Console -> Authentication -> Settings -> Authorized domains.",
  "auth/operation-not-allowed":
    "Email/password sign-in is disabled in Firebase Authentication. Enable the provider in Firebase Console -> Authentication -> Sign-in method."
};

const CODE_MESSAGES: Record<string, string> = {
  "auth/api-key-expired": "Firebase API key expired.",
  "auth/invalid-api-key": "Firebase API key is invalid.",
  "auth/unauthorized-domain": "Firebase domain is not authorized.",
  "auth/operation-not-allowed": "Firebase sign-in method is disabled."
};

export function getFirebaseAuthErrorDetails(error: unknown): FirebaseAuthErrorDetails {
  const firebaseError = error as FirebaseAuthLikeError | null;
  const code = typeof firebaseError?.code === "string" ? firebaseError.code : null;
  const baseMessage =
    (code && CODE_MESSAGES[code]) ||
    (typeof firebaseError?.message === "string" && firebaseError.message.trim()) ||
    DEFAULT_FIREBASE_AUTH_MESSAGE;
  const hint = (code && ERROR_HINTS[code]) || DEFAULT_FIREBASE_AUTH_MESSAGE;

  return {
    code,
    message: baseMessage,
    hint
  };
}

