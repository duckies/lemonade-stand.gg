import { fstat } from "node:fs";
import { constants, access } from "node:fs/promises";
import path from "node:path";
import { compile, evaluate, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import { read } from "to-vfile";
import * as v from "valibot";
import { VFile } from "vfile";
import { matter } from "vfile-matter";
import { env } from "~/env";

export type Frontmatter = {
  title: string;
  description: string;
  published: Date;
};

const frontmatterSchema = v.object({
  title: v.string("Frontmatter title is required."),
  description: v.string("Frontmatter description is required."),
  published: v.pipe(
    v.string(),
    v.transform((v) => new Date(v)),
    v.date(),
  ),
});

export async function getContentByRoute(route: string[]) {
  // TODO: Do I check file exists first?
  // Can vfile do this somehow?
  // access(filePath, constants.F_OK);

  const filePath = path.join(process.cwd(), "content", `${route.join("/")}.mdx`);
  const file = await read(filePath);

  console.log(file);
  matter(file, { strip: true });

  // TODO: More helpful error message, e.g. which file?
  // const frontmatter = v.parse(frontmatterSchema, vfile.data.matter);

  const { default: MDXContent, ...rest } = await evaluate(file, {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
    development: env.NODE_ENV === "development",
    ...runtime,
  });

  console.log(rest);

  return {
    MDXContent,
    // frontmatter: frontmatter,
  };
}
