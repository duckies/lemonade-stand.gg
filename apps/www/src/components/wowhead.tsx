"use client";

import Script from "next/script";

export function Wowhead() {
  /**
   * TODO: Monkeypatch `WH.Icon.getIconUrl` to use our own icon server.
   */
  // const onLoad = () => {
  //   const _getIconUrl = window.WH.Icon.getIconUrl;

  //   window.WH.Icon.getIconUrl = function (...args: any[]) {
  //     const url = _getIconUrl.apply(this, args);

  //     return url;
  //   };
  // };

  return (
    <>
      <Script src="https://wow.zamimg.com/js/tooltips.js" strategy="lazyOnload" />
      <Script id="wowhead">{"let whTooltips = {colorLinks: false, iconizeLinks: false};"}</Script>
    </>
  );
}
