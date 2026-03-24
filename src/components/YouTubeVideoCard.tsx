import type { VideoLibraryItem } from "@/lib/videoLibrary";
import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  getYouTubeWatchUrl
} from "@/lib/videoLibrary";

export default function YouTubeVideoCard({
  video,
  embedded = false
}: {
  video: VideoLibraryItem;
  embedded?: boolean;
}) {
  const watchUrl = getYouTubeWatchUrl(video.youtubeId);

  return (
    <article className={`video-card${embedded ? " video-card-embedded" : ""}`}>
      {embedded ? (
        <div className="video-embed video-embed-frame">
          <iframe
            src={getYouTubeEmbedUrl(video.youtubeId)}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <span className="video-play-badge">Embedded</span>
        </div>
      ) : (
        <a className="video-embed" href={watchUrl} target="_blank" rel="noreferrer">
          <img
            src={getYouTubeThumbnailUrl(video.youtubeId)}
            alt={`${video.title} YouTube thumbnail`}
            loading="lazy"
          />
          <span className="video-play-badge">YouTube</span>
          <span className="video-play-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M9 7.5v9l7-4.5-7-4.5Z" fill="currentColor" />
            </svg>
          </span>
        </a>
      )}

      <div className="video-card-content">
        <div className="video-card-meta">
          <p className="video-module">{video.module}</p>
          {video.duration ? <span className="video-chip">{video.duration}</span> : null}
        </div>

        <h3>{video.title}</h3>
        <p>{video.summary}</p>
      </div>

      <a className="video-link" href={watchUrl} target="_blank" rel="noreferrer">
        <span>{embedded ? "Watch on YouTube" : "Watch lecture"}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
