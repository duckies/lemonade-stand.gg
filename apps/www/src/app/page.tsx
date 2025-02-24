import HeroBackground from "#public/images/hero/nerubar-palace.jpg";
import { DiscordCard } from "components/DiscordCard";
import { ProgressCard } from "components/ProgressCard";
import { Hero } from "components/hero";
import type { Metadata } from "next";
import { BlogPost } from "~/components/blog-post";
import { router } from "~/lib/collections/router";

export const metadata: Metadata = {
  title: {
    absolute: "Lemonade Stand",
  },
};


export default async function HomePage() {
  const posts = await router.findAll("blog");

  return (
    <>
      <Hero.Root>
        <Hero.Background src={HeroBackground} />
        <Hero.Content variant="centered">
          <Hero.Title variant="larger">Lemonade Stand</Hero.Title>
          <Hero.Description className="text-lg lg:text-xl">
            The <span className="line-through">grape</span> lemon-peddling World of Warcraft
            community and raiding guild on Illidan.
          </Hero.Description>
        </Hero.Content>
      </Hero.Root>

      <div className="flex flex-col justify-center container py-10 -mt-20 z-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 flex flex-col gap-4">
            {posts.map((post) => (
              <BlogPost key={post.url} href={post.url} metadata={post.content.metadata} />
            ))}
          </div>
          <div className="col-span-4 grid gap-4">
            <ProgressCard />
            <DiscordCard />
          </div>
        </div>
      </div>
    </>
  );
}
