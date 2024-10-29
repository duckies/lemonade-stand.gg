import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import deepEql from "fast-deep-equal";
import type { ContentPickerOptions } from "../components/ContentTypePicker";

export function useTextMenuContentTypes(editor: Editor): ContentPickerOptions {
  return useEditorState({
    editor,
    selector: (ctx) => [
      {
        type: "category",
        label: "Hierarchy",
        id: "hierarchy",
      },
      {
        icon: "Pilcrow",
        onClick: () =>
          ctx.editor.chain().focus().lift("taskItem").liftListItem("listItem").setParagraph().run(),
        id: "paragraph",
        disabled: () => !ctx.editor.can().setParagraph(),
        isActive: () =>
          ctx.editor.isActive("paragraph") &&
          !ctx.editor.isActive("orderedList") &&
          !ctx.editor.isActive("bulletList") &&
          !ctx.editor.isActive("taskList"),
        label: "Paragraph",
        type: "option",
      },
      {
        icon: "Heading1",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 1 })
            .run(),
        id: "heading1",
        disabled: () => !ctx.editor.can().setHeading({ level: 1 }),
        isActive: () => ctx.editor.isActive("heading", { level: 1 }),
        label: "Heading 1",
        type: "option",
      },
      {
        icon: "Heading2",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 2 })
            .run(),
        id: "heading2",
        disabled: () => !ctx.editor.can().setHeading({ level: 2 }),
        isActive: () => ctx.editor.isActive("heading", { level: 2 }),
        label: "Heading 2",
        type: "option",
      },
      {
        icon: "Heading3",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 3 })
            .run(),
        id: "heading3",
        disabled: () => !ctx.editor.can().setHeading({ level: 3 }),
        isActive: () => ctx.editor.isActive("heading", { level: 3 }),
        label: "Heading 3",
        type: "option",
      },
      {
        type: "category",
        label: "Content",
        id: "content",
      },
      {
        icon: "whatever",
        onClick: () => ctx.editor.chain().focus().toggleDetails().run(),
        disabled: () => !ctx.editor.can().toggleDetails(),
        isActive: () => ctx.editor.isActive("details"),
        label: "Details",
        type: "option",
        id: "details",
      },
    ],
    equalityFn: deepEql,
  });
}
