"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@lemonade-stand/ui";
import { useQuery } from "@tanstack/react-query";

export function DiscordCard() {
  const { data, status } = useQuery({
    queryKey: ["discord-stats"],
    queryFn: async () => {
      const response = await fetch(
        "https://discord.com/api/guilds/1093608281395707905/widget.json",
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Widget fetch failed");
      }

      const channels = data.channels.sort((a: any, b: any) => a.position - b.position);

      for (const member of data.members) {
        if (!member.channel_id) continue;

        const channel = channels.find((channel: any) => channel.id === member.channel_id);

        if (!channel.members) {
          channel.members = [];
        }

        channel.members.push(member);
      }

      return {
        channels,
        presence_count: data.presence_count,
      };
    },
  });

  if (status === "pending" || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-[250px]" />
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden from-[#5865F2]/40 bg-gradient-to-b to-80%">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 127.14 96.36"
        role="img"
        aria-label="Discord Logo"
        className="absolute top-0 right-[-20px] rotate-[30deg] w-[150px] opacity-30 text-card z-0"
      >
        <path
          fill="currentColor"
          d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
        />
      </svg>
      <CardHeader className="relative">
        <CardTitle className="font-serif tracking-wide text-2xl">
          {data.presence_count} Online Members
        </CardTitle>
        <CardDescription>The various yappers in their yapzones.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {data.channels.map((channel: any) => (
            <div key={channel.id} className="">
              <span className="text-sm font-medium">{channel.name}</span>
              {channel.members ? (
                <div className="flex flex-col gap-2 mt-2 ml-2">
                  {channel.members.map((member: any) => (
                    <div key={member.id} className="flex gap-2 items-center">
                      <img src={member.avatar_url} className="rounded-full h-5 w-5" />
                      <span className="text-sm text-muted-foreground">{member.username}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
