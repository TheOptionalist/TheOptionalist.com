import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getTestPapersBySectionSlug, getTestSectionBySlug } from "@/lib/testLibrary";

export default function TestSectionPage({
  params
}: {
  params: { sectionSlug: string };
}) {
  const section = getTestSectionBySlug(params.sectionSlug);

  if (!section) {
    notFound();
  }

  const papers = getTestPapersBySectionSlug(section.slug);
  const totalQuestions = papers.reduce((count, paper) => count + paper.questions.length, 0);

  return (
    <div className="page-stack">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tests", href: "/tests" },
          { label: section.title }
        ]}
      />

      <section className="hero">
        <div>
          <p className="eyebrow">{section.meta}</p>
          <h1>{section.title} Test Section</h1>
          <p>{section.description}</p>
        </div>
        <div className="hero-highlights" aria-label={`${section.title} section overview`}>
          <span>{papers.length} test papers</span>
          <span>{totalQuestions} MCQs</span>
          <span>{section.title}</span>
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Test Papers</p>
            <h2 className="section-title">Open a paper and practice question by question.</h2>
          </div>
          <p className="section-copy">
            Papers added under this section stay aligned with the exact exam stream so revision
            remains targeted instead of mixed.
          </p>
        </div>

        {papers.length > 0 ? (
          <div className="resource-grid">
            {papers.map((paper) => (
              <article className="resource-card" key={paper.slug}>
                <p className="resource-meta">{paper.level}</p>
                <h3>{paper.title}</h3>
                <p>{paper.summary}</p>
                <ul className="resource-points">
                  <li>{paper.questions.length} MCQs</li>
                  <li>{paper.duration}</li>
                  <li>{paper.sourceLabel}</li>
                </ul>
                <Link className="button primary" href={`/tests/${section.slug}/${paper.slug}`}>
                  Open Test Paper
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="resource-grid">
            <article className="resource-card">
              <p className="resource-meta">Coming Soon</p>
              <h3>No test papers added yet.</h3>
              <p>
                This section is ready. You can continue with the aligned study material until we add
                the first paper here.
              </p>
              <Link className="button primary" href={section.supportHref}>
                {section.supportLabel}
              </Link>
            </article>
          </div>
        )}
      </section>
    </div>
  );
}
