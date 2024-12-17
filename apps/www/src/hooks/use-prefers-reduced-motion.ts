import { useEffect, useState } from "react";

export const PrefersReducedMotionQuery =
  "(prefers-reduced-motion: no-preference)";

function getInitialState() {
  return typeof window === "undefined"
    ? true
    : !(window.matchMedia(PrefersReducedMotionQuery).matches);
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getInitialState,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(PrefersReducedMotionQuery);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, []);

  return prefersReducedMotion;
}
