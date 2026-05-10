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

      {hasStudyContent ? (
        <>
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
