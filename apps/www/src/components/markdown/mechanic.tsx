"use client";

import { cn } from "@lemonade-stand/ui";
import { ChevronDownIcon } from "lucide-react";
import { AnimatePresence, type Transition, type Variants, motion } from "motion/react";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { Link } from "../Link";
import { WarcraftIcon } from "../warcraft-icon";

type MechanicProps = {
  name: string;
  id: number;
  caption?: string;
  pill?: string;
  children: ReactNode;
};

const variants = {
  collapsed: {
    opacity: 0,
    height: 0,
  },
  expanded: {
    height: "auto",
    display: "block",
    opacity: 1,
  },
} satisfies Variants;

const transition = {
  duration: 0.25,
  height: "auto",
  ease: [0.04, 0.62, 0.23, 0.98],
} satisfies Transition;

export function Mechanic({ id, name, caption, pill, children }: MechanicProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const MemoizedWarcraftIcon = useMemo(
    () => (
      <WarcraftIcon
        className="shadow-xl [box-shadow:0_0_0_1px_rgb(250_214_122)]"
        id={id}
        size={45}
      />
    ),
    [id],
  );

  return (
    <div className="relative my-4 max-w-none rounded-lg bg-muted shadow-lg">
      <div
        className="not-prose flex gap-4 rounded-md p-4 hover:cursor-pointer"
        onClick={toggle}
        onKeyDown={(e) => e.key === "Enter" && toggle()}
      >
        <div className="flex shrink-0 items-center rounded-md">
          <Link href={`https://wowhead.com/spell=${id}`} variant="plain">
            {MemoizedWarcraftIcon}
          </Link>
        </div>

        <div className="flex flex-grow flex-col justify-between font-medium">
          <div className="text-xl leading-6">{name}</div>
          {caption && <span className="text-base leading-[1] text-yellow-400">{caption}</span>}
        </div>

        <div
          className={cn(
            "flex items-center p-3 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        >
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>

      <div className="px-5">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            initial={false}
            animate={isOpen ? "expanded" : "collapsed"}
            variants={variants}
            transition={transition}
            className={cn("relative overflow-hidden border-t border-gray-800")}
            aria-expanded={isOpen}
          >
            <div className="pt-4 pb-5">{children}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
