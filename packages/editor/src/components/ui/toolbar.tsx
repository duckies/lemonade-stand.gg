import { Button, type ButtonProps, cn } from "@lemonade-stand/ui";
import { type HTMLProps, forwardRef } from "react";

export interface ToolbarWrapperProps extends HTMLProps<HTMLDivElement> {
  shouldShowContent?: boolean;
}

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(
  ({ shouldShowContent = true, children, className, ...props }, ref) =>
    shouldShowContent && (
      <div
        className={cn(
          "bg-surface rounded-lg shadow-xs inline-flex h-full leading-none gap-0.5 flex-row p-1 items-center",
          className,
        )}
        {...props}
        ref={ref}
      >
        {" "}
        {children}
      </div>
    ),
);

ToolbarWrapper.displayName = "ToolbarWrapper";

export interface ToolbarButtonProps extends ButtonProps {
  active?: boolean;
}

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ active, children, className, ...props }, ref) => {
    const content = (
      <Button className={cn("gap-1 min-w-[2rem] px-2 w-auto", className)} ref={ref} {...props}>
        {children}
      </Button>
    );

    return content;
  },
);

ToolbarButton.displayName = "ToolbarButton";

export const Toolbar = {
  Wrapper: ToolbarWrapper,
  Button: ToolbarButton,
};
