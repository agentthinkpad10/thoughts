import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AnyTRPCRouter } from "@trpc/server";
import { QueryClient } from "@tanstack/svelte-query";
import superjson from "superjson";

interface CreateOptions {
  url: string;
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
    },
  });
}

/**
 * Creates a typed tRPC client for use with TanStack Svelte Query.
 *
 * Usage in your app:
 * ```ts
 * // src/lib/trpc.ts
 * import { createTRPCSvelteClient } from "@repo/svelte-query";
 * import type { AppRouter } from "./server/router";
 *
 * export const trpc = createTRPCSvelteClient<AppRouter>({ url: "/api/trpc" });
 * ```
 *
 * Then in components:
 * ```svelte
 * <script lang="ts">
 *   import { createQuery } from "@tanstack/svelte-query";
 *   import { trpc } from "$lib/trpc";
 *
 *   const hello = createQuery({
 *     queryKey: ["hello", { name: "World" }],
 *     queryFn: () => trpc.hello.query({ name: "World" }),
 *   });
 * </script>
 * ```
 */
export function createTRPCSvelteClient<TRouter extends AnyTRPCRouter>(
  opts: CreateOptions,
) {
  return createTRPCClient<TRouter>({
    links: [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (httpBatchLink as any)({
        url: opts.url,
        transformer: superjson,
      }),
    ],
  });
}
