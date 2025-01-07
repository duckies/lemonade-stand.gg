import type { Metadata } from "next";

import "styles/globals.css";
import "styles/wowhead.css";

import { cn } from "@lemonade-stand/ui";
import { Footer } from "components/footer";
import { Header } from "components/header";
import { ThemeSwitcher } from "components/theme-switcher";
import { UserNav } from "components/user-nav";
import { Lexend } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "./providers";
import { website } from "~/config";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lemonade-stand.gg"),
  alternates: {
    canonical: "/"
  },
  title: website.metadata.title,
  description: website.metadata.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: website.metadata.title,
    description: website.metadata.description,
    type: "website",
    url: "https://www.lemonade-stand.gg",
    siteName: website.metadata.title.default,
  }
};

// const fontSans = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   display: "swap",
//   variable: "--font-sans",
// });

const fontSans = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans",
});

const fontSerif = localFont({
  src: [
    {
      path: "../../public/fonts/recoleta/recoleta-bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/recoleta/recoleta-semibold.ttf",
      weight: "600",
    },
    {
      path: "../../public/fonts/recoleta/recoleta-medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/recoleta/recoleta-regular.ttf",
      weight: "400",
    },
  ],
  weight: "700",
  variable: "--font-serif",
});

const fontMono = localFont({
  src: [
    {
      path: "../../public/fonts/maple-mono/maplemono-regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-mono",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(fontSans.className, fontSerif.variable, fontMono.variable)}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header>
              <ThemeSwitcher />
              <UserNav />
            </Header>
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
