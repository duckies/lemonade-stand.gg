import { readdir } from "node:fs/promises";
import { join } from "node:path";

export async function getDirectories(root: string, cwd?: string) {
  const dirents = await readdir(join(cwd ?? process.cwd(), root), {
    withFileTypes: true,
  });

  return dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}
