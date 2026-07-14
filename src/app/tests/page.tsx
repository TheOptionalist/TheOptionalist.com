import Link from "next/link";
import { redirect } from "next/navigation";
import PaidUnlockButton from "@/components/PaidUnlockButton";
import { MOCK_TESTS_PASS_PRODUCT } from "@/lib/paidLearning";
import { hasMockTestsAccess } from "@/lib/paymentAccess";
import { getProfileByUid, getServerSession } from "@/lib/firebaseServer";
import { getTestSections } from "@/lib/testLibrary";

export const dynamic = "force-dynamic";

export default async function TestsPage() {
  const { user } = await getServerSession();

  if (!user) {
    redirect("/login?next=/tests");
  }

  const { profile } = await getProfileByUid(user.uid);
  const hasPass = hasMockTestsAccess(profile);
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
        <div className="hero-highlights" aria-label="Mock tests access">
          <span>{hasPass ? "Mock pass active" : "Mock pass locked"}</span>
          <span>One purchase unlocks all mocks</span>
          <span>Rs {MOCK_TESTS_PASS_PRODUCT.amountInRupees}</span>
        </div>
      </section>

      {!hasPass ? (
        <section>
          <div className="resource-grid">
            <article className="resource-card paid-module-card">
              <p className="resource-meta">Paid Mock Tests</p>
              <h3>{MOCK_TESTS_PASS_PRODUCT.title}</h3>
              <p>{MOCK_TESTS_PASS_PRODUCT.description}</p>
              <PaidUnlockButton
                productId={MOCK_TESTS_PASS_PRODUCT.id}
                label={`Unlock all mock tests for Rs ${MOCK_TESTS_PASS_PRODUCT.amountInRupees}`}
              />
            </article>
          </div>
        </section>
      ) : null}

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
              {hasPass ? (
                <Link className="button primary" href={section.href}>
                  {section.ctaLabel}
                </Link>
              ) : (
                <span className="button is-disabled">Locked</span>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
