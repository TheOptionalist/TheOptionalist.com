const upcomingEssays = [
  {
    meta: "Upcoming reading",
    title: "The Anthropology of Belief",
    description:
      "A support essay that can help students connect culture, ritual, and interpretation more naturally."
  },
  {
    meta: "Upcoming reading",
    title: "The State in a Globalizing World",
    description:
      "A more reflective political science piece that can support answer enrichment and wider understanding."
  }
];

export default function BlogsPage() {
  return (
    <div className="page-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">Support reading</p>
          <h1>Blogs that help students think beyond short notes.</h1>
          <p>
            These essays are meant to support understanding, answer enrichment, and a
            more professional academic feel across the website.
          </p>
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Coming soon</p>
            <h2 className="section-title">Supportive essays for deeper understanding.</h2>
          </div>
          <p className="section-copy">
            This space is positioned as an academic reading library rather than a
            casual blog roll, which helps the site feel more serious and professional.
          </p>
        </div>

        <div className="resource-grid">
          {upcomingEssays.map((essay) => (
            <article className="resource-card" key={essay.title}>
              <p className="resource-meta">{essay.meta}</p>
              <h3>{essay.title}</h3>
              <p>{essay.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
