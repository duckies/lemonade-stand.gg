import { useCallback, useEffect, useRef } from "react";
import { random } from "lib/number";

export function useRandomInterval(
  callback: () => void,
  minDelay?: number | null,
  maxDelay?: number | null,
) {
  const timeoutId = useRef<number>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const isEnabled = typeof minDelay === "number" && typeof maxDelay === "number";

    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);

        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };

      handleTick();
    }

    return () => window.clearTimeout(timeoutId.current ?? undefined);
  }, [minDelay, maxDelay]);

  const cancel = useCallback(() => {
    window.clearTimeout(timeoutId.current ?? undefined);
  }, []);

  return cancel;
}
