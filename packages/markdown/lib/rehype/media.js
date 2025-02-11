/**
 * @typedef {import("hast").Root} Root
 * @typedef {import("vfile").VFile} VFile
 */

export default function rehypeMedia() {
  /*
  * @param {Root} tree
  */
  return (tree, vfile) => {
    const frontmatter = vfile.data.matter;

    if (frontmatter?.hero?.background) {
      tree.children.unshift({
        type: "mdxjsEsm",
        value: "",
        data: {
          estree: {
            type: "Program",
            sourceType: "module",
            body: [{
              type: "ImportDeclaration",
              source: { type: "Literal", value: `public/${frontmatter.hero.background}` },
              specifiers: [
                {
                  type: "ImportDefaultSpecifier",
                  local: {
                    type: "Identifier",
                    name: "_heroBackground"
                  }
                }
              ]
            }]
          }
        }
      })
    }
  }
}