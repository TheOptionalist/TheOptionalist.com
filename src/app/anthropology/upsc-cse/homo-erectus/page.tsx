import Article from "@/components/Article";
import Breadcrumbs from "@/components/Breadcrumbs";
import StudyPanel from "@/components/StudyPanel";
import { extractArticle, loadRawHtml, rewriteRelativeLinks } from "@/lib/content";

const raw = loadRawHtml("Anthropology_UPSC_CSE_Homo_erectus.html");
const html = rewriteRelativeLinks(
  extractArticle(raw),
  "https://theoptionalist.com/Anthropology/UPSC_CSE/"
);

export default function HomoErectusPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Anthropology", href: "/anthropology" },
          { label: "UPSC CSE", href: "/anthropology" },
          { label: "Homo erectus" }
        ]}
      />
      <StudyPanel
        title="Homo erectus: Revision Snapshot"
        summary="A compact guide to the first global hominin, its anatomy, tools, and migratory significance."
        keyPoints={[
          "Time range: about 1.9 million to 110,000 years ago.",
          "Key trait: increased cranial capacity and thick cranial bones.",
          "Acheulean tools define technological advance over Oldowan.",
          "First consistent out-of-Africa dispersal across Asia and Europe.",
          "Evidence of fire use and increased social coordination."
        ]}
        prompts={[
          "Explain the significance of Acheulean tools for Homo erectus.",
          "Assess how Homo erectus differed from Homo habilis.",
          "Discuss the evidence for out-of-Africa migration."
        ]}
        glossary={[
          { term: "Acheulean", meaning: "Bifacial hand-axe tool tradition." },
          { term: "Cranial capacity", meaning: "Approximate brain volume of a species." },
          { term: "Turkana Boy", meaning: "KNM-WT 15000, key Homo erectus fossil." }
        ]}
      />
      <Article html={html} />
    </div>
  );
}
