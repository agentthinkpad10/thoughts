import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { afterAll } from "vitest";
import { db } from "@repo/db";

const __dirname = dirname(fileURLToPath(import.meta.url));
const prismaDir = resolve(__dirname, "../../../db/prisma");

// Push schema to the test database (DATABASE_URL comes from .env.test via dotenv-cli)
execSync("bunx prisma db push --force-reset --skip-generate", {
  cwd: prismaDir,
  stdio: "pipe",
});

afterAll(async () => {
  await db.$disconnect();
});
