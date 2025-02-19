"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    WH?: {
      Icon: {
        getIconUrl: (...args: any[]) => string;
      };
      Tooltips: {
        init: () => void;
      };
    };
    $WowheadPower?: {
      refreshLinks: () => void;
    };
  }
}

/**
 * Overrides the Wowhead icon URL to use our upscaled CDN.
 */
function patchWowhead() {
  if (!window?.WH) return;

  const getIconUrl = window.WH.Icon.getIconUrl;

  window.WH.Icon.getIconUrl = (...args: any[]) => {
    const url = getIconUrl(...args);

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
        // Disabled until I can gracefully handle not having icons yet, e.g. PTR icons.
        // onLoad={patchWowhead}
      />
      <Script id="wowhead">{"let whTooltips = {colorLinks: false, iconSize: true};"}</Script>
    </>
  );
}
