import { createTRPCNextQuery } from "@repo/nextjs-query";
import type { AppRouter } from "./server/router";

export const { TRPCProvider, useTRPC } = createTRPCNextQuery<AppRouter>({
  url: "/api/trpc",
});
