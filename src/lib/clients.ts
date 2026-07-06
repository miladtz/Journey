import { prisma } from "@/lib/db";

export function searchClients(query?: string) {
  const where = query
    ? {
        OR: [
          { firstName: { contains: query } },
          { lastName: { contains: query } },
          { email: { contains: query } },
          { phone: { contains: query } },
          { address: { contains: query } },
          { city: { contains: query } },
        ],
      }
    : undefined;

  return prisma.client.findMany({
    where,
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export function getClientWithOrders(id: string) {
  return prisma.client.findUnique({
    where: { id },
    include: {
      orders: {
        include: { items: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
