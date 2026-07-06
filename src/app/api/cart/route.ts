import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getOrCreateCart, toCartView } from "@/lib/cart";

export async function GET() {
  const cart = await getOrCreateCart();
  return NextResponse.json(toCartView(cart));
}

const addItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(10).default(1),
  color: z.string().nullable().optional(),
});

export async function POST(request: Request) {
  const body = addItemSchema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { productId, quantity } = body.data;
  const color = body.data.color ?? "";

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const cart = await getOrCreateCart();
  const existing = await prisma.cartItem.findUnique({
    where: {
      cartId_productId_color: {
        cartId: cart.id,
        productId,
        color,
      },
    },
  });

  const nextQuantity = Math.min((existing?.quantity ?? 0) + quantity, product.stock);

  await prisma.cartItem.upsert({
    where: {
      cartId_productId_color: {
        cartId: cart.id,
        productId,
        color,
      },
    },
    update: { quantity: nextQuantity },
    create: { cartId: cart.id, productId, color, quantity: nextQuantity },
  });

  const updated = await getOrCreateCart();
  return NextResponse.json(toCartView(updated));
}
