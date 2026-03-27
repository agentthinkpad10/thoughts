import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { AnyTRPCRouter } from "@trpc/server";
import type { CreateContextOptions } from "../trpc";

/**
 * Creates a tRPC handler for SvelteKit.
 * The event parameter matches SvelteKit's RequestEvent shape.
 */
export function createSvelteHandler<TRouter extends AnyTRPCRouter>(opts: {
  router: TRouter;
  createContext: (opts: CreateContextOptions) => Promise<any> | any;
  endpoint?: string;
}) {
  return (event: { request: Request }) =>
    fetchRequestHandler({
      endpoint: opts.endpoint ?? "/api/trpc",
      req: event.request,
      router: opts.router,
      createContext: () =>
        opts.createContext({ headers: event.request.headers }),
    });
}
