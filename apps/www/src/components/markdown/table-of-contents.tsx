export interface TocHeading {
  id: string;
  value: string;
  depth: number;
  children?: TocHeading[];
}

interface TocHeadingProps extends TocHeading {
  maxDepth?: number;
}

function TocHeading({ id, value, children, maxDepth = 6 }: TocHeadingProps) {
  const _children = children?.filter((child) => child.depth <= maxDepth);

  return (
    <li className="pl-4 mb-2">
      <a className="text-muted-foreground hover:text-primary" href={`#${id}`}>
        {value}
      </a>
      {_children && (
        <ul className="mt-2">
          {_children.map((child) => (
            <TocHeading key={child.id} {...child} maxDepth={maxDepth} />
          ))}
        </ul>
      )}
    </li>
  );
}

interface TableOfContentsProps {
  toc: TocHeading[];
  maxDepth?: number;
}

export function TableOfContents({ toc, maxDepth = 3 }: TableOfContentsProps) {
  return (
    <div>
      <ul className="text-sm">
        {toc.map((toc) => (
          <TocHeading key={toc.id} {...toc} maxDepth={maxDepth} />
        ))}
      </ul>
    </div>
  );
}
