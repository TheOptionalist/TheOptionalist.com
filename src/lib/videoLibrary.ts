import {
  getCourseFolderBySlug,
  getCourseFolderModuleAssets,
  getCourseFolders
} from "./courseFolders";
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

type RawVideoLibraryItem = VideoLibraryItem & {
  sourceCollectionSlug: string;
};

type CollectionRule = {
  positiveKeywords: string[];
  negativeKeywords: string[];
  modules: Record<string, string[]>;
};

type ModuleProfile = {
  collectionSlug: string;
  moduleName: string;
  keywords: string[];
};

type VideoCollectionMeta = Omit<VideoCollection, "videos">;

const collectionRules: Record<string, CollectionRule> = {
  "anthropology-upsc-lecture-notes": {
    positiveKeywords: [
      "anthropology",
      "anthropological",
      "tribe",
      "tribal",
      "kinship",
      "primate",
      "hominid",
      "neanderthal",
      "archaeology",
      "harappan",
      "paleolithic",
      "mesolithic",
      "neolithic",
      "chalcolithic",
      "dna",
      "genetics"
    ],
    negativeKeywords: [
      "economy",
      "gdp",
      "inflation",
      "budget",
      "tax",
      "constitution",
      "constitutionalism",
      "parliament",
      "judiciary",
      "political science",
      "psir",
      "liberalism",
      "marxism",
      "democracy"
    ],
    modules: {
      "Anthropological Theories": [
        "functionalism",
        "structural functionalism",
        "radcliffe brown",
        "structuralism",
        "levi strauss",
        "diffusionism",
        "historical particularism",
        "neo evolutionism",
        "cultural materialism",
        "marvin harris",
        "culture and personality",
        "symbolic anthropology",
        "interpretive anthropology",
        "cognitive theories",
        "primitive religion",
        "post modernism"
      ],
      "Indian Society and Applied Anthropology": [
        "tribal cultures",
        "traditional indian social system",
        "regionalism",
        "political movements",
        "indian society",
        "applied anthropology",
        "demographic theories",
        "varna",
        "purushartha",
        "tribe",
        "caste"
      ],
      "Biological Anthropology and Genetics": [
        "biological anthropology",
        "human evolution",
        "genetic polymorphism",
        "protein synthesis",
        "dna",
        "replication",
        "genetics",
        "gene",
        "genome",
        "chromosome",
        "inheritance",
        "mutation",
        "biocultural"
      ],
      "Prehistory and Archaeology": [
        "prehistory",
        "archaeology",
        "paleolithic",
        "mesolithic",
        "neolithic",
        "chalcolithic",
        "harappan",
        "protohistoric",
        "ivc",
        "ethnoarchaeology",
        "iron age",
        "copper age"
      ]
    }
  },
  "anthropology-ugc-lecture-notes": {
    positiveKeywords: [
      "anthropology",
      "anthro",
      "human evolution",
      "primate",
      "hominid",
      "genetics",
      "population genetics",
      "human growth",
      "maturation",
      "ugc net"
    ],
    negativeKeywords: [
      "economy",
      "gdp",
      "budget",
      "constitution",
      "constitutionalism",
      "parliament",
      "judiciary",
      "political science",
      "psir",
      "liberalism",
      "marxism",
      "democracy"
    ],
    modules: {
      "Primate and Human Evolution": [
        "primate",
        "human evolution",
        "archaic homo sapiens",
        "modern humans",
        "dispersal of modern humans",
        "australopithecine",
        "pre hominid",
        "extinct primates",
        "oligocene",
        "miocene",
        "homo erectus",
        "homo habilis",
        "neanderthal",
        "chimpanzee",
        "gorilla",
        "orangutan",
        "gibbon"
      ],
      "Human Genetics Foundations": [
        "cytogenetics",
        "snp",
        "str",
        "vntr",
        "genomic imprinting",
        "mendelian",
        "non mendelian",
        "mtdna",
        "mitochondrial dna",
        "genetic code",
        "rna",
        "regulatory genes",
        "chromosome mapping",
        "mutation"
      ],
      "Population Genetics and Human Variation": [
        "population genetics",
        "hardy weinberg",
        "genetic drift",
        "genetic isolate",
        "genetic load",
        "inbreeding coefficient",
        "modern human variation",
        "ethnic classification",
        "linguistic distribution",
        "neutral theory",
        "polygenic",
        "dermatoglyphics"
      ],
      "Growth and Culture Background": [
        "human growth",
        "growth curves",
        "maturation",
        "prenatal",
        "postnatal",
        "catch up",
        "catch down",
        "copper bronze"
      ]
    }
  },
  "psir-upsc-lecture-notes": {
    positiveKeywords: [
      "psir",
      "political theory",
      "political thought",
      "political ideology",
      "state theory",
      "global south",
      "wto",
      "rights",
      "democracy",
      "upsc"
    ],
    negativeKeywords: [
      "anthropology",
      "anthropological",
      "neanderthal",
      "primate",
      "dna",
      "genetics",
      "cytogenetics",
      "gdp",
      "inflation",
      "budget",
      "ncert"
    ],
    modules: {
      "Political Theory Foundations": [
        "human rights",
        "rights",
        "justice",
        "rawls",
        "communitarian",
        "equality",
        "freedom",
        "affirmative action",
        "democracy",
        "representation",
        "participation",
        "political theory",
        "approaches"
      ],
      "State, Power, and Governance": [
        "theory of the state",
        "liberal theory of the state",
        "marxist theory of the state",
        "pluralist theory of the state",
        "neoliberal theory of the state",
        "feminist theory of the state",
        "post colonial theory of the state",
        "legitimacy",
        "power elites",
        "democratic elitism",
        "governance",
        "state in comparative perspective"
      ],
      "Ideologies and Thinkers": [
        "liberalism",
        "socialism",
        "marxism",
        "fascism",
        "gramsci",
        "arendt",
        "mao",
        "hobbes",
        "plato",
        "aristotle",
        "machiavelli",
        "political ideology",
        "dharmashastra"
      ],
      "Global Order and Post-colonial Perspectives": [
        "global south",
        "post colonial",
        "postcolonial",
        "bretton woods",
        "international economic system",
        "nieo",
        "latin america",
        "india africa",
        "wto",
        "deconstructing the global south"
      ]
    }
  },
  "psir-ugc-lecture-notes": {
    positiveKeywords: [
      "ugc net",
      "political science",
      "comparative politics",
      "constitutionalism",
      "political thought",
      "state theory",
      "indian political thought"
    ],
    negativeKeywords: [
      "anthropology",
      "anthropological",
      "neanderthal",
      "primate",
      "dna",
      "genetics",
      "cytogenetics",
      "gdp",
      "inflation",
      "budget"
    ],
    modules: {
      "Political Theory Concepts and Traditions": [
        "concepts in political theory",
        "state theory",
        "nature of state",
        "development",
        "nationalism",
        "political traditions",
        "liberalism to postmodernism",
        "ugc net political science"
      ],
      "Comparative Politics and Constitutionalism": [
        "comparative politics",
        "constitutionalism",
        "constitution",
        "democratic political regimes",
        "non democratic political regimes",
        "judicial independence",
        "emergency powers",
        "liberal constitutionalism"
      ],
      "Political Thinkers and Traditions": [
        "aristotle",
        "confucius",
        "hegel",
        "rousseau",
        "locke",
        "mill",
        "mao",
        "wollstonecraft",
        "machiavelli",
        "hobbes",
        "plato",
        "western political thought",
        "feminism"
      ],
      "Indian Thought and Decolonial Perspectives": [
        "agga",
        "aggañña",
        "colonialism",
        "decolonization",
        "fanon",
        "dharmashastra",
        "ziauddin barani",
        "indian political thought",
        "indo islamic"
      ]
    }
  },
  "revision-lectures": {
    positiveKeywords: ["revision", "quick revision", "refresher"],
    negativeKeywords: [],
    modules: {
      "Political Science UPSC Revision": [
        "revision feminism political thought",
        "revision state in comparative perspective",
        "gramsci",
        "plato",
        "aristotle",
        "global south",
        "upsc psir revision"
      ],
      "Anthropology UGC Revision": [
        "revision neutral theory",
        "neutral theory",
        "hardy weinberg",
        "genetic polymorphism",
        "ugc anthropology revision"
      ],
      "Political Science UGC Revision": [
        "electoral systems",
        "interest groups",
        "development theories",
        "kautilya",
        "liberal constitutionalism",
        "ugc political science revision",
        "feminism political thought revision"
      ],
      "Anthropology UPSC Revision": ["anthropology upsc revision"]
    }
  },
  "upsc-prelims-economy": {
    positiveKeywords: [
      "economy",
      "gdp",
      "inflation",
      "budget",
      "taxation",
      "gst",
      "rupee",
      "forex",
      "rbi",
      "trade"
    ],
    negativeKeywords: [
      "anthropology",
      "psir",
      "political science",
      "constitution",
      "constitutionalism",
      "judiciary",
      "primate",
      "neanderthal"
    ],
    modules: {
      "Foundation Notes": [
        "gdp",
        "gnp",
        "ndp",
        "nnp",
        "gva",
        "inflation",
        "budget",
        "taxation",
        "gst",
        "rupee",
        "forex",
        "current account",
        "balance of payments",
        "fiscal",
        "monetary",
        "rbi"
      ],
      "Revision and Reinforcement": [
        "apmc",
        "e nam",
        "pmfby",
        "fdi",
        "ofdi",
        "agriculture",
        "wto",
        "trade"
      ],
      "Practice Support": ["mcq", "practice", "pyq", "mock"]
    }
  },
  "upsc-ncert-polity": {
    positiveKeywords: [
      "constitution",
      "constitutionalism",
      "parliament",
      "lok sabha",
      "rajya sabha",
      "judiciary",
      "citizenship",
      "preamble",
      "fundamental rights",
      "ncert"
    ],
    negativeKeywords: [
      "anthropology",
      "primate",
      "neanderthal",
      "genetics",
      "economy",
      "gdp",
      "inflation"
    ],
    modules: {
      "NCERT Base Reading": [
        "constitution",
        "constitutionalism",
        "rule of law",
        "citizenship",
        "fundamental rights",
        "directive principles",
        "preamble",
        "judicial independence"
      ],
      "Topic Consolidation": [
        "lok sabha",
        "rajya sabha",
        "parliament",
        "judges",
        "judiciary",
        "governor",
        "federalism"
      ],
      "Revision and Application": ["revision", "application", "questions", "analysis"]
    }
  }
};

