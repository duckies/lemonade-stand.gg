import { Card, CardDescription, CardHeader, CardTitle, Progress } from "@lemonade-stand/ui";

async function getGuildStatistics(raidSlug: string) {
  const response = await fetch(
    "https://raider.io/api/v1/guilds/profile?region=us&realm=illidan&name=Lemonade%20Stand&fields=raid_progression%2Craid_rankings",
    {
      next: {
        revalidate: 3600,
        tags: ["raiderio-guild-statistics"],
      },
    },
  );
  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.message ?? "RaiderIO Error",
      data,
    };
  }

  const rankings = data.raid_rankings?.[raidSlug]?.mythic;
  const progress = data.raid_progression?.[raidSlug];

  return {
    error: null,
    data: {
      progress,
      rankings: [
        {
          title: "Realm",
          value: rankings?.realm,
        },
        {
          title: "Region",
          value: rankings?.region,
        },
        {
          title: "World",
          value: rankings?.world,
        },
      ],
    },
  };
}

export async function ProgressCard() {
  const { error, data } = await getGuildStatistics("nerubar-palace");

  if (error) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif tracking-wider text-xl">
          Nerub-ar Palace {data.progress.mythic_bosses_killed}/{data.progress.total_bosses} M
        </CardTitle>
        <CardDescription>The numbies or some shit.</CardDescription>
      </CardHeader>

      <div className="px-6 mb-4">
        <Progress
          value={(data.progress.mythic_bosses_killed / data.progress.total_bosses) * 100}
          className="h-4"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 px-6 pb-6">
        {data.rankings.map((ranking: any) => (
          <div
            key={ranking.title}
            className="flex flex-col text-center bg-muted rounded-xl px-4 py-3 text-sm"
          >
            <span className="text-primary">{ranking.title}</span>
            <span className="">{ranking.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
