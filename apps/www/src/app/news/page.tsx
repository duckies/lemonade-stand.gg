import { buttonVariants, cn } from "@lemonade-stand/ui";
import Link from "next/link";
import { Hero } from "~/components/hero";
import { db } from "~/server/database/database";
import { posts } from "~/server/database/schema";

export default async function BlogIndexPage() {
  const posties = await db.select().from(posts).limit(10);

  return (
    <div>
      <Hero title="Blog" subtitle="Latest ramblings from the standers">
        <Link href="/news/create" className={cn(buttonVariants({ variant: "outline" }))}>
          New Post
        </Link>
      </Hero>
      <main>
        <div className="grid grid-cols-3 gap-5">
          {posties.map((post) => (
            <Link key={post.slug} href={`/news/${post.slug}`}>
              <div className="rounded-lg border p-4 flex">
                <h2 className="text-xl font-semibold mb-5">{post.title}</h2>
                <p>{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
