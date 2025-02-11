import * as v from "valibot";
import { authors, authorSlugs } from "~/config";

export const Metadata = v.object({
  title: v.string(),
  description: v.string(),
  published: v.optional(
    v.pipe(
      v.string(),
      v.transform((s) => new Date(s)),
      v.date(),
    ),
  ),
  author: v.pipe(
    v.picklist(authorSlugs),
    v.transform((a) => authors[a]),
  ),
  hero: v.optional(
    v.object({
      background: v.optional(v.string()),
    }),
  ),
});

export type Metadata = v.InferOutput<typeof Metadata>;

const RouteBreadcrumbItemSchema = v.object({
  label: v.string(),
  url: v.optional(v.string()),
  dropdown: v.optional(
    v.array(v.object({ label: v.string(), url: v.string() })),
  ),
});

const RouteBreadcrumbSchema = v.array(RouteBreadcrumbItemSchema);

export type RouteBreadcrumbSchema = v.InferOutput<typeof RouteBreadcrumbSchema>;

export const RouteMetadataSchema = v.object({
  title: v.string(),
  description: v.string(),
  breadcrumbs: v.optional(RouteBreadcrumbSchema),
  published: v.optional(
    v.pipe(v.string(), v.transform((s) => new Date()), v.date()),
  ),
  author: v.optional(
    v.pipe(v.picklist(authorSlugs), v.transform((a) => authors[a])),
  ),
  hero: v.optional(v.object({
    image: v.optional(v.string()),
  })),
});

export type RouteMetadata = v.InferOutput<typeof RouteMetadataSchema>;
