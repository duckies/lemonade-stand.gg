/**
 * @typedef {import("hast").Root} Root
 */

import slugify from "@sindresorhus/slugify";
import { toString as nodeToString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

/**
 * @see https://github.com/syntax-tree/hast-util-heading-rank
 *
 * @param {import("hast").Node} node
 * @returns {number | null}
 */
export function headingRank(node) {
  const name = node.type === "element" ? node.tagName.toLowerCase() : null;

  const code =
    name?.length === 2 && name.charCodeAt(0) === 104 /* `h` */
      ? name.charCodeAt(1)
      : null;

  return code > 48 /* `0` */ && code < 55 /* `7` */
    ? code - 48 /* `0` */
    : null;
}

/**
 * @typedef Options
 * @property {string[]} [ignoreParents=[]]
 */

/**
 *
 * @param {Options | undefined} [options]
 * @returns
 */
export default function rehypeSlug(options) {
  const settings = { ignoreParents: options?.ignoreParents ?? [] };

  /**
   * @param {Root} tree
   */
  return (tree) => {
    visit(tree, "element", (node, _index, parent) => {
      if (headingRank(node)) {
        if (parent && settings.ignoreParents.includes(parent.name)) {
          return;
        }

        const slug = slugify(nodeToString(node));
        node.properties.id = slug;
      }
    });
  };
}
