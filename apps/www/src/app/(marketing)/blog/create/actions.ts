"use server";

import { redirect } from "next/navigation";
import { db } from "~/server/database/database";
import { posts } from "~/server/database/schema";

function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = slugify(title);
  const description = formData.get("description") as null | string;
  const document = formData.get("document") as string;

  await db.insert(posts).values({
    title,
    slug: slugify(title),
    description,
    document,
  });

  redirect(`/blog/${slug}`);
}
