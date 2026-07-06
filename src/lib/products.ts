import { prisma } from "@/lib/db";

const include = {
  images: { orderBy: { order: "asc" as const } },
  specs: { orderBy: { order: "asc" as const } },
};

export function getAllProducts() {
  return prisma.product.findMany({ include, orderBy: { createdAt: "desc" } });
}

export function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true },
    include,
    orderBy: { createdAt: "desc" },
  });
}

export function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug }, include });
}
