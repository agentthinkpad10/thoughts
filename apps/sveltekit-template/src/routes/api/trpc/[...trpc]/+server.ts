import { createSvelteHandler } from "@repo/api/adapters/svelte";
import { appRouter } from "$lib/server/router";
import { createContext } from "$lib/server/context";
import type { RequestHandler } from "./$types";

const handler = createSvelteHandler({
  router: appRouter,
  createContext,
  endpoint: "/api/trpc",
});

export const GET: RequestHandler = (event) => handler(event);
export const POST: RequestHandler = (event) => handler(event);
