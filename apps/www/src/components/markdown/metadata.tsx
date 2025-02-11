import { Avatar } from "@lemonade-stand/ui";
import Image from "next/image";
import { type ReactNode, useMemo } from "react";
import type { RouteMetadata } from "~/lib/collections/schemas";

export function ContentPublishedDate({
  published,
  fallback = "Draft",
}: { published?: Date; fallback?: string }) {
  const publishedStr = useMemo(
    () =>
      published?.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    [published],
  );

  if (!publishedStr) {
    return fallback;
  }

  return publishedStr;
}

export function ContentMetadata({
  children,
  metadata,
}: { className?: string; children?: ReactNode; metadata: RouteMetadata }) {
  if (!metadata.author) {
    return (
      <div className="flex items-center text-sm gap-1">
        <span className="text-muted-foreground">
          <ContentPublishedDate published={metadata.published} />
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-sm gap-1">
      <Avatar className="inline size-5">
        <Image src={metadata.author.avatar} alt={metadata.author.name} />
      </Avatar>
      <span className="text-muted-foreground">
        {metadata.author.name} • <ContentPublishedDate published={metadata.published} />
      </span>
      {children}
    </div>
  );
}
