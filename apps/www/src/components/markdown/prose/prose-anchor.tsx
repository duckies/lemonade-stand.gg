import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type ProseAnchorProps = ComponentPropsWithoutRef<"a">;

export function ProseAnchor({ href, ...props }: ProseAnchorProps) {
  if (href?.startsWith("/")) {
    return <Link href={href} {...props} />;
  }

  if (href?.startsWith("#")) {
    return <a href={href} {...props} />;
  }

  // TODO: Figure out a way to disable icons on the fly, and use
  // regex to scan for specific urls, e.g. icon, spell.
  const isTooltip = href?.startsWith("https://www.wowhead.com");

  return (
    <a
      href={href}
      rel="noreferrer noopener"
      target="_blank"
      {...props}
      {...(isTooltip && { "data-wh-icon-size": "small" })}
    />
  );
}
