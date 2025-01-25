"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";

import type { ComponentPropsWithRef } from "react";
import { cn } from "../../utils/cn";

function Tabs({ className, ref, ...props }: ComponentPropsWithRef<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root ref={ref} className={className} {...props} />;
}

function TabsList({ className, ref, ...props }: ComponentPropsWithRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex h-9 justify-center md:justify-start overflow-x-auto rounded-lg bg-muted p-1 text-muted-foreground hide-scrollbar",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ref,
  ...props
}: ComponentPropsWithRef<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=inactive]:hidden",
        className,
      )}
      forceMount
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
