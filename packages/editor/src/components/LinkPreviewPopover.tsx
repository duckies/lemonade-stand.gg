import { Button } from "@lemonade-stand/ui";
import { PenIcon, TrashIcon } from "lucide-react";

interface LinkPreviewPopoverProps {
  url: string;
  onEdit: () => void;
  onClear: () => void;
}

export function LinkPreviewPopover({ url, onEdit, onClear }: LinkPreviewPopoverProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-popover rounded-md shadow-md">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm underline break-all"
      >
        {url}
      </a>
      <Button onClick={onEdit}>
        <PenIcon className="h-4 w-4" />
      </Button>
      <Button onClick={onClear}>
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
