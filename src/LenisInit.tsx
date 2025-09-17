import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisInit({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis();
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      try {
        lenis.destroy();
      } catch {}
    };
  }, []);

  return <>{children}</>;
}
