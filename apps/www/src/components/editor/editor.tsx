"use client";

import { Details, Document, Link, TaskItem, TaskList, Title } from "@lemonade-stand/editor";
import { Toggle, cn } from "@lemonade-stand/ui";
import type { EditorEvents, Editor as EditorType } from "@tiptap/core";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import dynamic from "next/dynamic";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
import { isClient } from "~/lib/utils";

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onUpdate?: (props: EditorEvents["update"]) => void;
  editable?: boolean;
  className?: string;
}

const DynamicToolbar = dynamic(() => import("./toolbar").then((module) => module.EditorToolbar), {
  ssr: false,
});
const DynamicBubbleMenu = dynamic(
  () => import("./bubble-menu").then((module) => module.BubbleMenu),
  { ssr: false },
);

export function ToggleMark({
  editor,
  children,
  mark,
}: { editor: EditorType; children: React.ReactNode; mark: string }) {
  return (
    <Toggle
      size="sm"
      pressed={editor.isActive(mark)}
      onPressedChange={() => editor.chain().focus().toggleMark(mark).run()}
    >
      {children}
    </Toggle>
  );
}

export function Editor({ value, editable, className }: EditorProps) {
  const editor = useEditor({
    extensions: [
      Document.configure({
        content: "(block|columns)+",
      }),
      Title,
      Link,
      StarterKit.configure({ document: false }),
      TextAlign.configure({ types: ["paragraph", "code"] }),
      Typography,
      Details,
      // MechanicExtension,
      GlobalDragHandle,
      TaskList,
      TaskItem,
    ],
    immediatelyRender: isClient(),
    content: value ? JSON.parse(value) : "",
    editable,
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[150px] w-full text-sm max-w-full outline-none px-3 py-5 prose dark:prose-invert",
          className,
        ),
      },
    },
    onUpdate: () => {
      window?.$WowheadPower?.refreshLinks();
    },
    onCreate: () => {
      window?.$WowheadPower?.refreshLinks();
    },
  });

  if (!editor) return null;

  if (!editable) {
    return <EditorContent editor={editor} className="" />;
  }

  return (
    <>
      <DynamicToolbar editor={editor} />
      <EditorContent editor={editor} className="" />
      <DynamicBubbleMenu editor={editor} />
    </>
  );
}
