import Article from "@/components/Article";
import Breadcrumbs from "@/components/Breadcrumbs";
import StudyPanel from "@/components/StudyPanel";
import { extractArticle, loadRawHtml, rewriteRelativeLinks } from "@/lib/content";

const raw = loadRawHtml("PSIR_UGC_NET_Introduction.html");
const html = rewriteRelativeLinks(
  extractArticle(raw),
  "https://theoptionalist.com/PSIR/UGC_NET/"
);

export default function PsirUgcIntroductionPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "PSIR", href: "/psir" },
          { label: "UGC NET", href: "/psir" },
          { label: "Liberal Theory of the State" }
        ]}
      />
      <StudyPanel
        title="Liberal Theory of the State: UGC NET Quick Notes"
        summary="A quick scan of liberal assumptions, constitutional impact, and common critique lines for UGC NET prep."
        keyPoints={[
          "Individual rights are natural and inalienable.",
          "State exists to protect rights, not grant them.",
          "Separation of powers and rule of law ensure limits.",
          "Modern liberalism supports welfare and equality of opportunity.",
          "Communitarian and Marxist critiques highlight social inequality."
        ]}
        prompts={[
          "Write a short note on rule of law in liberal theory.",
          "Explain the difference between classical and modern liberalism.",
          "Mention key critiques of liberalism."
        ]}
        glossary={[
          { term: "Social contract", meaning: "Authority based on consent of the governed." },
          { term: "Separation of powers", meaning: "Executive, legislature, judiciary are distinct." },
          { term: "Welfare liberalism", meaning: "State ensures social and economic rights." }
        ]}
      />
      <Article html={html} />
    </div>
  );
}
