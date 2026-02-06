import Link from "next/link";

export default function PsirPage() {
  return (
    <div>
      <section className="hero">
        <div>
          <h2>Political Science & International Relations</h2>
          <p>
            Dive into political theory, comparative politics, and global affairs with
            UPSC and UGC NET-aligned coverage.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="button primary" href="/psir/upsc-cse/introduction">
            UPSC CSE: Liberal Theory of State
          </Link>
          <Link className="button" href="/psir/ugc-net/introduction">
            UGC NET: Liberal Theory of State
          </Link>
        </div>
      </section>

      <h3 className="section-title">Modules</h3>
      <ul className="list">
        <li>
          <Link href="/psir/upsc-cse/introduction">UPSC CSE - Liberal Theory of State</Link>
        </li>
        <li>
          <Link href="/psir/ugc-net/introduction">UGC NET - Liberal Theory of State</Link>
        </li>
        <li>Ivy Leagues - Liberal Theory of State (Coming soon)</li>
      </ul>
    </div>
  );
}
