import { type Editor, useEditorState } from "@tiptap/react";
import deepEql from "fast-deep-equal";
import { useCallback } from "react";
import isCustomNodeSelected from "~/lib/isCustomNodeSelected";
import { isTextSelected } from "~/lib/isTextSelected";
import type { ShouldShowProps } from "~/types";

export function useTextMenuStates(editor: Editor) {
  const states = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold"),
      };
    },
    equalityFn: deepEql,
  });

  const shouldShow = useCallback(
    ({ view, from }: ShouldShowProps) => {
      if (!view || editor.view.dragging) {
        return false;
      }

      const domAtPos = view.domAtPos(from || 0).node as HTMLElement;
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement;
      const node = nodeDOM || domAtPos;

      if (isCustomNodeSelected(editor, node)) {
        return false;
      }

      return isTextSelected({ editor });
    },
    [editor],
  );

  return {
    shouldShow,
    ...states,
  };
}
