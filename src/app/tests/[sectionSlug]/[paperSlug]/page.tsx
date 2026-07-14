import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import TestPaperRunner from "@/components/TestPaperRunner";
import { hasMockTestsAccess } from "@/lib/paymentAccess";
import { getProfileByUid, getServerSession } from "@/lib/firebaseServer";
import { getTestPaperBySlugs, getTestSectionBySlug } from "@/lib/testLibrary";

export const dynamic = "force-dynamic";

export default async function TestPaperPage({
  params
}: {
  params: { sectionSlug: string; paperSlug: string };
}) {
  const { user } = await getServerSession();

  if (!user) {
    redirect(`/login?next=/tests/${params.sectionSlug}/${params.paperSlug}`);
  }

  const section = getTestSectionBySlug(params.sectionSlug);
  const paper = getTestPaperBySlugs(params.sectionSlug, params.paperSlug);

  if (!section || !paper) {
    notFound();
  }

  const { profile } = await getProfileByUid(user.uid);

  if (!hasMockTestsAccess(profile)) {
    redirect(`/tests/${params.sectionSlug}`);
  }

  return (
    <div className="page-stack test-page">
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
