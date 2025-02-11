"use client";

import { cn } from "@lemonade-stand/ui";
import { useIsOnScreen } from "hooks/use-is-on-screen";
import { usePrefersReducedMotion } from "hooks/use-prefers-reduced-motion";
import { useRandomInterval } from "hooks/use-random-interval";
import { sample } from "lib/array";
import { random } from "lib/number";
import { nanoid } from "nanoid";
import { type CSSProperties, type ReactNode, useRef, useState } from "react";

const generatePosition = (size: number) => ({
  left: `${random(0, 100)}%`,
  zIndex: random(1, 3),
  ...(Math.random() > 0.5 ? { top: size * 0.5 } : { bottom: -size * 0.5 }),
});

export type Sparkle = {
  id: string;
  color: string;
  size: number;
  createdAt: number;
  style: CSSProperties;
};

function generateSparkle({
  colors,
  minSize,
  maxSize,
}: {
  colors: string[];
  minSize: number;
  maxSize: number;
}): Sparkle {
  const size = random(minSize, maxSize);

  const sparkle = {
    id: nanoid(),
    color: sample(colors),
    size,
    createdAt: Date.now(),
    style: generatePosition(size),
  };

  return sparkle;
}

export type SparklesProps = {
  rate?: number;
  variance?: number;
  colors: string[];
  minSize?: number;
  maxSize?: number;
  children: ReactNode;
  className?: string;
};

export function Sparkles({
  rate = 250,
  variance = 200,
  colors = ["var(--color-primary)"],
  minSize = 10,
  maxSize = 20,
  children,
  className,
}: SparklesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const isOnScreen = useIsOnScreen(ref);

  useRandomInterval(
    () => {
      if (!isOnScreen) return;

      const sparkle = generateSparkle({
        colors,
        minSize,
        maxSize,
      });

      const now = Date.now();

      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 1000;
      });

      nextSparkles.push(sparkle);

      setSparkles(nextSparkles);
    },
    prefersReducedMotion ? null : rate - variance,
    prefersReducedMotion ? null : rate + variance,
  );

  return (
    <span
      className={cn(
        "inline-block relative font-bold isolate [text-shadow:0_0_3px_var(--color-background),1px_1px_1px_var(--color-background)]",
        className,
      )}
      ref={ref}
    >
      {sparkles.map((sparkle) => (
        <SparkleIcon
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <span className="relative z-1">{children}</span>
    </span>
  );
}

export function SparkleIcon({
  size,
  color,
  style,
}: { size: number | string; color?: string; style?: CSSProperties }) {
  return (
    <span className="absolute block animate-scale-in-out text-primary" style={style}>
      <svg
        className="block animate-spin [transition-duration:2000ms] ease-linear"
        width={size}
        height={size}
        viewBox="0 0 184 184"
        aria-hidden="true"
        fill="none"
      >
        <path
          fill="currentColor"
          d="M92 0C92 0 96 63.4731 108.263 75.7365C120.527 88 184 92 184 92C184 92 118.527 98 108.263 108.263C98 118.527 92 184 92 184C92 184 86.4731 119 75.7365 108.263C65 97.5269 0 92 0 92C0 92 63.9731 87.5 75.7365 75.7365C87.5 63.9731 92 0 92 0Z"
        />
      </svg>
    </span>
  );
}
