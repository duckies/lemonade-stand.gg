import type { Metadata } from "next";
import "~/styles/details.css";
import "~/styles/globals.css";
import "~/styles/tiptap.css";

import { cn } from "@lemonade-stand/ui";
import { ThemeProvider } from "next-themes";
import { Inter, Permanent_Marker } from "next/font/google";
import { Decorations } from "~/components/decorations";
import { Footer } from "~/components/footer";
// import { AnimatedLayout } from "~/components/animated-layout";
import { Header } from "~/components/header";

export const metadata: Metadata = {
  title: "Lemonade Stand · Illidan",
  description: "Premiere lemon-scented guild of Illidan",
};

const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const fontSerif = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(fontSans.className, fontSerif.variable, "grain")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <Decorations />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