const keywordStopwords = new Set([
  "and",
  "the",
  "for",
  "with",
  "from",
  "into",
  "over",
  "under",
  "through",
  "their",
  "this",
  "that",
  "study",
  "lecture",
  "lectures",
  "notes",
  "concept",
  "concepts",
  "meaning",
  "characteristics",
  "changing",
  "nature",
  "basic",
  "basics",
  "explained",
  "introduction",
  "revision",
  "unit",
  "paper",
  "course",
  "theories",
  "theory",
  "growth"
]);

const remappedCollections = buildRemappedCollections();

function normalizeText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesPhrase(text: string, phrase: string) {
  const normalizedPhrase = normalizeText(phrase);

  if (!normalizedPhrase) {
    return false;
  }

  if (normalizedPhrase.includes(" ")) {
    return text.includes(normalizedPhrase);
  }

  return ` ${text} `.includes(` ${normalizedPhrase} `);
}

function scorePhraseList(text: string, phrases: string[], weight: number) {
  return phrases.reduce((score, phrase) => {
    if (!includesPhrase(text, phrase)) {
      return score;
    }

    const wordCount = normalizeText(phrase).split(" ").length;
    return score + weight + Math.min(wordCount, 3);
  }, 0);
}

function countPhraseMatches(text: string, phrases: string[]) {
  return phrases.reduce((count, phrase) => count + (includesPhrase(text, phrase) ? 1 : 0), 0);
}

