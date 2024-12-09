import { type ComponentPropsWithRef, useEffect, useRef } from "react";

/**
 * Next.js SSR workaround because `img.onError` doesn't work in SSR.
 * @see https://github.com/facebook/react/issues/15446#issuecomment-484699248
 */
function isImageValid(src: string, validator?: (img: HTMLImageElement) => boolean) {
  const promise = new Promise((resolve) => {
    const img = document.createElement("img");
    img.onerror = () => resolve(false);
    img.onload = () => {
      if (validator) {
        resolve(validator(img));
      }
      resolve(true);
    };
    img.src = src;
  });

  return promise;
}

export type ImgProps = Omit<ComponentPropsWithRef<"img">, "src"> & {
  src: string;
  "data-fallback"?: string;
  validator?: (img: HTMLImageElement) => boolean;
};

export function ImageWithFallback({ src, validator, ...props }: ImgProps) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    isImageValid(src, validator).then((isValid) => {
      if (ref.current && props["data-fallback"] && !isValid) {
        ref.current.src = props["data-fallback"];
      }
    });
  }, [src, props["data-fallback"], validator]);

  return <img ref={ref} src={src} {...props} />;
}
