import { cn } from "@lemonade-stand/ui";
import type { ComponentPropsWithRef } from "react";
import { cva } from "class-variance-authority";

interface SectionProps extends ComponentPropsWithRef<"section"> {}

export function Section({ className, ...props }: SectionProps) {
  return <section className={cn("my-16", className)} {...props} />;
}

interface SectionHeader extends ComponentPropsWithRef<"div"> {}

export function SectionHeader({ className, ...props }: SectionHeader) {
  return <div className={cn("flex flex-col space-y-2 py-10", className)} {...props} />;
}

interface SectionTitle extends ComponentPropsWithRef<"h1"> {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const SectionTitleStyle = cva("font-serif font-semibold tracking-wider", {
  variants: {
    as: {
      h1: "text-6xl",
      h2: "text-4xl",
      h3: "text-3xl",
      h4: "text-2xl",
      h5: "text-2xl",
      h6: "text-2xl",
    }
  }
})

export function SectionTitle({ as, className, ...props }: SectionTitle) {
  const Heading = as;

  return <Heading className={SectionTitleStyle({ as, className  })} {...props} />;
}

interface SectionDescription extends ComponentPropsWithRef<"p"> {}

export function SectionDescription({ className, ...props }: SectionDescription) {
  return <p className={cn("text-muted-foreground", className)} {...props} />;
}