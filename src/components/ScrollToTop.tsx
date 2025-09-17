import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    let mounted = true;
    const maxRetries = 50;
    const delay = 50;
    let tries = 0;
    const targetSelector = ".hero-section";
    const tryScroll = () => {
      if (!mounted) return;
      const target = document.querySelector(
        targetSelector
      ) as HTMLElement | null;
      const lenis = (window as any).lenis;
      const targetY = target
        ? window.scrollY + target.getBoundingClientRect().top
        : 0;
      if (lenis && typeof lenis.scrollTo === "function") {
        try {
          lenis.scrollTo(targetY, { duration: 1.0 });
          return;
        } catch (err) {
          try {
            if (target) {
              lenis.scrollTo(target);
              return;
            }
            lenis.scrollTo(0);
            return;
          } catch (err2) {}
        }
      }
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      tries++;
      if (tries < maxRetries) {
        setTimeout(tryScroll, delay);
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    if (pathname === "/about" || pathname === "/contact") {
      setTimeout(tryScroll, 20);
    } else {
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        try {
          lenis.scrollTo(0, { duration: 0 });
        } catch {
          window.scrollTo(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
      }
    }
    return () => {
      mounted = false;
    };
  }, [pathname]);

  return null;
}
