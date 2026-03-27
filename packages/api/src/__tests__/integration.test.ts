import { describe, it, expect, beforeEach } from "vitest";
import { db } from "@repo/db";
import {
  router,
  publicProcedure,
  createCallerFactory,
  createTRPCContext,
} from "../index";
import { z } from "zod";

// Example router matching the app routers — tests the full
// tRPC → Prisma → SQLite round trip.
const appRouter = router({
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

const createCaller = createCallerFactory(appRouter);

function createTestCaller() {
  return createCaller(
    createTRPCContext({ headers: new Headers() }),
  );
}

describe("tRPC → Prisma integration", () => {
  beforeEach(async () => {
    await db.message.deleteMany();
  });

  it("hello query returns greeting", async () => {
    const caller = createTestCaller();
    const result = await caller.hello({ name: "World" });
    expect(result.greeting).toBe("Hello, World!");
  });

  it("echo mutation persists to database", async () => {
    const caller = createTestCaller();
    const result = await caller.echo({ text: "test message" });

    expect(result.message).toBe('Backend received text "test message"');

    const messages = await db.message.findMany();
    expect(messages).toHaveLength(1);
    expect(messages[0]!.text).toBe("test message");
  });

  it("messages query returns persisted messages in desc order", async () => {
    const caller = createTestCaller();

    await caller.echo({ text: "first" });
    await caller.echo({ text: "second" });
    await caller.echo({ text: "third" });

    const result = await caller.messages();
    expect(result).toHaveLength(3);
    expect(result[0]!.text).toBe("third");
    expect(result[1]!.text).toBe("second");
    expect(result[2]!.text).toBe("first");
  });

  it("full round trip: mutate → query → verify", async () => {
    const caller = createTestCaller();

    // Write
    const echo = await caller.echo({ text: "round trip" });
    expect(echo.message).toContain("round trip");

    // Read back via tRPC
    const messages = await caller.messages();
    expect(messages).toHaveLength(1);
    expect(messages[0]!.text).toBe("round trip");
    expect(messages[0]!.id).toBeDefined();
    expect(messages[0]!.createdAt).toBeInstanceOf(Date);
  });
});
