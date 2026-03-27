import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { AnyTRPCRouter } from "@trpc/server";
import type { CreateContextOptions } from "../trpc";

export function createNextHandler<TRouter extends AnyTRPCRouter>(opts: {
  router: TRouter;
  createContext: (opts: CreateContextOptions) => Promise<any> | any;
  endpoint?: string;
}) {
  return (req: Request) =>
    fetchRequestHandler({
      endpoint: opts.endpoint ?? "/api/trpc",
      req,
      router: opts.router,
      createContext: () => opts.createContext({ headers: req.headers }),
    });
}
