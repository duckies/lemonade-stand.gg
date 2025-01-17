import type { NextConfig } from "next";

import createMDX from "@next/mdx";
import createBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["@lemonade-stand/ui"],
} satisfies NextConfig;

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ["remark-frontmatter"],
      ["remark-mdx-frontmatter"],
      ["remark-gfm"],
      ["remark-toc", { maxDepth: 3 }],
    ],
    rehypePlugins: [
      ["rehype-slug"],
      [
        "rehype-shiki",
        {
          themes: { light: "catppuccin-latte", dark: "catppuccin-mocha" },
          useBackground: false,
        },
      ],
      ["rehype-mdx-import-media"],
    ],
    // The string-based resolution for turbopack does not respect @mdx-js/loader's `Options` type.
  } as any,
});

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

export default withBundleAnalyzer(withMDX(nextConfig));
