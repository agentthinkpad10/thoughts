import { createTRPCContext } from "@repo/api";

export function createContext(opts: { headers: Headers }) {
  return createTRPCContext(opts);
}
