import { CopyrightIcon } from "lucide-react";

export function Footer() {
  return (
    <footer>
      <section className="section">
        <div className="container grid gap-12 md:grid-cols-[1.5fr_0.5fr_0.5fr]">
          <div className="grid gap-6">
            <h3 className="font-serif font-semibold tracking-wide text-xl">Lemonade Stand</h3>
            <p className="text-muted-foreground">
              © Lemonade Stand. All rights reserved. 2024-present.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-serif text-lg tracking-wide font-semibold">Links</h5>
            <a
              href="https://www.warcraftlogs.com/guild/us/illidan/lemonade-stand"
              rel="noreferrer noopener"
              target="_blank"
            >
              WarcraftLogs
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
