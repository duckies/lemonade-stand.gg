import { cn } from "@lemonade-stand/ui";
import Image from "next/image";
import Link from "next/link";
import { ContentPublishedDate } from "~/components/markdown/metadata";
import type { RouteMetadata } from "~/lib/collections/schemas";

export type BlogPostProps = {
  metadata: RouteMetadata;
  href: string;
  className?: string;
};

export function BlogPost({ metadata, href, className }: BlogPostProps) {
  return (
    <Link
      href={href}
      className={cn(
        className,
        "group relative block overflow-hidden border border-border bg-card shadow-sm rounded-xl",
      )}
    >
      <div>
        {metadata.hero?.image && (
          <Image
            className="absolute inset-0 object-cover object-center grow-slide opacity-30 group:hover:opacity-100"
            src={metadata.hero?.image}
            alt=""
            fill
          />
        )}
        <div className="absolute inset-0 bg-linear-to-tr from-card to-card/50 transition-opacity ease-in-out-circ group-hover:opacity-90 duration-500" />
      </div>
      <div className="relative p-6 flex flex-col justify-around h-full space-y-4">
        <h3 className="space-y-1.5 font-semibold font-serif text-2xl tracking-wider">
          {metadata.title}
        </h3>
        <p className="text-foreground/80">{metadata.description}</p>
        <span className="text-muted-foreground">
          <ContentPublishedDate published={metadata.published} />
        </span>
      </div>
    </Link>
  );
}
