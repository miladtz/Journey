import { notFound } from "next/navigation";
import { requireAdminPage } from "@/lib/auth-guard";
import { getClientWithOrders } from "@/lib/clients";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminClientDetail } from "@/components/admin/AdminClientDetail";

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPage();
  const { id } = await params;
  const client = await getClientWithOrders(id);
  if (!client) {
    notFound();
  }

  return (
    <>
      <AdminNav />
      <AdminClientDetail client={client} />
    </>
  );
}
