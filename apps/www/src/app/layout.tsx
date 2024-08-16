import type { Metadata } from "next";
import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Lemonade Stand · Illidan",
  description: "Premiere lemon-scented guild of Illidan",
  icons: [{ rel: "icon", url: "./favicon.ico" }],
};

const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={fontSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="relative">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
