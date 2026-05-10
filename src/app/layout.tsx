import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import AuthSessionSync from "@/components/AuthSessionSync";
import RevealOnScroll from "@/components/RevealOnScroll";
import SiteHeader from "@/components/SiteHeader";
import StudyAssistant from "@/components/StudyAssistant";
import { getSiteSearchItems } from "@/lib/siteSearch";
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

let devGlobalStyles = "";

if (process.env.NODE_ENV === "development") {
  try {
    // Keep a local fallback for the dev CSS asset issue without breaking production SSR.
    devGlobalStyles = readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");
  } catch {
    devGlobalStyles = "";
  }
}

export const metadata: Metadata = {
  metadataBase: new URL("https://theoptionalist.com"),
  title: "The Optionalist",
  description: "Explore UPSC, UGC NET, and Ivy League-level content in Anthropology and PSIR.",
  applicationName: "The Optionalist",
  category: "education",
  icons: {
    icon: [{ url: "/brand-mark.svg", type: "image/svg+xml" }],
    shortcut: ["/brand-mark.svg"]
  },
  openGraph: {
    title: "The Optionalist",
    description: "Explore UPSC, UGC NET, and Ivy League-level content in Anthropology and PSIR.",
    url: "https://theoptionalist.com",
    siteName: "The Optionalist",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "The Optionalist",
    description: "Explore UPSC, UGC NET, and Ivy League-level content in Anthropology and PSIR."
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b1f24"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const searchItems = getSiteSearchItems();

  return (
    <html lang="en">
      <head>
        {devGlobalStyles ? <style dangerouslySetInnerHTML={{ __html: devGlobalStyles }} /> : null}
      </head>
      <body className={`${publicSans.variable} ${sourceSerif.variable}`}>
        <div className="site">
          <header className="site-header">
            <SiteHeader searchItems={searchItems} />
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
        <StudyAssistant />
      </body>
    </html>
  );
}
