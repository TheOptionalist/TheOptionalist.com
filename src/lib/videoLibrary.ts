import { generatedVideoCollections } from "./generatedVideoLibrary";

export type VideoLibraryItem = {
  youtubeId: string;
  title: string;
  summary: string;
  module: string;
  duration?: string;
};

export type VideoCollection = {
  courseSlug: string;
  audience: string;
  title: string;
  description: string;
  folderHref?: string;
  videos: VideoLibraryItem[];
};

const videoCollections: VideoCollection[] = generatedVideoCollections;

export function getVideoCollections() {
  return videoCollections.map((collection) => ({
    ...collection,
    videos: [...collection.videos]
  }));
}

export function getVideoCollectionBySlug(courseSlug: string) {
  const collection = videoCollections.find((entry) => entry.courseSlug === courseSlug);

  return collection
    ? {
        ...collection,
        videos: [...collection.videos]
      }
    : null;
}

export function getTotalVideoCount() {
  return videoCollections.reduce((count, collection) => count + collection.videos.length, 0);
}

export function getYouTubeWatchUrl(youtubeId: string) {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function getYouTubeEmbedUrl(youtubeId: string) {
  return `https://www.youtube.com/embed/${youtubeId}?rel=0`;
}

export function getYouTubeThumbnailUrl(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}
