import type { ComponentPropsWithoutRef } from "react";

export function createProseHeader(heading: "h1" | "h2" | "h3" | "h4" | "h5") {
  const Component = heading;

  return ({ id, children, ...props }: ComponentPropsWithoutRef<typeof Component>) => (
    <Component id={id} {...props}>
      {id && (
        <a href={`#${id}`} className="header-anchor">
          #<span className="sr-only">Link to this heading</span>
        </a>
      )}
      {children}
    </Component>
  );
}
