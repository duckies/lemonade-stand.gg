import type { MDXComponents } from "mdx/types";
import { DefaultMDXComponents } from "components/markdown";

/**
 * This is a required export for global MDX components.
 *
 * @see https://nextjs.org/docs/pages/building-your-application/configuring/mdx#global-styles-and-components
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...DefaultMDXComponents,
    ...components,
  };
}
