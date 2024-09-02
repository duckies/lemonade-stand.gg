import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
  Toggle,
} from "@lemonade-stand/ui";
import { DotsVerticalIcon, ListBulletIcon } from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/core";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, Bold, Italic, Quote } from "lucide-react";
import { ToggleMark } from "./editor";

export function EditorToolbar({ editor }: { editor: Editor }) {
  return (
    <div className="w-full rounded-md">
      <div className="p-1 flex flex-row items-center gap-1">
        <ToggleMark editor={editor} mark="bold">
          <Bold className="size-4" />
        </ToggleMark>

        <ToggleMark editor={editor} mark="italic">
          <Italic className="size-4" />
        </ToggleMark>

        <Separator orientation="vertical" className="mx-2 h-7" />

        <ToggleMark editor={editor} mark="bulletList">
          <ListBulletIcon className="size-4" />
        </ToggleMark>

        <Separator orientation="vertical" className="mx-2 h-7" />

        <ToggleMark editor={editor} mark="blockquote">
          <Quote className="size-4" />
        </ToggleMark>

        <Separator orientation="vertical" className="mx-2 h-7" />

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeftIcon className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenterIcon className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRightIcon className="size-4" />
        </Toggle>

        <Separator orientation="vertical" className="mx-2 h-7" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => editor.chain().focus().setDetails().run()}>
              Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().insertContent({ type: "mechanic" }).run()}
            >
              Mechanic
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
