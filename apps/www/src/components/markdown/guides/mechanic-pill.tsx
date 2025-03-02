

import { cn } from "@lemonade-stand/ui";
import { type VariantProps, cva } from "class-variance-authority";
import type { ReactNode } from "react";

export const MechanicPillStyles = cva("rounded-full px-2 py-1 text-sm font-medium", {
  variants: {
    variant: {
      default: "bg-primary",
      green: "bg-emerald-300",
      blue: "bg-sky-300",
      red: "bg-rose-400",
      purple: "bg-violet-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface MechanicPillProps extends VariantProps<typeof MechanicPillStyles> {
  className?: string;
  children?: ReactNode
}

export function MechanicPill({ className, variant, ...props }: MechanicPillProps) {
  return (
    <span
      className={cn(MechanicPillStyles({ variant }),
        "flex items-center rounded-full py-1 px-3 text-sm font-medium text-black shadow-md",
        className,
      )}
      {...props} />
  )
}
