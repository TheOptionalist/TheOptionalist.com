import Link from "next/link";
import { getFeaturedTestTracks } from "@/lib/testLibrary";

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
  const featuredTestTracks = getFeaturedTestTracks();

  return (
    <div className="home-shell">
      <section className="hero home-hero">
        <div className="home-hero-content">
          <h1>Think Like a Topper, Not a Memorizer</h1>
          <p className="home-hero-copy">
            Focused Anthropology and PSIR notes, lectures, and revision paths for
            serious UPSC and UGC NET preparation.
          </p>
          <div className="hero-actions">
            <Link className="button primary accent hero-cta" href="/courses">
              Start Learning
            </Link>
          </div>
        </div>

        <div className="home-hero-visual" aria-hidden="true">
          <div className="home-hero-grid" />
          <div className="home-hero-orbit home-hero-orbit-outer" />
          <div className="home-hero-orbit home-hero-orbit-inner" />
          <div className="home-hero-beam home-hero-beam-a" />
          <div className="home-hero-beam home-hero-beam-b" />
          <div className="home-hero-core">
            <span className="home-hero-core-kicker">Study Engine</span>
            <strong>Notes, lectures, revision</strong>
          </div>
          <div className="home-hero-card home-hero-card-a">
            <span>Anthropology</span>
            <strong>Theory to archaeology</strong>
          </div>
          <div className="home-hero-card home-hero-card-b">
            <span>PSIR</span>
            <strong>Thinkers, state, global order</strong>
          </div>
          <div className="home-hero-card home-hero-card-c">
            <span>UPSC Prelims</span>
            <strong>Economy and polity flow</strong>
          </div>
          <div className="home-hero-pulse home-hero-pulse-a" />
          <div className="home-hero-pulse home-hero-pulse-b" />
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

      <section className="courses" aria-labelledby="tests-title">
        <div className="courses-intro">
          <div>
            <p className="section-kicker">Tests</p>
            <h2 className="section-title" id="tests-title">
              Add practice rounds to your study flow
            </h2>
            <p className="courses-copy">
              Switch from passive reading to active recall with prelims drills,
              revision shelves, and subject-focused practice lanes.
            </p>
          </div>
          <Link className="button primary" href="/tests">
            View All Tests
          </Link>
        </div>

        <div className="courses-grid">
          {featuredTestTracks.map((testTrack) => (
            <article className="course-card" key={testTrack.title}>
              <div className="course-card-top">
                <div className="course-meta">{testTrack.meta}</div>
                <span className="course-status">{testTrack.status}</span>
              </div>
              <h3>{testTrack.title}</h3>
              <p className="course-summary">{testTrack.summary}</p>
              <div className="course-facts">
                <div>
                  <span>Best for</span>
                  <strong>{testTrack.bestFor}</strong>
                </div>
                <div>
                  <span>Format</span>
                  <strong>{testTrack.format}</strong>
                </div>
              </div>
              <ul className="course-points">
                {testTrack.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link className="button primary accent" href={testTrack.href}>
                {testTrack.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
