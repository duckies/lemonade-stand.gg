import { Card, CardDescription, CardHeader, CardTitle } from "@lemonade-stand/ui";
import { DiscordCard } from "~/components/DiscordCard";
import { ProgressCard } from "~/components/ProgressCard";

export default async function HomePage() {
  return (
    <div className="flex flex-col justify-center container py-10">
      <div className="bg-[url(https://wow.zamimg.com/uploads/screenshots/normal/1165800.jpg)] absolute top-0 left-0 h-[400px] right-0 bg-cover after:from-background/50 after:to-background after:bg-gradient-to-b after:from-50% after:content-[''] after:inset-0 after:absolute" />
      <div className="text-center flex flex-col mt-[5rem] mb-[7rem] relative">
        <h1 className="text-8xl drop-shadow-md font-serif font-bold tracking-wide block">
          Lemonade Stand
        </h1>
        <p className="text-xl text-muted-foreground mt-3 ">
          The <span className="line-through">grape</span> lemon-peddling World of Warcraft community
          and raiding guild on Illidan.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <h2 className="font-serif text-xl mb-4 col-span-12">Latest Posts</h2>
        <div className="col-span-8">
          <div>
            <Card className="bg-card rounded-md shadow-md">
              <CardHeader>
                <CardTitle className="font-semibold font-serif text-xl tracking-wide">
                  Optimizing For Performance
                </CardTitle>
                <CardDescription>Tips for optimizing FPS in raids.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <ProgressCard />
          <DiscordCard />
        </div>
      </div>
    </div>
  );
}
