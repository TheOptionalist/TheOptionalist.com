import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import YouTubeVideoCard from "@/components/YouTubeVideoCard";
import {
  getCourseFolderBySlug,
  getCourseFolderModuleAssets,
  getCourseFolders
} from "@/lib/courseFolders";
import { getVideoCollectionBySlug } from "@/lib/videoLibrary";

const MAX_EMBEDDED_VIDEOS_PER_MODULE = 3;

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

  const videoCollection = getVideoCollectionBySlug(folder.slug);
  const videos = videoCollection?.videos ?? [];
  const modulesWithContent = folder.modules.map((module) => ({
    ...module,
    assets: getCourseFolderModuleAssets(module),
    videos: videos.filter(
      (video) => video.module.trim().toLowerCase() === module.title.trim().toLowerCase()
    )
  }));
  const totalAssets = modulesWithContent.reduce(
    (count, module) => count + module.assets.length,
    0
  );
  const hasNotes = totalAssets > 0;
  const hasVideos = videos.length > 0;
  const hasStudyContent = hasNotes || hasVideos;
  const isReference = folder.studyMode === "reference";
  const heroHighlights = isReference
    ? ["Quick revision", "Topic refresh", "Direct PDF access", "Student-friendly shelf"]
    : ["Sequential learning", "Module-first structure", "Cleaner upload plan", "Student-friendly flow"];
  if (videos.length > 0) {
    heroHighlights.push(`${videos.length} lecture video${videos.length === 1 ? "" : "s"}`);
  }
  const flowTitle = isReference
    ? "Open the revision block you need right now."
    : "Finish each module before picking the next one.";
  const flowCopy = isReference
    ? "Yeh folder fast recall ke liye bana hai, isliye jo revision block chahiye usse directly open karke quick refresh le sakte ho."
    : "This folder follows the exact approach you asked for: first one module complete karo, uske baad hi next module uthao.";
  const overviewTitle = hasNotes && hasVideos
    ? `${folder.title} now combines notes and lectures.`
    : hasNotes
      ? isReference
        ? `${folder.title} is now ready for quick access.`
        : `${folder.title} is now loaded.`
      : `${folder.title} lecture track is ready.`;
  const overviewCopy = hasNotes && hasVideos
    ? "Same module page par ab PDFs aur matching lectures dono available hain, so students ko notes aur video ke beech jump nahi karna padega."
    : hasNotes
      ? isReference
        ? "Is folder ke andar ab actual revision PDFs available hain, so students quick recall ke liye directly right block open kar sakte hain."
        : "Is folder ke andar ab actual PDFs available hain, so students can module-wise notes open karke directly study start kar sakte hain."
      : "Is track me ab module-wise embedded lectures available hain, so students structured order ke saath direct study start kar sakte hain even before PDFs are added.";
  const notesTitle = hasNotes && hasVideos
    ? "Study notes and lectures together, module by module."
    : hasNotes
      ? isReference
        ? "Open the revision PDFs directly."
        : "Open each module and study the PDFs directly."
      : "Watch the module lectures directly from this page.";
  const notesEyebrow = hasNotes && hasVideos
    ? "Study material"
    : hasNotes
      ? "Available notes"
      : "Available lectures";
  const notesCopy = hasNotes && hasVideos
    ? "Module sequence follow karo. Jahan notes available hain wahan PDFs kholo, aur matching lecture ko yahi page par watch karke same flow me continue karo."
    : hasNotes
      ? isReference
        ? "Jo topic revise karna hai us block me jao aur PDF ko new tab me open karke short revision start karo."
        : "Module sequence ko follow karo, aur har PDF ko new tab me open karke padho. Isse flow disciplined rahega."
      : "Lecture ko isi page par dekho aur phir next module par move karo, so prelims ya foundation flow random na ho.";

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
          {modulesWithContent.map((module) => (
            <article className="feature-card module-card" key={module.order}>
              <p className="module-order">{module.order}</p>
              <p className="module-status">{module.status}</p>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              {module.assets.length > 0 ? (
                <p className="resource-meta">{module.assets.length} PDFs ready</p>
              ) : null}
              {module.videos.length > 0 ? (
                <p className="resource-meta">{module.videos.length} lecture videos aligned</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {hasStudyContent ? (
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
              {hasNotes ? (
                <article className="resource-card">
                  <p className="resource-meta">Available now</p>
                  <h3>{totalAssets} lecture-note PDFs</h3>
                  <p>
                    Notes ko module-wise arrange karke ready kar diya gaya hai so the
                    student flow stays cleaner and more usable.
                  </p>
                </article>
              ) : null}
              {hasVideos ? (
                <article className="resource-card">
                  <p className="resource-meta">Lecture support</p>
                  <h3>{videos.length} lecture video{videos.length === 1 ? "" : "s"}</h3>
                  <p>
                    Matching YouTube lectures are now attached inside the relevant
                    module blocks so students can open the right lecture directly from
                    the same study flow.
                  </p>
                </article>
              ) : null}
            </div>
          </section>

          <section>
            <div className="section-intro">
              <div>
                <p className="eyebrow">{notesEyebrow}</p>
                <h2 className="section-title">{notesTitle}</h2>
              </div>
              <p className="section-copy">{notesCopy}</p>
            </div>

            <div className="page-stack">
              {modulesWithContent
                .filter((module) => module.assets.length > 0 || module.videos.length > 0)
                .map((module) => (
                  <section className="study-panel" key={module.order}>
                    <div className="study-head">
                      <p className="eyebrow">
                        {module.order} · {module.status}
                      </p>
                      <h2>{module.title}</h2>
                      <p>
                        {module.description}
                        {module.assets.length > 0
                          ? ` ${module.assets.length} PDF${module.assets.length === 1 ? "" : "s"} available.`
                          : ""}
                        {module.videos.length > 0
                          ? ` ${module.videos.length} lecture video${module.videos.length === 1 ? "" : "s"} aligned with this module.`
                          : ""}
                      </p>
                    </div>

                    {module.assets.length > 0 ? (
                      <div className="study-resource-block">
                        <p className="resource-meta">PDF notes</p>
                        <ul className="list">
                          {module.assets.map((asset) => (
                            <li key={asset.href}>
                              <a href={asset.href} target="_blank" rel="noreferrer">
                                {asset.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {module.videos.length > 0 ? (
                      <div className="module-video-section">
                        <div className="module-video-head">
                          <p className="resource-meta">Module lectures</p>
                          <p className="module-video-copy">
                            Matching lecture ko yahi se open karo aur phir same module
                            ke notes flow me continue karo.
                          </p>
                        </div>

                        <div className="video-grid">
                          {module.videos
                            .slice(0, MAX_EMBEDDED_VIDEOS_PER_MODULE)
                            .map((video) => (
                              <YouTubeVideoCard
                                key={`${folder.slug}-${module.order}-${video.youtubeId}`}
                                video={video}
                              />
                            ))}
                        </div>

                        {module.videos.length > MAX_EMBEDDED_VIDEOS_PER_MODULE ? (
                          <div className="module-video-actions">
                            <p className="resource-meta">
                              {module.videos.length - MAX_EMBEDDED_VIDEOS_PER_MODULE} more
                              lecture{module.videos.length - MAX_EMBEDDED_VIDEOS_PER_MODULE === 1 ? "" : "s"} available for this module.
                            </p>
                            <Link className="button primary" href={`/videos#${folder.slug}`}>
                              Open full lecture shelf
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
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
              Jab tum PDF ya notes add karoge, sab content same track ke andar
              organized rakhna easiest rahega.
            </p>
          </div>

          <div className="resource-grid">
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
