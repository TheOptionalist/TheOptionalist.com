import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: npm run videos:import -- /absolute/path/to/file.csv");
  process.exit(1);
}

const resolvedInputPath = path.resolve(inputPath);
const outputPath = path.resolve("src/lib/generatedVideoLibrary.ts");

const collectionConfig = {
  "anthropology-upsc-lecture-notes": {
    audience: "Anthropology UPSC",
    title: "Anthropology UPSC Video Library",
    description:
      "Focused Anthropology UPSC lectures aligned with theory, Indian anthropology, biological anthropology, and archaeology study blocks.",
    folderHref: "/courses/folders/anthropology-upsc-lecture-notes",
    modules: [
      {
        name: "Anthropological Theories",
        keywords: [
          "theory",
          "theories",
          "functionalism",
          "structuralism",
          "diffusionism",
          "evolutionism",
          "radcliffe brown",
          "malinowski",
          "boas",
          "levi strauss"
        ]
      },
      {
        name: "Indian Society and Applied Anthropology",
        keywords: [
          "tribe",
          "tribal",
          "caste",
          "kinship",
          "marriage",
          "religion",
          "village",
          "peasant",
          "indian society",
          "applied anthropology",
          "purushartha",
          "varna",
          "social change"
        ]
      },
      {
        name: "Biological Anthropology and Genetics",
        keywords: [
          "gene",
          "genome",
          "chromosome",
          "genetics",
          "mutation",
          "dna",
          "rna",
          "protein",
          "inheritance",
          "cytogenetics",
          "cell cycle",
          "mitosis",
          "replication",
          "mendelian",
          "genetic code",
          "growth",
          "blood group",
          "human variation",
          "anthropometry",
          "adaptation",
          "hominid",
          "evolution"
        ]
      },
      {
        name: "Prehistory and Archaeology",
        keywords: [
          "paleolithic",
          "mesolithic",
          "neolithic",
          "chalcolithic",
          "harappan",
          "indus",
          "archaeology",
          "prehistory",
          "protohistoric",
          "culture evolution",
          "stone age",
          "rock art"
        ]
      }
    ]
  },
  "anthropology-ugc-lecture-notes": {
    audience: "Anthropology UGC",
    title: "Anthropology UGC Video Library",
    description:
      "Anthropology UGC NET lectures arranged around evolution, genetics, variation, growth, and revision-oriented concepts.",
    folderHref: "/courses/folders/anthropology-ugc-lecture-notes",
    modules: [
      {
        name: "Primate and Human Evolution",
        keywords: [
          "primate",
          "evolution",
          "hominid",
          "homo",
          "neanderthal",
          "australopithecus",
          "prehistoric man",
          "skeletal aging",
          "fossil",
          "human evolution"
        ]
      },
      {
        name: "Human Genetics Foundations",
        keywords: [
          "gene",
          "genetics",
          "chromosome",
          "mutation",
          "dna",
          "rna",
          "protein",
          "inheritance",
          "cytogenetics",
          "cell cycle",
          "mitosis",
          "replication",
          "mendelian",
          "fish",
          "mtdna",
          "molecular",
          "inheritance",
          "genetic potential"
        ]
      },
      {
        name: "Population Genetics and Human Variation",
        keywords: [
          "population genetics",
          "variation",
          "race",
          "adaptation",
          "population",
          "demography",
          "blood group",
          "selection",
          "drift",
          "migration"
        ]
      },
      {
        name: "Growth and Culture Background",
        keywords: [
          "growth",
          "maturation",
          "scammon",
          "distance curve",
          "velocity curve",
          "acceleration curve",
          "prenatal",
          "postnatal",
          "catch up",
          "catch down",
          "bronze",
          "copper"
        ]
      }
    ]
  },
  "psir-upsc-lecture-notes": {
    audience: "PSIR UPSC",
    title: "PSIR UPSC Video Library",
    description:
      "PSIR UPSC lectures organized around political theory, state debates, ideologies, and global-order themes.",
    folderHref: "/courses/folders/psir-upsc-lecture-notes",
    modules: [
      {
        name: "Political Theory Foundations",
        keywords: [
          "justice",
          "rights",
          "equality",
          "liberty",
          "democracy",
          "freedom",
          "citizenship",
          "political theory",
          "representation",
          "rawls",
          "social justice",
          "veil of ignorance"
        ]
      },
      {
        name: "State, Power, and Governance",
        keywords: [
          "state",
          "power",
          "governance",
          "legitimacy",
          "elite",
          "pluralism",
          "bureaucracy",
          "public policy",
          "authority",
          "grassroots democracy",
          "judiciary",
          "constitutionalism",
          "electoral system"
        ]
      },
      {
        name: "Ideologies and Thinkers",
        keywords: [
          "liberalism",
          "marxism",
          "feminism",
          "socialism",
          "leninism",
          "gramsci",
          "hobbes",
          "locke",
          "rousseau",
          "plato",
          "aristotle",
          "machiavelli",
          "thought"
        ]
      },
      {
        name: "Global Order and Post-colonial Perspectives",
        keywords: [
          "global order",
          "postcolonial",
          "imperialism",
          "colonialism",
          "global south",
          "international",
          "dependency",
          "world order",
          "decolonial",
          "foreign policy",
          "nuclear proliferation",
          "international relations",
          "geopolitics",
          "peace",
          "conflict",
          "global conflicts"
        ]
      }
    ]
  },
  "psir-ugc-lecture-notes": {
    audience: "PSIR UGC",
    title: "PSIR UGC Video Library",
    description:
      "UGC NET Political Science lectures organized for theory, comparative politics, thinkers, and Indian thought revision.",
    folderHref: "/courses/folders/psir-ugc-lecture-notes",
    modules: [
      {
        name: "Political Theory Concepts and Traditions",
        keywords: [
          "political theory",
          "nationalism",
          "rights",
          "justice",
          "equality",
          "democracy",
          "liberalism",
          "marxism",
          "development",
          "rawls",
          "social justice",
          "veil of ignorance"
        ]
      },
      {
        name: "Comparative Politics and Constitutionalism",
        keywords: [
          "comparative politics",
          "constitutionalism",
          "electoral systems",
          "parties",
          "interest groups",
          "constitution",
          "parliament",
          "presidential",
          "regime",
          "judiciary",
          "electoral",
          "representation"
        ]
      },
      {
        name: "Political Thinkers and Traditions",
        keywords: [
          "plato",
          "aristotle",
          "machiavelli",
          "hobbes",
          "locke",
          "rousseau",
          "kant",
          "hegel",
          "marx",
          "mao",
          "thinkers"
        ]
      },
      {
        name: "Indian Thought and Decolonial Perspectives",
        keywords: [
          "indian political thought",
          "kabir",
          "gandhi",
          "ambedkar",
          "tagore",
          "decolonization",
          "fanon",
          "colonialism",
          "postcolonial"
        ]
      }
    ]
  },
  "revision-lectures": {
    audience: "Quick Revision",
    title: "Revision Lecture Library",
    description:
      "Mixed-track revision lectures that work well for fast refresh sessions before notes, mock practice, or concept recall.",
    folderHref: "/courses/folders/revision-lectures",
    modules: [
      {
        name: "Political Science UPSC Revision",
        keywords: ["psir", "political theory", "state", "ideology", "revision"]
      },
      {
        name: "Anthropology UGC Revision",
        keywords: ["anthropology", "anthro", "ugc", "net", "revision"]
      },
      {
        name: "Political Science UGC Revision",
        keywords: ["political science", "ugc", "net", "revision"]
      },
      {
        name: "Anthropology UPSC Revision",
        keywords: ["anthropology", "upsc", "revision"]
      }
    ]
  },
  "upsc-prelims-economy": {
    audience: "UPSC Prelims",
    title: "UPSC Economy Video Library",
    description:
      "Economy-focused channel videos organized for prelims preparation, topic revision, and faster concept recall.",
    folderHref: "/courses/folders/upsc-prelims-economy",
    modules: [
      {
        name: "Foundation Notes",
        keywords: [
          "economy",
          "gdp",
          "inflation",
          "fiscal",
          "monetary",
          "banking",
          "money",
          "budget",
          "liberalisation",
          "privatisation",
          "globalisation",
          "reforms",
          "forex",
          "exchange rate",
          "repo",
          "rbi"
        ]
      },
      {
        name: "Revision and Reinforcement",
        keywords: [
          "agriculture",
          "apmc",
          "e-nam",
          "pmfby",
          "trade",
          "wto",
          "fdi",
          "ofdi"
        ]
      },
      {
        name: "Practice Support",
        keywords: ["mcq", "practice", "pyq", "revision", "summary"]
      }
    ]
  },
  "upsc-ncert-polity": {
    audience: "UPSC Foundation",
    title: "UPSC Polity Video Library",
    description:
      "Polity and constitution videos that support NCERT-backed concept building and quick revision.",
    folderHref: "/courses/folders/upsc-ncert-polity",
    modules: [
      {
        name: "NCERT Base Reading",
        keywords: [
          "polity",
          "constitution",
          "preamble",
          "fundamental rights",
          "directive principles",
          "citizenship"
        ]
      },
      {
        name: "Topic Consolidation",
        keywords: [
          "parliament",
          "president",
          "prime minister",
          "judiciary",
          "judge",
          "judges",
          "judicial system",
          "supreme court",
          "court",
          "federalism",
          "governor"
        ]
      },
      {
        name: "Revision and Application",
        keywords: ["revision", "questions", "analysis", "application"]
      }
    ]
  },
  "channel-misc-library": {
    audience: "Special Topics",
    title: "Special Topic Lectures",
    description:
      "Additional channel videos that sit outside the main Anthropology, PSIR, Economy, and Polity course shelves.",
    modules: [
      {
        name: "Special Topics",
        keywords: []
      }
    ]
  }
};

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const nextChar = input[index + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  return rows;
}

