export type PaidProductType = "module" | "mock-tests-pass";

export type NetJrfAnthropologyModule = {
  id: string;
  month: number;
  title: string;
  description: string;
  topics: string[];
  priceInRupees: number;
  productId: string;
};

export type PaidProduct = {
  id: string;
  type: PaidProductType;
  title: string;
  description: string;
  amountInRupees: number;
  metadata: Record<string, string>;
};

export const NET_JRF_ANTHROPOLOGY_COURSE = {
  slug: "net-jrf-anthropology",
  title: "NET JRF Anthropology",
  description:
    "A 7-month NET JRF Anthropology preparation path with monthly paid modules.",
  pricePerModuleInRupees: 699
};

export const netJrfAnthropologyModules: NetJrfAnthropologyModule[] = [
  {
    id: "month-1",
    month: 1,
    title: "Foundation of Anthropology",
    description: "Core concepts, scope, branches, and history of anthropology.",
    topics: ["Meaning and scope", "Branches", "History of anthropology", "Basic concepts"],
    priceInRupees: 699,
    productId: "net-jrf-anthropology-month-1"
  },
  {
    id: "month-2",
    month: 2,
    title: "Social and Cultural Anthropology",
    description: "Society, culture, kinship, marriage, family, and social institutions.",
    topics: ["Culture and society", "Kinship", "Marriage and family", "Social organization"],
    priceInRupees: 699,
    productId: "net-jrf-anthropology-month-2"
  },
  {
    id: "month-3",
    month: 3,
    title: "Anthropological Theories",
    description: "Major theoretical schools for UGC NET JRF Anthropology.",
    topics: ["Evolutionism", "Diffusionism", "Functionalism", "Structuralism"],
    priceInRupees: 699,
    productId: "net-jrf-anthropology-month-3"
  },
  {
    id: "month-4",
    month: 4,
    title: "Biological Anthropology",
    description: "Human evolution, primates, genetics, and biological variation.",
    topics: ["Primates", "Human evolution", "Genetics", "Human variation"],
    priceInRupees: 699,
    productId: "net-jrf-anthropology-month-4"
  },
  {
    id: "month-5",
    month: 5,
    title: "Archaeological Anthropology",
    description: "Prehistory, dating methods, tool traditions, and Indian archaeology.",
    topics: ["Prehistory", "Dating methods", "Stone tools", "Indian archaeology"],
    priceInRupees: 699,
    productId: "net-jrf-anthropology-month-5"
  },
  {
    id: "month-6",
    month: 6,
    title: "Indian Anthropology",
    description: "Tribes, caste, village studies, applied anthropology, and constitutional safeguards.",
    topics: ["Tribes in India", "Caste", "Village studies", "Applied anthropology"],
    priceInRupees: 699,
    productId: "net-jrf-anthropology-month-6"
  },
  {
    id: "month-7",
    month: 7,
    title: "Revision and JRF Practice",
    description: "High-yield revision, PYQ orientation, and JRF-level practice strategy.",
    topics: ["PYQ themes", "Mock strategy", "Rapid revision", "Research aptitude links"],
    priceInRupees: 699,
    productId: "net-jrf-anthropology-month-7"
  }
];

export const MOCK_TESTS_PASS_PRODUCT: PaidProduct = {
  id: "mock-tests-pass",
  type: "mock-tests-pass",
  title: "Mock Tests Pass",
  description: "Unlock all paid mock tests with one purchase.",
  amountInRupees: 699,
  metadata: {
    accessType: "mock-tests"
  }
};

export function getPaidProducts(): PaidProduct[] {
  return [
    ...netJrfAnthropologyModules.map((module) => ({
      id: module.productId,
      type: "module" as const,
      title: `${NET_JRF_ANTHROPOLOGY_COURSE.title} - Month ${module.month}`,
      description: module.title,
      amountInRupees: module.priceInRupees,
      metadata: {
        courseSlug: NET_JRF_ANTHROPOLOGY_COURSE.slug,
        moduleId: module.id
      }
    })),
    MOCK_TESTS_PASS_PRODUCT
  ];
}

export function getPaidProductById(productId: string) {
  return getPaidProducts().find((product) => product.id === productId) ?? null;
}
