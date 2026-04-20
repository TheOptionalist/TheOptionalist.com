import Link from "next/link";
import { getTestSections } from "@/lib/testLibrary";

export default function TestsPage() {
  const testSections = getTestSections();

  return (
    <div className="page-stack test-page">
      <section className="hero">
        <div>
          <p className="eyebrow">Tests</p>
          <h1>Choose the exam section you want to practice in.</h1>
          <p>
            Open the right subsection below for UGC NET, UPSC optional subjects,
            or prelims-focused preparation.
          </p>
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Sub Sections</p>
            <h2 className="section-title">Five focused entry points for your test flow.</h2>
          </div>
          <p className="section-copy">
            Each block leads into an existing study route so you can keep practice aligned
            with the subject and exam you are targeting.
          </p>
        </div>

        <div className="resource-grid">
          {testSections.map((section) => (
            <article className="resource-card" key={`${section.meta}-${section.title}`}>
              <p className="resource-meta">{section.meta}</p>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <Link className="button primary" href={section.href}>
                {section.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
