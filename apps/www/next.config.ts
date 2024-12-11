import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkTOC from "remark-toc";

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["@lemonade-stand/ui", "react-hook-form"],
} satisfies NextConfig;

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkGfm,
      remarkTOC,
    ],
    rehypePlugins: [rehypeSlug],
  },
});

export default withMDX(nextConfig);
