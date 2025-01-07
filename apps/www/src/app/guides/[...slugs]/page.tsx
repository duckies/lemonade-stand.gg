import { Hero } from "components/hero";
import { DefaultMDXComponents } from "components/markdown";
import { readdir } from "fs/promises";
import { getMDXByPath } from "lib/mdx";
import { join } from "path";
import HeroBackground from "public/images/hero/nerubar-palace.jpg";

interface GuidePageParams {
  params: Promise<{
    slugs: string[];
  }>;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  const rootPath = join(process.cwd(), "content", "guides");
  const slugs: string[][] = [];

  const rootDirents = await readdir(rootPath, { withFileTypes: true });

  // This is super lazy, just trying to get it working for now.
  for (const dirent of rootDirents) {
    if (dirent.isFile() && dirent.name.endsWith(".mdx")) {
      slugs.push(["guides", dirent.name.replace(/\.mdx$/, "")]);
    } else if (dirent.isDirectory()) {
      const dirents = await readdir(join(rootPath, dirent.name), { withFileTypes: true });

      for (const childDirent of dirents) {
        if (childDirent.isFile() && childDirent.name.endsWith(".mdx")) {
          slugs.push(["guides", dirent.name, childDirent.name.replace(/\.mdx$/, "")]);
        }
      }
    }
  }

  return slugs;
}

export default async function GuidePage({ params }: GuidePageParams) {
  const { slugs } = await params;
  const { MDXContent, frontmatter } = await getMDXByPath(["guides", ...slugs]);

  return (
    <>
      <Hero.Root>
        <Hero.Background src={HeroBackground} />
        <Hero.Content>
          <Hero.Title>{frontmatter.title}</Hero.Title>
          <Hero.Description>{frontmatter.description}</Hero.Description>
        </Hero.Content>
      </Hero.Root>

      <div className="container -my-10">
        <section className="relative">
          {/* <div> */}
          {/* <p>Published: {frontmatter.published.toString()}</p> */}
          {/* </div> */}
          <article className="prose dark:prose-invert relative slide-enter-content">
            {/* <Image src={imagey} alt="christ" /> */}
            <MDXContent components={{ ...DefaultMDXComponents }} {...frontmatter} />
          </article>
        </section>
      </div>
    </>
  );
}
