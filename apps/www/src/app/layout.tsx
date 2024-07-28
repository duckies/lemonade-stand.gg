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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
