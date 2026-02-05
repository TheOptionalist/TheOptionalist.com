import Link from "next/link";

export default function AnthropologyPage() {
  return (
    <div>
      <section className="hero">
        <div>
          <h2>Anthropology</h2>
          <p>
            Explore human origins, cultural change, and exam-critical topics across
            UPSC, UGC NET, and Ivy League-level reading lists.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="button primary" href="/anthropology/upsc-cse/neanderthal">
            UPSC CSE: Neanderthals
          </Link>
          <Link className="button" href="/anthropology/upsc-cse/homo-erectus">
            UPSC CSE: Homo erectus
          </Link>
          <Link className="button" href="/anthropology/ugc-net/neanderthal">
            UGC NET: Neanderthals
          </Link>
        </div>
      </section>

      <h3 className="section-title">Modules</h3>
      <ul className="list">
        <li>
          <Link href="/anthropology/upsc-cse/neanderthal">UPSC CSE - Neanderthals</Link>
        </li>
        <li>
          <Link href="/anthropology/upsc-cse/homo-erectus">UPSC CSE - Homo erectus</Link>
        </li>
        <li>
          <Link href="/anthropology/ugc-net/neanderthal">UGC NET - Neanderthals</Link>
        </li>
        <li>Ivy Leagues - Neanderthals (Coming soon)</li>
      </ul>
    </div>
  );
}
