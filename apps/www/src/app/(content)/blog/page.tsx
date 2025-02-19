import HeroBackground from "#public/images/hero/darkshore_road.jpg";
import { BlogPost } from "~/components/blog-post";
import { Hero } from "~/components/hero";
import { Section, SectionHeader, SectionTitle } from "~/components/section";
import { router } from "~/lib/collections/router";

export default async function BlogIndexPage() {
  const posts = await router.findAll("blog");

  return (
    <>
      <Hero.Root className="-mb-24">
        <Hero.Background src={HeroBackground} placeholder="blur" className="object-center" />
        <Hero.Content>
          <Hero.Title>Blog</Hero.Title>
          <Hero.Description>Longform announcements for the community.</Hero.Description>
        </Hero.Content>
      </Hero.Root>
      <div className="container z-10">
        <Section className="my-10">
          <SectionHeader>
            <SectionTitle as="h2">Posts</SectionTitle>
          </SectionHeader>

          <div className="grid lg:grid-cols-2 gap-7">
            {posts.map((post) => (
              <BlogPost key={post.url} href={post.url} metadata={post.content.metadata} />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
