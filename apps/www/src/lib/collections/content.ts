import { glob } from "fast-glob";
import type { MDXContent } from "mdx/types";
import { basename, extname, join } from "node:path";
import * as v from "valibot";
import type { TocHeading } from "~/components/markdown/table-of-contents";
import {
  type RouteMetadata,
  RouteMetadataSchema,
} from "~/lib/collections/schemas";

export interface RouteFile {
  name: string;
  base: string;
  ext: string;
  path: string;
}

export type Route = {
  url: string;
  file: RouteFile;
};

export interface RouteWithContent extends Route {
  content: RouteContent;
}

export async function getRoutes(): Promise<Map<string, RouteFile>> {
  const contentDir = join(process.cwd(), "./src/content");
  const filePaths = await glob("**/*.mdx", { cwd: contentDir });
  const routes = new Map<string, RouteFile>();

  for (const filePath of filePaths) {
    // Regular expression which removes `/index.md(x)` or `.md(x)`
    const route = filePath.replace(/((\/)?(index))?\.mdx?/i, "");
    const fileName = filePath.split("/").at(-1);

    if (!fileName) {
      throw Error(`Unexpected empty filePath: ${filePath}`);
    }

    const ext = extname(fileName);

    routes.set(route, {
      name: fileName,
      base: basename(fileName, ext),
      ext,
      path: filePath,
    });
  }

  return routes;
}

export interface RouteContent {
  Content: MDXContent;
  metadata: RouteMetadata;
  toc: TocHeading[];
  [key: string]: unknown;
}

export async function getRouteContent(file: RouteFile): Promise<RouteContent> {
  try {
    const { default: Content, frontmatter, toc, ...rest } = await import(
      `../../content/${file.path}`
    );

    return {
      Content,
      metadata: v.parse(RouteMetadataSchema, frontmatter),
      toc,
      ...rest,
    };
  } catch (error: any) {
    if (error.code === "MODULE_NOT_FOUND") {
      throw new Error(
        `[collections] failed to dynamically import ${file.path}`,
        {
          cause: file,
        },
      );
    }

    throw error;
  }
}
