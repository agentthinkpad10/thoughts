import { router, publicProcedure } from "@repo/api";
import { z } from "zod";

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello, ${input.name}!` };
    }),

  echo: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.db.message.create({
        data: { text: input.text },
      });
      return { message: `Backend received text "${message.text}"` };
    }),

  messages: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }),
});

export type AppRouter = typeof appRouter;
