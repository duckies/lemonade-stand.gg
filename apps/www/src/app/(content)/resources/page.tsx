import HeroBackground from "#public/images/hero/darkshore_road.jpg";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@lemonade-stand/ui";
import { Hero } from "components/hero";
import Link from "next/link";
import { ContentPublishedDate } from "~/components/markdown/metadata";
import { router } from "~/lib/collections/router";

export default async function ResourcesPage() {
  const resources = await router.findAll("resources");

  return (
    <>
      <Hero.Root className="-mb-24 [--hero-from-opacity:0%]">
        <Hero.Background className="object-center" src={HeroBackground} />
        <Hero.Content>
          <Hero.Title>Resources</Hero.Title>
          <Hero.Description>Bits and bobs for the boys</Hero.Description>
        </Hero.Content>
      </Hero.Root>

      <main className="container z-10">
        <div className="grid md:grid-cols-2">
          {resources.map((resource) => (
            <Link key={resource.url} href={resource.url}>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-semibold text-xl tracking-wide">
                    {resource.content.metadata.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{resource.content.metadata.description}</CardContent>
                <CardFooter className="text-muted-foreground text-sm">
                  <ContentPublishedDate published={resource.content.metadata.published} />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
