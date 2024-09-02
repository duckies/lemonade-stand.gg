import type { Editor } from "@tiptap/core";
import { useCallback } from "react";

export function useTextMenuCommands(editor: Editor) {
  // @ts-ignore - TODO: fix types
  const onBold = useCallback(() => editor.chain().focus().toggleBold().run(), [editor]);

  return {
    onBold,
  };
}
