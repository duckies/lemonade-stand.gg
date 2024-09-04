import { Card, CardDescription, CardHeader, CardTitle } from "@lemonade-stand/ui";
import Link from "next/link";
import { Hero } from "~/components/hero";
import type { Snowflake } from "~/server/discord";

const blocks: { messageId: Snowflake; channelId: Snowflake; title: string; description: string }[] =
  [
    {
      messageId: "1163934463718330429",
      channelId: "1093625915998744606",
      title: "Resources",
      description: "The list of raiding resources.",
    },
  ];

export default async function BlocksIndex() {
  return (
    <div>
      <Hero title="Blocks" subtitle="Edit Bot Message Blocks" />

      <div className="grid gap-3">
        {blocks.map((block) => (
          <Link key={block.messageId} href={`/officer/blocks/${block.channelId}/${block.messageId}`}>
            <Card>
              <CardHeader>
                <CardTitle>{block.title}</CardTitle>
                <CardDescription>{block.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
