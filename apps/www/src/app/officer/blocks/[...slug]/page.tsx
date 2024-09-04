import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Textarea,
} from "@lemonade-stand/ui";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { DiscordLogo } from "~/components/discord-logo";
import { Hero } from "~/components/hero";
import { getChannelMessage } from "~/server/discord";

export default async function BlockPage({
  params: { slug },
}: Readonly<{ params: { slug: string[] } }>) {
  const [channelId, messageId] = slug;

  if (!channelId || !messageId) {
    return <div>Invalid Parameters</div>;
  }

  const message = await getChannelMessage(channelId, messageId);

  return (
    <div className="flex flex-col gap-3">
      <Hero title="Edit Block" subtitle="Manage a bot message block" />

      <Card>
        <CardHeader>
          <CardTitle>Message</CardTitle>
          <CardDescription>What</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea defaultValue={message.content} rows={20} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-8">
          <div className="flex items-center gap-4">
            <div>
              <Clock className="h-5 w-5" />
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Last Updated</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(message.edited_timestamp), "PPP h:mm a")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <DiscordLogo className="h-5 w-5" />
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Discord Data</p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="p-0 inline h-[unset]">
                    Click to view server data
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Server Message Data</DialogTitle>
                  </DialogHeader>
                  <div className="overflow-auto bg-input text-sm text-muted-foreground rounded-md">
                    <pre className="p-3">{JSON.stringify(message, null, 2)}</pre>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
