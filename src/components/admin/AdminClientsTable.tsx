"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import type { ClientWithOrderCount } from "@/types";

export function AdminClientsTable({
  clients,
  query,
}: {
  clients: ClientWithOrderCount[];
  query: string;
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const c = t.admin.clients;
  const [search, setSearch] = useState(query);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      router.push(params.size ? `/admin/clients?${params}` : "/admin/clients");
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{c.title}</h1>
          <p className="mt-1 text-sm text-muted">{c.subtitle}</p>
        </div>
      </div>

      <div className="relative mt-6 max-w-md">
        <Search className="pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={c.searchPlaceholder}
          className="w-full rounded-xl border border-border bg-surface py-2.5 ps-9 pe-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        {clients.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">{c.empty}</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-start text-muted">
                <th className="px-5 py-3 text-start font-medium">{c.colName}</th>
                <th className="px-5 py-3 text-start font-medium">{c.colPhone}</th>
                <th className="px-5 py-3 text-start font-medium">{c.colEmail}</th>
                <th className="px-5 py-3 text-start font-medium">{c.colLocation}</th>
                <th className="px-5 py-3 text-start font-medium">{c.colOrders}</th>
                <th className="px-5 py-3 text-end font-medium">{c.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="px-5 py-3 font-medium text-foreground">
                    {client.firstName} {client.lastName}
                  </td>
                  <td className="px-5 py-3 text-foreground">{client.phone}</td>
                  <td className="px-5 py-3 text-foreground">{client.email}</td>
                  <td className="px-5 py-3 text-foreground">
                    {[client.city, client.country].filter(Boolean).join(", ")}
                  </td>
                  <td className="px-5 py-3 text-foreground">{client._count.orders}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end">
                      <Button href={`/admin/clients/${client.id}`} variant="secondary" size="sm">
                        {c.view}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
