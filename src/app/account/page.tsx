import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, program, course, created_at")
    .eq("id", user.id)
    .maybeSingle();

  const email = profile?.email ?? user.email ?? "—";
  const program = profile?.program ?? "—";
  const course = profile?.course ?? "—";
  const joined = profile?.created_at ?? user.created_at ?? "";

  return (
    <section className="account-shell">
      <div className="account-header">
        <div>
          <p className="account-kicker">My Account</p>
          <h2>Profile Details</h2>
          <p className="account-sub">
            Your saved program and course details are shown below.
          </p>
        </div>
        <div className="account-actions">
          <Link className="button" href="/">
            Back to Home
          </Link>
          <form
            action={async () => {
              "use server";
              const supabaseServer = createSupabaseServerClient();
              await supabaseServer.auth.signOut();
            }}
          >
            <button className="button" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="account-card">
        <div className="account-row">
          <span>Email</span>
          <strong>{email}</strong>
        </div>
        <div className="account-row">
          <span>Program</span>
          <strong>{program}</strong>
        </div>
        <div className="account-row">
          <span>Course</span>
          <strong>{course}</strong>
        </div>
        <div className="account-row">
          <span>Joined</span>
          <strong>{joined ? new Date(joined).toLocaleDateString() : "—"}</strong>
        </div>
      </div>

      <p className="account-note">
        These details come from your Supabase profile record.
      </p>
    </section>
  );
}