function normalizeWhitespace(value) {
  return value.replace(/\u00fb/g, "-").replace(/\s+/g, " ").trim();
}

function normalizeText(value) {
  return normalizeWhitespace(value).toLowerCase();
}

function isVideoId(value) {
  return /^[A-Za-z0-9_-]{11}$/.test(value);
}

function hasKeyword(text, regex) {
  return regex.test(text);
}

function scoreKeywords(text, keywords) {
  return keywords.reduce(
    (score, keyword) => score + (text.includes(keyword.toLowerCase()) ? 1 : 0),
    0
  );
}

function scoreCollectionModules(slug, text) {
  return collectionConfig[slug].modules.reduce(
    (total, module) => total + scoreKeywords(text, module.keywords),
    0
  );
}

function inferTopicCollection(text, subject) {
  const slugs =
    subject === "anthropology"
      ? ["anthropology-upsc-lecture-notes", "anthropology-ugc-lecture-notes"]
      : ["psir-upsc-lecture-notes", "psir-ugc-lecture-notes"];

  const scored = slugs
    .map((slug) => ({
      slug,
      score: collectionConfig[slug].modules.reduce(
        (total, module) => total + scoreKeywords(text, module.keywords),
        0
      )
    }))
    .sort((left, right) => right.score - left.score);

  return scored[0]?.score > 0 ? scored[0].slug : null;
}

