import React from "react";

export default function Article({ html }: { html: string }) {
  return (
    <section className="article-shell">
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
