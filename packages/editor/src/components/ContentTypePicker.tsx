import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@lemonade-stand/ui";
import { ChevronDown, Pilcrow } from "lucide-react";
import { Toolbar } from "./ui/toolbar";

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: "option";
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  // icon: keyof typeof icons
};

export interface ContentTypePickerCategory {
  label: string;
  id: string;
  type: "category";
}

export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>;

export interface ContentTypePickerProps {
  options: ContentPickerOptions;
}

const isOption = (
  option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerOption => option.type === "option";

export function ContentTypePicker({ options }: ContentTypePickerProps) {
  // const activeItem = useMemo(
  //   () => options.find((o) => o.type === "option" && o.isActive()),
  //   [options],
  // );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* active={activeItem?.id !== "paragraph" && !!activeItem?.type} */}
        <Toolbar.Button>
          <Pilcrow className="h-4 w-4" />
          <ChevronDown className="h-4 w-4" />
        </Toolbar.Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col gap-1 px-2 py-4">
          {options.map((option) => {
            if (isOption(option)) {
              return (
                <Button key={option.id} onClick={option.onClick}>
                  {/* isActive={option.isActive()} */}
                  {/* <Icon name={option.icon} className="w-4 h-4 mr-1" /> */}
                  {option.label}
                </Button>
              );
            }

            return (
              <div className="mt-2 first:mt-0" key={option.id}>
                <span key={option.id}>{option.label}</span>
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
