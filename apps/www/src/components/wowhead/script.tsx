"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Overrides the Wowhead icon URL to use our upscaled CDN.
 */
function patchWowhead() {
  if (!window?.WH) return;

  const getIconUrl = window.WH.Icon.getIconUrl;

  window.WH.Icon.getIconUrl = (...args: any[]) => {
    const url = getIconUrl(...args);

    // I have modified the CDN to redirect to Wowhead icons where necessary,
    // but I can check if args[2] === 1 to know if we're requesting a mainline wow icon.
    if (url.startsWith("https://wow.zamimg.com/images/wow/icons/")) {
      const fileName = url.split("/").pop()!;
      return `https://cdn.lemonade-stand.gg/icons/${encodeURIComponent(fileName)}`;
    }

    return url;
  };
}

export function Wowhead() {
  useEffect(() => {
    window?.WH?.Tooltips?.init();
  }, []);

  return (
    <>
      <Script
        src="https://wow.zamimg.com/js/tooltips.js"
        strategy="lazyOnload"
        onLoad={patchWowhead}
      />
      <Script id="wowhead">{"let whTooltips = {colorLinks: false, iconSize: true};"}</Script>
    </>
  );
}
