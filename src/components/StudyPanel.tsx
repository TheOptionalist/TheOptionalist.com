type StudyPanelProps = {
  title: string;
  summary: string;
  keyPoints: string[];
  prompts: string[];
  glossary: { term: string; meaning: string }[];
};

export default function StudyPanel({
  title,
  summary,
  keyPoints,
  prompts,
  glossary
}: StudyPanelProps) {
  return (
    <section className="study-panel">
      <div className="study-head">
        <h2>{title}</h2>
        <p>{summary}</p>
      </div>

      <div className="study-grid">
        <div className="study-card">
          <h3>Key Points</h3>
          <ul className="list">
            {keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="study-card">
          <h3>Exam Prompts</h3>
          <ul className="list">
            {prompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
        </div>
        <div className="study-card">
          <h3>Glossary</h3>
          <ul className="list">
            {glossary.map((item) => (
              <li key={item.term}>
                <strong>{item.term}:</strong> {item.meaning}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
