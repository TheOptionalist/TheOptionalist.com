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

export default function Home() {
  return (
    <div>
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
