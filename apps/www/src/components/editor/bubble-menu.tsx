import type { Editor } from "@tiptap/core";
import { BubbleMenu as TipTapButtonMenu } from "@tiptap/react";
import { Bold, Italic, LinkIcon, Strikethrough } from "lucide-react";
import { ToggleMark } from "./editor";

export function BubbleMenu({ editor }: { editor: Editor }) {
  return (
    <TipTapButtonMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="bg-popover backdrop-blur-sm rounded-md flex p-1 shadow-md">
        <ToggleMark editor={editor} mark="bold">
          <Bold className="size-4" />
        </ToggleMark>
        <ToggleMark editor={editor} mark="italic">
          <Italic className="size-4" />
        </ToggleMark>
        <ToggleMark editor={editor} mark="strike">
          <Strikethrough className="size-4" />
        </ToggleMark>
        <ToggleMark editor={editor} mark="link">
          <LinkIcon className="size-4" />
        </ToggleMark>
      </div>
    </TipTapButtonMenu>
  );
}
