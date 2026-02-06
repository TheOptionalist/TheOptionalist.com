import Article from "@/components/Article";
import Breadcrumbs from "@/components/Breadcrumbs";
import StudyPanel from "@/components/StudyPanel";
import { extractArticle, loadRawHtml, rewriteRelativeLinks } from "@/lib/content";

const raw = loadRawHtml("PSIR_UPSC_CSE_Introduction.html");
const html = rewriteRelativeLinks(
  extractArticle(raw),
  "https://theoptionalist.com/PSIR/UPSC_CSE/"
);

export default function PsirUpscIntroductionPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "PSIR", href: "/psir" },
          { label: "UPSC CSE", href: "/psir" },
          { label: "Liberal Theory of the State" }
        ]}
      />
      <StudyPanel
        title="Liberal Theory of the State: Revision Snapshot"
        summary="UPSC-ready frame for liberalism: origins, core assumptions, critiques, and contemporary relevance."
        keyPoints={[
          "Origins in Enlightenment: Locke, Hobbes, Rousseau.",
          "Core ideas: individual rights, limited government, rule of law.",
          "Key thinkers: Locke, Mill, Montesquieu, Dicey, Rawls.",
          "Modern liberalism adds welfare and positive liberty.",
          "Critiques include inequality, atomism, and market fundamentalism."
        ]}
        prompts={[
          "Discuss liberalism as a theory of the state with key thinkers.",
          "Explain negative vs positive liberty with examples.",
          "Critically evaluate liberalism in contemporary India."
        ]}
        glossary={[
          { term: "Rule of law", meaning: "All are subject to law, including the state." },
          { term: "Negative liberty", meaning: "Freedom from interference." },
          { term: "Positive liberty", meaning: "Capacity to act and realize goals." }
        ]}
      />
      <Article html={html} />
    </div>
  );
}
