import HeroBackground from "#public/images/hero/nerubar-palace.jpg";
import { Hero } from "components/hero";
import { GuideMDXComponents } from "components/markdown";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { ImageZoom } from "~/components/markdown/image-zoom";
import { ContentMetadata } from "~/components/markdown/metadata";
import { TableOfContents } from "~/components/markdown/table-of-contents";
import { Wowhead } from "~/components/wowhead/script";
import { getRoutes } from "~/lib/collections/content";
import { router } from "~/lib/collections/router";
import type { PageProps } from "~/types";

export async function generateStaticParams() {
  const allRoutes = await getRoutes();
  const guideRoutes = [...allRoutes].filter(([route]) => route.startsWith("guides/"));

  return guideRoutes.map(([route]) => ({ slugs: route.split("/").slice(1) }));
}

export default async function GuidePage({ params }: PageProps<{ slugs: string[] }>) {
  const slugs = (await params).slugs;
  const { Content, metadata, toc, ...rest } = await router.findOne("guides", ...slugs);

  return (
    <>
      <Hero.Root>
        <Hero.Background src={metadata.hero?.image || HeroBackground} />
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
            <Content components={{ ...GuideMDXComponents }} {...metadata} {...rest} />
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
