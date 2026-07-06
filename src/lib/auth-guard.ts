import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Call at the top of an admin Server Component; redirects guests to sign in. */
export async function requireAdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }
  return session;
}

/** Call at the top of an admin API route; returns null when unauthorized. */
export async function requireAdminApi() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}
