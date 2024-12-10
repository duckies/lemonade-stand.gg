import { cn } from "@lemonade-stand/ui";
import { Link, type LinkProps } from "components/Link";
import * as ClassColors from "components/markdown/class-colors";
import * as Markers from "components/markdown/markers";
import { Component } from "lucide-react";
import type { ImageProps } from "next/image";
import Image from "next/image";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { Mechanic } from "./markdown/mechanic";
import { Video } from "./markdown/video";

declare global {
  type MDXProvidedComponents = typeof DefaultMDXComponents;
}

export const DefaultMDXComponents = {
  ...ClassColors,
  ...Markers,
  Mechanic,
  Video,
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn("font-mono text-sm bg-card rounded py-[0.2rem] px-[0.3rem]", className)}
      {...props}
    />
  ),
  h2: ({ id, children, ...props }: ComponentPropsWithoutRef<"h2">) => {
    return (
      <h2 id={id} {...props} className="scroll-mt-10">
        {id && (
          <a href={`#${id}`} className="header-anchor">
            #<span className="sr-only">Link to this heading</span>
          </a>
        )}
        {children}
      </h2>
    );
  },
  // h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 {...props} />,
  // h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
  //   <h2
  //     className={cn(
  //       "mt-12 scroll-m-20 text-3xl font-semibold tracking-wide first:mt-0 font-serif",
  //       className,
  //     )}
  //     {...props}
  //   />
  // ),
  // h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
  //   <h3
  //     className={cn("mt-8 scroll-m-20 text-2xl font-semibold font-serif tracking-wide", className)}
  //     {...props}
  //   />
  // ),
  // h4: ({ className, ...props }: ComponentPropsWithoutRef<"h4">) => (
  //   <h4
  //     className={cn("mt-8 scroll-m-20 text-xl font-semibold font-serif tracking-wide", className)}
  //     {...props}
  //   />
  // ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  ),
  // ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  //   <ul className={cn("my-6 ml-10 list-disc marker:text-yellow-300", className)} {...props} />
  // ),
  // ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
  //   <ol className={cn("my-6 ml-10 list-decimal marker:text-yellow-300", className)} {...props} />
  // ),
  // li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  //   <li className={cn("mt-3", className)} {...props} />
  // ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-gray-400 pl-6 italic text-gray-400 [&>*]:text-gray-400",
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 w-full overflow-y-auto text-sm">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => (
    <tr className={cn("m-0 p-0 even:bg-popover/45", className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={cn(
        "px-1 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={cn(
        "px-1 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  Image: ({ className, ...props }: ImageProps) => (
    <Image
      className={cn("select-none rounded-lg shadow-xl [&:not(:first-child)]:my-6", className)}
      {...props}
    />
  ),
  a: ({ href, className, ...props }: LinkProps) => (
    <Link
      className={cn("text-yellow-400 hover:text-yellow-500", className)}
      data-wh-icon-size="small"
      href={href}
      {...props}
    />
  ),
};
