import "server-only";

import type { AssistantLink, AssistantReply } from "@/lib/assistantTypes";
import { getCourseFolderBySlug, getCourseFolders } from "@/lib/courseFolders";
import { getSiteSearchItems } from "@/lib/siteSearch";
import {
  getTotalVideoCount,
  getVideoCollectionBySlug,
  getVideoCollections,
  getYouTubeWatchUrl
} from "@/lib/videoLibrary";

const DEFAULT_SUGGESTIONS = [
  "Start Anthropology UPSC",
  "Show PSIR videos",
  "Open revision lectures",
  "How many videos are available?"
];

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "de",
  "dikhao",
  "do",
  "for",
  "hai",
  "ho",
  "i",
  "in",
  "is",
  "ka",
  "kar",
  "karo",
  "ke",
  "ki",
  "mai",
  "mein",
  "me",
  "mujhe",
  "my",
  "notes",
  "of",
  "open",
  "please",
  "show",
  "to",
  "videos",
  "video",
  "youtube"
]);

function normalizeQuery(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function getQueryTerms(query: string) {
  return normalizeQuery(query)
    .split(" ")
    .map((term) => term.trim())
    .filter(Boolean)
    .filter((term) => !STOP_WORDS.has(term));
}

function createLink(
  title: string,
  href: string,
  label: AssistantLink["label"],
  description: string,
  external = false
): AssistantLink {
  return { title, href, label, description, external };
}

function detectFolderSlug(query: string) {
  const normalized = normalizeQuery(query);

  if (/(revision|quick revision|revise)/.test(normalized)) {
    return "revision-lectures";
  }

  if (/(economy|apmc|budget|gdp|inflation|fdi|wto|repo|rupee)/.test(normalized)) {
    return "upsc-prelims-economy";
  }

  if (/(polity|constitution|parliament|judiciary|rights|citizenship|ncert)/.test(normalized)) {
    return "upsc-ncert-polity";
  }

  if (/(anthro|anthropology)/.test(normalized) && /(ugc|net)/.test(normalized)) {
    return "anthropology-ugc-lecture-notes";
  }

  if (/(anthro|anthropology)/.test(normalized) && /(upsc|cse|optional)/.test(normalized)) {
    return "anthropology-upsc-lecture-notes";
  }

  if (/(psir|political science)/.test(normalized) && /(ugc|net)/.test(normalized)) {
    return "psir-ugc-lecture-notes";
  }

  if (/(psir|political science)/.test(normalized) && /(upsc|cse|optional)/.test(normalized)) {
    return "psir-upsc-lecture-notes";
  }

  return null;
}

function searchSite(query: string) {
  const terms = getQueryTerms(query);
  const items = getSiteSearchItems();

  return items
    .map((item) => {
      const title = item.title.toLowerCase();
      const category = item.category.toLowerCase();
      const description = item.description.toLowerCase();
      const keywords = item.keywords.map((keyword) => keyword.toLowerCase());
      let score = 0;

      for (const term of terms) {
        if (title === term) {
          score += 8;
          continue;
        }

        if (title.includes(term)) {
          score += 5;
        }

        if (category.includes(term)) {
          score += 4;
        }

        if (description.includes(term)) {
          score += 3;
        }

        if (keywords.some((keyword) => keyword.includes(term))) {
          score += 2;
        }
      }

      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 6);
}

function searchVideos(query: string, collectionSlug?: string) {
  const terms = getQueryTerms(query);
  const collections = collectionSlug
    ? getVideoCollections().filter((collection) => collection.courseSlug === collectionSlug)
    : getVideoCollections();

  return collections
    .flatMap((collection) =>
      collection.videos.map((video) => {
        const haystack = [video.title, video.module, video.summary, collection.audience]
          .join(" ")
          .toLowerCase();
        let score = collectionSlug ? 4 : 0;

        for (const term of terms) {
          if (video.title.toLowerCase().includes(term)) {
            score += 6;
          }

          if (video.module.toLowerCase().includes(term)) {
            score += 4;
          }

          if (video.summary.toLowerCase().includes(term)) {
            score += 3;
          }

          if (collection.audience.toLowerCase().includes(term)) {
            score += 3;
          }
        }

        return { collection, video, score };
      })
    )
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4);
}

function buildWelcomeReply(): AssistantReply {
  const folders = getCourseFolders();
  const totalVideos = getTotalVideoCount();

  return {
    message: `I can help with folders, videos, revision, login, and study navigation. The site currently has ${folders.length} folder shelves and ${totalVideos} videos.`,
    links: [
      createLink("Courses", "/courses", "Page", "Open the full course shelf."),
      createLink("Video Library", "/videos", "Page", "Browse all imported lecture videos."),
      createLink(
        "Revision Lectures",
        "/courses/folders/revision-lectures",
        "Folder",
        "Open the quick-revision shelf."
      )
    ],
    suggestions: DEFAULT_SUGGESTIONS
  };
}

function buildCountReply(): AssistantReply {
  const collections = getVideoCollections();
  const totalVideos = getTotalVideoCount();
  const breakdown = collections
    .map((collection) => `${collection.audience}: ${collection.videos.length}`)
    .join(", ");

  return {
    message: `The library currently has ${totalVideos} videos across ${collections.length} collections. Breakdown: ${breakdown}.`,
    links: [
      createLink("Open Video Library", "/videos", "Page", "See every video shelf in one place."),
      createLink(
        "Revision Lectures",
        "/videos#revision-lectures",
        "Video",
        "Jump to the mixed revision lecture section."
      )
    ],
    suggestions: ["Show Anthropology videos", "Show PSIR videos", "Open economy videos"]
  };
}

function buildFolderReply(folderSlug: string, query: string): AssistantReply | null {
  const folder = getCourseFolderBySlug(folderSlug);

  if (!folder) {
    return null;
  }

  const videoCollection = getVideoCollectionBySlug(folder.slug);
  const firstModule = folder.modules[0];
  const wantsVideo = /(video|lecture|youtube)/.test(normalizeQuery(query));
  const wantsStart = /(start|shuru|begin|where should i start|kaha se start)/.test(
    normalizeQuery(query)
  );

  if (wantsVideo && videoCollection) {
    const matches = searchVideos(query, folder.slug);
    const links = (matches.length > 0 ? matches : videoCollection.videos.slice(0, 4).map((video) => ({
      collection: videoCollection,
      video,
      score: 0
    }))).map(({ collection, video }) =>
      createLink(
        video.title,
        getYouTubeWatchUrl(video.youtubeId),
        "Video",
        `${collection.audience} · ${video.module}`,
        true
      )
    );

    return {
      message: `${videoCollection.title} has ${videoCollection.videos.length} videos. Best matches are below.`,
      links: [
        createLink(
          "Open Full Video Shelf",
          `/videos#${videoCollection.courseSlug}`,
          "Page",
          `Open the full ${videoCollection.audience} video section.`
        ),
        ...links
      ].slice(0, 5),
      suggestions: ["Open matching notes", "Show revision lectures", "Show more videos"]
    };
  }

  if (wantsStart) {
    return {
      message: `${folder.title} is the cleanest place to start. Begin with ${firstModule.title}. ${videoCollection ? `${videoCollection.videos.length} matching videos are available for this shelf.` : ""}`.trim(),
      links: [
        createLink(folder.title, `/courses/folders/${folder.slug}`, "Folder", folder.description),
        createLink(
          firstModule.title,
          `/courses/folders/${folder.slug}`,
          "Module",
          firstModule.description
        ),
        ...(videoCollection
          ? [
              createLink(
                `${folder.audience} videos`,
                `/videos#${folder.slug}`,
                "Video",
                `Open the ${folder.audience} lecture section.`
              )
            ]
          : [])
      ],
      suggestions: ["Show videos for this track", "Open revision lectures", "Open courses"]
    };
  }

  return {
    message: `${folder.title} matches your query. Use the folder page for notes and the linked video shelf for lectures.`,
    links: [
      createLink(folder.title, `/courses/folders/${folder.slug}`, "Folder", folder.description),
      ...(videoCollection
        ? [
            createLink(
              `${folder.audience} videos`,
              `/videos#${folder.slug}`,
              "Video",
              `${videoCollection.videos.length} videos available in this track.`
            )
          ]
        : [])
    ],
    suggestions: ["Where should I start?", "Show videos", "Open revision lectures"]
  };
}

function buildAuthReply(): AssistantReply {
  return {
    message: "Use Login to start a session. Account opens your saved profile after authentication, and Dashboard shows study progress once signed in.",
    links: [
      createLink("Login", "/login", "Page", "Open the sign-in page."),
      createLink("Account", "/account", "Page", "Open your account details."),
      createLink("Dashboard", "/dashboard", "Page", "Open the study dashboard.")
    ],
    suggestions: ["Open login", "Open account", "Show courses"]
  };
}

function buildSearchReply(query: string): AssistantReply {
  const results = searchSite(query);

  if (results.length === 0) {
    return {
      message: `I could not find a strong match for "${query}". Try a subject, track, module, or topic name.`,
      links: [
        createLink("Courses", "/courses", "Page", "Browse all course shelves."),
        createLink("Video Library", "/videos", "Page", "Search all video collections manually.")
      ],
      suggestions: DEFAULT_SUGGESTIONS
    };
  }

  return {
    message: `Best matches for "${query}" are below.`,
    links: results.map(({ item }) =>
      createLink(item.title, item.href, item.label, `${item.category} · ${item.description}`)
    ),
    suggestions: ["Show videos for this topic", "Where should I start?", "Open revision lectures"]
  };
}

export function createAssistantReply(query: string): AssistantReply {
  const normalized = normalizeQuery(query);

  if (!normalized) {
    return buildWelcomeReply();
  }

  if (/^(hi|hello|hey|help|assistant)$/.test(normalized)) {
    return buildWelcomeReply();
  }

  if (/(how many|kitne|count|total).*(video|lecture)/.test(normalized)) {
    return buildCountReply();
  }

  if (/(login|sign in|account|dashboard|profile)/.test(normalized)) {
    return buildAuthReply();
  }

  const folderSlug = detectFolderSlug(normalized);

  if (folderSlug) {
    const folderReply = buildFolderReply(folderSlug, normalized);

    if (folderReply) {
      return folderReply;
    }
  }

  if (/(video|lecture|youtube)/.test(normalized)) {
    const videoMatches = searchVideos(normalized);

    if (videoMatches.length > 0) {
      return {
        message: `I found video matches for "${query}". Open the lectures directly or jump to the library shelf.`,
        links: videoMatches.map(({ collection, video }) =>
          createLink(
            video.title,
            getYouTubeWatchUrl(video.youtubeId),
            "Video",
            `${collection.audience} · ${video.module}`,
            true
          )
        ),
        suggestions: ["Open matching notes", "Show revision lectures", "Open video library"]
      };
    }
  }

  return buildSearchReply(query);
}
