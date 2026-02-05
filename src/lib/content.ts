import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "src", "content", "raw");

export function loadRawHtml(fileName: string) {
  const fullPath = path.join(contentDir, fileName);
  return fs.readFileSync(fullPath, "utf8");
}

function extractByTag(html: string, tag: string) {
  const regex = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "i");
  const match = html.match(regex);
  return match ? match[0] : "";
}

export function extractArticle(html: string) {
  const article = extractByTag(html, "article");
  if (article) return article;

  const main = extractByTag(html, "main");
  if (main) return main;

  const headerIndex = html.toLowerCase().indexOf("<header");
  if (headerIndex !== -1) {
    const navIndex = html.indexOf("<!-- Navigation Buttons -->");
    const endIndex = navIndex !== -1 ? navIndex : html.toLowerCase().indexOf("</body>");
    if (endIndex !== -1) {
      return html.slice(headerIndex, endIndex);
    }
  }

  return html;
}

export function rewriteRelativeLinks(html: string, baseUrl: string) {
  return html.replace(/(href|src)\s*=\s*"(?!https?:|#|mailto:|\/)([^"]+)"/gi, (_match, attr, url) => {
    const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    return `${attr}="${normalizedBase}${url}"`;
  });
}
