"use client";

import { Button, Input, Label } from "@lemonade-stand/ui";
import { useActionState, useState } from "react";
import { Editor } from "~/components/editor/editor";
import { Hero } from "~/components/hero";
import { createPostAction } from "./actions";

export default function BlogCreatePage() {
  const [state, action] = useActionState(createPostAction, {
    data: { title: "", slug: "", description: "", content: "" },
  });

  return (
    <div>
      <Hero title="New Blog Post" subtitle="Create a new blog post" />
      <div className="bg-card px-5 py-4">
        <form className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 items-center" action={action}>
          <Label htmlFor="title">Title</Label>
          <div className="">
            <Input
              id="title"
              name="title"
              value={state.data.title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="my-2"
            />
          </div>

          <Label htmlFor="description">Description</Label>
          <div className="">
            <Input
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="my-2"
            />
          </div>

          <Label htmlFor="document">Post</Label>
          <input type="hidden" name="document" value={editorContent} />
          <div className="">
            <Editor onChange={setEditorContent} className="border rounded-md" />
          </div>

          <Button type="submit">Create Post</Button>
        </form>
      </div>
    </div>
  );
}
