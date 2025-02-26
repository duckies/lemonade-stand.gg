import DuckyAvatar from "#public/images/avatars/ducky.png";

const metadata = {
  title: {
    default: "Lemonade Stand",
    template: "%s | Lemonade Stand",
  },
  description: "The lemon-scented World of Warcraft raiding community.",
};

export const Expansions = [
  {
    id: 514,
    name: "The War Within",
    slug: "the-war-within",
  },
];

export interface Encounter {
  name: string;
  slug: string;
  icon: string;
}

export interface Instance {
  name: string;
  slug: string;
  encounters: Encounter[];
}

export const instances = [
  {
    name: "Liberation of Undermine",
    slug: "liberation-of-undermine",
    encounters: [
      {
        name: "Vexie and the Geargrinders",
        slug: "vexie-and-the-geargrinders",
        icon: "inv_111_raid_achievement_vexieandthegeargrinders",
      },
      {
        name: "Cauldron of Carnage",
        slug: "cauldron-of-carnage",
        icon: "inv_11_arenaboss_colossalclash",
      },
      {
        name: "Rik Reverb",
        slug: "rik-reverb",
        icon: "inv_111_raid_achievement_rikreverb",
      },
      {
        name: "Stix Bunkjunker",
        slug: "stix-bunkjunker",
        icon: "inv_111_raid_achievement_stixbunkjunker",
      },
      {
        name: "Sprocketmonger Lockenstock",
        slug: "sprocketmonger-lockenstock",
        icon: "inv_111_raid_achievement_sprocketmongerlocknstock",
      },
      {
        name: "The One-Armed Bandit",
        slug: "one-armed-bandit",
        icon: "inv_111_raid_achievement_onearmedbandit",
      },
      {
        name: "Mug'zee, Heads of Security",
        slug: "mugzee-heads-of-security",
        icon: "inv_111_raid_achievement_mugzeeheadsofsecurity",
      },
      {
        name: "Chrome King Gallywix",
        slug: "chrome-king-gallywix",
        icon: "inv_111_raid_achievement_chromekinggallywix",
      },
    ],
  },
  {
    name: "Nerub-ar Palace",
    slug: "nerubar-palace",
    encounters: [
      {
        name: "Ulgrax the Devourer",
        slug: "ulgrax-the-devourer",
        icon: "inv_achievement_raidnerubian_nerubianhulk",
      },
      {
        name: "The Bloodbound Horror",
        slug: "the-bloodbound-horror",
        icon: "inv_achievement_raidnerubian_blackblood",
      },
      {
        name: "Sikran, Captain of the Sureki",
        slug: "sikran-captain-of-the-sureki",
        icon: "inv_achievement_raidnerubian_nerubianevolved",
      },
      {
        name: "Rasha'nan",
        slug: "rasha-nan",
        icon: "inv_achievement_raidnerubian_flyingnerubianevolved",
      },
      {
        name: "Bloodtwister Ovi'nax",
        slug: "bloodtwister-ovinax",
        icon: "inv_achievement_raidnerubian_swarmmother",
      },
      {
        name: "Nexus-Princess Ky'veza",
        slug: "nexus-princess-kyveza",
        icon: "inv_achievement_raidnerubian_etherealassasin",
      },
      {
        name: "The Silken Court",
        slug: "the-silken-court",
        icon: "inv_achievement_raidnerubian_council",
      },
      {
        name: "Queen Ansurek",
        slug: "queen-ansurek",
        icon: "inv_achievement_raidnerubian_queenansurek",
      },
    ],
  },
] as const satisfies Instance[];

export const website = {
  metadata,
} as const;

export const authors = {
  ducky: {
    name: "Ducky",
    avatar: DuckyAvatar,
  },
} as const;

export const authorSlugs: AuthorSlug[] = ["ducky"];

export type AuthorSlug = keyof typeof authors;
export type Author = (typeof authors)[AuthorSlug];