function deriveAssetKeywords(title: string) {
  const normalizedTitle = normalizeText(title);
  const tokens = normalizedTitle
    .split(" ")
    .filter((token) => token.length > 2 && !keywordStopwords.has(token));
  const bigrams = tokens
    .slice(0, -1)
    .map((token, index) => `${token} ${tokens[index + 1]}`);
  const trigrams = tokens
    .slice(0, -2)
    .map((token, index) => `${token} ${tokens[index + 1]} ${tokens[index + 2]}`);

  return [normalizedTitle, ...bigrams, ...trigrams];
}

function dedupeKeywords(keywords: string[]) {
  return [...new Set(keywords.map((keyword) => normalizeText(keyword)).filter(Boolean))];
}

function getModuleProfiles(): ModuleProfile[] {
  const profiles: ModuleProfile[] = [];

  for (const folder of getCourseFolders()) {
    const rule = collectionRules[folder.slug];

    if (!rule) {
      continue;
    }

    for (const module of folder.modules) {
      const assetKeywords = getCourseFolderModuleAssets(module).flatMap((asset) =>
        deriveAssetKeywords(asset.title)
      );
      const moduleKeywords = rule.modules[module.title] ?? [];

      profiles.push({
        collectionSlug: folder.slug,
        moduleName: module.title,
        keywords: dedupeKeywords([module.title, ...assetKeywords, ...moduleKeywords])
      });
    }
  }

  return profiles;
}

