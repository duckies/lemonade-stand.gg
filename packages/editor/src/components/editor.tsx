"use client";

import { EditorContent } from "@tiptap/react";
import { useEditor } from "~/hooks/useEditor";
import { ContentItemMenu } from "./menus/ContentItemMenu";
import { TextMenu } from "./menus/TextMenu";

export interface EditorProps {
  content?: string;
}

export function Editor({ content }: EditorProps) {
  const { editor } = useEditor({ content });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full">
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <EditorContent editor={editor} content={content} className="" />
        <TextMenu editor={editor} />
        <ContentItemMenu editor={editor} />
      </div>
    </div>
  );
}
