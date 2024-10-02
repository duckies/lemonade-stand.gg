"use client";

import type { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import { BoldIcon } from "lucide-react";
import { useTextMenuCommands } from "~/hooks/useTextMenuCommands";
import { useTextMenuContentTypes } from "~/hooks/useTextMenuContentTypes";
import { useTextMenuStates } from "~/hooks/useTextMenuStates";
import { ContentTypePicker } from "../ContentTypePicker";
import { EditLinkPopover } from "../EditLinkPopover";
import { Toolbar } from "../ui/toolbar";

export type TextMenuProps = {
  editor: Editor;
};

export function TextMenu({ editor }: TextMenuProps) {
  const commands = useTextMenuCommands(editor);
  const states = useTextMenuStates(editor);
  const blockOptions = useTextMenuContentTypes(editor);

  return (
    <BubbleMenu
      tippyOptions={{
        popperOptions: {
          placement: "top-start",
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport",
                padding: 8,
              },
            },
            {
              name: "flip",
              options: {
                fallbackPlacements: ["bottom-start", "top-end", "bottom-end"],
              },
            },
          ],
        },
        maxWidth: "calc(100vw - 16px)",
      }}
      editor={editor}
      updateDelay={100}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
    >
      <Toolbar.Wrapper>
        <Toolbar.Button onClick={commands.onBold} active={states.isBold}>
          <BoldIcon className="h-4 w-4" />
        </Toolbar.Button>
        <EditLinkPopover onSetLink={commands.onLink} />
        <ContentTypePicker options={blockOptions} />
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
}
