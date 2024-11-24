import { buttonVariants, cn } from "@lemonade-stand/ui";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Editor } from "~/components/editor/editor";
import { Hero } from "~/components/hero";
import { db } from "~/server/database";

export default async function BlogPostPage({ params }: Readonly<{ params: { slug: string } }>) {
  const results = await db
    .select()
    .from(db.t.posts)
    .where(eq(db.t.posts.slug, params.slug))
    .limit(1);
  const post = results[0];

  if (!post) {
    notFound();
  }

  console.log(post);

  return (
    <div>
      <Hero title={post.title} subtitle={post.description || ""}>
        <Link href={`/blog/${post.slug}/edit`} className={cn(buttonVariants())}>
          Edit Post
        </Link>
      </Hero>
      <Editor value={post.content} editable={false} />
    </div>
  );
}
