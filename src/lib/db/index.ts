/**
 * Cliente de Prisma (singleton).
 *
 * Prisma v7 con SQLite usa el adapter libsql.
 * En desarrollo, Next.js hace hot-reload y crea múltiples instancias.
 * Este patrón garantiza que solo exista una conexión a la DB.
 */

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function makePrisma() {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
