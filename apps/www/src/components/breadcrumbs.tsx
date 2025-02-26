import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  BreadcrumbItem as _BreadcrumbItem,
} from "@lemonade-stand/ui";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { type ComponentPropsWithoutRef, Fragment } from "react";
import * as v from "valibot";

const BreadcrumbItemSchema = v.object({
  label: v.string(),
  url: v.optional(v.string()),
  dropdown: v.optional(v.array(v.object({ label: v.string(), url: v.string() }))),
});

const BreadcrumbSchema = v.array(BreadcrumbItemSchema);

export type BreadcrumbSchema = v.InferOutput<typeof BreadcrumbSchema>;

interface BreadcrumbItemProps extends ComponentPropsWithoutRef<"li"> {
  url?: string;
}

function BreadcrumbItem({ children, url, ...props }: BreadcrumbItemProps) {
  if (url) {
    return (
      <_BreadcrumbItem {...props}>
        <BreadcrumbLink asChild>
          <Link href={url}>{children}</Link>
        </BreadcrumbLink>
      </_BreadcrumbItem>
    );
  }

  return <_BreadcrumbItem {...props}>{children}</_BreadcrumbItem>;
}

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbSchema;
  className?: string;
}

export function Breadcrumbs({ breadcrumbs, className }: BreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="text-base [text-shadow:2px_2px_3px_rgba(0,0,0,0.6)]">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const label = isLast ? (
            <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
          ) : (
            breadcrumb.label
          );

          return (
            <Fragment key={breadcrumb.label}>
              <BreadcrumbItem url={breadcrumb.url}>
                {breadcrumb.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      {label}
                      <ChevronDownIcon className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {breadcrumb.dropdown.map((dropdown) => (
                        <DropdownMenuItem key={dropdown.label} asChild>
                          <Link href={dropdown.url}>{dropdown.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  label
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
