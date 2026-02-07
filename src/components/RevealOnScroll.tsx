"use client";

import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = Array.from(
      document.querySelectorAll(
        ".hero, .hero-banner, .study-panel, .article-shell, .card, .list li, iframe, .course-card, .user-panel, .dashboard-panel, .dashboard-card"
      )
    );

    if (!targets.length) return;

    targets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
