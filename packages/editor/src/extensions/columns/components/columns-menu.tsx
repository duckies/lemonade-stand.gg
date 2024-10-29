import { Toggle } from "@lemonade-stand/ui";
import type { Editor } from "@tiptap/core";
import { BubbleMenu, useEditorState } from "@tiptap/react";
import { Columns2Icon, PanelLeft, PanelRight } from "lucide-react";
import { type RefObject, useCallback, useId } from "react";
import { sticky } from "tippy.js";
import { getRenderContainer } from "~/lib/utils";
import { ColumnLayout } from "../columns";

interface ColumnsMenuProps {
  editor: Editor;
  appendTo?: RefObject<any>;
}

export function ColumnsMenu({ editor, appendTo }: ColumnsMenuProps) {
  const id = useId();

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, "columns");
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isColumns = editor.isActive("columns");
    return isColumns;
  }, [editor]);

  const onColumnLeft = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run();
  }, [editor]);

  const onColumnRight = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run();
  }, [editor]);

  const onColumnTwo = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run();
  }, [editor]);

  const { isColumnLeft, isColumnRight, isColumnTwo } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isColumnLeft: ctx.editor.isActive("columns", { layout: ColumnLayout.SidebarLeft }),
        isColumnRight: ctx.editor.isActive("columns", { layout: ColumnLayout.SidebarRight }),
        isColumnTwo: ctx.editor.isActive("columns", { layout: ColumnLayout.TwoColumn }),
      };
    },
  });

  return (
    <BubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${id}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <div className="bg-popover rounded-md shadow-md">
        <Toggle pressed={isColumnLeft} onClick={onColumnLeft}>
          <PanelLeft className="h-4 w-4" />
        </Toggle>
        <Toggle pressed={isColumnTwo} onClick={onColumnTwo}>
          <Columns2Icon className="h-4 w-4" />
        </Toggle>
        <Toggle pressed={isColumnRight} onClick={onColumnRight}>
          <PanelRight className="h-4 w-4" />
        </Toggle>
      </div>
    </BubbleMenu>
  );
}
