import type { Frontmatter } from "~/lib/mdx";

declare module "vfile" {
  interface DataMap {
    matter: Frontmatter;
  }
}
