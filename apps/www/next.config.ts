import type { NextConfig } from "next";

import createBundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["@lemonade-stand/ui", "@lemonade-stand/markdown"],
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
      [
        "@lemonade-stand/markdown/rehype-slug",
        {
          ignoreParents: ["TabsContent", "Mechanic"],
        },
      ],
      ["@lemonade-stand/markdown/rehype-toc"],
      [
        "rehype-shiki",
        {
          themes: { light: "catppuccin-latte", dark: "catppuccin-mocha" },
          useBackground: false,
        },
      ],
      ["rehype-mdx-import-media", { resolve: false }],
    ],
    // The string-based resolution for turbopack does not respect @mdx-js/loader's `Options` type.
  } as any,
});

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

export default withBundleAnalyzer(withMDX(nextConfig));
