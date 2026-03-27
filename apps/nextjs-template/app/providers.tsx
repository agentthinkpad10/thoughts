"use client";

import { ThemeProvider } from "./components/theme-provider";
import { TRPCProvider } from "./trpc";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TRPCProvider>{children}</TRPCProvider>
    </ThemeProvider>
  );
}
