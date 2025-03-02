import { cn } from "@lemonade-stand/ui";
import * as Collapsible from "@radix-ui/react-collapsible";
import { LucideChevronDown } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface BossMechanicProps {
  children: ReactNode;
}

export function BossMechanic({ children, ...props }: BossMechanicProps) {
  return (
    <Collapsible.Root className="group flex flex-col my-4 rounded-lg bg-muted shadow-lg" {...props}>
      {children}
    </Collapsible.Root>
  )
}

type BossMechanicTriggerProps = ComponentPropsWithoutRef<typeof Collapsible.Trigger>;

export function BossMechanicTrigger({ children, ...props }: BossMechanicTriggerProps) {
  return (
    <Collapsible.Trigger className="not-prose flex gap-4 rounded-md p-4 hover:cursor-pointer" {...props}>
      {children}
      <div className="flex items-center ml-auto">
        <LucideChevronDown
          className="size-5 transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </div>
    </Collapsible.Trigger>
  )
}

export function BossMechanicHeader({ children, className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col items-start justify-evenly font-medium", className)} {...props}>
      {children}
    </div>
  )
}

export function BossMechanicName({ children, className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("text-xl leading-6 font-medium", className)} {...props}>
      {children}
    </div>
  )
}

export function BossMechanicCaption({ children, className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("text-sm text-primary/90", className)} {...props}>
      {children}
    </div>
  )
}

export function BossMechanicContent({ children, className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <Collapsible.Content className={cn("mt-2 overflow-hidden", className)} {...props}>
      {children}
    </Collapsible.Content>
  )
}

const Root = BossMechanic;
const Trigger = BossMechanicTrigger;
const Header = BossMechanicHeader;
const Name = BossMechanicName;
const Caption = BossMechanicCaption;
const Content = BossMechanicContent;

export { Caption, Content, Header, Name, Root, Trigger };
