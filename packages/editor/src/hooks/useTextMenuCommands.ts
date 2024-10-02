import type { Editor } from "@tiptap/core";
import { useCallback } from "react";

export function useTextMenuCommands(editor: Editor) {
  // @ts-ignore - TODO: fix types
  const onBold = useCallback(() => editor.chain().focus().toggleBold().run(), [editor]);

  const onLink = useCallback(
    (url: string, inNewTab?: boolean) =>
      editor
        .chain()
        .focus()
        .setLink({ href: url, target: inNewTab ? "_blank" : "" })
        .run(),
    [editor],
  );

  return {
    onBold,
    onLink,
  };
}
