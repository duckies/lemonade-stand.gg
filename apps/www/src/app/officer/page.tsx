import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lemonade-stand/ui";
import Link from "next/link";
import { Hero } from "~/components/hero";

export default async function OfficerHomePage() {
  return (
    <div>
      <Hero title="Officer's Panel" subtitle="Guild management resources" />

      <Card>
        <CardHeader>
          <CardTitle>Links</CardTitle>
          <CardDescription>
            The navigation for the officer panel is not yet implemented.
          </CardDescription>
          <CardContent className="mt-3 prose dark:prose-invert">
            <ul className="">
              <li className="">
                <p>
                  <Link href="/officer/blocks">Blocks</Link>: Edit block messages managed by the
                  bot.
                </p>
              </li>
            </ul>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
