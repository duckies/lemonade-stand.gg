import { cn } from "@lemonade-stand/ui";
import type { MDXComponents } from "mdx/types";
import type { HTMLAttributes } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className={cn("mt-8 scroll-m-20 text-2xl font-semibold tracking-tight", className)}
        {...props}
      />
    ),
    ...components,
  };
}
