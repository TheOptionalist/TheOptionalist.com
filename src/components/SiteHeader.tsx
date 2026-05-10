"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDeferredValue, useEffect, useRef, useState } from "react";

type SiteHeaderSearchItem = {
  id: string;
  title: string;
  href: string;
  label: "Page" | "Folder" | "Module" | "Lesson" | "Video";
  category: string;
  description: string;
  keywords: string[];
};

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/tests", label: "Tests" },
  { href: "/upsc-prelims", label: "UPSC Prelims" },
  { href: "/anthropology", label: "Anthropology" },
  { href: "/psir", label: "PSIR" },
  { href: "/blogs", label: "Blogs" },
  { href: "/stories", label: "Stories" }
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getSearchResults(items: SiteHeaderSearchItem[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return items.slice(0, 6);
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return items
    .filter((item) => {
      const haystack = [item.title, item.category, item.description, ...item.keywords]
        .join(" ")
        .toLowerCase();

      return terms.every((term) => haystack.includes(term));
    })
    .sort((left, right) => {
      const leftTitle = left.title.toLowerCase();
      const rightTitle = right.title.toLowerCase();
      const leftStarts = leftTitle.startsWith(normalizedQuery) ? 1 : 0;
      const rightStarts = rightTitle.startsWith(normalizedQuery) ? 1 : 0;

      if (leftStarts !== rightStarts) {
        return rightStarts - leftStarts;
      }

      const leftIncludes = leftTitle.includes(normalizedQuery) ? 1 : 0;
      const rightIncludes = rightTitle.includes(normalizedQuery) ? 1 : 0;

      if (leftIncludes !== rightIncludes) {
        return rightIncludes - leftIncludes;
      }

      return left.title.localeCompare(right.title, "en", { sensitivity: "base" });
    })
    .slice(0, 8);
}

export default function SiteHeader({
  searchItems
}: {
  searchItems: SiteHeaderSearchItem[];
}) {
  const pathname = usePathname();
  const accountActive = pathname === "/account" || pathname === "/login";
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const results = getSearchResults(searchItems, deferredQuery);
  const showResults = searchOpen && (query.trim().length > 0 || results.length > 0);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!searchRef.current?.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  return (
    <>
      <div className="site-header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            <img src="/brand-mark.svg" alt="" />
          </span>
          <span className="brand-copy">
            <span className="brand-kicker">UPSC / UGC NET</span>
            <span className="brand-title">The Optionalist</span>
          </span>
        </Link>

        <div className="site-header-controls">
          <div className="site-search" ref={searchRef}>
            <label className="sr-only" htmlFor="site-search-input">
              Search The Optionalist
            </label>
            <span className="site-search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="5.75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                />
                <path
                  d="M15 15l4.25 4.25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              id="site-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search courses, tests, prelims, topics"
              autoComplete="off"
            />
            {query ? (
              <button
                className="site-search-clear"
                type="button"
                onClick={() => {
                  setQuery("");
                  setSearchOpen(true);
                }}
                aria-label="Clear search"
              >
                <span aria-hidden="true">x</span>
              </button>
            ) : null}

            {showResults ? (
              <div className="site-search-panel">
                <div className="site-search-head">
                  <span>{query.trim() ? `${results.length} results` : "Quick access"}</span>
                  {query.trim() ? <span>Press a result to open</span> : <span>Suggested paths</span>}
                </div>

                <div className="site-search-results">
                  {results.length > 0 ? (
                    results.map((item) => (
                      <Link
                        className="search-result"
                        href={item.href}
                        key={item.id}
                        onClick={() => {
                          setMenuOpen(false);
                          setSearchOpen(false);
                          setQuery("");
                        }}
                      >
                        <div className="search-result-meta">
                          <span className="search-result-label">{item.label}</span>
                          <span className="search-result-category">{item.category}</span>
                        </div>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </Link>
                    ))
                  ) : (
                    <div className="search-empty">
                      <strong>No results found</strong>
                      <p>Try course names, subjects, module titles, or video topics.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="menu-toggle-label">{menuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      <div
        className={`site-nav-shell${menuOpen ? " is-open" : ""}`}
        id="primary-navigation"
      >
        <nav className="site-nav" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link
              className={`site-nav-link${isActivePath(pathname, link.href) ? " is-active" : ""}`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-nav-actions">
          <Link
            className={`site-user-link${accountActive ? " is-active" : ""}`}
            href="/account"
            aria-label="Open account"
            title="Open account"
          >
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <circle
                cx="12"
                cy="8"
                r="3.75"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M5.5 19a6.5 6.5 0 0 1 13 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
