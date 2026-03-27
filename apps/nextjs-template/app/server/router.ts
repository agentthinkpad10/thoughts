import { initTRPC, TRPCError } from "@trpc/server";
import { createCallerFactory, mergeRouters } from "@repo/api";
import superjson from "superjson";
import { z } from "zod";
import type { AppContext } from "./context";
import { analyzeThought } from "./ai";

const t = initTRPC.context<AppContext>().create({ transformer: superjson });

const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user?.id) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { ...ctx, user: ctx.user } });
});

export const appRouter = t.router({
  thoughts: t.router({
    create: protectedProcedure
      .input(z.object({ text: z.string().min(1).max(10000), parentThoughtId: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        // 1. Call Claude to extract categories (fail gracefully)
        let analysis = { categories: [] as string[] };
        try {
          analysis = await analyzeThought(input.text);
        } catch (e) {
          console.error("AI error:", e);
        }

        // 2. Upsert global categories (userId: null = AI-extracted)
        const categoryIds = await Promise.all(
          analysis.categories.map((name) =>
            ctx.db.category
              .upsert({
                where: { name_userId: { name, userId: null as any } },
                create: { name, userId: null },
                update: {},
              })
              .then((c) => c.id)
          )
        );

        // 3. Create thought + join rows in one transaction
        return ctx.db.$transaction(async (tx) => {
          const thought = await tx.thought.create({
            data: {
              text: input.text,
              userId: ctx.user.id,
              parentThoughtId: input.parentThoughtId,
              thoughtCategories: {
                create: categoryIds.map((categoryId) => ({ categoryId })),
              },
            },
            include: {
              thoughtCategories: { include: { category: true } },
              children: true,
            },
          });
          return thought;
        });
      }),

    list: protectedProcedure
      .input(z.object({ categoryId: z.string().optional(), parentThoughtId: z.string().optional() }))
      .query(async ({ ctx, input }) => {
        return ctx.db.thought.findMany({
          where: {
            userId: ctx.user.id,
            parentThoughtId: input.parentThoughtId ?? null,
            ...(input.categoryId && {
              thoughtCategories: { some: { categoryId: input.categoryId } },
            }),
          },
          include: {
            thoughtCategories: { include: { category: true } },
            children: { select: { id: true, text: true, createdAt: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 50,
        });
      }),

    byId: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ ctx, input }) => {
        const thought = await ctx.db.thought.findUnique({
          where: { id: input.id },
          include: {
            thoughtCategories: { include: { category: true } },
            children: { orderBy: { createdAt: "desc" } },
            parent: true,
          },
        });

        if (!thought || thought.userId !== ctx.user.id) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        return thought;
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const thought = await ctx.db.thought.findUnique({ where: { id: input.id } });

        if (!thought || thought.userId !== ctx.user.id) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        return ctx.db.thought.delete({ where: { id: input.id } });
      }),
  }),

  categories: t.router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return ctx.db.category.findMany({
        where: {
          OR: [
            { userId: null, thoughtCategories: { some: { thought: { userId: ctx.user.id } } } },
            { userId: ctx.user.id },
          ],
        },
        orderBy: { name: "asc" },
      });
    }),

    create: protectedProcedure
      .input(z.object({ name: z.string().min(1).max(50) }))
      .mutation(async ({ ctx, input }) => {
        return ctx.db.category.upsert({
          where: { name_userId: { name: input.name, userId: ctx.user.id } },
          create: { name: input.name, userId: ctx.user.id },
          update: {},
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
