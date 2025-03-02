import DuckyAvatar from "#public/images/avatars/ducky.png";

const metadata = {
  description: "The lemon-scented World of Warcraft raiding community.",
  title: {
    default: "Lemonade Stand",
    template: "%s | Lemonade Stand",
  },
};

export const Expansions = [
  {
    id: 514,
    name: "The War Within",
    slug: "the-war-within",
  },
];

export interface Encounter {
  icon: string;
  name: string;
  slug: string;
}

export interface Instance {
  encounters: Encounter[];
  name: string;
  slug: string;
}

export const instances = [
  {
    encounters: [
      {
        icon: "inv_111_raid_achievement_vexieandthegeargrinders",
        name: "Vexie and the Geargrinders",
        slug: "vexie-and-the-geargrinders",
      },
      {
        icon: "inv_11_arenaboss_colossalclash",
        name: "Cauldron of Carnage",
        slug: "cauldron-of-carnage",
      },
      {
        icon: "inv_111_raid_achievement_rikreverb",
        name: "Rik Reverb",
        slug: "rik-reverb",
      },
      {
        icon: "inv_111_raid_achievement_stixbunkjunker",
        name: "Stix Bunkjunker",
        slug: "stix-bunkjunker",
      },
      {
        icon: "inv_111_raid_achievement_sprocketmongerlocknstock",
        name: "Sprocketmonger Lockenstock",
        slug: "sprocketmonger-lockenstock",
      },
      {
        icon: "inv_111_raid_achievement_onearmedbandit",
        name: "The One-Armed Bandit",
        slug: "one-armed-bandit",
      },
      {
        icon: "inv_111_raid_achievement_mugzeeheadsofsecurity",
        name: "Mug'zee, Heads of Security",
        slug: "mugzee-heads-of-security",
      },
      {
        icon: "inv_111_raid_achievement_chromekinggallywix",
        name: "Chrome King Gallywix",
        slug: "chrome-king-gallywix",
      },
    ],
    name: "Liberation of Undermine",
    slug: "liberation-of-undermine",
  },
  {
    encounters: [
      {
        icon: "inv_achievement_raidnerubian_nerubianhulk",
        name: "Ulgrax the Devourer",
        slug: "ulgrax-the-devourer",
      },
      {
        icon: "inv_achievement_raidnerubian_blackblood",
        name: "The Bloodbound Horror",
        slug: "the-bloodbound-horror",
      },
      {
        icon: "inv_achievement_raidnerubian_nerubianevolved",
        name: "Sikran, Captain of the Sureki",
        slug: "sikran-captain-of-the-sureki",
      },
      {
        icon: "inv_achievement_raidnerubian_flyingnerubianevolved",
        name: "Rasha'nan",
        slug: "rasha-nan",
      },
      {
        icon: "inv_achievement_raidnerubian_swarmmother",
        name: "Bloodtwister Ovi'nax",
        slug: "bloodtwister-ovinax",
      },
      {
        icon: "inv_achievement_raidnerubian_etherealassasin",
        name: "Nexus-Princess Ky'veza",
        slug: "nexus-princess-kyveza",
      },
      {
        icon: "inv_achievement_raidnerubian_council",
        name: "The Silken Court",
        slug: "the-silken-court",
      },
      {
        icon: "inv_achievement_raidnerubian_queenansurek",
        name: "Queen Ansurek",
        slug: "queen-ansurek",
      },
    ],
    name: "Nerub-ar Palace",
    slug: "nerubar-palace",
  },
] as const satisfies Instance[];

export const website = {
  metadata,
} as const;

export const authors = {
  ducky: {
    avatar: DuckyAvatar,
    name: "Ducky",
  },
} as const;

export const authorSlugs: AuthorSlug[] = ["ducky"];

export type Author = (typeof authors)[AuthorSlug];
export type AuthorSlug = keyof typeof authors;
