import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkTOC from "remark-toc";

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["@lemonade-stand/ui", "react-hook-form"],
};

/** @type {import("rehype-pretty-code").Options} */
const rehypePrettyCodeOptions = {
  theme: {
    light: "catppuccin-latte",
    dark: "catppuccin-mocha"
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkGfm,
      [remarkTOC, { maxDepth: 3 }]
    ],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypePrettyCodeOptions]],
  },
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

export default withBundleAnalyzer(withMDX(nextConfig)); 
