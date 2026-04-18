export type TestTrack = {
  meta: string;
  status: string;
  title: string;
  summary: string;
  bestFor: string;
  format: string;
  points: string[];
  href: string;
  ctaLabel: string;
};

export type TestSection = {
  slug: string;
  meta: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  supportHref: string;
  supportLabel: string;
};

export type McqQuestion = {
  id: number;
  text: string;
  options: string[];
  answer: string;
  rationale: string;
};

export type TestPaper = {
  slug: string;
  sectionSlug: string;
  title: string;
  summary: string;
  duration: string;
  level: string;
  sourceLabel: string;
  questions: McqQuestion[];
};

export const testTracks: TestTrack[] = [
  {
    meta: "UPSC Prelims",
    status: "Live Practice",
    title: "Objective Test Lanes",
    summary:
      "Open economy and NCERT polity practice shelves arranged for disciplined prelims revision before mock-heavy phases.",
    bestFor: "MCQ-oriented preparation",
    format: "2 prelims shelves",
    points: [
      "Economy and polity practice separated cleanly",
      "Revision stays closer to prelims-style flow",
      "Built for objective recall before mocks"
    ],
    href: "/upsc-prelims",
    ctaLabel: "Open Prelims Tests"
  },
  {
    meta: "Anthropology + PSIR",
    status: "Revision Drills",
    title: "Quick Recall Test Shelf",
    summary:
      "Use short revision lecture folders as fast drill rounds when you want to refresh topics just before self-testing.",
    bestFor: "Last-mile revision",
    format: "4 revision blocks",
    points: [
      "Compact refreshers before test sessions",
      "Useful for timed concept recall",
      "Cross-subject revision in one place"
    ],
    href: "/courses/folders/revision-lectures",
    ctaLabel: "Open Drill Shelf"
  },
  {
    meta: "Anthropology",
    status: "Subject Focus",
    title: "Anthropology Topic-Test Flow",
    summary:
      "Start with anthropology subject lanes when you want chapter-wise testing after theory, evolution, or archaeology revision.",
    bestFor: "Optional subject practice",
    format: "UPSC + UGC entry paths",
    points: [
      "Topic-wise subject entry points",
      "Works well after note completion",
      "Covers theory, bio, and archaeology blocks"
    ],
    href: "/anthropology",
    ctaLabel: "Open Anthropology"
  },
  {
    meta: "PSIR",
    status: "Concept Checks",
    title: "PSIR Practice Section",
    summary:
      "Use PSIR tracks to revisit thinkers, state debates, and comparative politics before your next concept test or answer-writing round.",
    bestFor: "Theory-heavy revision",
    format: "UPSC + UGC entry paths",
    points: [
      "Thinkers and theory revision lanes",
      "Useful before concept-check sessions",
      "Subject flow stays aligned to the main library"
    ],
    href: "/psir",
    ctaLabel: "Open PSIR"
  }
];

const testSections: TestSection[] = [
  {
    slug: "ugc-net-anthropology",
    meta: "UGC NET",
    title: "Anthropology",
    description:
      "Topic-wise anthropology test section for human evolution, genetics, growth, and revision-oriented UGC practice.",
    href: "/tests/ugc-net-anthropology",
    ctaLabel: "Open Test Section",
    supportHref: "/courses/folders/anthropology-ugc-lecture-notes",
    supportLabel: "Open Study Folder"
  },
  {
    slug: "ugc-net-political-science",
    meta: "UGC NET",
    title: "Political Science",
    description:
      "Political theory, traditions, thinkers, and comparative politics aligned for UGC NET political science test practice.",
    href: "/tests/ugc-net-political-science",
    ctaLabel: "Open Test Section",
    supportHref: "/courses/folders/psir-ugc-lecture-notes",
    supportLabel: "Open Study Folder"
  },
  {
    slug: "upsc-anthropology-optional",
    meta: "UPSC Optional",
    title: "Anthropology Optional",
    description:
      "Dedicated anthropology optional test section covering theory, Indian anthropology, biological anthropology, and archaeology.",
    href: "/tests/upsc-anthropology-optional",
    ctaLabel: "Open Test Section",
    supportHref: "/courses/folders/anthropology-upsc-lecture-notes",
    supportLabel: "Open Study Folder"
  },
  {
    slug: "upsc-psir-optional",
    meta: "UPSC Optional",
    title: "PSIR Optional",
    description:
      "PSIR optional test section for political theory, state debates, ideologies, thinkers, and global-order preparation.",
    href: "/tests/upsc-psir-optional",
    ctaLabel: "Open Test Section",
    supportHref: "/courses/folders/psir-upsc-lecture-notes",
    supportLabel: "Open Study Folder"
  },
  {
    slug: "upsc-prelims",
    meta: "UPSC",
    title: "Prelims",
    description:
      "Objective-preparation section for economy and polity practice with a cleaner prelims-oriented test flow.",
    href: "/tests/upsc-prelims",
    ctaLabel: "Open Test Section",
    supportHref: "/upsc-prelims",
    supportLabel: "Open Prelims Shelf"
  }
];

