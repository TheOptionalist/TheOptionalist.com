"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";

type AuthMode = "signin" | "signup";

type FormState = {
  email: string;
  password: string;
  program: string;
  course: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    program: "",
    course: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createSession = useCallback(async (token: string) => {
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error("Could not start a session. Please try again.");
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        await createSession(token);
        router.replace("/account");
        router.refresh();
      } catch {
        // Ignore auto-redirect if session sync fails.
      }
    });

    return () => unsubscribe();
  }, [createSession, router]);

  const onChange = (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const credential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        const user = credential.user;

        await setDoc(
          doc(db, "profiles", user.uid),
          {
            email: user.email ?? form.email,
            program: form.program || null,
            course: form.course || null,
            createdAt: serverTimestamp()
          },
          { merge: true }
        );

        const token = await user.getIdToken();
        await createSession(token);
      } else {
        const credential = await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        const token = await credential.user.getIdToken();
        await createSession(token);
      }

      router.push("/account");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="account-shell">
      <div className="account-header">
        <div>
          <p className="account-kicker">Account</p>
          <h2>{mode === "signin" ? "Sign in" : "Create your account"}</h2>
          <p className="account-sub">
            {mode === "signin"
              ? "Access your saved courses and program details."
              : "Save your program + course details for your dashboard."}
          </p>
        </div>
        <div className="account-actions">
          <Link className="button" href="/">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="auth-toggle">
        <button
          className={`button ${mode === "signin" ? "primary" : ""}`}
          type="button"
          onClick={() => setMode("signin")}
        >
          Sign in
        </button>
        <button
          className={`button ${mode === "signup" ? "primary" : ""}`}
          type="button"
          onClick={() => setMode("signup")}
        >
          Sign up
        </button>
      </div>

      <div className="account-card auth-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={onChange("password")}
            required
          />

          {mode === "signup" && (
            <>
              <label htmlFor="program">Program</label>
              <input
                id="program"
                type="text"
                value={form.program}
                onChange={onChange("program")}
                placeholder="Anthropology"
              />

              <label htmlFor="course">Course</label>
              <input
                id="course"
                type="text"
                value={form.course}
                onChange={onChange("course")}
                placeholder="Human Evolution Sprint"
              />
            </>
          )}

          {error && <p className="auth-error">{error}</p>}

          <button className="button primary" type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </section>
  );
}
