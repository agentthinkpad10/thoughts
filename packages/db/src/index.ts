import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  return new PrismaClient({
    adapter,
    transactionOptions: {
      maxWait: 10000,
      timeout: 30000,
    },
  });
}

export const db = globalForPrisma.prisma ?? createClient();

globalForPrisma.prisma = db;

export type { PrismaClient };
export { Prisma } from "./generated/prisma/client";
