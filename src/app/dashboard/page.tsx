?import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

const demoCourses = [
  {
    title: "Human Evolution Sprint",
    status: "Active",
    nextLesson: "Homo erectus quick revision",
    progress: 72
  },
  {
    title: "Political Theory Core",
    status: "Active",
    nextLesson: "Liberal theory frameworks",
    progress: 45
  },
  {
    title: "Research-Grade Notes",
    status: "Upcoming",
    nextLesson: "Interdisciplinary reading",
    progress: 0
  }
];

const demoPayments = [
  { item: "Human Evolution Sprint", amount: "Rs 299", date: "2026-01-22" },
  { item: "Political Theory Core", amount: "Rs 299", date: "2026-01-30" }
];

export default async function DashboardPage() {
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

  const email = profile?.email ?? user.email ?? "-";
  const program = profile?.program ?? "-";
  const course = profile?.course ?? "-";
  const joined = profile?.created_at ?? user.created_at ?? "";

  return (
    <section className="dashboard-shell">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-kicker">User Dashboard</p>
          <h2>Welcome back</h2>
          <p className="dashboard-sub">
            Track your courses, progress, notes, and payments in one place.
          </p>
        </div>
        <div className="dashboard-actions">
          <Link className="button" href="/account">
            View Account
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

      <div className="dashboard-metrics">
        <div className="dashboard-card">
          <span>Email</span>
          <strong>{email}</strong>
        </div>
        <div className="dashboard-card">
          <span>Program</span>
          <strong>{program}</strong>
        </div>
        <div className="dashboard-card">
          <span>Primary Course</span>
          <strong>{course}</strong>
        </div>
        <div className="dashboard-card">
          <span>Joined</span>
          <strong>{joined ? new Date(joined).toLocaleDateString() : "-"}</strong>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <div className="dashboard-panel-head">
            <h3>My Courses</h3>
            <Link href="/anthropology">Browse courses</Link>
          </div>
          <div className="course-list">
            {demoCourses.map((courseItem) => (
              <article className="course-item" key={courseItem.title}>
                <div>
                  <h4>{courseItem.title}</h4>
                  <p>{courseItem.nextLesson}</p>
                </div>
                <div className="course-meta">
                  <span>{courseItem.status}</span>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${courseItem.progress}%` }}
                    />
                  </div>
                  <small>{courseItem.progress}% complete</small>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-head">
            <h3>Notes and Downloads</h3>
            <Link href="/blogs">Open library</Link>
          </div>
          <div className="notes-grid">
            <div className="notes-card">
              <h4>Homo erectus revision pack</h4>
              <p>Quick recall sheet and exam prompts.</p>
              <button className="button">Download PDF</button>
            </div>
            <div className="notes-card">
              <h4>Liberal theory framework</h4>
              <p>Answer models and comparison table.</p>
              <button className="button">Download PDF</button>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-head">
            <h3>Payments</h3>
            <Link href="/">View invoices</Link>
          </div>
          <div className="payment-list">
            {demoPayments.map((payment) => (
              <div className="payment-item" key={`${payment.item}-${payment.date}`}>
                <div>
                  <h4>{payment.item}</h4>
                  <p>{new Date(payment.date).toLocaleDateString()}</p>
                </div>
                <strong>{payment.amount}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-head">
            <h3>Progress Tracker</h3>
            <Link href="/">Update goals</Link>
          </div>
          <div className="progress-card">
            <div>
              <h4>Weekly target</h4>
              <p>Complete 4 lessons and 2 answer drafts.</p>
            </div>
            <div className="progress-ring">
              <span>3/6</span>
            </div>
          </div>
          <div className="progress-list">
            <div>
              <span>Lessons completed</span>
              <strong>3</strong>
            </div>
            <div>
              <span>Answer drafts</span>
              <strong>1</strong>
            </div>
            <div>
              <span>Revision sessions</span>
              <strong>2</strong>
            </div>
          </div>
        </div>
      </div>

      <p className="dashboard-note">
        This dashboard uses demo sections for courses, notes, payments, and progress.
        Once payments and course data are connected, these will update automatically.
      </p>
    </section>
  );
}
