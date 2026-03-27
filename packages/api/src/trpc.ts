import { initTRPC } from "@trpc/server";
import { db } from "@repo/db";
import superjson from "superjson";

export interface CreateContextOptions {
  headers: Headers;
}

/**
 * Base context factory. Apps can extend this by spreading
 * the result and adding their own fields.
 */
export function createTRPCContext(opts: CreateContextOptions) {
  return {
    db,
    headers: opts.headers,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
export const mergeRouters = t.mergeRouters;
