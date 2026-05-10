import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "src", "content", "raw");
const INLINE_VIDEO_PARAGRAPH_OFFSET = 4;

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

function extractYouTubeId(url: string) {
  const watchMatch = url.match(/[?&]v=([^&]+)/i);
  if (watchMatch) {
    return watchMatch[1];
  }

  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/i);
  if (shortMatch) {
    return shortMatch[1];
  }

  const embedMatch = url.match(/youtube\.com\/embed\/([^?&/]+)/i);
  if (embedMatch) {
    return embedMatch[1];
  }

  return null;
}

function removeDownloadPdfBlocks(html: string) {
  return html
    .replace(
      /<section\b[^>]*>\s*<h[1-6][^>]*>\s*Download PDF\s*<\/h[1-6]>\s*<p[\s\S]*?<\/p>\s*<\/section>/gi,
      ""
    )
    .replace(
      /<h[1-6][^>]*>\s*Download PDF\s*<\/h[1-6]>\s*<p[\s\S]*?<\/p>/gi,
      ""
    )
    .replace(
      /<p[^>]*>[\s\S]*?Download PDF[\s\S]*?<\/p>/gi,
      ""
    )
    .replace(
      /<p[^>]*>[\s\S]*?<a[^>]*download[^>]*>[\s\S]*?pdf[\s\S]*?<\/a>\s*<\/p>/gi,
      ""
    );
}

function extractInlineVideoSection(html: string) {
  const videoEmbedIndex = html.search(/class=["'][^"']*video-embed[^"']*["']/i);

  if (videoEmbedIndex === -1) {
    return {
      cleanedHtml: html,
      watchUrl: null
    };
  }

  const sectionStart = html.lastIndexOf("<section", videoEmbedIndex);
  const sectionEnd = html.indexOf("</section>", videoEmbedIndex);

  if (sectionStart === -1 || sectionEnd === -1) {
    return {
      cleanedHtml: html,
      watchUrl: null
    };
  }

  const videoSection = html.slice(sectionStart, sectionEnd + "</section>".length);
  const watchUrlMatch = videoSection.match(/href="([^"]*(?:youtube\.com|youtu\.be)[^"]*)"/i);

  return {
    cleanedHtml: html.slice(0, sectionStart) + html.slice(sectionEnd + "</section>".length),
    watchUrl: watchUrlMatch?.[1] ?? null
  };
}

function buildInlineVideoBlock(watchUrl: string) {
  const youtubeId = extractYouTubeId(watchUrl);

  if (!youtubeId) {
    return "";
  }

  return `
    <section class="article-inline-video" aria-label="Related lecture">
      <div class="article-inline-video-copy">
        <p class="article-inline-video-kicker">Related Lecture</p>
        <h2>Watch the topic video without leaving the article.</h2>
        <p>
          Reading flow break kiye bina yahin embedded lecture dekh sakte ho, then
          neeche same article me continue karo.
        </p>
      </div>
      <div class="article-inline-video-frame">
        <iframe
          src="https://www.youtube.com/embed/${youtubeId}"
          title="Embedded YouTube lecture"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <p class="article-inline-video-link">
        <a href="${watchUrl}" target="_blank" rel="noreferrer">Open on YouTube</a>
      </p>
    </section>
  `;
}

function injectInlineVideo(html: string, watchUrl: string) {
  const inlineVideoBlock = buildInlineVideoBlock(watchUrl);

  if (!inlineVideoBlock) {
    return html;
  }

  const footerIndex = html.search(/<footer\b/i);
  const bodyHtml = footerIndex === -1 ? html : html.slice(0, footerIndex);
  const footerHtml = footerIndex === -1 ? "" : html.slice(footerIndex);
  const paragraphMatches = [...bodyHtml.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/gi)];
  const targetParagraph = paragraphMatches[Math.min(INLINE_VIDEO_PARAGRAPH_OFFSET - 1, paragraphMatches.length - 1)];

  if (!targetParagraph || typeof targetParagraph.index !== "number") {
    return `${bodyHtml}${inlineVideoBlock}${footerHtml}`;
  }

  const insertionIndex = targetParagraph.index + targetParagraph[0].length;
  return `${bodyHtml.slice(0, insertionIndex)}${inlineVideoBlock}${bodyHtml.slice(insertionIndex)}${footerHtml}`;
}

export function enhanceArticleHtml(html: string) {
  const { cleanedHtml, watchUrl } = extractInlineVideoSection(removeDownloadPdfBlocks(html));

  if (!watchUrl) {
    return cleanedHtml;
  }

  return injectInlineVideo(cleanedHtml, watchUrl);
}

export function prepareArticleHtml(rawHtml: string, baseUrl?: string) {
  const extractedHtml = extractArticle(rawHtml);
  const rewrittenHtml = baseUrl ? rewriteRelativeLinks(extractedHtml, baseUrl) : extractedHtml;

  return enhanceArticleHtml(rewrittenHtml);
}
