"use client";

import { cn } from "@lemonade-stand/ui";
import { ChevronDownIcon } from "lucide-react";
import { Collapsible } from "radix-ui";

type DisclosureProps = {
  children: React.ReactNode;
}

export function Disclosure(props: DisclosureProps) {
  return (
    <Collapsible.Root {...props} />
  )
}

export function DisclosureHeader({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <Collapsible.Trigger className={cn("flex flex-row gap-2", className)}>
      {children}
      <div className={cn("flex items-center mr-2")}>
        <ChevronDownIcon className="h-7 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </div>
    </Collapsible.Trigger>
  )
}

export function DisclosureContent({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <Collapsible.Content className={cn("rounded-xl p-4", className)}>
      {children}
    </Collapsible.Content>
  )
}