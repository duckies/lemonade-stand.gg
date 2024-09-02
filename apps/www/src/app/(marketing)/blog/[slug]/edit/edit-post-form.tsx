"use client";

import { Button, Input, Label, cn } from "@lemonade-stand/ui";
import { EditorContent, type UseEditorOptions, useEditor } from "@tiptap/react";
import { useState } from "react";
import { DefaultExtensions } from "~/components/editor/extensions";
import type { Post } from "~/server/database/schema";

export interface EditorFormProps extends UseEditorOptions {
  className?: string;
  post: Post;
  action: (slug: string, data: any) => Promise<void>;
}

export function EditPostForm({ post, className, action, ...props }: EditorFormProps) {
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [...DefaultExtensions],
    immediatelyRender: false,
    content: post.document,
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[150px] w-full text-sm max-w-full outline-none px-3 py-5 prose dark:prose-invert",
          className,
        ),
      },
    },
    ...props,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      // @ts-ignore
      title: e.target[0].value,
      // @ts-ignore
      description: e.target[1].value,
      document: editor!.getHTML(),
    };
    await action(post.slug, data);
  };

  return (
    <div className="px-5 py-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-4 items-center mb-5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={post.title} />
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" defaultValue={post.description || ""} />
          <Label htmlFor="document">Post</Label>
          <EditorContent className="border rounded-md" editor={editor} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
