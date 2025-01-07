import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["@lemonade-stand/ui", "react-hook-form"],
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
      ["rehype-shiki", {
        themes: { light: "catppuccin-latte", dark: "catppuccin-mocha" },
        useBackground: false,
      }],
      ["rehype-mdx-import-media"],
    ],
    // The string-based resolution for turbopack does not respect @mdx-js/loader's `Options` type.
  } as any,
});

// export default withBundleAnalyzer(withMDX(nextConfig));

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// })

export default withMDX(nextConfig);
