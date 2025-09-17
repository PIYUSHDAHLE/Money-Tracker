// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/about") {
      const targetSelector = ".hero-section";
      const maxRetries = 20;
      let tries = 0;

      const tryScroll = () => {
        const hero = document.querySelector(targetSelector);
        const lenis = (window as any).lenis;

        if (lenis && hero) {
          // Use lenis.scrollTo for smooth scroll
          lenis.scrollTo(hero, { duration: 1.0 });
          return;
        }

        if (hero) {
          // Fallback: native smooth scroll (in case Lenis isn't present)
          hero.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        tries++;
        if (tries < maxRetries) {
          // Try again after a short delay
          setTimeout(tryScroll, 40);
        }
      };

      tryScroll();
    } else {
      // Instant jump for other pages
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
