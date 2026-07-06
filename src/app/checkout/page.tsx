import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session || session.user.role !== "CLIENT") {
    redirect("/login?callbackUrl=/checkout");
  }

  const client = await prisma.client.findUniqueOrThrow({ where: { id: session.user.id } });

  return (
    <CheckoutForm
      initialValues={{
        address: client.address,
        city: client.city,
        postalCode: client.postalCode,
        country: client.country,
      }}
    />
  );
}
