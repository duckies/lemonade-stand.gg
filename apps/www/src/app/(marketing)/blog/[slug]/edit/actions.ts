"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "~/server/database/database";
import { type InsertPost, posts } from "~/server/database/schema";

export async function updatePost(slug: string, values: Partial<InsertPost>) {
  await db.update(posts).set(values).where(eq(posts.slug, slug));

  redirect(`/blog/${slug}`);
}
