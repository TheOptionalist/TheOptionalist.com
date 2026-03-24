import Link from "next/link";
import YouTubeVideoCard from "@/components/YouTubeVideoCard";
import { getVideoCollections } from "@/lib/videoLibrary";

export default function VideosPage() {
  const collections = getVideoCollections();

  return (
    <div className="page-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">Video library</p>
          <h1>Watch course-linked lectures without losing the study flow.</h1>
          <p>
            This library keeps YouTube lectures grouped by course so students can
            watch the right concept first and then continue inside the matching note
            folder.
          </p>
        </div>
      </section>

      {collections.map((collection) => (
        <section className="page-stack" id={collection.courseSlug} key={collection.courseSlug}>
          <div className="section-intro">
            <div>
              <p className="eyebrow">{collection.audience}</p>
              <h2 className="section-title">{collection.title}</h2>
            </div>
            <p className="section-copy">{collection.description}</p>
          </div>

          {collection.folderHref ? (
            <div className="video-library-actions">
              <Link className="button primary" href={collection.folderHref}>
                Open Folder
              </Link>
            </div>
          ) : null}

          <div className="video-grid">
            {collection.videos.map((video) => (
              <YouTubeVideoCard
                key={`${collection.courseSlug}-${video.youtubeId}`}
                video={video}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
