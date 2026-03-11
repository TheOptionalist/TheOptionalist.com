"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";

type AuthMode = "signin" | "signup" | "reset";

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
  const [notice, setNotice] = useState<string | null>(null);
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
    setNotice(null);
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

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    try {
      if (!form.email) {
        throw new Error("Please enter your email address.");
      }
      await sendPasswordResetEmail(auth, form.email);
      setNotice("Reset link sent. Check your inbox.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not send reset email. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setError(null);
    setNotice(null);
  };

  return (
    <section className="account-shell">
      <div className="account-header">
        <div>
          <p className="account-kicker">Account</p>
          <h2>
            {mode === "signin"
              ? "Sign in"
              : mode === "signup"
                ? "Create your account"
                : "Reset your password"}
          </h2>
          <p className="account-sub">
            {mode === "signin"
              ? "Access your saved courses and program details."
              : mode === "signup"
                ? "Save your program and course details for your dashboard."
                : "We will email you a secure reset link."}
          </p>
        </div>
        <div className="account-actions">
          <Link className="button" href="/">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="auth-grid">
        <div className="account-card auth-card">
          <div className="auth-tabs">
            <button
              className={`button ${mode === "signin" ? "primary" : ""}`}
              type="button"
              onClick={() => switchMode("signin")}
            >
              Sign in
            </button>
            <button
              className={`button ${mode === "signup" ? "primary" : ""}`}
              type="button"
              onClick={() => switchMode("signup")}
            >
              Sign up
            </button>
            <button
              className={`button ${mode === "reset" ? "primary" : ""}`}
              type="button"
              onClick={() => switchMode("reset")}
            >
              Reset
            </button>
          </div>

          <form onSubmit={mode === "reset" ? handleReset : handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={onChange("email")}
              required
            />

            {mode !== "reset" && (
              <>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={onChange("password")}
                  required
                />
              </>
            )}

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

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}
            {notice && (
              <p className="auth-success" role="status" aria-live="polite">
                {notice}
              </p>
            )}

            <button className="button primary" type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "signin"
                  ? "Sign in"
                  : mode === "signup"
                    ? "Create account"
                    : "Send reset link"}
            </button>

            {mode === "signin" && (
              <button className="auth-link" type="button" onClick={() => switchMode("reset")}>
                Forgot password?
              </button>
            )}
            {mode === "reset" && (
              <button className="auth-link" type="button" onClick={() => switchMode("signin")}>
                Back to sign in
              </button>
            )}
          </form>
        </div>

        <aside className="auth-panel">
          <h3>What you get</h3>
          <p>
            Keep your courses, progress, and notes synced across devices with a secure
            account.
          </p>
          <ul className="auth-list">
            <li>Save program and course details</li>
            <li>Access dashboard progress anytime</li>
            <li>Recover access with reset links</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
