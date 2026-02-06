import Article from "@/components/Article";
import Breadcrumbs from "@/components/Breadcrumbs";
import StudyPanel from "@/components/StudyPanel";
import { extractArticle, loadRawHtml, rewriteRelativeLinks } from "@/lib/content";

const raw = loadRawHtml("Anthropology_UGC_NET_Neanderthal.html");
const html = rewriteRelativeLinks(
  extractArticle(raw),
  "https://theoptionalist.com/Anthropology/UGC_NET/"
);

export default function NeanderthalUgcPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Anthropology", href: "/anthropology" },
          { label: "UGC NET", href: "/anthropology" },
          { label: "Neanderthal Man" }
        ]}
      />
      <StudyPanel
        title="Neanderthals: UGC NET Quick Notes"
        summary="UGC NET focused highlights on distribution, fossil sites, and theoretical debates in paleoanthropology."
        keyPoints={[
          "Distribution: Europe, Western Asia, and parts of the Middle East.",
          "Core fossil sites: Neander Valley, Krapina, La Chapelle-aux-Saints.",
          "Culture: Mousterian tools with Levallois technique.",
          "Debates: replacement vs continuity vs assimilation models.",
          "Genetics: limited interbreeding with modern humans."
        ]}
        prompts={[
          "Write a short note on Neanderthal distribution and key sites.",
          "Compare replacement and continuity models of human evolution.",
          "Discuss Neanderthal genetic contribution to modern humans."
        ]}
        glossary={[
          { term: "Assimilation model", meaning: "Replacement with limited interbreeding." },
          { term: "Continuity model", meaning: "Regional evolution with gene flow." },
          { term: "Replacement model", meaning: "Modern humans replaced Neanderthals." }
        ]}
      />
      <Article html={html} />
    </div>
  );
}