function classifyCollection(text) {
  const anthroScore =
    scoreCollectionModules("anthropology-upsc-lecture-notes", text) +
    scoreCollectionModules("anthropology-ugc-lecture-notes", text);
  const psirScore =
    scoreCollectionModules("psir-upsc-lecture-notes", text) +
    scoreCollectionModules("psir-ugc-lecture-notes", text);
  const economyScore = scoreCollectionModules("upsc-prelims-economy", text);
  const polityScore = scoreCollectionModules("upsc-ncert-polity", text);

  const anthro = hasKeyword(
    text,
    /anthro|anthropology|hominid|neanderthal|paleolithic|mesolithic|neolithic|archaeology|primate|cytogenetics|inheritance|human genetics/
  ) || anthroScore >= 2;
  const ugc = hasKeyword(text, /ugc|net jrf|ugc net|net anthropology|net political/);
  const upsc = hasKeyword(text, /upsc|cse|prelims|mains/);
  const psir = hasKeyword(
    text,
    /psir|political science|political theory|political thought|pol sci|foreign policy|nuclear proliferation|global south|rawls|veil of ignorance|grassroots democracy|international relations/
  ) || hasKeyword(text, /peace|global conflicts|justice theory/)
  || psirScore >= 2;
  const economy = hasKeyword(
    text,
    /economy|agriculture|apmc|e-nam|pmfby|budget|gdp|inflation|fdi|ofdi|trade|wto|fiscal|monetary|repo rate|rbi|rupee|balance of payments|liberalisation|globalisation|privatisation|disinvestment|industrial reforms|tax reforms|lpg reforms/
  ) || economyScore >= 2;
  const polity = hasKeyword(
    text,
    /polity|constitution|fundamental rights|directive principles|preamble|parliament|citizenship|federalism|executive|judiciary|judge|judges|judicial system|court|supreme court|lok sabha|rajya sabha|class 11 political science|ncert/
  ) || polityScore >= 2;
  const revision = hasKeyword(text, /revision|quick revision/);
  const ncertPolity = polity && hasKeyword(
    text,
    /ncert|class 11|lok sabha|rajya sabha|parliament|fundamental rights|constitution|judiciary|preamble|executive|citizenship/
  );

  if (ncertPolity && !anthro) {
    return "upsc-ncert-polity";
  }

  if (anthro) {
    if (ugc && !upsc) {
      return "anthropology-ugc-lecture-notes";
    }

    if (upsc && !ugc) {
      return "anthropology-upsc-lecture-notes";
    }

    if (revision || (ugc && upsc)) {
      return "revision-lectures";
    }

    return inferTopicCollection(text, "anthropology") ?? "anthropology-ugc-lecture-notes";
  }

  if (psir) {
    if (ugc && !upsc) {
      return "psir-ugc-lecture-notes";
    }

    if (upsc && !ugc) {
      return "psir-upsc-lecture-notes";
    }

    if (revision || (ugc && upsc)) {
      return "revision-lectures";
    }

    return inferTopicCollection(text, "psir") ?? "psir-ugc-lecture-notes";
  }

  if (economy) {
    return "upsc-prelims-economy";
  }

  if (polity) {
    return "upsc-ncert-polity";
  }

  if (anthroScore > psirScore && anthroScore >= 2) {
    return inferTopicCollection(text, "anthropology") ?? "anthropology-ugc-lecture-notes";
  }

  if (psirScore > anthroScore && psirScore >= 2) {
    return inferTopicCollection(text, "psir") ?? "psir-ugc-lecture-notes";
  }

  if (revision) {
    return "revision-lectures";
  }

  return "channel-misc-library";
}

