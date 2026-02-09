"use client";

import { useEffect, useRef } from "react";
import { browserLocalPersistence, onIdTokenChanged, setPersistence } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

const MIN_SYNC_INTERVAL_MS = 60_000;

export default function AuthSessionSync() {
  const lastToken = useRef<string | null>(null);
  const lastSyncAt = useRef(0);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(() => {});

    const unsubscribe = onIdTokenChanged(auth, async (user) => {
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

    return () => unsubscribe();
  }, []);

  return null;
}
