import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Prisma 7 always connects through a driver adapter instead of a bundled
// engine reading DATABASE_URL directly — this is the SQLite one.
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });

// Next.js reloads modules on every edit in dev, which would otherwise create
// a fresh PrismaClient (and a fresh pool of DB connections) per hot reload.
// Stashing the instance on `globalThis` survives that reload.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
