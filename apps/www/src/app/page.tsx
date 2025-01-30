import { Card, CardDescription, CardHeader, CardTitle } from "@lemonade-stand/ui";
import { DiscordCard } from "components/DiscordCard";
import { ProgressCard } from "components/ProgressCard";
import { Hero } from "components/hero";
import type { Metadata } from "next";
import HeroBackground from "public/images/hero/nerubar-palace.jpg";

export const metadata: Metadata = {
  title: {
    absolute: "Lemonade Stand",
  },
};

export default async function HomePage() {
  return (
    <>
      <Hero.Root>
        <Hero.Background src={HeroBackground} />
        <Hero.Content variant="centered" className="transition-all">
          <Hero.Title className="text-7xl lg:text-8xl transition-[font-size]">
            Lemonade Stand
          </Hero.Title>
          <Hero.Description className="text-lg lg:text-xl">
            The <span className="line-through">grape</span> lemon-peddling World of Warcraft
            community and raiding guild on Illidan.
          </Hero.Description>
        </Hero.Content>
      </Hero.Root>

      <div className="flex flex-col justify-center container py-10 -mt-20 z-10">
        <div className="grid grid-cols-12 gap-4">
          <h2 className="font-serif text-xl mb-4 col-span-12">Latest Posts</h2>
          <div className="col-span-8">
            <div>
              <Card className="">
                <CardHeader>
                  <CardTitle className="font-semibold font-serif text-xl tracking-wide">
                    Optimizing For Performance
                  </CardTitle>
                  <CardDescription>Tips for optimizing FPS in raids.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-4">
            <ProgressCard />
            <DiscordCard />
          </div>
        </div>
      </div>
    </>
  );
}
