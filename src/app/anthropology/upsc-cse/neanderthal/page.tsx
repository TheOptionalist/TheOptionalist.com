import Article from "@/components/Article";
import Breadcrumbs from "@/components/Breadcrumbs";
import StudyPanel from "@/components/StudyPanel";
import { extractArticle, loadRawHtml, rewriteRelativeLinks } from "@/lib/content";

const raw = loadRawHtml("Anthropology_UPSC_CSE_Neanderthal.html");
const html = rewriteRelativeLinks(
  extractArticle(raw),
  "https://theoptionalist.com/Anthropology/UPSC_CSE/"
);

export default function NeanderthalUpscPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Anthropology", href: "/anthropology" },
          { label: "UPSC CSE", href: "/anthropology" },
          { label: "Neanderthal Man" }
        ]}
      />
      <StudyPanel
        title="Neanderthals: Revision Snapshot"
        summary="A fast, exam-first view of Neanderthal origins, adaptations, culture, and debates on extinction and interbreeding."
        keyPoints={[
          "Timeline focus: 400,000-40,000 years ago in Europe and West Asia.",
          "Cold-climate adaptations: stocky build, brow ridges, wide nasal aperture.",
          "Mousterian toolkit and Levallois technique are core identifiers.",
          "Major sites: Neander Valley, La Chapelle-aux-Saints, Spy Cave.",
          "Extinction: multi-factor (climate volatility, competition, demography)."
        ]}
        prompts={[
          "Explain Mousterian culture and its association with Neanderthals.",
          "Assess the causes of Neanderthal extinction with evidence.",
          "Compare Classical vs Progressive Neanderthals."
        ]}
        glossary={[
          { term: "Levallois", meaning: "Prepared-core flaking technique." },
          { term: "Mousterian", meaning: "Middle Paleolithic tool industry." },
          { term: "Bergmann's Rule", meaning: "Body size increases in colder climates." }
        ]}
      />
      <Article html={html} />
    </div>
  );
}
