import { requireAdminPage } from "@/lib/auth-guard";
import { searchClients } from "@/lib/clients";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminClientsTable } from "@/components/admin/AdminClientsTable";

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdminPage();
  const { q } = await searchParams;
  const clients = await searchClients(q);

  return (
    <>
      <AdminNav />
      <AdminClientsTable clients={clients} query={q ?? ""} />
    </>
  );
}
