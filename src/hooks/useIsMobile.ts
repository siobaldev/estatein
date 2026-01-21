"use client";

import { useEffect, useState, useEffectEvent } from "react";

export function useIsMobile(breakpoint: number = 1023): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const setIsMobileEvent = useEffectEvent((value: boolean) => {
    // Set initial value
    setIsMobile(value);
  });

  useEffect(() => {
    // Guard for SSR
    if (typeof window === "undefined") return;

    const mediaQuery: MediaQueryList = window.matchMedia(
      `(max-width: ${breakpoint}px)`,
    );

    setIsMobileEvent(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [breakpoint]);

  return isMobile;
}
