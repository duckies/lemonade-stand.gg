"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { slugify } from "~/lib/string";
import { db } from "~/server/database";
import { type InsertPost, posts } from "~/server/database/schema";

export async function updatePost(slug: string, data: Partial<InsertPost>) {
  if (data.title) {
    data.slug = slugify(data.title);
  }

  await db.update(posts).set(data).where(eq(posts.slug, slug));

  redirect(`/news/${data.slug}`);
}
