"use client";

import Script from "next/script";

export function Wowhead() {
  return (
    <>
      <Script src="https://wow.zamimg.com/js/tooltips.js" strategy="lazyOnload" />
      <Script id="wowhead">{"let whTooltips = {colorLinks: true, iconizeLinks: false};"}</Script>
    </>
  );
}
