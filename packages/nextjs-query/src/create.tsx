"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { TRPCLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AnyTRPCRouter } from "@trpc/server";
import superjson from "superjson";
import { getQueryClient } from "./query-client";

interface CreateOptions {
  url: string;
}

/**
 * Creates a fully-wired tRPC + TanStack Query setup for a Next.js app.
 *
 * Usage in your app:
 * ```ts
 * import { createTRPCNextQuery } from "@repo/nextjs-query";
 * import type { AppRouter } from "./server/router";
 *
 * export const { TRPCProvider, useTRPC } = createTRPCNextQuery<AppRouter>({
 *   url: "/api/trpc",
 * });
 * ```
 */
export function createTRPCNextQuery<TRouter extends AnyTRPCRouter>(
  opts: CreateOptions,
) {
  const { TRPCProvider: BaseTRPCProvider, useTRPC } =
    createTRPCContext<TRouter>();

  function TRPCProvider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();
    const [trpcClient] = useState(() =>
      createTRPCClient<TRouter>({
        links: [
          // The generic constraint on AnyTRPCRouter can't narrow
          // transformer options — safe since our server always uses superjson.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (httpBatchLink as any)({
            url: opts.url,
            transformer: superjson,
          }),
        ],
      }),
    );

    return (
      <BaseTRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </BaseTRPCProvider>
    );
  }

  return { TRPCProvider, useTRPC, getQueryClient };
}
