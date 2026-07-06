import { requireAdminPage } from "@/lib/auth-guard";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminClientForm } from "@/components/admin/AdminClientForm";

export default async function NewClientPage() {
  await requireAdminPage();
  return (
    <>
      <AdminNav />
      <AdminClientForm />
    </>
  );
}
