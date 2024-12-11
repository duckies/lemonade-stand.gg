import { type VariantProps, cva } from "class-variance-authority";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type LinkProps = ComponentPropsWithoutRef<"a"> &
  NextLinkProps &
  VariantProps<typeof linkStyle> & {};

export const linkStyle = cva("", {
  variants: {
    variant: {
      plain: "",
      default:
        "inline-block after:ease relative whitespace-nowrap text-yellow-400 no-underline after:absolute after:bottom-[2px] after:left-0 after:h-[1px] after:w-0 after:rounded-full after:bg-yellow after:transition-[width] after:duration-250 hover:text-yellow hover:after:w-full hover:after:ease-out",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Link({ href, variant, className, children, ...props }: LinkProps) {
  const isInternal = href.startsWith("/");
  const styles = linkStyle({ variant, className });

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
