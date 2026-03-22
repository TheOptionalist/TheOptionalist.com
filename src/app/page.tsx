import Link from "next/link";

const courses = [
  {
    meta: "Anthropology · UPSC",
    status: "Primary Track",
    title: "Anthropology UPSC Lecture Notes",
    summary:
      "Open the full Anthropology UPSC note library with theory, Indian anthropology, biological anthropology, and archaeology blocks.",
    bestFor: "Complete optional flow",
    format: "37 PDFs · 4 modules",
    points: [
      "Theory to archaeology in one folder",
      "Topic-wise PDF library for UPSC",
      "Direct open and study flow"
    ],
    href: "/courses/folders/anthropology-upsc-lecture-notes"
  },
  {
    meta: "Anthropology · UGC NET",
    status: "Revision Track",
    title: "Anthropology UGC Lecture Notes",
    summary:
      "Study human evolution, genetics, variation, and growth through a cleaner UGC note folder built for direct revision.",
    bestFor: "UGC anthropology revision",
    format: "37 PDFs · 4 modules",
    points: [
      "Evolution sequence arranged topic wise",
      "Genetics and variation in one place",
      "Direct PDF access for quick study"
    ],
    href: "/courses/folders/anthropology-ugc-lecture-notes"
  },
  {
    meta: "PSIR · UPSC",
    status: "Theory Track",
    title: "PSIR UPSC Lecture Notes",
    summary:
      "Open the PSIR UPSC note folder with political theory foundations, state debates, ideologies, and global-order themes.",
    bestFor: "PSIR UPSC preparation",
    format: "31 PDFs · 4 modules",
    points: [
      "Political theory and state debates together",
      "Thinkers, ideologies, and democracy topics",
      "Direct PDF flow for topic-wise study"
    ],
    href: "/courses/folders/psir-upsc-lecture-notes"
  },
  {
    meta: "PSIR · UGC NET",
    status: "Revision Track",
    title: "PSIR UGC Lecture Notes",
    summary:
      "Open the PSIR UGC note folder with theory concepts, comparative politics, thinkers, and Indian thought arranged for cleaner revision.",
    bestFor: "UGC NET PSIR revision",
    format: "30 PDFs · 4 modules",
    points: [
      "Concepts, traditions, and theory blocks",
      "Comparative politics with constitutional themes",
      "Direct PDF flow for UGC-focused study"
    ],
    href: "/courses/folders/psir-ugc-lecture-notes"
  },
  {
    meta: "Anthropology + PSIR",
    status: "Reference Library",
    title: "Revision Lectures",
    summary:
      "Open short revision lectures across Anthropology and PSIR from one quick-access folder built for refresh and recall.",
    bestFor: "Fast topic recap",
    format: "3 PDFs · 4 blocks",
    points: [
      "Anthropology and PSIR revision in one place",
      "Short refresher PDFs for quick recall",
      "Future revision slots already prepared"
    ],
    href: "/courses/folders/revision-lectures"
  }
];

export default function Home() {
  return (
    <div className="home-shell">
      <section className="hero">
        <div>
          <h1>Welcome to The Optionalist</h1>
          <p>
            Explore UPSC, UGC NET, and Ivy League-level content in Anthropology and
            PSIR. The Optionalist is a studio for focused, exam-aligned scholarship
            that still feels like an invitation to think deeply. Each lesson includes
            quick summaries, key points, exam prompts, and a mini glossary.
          </p>
        </div>
      </section>

      <section className="courses" aria-labelledby="courses-title">
        <div className="courses-intro">
          <div>
            <p className="section-kicker">Featured Courses</p>
            <h2 className="section-title" id="courses-title">
              Start with a structured study path
            </h2>
            <p className="courses-copy">
              Choose a track, study topic by topic, and revise with compact notes
              built for serious exam preparation.
            </p>
          </div>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.title}>
              <div className="course-card-top">
                <div className="course-meta">{course.meta}</div>
                <span className="course-status">{course.status}</span>
              </div>
              <h3>{course.title}</h3>
              <p className="course-summary">{course.summary}</p>
              <div className="course-facts">
                <div>
                  <span>Best for</span>
                  <strong>{course.bestFor}</strong>
                </div>
                <div>
                  <span>Format</span>
                  <strong>{course.format}</strong>
                </div>
              </div>
              <ul className="course-points">
                {course.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link className="button primary accent" href={course.href}>
                View Track
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="user-panel">
        <div className="user-panel-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" role="img">
            <path
              d="M24 24c5.1 0 9.2-4.1 9.2-9.2S29.1 5.6 24 5.6s-9.2 4.1-9.2 9.2S18.9 24 24 24Z"
              fill="currentColor"
              opacity="0.7"
            />
            <path
              d="M9.6 40.4c0-6.3 6.5-11.4 14.4-11.4s14.4 5.1 14.4 11.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="user-panel-kicker">User Panel</p>
          <h3>See your account details</h3>
          <p>View email, program, course, and joined date from your dashboard.</p>
        </div>
        <div className="user-panel-actions">
          <Link className="button primary accent" href="/account">
            Open Account
          </Link>
          <Link className="button" href="/login">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
}
