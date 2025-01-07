import { Hero } from "components/hero";
import { Section, SectionDescription, SectionHeader, SectionTitle } from "components/section";
import HeroBackground from "public/images/hero/netherstorm_skybox.jpg";
import { ContentCard } from "~/components/content-card";

const Instances = [
  {
    name: "Liberation of Undermine",
    label: "Upcoming Raid",
    href: "/guides/undermine",
    background: "/images/hero/liberation_of_undermine.jpg",
    disabled: true,
  },
  {
    name: "Nerub-ar Palace",
    label: "Current Raid",
    href: "/guides/nerubar-palace",
    background: "/images/hero/nerubar-palace.jpg",
    bosses: [
      {
        name: "Ulgrax the Devourer",
        icon: "inv_achievement_raidnerubian_nerubianhulk",
      },
      {
        name: "The Bloodbound Horror",
        icon: "inv_achievement_raidnerubian_blackblood",
      },
      {
        name: "Sikran, Captain of the Sureki",
        icon: "inv_achievement_raidnerubian_nerubianevolved",
      },
      {
        name: "Rasha'nan",
        icon: "inv_achievement_raidnerubian_flyingnerubianevolved",
      },
      {
        name: "Broodtwister Ovi'nax",
        icon: "inv_achievement_raidnerubian_swarmmother",
      },
      {
        name: "Nexus-Princess Ky'veza",
        icon: "inv_achievement_raidnerubian_etherealassasin",
      },
      {
        name: "The Silken Court",
        icon: "inv_achievement_raidnerubian_council",
      },
      {
        name: "Queen Ansurek",
        icon: "inv_achievement_raidnerubian_queenansurek",
      },
    ],
  },
];

export default function GuidesIndexPage() {
  return (
    <>
      <Hero.Root className="-mb-24">
        <Hero.Background src={HeroBackground} placeholder="blur" className="object-center" />

        <Hero.Content>
          <Hero.Title>Guides</Hero.Title>
          <Hero.Description>Learn how to play the game.</Hero.Description>
        </Hero.Content>
      </Hero.Root>

      <div className="container z-10">
        <Section className="my-10">
          <SectionHeader>
            <SectionTitle as="h2">Raid Notes</SectionTitle>

            <SectionDescription>
              A collection of preparation materials, resources, and in-depth coverage of boss fight
              mechanics.
            </SectionDescription>
          </SectionHeader>

          <div className="grid lg:grid-cols-2 gap-7">
            {Instances.map((instance) => (
              <ContentCard
                key={instance.href}
                title={instance.name}
                label={instance.label}
                background={instance.background}
                disabled={instance.disabled}
                href={instance.href}
              />
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle as="h2">Tips & Tutorials</SectionTitle>
            <SectionDescription>Supplementary resources for all things Warcraft.</SectionDescription>
          </SectionHeader>

          <div className="grid gap-7 select-none">
            <div className="relative flex bg-yellow-300/20 px-7 py-10 rounded-2xl shadow-md min-h-[225px] justify-center items-center">
              <p className="text-4xl font-serif font-semibold italic text-muted-foreground">No posts, ... yet.</p>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
