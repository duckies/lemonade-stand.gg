import { Badge } from "components/markdown/badge";
import { Callout } from "components/markdown/callout";
import * as ClassColors from "components/markdown/class-colors";
import { MechanicPill } from "components/markdown/guides/mechanic-pill";
import * as Markers from "components/markdown/markers";
import { Mechanic } from "components/markdown/mechanic/mechanic";
import { ProseAnchor } from "components/markdown/prose/prose-anchor";
import { createProseHeader } from "components/markdown/prose/prose-header";
import { ProseImage } from "components/markdown/prose/prose-image";
import { Sparkles } from "components/markdown/sparkles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/markdown/tabs";
import { Video } from "components/markdown/video";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { JSX as ReactJSX } from "react";

declare global {
  type MDXProvidedComponents = typeof DefaultMDXComponents & typeof GuideMDXComponents;
  namespace JSX {
    type IntrinsicElements = ReactJSX.IntrinsicElements;
  }
}

export const DefaultMDXComponents = {
  h2: createProseHeader("h2"),
  h3: createProseHeader("h3"),
  h4: createProseHeader("h4"),
  img: ProseImage as any, // rehype-mdx-import-media can provide non-string values for `src
  Image,
  a: ProseAnchor,
  Video,
  Callout,
  Badge,
  Sparkles,
} as const satisfies MDXComponents;

export const GuideMDXComponents = {
  ...ClassColors,
  ...Markers,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Mechanic,
  MechanicPill,
} as const satisfies MDXComponents;
