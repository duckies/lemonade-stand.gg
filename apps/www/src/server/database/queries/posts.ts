import { eq } from "drizzle-orm";
import { getSession } from "~/server/auth";
import { db } from "..";
import { posts } from "../schema";

export async function createPost(data: typeof posts.$inferInsert) {
  const session = await getSession();

  return db.insert(posts).values(data);
}

export async function getPostById(id: bigint) {
  const r = await db.select().from(posts).where(eq(posts.id, id));

  return r[0] ?? null;
}

export async function getPostBySlug(slug: string) {
  const rows = await db.select().from(posts).where(eq(posts.slug, slug));

  return rows[0] ?? null;
}

export async function updatePost(id: bigint, data: Partial<typeof posts.$inferInsert>) {
  return db.update(posts).set(data).where(eq(posts.id, id));
}

export async function deletePost(id: bigint) {
  return db.delete(posts).where(eq(posts.id, id));
}
