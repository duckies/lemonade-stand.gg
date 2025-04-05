import Link from "next/link";

const ExternalLinks = [
  {
    text: "WarcraftLogs",
    href: "https://www.warcraftlogs.com/guild/id/702087",
  },
  {
    text: "Raider.IO",
    href: "https://raider.io/guilds/us/illidan/Lemonade%20Stand",
  },
  {
    text: "WoWProgress",
    href: "https://www.wowprogress.com/guild/us/illidan/Lemonade+Stand",
  },
];

const InternalLinks = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Guides",
    href: "/guides",
  },
];

export function Footer() {
  return (
    <footer className="bg-card/80 mt-[10rem]">
      <section className="section">
        <div className="container grid gap-12 md:grid-cols-[1.5fr_0.5fr_0.5fr]">
          <div className="grid gap-6">
            <h3 className="font-serif font-semibold tracking-wide text-xl">Lemonade Stand</h3>
            <p className="text-muted-foreground">
              © Lemonade Stand. All rights reserved. 2024-present.
            </p>
          </div>
          <div>
            <h5 className="font-serif text-lg tracking-wide font-semibold">Links</h5>
            <ul className="mt-4 space-y-3">
              {ExternalLinks.map(({ text, href }) => (
                <li key={href}>
                  <a
                    className="link text-muted-foreground text-sm"
                    href={href}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-serif text-lg tracking-wide font-semibold">Website</h5>
            <ul className="mt-4 space-y-3">
              {InternalLinks.map(({ text, href }) => (
                <li key={href}>
                  <Link className="link text-muted-foreground text-sm" href={href}>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
}
