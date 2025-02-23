import { cn } from "@lemonade-stand/ui";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithRef } from "react";

type ClassColorProps = ComponentPropsWithRef<"span"> & {
  asChild?: boolean;
  classId: number;
};

export function ClassColor({ className, classId, asChild, ...props }: ClassColorProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(
        {
          "text-death-knight": classId === 6,
          "text-demon-hunter": classId === 12,
          "text-druid": classId === 11,
          "text-evoker": classId === 13,
          "text-hunter": classId === 3,
          "text-mage": classId === 8,
          "text-monk": classId === 10,
          "text-paladin": classId === 2,
          "text-priest": classId === 5,
          "text-rogue": classId === 4,
          "text-warlock": classId === 9,
          "text-warrior": classId === 7,
        },
        className,
      )}
      {...props}
    />
  );
}