function buildRawVideoItems() {
  const deduped = new Map<string, RawVideoLibraryItem>();

  for (const collection of generatedVideoCollections) {
    for (const video of collection.videos) {
      if (deduped.has(video.youtubeId)) {
        continue;
      }

      deduped.set(video.youtubeId, {
        ...video,
        sourceCollectionSlug: collection.courseSlug
      });
    }
  }

  return [...deduped.values()];
}

function scoreVideoForProfile(text: string, profile: ModuleProfile) {
  const rule = collectionRules[profile.collectionSlug];
  const positiveHits = countPhraseMatches(text, rule.positiveKeywords);
  const negativeHits = countPhraseMatches(text, rule.negativeKeywords);
  let score = 0;

  if (positiveHits === 0) {
    return Number.NEGATIVE_INFINITY;
  }

  if (negativeHits >= positiveHits) {
    return Number.NEGATIVE_INFINITY;
  }

  score += scorePhraseList(text, rule.positiveKeywords, 2);
  score -= scorePhraseList(text, rule.negativeKeywords, 5);
  score += scorePhraseList(text, profile.keywords, 4);

  if (profile.collectionSlug === "revision-lectures" && includesPhrase(text, "revision")) {
    score += 8;
  }

  return score;
}

function remapVideo(video: RawVideoLibraryItem, profiles: ModuleProfile[]) {
  const text = normalizeText([video.title, video.summary].join(" "));
  const scoredProfiles = profiles
    .map((profile) => ({
      profile,
      score: scoreVideoForProfile(text, profile)
    }))
    .sort((left, right) => right.score - left.score);

  const bestMatch = scoredProfiles[0];

  if (!bestMatch || bestMatch.score < 6) {
    return null;
  }

  return {
    youtubeId: video.youtubeId,
    title: video.title,
    summary: video.summary,
    duration: video.duration,
    module: bestMatch.profile.moduleName,
    collectionSlug: bestMatch.profile.collectionSlug
  };
}

function sortCollectionVideos(collectionSlug: string, videos: VideoLibraryItem[]) {
  const folder = getCourseFolderBySlug(collectionSlug);

  if (!folder) {
    return [...videos].sort((left, right) => left.title.localeCompare(right.title));
  }

  const moduleOrder = new Map<string, number>(
    folder.modules.map((module, index) => [module.title, index])
  );

  return [...videos].sort((left, right) => {
    const leftOrder = moduleOrder.get(left.module) ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = moduleOrder.get(right.module) ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.title.localeCompare(right.title, "en", { sensitivity: "base" });
  });
}

function buildRemappedCollections(): VideoCollection[] {
  const profiles = getModuleProfiles();
  const rawVideos = buildRawVideoItems();
  const metadataBySlug = new Map<string, VideoCollectionMeta>(
    generatedVideoCollections.map(({ courseSlug, audience, title, description, folderHref }) => [
      courseSlug,
      { courseSlug, audience, title, description, folderHref }
    ])
  );
  const videosByCollection = new Map<string, VideoLibraryItem[]>();

  for (const video of rawVideos) {
    const mappedVideo = remapVideo(video, profiles);

    if (!mappedVideo) {
      continue;
    }

    const bucket = videosByCollection.get(mappedVideo.collectionSlug) ?? [];
    bucket.push({
      youtubeId: mappedVideo.youtubeId,
      title: mappedVideo.title,
      summary: mappedVideo.summary,
      duration: mappedVideo.duration,
      module: mappedVideo.module
    });
    videosByCollection.set(mappedVideo.collectionSlug, bucket);
  }

  return [...metadataBySlug.values()]
    .map((collection) => ({
      ...collection,
      videos: sortCollectionVideos(
        collection.courseSlug,
        videosByCollection.get(collection.courseSlug) ?? []
      )
    }))
    .filter((collection) => collection.videos.length > 0);
}

export function getVideoCollections() {
  return remappedCollections.map((collection) => ({
    ...collection,
    videos: [...collection.videos]
  }));
}

export function getVideoCollectionBySlug(courseSlug: string) {
  const collection = remappedCollections.find((entry) => entry.courseSlug === courseSlug);

  return collection
    ? {
        ...collection,
        videos: [...collection.videos]
      }
    : null;
}

export function getTotalVideoCount() {
  return remappedCollections.reduce((count, collection) => count + collection.videos.length, 0);
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
