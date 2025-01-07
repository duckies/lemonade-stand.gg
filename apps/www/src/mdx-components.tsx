import { cn } from "@lemonade-stand/ui";
import type { MDXComponents } from "mdx/types";
import Image, { type StaticImageData } from "next/image";
import { type ComponentPropsWithoutRef, type HTMLAttributes, createElement } from "react";

interface ImageProps extends Omit<ComponentPropsWithoutRef<"img">, "src" | "width" | "height"> {
  src: StaticImageData | string;
}

export const DefaultComponents: MDXComponents = {
  img: ({ src, alt, className, ...props }: ImageProps) => {
    const styles = cn("select-none rounded-lg shadow-xl [&:not(:first-child)]:my-6", className);

    if (typeof src !== "string") {
      return <Image src={src} className={styles} {...props} alt={alt || ""} />
    }

    return <img src={src} className={styles} {...props} />
  }
};

/**
 * This is a required export for global MDX components.
 *
 * @see https://nextjs.org/docs/pages/building-your-application/configuring/mdx#global-styles-and-components
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...DefaultComponents,
    ...components,
  };
}
