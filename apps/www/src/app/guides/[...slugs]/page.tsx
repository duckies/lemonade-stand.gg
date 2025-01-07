import { Hero } from "components/hero";
import { DefaultMDXComponents } from "components/markdown";
import HeroBackground from "public/images/hero/nerubar-palace.jpg";

interface GuidePageParams {
  params: Promise<{
    slugs: string[];
  }>;
}

export function generateStaticParams() {
  return [
    {
      slugs: ["nerubar-palace"],
    },
    {
      slugs: ["nerubar-palace", "queen-ansurek"],
    },
    {
      slugs: ["nerubar-palace", "web-blades-sounds"],
    },
  ];
}

export default async function GuidePage({ params }: GuidePageParams) {
  const { slugs } = await params;
  // I don't know why this broke.
  // const { /MDXContent, frontmatter } = await getMDXByPath(["guides", ...slugs]);
  const { default: MDXContent, frontmatter } = await import(`#content/guides/${slugs.join("/")}.mdx`)

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
