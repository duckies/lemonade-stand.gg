import DefaultHeroBackground from "#public/images/hero/darkshore_turtle_skeleton.jpg";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Hero } from "~/components/hero";
import { ImageZoom } from "~/components/markdown/image-zoom";
import { ContentMetadata } from "~/components/markdown/metadata";
import { TableOfContents } from "~/components/markdown/table-of-contents";
import { Wowhead } from "~/components/wowhead";
import { router } from "~/lib/collections/router";
import type { PageProps } from "~/types";

export async function generateStaticParams() {
  const blogPosts = await router.findAll("blog");

  return blogPosts.map(({ url }) => {
    return { slugs: url.split("/").slice(1) };
  });
}

export default async function BlogPostPage({ params }: PageProps<{ slugs: string[] }>) {
  const slugs = (await params).slugs;
  const { Content, metadata, toc, ...rest } = await router.findOne("blog", ...slugs);

  return (
    <>
      <Hero.Root>
        <Hero.Background
          src={metadata.hero?.image || DefaultHeroBackground}
          className="object-top"
        />
        <Hero.Content>
          <ContentMetadata metadata={metadata} />

          <Hero.Title className="mt-6">{metadata.title}</Hero.Title>
          <Hero.Description className="mt-1">{metadata.description}</Hero.Description>

          {metadata.breadcrumbs && (
            <Breadcrumbs className="mt-6" breadcrumbs={metadata.breadcrumbs} />
          )}
        </Hero.Content>
      </Hero.Root>

      <Wowhead />
      <ImageZoom />

      <div className="container -mt-10">
        <section className="relative prose-layout">
          <article className="prose dark:prose-invert relative slide-enter-content">
            <Content {...metadata} {...rest} />
          </article>
          {toc && toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <h3 className="text-2xl font-semibold font-serif tracking-wide mb-5">
                  Table of Contents
                </h3>
                <TableOfContents toc={toc} />
              </div>
            </aside>
          )}
        </section>
      </div>
    </>
  );
}
