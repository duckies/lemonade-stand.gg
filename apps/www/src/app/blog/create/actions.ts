"use server";

import { redirect } from "next/navigation";
import * as v from "valibot";
import { actionClient, withSession } from "~/lib/actions";
import { isSlug } from "~/lib/string";
import { db } from "~/server/database";
import { posts } from "~/server/database/schema";

export const createPostAction = actionClient
  .schema(v.object({
    title: v.string(),
    slug: isSlug,
    description: v.nullish(v.string()),
    content: v.string()
  }))
  .use(withSession)
  .action(async ({ parsedInput: input, ctx }) => {
    await db.insert(posts).values({
      title: input.title,
      slug: input.slug,
      description: input.description,
      content: input.content,
      authorId: ctx.user.id,
    })

    redirect(`/blog/${input.slug}`)
  })

