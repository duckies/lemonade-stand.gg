import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

export interface ProseImageProps
  extends Omit<ComponentPropsWithoutRef<"img">, "src" | "width" | "height"> {
  src: StaticImageData | string;
}

/**
 * The `rehype-mdx-import-media` plugin will replace relative image paths with imported ones which resolve to {@link StaticImageData}. We can use this to obtain the image dimensions and thus use the {@link Image} component without having to manually specify dimensions.
 */
export function ProseImage({ src, alt, ...props }: ProseImageProps) {
  if (typeof src !== "string") {
    return <Image src={src} placeholder="blur" {...props} alt={alt || ""} />;
  }

  return <img src={src} alt={alt || ""} {...props} />;
}
