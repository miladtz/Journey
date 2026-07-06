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

/** Call at the top of a client-facing Server Component; redirects guests to sign in. */
export async function requireClientPage(callbackUrl?: string) {
  const session = await auth();
  if (!session || session.user.role !== "CLIENT") {
    redirect(callbackUrl ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/login");
  }
  return session;
}

/** Call at the top of a client-facing API route; returns null when unauthorized. */
export async function requireClientApi() {
  const session = await auth();
  if (!session || session.user.role !== "CLIENT") {
    return null;
  }
  return session;
}
