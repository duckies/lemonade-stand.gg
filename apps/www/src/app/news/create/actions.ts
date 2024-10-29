"use server";

import { redirect } from "next/navigation";
import { db } from "server/database";
import { posts } from "server/database/schema";
import { genSnowflake } from "utils/snowflake";
import * as v from "valibot";
import { defineAction } from "~/lib/actions";
import { getSession } from "~/server/auth";
import { createAuthAction } from "~/server/middleware";

function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
}

export const createPostAction = defineAction({
  schema: v.object({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.nullish(v.string()),
  }),
  form: true,
  action: async (ctx) => {
    const session = await getSession();

    if (!session.user) {
      throw { error: { code: "Unauthorized" } }
    }

    await db.insert(posts).values({
      id: genSnowflake(),
      title: ctx.title,
      slug: ctx.slug,
      description: ctx.description,
      content: ctx.content,
      authorId: session.user.id,
    })
  }
})

export async function createPost(formData: FormData) {
  const session = await getSession();

  if (!session.user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const slug = slugify(title);
  const description = formData.get("description") as null | string;
  const document = formData.get("document") as string;

  await db.insert(posts).values({
    id: genSnowflake(),
    title,
    slug: slugify(title),
    description,
    content: document,
    authorId: session.user.id,
  });

  redirect(`/blog/${slug}`);
}

export const isSlug = v.custom<string>((input) =>
  typeof input === "string" ? /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input) : false,
);

// export const createPostAction = createAuthAction(
//   v.object({
//     title: v.pipe(v.string(), v.trim(), v.minLength(1)),
//     slug: isSlug,
//     description: v.nullish(v.string()),
//     document: v.string()
//   }),
//   (data) => {
//     return {
//       error: "Not Yet Implemented"
//     }
//   },
// );
