import {
  Button,
  Checkbox,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@lemonade-stand/ui";
import { LinkIcon } from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

export interface EditLinkPopoverProps {
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
}

export function useLinkState({ initialUrl, initialOpenInNewTab, onSetLink }: EditLinkPopoverProps) {
  const [url, setUrl] = useState(initialUrl || "");
  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab || false);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value), []);

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (isValidUrl) {
        onSetLink(url, openInNewTab);
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink],
  );

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  };
}

export function EditLinkPopover({
  initialUrl,
  initialOpenInNewTab,
  onSetLink,
}: EditLinkPopoverProps) {
  const state = useLinkState({ initialUrl, initialOpenInNewTab, onSetLink });

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && state.isValidUrl) {
        state.handleSubmit(e);
      }
    },
    [state],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 w-8">
          <LinkIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-wrap gap-2 p-2">
          <Input
            type="url"
            id="url"
            value={state.url}
            onChange={state.onChange}
            placeholder="Enter URL"
            className="flex-1 min-w-[12rem]"
            onKeyDown={onKeyDown}
          />
          <div>
            {state.url.length > 0 && !state.isValidUrl && (
              <p className="text-sm text-muted select-none">Type a complete URL to link.</p>
            )}
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <Checkbox
            id="openInNewTab"
            checked={state.openInNewTab}
            onCheckedChange={(checked: boolean) => state.setOpenInNewTab(checked)}
          />
          <Label htmlFor="openInNewTab">Open in new tab</Label>
        </div>
      </PopoverContent>
    </Popover>
  );
}
