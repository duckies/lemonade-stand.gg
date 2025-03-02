"use client";

import { cn } from "@lemonade-stand/ui";
import { DynamicLink } from "components/dynamic-link";
import { type WowheadEnv, buildWowheadUrl } from "components/wowhead/constants";
import { WarcraftIcon } from "components/wowhead/icon";
import { ChevronDownIcon } from "lucide-react";
import { AnimatePresence, type Transition, type Variants, motion } from "motion/react";
import { Fragment, type ReactNode, useCallback, useState } from "react";

type MechanicProps = {
  name: string;
  id: number | string;
  env?: WowheadEnv;
  difficulty?: "normal" | "heroic" | "mythic";
  caption?: string;
  pill?: string | (string | ReactNode)[];
  slot?: ReactNode;
  children: ReactNode;
  className?: string;
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

export type MechanicPillProps = {
  className?: string;
  children: ReactNode;
};

import { useMemo } from "react";



function Mechanic({ id, env, difficulty, name, caption, pill, slot, children, className }: MechanicProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const MemoizedWarcraftIcon = useMemo(
    () => (
      <WarcraftIcon
        className="shadow-xl [box-shadow:0_0_0_1px_rgb(250_214_122)]"
        id={id}
        dd={difficulty === "heroic" ? 15 : undefined}
        ddsize={difficulty === "heroic" ? 30 : undefined}
        env={env}
        size={45}
      />
    ),
    [id, env, difficulty],
  );

  return (
    <div
      className={cn("group relative my-4 max-w-none rounded-lg bg-muted shadow-lg", className)}
      data-state={isOpen ? "open" : "closed"}
    >
      <div
        className="not-prose flex gap-4 rounded-md p-4 hover:cursor-pointer"
        onClick={toggle}
        onKeyDown={(e) => e.key === "Enter" && toggle()}
      >
        <div className="flex shrink-0 items-center rounded-md animate-in fade-in">
          <DynamicLink href={buildWowheadUrl("spell", id, env, difficulty === "heroic" ? 15 : undefined, difficulty === "heroic" ? 30 : undefined)} variant="plain">
            {MemoizedWarcraftIcon}
          </DynamicLink>
        </div>
        <div className="flex grow flex-col justify-evenly font-medium">
          <div className="text-xl leading-6">{name}</div>
          {caption && <span className="text-sm text-primary/90">{caption}</span>}
        </div>

        {pill && (
          <div className="flex items-center gap-2">
            {Array.isArray(pill) ? (
              pill.map((p, i) =>
                // biome-ignore lint/suspicious/noArrayIndexKey: I have no other properties :)
                typeof p === "string" ? <Pill key={p}>{p}</Pill> : <Fragment key={i}>{p}</Fragment>,
              )
            ) : (
              <Pill>{pill}</Pill>
            )}
          </div>
        )}

        {slot && <div className="flex items-center gap-3">{slot}</div>}

        <div className={cn("flex items-center mr-2")}>
          <ChevronDownIcon className="h-7 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </div>
      </div>

      <div className="px-5">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            initial={false}
            animate={isOpen ? "expanded" : "collapsed"}
            variants={variants}
            transition={transition}
            className={cn("relative overflow-hidden border-t border-border")}
            aria-expanded={isOpen}
          >
            <div className="pt-4 pb-5 prose">{children}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Pill({ className, children }: MechanicPillProps) {
  return (
    <span
      className={cn(
        "flex items-center rounded-full bg-primary py-1 px-3 text-sm font-medium text-black shadow-md",
        className,
      )}
    >
      {children}
    </span>
  );
}

const Root = Mechanic;

export { Mechanic, Pill, Root };

