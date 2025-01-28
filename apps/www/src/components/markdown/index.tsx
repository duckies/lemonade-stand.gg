import { Badge } from "components/markdown/badge";
import { Callout } from "components/markdown/callout";
import * as ClassColors from "components/markdown/class-colors";
import * as Markers from "components/markdown/markers";
import { Mechanic } from "components/markdown/mechanic";
import { ProseAnchor } from "components/markdown/prose/prose-anchor";
import { createProseHeader } from "components/markdown/prose/prose-header";
import { ProseImage } from "components/markdown/prose/prose-image";
import { Sparkles } from "components/markdown/sparkles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/markdown/tabs";
import { Video } from "components/markdown/video";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";

declare global {
  type MDXProvidedComponents = typeof DefaultMDXComponents & typeof GuideMDXComponents;
}

export const DefaultMDXComponents = {
  h2: createProseHeader("h2"),
  h3: createProseHeader("h3"),
  h4: createProseHeader("h4"),
  img: ProseImage,
  Image,
  a: ProseAnchor,
  Video,
  Callout,
  Badge,
  Sparkles,
} as const satisfies MDXComponents;

console.log(Tabs);

export const GuideMDXComponents = {
  ...ClassColors,
  ...Markers,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Mechanic,
} as const satisfies MDXComponents;
