import { readdir } from "node:fs/promises";
import { Hero } from "components/hero";
import { DefaultMDXComponents } from "components/markdown";
import { notFound } from "next/navigation";
import HeroBackground from "public/images/hero/nerubar-palace.jpg";

interface GuidePageParams {
  params: Promise<{
    slugs: string[];
  }>;
}

export async function getContentIndex(slugs: string[]) {
  const folderPath = `content/guides/${slugs.join("/")}`;

  try {
    const files = await readdir(folderPath, { withFileTypes: true });

    const promises: Promise<unknown>[] = [];

    for (const file of files) {
      if (file.isFile() && file.name.endsWith(".mdx")) {
        promises.push(
          import(`#${folderPath}/${file.name}`).then(({ frontmatter }) => ({
            slug: file.name.replace(".mdx", ""),
            ...frontmatter,
          })),
        );
      }
    }
    return Promise.all(promises);
  } catch (error: any) {
    if (error?.code !== "ENOENT") {
      console.log(error);
    }
  }

  return null;
}

export async function getContentByPath(slugs: string[]) {
  const path = `content/guides/${slugs.join("/")}`;

  const index = await getContentIndex(slugs);

  try {
    const { default: MDXContent, frontmatter } = await import(`#${path}.mdx`);
    return { MDXContent, frontmatter };
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "MODULE_NOT_FOUND") {
      // Don't swallow errors unrelated to not finding the file.
      notFound();
    }

    throw error;
  }
}

export default async function GuidePage({ params }: GuidePageParams) {
  const { slugs } = await params;
  const { MDXContent, frontmatter } = await getContentByPath(slugs);

  if (frontmatter.type && frontmatter.type === "raid") {
    const folderPath = `content/guides/${slugs.join("/")}`;
  }

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
