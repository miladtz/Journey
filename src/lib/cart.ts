import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import type { CartItemView, CartView } from "@/types";
import type { Prisma } from "@/generated/prisma/client";

export const CART_COOKIE = "cart_session";

const cartInclude = {
  items: {
    orderBy: { createdAt: "asc" as const },
    include: {
      product: {
        include: { images: { orderBy: { order: "asc" as const } } },
      },
    },
  },
} satisfies Prisma.CartInclude;

type CartWithItems = Prisma.CartGetPayload<{ include: typeof cartInclude }>;

/** Reads the guest cart session cookie, creating one if this is a first-time visitor. */
export async function getOrCreateCart(): Promise<CartWithItems> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(CART_COOKIE)?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    cookieStore.set(CART_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }

  return prisma.cart.upsert({
    where: { sessionId },
    update: {},
    create: { sessionId },
    include: cartInclude,
  });
}

export function toCartView(cart: CartWithItems): CartView {
  const items: CartItemView[] = cart.items.map((item) => {
    const image =
      item.product.images.find((img) => img.colorName === item.color)?.url ??
      item.product.images[0]?.url ??
      null;

    return {
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      color: item.color || null,
      slug: item.product.slug,
      nameEn: item.product.nameEn,
      nameFa: item.product.nameFa,
      price: item.product.price,
      currency: item.product.currency,
      image,
      stock: item.product.stock,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { id: cart.id, items, subtotal };
}
