import { Button, buttonVariants, cn } from "@lemonade-stand/ui";
import { instances } from "config";
import Image from "next/image";
import Link from "next/link";
import { router } from "~/lib/collections/router";
type Props = {
  className?: string;
};

export async function BossGrid({ className }: Props) {
  const instance = instances.find((i) => i.slug === "liberation-of-undermine")!;
  const guides = await router.findAll("guides", instance.slug);

  // Make the above simpler, or more readable.
  const bosses = instance.encounters.map((encounter) => {
    return {
      name: encounter.name,
      slug: encounter.slug,
      image: `https://cdn.lemonade-stand.gg/icons/${encounter.icon}.jpg`,
      difficulties: ["Heroic", "Mythic"].map((difficulty) => {
        const slug = difficulty.toLowerCase();
        const url = `/guides/${instance.slug}/${encounter.slug}/${slug}`;

        return {
          name: difficulty,
          slug,
          url,
          guide: guides.find((g) => g.url === url),
        };
      }),
    };
  });

  return (
    <div className={cn("grid md:grid-cols-2 gap-4 not-prose", className)}>
      {bosses.map((boss) => {
        return (
          <div
            key={boss.slug}
            className="rounded-lg bg-card border border-border px-2 py-1 flex justify-between"
          >
            <div className="flex items-center gap-3">
              <Image
                className="rounded-md border-2 border-border"
                src={boss.image}
                alt={boss.name}
                width="50"
                height="50"
                unoptimized
              />
              <div className="font-semibold font-serif tracking-wider mr-3 text-balance leading-1 md:leading-5.5">
                {boss.name}
              </div>
            </div>
            <div className="flex gap-2 items-center leading-6">
              {boss.difficulties.map((difficulty) => {
                const buttonClass = cn(buttonVariants(), "h-7 px-2 py-0.5");
                if (difficulty.guide) {
                  return (
                    <Link className={buttonClass} key={difficulty.slug} href={difficulty.url}>
                      {difficulty.name}
                    </Link>
                  );
                }

                return (
                  <Button
                    className={cn(buttonClass, "bg-primary/30")}
                    disabled
                    key={difficulty.slug}
                  >
                    {difficulty.name}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