const ugcNetPoliticalScienceQuestions: McqQuestion[] = [
  {
    id: 1,
    text: "Who among the following categorized feminism into three distinct 'waves' in her work 'The Second Wave'?",
    options: ["Maggie Humm", "Martha Lear", "Rebecca Walker", "Alice Walker"],
    answer: "Martha Lear",
    rationale:
      "Martha Lear is credited with first using the 'wave' terminology in a 1968 New York Times Magazine article."
  },
  {
    id: 2,
    text: "Which feminist thinker criticized the liberal 'Universal Man' by proposing the concept of a 'Differentiated Citizenship'?",
    options: ["Iris Marion Young", "Seyla Benhabib", "Nancy Fraser", "Chantal Mouffe"],
    answer: "Iris Marion Young",
    rationale:
      "In 'Justice and the Politics of Difference', Young argues that treating everyone the same ignores the structural disadvantages of groups."
  },
  {
    id: 3,
    text:
      "Match List-I (Book) with List-II (Author):\n(a) The Dialectic of Sex\n(b) Sexual Politics\n(c) The Feminine Mystique\n(d) The Second Sex\n(1) Simone de Beauvoir\n(2) Betty Friedan\n(3) Kate Millett\n(4) Shulamith Firestone",
    options: [
      "a-4, b-3, c-2, d-1",
      "a-3, b-4, c-2, d-1",
      "a-4, b-3, c-1, d-2",
      "a-1, b-2, c-3, d-4"
    ],
    answer: "a-4, b-3, c-2, d-1",
    rationale: "Firestone (1970), Millett (1970), Friedan (1963), and Beauvoir (1949)."
  },
  {
    id: 4,
    text: "The concept of 'Compulsory Heterosexuality' as a patriarchal institution was developed by:",
    options: ["Judith Butler", "Adrienne Rich", "Audre Lorde", "Monique Wittig"],
    answer: "Adrienne Rich",
    rationale:
      "Rich's famous essay argues that heterosexuality is a political institution used to ensure male access to women."
  },
  {
    id: 5,
    text: "The 'Difference Feminism' school of thought argues that:",
    options: [
      "Women should be identical to men",
      "Biological differences are irrelevant",
      "Women have unique values like peace and nurturing",
      "Gender is purely a social construct"
    ],
    answer: "Women have unique values like peace and nurturing",
    rationale:
      "Difference feminism celebrates the specific qualities and perspectives of women rather than seeking sameness."
  },
  {
    id: 6,
    text:
      "Match List-I (Concept) with List-II (Thinker):\n(a) Black Feminism\n(b) Cyborg Manifesto\n(c) Ethic of Care\n(d) Standpoint Theory\n(1) Donna Haraway\n(2) Carol Gilligan\n(3) Bell Hooks\n(4) Nancy Hartsock",
    options: [
      "a-3, b-1, c-2, d-4",
      "a-1, b-3, c-4, d-2",
      "a-3, b-2, c-1, d-4",
      "a-4, b-1, c-2, d-3"
    ],
    answer: "a-3, b-1, c-2, d-4",
    rationale:
      "Hooks is associated with Black Feminism, Haraway with the Cyborg Manifesto, Gilligan with the ethic of care, and Hartsock with standpoint theory."
  },
  {
    id: 7,
    text: "Which type of feminism views the 'state' as an inherently patriarchal institution that cannot be used for liberation?",
    options: ["Liberal Feminism", "Radical Feminism", "Socialist Feminism", "Marxist Feminism"],
    answer: "Radical Feminism",
    rationale:
      "Radical feminists often view the state as a patriarchal tool and favor grassroots or separatist movements."
  },
  {
    id: 8,
    text:
      "Assertion (A): Liberal feminists support the reform of existing laws and institutions.\n\nReason (R): They believe that women's inequality is primarily due to legal and educational restrictions.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is not the explanation",
      "A is true, R is false",
      "A is false, R is true"
    ],
    answer: "Both A and R are true, and R is the correct explanation",
    rationale:
      "Liberal feminists seek equality of opportunity within the current system rather than a total revolution."
  },
  {
    id: 9,
    text:
      "Match List-I (Slogan/Term) with List-II (Associated Thinker/Group):\n(a) Wages for Housework\n(b) Personal is Political\n(c) Woman is not born but becomes\n(d) Double Burden\n(1) Simone de Beauvoir\n(2) Silvia Federici\n(3) Second Wave Activists\n(4) Marxist Feminists",
    options: [
      "a-2, b-3, c-1, d-4",
      "a-1, b-2, c-3, d-4",
      "a-2, b-1, c-3, d-4",
      "a-4, b-3, c-2, d-1"
    ],
    answer: "a-2, b-3, c-1, d-4",
    rationale:
      "Federici is associated with Wages for Housework, second-wave activists with Personal is Political, Beauvoir with 'becomes', and Marxist feminists with Double Burden."
  },
  {
    id: 10,
    text: "Who wrote 'Toward a Feminist Theory of the State'?",
    options: ["Catharine MacKinnon", "Susan Brownmiller", "Andrea Dworkin", "Mary Wollstonecraft"],
    answer: "Catharine MacKinnon",
    rationale:
      "MacKinnon is a legal scholar who analyzes the state and law through a radical feminist lens."
  },
  {
    id: 11,
    text:
      "Assertion (A): Ecofeminists argue that the Enlightenment led to the dual exploitation of women and nature.\n\nReason (R): Enlightenment rationality prioritized 'Man' and 'Reason' over 'Nature' and 'Emotion'.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is not the explanation",
      "A is true, R is false",
      "A is false, R is true"
    ],
    answer: "Both A and R are true, and R is the correct explanation",
    rationale:
      "Ecofeminists like Carolyn Merchant critique the Scientific Revolution for mechanistic views of nature."
  },
  {
    id: 12,
    text:
      "Assertion (A): Post-colonial feminists criticize Western feminism for being universalist.\n\nReason (R): They argue that the experience of a 'Third World Woman' is distinct from a Western woman due to the legacy of colonialism.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is not the explanation",
      "A is true, R is false",
      "A is false, R is true"
    ],
    answer: "Both A and R are true, and R is the correct explanation",
    rationale:
      "Thinkers like Chandra Talpade Mohanty argue against the homogenization of women's experiences."
  },
  {
    id: 13,
    text: "Which thinker is associated with the 'Materialist Feminism' that critiques both patriarchy and capitalism?",
    options: ["Heidi Hartmann", "Rosemarie Tong", "Zillah Eisenstein", "Both A and C"],
    answer: "Both A and C",
    rationale:
      "Hartmann and Eisenstein are key figures in socialist and materialist feminism through dual-systems theory."
  },
  {
    id: 14,
    text: "Who among the following wrote 'Feminism is for Everybody'?",
    options: ["Bell Hooks", "Alice Walker", "Angela Davis", "Gloria Steinem"],
    answer: "Bell Hooks",
    rationale:
      "Bell Hooks wrote this book to define feminism in a simple, inclusive way that addresses race and class."
  },
  {
    id: 15,
    text:
      "Assertion (A): Radical feminists often support separatism from men.\n\nReason (R): They believe that all interactions with men in a patriarchal society inevitably result in female subordination.",
    options: [
      "Both A and R are true, and R is the correct explanation",
      "Both A and R are true, but R is not the explanation",
      "A is true, R is false",
      "A is false, R is true"
    ],
    answer: "Both A and R are true, and R is the correct explanation",
    rationale:
      "Some radical feminist factions argue for women-only spaces to build consciousness free from male influence."
  }
];

const testPapers: TestPaper[] = [
  {
    slug: "political-traditions-feminism-mock-01",
    sectionSlug: "ugc-net-political-science",
    title: "Unit 1: Political Traditions - Feminism Mock 01",
    summary:
      "15 MCQs converted from Notes-18-4-2026.html covering feminism waves, thinkers, books, slogans, and major schools for UGC NET Political Science.",
    duration: "20 minutes",
    level: "UGC NET Political Science",
    sourceLabel: "Converted from Notes-18-4-2026.html",
    questions: ugcNetPoliticalScienceQuestions
  }
];

export function getFeaturedTestTracks(limit = 3) {
  return testTracks.slice(0, limit);
}

export function getTestSections() {
  return [...testSections];
}

export function getTestSectionBySlug(slug: string) {
  return testSections.find((section) => section.slug === slug) ?? null;
}

export function getTestPapersBySectionSlug(sectionSlug: string) {
  return testPapers.filter((paper) => paper.sectionSlug === sectionSlug);
}

export function getTestPaperBySlugs(sectionSlug: string, paperSlug: string) {
  return (
    testPapers.find(
      (paper) => paper.sectionSlug === sectionSlug && paper.slug === paperSlug
    ) ?? null
  );
}
