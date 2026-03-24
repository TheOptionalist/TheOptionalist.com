import Link from "next/link";
import { getCourseFolders } from "@/lib/courseFolders";
import { getVideoCollectionBySlug } from "@/lib/videoLibrary";

export default function UPSCPrelimsPage() {
  const prelimsFolders = getCourseFolders().filter((folder) => folder.slug.startsWith("upsc-"));
  const totalPrelimsVideos = prelimsFolders.reduce(
    (count, folder) => count + (getVideoCollectionBySlug(folder.slug)?.videos.length ?? 0),
    0
  );

  return (
    <div className="page-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">UPSC Prelims</p>
          <h1>Objective preparation shelves for economy and polity.</h1>
          <p>
            Use these prelims-focused tracks to cover economy and NCERT polity in a
            cleaner module order, with lecture support available inside the note flow.
          </p>
        </div>
        <div className="hero-highlights" aria-label="UPSC prelims overview">
          <span>{prelimsFolders.length} prelims folders</span>
          <span>{totalPrelimsVideos} embedded lectures</span>
          <span>Economy</span>
          <span>NCERT polity</span>
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Prelims folders</p>
            <h2 className="section-title">Open the right prelims track and study module by module.</h2>
          </div>
          <p className="section-copy">
            These folders are arranged for focused prelims preparation so objective
            concepts, reading order, and lecture support stay in one disciplined flow.
          </p>
        </div>

        <div className="folder-grid">
          {prelimsFolders.map((folder) => {
            const videoCollection = getVideoCollectionBySlug(folder.slug);

            return (
              <article className="folder-card" key={folder.slug}>
                <p className="folder-label">{folder.audience}</p>
                <h3>{folder.title}</h3>
                <p>{folder.description}</p>
                <p className="folder-subtitle">
                  {folder.subtitle}
                  {videoCollection ? ` · ${videoCollection.videos.length} lectures` : ""}
                </p>
                <Link className="button primary accent" href={`/courses/folders/${folder.slug}`}>
                  Open Prelims Folder
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
