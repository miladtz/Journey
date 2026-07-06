import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireClientApi } from "@/lib/auth-guard";
import { getOrCreateCart, toCartView } from "@/lib/cart";
import { orderShippingSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const session = await requireClientApi();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = orderShippingSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const cart = await getOrCreateCart();
  const cartView = toCartView(cart);
  if (cartView.items.length === 0) {
    return NextResponse.json({ error: "Your basket is empty" }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      clientId: session.user.id,
      subtotal: cartView.subtotal,
      currency: cartView.items[0].currency,
      ...parsed.data,
      items: {
        create: cartView.items.map((item) => ({
          productId: item.productId,
          nameEn: item.nameEn,
          nameFa: item.nameFa,
          price: item.price,
          quantity: item.quantity,
          color: item.color ?? "",
        })),
      },
    },
  });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return NextResponse.json({ id: order.id });
}
