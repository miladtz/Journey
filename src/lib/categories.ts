import { prisma } from "@/lib/db";

export function getAllCategories() {
  return prisma.category.findMany({ orderBy: { order: "asc" } });
}
