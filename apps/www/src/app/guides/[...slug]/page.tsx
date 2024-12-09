import { notFound } from "next/navigation";
import { Hero } from "~/components/hero";
import { DefaultMDXComponents } from "~/components/markdown";

export default async function GuidePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  try {
    const { default: MDXContent, frontmatter } = await import(
      `#content/guides/${slug.join("/")}.mdx`
    );

    return (
      <>
        <Hero
          title={frontmatter.title ?? "Untitled Guide"}
          subtitle={frontmatter.description ?? ""}
        />
        <section className="relative">
          {/* <div> */}
          {/* <p>Published: {frontmatter.published.toString()}</p> */}
          {/* </div> */}
          <article className="prose dark:prose-invert relative slide-enter-content">
            {/* <Image src={imagey} alt="christ" /> */}
            <MDXContent components={{ ...DefaultMDXComponents }} {...frontmatter} />
          </article>
        </section>
      </>
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith("Cannot find module")) {
        notFound();
      }
    }

    throw error;
  }
}
