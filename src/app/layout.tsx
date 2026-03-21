import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import AuthSessionSync from "@/components/AuthSessionSync";
import RevealOnScroll from "@/components/RevealOnScroll";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"]
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
      <body className={`${manrope.variable} ${sourceSerif.variable}`}>
        <div className="site">
          <header className="site-header" data-menu="closed">
            <div className="site-header-inner">
              <Link className="brand" href="/">
                <span className="brand-mark" aria-hidden="true">
                  TO
                </span>
                <span className="brand-copy">
                  <span className="brand-title">The Optionalist</span>
                  <span>Scholarship by Choice</span>
                </span>
              </Link>
              <nav className="nav-links" id="primary-navigation">
                <Link href="/">Home</Link>
                <Link href="/courses">Courses</Link>
                <Link href="/anthropology">Anthropology</Link>
                <Link href="/psir">PSIR</Link>
                <Link href="/blogs">Blogs</Link>
                <Link href="/stories">Stories</Link>
                <Link href="/account">Account</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/login">Login</Link>
              </nav>
            </div>
          </header>
          <main className="site-main">
            <div className="container">{children}</div>
          </main>
          <footer className="site-footer">
            <div className="container footer-grid">
              <div>
                <p className="footer-kicker">The Optionalist</p>
                <p>Exam-aligned scholarship for Anthropology, PSIR, and deep readers.</p>
              </div>
              <div className="footer-links">
                <Link href="/">Home</Link>
                <Link href="/courses">Courses</Link>
                <Link href="/anthropology">Anthropology</Link>
                <Link href="/psir">PSIR</Link>
                <Link href="/blogs">Blogs</Link>
                <Link href="/login">Account Access</Link>
              </div>
            </div>
          </footer>
        </div>
        <RevealOnScroll />
        <AuthSessionSync />
        <Script src="/menu.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
