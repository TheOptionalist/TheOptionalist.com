import Link from "next/link";
import { formatDate } from "@/lib/formatDate";
import { getFirebaseAdmin } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

type Profile = {
  id: string;
  email?: string;
  program?: string | null;
  course?: string | null;
  createdAt?: unknown;
};

export default async function AdminPage() {
  const { db, error: clientError } = getFirebaseAdmin();
  let data: Profile[] = [];
  let error: Error | null = clientError;

  if (db) {
    try {
      const snapshot = await db
        .collection("profiles")
        .orderBy("createdAt", "desc")
        .limit(200)
        .get();

      data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Profile, "id">)
      }));
      error = null;
    } catch (err) {
      error = err as Error;
    }
  }

  const profiles = data ?? [];

  return (
    <section className="admin-shell">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Admin Panel</p>
          <h2>User Program Overview</h2>
          <p className="admin-sub">
            Showing latest registrations with program and course mapping.
          </p>
        </div>
        <div className="admin-actions">
          <Link className="button" href="/">
            Back to Site
          </Link>
          <form action="/api/admin/logout" method="post">
            <button className="button" type="submit">
              Log out
            </button>
          </form>
        </div>
      </div>

      <div className="admin-metrics">
        <div className="admin-card">
          <span>Total Users</span>
          <strong>{profiles.length}</strong>
        </div>
      </div>

      {error ? (
        <div className="admin-card admin-error">
          <p>Could not load profiles.</p>
          <code>{error.message}</code>
        </div>
      ) : profiles.length === 0 ? (
        <div className="admin-card">
          <p>No user data yet. Add documents to the profiles collection in Firebase.</p>
        </div>
      ) : (
        <div className="admin-table">
          <div className="admin-table-row admin-table-head">
            <span>Email</span>
            <span>Program</span>
            <span>Course</span>
            <span>Joined</span>
          </div>
          {profiles.map((profile) => (
            <div className="admin-table-row" key={profile.id}>
              <span>{profile.email ?? "-"}</span>
              <span>{profile.program ?? "-"}</span>
              <span>{profile.course ?? "-"}</span>
              <span>{formatDate(profile.createdAt)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
