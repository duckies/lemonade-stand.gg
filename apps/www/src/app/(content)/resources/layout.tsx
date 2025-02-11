import { ImageZoom } from "components/markdown/image-zoom";
import type { ReactNode } from "react";

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ImageZoom />
    </>
  );
}
