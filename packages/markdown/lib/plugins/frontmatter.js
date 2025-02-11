/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('vfile').VFile} VFile
 */

import { matter } from "vfile-matter";

export default function frontmatterPlugin() {
  /**
   * Transform
   * 
   * @param {Node} tree
   * @param {VFile} vfile
   * @returns {void}
   */
  return (_tree, vfile) => {
    matter(vfile);
  }
} 