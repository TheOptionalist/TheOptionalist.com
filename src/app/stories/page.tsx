const upcomingStories = [
  {
    meta: "Upcoming narrative",
    title: "The Forgotten Shaman",
    description:
      "A story-led learning piece that can make anthropological themes more memorable and easier to recall."
  },
  {
    meta: "Upcoming narrative",
    title: "A Debate in Plato's Cave",
    description:
      "A more engaging concept story that can support political theory understanding through narrative."
  }
];

export default function StoriesPage() {
  return (
    <div className="page-stack">
      <section className="hero">
        <div>
          <p className="eyebrow">Learning stories</p>
          <h1>Narrative pieces that make concepts easier to remember.</h1>
          <p>
            This area gives the website a more thoughtful and educational feel by
            mixing structured study material with memorable concept stories.
          </p>
        </div>
      </section>

      <section>
        <div className="section-intro">
          <div>
            <p className="eyebrow">Coming soon</p>
            <h2 className="section-title">Narrative-based learning support.</h2>
          </div>
          <p className="section-copy">
            Stories are framed here as concept support material so the section feels
            useful and intentional, not disconnected from the rest of the site.
          </p>
        </div>

        <div className="resource-grid">
          {upcomingStories.map((story) => (
            <article className="resource-card" key={story.title}>
              <p className="resource-meta">{story.meta}</p>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
