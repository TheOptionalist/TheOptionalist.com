import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  getCourseFolderBySlug,
  getCourseFolderModuleAssets,
  getCourseFolders
} from "@/lib/courseFolders";

export function generateStaticParams() {
  return getCourseFolders().map((folder) => ({
    slug: folder.slug
  }));
}

export default function CourseFolderPage({
  params
}: {
  params: { slug: string };
}) {
  const folder = getCourseFolderBySlug(params.slug);

  if (!folder) {
    notFound();
  }

  const modulesWithAssets = folder.modules.map((module) => ({
    ...module,
    assets: getCourseFolderModuleAssets(module)
  }));
  const totalAssets = modulesWithAssets.reduce(
    (count, module) => count + module.assets.length,
    0
  );
  const isReference = folder.studyMode === "reference";
  const heroHighlights = isReference
    ? ["Quick revision", "Topic refresh", "Direct PDF access", "Student-friendly shelf"]
    : ["Sequential learning", "Module-first structure", "Cleaner upload plan", "Student-friendly flow"];
  const flowTitle = isReference
    ? "Open the revision block you need right now."
    : "Finish each module before picking the next one.";
  const flowCopy = isReference
    ? "Yeh folder fast recall ke liye bana hai, isliye jo revision block chahiye usse directly open karke quick refresh le sakte ho."
    : "This folder follows the exact approach you asked for: first one module complete karo, uske baad hi next module uthao.";
  const overviewTitle = isReference
    ? `${folder.title} is now ready for quick access.`
    : `${folder.title} is now loaded.`;
  const overviewCopy = isReference
    ? "Is folder ke andar ab actual revision PDFs available hain, so students quick recall ke liye directly right block open kar sakte hain."
    : "Is folder ke andar ab actual PDFs available hain, so students can module-wise notes open karke directly study start kar sakte hain.";
  const notesTitle = isReference
    ? "Open the revision PDFs directly."
    : "Open each module and study the PDFs directly.";
  const notesCopy = isReference
    ? "Jo topic revise karna hai us block me jao aur PDF ko new tab me open karke short revision start karo."
    : "Module sequence ko follow karo, aur har PDF ko new tab me open karke padho. Isse flow disciplined rahega.";

  return (
    <div className="page-stack">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: folder.title }
        ]}
      />

      <section className="hero">
        <div>
          <p className="eyebrow">{folder.audience}</p>
          <h1>{folder.title}</h1>
          <p>
            {folder.description}{" "}
            {isReference
              ? "This page keeps quick-revision blocks in one place so students can open the needed refresher without extra digging."
              : "This page is designed to keep the study flow in the right order so students finish one module properly before moving ahead."}
          </p>
        </div>
        <div className="hero-highlights" aria-label="Folder workflow">
          {heroHighlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Module order</p>
            <h2 className="section-title">{flowTitle}</h2>
          </div>
          <p className="section-copy">{flowCopy}</p>
        </div>

        <div className="feature-grid">
          {modulesWithAssets.map((module) => (
            <article className="feature-card module-card" key={module.order}>
              <p className="module-order">{module.order}</p>
              <p className="module-status">{module.status}</p>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              {module.assets.length > 0 ? (
                <p className="resource-meta">{module.assets.length} PDFs ready</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {totalAssets > 0 ? (
        <>
          <section>
            <div className="section-intro">
              <div>
                <p className="eyebrow">Folder overview</p>
                <h2 className="section-title">{overviewTitle}</h2>
              </div>
              <p className="section-copy">{overviewCopy}</p>
            </div>

            <div className="resource-grid">
              <article className="resource-card">
                <p className="resource-meta">Web folder path</p>
                <h3>{folder.title}</h3>
                <p className="folder-path">{folder.storagePath}</p>
                <p>Yahan se course ke saare PDFs organized structure me serve ho rahe hain.</p>
              </article>

              <article className="resource-card">
                <p className="resource-meta">Available now</p>
                <h3>{totalAssets} lecture-note PDFs</h3>
                <p>
                  Notes ko module-wise arrange karke ready kar diya gaya hai so the
                  student flow stays cleaner and more usable.
                </p>
              </article>
            </div>
          </section>

          <section>
            <div className="section-intro">
              <div>
                <p className="eyebrow">Available notes</p>
                <h2 className="section-title">{notesTitle}</h2>
              </div>
              <p className="section-copy">{notesCopy}</p>
            </div>

            <div className="page-stack">
              {modulesWithAssets
                .filter((module) => module.assets.length > 0)
                .map((module) => (
                  <section className="study-panel" key={module.order}>
                    <div className="study-head">
                      <p className="eyebrow">
                        {module.order} · {module.status}
                      </p>
                      <h2>{module.title}</h2>
                      <p>
                        {module.description} {module.assets.length} PDF{module.assets.length === 1 ? "" : "s"} available.
                      </p>
                    </div>

                    <ul className="list">
                      {module.assets.map((asset) => (
                        <li key={asset.href}>
                          <a href={asset.href} target="_blank" rel="noreferrer">
                            {asset.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
            </div>
          </section>
        </>
      ) : (
        <section>
          <div className="section-intro">
            <div>
              <p className="eyebrow">Upload area</p>
              <h2 className="section-title">Files for this folder can stay organized here.</h2>
            </div>
            <p className="section-copy">
              Jab tum PDF ya notes add karoge, is folder path ko use karna easiest
              rahega, kyunki sab content same track ke andar organized rahega.
            </p>
          </div>

          <div className="resource-grid">
            <article className="resource-card">
              <p className="resource-meta">Web folder path</p>
              <h3>{folder.title}</h3>
              <p className="folder-path">{folder.storagePath}</p>
              <p>Is path ke andar future PDFs ya course assets daale ja sakte hain.</p>
            </article>

            <article className="resource-card">
              <p className="resource-meta">Recommended workflow</p>
              <h3>Study flow</h3>
              <p>
                Pehle module 1 complete karo, phir module 2, aur last me revision ya
                support material rakho. Isse student journey clear rahegi.
              </p>
            </article>
          </div>
        </section>
      )}
    </div>
  );
}
