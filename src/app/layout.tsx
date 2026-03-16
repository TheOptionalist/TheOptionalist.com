import type { Metadata } from "next";
import "./globals.css";
import { Source_Serif_4, Public_Sans } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import RevealOnScroll from "@/components/RevealOnScroll";
import AuthSessionSync from "@/components/AuthSessionSync";

const fraunces = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const sora = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "The Optionalist",
  description: "Explore UPSC, UGC NET, and Ivy League-level content in Anthropology and PSIR."
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${fraunces.variable}`}>
        <div className="site">
          <header className="site-header" data-menu="closed">
            <div className="brand">
              <h1>The Optionalist</h1>
              <span>Scholarship by Choice</span>
            </div>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="primary-navigation"
              aria-label="Menu"
            >
              <span className="menu-icon" aria-hidden="true"></span>
            </button>
            <nav className="nav-links" id="primary-navigation">
              <Link href="/anthropology">Anthropology</Link>
              <Link href="/psir">PSIR</Link>
              <Link href="/blogs">Blogs</Link>
              <Link href="/stories">Stories</Link>
              <Link href="/account">Account</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/login">Login</Link>
            </nav>
          </header>
          <main className="site-main">
            <div className="container">{children}</div>
          </main>
          <footer className="site-footer">
            <p>Built to keep learning optional, rigorous, and joyful.</p>
          </footer>
        </div>
        <RevealOnScroll />
        <AuthSessionSync />
        <Script src="/menu.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
