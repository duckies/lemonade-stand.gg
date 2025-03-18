import type { NextConfig } from "next";

import createBundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import { env } from "./src/env";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["@lemonade-stand/ui", "@lemonade-stand/markdown"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${env.API_BASE_URL}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
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
