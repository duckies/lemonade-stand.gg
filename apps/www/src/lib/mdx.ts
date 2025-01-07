import { type EvaluateOptions, evaluate } from "@mdx-js/mdx";
import type { MDXContent } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import type { Compatible } from "to-vfile";

export interface Frontmatter {
  title: string;
  description: string;
  publishedAt?: string;
}

export interface RaidGuideFrontmatter extends Frontmatter {
  title: string;
  description: string;
  fight: {
    name: string;
    slug: string;
    icon: string;
  };
}

export async function getContent<F extends Frontmatter>(
  source: Compatible,
  options: Partial<EvaluateOptions> = {},
): Promise<{
  MDXContent: MDXContent;
  frontmatter: F;
  [key: string]: unknown;
}> {
  const {
    default: MDXContent,
    frontmatter,
    ...rest
  } = await evaluate(source, {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
    development: process.env.NODE_ENV === "development",
    ...runtime,
    ...options,
  });

  return {
    MDXContent,
    frontmatter: frontmatter as F,
    ...rest,
  };
}
