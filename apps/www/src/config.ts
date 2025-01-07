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
  }
]

export const Raids = [
  {
    name: "Nerub-ar Palace",
    slug: "nerubar-palace",
    bosses: [
      {
        name: "Ulgrax the Devourer",
        slug: "ulgrax-the-devourer",
        icon: "inv_achievement_raidnerubian_nerubianhulk"
      },
      {
        name: "The Bloodbound Horror",
        slug: "the-bloodbound-horror",
        icon: "inv_achievement_raidnerubian_blackblood"
      },
      {
        name: "Sikran, Captain of the Sureki",
        slug: "sikran-captain-of-the-sureki",
        icon: "inv_achievement_raidnerubian_nerubianevolved"
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
        icon: "inv_achievement_raidnerubian_etherealassasin"
      },
      {
        name: "The Silken Court",
        slug: "the-silken-court",
        icon: "inv_achievement_raidnerubian_council"
      },
      {
        name: "Queen Ansurek",
        slug: "queen-ansurek",
        icons: "inv_achievement_raidnerubian_queenansurek"
      }
    ]
  }
] as const;

export const website = {
  metadata,
} as const;