"use client";

import { TooltipProvider } from "@lemonade-stand/ui";
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query";
import { Provider } from "jotai";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();

  return (
    <Provider>
      <NuqsAdapter>
        <TooltipProvider>
          <ThemeProvider defaultTheme="dark" attribute="data-theme">
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            <ProgressBar
              height="3px"
              color="var(--color-primary)"
              options={{ showSpinner: false }}
              shallowRouting
            />
          </ThemeProvider>
        </TooltipProvider>
      </NuqsAdapter>
    </Provider>
  );
}
