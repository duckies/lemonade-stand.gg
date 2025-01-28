import {
  cn,
  Tabs as TabsPrimitive,
  TabsList as TabsListPrimitive,
  TabsTrigger as TabsTriggerPrimitive,
  TabsContent as TabsContentPrimitive,
} from "@lemonade-stand/ui";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

export function Tabs({ className, ...props }: ComponentPropsWithRef<typeof TabsPrimitive>) {
  return <TabsPrimitive className={cn("my-7", className)} {...props} />;
}

export function TabsList({ className, ...props }: ComponentPropsWithRef<typeof TabsListPrimitive>) {
  return <TabsListPrimitive className={className} {...props} />;
}

interface TriggerProps extends ComponentPropsWithRef<typeof TabsTriggerPrimitive> {
  prefix?: string;
}

export function TabsTrigger({ className, children, prefix, ...props }: TriggerProps) {
  return (
    <TabsTriggerPrimitive className={className} {...props}>
      {prefix && <span className="hidden md:block mr-1">{prefix}</span>}
      {children}
    </TabsTriggerPrimitive>
  );
}

const ContentStyles = cva("", {
  variants: {
    variant: {
      block: "prose bg-muted rounded-lg p-5 my-3",
      ghost: "",
    },
  },
  defaultVariants: {
    variant: "block",
  },
});

interface ContentProps
  extends ComponentPropsWithRef<typeof TabsContentPrimitive>,
    VariantProps<typeof ContentStyles> {}

export function TabsContent({ className, children, variant, ...props }: ContentProps) {
  return (
    <TabsContentPrimitive className={ContentStyles({ variant, className })} {...props}>
      {children}
    </TabsContentPrimitive>
  );
}
