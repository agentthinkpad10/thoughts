import { createNextHandler } from "@repo/api/adapters/next";
import { appRouter } from "../../../server/router";
import { createContext } from "../../../server/context";

const handler = createNextHandler({
  router: appRouter,
  createContext,
});

export { handler as GET, handler as POST };
