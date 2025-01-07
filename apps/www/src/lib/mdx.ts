import { notFound } from "next/navigation";

export interface Frontmatter {
  title: string;
  description: string;
  publishedAt?: string;
}

export interface RaidGuideFrontmatter extends Frontmatter {
  title: string;
  description: string;
  fight: {
    name: string;
    slug: string;
    icon: string;
  };
}

export async function getMDXByPath(slugs: string[]) {
  const path = `content/${slugs.join("/")}`;

  try {
    const { default: MDXContent, frontmatter } = await import(`#${path}.mdx`);
    return { MDXContent, frontmatter };
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "MODULE_NOT_FOUND") {
      // Don't swallow errors unrelated to not finding the file.
      notFound();
    }

    throw error;
  }
}

