import Link from "next/link";
import { redirect } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PaidUnlockButton from "@/components/PaidUnlockButton";
import {
  NET_JRF_ANTHROPOLOGY_COURSE,
  netJrfAnthropologyModules
} from "@/lib/paidLearning";
import { getUnlockedNetJrfModuleIds } from "@/lib/paymentAccess";
import { getProfileByUid, getServerSession } from "@/lib/firebaseServer";

export const dynamic = "force-dynamic";

export default async function NetJrfAnthropologyPage() {
  const { user } = await getServerSession();

  if (!user) {
    redirect("/login?next=/courses/net-jrf-anthropology");
  }

  const { profile } = await getProfileByUid(user.uid);
  const unlockedModuleIds = getUnlockedNetJrfModuleIds(profile);
  const unlockedCount = unlockedModuleIds.size;

  return (
    <div className="page-stack">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: NET_JRF_ANTHROPOLOGY_COURSE.title }
        ]}
      />

      <section className="hero">
        <div>
          <p className="eyebrow">Paid Course</p>
          <h1>{NET_JRF_ANTHROPOLOGY_COURSE.title}</h1>
          <p>{NET_JRF_ANTHROPOLOGY_COURSE.description}</p>
        </div>
        <div className="hero-highlights" aria-label="NET JRF Anthropology overview">
          <span>7 monthly modules</span>
          <span>Rs {NET_JRF_ANTHROPOLOGY_COURSE.pricePerModuleInRupees} per module</span>
          <span>{unlockedCount} unlocked</span>
          <span>Pay module-by-module</span>
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Monthly Modules</p>
            <h2 className="section-title">Unlock only the module you want to study.</h2>
          </div>
          <p className="section-copy">
            All modules are locked by default. After successful payment, access is
            saved on your account and remains available after login.
          </p>
        </div>

        <div className="resource-grid">
          {netJrfAnthropologyModules.map((module) => {
            const isUnlocked = unlockedModuleIds.has(module.id);

            return (
              <article className="resource-card paid-module-card" key={module.id}>
                <p className="resource-meta">
                  Month {module.month} - {isUnlocked ? "Unlocked" : "Locked"}
                </p>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <ul className="resource-points">
                  {module.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>

                {isUnlocked ? (
                  <div className="paid-module-unlocked">
                    <p>
                      Access active. Study notes, videos, and practice material for this
                      month can be attached here.
                    </p>
                    <Link className="button primary" href="/tests/ugc-net-anthropology">
                      Practice Anthropology Tests
                    </Link>
                  </div>
                ) : (
                  <PaidUnlockButton
                    productId={module.productId}
                    label={`Unlock for Rs ${module.priceInRupees}`}
                  />
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
