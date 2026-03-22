import type { Metadata } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import AuthSessionSync from "@/components/AuthSessionSync";
import RevealOnScroll from "@/components/RevealOnScroll";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const publicSans = Public_Sans({
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
      <body className={`${publicSans.variable} ${sourceSerif.variable}`}>
        <div className="site">
          <header className="site-header">
            <div className="site-header-inner">
              <Link className="brand" href="/">
                <span className="brand-title">The Optionalist</span>
              </Link>
            </div>
          </header>
          <main className="site-main">
            <div className="container">{children}</div>
          </main>
          <footer className="site-footer">
            <div className="container footer-grid">
              <div>
                <p className="footer-kicker">The Optionalist</p>
              </div>
            </div>
          </footer>
        </div>
        <RevealOnScroll />
        <AuthSessionSync />
      </body>
    </html>
  );
}