function cleanTitle(value) {
  return normalizeWhitespace(value)
    .replace(/\s+\|\s+/g, " | ")
    .replace(/\s+#/g, " #")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function isPlaceholderTitle(value) {
  const normalized = cleanTitle(value).toLowerCase();

  return !normalized || normalized === "youtube video" || normalized === "psirupsc";
}

function buildFallbackTitle(description, module) {
  const lines = description
    .split(/\r?\n/)
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean)
    .filter((line) => !line.startsWith("#"))
    .filter((line) => !/^\d{2}:\d{2}/.test(line))
    .filter((line) => line !== "- Topic details unavailable");

  const bulletLines = lines
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^- /, ""))
    .filter(Boolean);

  if (bulletLines.length > 1) {
    return `${bulletLines.slice(0, 2).join(" & ")} Explained`;
  }

  if (bulletLines.length === 1) {
    return `${bulletLines[0]} Explained`;
  }

  return `${module} Lecture`;
}

function buildSummary(description, fallbackTitle) {
  const lines = description
    .split(/\r?\n/)
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean)
    .filter((line) => !line.startsWith("#"))
    .filter((line) => !/^\d{2}:\d{2}/.test(line))
    .filter((line) => line !== "- Topic details unavailable");

  const bulletLines = lines
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^- /, ""))
    .filter(Boolean);

  if (bulletLines.length > 0) {
    const topicSlice = bulletLines.slice(0, 3).join(", ");
    return `Covers ${topicSlice}.`;
  }

  if (lines.length > 0) {
    const summary = lines[0];
    return summary.endsWith(".") ? summary : `${summary}.`;
  }

  return `Watch this lecture on YouTube to continue with ${fallbackTitle}.`;
}

