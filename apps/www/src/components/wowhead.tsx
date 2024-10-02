import Script from "next/script";

export function Wowhead() {
  return (
    <>
      <Script src="https://wow.zamimg.com/js/tooltips.js" strategy="lazyOnload" />
      <Script>{"const whTooltips = {colorLinks: true, iconizeLinks: true};"}</Script>
    </>
  );
}
