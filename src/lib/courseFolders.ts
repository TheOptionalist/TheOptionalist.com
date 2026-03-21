import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

export type CourseFolderAsset = {
  fileName: string;
  href: string;
  title: string;
};

export type CourseFolderModule = {
  order: string;
  title: string;
  description: string;
  status: "Start here" | "Next step" | "After completion";
  assetDir?: string;
};

export type CourseFolder = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  audience: string;
  order: number;
  storagePath: string;
  studyMode?: "sequential" | "reference";
  modules: CourseFolderModule[];
};

const courseFolders: CourseFolder[] = [
  {
    slug: "anthropology-upsc-lecture-notes",
    title: "Anthropology UPSC Lecture Notes",
    subtitle: "Theory, Indian anthropology, biological anthropology, and prehistory in one structured folder.",
    description:
      "This folder collects the Anthropology UPSC lecture notes into clear study blocks so students can move from theory to application and then into archaeology without random jumping.",
    audience: "Anthropology UPSC",
    order: 5,
    storagePath: "public/course-assets/anthropology-upsc-lecture-notes/",
    modules: [
      {
        order: "Module 1",
        title: "Anthropological Theories",
        description:
          "Start with the major schools and theoretical approaches first so later topics become easier to understand.",
        status: "Start here",
        assetDir: "course-assets/anthropology-upsc-lecture-notes/anthropological-theories"
      },
      {
        order: "Module 2",
        title: "Indian Society and Applied Anthropology",
        description:
          "Move here after theory so political, social, and Indian anthropology themes connect better.",
        status: "Next step",
        assetDir: "course-assets/anthropology-upsc-lecture-notes/indian-society-and-application"
      },
      {
        order: "Module 3",
        title: "Biological Anthropology and Genetics",
        description:
          "Use this block for biocultural foundations, genetics, and human evolution-oriented concepts.",
        status: "Next step",
        assetDir: "course-assets/anthropology-upsc-lecture-notes/biological-anthropology-and-genetics"
      },
      {
        order: "Module 4",
        title: "Prehistory and Archaeology",
        description:
          "Finish with prehistoric cultures, archaeological principles, and civilization transitions for a full UPSC track.",
        status: "After completion",
        assetDir: "course-assets/anthropology-upsc-lecture-notes/prehistory-and-archaeology"
      }
    ]
  },
  {
    slug: "anthropology-ugc-lecture-notes",
    title: "Anthropology UGC Lecture Notes",
    subtitle: "Human evolution, genetics, variation, and growth topics organized for UGC study flow.",
    description:
      "This folder collects the Anthropology UGC lecture notes into a cleaner sequence so students can move from primates and human evolution to genetics, variation, and growth in the right order.",
    audience: "Anthropology UGC",
    order: 6,
    storagePath: "public/course-assets/anthropology-ugc-lecture-notes/",
    modules: [
      {
        order: "Module 1",
        title: "Primate and Human Evolution",
        description:
          "Start with primates, pre-hominids, and the fossil sequence so the evolutionary flow becomes easier to retain.",
        status: "Start here",
        assetDir: "course-assets/anthropology-ugc-lecture-notes/primate-and-human-evolution"
      },
      {
        order: "Module 2",
        title: "Human Genetics Foundations",
        description:
          "Build the genetics base after evolution so inheritance, mutation, and molecular concepts stay more structured.",
        status: "Next step",
        assetDir: "course-assets/anthropology-ugc-lecture-notes/human-genetics-foundations"
      },
      {
        order: "Module 3",
        title: "Population Genetics and Human Variation",
        description:
          "Move here for variation models, population genetics, and population distribution themes important for UGC coverage.",
        status: "Next step",
        assetDir: "course-assets/anthropology-ugc-lecture-notes/population-genetics-and-human-variation"
      },
      {
        order: "Module 4",
        title: "Growth and Culture Background",
        description:
          "Finish with human growth, maturation, and the Copper-Bronze cultural background for a more complete revision flow.",
        status: "After completion",
        assetDir: "course-assets/anthropology-ugc-lecture-notes/growth-and-culture"
      }
    ]
  },
  {
    slug: "psir-upsc-lecture-notes",
    title: "PSIR UPSC Lecture Notes",
    subtitle: "Political theory, state debates, ideologies, and global order topics organized for UPSC preparation.",
    description:
      "This folder collects the PSIR UPSC lecture notes into a cleaner sequence so students can start with theory foundations, move into state and power debates, and then revise thinkers plus global-order themes without random jumping.",
    audience: "PSIR UPSC",
    order: 7,
    storagePath: "public/course-assets/psir-upsc-lecture-notes/",
    modules: [
      {
        order: "Module 1",
        title: "Political Theory Foundations",
        description:
          "Start here to build the base in rights, justice, democracy, and political theory before moving into state-specific debates.",
        status: "Start here",
        assetDir: "course-assets/psir-upsc-lecture-notes/political-theory-foundations"
      },
      {
        order: "Module 2",
        title: "State, Power, and Governance",
        description:
          "Move here after the basics so power structures, legitimacy, and the main theories of the state fit together more clearly.",
        status: "Next step",
        assetDir: "course-assets/psir-upsc-lecture-notes/state-power-and-governance"
      },
      {
        order: "Module 3",
        title: "Ideologies and Thinkers",
        description:
          "Use this block for core ideologies and major thinkers once the conceptual base of political theory is already stable.",
        status: "Next step",
        assetDir: "course-assets/psir-upsc-lecture-notes/ideologies-and-thinkers"
      },
      {
        order: "Module 4",
        title: "Global Order and Post-colonial Perspectives",
        description:
          "Finish with international political economy, Global South debates, and India's external engagement themes for a rounded PSIR flow.",
        status: "After completion",
        assetDir: "course-assets/psir-upsc-lecture-notes/global-order-and-postcolonial-perspectives"
      }
    ]
  },
  {
    slug: "psir-ugc-lecture-notes",
    title: "PSIR UGC Lecture Notes",
    subtitle: "Political theory, comparative politics, thinkers, and Indian political thought organized for UGC study flow.",
    description:
      "This folder collects the PSIR UGC lecture notes into a cleaner sequence so students can begin with theory concepts, move into comparative politics and constitutionalism, then revise thinkers and finish with Indian thought plus decolonial perspectives.",
    audience: "PSIR UGC",
    order: 8,
    storagePath: "public/course-assets/psir-ugc-lecture-notes/",
    modules: [
      {
        order: "Module 1",
        title: "Political Theory Concepts and Traditions",
        description:
          "Start here for core political theory concepts, ideological traditions, development, and nationalism before moving into comparative structures.",
        status: "Start here",
        assetDir: "course-assets/psir-ugc-lecture-notes/political-theory-concepts-and-traditions"
      },
      {
        order: "Module 2",
        title: "Comparative Politics and Constitutionalism",
        description:
          "Move here after the theory base so regimes, constitutionalism, and institutional debates stay more structured.",
        status: "Next step",
        assetDir: "course-assets/psir-ugc-lecture-notes/comparative-politics-and-constitutionalism"
      },
      {
        order: "Module 3",
        title: "Political Thinkers and Traditions",
        description:
          "Use this block for Plato to Mao, along with major political-thought material, once the conceptual foundation is already clear.",
        status: "Next step",
        assetDir: "course-assets/psir-ugc-lecture-notes/political-thinkers-and-traditions"
      },
      {
        order: "Module 4",
        title: "Indian Thought and Decolonial Perspectives",
        description:
          "Finish with Indian political thought, colonialism, decolonization, and Fanon for a broader UGC-oriented revision flow.",
        status: "After completion",
        assetDir: "course-assets/psir-ugc-lecture-notes/indian-thought-and-decolonial-perspectives"
      }
    ]
  },
  {
    slug: "revision-lectures",
    title: "Revision Lectures",
    subtitle: "Quick revision PDFs for Anthropology and PSIR kept in one lighter-access library.",
    description:
      "This folder collects the currently available revision lectures into compact subject-wise blocks so students can quickly open a refresher PDF without searching across multiple sections.",
    audience: "Quick Revision",
    order: 9,
    storagePath: "public/course-assets/revision-lectures/",
    studyMode: "reference",
    modules: [
      {
        order: "Block 1",
        title: "Political Science UPSC Revision",
        description:
          "Use this block for fast PSIR revision on state and feminist political-thought topics before answer writing or mock practice.",
        status: "Start here",
        assetDir: "course-assets/revision-lectures/political-science-upsc"
      },
      {
        order: "Block 2",
        title: "Anthropology UGC Revision",
        description:
          "Open this refresher when you want a quick anthropology revision lecture on evolutionary theory and related UGC preparation.",
        status: "Next step",
        assetDir: "course-assets/revision-lectures/anthropology-ugc"
      },
      {
        order: "Block 3",
        title: "Political Science UGC Revision",
        description:
          "This slot is ready for future PSIR UGC revision lectures so the quick-revision library stays organized.",
        status: "After completion",
        assetDir: "course-assets/revision-lectures/political-science-ugc"
      },
      {
        order: "Block 4",
        title: "Anthropology UPSC Revision",
        description:
          "This slot is ready for future Anthropology UPSC revision lectures, keeping all short revision material in one shelf.",
        status: "After completion",
        assetDir: "course-assets/revision-lectures/anthropology-upsc"
      }
    ]
  },
  {
    slug: "upsc-prelims-economy",
    title: "UPSC Prelims Economy",
    subtitle: "Finish one economy module properly before moving to the next one.",
    description:
      "This folder is meant for a clean, step-by-step economy preparation flow so students do not jump randomly between topics.",
    audience: "UPSC Prelims",
    order: 10,
    storagePath: "public/course-assets/upsc-prelims-economy/",
    modules: [
      {
        order: "Module 1",
        title: "Foundation Notes",
        description:
          "Start with the base economy notes and complete the concept-building material first.",
        status: "Start here"
      },
      {
        order: "Module 2",
        title: "Revision and Reinforcement",
        description:
          "Move here only after the foundation is complete so revision remains structured and useful.",
        status: "Next step"
      },
      {
        order: "Module 3",
        title: "Practice Support",
        description:
          "Add practice sheets, revision PDFs, and quick boosters only after the first two modules are done.",
        status: "After completion"
      }
    ]
  },
  {
    slug: "upsc-ncert-polity",
    title: "UPSC NCERT Polity",
    subtitle: "Build polity understanding module by module in the right order.",
    description:
      "This folder is for NCERT-based polity preparation where the reading sequence matters and concept flow should stay disciplined.",
    audience: "UPSC Foundation",
    order: 20,
    storagePath: "public/course-assets/upsc-ncert-polity/",
    modules: [
      {
        order: "Module 1",
        title: "NCERT Base Reading",
        description:
          "Complete the primary NCERT-backed polity material first to create a stable foundation.",
        status: "Start here"
      },
      {
        order: "Module 2",
        title: "Topic Consolidation",
        description:
          "Use this stage for chapter-wise reinforcement after the basic reading is fully covered.",
        status: "Next step"
      },
      {
        order: "Module 3",
        title: "Revision and Application",
        description:
          "Keep this for revision notes, summaries, and later-stage exam support once the core module is finished.",
        status: "After completion"
      }
    ]
  }
];

export function getCourseFolders() {
  return [...courseFolders].sort((left, right) => left.order - right.order);
}

export function getCourseFolderBySlug(slug: string) {
  return getCourseFolders().find((folder) => folder.slug === slug) ?? null;
}

function formatAssetTitle(fileName: string) {
  return fileName
    .replace(/\.pdf$/i, "")
    .replace(/_/g, ": ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[:\-\s]+$/, "");
}

export function getCourseFolderModuleAssets(module: CourseFolderModule): CourseFolderAsset[] {
  const assetDir = module.assetDir;

  if (!assetDir) {
    return [];
  }

  const assetPath = path.join(process.cwd(), "public", assetDir);

  if (!existsSync(assetPath)) {
    return [];
  }

  const files = readdirSync(assetPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".pdf"))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, "en", { sensitivity: "base" }));

  return files.map((fileName) => ({
    fileName,
    href: `/${[...assetDir.split("/"), fileName].map(encodeURIComponent).join("/")}`,
    title: formatAssetTitle(fileName)
  }));
}