function inferModule(slug, text) {
  const config = collectionConfig[slug];

  if (!config) {
    return "General Uploads";
  }

  const scoredModules = config.modules
    .map((module) => ({
      name: module.name,
      score: scoreKeywords(text, module.keywords)
    }))
    .sort((left, right) => right.score - left.score);

  return scoredModules[0]?.score > 0 ? scoredModules[0].name : config.modules[0].name;
}

function shouldUseSeoTitle(primarySlug, seoSlug, seoTitle) {
  if (!seoTitle || !seoTitle.trim() || isPlaceholderTitle(seoTitle)) {
    return false;
  }

  if (!seoSlug || seoSlug === "channel-misc-library") {
    return true;
  }

  return seoSlug === primarySlug;
}

function buildVideoCollections(records) {
  const deduped = new Map();

  for (const record of records) {
    if (!isVideoId(record.video_id)) {
      continue;
    }

    const primaryText = normalizeText([record.title, record.new_description].join(" "));
    const seoText = normalizeText([record.new_title, record.new_description].join(" "));
    const primarySlug = classifyCollection(primaryText);
    const seoSlug = classifyCollection(seoText);
    const collectionSlug = primarySlug === "channel-misc-library" ? seoSlug : primarySlug;
    const detailText = normalizeText(
      [record.title, record.new_title, record.new_description].join(" ")
    );
    const module = inferModule(collectionSlug, detailText);
    const preferredTitle = shouldUseSeoTitle(primarySlug, seoSlug, record.new_title)
      ? record.new_title
      : record.title;
    const alternateTitle = preferredTitle === record.new_title ? record.title : record.new_title;
    const displayTitle = isPlaceholderTitle(preferredTitle)
      ? isPlaceholderTitle(alternateTitle)
        ? buildFallbackTitle(record.new_description || "", module)
        : cleanTitle(alternateTitle)
      : cleanTitle(preferredTitle);

    deduped.set(record.video_id, {
      youtubeId: record.video_id,
      title: displayTitle || cleanTitle(record.title) || record.video_id,
      summary: buildSummary(record.new_description || "", displayTitle || record.title),
      module,
      duration: "YouTube lecture",
      collectionSlug
    });
  }

  const buckets = new Map(
    Object.keys(collectionConfig).map((slug) => [slug, []])
  );

  for (const item of deduped.values()) {
    buckets.get(item.collectionSlug)?.push({
      youtubeId: item.youtubeId,
      title: item.title,
      summary: item.summary,
      module: item.module,
      duration: item.duration
    });
  }

  return Object.entries(collectionConfig)
    .map(([slug, config]) => ({
      courseSlug: slug,
      audience: config.audience,
      title: config.title,
      description: config.description,
      folderHref: config.folderHref,
      videos: buckets.get(slug) ?? []
    }))
    .filter((collection) => collection.videos.length > 0);
}

const rawInput = fs.readFileSync(resolvedInputPath, "utf8");
const [headerRow, ...dataRows] = parseCsv(rawInput);
const records = dataRows.map((row) =>
  Object.fromEntries(headerRow.map((header, index) => [header, row[index] ?? ""]))
);
const collections = buildVideoCollections(records);

const output = `// Auto-generated by scripts/import-youtube-seo-csv.mjs\n// Source: ${resolvedInputPath}\n\nexport const generatedVideoCollections = ${JSON.stringify(collections, null, 2)};\n`;

fs.writeFileSync(outputPath, output);

console.log(`Imported ${records.length} CSV rows into ${collections.length} collections.`);
for (const collection of collections) {
  console.log(`${collection.courseSlug}: ${collection.videos.length}`);
}
