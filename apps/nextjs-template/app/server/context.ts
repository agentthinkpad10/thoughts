import { createTRPCContext } from "@repo/api";
import { auth } from "../../auth";

export async function createContext(opts: { headers: Headers }) {
  const base = createTRPCContext(opts);
  const session = await auth();
  return { ...base, session, user: session?.user ?? null };
}

export type AppContext = Awaited<ReturnType<typeof createContext>>;
