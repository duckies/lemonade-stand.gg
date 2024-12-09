import { type EvaluateOptions, evaluate } from "@mdx-js/mdx";
import type { MDXContent } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import type { Compatible } from "to-vfile";

export async function getMarkdown<F extends Record<string, unknown>>(
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

  console.log(import.meta.url);

  return {
    MDXContent,
    frontmatter: frontmatter as F,
    ...rest,
  };
}
