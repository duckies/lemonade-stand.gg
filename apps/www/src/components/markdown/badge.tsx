import { cn } from "@lemonade-stand/ui";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";

const badgeStyles = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = ComponentProps<"div"> & VariantProps<typeof badgeStyles> & {};

export function Badge({ variant, className, ...props }: BadgeProps) {
  return <div className={cn(badgeStyles({ variant }), className)} {...props} />;
}
