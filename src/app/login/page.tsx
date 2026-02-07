"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type AuthMode = "signin" | "signup";

type FormState = {
  email: string;
  password: string;
  program: string;
  course: string;
};

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    program: "",
    course: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password
        });

        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }

        const userId = data.user?.id;
        if (userId) {
          await supabase.from("profiles").upsert({
            id: userId,
            email: form.email,
            program: form.program || null,
            course: form.course || null
          });
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password
        });

        if (signInError) {
          setError(signInError.message);
          setLoading(false);
          return;
        }
      }

      router.push("/account");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
