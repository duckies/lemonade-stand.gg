import { type RefObject, useEffect, useRef, useState } from "react";

interface ObserverOptions {
  threshold?: Array<number>;
  ignoreSubsequentEntries?: boolean;
}

export function useIsOnScreen(
  ref: RefObject<HTMLElement | undefined | null>,
  defaultState = false,
  options: ObserverOptions = {
    threshold: [0],
    ignoreSubsequentEntries: false,
  },
) {
  const [isOnScreen, setIsOnScreen] = useState(defaultState);

  const thresholdRef = useRef(options.threshold);

  useEffect(() => {
    if (!ref.current) return;

    if (isOnScreen && options.ignoreSubsequentEntries) return;

    const observer = new IntersectionObserver((entries) => {
      setIsOnScreen(entries.at(0)!.intersectionRatio > 0);
    }, {
      threshold: thresholdRef.current,
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, isOnScreen, options.ignoreSubsequentEntries]);

  return isOnScreen;
}
