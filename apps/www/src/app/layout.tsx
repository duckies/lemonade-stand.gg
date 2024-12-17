import type { Metadata } from "next";

import "~/styles/globals.css";
import "~/styles/wowhead.css";

import { cn } from "@lemonade-stand/ui";
import { Lexend } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { UserNav } from "~/components/user-nav";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Lemonade Stand · Illidan",
  description: "Premiere lemon-scented guild of Illidan",
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
      <body className={cn(fontSans.className, fontSerif.variable, fontMono.variable, "grain")}>
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
