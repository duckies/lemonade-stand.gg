/**
 * @typedef {import("hast").Root} Root
 * @typedef {import("vfile").VFile} VFile
 */

import { valueToEstree } from "estree-util-value-to-estree";
import { toString as nodeToString } from "hast-util-to-string";
import { visit } from "unist-util-visit";
import { headingRank } from "./slug.js";

/**
 *
 * @typedef Headings
 * @property {string} id
 * @property {number} level
 * @property {string} value
 */

export default function rehypeToc() {
  /**
   * @param {Root} tree
   * @param {VFile} vfile
   */
  return (tree, vfile) => {
    const headings = [];

    /**
     * @param {import("hast").Node} node
     */
    function onHeading(node) {
      const level = headingRank(node);

      if (level && node.properties?.id) {
        const heading = {
          id: node.properties.id,
          depth: level,
          value: nodeToString(node),
        };

        headings.push(heading);
      }
    }

    /**
     *
     * @param {Headings[]} headings
     */
    function createTree(headings) {
      const root = { depth: 0, children: [] };
      const parents = [];
      let previous = root;

      headings.forEach((heading) => {
        if (heading.depth > previous.depth) {
          if (previous.children === undefined) {
            previous.children = [];
          }
          parents.push(previous);
        } else if (heading.depth < previous.depth) {
          while (parents[parents.length - 1].depth >= heading.depth) {
            parents.pop();
          }
        }

        parents[parents.length - 1].children.push(heading);
        previous = heading;
      });

      return root.children;
    }

    visit(tree, "element", onHeading);

    vfile.data.toc = createTree(headings) || [];

    tree.children.unshift({
      type: "mdxjsEsm",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              source: null,
              specifiers: [],
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "toc" },
                    init: valueToEstree(vfile.data.toc),
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
}
