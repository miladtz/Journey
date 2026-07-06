import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/auth-guard";
import { clientRegisterSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const session = await requireAdminApi();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = clientRegisterSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { email, phone, password, ...rest } = parsed.data;

  const existing = await prisma.client.findFirst({ where: { OR: [{ email }, { phone }] } });
  if (existing) {
    const field = existing.email === email ? "email" : "phone";
    return NextResponse.json({ error: `A client with this ${field} already exists` }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const client = await prisma.client.create({
    data: { ...rest, email, phone, passwordHash },
  });

  return NextResponse.json({ id: client.id }, { status: 201 });
}
