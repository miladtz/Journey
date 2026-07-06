import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getOrCreateCart, toCartView } from "@/lib/cart";

const updateSchema = z.object({
  quantity: z.number().int().min(0).max(10),
});

async function assertOwnership(itemId: string, cartId: string) {
  const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
  return item && item.cartId === cartId ? item : null;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params;
  const body = updateSchema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const cart = await getOrCreateCart();
  const item = await assertOwnership(itemId, cart.id);
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  if (body.data.quantity === 0) {
    await prisma.cartItem.delete({ where: { id: itemId } });
  } else {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    const quantity = Math.min(body.data.quantity, product?.stock ?? body.data.quantity);
    await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
  }

  const updated = await getOrCreateCart();
  return NextResponse.json(toCartView(updated));
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params;
  const cart = await getOrCreateCart();
  const item = await assertOwnership(itemId, cart.id);
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id: itemId } });
  const updated = await getOrCreateCart();
  return NextResponse.json(toCartView(updated));
}
