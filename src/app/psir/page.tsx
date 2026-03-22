import Link from "next/link";
import { getCourseHref, getCoursesBySubject } from "@/lib/courseCatalog";

export default function PsirPage() {
  const resources = getCoursesBySubject("PSIR");
  const featuredLinks = resources.slice(0, 2);

  return (
    <div className="page-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">PSIR study material</p>
          <h1>Political Science material arranged with more clarity and structure.</h1>
          <p>
            Dive into political theory and international relations with a more
            professional layout built for UPSC and UGC NET preparation.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="button primary accent" href="/courses/folders/psir-upsc-lecture-notes">
            PSIR UPSC Course
          </Link>
          <Link className="button accent" href="/courses/folders/psir-ugc-lecture-notes">
            PSIR UGC Course
          </Link>
          {featuredLinks.map((resource) => (
            <Link
              className="button"
              href={getCourseHref(resource)}
              key={resource.slug}
            >
              {resource.track}: {resource.title}
            </Link>
          ))}
        </div>
        <div className="hero-highlights" aria-label="Highlights">
          <span>Political theory</span>
          <span>IR concepts</span>
          <span>Answer writing support</span>
          <span>Professional flow</span>
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Available resources</p>
            <h2 className="section-title">Choose the PSIR lesson you want to open.</h2>
          </div>
          <p className="section-copy">
            Published PSIR lessons from the catalog appear here automatically,
            including any future courses synced from Google Drive.
          </p>
        </div>

        <div className="resource-grid">
          <article className="resource-card">
            <p className="resource-meta">PSIR UPSC</p>
            <h3>Full lecture-note folder</h3>
            <p>
              Political theory, state and power debates, ideologies, thinkers, aur
              global-order topics ko module-wise organize karke complete UPSC folder
              ready hai.
            </p>
            <Link className="button primary accent" href="/courses/folders/psir-upsc-lecture-notes">
              Open Folder
            </Link>
          </article>

          <article className="resource-card">
            <p className="resource-meta">PSIR UGC</p>
            <h3>UGC lecture-note folder</h3>
            <p>
              Political theory concepts, comparative politics, thinkers, aur Indian
              political thought ko module-wise organize karke complete UGC folder
              ready hai.
            </p>
            <Link className="button accent" href="/courses/folders/psir-ugc-lecture-notes">
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
