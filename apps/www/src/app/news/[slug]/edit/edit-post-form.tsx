"use client";

import {
  Column,
  Columns,
  ColumnsMenu,
  Document,
  Link,
  LinkMenu,
  SlashCommand,
  TaskItem,
  TaskList,
  TextMenu,
} from "@lemonade-stand/editor";
import { Button, Input, Label, cn } from "@lemonade-stand/ui";
import { EditorContent, type UseEditorOptions, useEditor } from "@tiptap/react";
import Script from "next/script";
import { useRef, useState } from "react";
import { DefaultExtensions } from "~/components/editor/extensions";
import { SlashCommands } from "~/components/editor/slash-commands";
import type { Post } from "~/server/database/schema";

export interface EditorFormProps extends UseEditorOptions {
  className?: string;
  post: Post;
  action: (slug: string, data: any) => Promise<void>;
}

export function EditPostForm({ post, className, action, ...props }: EditorFormProps) {
  const [loading, setLoading] = useState(false);
  const menuContainerRef = useRef(null);

  const editor = useEditor({
    extensions: [
      ...DefaultExtensions,
      SlashCommand.configure({
        commands: SlashCommands,
      }),
      // TaskList.configure({
      //   HTMLAttributes: {
      //     class: "not-prose items-start pl-2",
      //   },
      // }),
      // TaskItem.configure({
      //   HTMLAttributes: {
      //     class: "flex gap-2 items-center my-4",
      //   },
      //   nested: true,
      // }),
      Link,
    ],
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    // content: JSON.parse(post.document),
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[150px] w-full max-w-full outline-none prose dark:prose-invert",
          className,
        ),
      },
      handleDOMEvents: {
        keydown: (_view, event) => {
          if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
            const slashCommand = document.querySelector("#slash-command");

            if (slashCommand) {
              return true;
            }
          }
        },
      },
    },
    onUpdate: () => window?.$WowheadPower?.refreshLinks(),
    ...props,
  });

  const onSave = async () => {
    if (!editor) return;

    setLoading(true);

    const data = {
      title: editor.view.state.doc.firstChild?.textContent.trim(),
      // FIXME: Why do I have to stringify this or I get a "this isn't a generic object" error?
      document: JSON.stringify(editor.getJSON()),
    };

    await action(post.slug, data);

    setLoading(false);
  };

  if (!editor) return null;

  return (
    <div ref={menuContainerRef}>
      <div className="px-5 py-6 bg-card rounded-md">
        <div className="mb-5">
          <EditorContent className="border rounded-md" editor={editor} />
          <TextMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        </div>
        <div className="flex justify-end">
          <Button type="button" onClick={() => onSave()}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
