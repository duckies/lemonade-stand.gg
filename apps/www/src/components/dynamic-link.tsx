import { type VariantProps, cva } from "class-variance-authority";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type DynamicLinkProps = ComponentPropsWithoutRef<"a"> &
  NextLinkProps &
  VariantProps<typeof dynamicLinkStyle> & {};

export const dynamicLinkStyle = cva("", {
  variants: {
    variant: {
      plain: "",
      default: "",
      // "inline-block after:ease relative whitespace-nowrap text-primary no-underline after:absolute after:bottom-[2px] after:left-0 after:h-[1px] after:w-0 after:rounded-full after:bg-primary after:transition-[width] after:duration-250 hover:after:w-full hover:after:ease-out",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function DynamicLink({ href, variant, className, children, ...props }: DynamicLinkProps) {
  const isInternal = href.startsWith("/");
  const styles = dynamicLinkStyle({ variant, className });

  if (isInternal) {
    return (
      <NextLink href={href} className={styles} {...props}>
        {children}
      </NextLink>
    );
  }

  const isAnchor = href.startsWith("#");

  if (isAnchor) {
    return (
      <a href={href} className={styles} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} rel="noreferrer noopener" target="_blank" className={styles} {...props}>
      {children}
    </a>
  );
}
