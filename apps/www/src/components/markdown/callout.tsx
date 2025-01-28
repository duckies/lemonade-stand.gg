import { cva } from "class-variance-authority";
import { CircleAlertIcon, InfoIcon, SirenIcon } from "lucide-react";
import type { ReactNode } from "react";

type CalloutProps = {
  type: "info" | "warning" | "error";
  className?: string;
  children: ReactNode;
};

export const calloutStyles = cva("my-6 p-4 flex flex-row rounded-lg border-l-4 gap-4", {
  variants: {
    type: {
      info: "bg-cyan-500/10 border-cyan-500 text-cyan-200 [&_a]:text-cyan-400 [&_a:hover]:text-cyan-300 [&_a::after]:bg-cyan-300 [&_ol_li::before]:text-cyan-300",
      warning:
        "bg-amber-500/10 border-amber-500 text-amber-200 *-has[a]:text-amber-200 [&_a]:text-amber-400 [&_a:hover]:text-amber-300 [&_a::after]:bg-amber-300 [&_ol_li::before]:text-amber-300",
      error:
        "bg-rose-500/10 border-rose-500 text-rose-200 [&_a]:text-rose-400 [&_a:hover]:text-rose-300 [&_a::after]:bg-rose-300 [&_ol_li::before]:text-rose-300",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

const CalloutIcons: Record<CalloutProps["type"], any> = {
  info: InfoIcon,
  warning: CircleAlertIcon,
  error: SirenIcon,
};

export function Callout({ type, className, children, ...props }: CalloutProps) {
  const Icon = CalloutIcons[type];
  return (
    <aside className={calloutStyles({ type, className })} {...props}>
      <span>
        <Icon role="img" className="h-5 w-5 mt-2" />
      </span>
      <div className="prose">{children}</div>
    </aside>
  );
}
