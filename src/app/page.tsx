import Link from "next/link";

const paths = [
  {
    title: "Anthropology",
    description: "Human evolution, cultural inquiry, and exam-ready conceptual clarity.",
    href: "/anthropology",
    highlights: [
      "UPSC CSE: Neanderthals",
      "UPSC CSE: Homo erectus",
      "UGC NET: Neanderthals"
    ]
  },
  {
    title: "PSIR",
    description: "Political theory and international relations with a crisp, scholarly lens.",
    href: "/psir",
    highlights: [
      "UPSC CSE: Liberal Theory of State",
      "UGC NET: Liberal Theory of State"
    ]
  },
  {
    title: "Blogs",
    description: "Short-form reflections and thematic essays that connect the disciplines.",
    href: "/blogs",
    highlights: ["The Anthropology of Belief", "The State in a Globalizing World"]
  }
];

const courses = [
  {
    meta: "Anthropology • UPSC",
    title: "Human Evolution Sprint",
    description:
      "Neanderthals, Homo erectus, and cultural transitions with exam-ready notes.",
    points: ["Quick revision sheets", "PYQ-aligned prompts", "Mini-glossary"],
    price: "₹299",
    href: "/anthropology"
  },
  {
    meta: "PSIR • UPSC",
    title: "Political Theory Core",
    description:
      "State, sovereignty, liberalism, and comparative answers with crisp models.",
    points: ["Topic briefs", "Answer frameworks", "Weekly plan"],
    price: "₹299",
    href: "/psir"
  },
  {
    meta: "Ivy League Notes",
    title: "Research-Grade Notes",
    description:
      "Interdisciplinary readings with exam translation for quick recall.",
    points: ["Critical summaries", "Comparative angles", "Model answers"],
    price: "₹499",
    href: "/blogs"
  }
];

export default function Home() {
  return (
    <div>
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
          <p>
            View email, program, course, and joined date from your dashboard.
          </p>
        </div>
        <div className="user-panel-actions">
          <Link className="button primary" href="/account">
            Open Account
          </Link>
          <Link className="button" href="/login">
            Login
          </Link>
        </div>
      </section>

      <section className="hero">
        <div>
          <h2>Welcome to The Optionalist</h2>
          <p>
            Explore UPSC, UGC NET, and Ivy League-level content in Anthropology and
            PSIR. The Optionalist is a studio for focused, exam-aligned scholarship
            that still feels like an invitation to think deeply. Each lesson now
            includes quick summaries, key points, exam prompts, and a mini glossary.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="button primary" href="/anthropology">
            Start with Anthropology
          </Link>
          <Link className="button" href="/psir">
            Enter PSIR
          </Link>
          <Link className="button" href="/blogs">
            Read Essays
          </Link>
        </div>
      </section>

      <section className="courses">
        <div className="section-title">Courses</div>
        <div className="courses-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.title}>
              <div className="course-meta">{course.meta}</div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <ul className="course-points">
                {course.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="course-price">{course.price}</div>
              <Link className="button primary" href={course.href}>
                Enroll Now
              </Link>
            </article>
          ))}
        </div>
      </section>

      <h3 className="section-title">Your Learning Paths</h3>
      <div className="grid cols-3">
        {paths.map((path) => (
          <div className="card" key={path.title}>
            <h3>{path.title}</h3>
            <p>{path.description}</p>
            <ul className="list">
              {path.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href={path.href}>Explore {path.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
