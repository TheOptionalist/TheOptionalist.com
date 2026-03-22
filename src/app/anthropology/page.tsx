import Link from "next/link";
import { getCourseHref, getCoursesBySubject } from "@/lib/courseCatalog";

export default function AnthropologyPage() {
  const resources = getCoursesBySubject("Anthropology");
  const featuredLinks = resources.slice(0, 3);

  return (
    <div className="page-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">Anthropology study material</p>
          <h1>Topic-wise Anthropology notes with a cleaner learning flow.</h1>
          <p>
            Explore human origins, cultural change, and exam-critical areas through a
            more user-friendly page structure designed for UPSC and UGC NET students.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="button primary accent" href="/courses/folders/anthropology-upsc-lecture-notes">
            Anthropology UPSC Course
          </Link>
          <Link className="button accent" href="/courses/folders/anthropology-ugc-lecture-notes">
            Anthropology UGC Course
          </Link>
          {featuredLinks.map((resource, index) => (
            <Link
              className={`button ${index === 0 ? "primary" : ""}`}
              href={getCourseHref(resource)}
              key={resource.slug}
            >
              {resource.track}: {resource.title}
            </Link>
          ))}
        </div>
        <div className="hero-highlights" aria-label="Highlights">
          <span>Human evolution</span>
          <span>Exam focus</span>
          <span>Easy scanning</span>
          <span>Study ready</span>
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Available resources</p>
            <h2 className="section-title">Open the Anthropology topic you want to study.</h2>
          </div>
          <p className="section-copy">
            Published Anthropology lessons from the site catalog appear here
            automatically, including future Drive-synced courses.
          </p>
        </div>

        <div className="resource-grid">
          <article className="resource-card">
            <p className="resource-meta">Anthropology UPSC</p>
            <h3>Full lecture-note folder</h3>
            <p>
              Theory, Indian anthropology, biological anthropology, aur prehistory ko
              module-wise arrange karke ek complete UPSC folder ready hai.
            </p>
            <Link className="button primary accent" href="/courses/folders/anthropology-upsc-lecture-notes">
              Open Folder
            </Link>
          </article>

          <article className="resource-card">
            <p className="resource-meta">Anthropology UGC</p>
            <h3>UGC lecture-note folder</h3>
            <p>
              Human evolution, genetics, population variation, aur growth topics ko
              module-wise organize karke UGC flow ready kiya gaya hai.
            </p>
            <Link className="button accent" href="/courses/folders/anthropology-ugc-lecture-notes">
              Open Folder
            </Link>
          </article>

          {resources.map((resource) => (
            <article className="resource-card" key={resource.slug}>
              <p className="resource-meta">{resource.track}</p>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <Link className="button primary" href={getCourseHref(resource)}>
                Open Material
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
