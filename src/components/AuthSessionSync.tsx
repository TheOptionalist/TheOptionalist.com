"use client";

import { useEffect, useRef } from "react";

const MIN_SYNC_INTERVAL_MS = 60_000;

export default function AuthSessionSync() {
  const lastToken = useRef<string | null>(null);
  const lastSyncAt = useRef(0);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let isCancelled = false;

    async function startSync() {
      try {
        const [{ browserLocalPersistence, onIdTokenChanged, setPersistence }, { auth }] =
          await Promise.all([import("firebase/auth"), import("@/lib/firebaseClient")]);

        if (isCancelled || !auth) {
          return;
        }

        setPersistence(auth, browserLocalPersistence).catch(() => {});

        unsubscribe = onIdTokenChanged(auth, async (user) => {
          if (!user) {
            lastToken.current = null;
            lastSyncAt.current = 0;
            await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
            return;
          }

          try {
            const token = await user.getIdToken();
            const now = Date.now();
            if (token === lastToken.current && now - lastSyncAt.current < MIN_SYNC_INTERVAL_MS) {
              return;
            }

            lastToken.current = token;
            lastSyncAt.current = now;
            await fetch("/api/auth/session", {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` }
            });
          } catch {
            // Ignore token sync failures; user can still be signed in client-side.
          }
        });
      } catch {
        // Ignore Firebase boot issues outside auth flows.
      }
    }

    void startSync();

    return () => {
      isCancelled = true;
      unsubscribe?.();
    };
  }, []);

  return null;
}
