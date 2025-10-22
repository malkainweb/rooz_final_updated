"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import type { LenisOptions } from "@studio-freight/lenis";

// 1. Create context
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for mobile devices
    const isMobile = () => window.innerWidth <= 768;

    // Only initialize on desktop
    if (isMobile()) return;

    // Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false, // Better performance on touch devices
      touchMultiplier: 2,
    } satisfies LenisOptions);

    setLenis(lenisInstance);

    // RAF loop
    function raf(time: number) {
      lenisInstance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Handle resize - destroy and reinitialize if needed
    const handleResize = () => {
      if (isMobile() && lenisInstance) {
        lenisInstance.destroy();
        setLenis(null);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
