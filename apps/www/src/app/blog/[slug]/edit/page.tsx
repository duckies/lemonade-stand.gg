import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Hero } from "~/components/hero";
import { db } from "~/server/database";
import { posts } from "~/server/database/schema";
import { updatePost } from "./actions";
import { EditPostForm } from "./edit-post-form";

export default async function BlogPostEditPage({ params }: Readonly<{ params: { slug: string } }>) {
  const post = await db.select().from(posts).where(eq(posts.slug, params.slug)).limit(1);

  if (!post[0]) {
    notFound();
  }

  return (
    <div>
      <Hero title={post[0].title} subtitle={post[0].description || ""} />
      <div className="border shadow-md rounded-md">
        <EditPostForm post={post[0]} action={updatePost} />
      </div>
    </div>
  );
}
