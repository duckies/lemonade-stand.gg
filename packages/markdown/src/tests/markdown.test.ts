import { read } from "to-vfile";
import { describe, expect, test } from "vitest";
import { getMarkdown } from "..";

describe("markdown", () => {
  test("parses frontmatter", async () => {
    const result = await getMarkdown(await read("src/examples/basic.mdx"));

    expect(result.MDXContent).toBeTypeOf("function");
    expect(result.frontmatter).toEqual({
      title: "Example Markdown File",
      description: "This is an example markdown file.",
    });
  });

  test("passes exports", async () => {
    const result = await getMarkdown(await read("src/examples/exports.mdx"));

    expect(result.MDXContent).toBeTypeOf("function");
    expect(result.Example).toBeTypeOf("function");
  });
});
