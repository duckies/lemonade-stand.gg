import { Popover, PopoverTrigger } from "@lemonade-stand/ui";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import type { Editor } from "@tiptap/core";
import { GrabIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useContentItemActions } from "../../hooks/useContentItemActions";
import { useData } from "../../hooks/useData";
import { Toolbar } from "../ui/toolbar";

export interface ContentItemMenuProps {
  editor: Editor;
}

export function ContentItemMenu({ editor }: ContentItemMenuProps) {
  const [open, setOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos);

  useEffect(() => {
    editor.commands.setMeta("lockDragHandle", open);
  }, [editor, open]);

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 99,
      }}
    >
      <div className="flex items-center gap-0.5">
        <Toolbar.Button onClick={actions.handleAdd}>
          <PlusIcon className="h-4 w-4" />
        </Toolbar.Button>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Toolbar.Button>
              <GrabIcon className="h-4 w-4" />
            </Toolbar.Button>
          </PopoverTrigger>
        </Popover>
      </div>
    </DragHandle>
  );
}
