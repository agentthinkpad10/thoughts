import { createTRPCSvelteClient } from "@repo/svelte-query";
import type { AppRouter } from "./server/router";

export const trpc = createTRPCSvelteClient<AppRouter>({ url: "/api/trpc" });
