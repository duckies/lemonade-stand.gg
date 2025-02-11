import HeroBackground from "#public/images/hero/drustvar_drust.jpg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@lemonade-stand/ui";
import { Hero } from "components/hero";
import { ContentMetadata } from "components/markdown/metadata";
import Link from "next/link";
import type { PageProps } from "types";
import { TableOfContents } from "~/components/markdown/table-of-contents";
import { router } from "~/lib/collections/router";

export default async function ResourcesPage({ params }: PageProps<{ slug: string }>) {
  const slug = (await params).slug;
  const { Content, metadata, toc, ...rest } = await router.findOne("resources", slug);

  return (
    <>
      <Hero.Root className="[--hero-from-opacity:0%]">
        <Hero.Background className="object-center" src={metadata.hero?.image || HeroBackground} />
        <Hero.Content>
          <ContentMetadata metadata={metadata} />

          <Hero.Title className="mt-6">{metadata.title}</Hero.Title>
          <Hero.Description className="mt-1">{metadata.description}</Hero.Description>

          <Breadcrumb className="mt-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/resources">Resources</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{metadata.title}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </Hero.Content>
      </Hero.Root>

      <div className="container -my-10">
        <section className="lg:blog-layout">
          <article className="prose dark:prose-invert relative slide-enter-content">
            <Content metadata={metadata} {...rest} />
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <h3 className="text-2xl font-semibold font-serif tracking-wide mb-5">
                Table of Contents
              </h3>
              <TableOfContents toc={toc} />
            </div>
          </aside>
        </section>
      </div>
    </>
  );
}
