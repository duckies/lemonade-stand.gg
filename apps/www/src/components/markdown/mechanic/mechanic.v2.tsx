"use client";

import { cn } from "@lemonade-stand/ui";
import { LucideChevronDown } from "lucide-react";
import { AnimatePresence, type Transition, type Variants, motion } from "motion/react";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface DetailsProps {
  defaultOpen?: boolean;
  className?: string;
  children?: ReactNode;
}

interface DetailsContext {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const DetailsContext = createContext<DetailsContext | null>(null);


export function Details({ defaultOpen = false, className, children }: DetailsProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const value = useMemo(() => ({ value: isOpen, onValueChange: setIsOpen }), [isOpen]);

  return (
    <DetailsContext.Provider value={value}>
      <div
        className={cn("group relative my-4 max-w-none rounded-lg bg-muted shadow-lg", className)}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
      </div>
    </DetailsContext.Provider>
  );
}

export function DetailsTrigger({ children, ...props }: ComponentPropsWithoutRef<"div">) {
  const context = useContext(DetailsContext);

  if (!context) {
    throw new Error("`DetailsTrigger` must be used within a `Details` component");
  }

  const { value, onValueChange } = context;

  const toggle = useCallback(() => onValueChange(!value), [onValueChange, value]);

  return (
    <div
      className="not-prose flex gap-4 rounded-md p-4 hover:cursor-pointer"
      onClick={toggle}
      onKeyDown={(e) => e.key === "Enter" && toggle()}
      {...props}
    >
      {children}
      <div className="flex items-center ml-auto">
        <LucideChevronDown
          className="size-5 transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function DetailsHeader({ children, className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex grow flex-col justify-evenly font-medium", className)} {...props}>
      {children}
    </div>
  );
}

export function DetailsIcon({ className, ...props }: { children?: ReactNode; className?: string }) {
  return (
    <div
      className={cn("flex shrink-0 items-center rounded-md animate-in fade-in", className)}
      {...props}
    />
  );
}

export function DetailsTitle({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("text-xl leading-6", className)} {...props} />;
}

export function DetailsCaption({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("text-sm text-primary/90", className)} {...props} />;
}

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

export function DetailsContent({ className, children, ...props }: ComponentPropsWithoutRef<"div">) {
  const context = useContext(DetailsContext);

  if (!context) {
    throw new Error("`DetailsContent` must be used within a `Details` component");
  }

  const { value } = context;

  return (
    <div className={cn("px-5", className)}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          initial={false}
          animate={value ? "expanded" : "collapsed"}
          variants={variants}
          transition={transition}
          className="relative overflow-hidden border-t border-border"
          aria-expanded={value}
        >
          <div className="pt-4 pb-5 prose">{children}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
