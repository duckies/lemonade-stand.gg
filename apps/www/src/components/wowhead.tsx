"use client";

import Script from "next/script";
import { useEffect } from "react";

export function Wowhead() {
  useEffect(() => {
    // @ts-ignore
    window?.WH?.Tooltips?.init();
  }, [])

  return (
    <>
      <Script src="https://wow.zamimg.com/js/tooltips.js" strategy="lazyOnload" />
      <Script id="wowhead">{"let whTooltips = {colorLinks: false, iconSize: true};"}</Script>
    </>
  );
}
