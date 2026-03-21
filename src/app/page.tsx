import Link from "next/link";

const paths = [
  {
    title: "Anthropology",
    description: "Human evolution, socio-cultural anthropology, and topic-wise exam support.",
    href: "/anthropology",
    highlights: [
      "UPSC CSE: Neanderthals",
      "UPSC CSE: Homo erectus",
      "UGC NET: Neanderthals"
    ]
  },
  {
    title: "PSIR",
    description: "Political theory and international relations explained in a clean academic style.",
    href: "/psir",
    highlights: [
      "UPSC CSE: Liberal Theory of State",
      "UGC NET: Liberal Theory of State"
    ]
  },
  {
    title: "Blogs",
    description: "Supportive reading pieces that connect concepts, debates, and answer writing.",
    href: "/blogs",
    highlights: ["The Anthropology of Belief", "The State in a Globalizing World"]
  }
];

const heroStats = [
  { value: "UPSC + UGC", label: "exam aligned tracks" },
  { value: "Topic-wise", label: "study material" },
  { value: "Mobile ready", label: "clean reading flow" },
  { value: "Account sync", label: "saved student details" }
];

const studioNotes = [
  "Clear topic-wise notes written in simple but professional academic language.",
  "Quick revision points, prompts, and support blocks inside lessons.",
  "A user-friendly layout that helps students study faster on phone and desktop."
];

const studyToolkit = [
  {
    title: "Structured Notes",
    description: "Each topic is arranged so students can scan first and study deeply after.",
    points: ["Short introductions", "Clean section flow", "Readable layout"]
  },
  {
    title: "Revision Support",
    description: "Important concepts are broken into easier pieces for faster recall before exams.",
    points: ["Key points", "Quick revision", "Mini glossary"]
  },
  {
    title: "Exam Utility",
    description: "The material is designed to help with understanding as well as answer framing.",
    points: ["Prompt-based learning", "Concept clarity", "Exam-focused phrasing"]
  }
];

const courses = [
  {
    meta: "Anthropology - UPSC Folder",
    title: "Anthropology UPSC Lecture Notes",
    description:
      "Theory, Indian anthropology, biological anthropology, and archaeology arranged into a cleaner study folder.",
    points: ["37 PDFs", "4 study modules", "Direct open PDF flow"],
    href: "/courses/folders/anthropology-upsc-lecture-notes"
  },
  {
    meta: "Anthropology - UGC Folder",
    title: "Anthropology UGC Lecture Notes",
    description:
      "Human evolution, genetics, variation, and growth arranged into a clearer UGC revision folder.",
    points: ["37 PDFs", "4 study modules", "Direct open PDF flow"],
    href: "/courses/folders/anthropology-ugc-lecture-notes"
  },
  {
    meta: "PSIR - UPSC Folder",
    title: "PSIR UPSC Lecture Notes",
    description:
      "Political theory foundations, state debates, ideologies, and global order arranged into a cleaner study folder.",
    points: ["31 PDFs", "4 study modules", "Direct open PDF flow"],
    href: "/courses/folders/psir-upsc-lecture-notes"
  },
  {
    meta: "PSIR - UGC Folder",
    title: "PSIR UGC Lecture Notes",
    description:
      "Political theory concepts, comparative politics, thinkers, and Indian thought arranged into a cleaner UGC revision folder.",
    points: ["30 PDFs", "4 study modules", "Direct open PDF flow"],
    href: "/courses/folders/psir-ugc-lecture-notes"
  },
  {
    meta: "Mixed - Revision Library",
    title: "Revision Lectures",
    description:
      "Short revision lectures across Anthropology and PSIR arranged into a quick-access folder for faster recall.",
    points: ["3 PDFs", "4 revision blocks", "Direct open PDF flow"],
    href: "/courses/folders/revision-lectures"
  }
];

export default function Home() {
  return (
    <div className="home-shell">
      <section className="hero hero-home">
        <div className="hero-copy">
          <p className="eyebrow">Professional study material for Anthropology and PSIR</p>
          <h1>User-friendly notes that still feel serious and academic.</h1>
          <p>
            The Optionalist is built as a clean study-material website for UPSC, UGC
            NET, and higher-level reading. It focuses on clarity, fast access, and a
            professional structure so students can move from reading to revision
            without confusion.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/courses">
              Browse All Courses
            </Link>
          </div>
          <div className="hero-highlights" aria-label="Highlights">
            <span>Study Notes</span>
            <span>Revision Support</span>
            <span>Exam Utility</span>
            <span>Professional Layout</span>
          </div>
        </div>

        <div className="hero-side">
          <div className="hero-note">
            <p className="mini-label">Student first design</p>
            <h3>Study material that feels clean, focused, and easy to use.</h3>
            <ul className="hero-checklist">
              {studioNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="hero-stats">
            {heroStats.map((item) => (
              <div className="stat-card" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
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
          <p className="user-panel-kicker">Student account</p>
          <h3>Keep your learning details in one place</h3>
          <p>
            Students can quickly access saved program, course, and joined details
            without digging through cluttered pages.
          </p>
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

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Why this feels easier</p>
            <h2 className="section-title">Everything is arranged for fast study and easy revision.</h2>
          </div>
          <p className="section-copy">
            Instead of looking like a random content dump, the site now reads like a
            proper academic material library with clear blocks and better scanning.
          </p>
        </div>

        <div className="feature-grid">
          {studyToolkit.map((item) => (
            <article className="feature-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul className="feature-list">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="courses">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Core material</p>
            <h2 className="section-title">Open the subject area you need right now.</h2>
          </div>
          <p className="section-copy">
            Each section is presented as study material first, with cleaner entry
            points and more direct next steps for students.
          </p>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.title}>
              <div className="course-label">{course.meta}</div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <ul className="course-points">
                {course.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link className="button primary accent" href={course.href}>
                Open Material
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="paths">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Material library</p>
            <h2 className="section-title">Choose the subject path that matches your goal.</h2>
          </div>
          <p className="section-copy">
            Start with a subject, move into important topics, and then expand into
            support reading for wider understanding.
          </p>
        </div>

        <div className="path-grid">
          {paths.map((path, index) => (
            <article className="path-card" key={path.title}>
              <p className="path-index">Path {String(index + 1).padStart(2, "0")}</p>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <ul className="path-highlights">
                {path.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="path-link" href={path.href}>
                Explore {path.title}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
