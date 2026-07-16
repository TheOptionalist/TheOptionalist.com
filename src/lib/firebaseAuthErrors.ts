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
  "We could not complete this request right now. Please try again in a little while.";

const ERROR_HINTS: Record<string, string> = {
  "auth/api-key-expired":
    "Account access is temporarily unavailable. Please try again later.",
  "auth/invalid-api-key":
    "Account access is temporarily unavailable. Please try again later.",
  "auth/unauthorized-domain":
    "Account access is not available on this domain yet. Please contact support.",
  "auth/operation-not-allowed":
    "Email sign-in is temporarily unavailable. Please try again later."
};

const CODE_MESSAGES: Record<string, string> = {
  "auth/api-key-expired": "Account access is temporarily unavailable.",
  "auth/invalid-api-key": "Account access is temporarily unavailable.",
  "auth/unauthorized-domain": "Account access is not available on this domain.",
  "auth/operation-not-allowed": "Email sign-in is temporarily unavailable."
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
