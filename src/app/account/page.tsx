import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import { formatDate } from "@/lib/formatDate";
import { getProfileByUid, getServerSession } from "@/lib/firebaseServer";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { user } = await getServerSession();

  if (!user) {
    redirect("/login");
  }

  const { profile } = await getProfileByUid(user.uid);

  const email = profile?.email ?? user.email ?? "-";
  const program = profile?.program ?? "-";
  const course = profile?.course ?? "-";
  const joined = formatDate(profile?.createdAt ?? user.auth_time);

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
          <SignOutButton className="button" />
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
          <strong>{joined}</strong>
        </div>
      </div>

      <p className="account-note">
        These details come from your Firebase profile record.
      </p>
    </section>
  );
}
