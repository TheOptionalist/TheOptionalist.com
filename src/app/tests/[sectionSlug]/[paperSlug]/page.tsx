import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import TestPaperRunner from "@/components/TestPaperRunner";
import { getTestPaperBySlugs, getTestSectionBySlug } from "@/lib/testLibrary";

export default function TestPaperPage({
  params
}: {
  params: { sectionSlug: string; paperSlug: string };
}) {
  const section = getTestSectionBySlug(params.sectionSlug);
  const paper = getTestPaperBySlugs(params.sectionSlug, params.paperSlug);

  if (!section || !paper) {
    notFound();
  }

  return (
    <div className="page-stack">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tests", href: "/tests" },
          { label: section.title, href: `/tests/${section.slug}` },
          { label: paper.title }
        ]}
      />

      <section className="hero">
        <div>
          <p className="eyebrow">{paper.level}</p>
          <h1>{paper.title}</h1>
          <p>{paper.summary}</p>
        </div>
        <div className="hero-highlights" aria-label={`${paper.title} overview`}>
          <span>{paper.questions.length} MCQs</span>
          <span>{paper.duration}</span>
          <span>{paper.sourceLabel}</span>
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Question Paper</p>
            <h2 className="section-title">Practice the paper and check the answer key.</h2>
          </div>
          <p className="section-copy">
            Every question below includes answer and rationale so you can revise concepts while
            checking accuracy.
          </p>
        </div>
        <TestPaperRunner questions={paper.questions} />
      </section>
    </div>
  );
}
