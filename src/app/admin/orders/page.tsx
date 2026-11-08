"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminOrdersRequest, date, money, orderStatuses, paymentStatuses, type OrderSummary } from "@/lib/adminOrders";

type OrderList = { orders: OrderSummary[]; total: number; page: number; pageSize: number };

export default function AdminOrdersPage() {
  const [result, setResult] = useState<OrderList | null>(null);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError("");
    const params = new URLSearchParams({ page: String(page) });
    if (status) params.set("status", status);
    adminOrdersRequest<OrderList>(`?${params}`, { signal: controller.signal })
      .then((data) => { if (!controller.signal.aborted) setResult(data); })
      .catch((err) => { if (!controller.signal.aborted) setError(err instanceof Error ? err.message : "Kunde inte hämta beställningarna."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [page, status, version]);

  return (
    <main className="w-[90%] max-w-[1200px] mx-auto font-primary">
      <h1 className="font-cursive text-5xl md:text-6xl mb-4">Beställningar</h1>
      <p className="text-sm mb-8">Öppna en beställning för att se innehåll, kunduppgifter och hantera leveransen.</p>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <label className="text-sm">Orderstatus
          <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="block border border-[#ccc] bg-white rounded-md px-4 py-3 mt-2">
            <option value="">Alla beställningar</option>
            {Object.entries(orderStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <button type="button" onClick={() => setVersion((value) => value + 1)} disabled={loading} className="border border-[#ccc] px-4 py-3 rounded-md disabled:opacity-50">Uppdatera listan</button>
      </div>
      {loading && <p role="status">Hämtar beställningar…</p>}
      {error && <p role="alert" className="text-[#a52222] border border-[#e8bbbb] bg-[#fff5f5] rounded-md p-4">{error}</p>}
      {!loading && !error && result && <>
        <p className="text-sm mb-4">{result.total} beställningar</p>
        {result.orders.length === 0 ? <p>Inga beställningar matchar ditt val.</p> : <div className="overflow-x-auto border border-[#ddd] rounded-lg">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Beställningar, nyaste först</caption>
            <thead className="bg-[#faf7f5]"><tr>{["Order", "Datum", "Kund", "Status", "Betalning", "Totalt"].map((label) => <th key={label} scope="col" className="px-4 py-4 whitespace-nowrap">{label}</th>)}</tr></thead>
            <tbody>{result.orders.map((order) => <tr key={order.id} className="border-t border-[#eee] hover:bg-[#faf7f5]">
              <td className="p-4"><Link href={`/admin/orders/${order.id}`} className="underline font-semibold whitespace-nowrap">#{order.order_number} →</Link></td>
              <td className="p-4 whitespace-nowrap">{date(order.created_at)}</td>
              <td className="p-4"><p>{order.customer_name || "Kunduppgifter saknas ännu"}</p><p className="text-xs mt-1">{order.customer_email}</p></td>
              <td className="p-4 whitespace-nowrap">{orderStatuses[order.status] || order.status}</td>
              <td className="p-4 whitespace-nowrap">{paymentStatuses[order.payment_status] || order.payment_status}</td>
              <td className="p-4 whitespace-nowrap">{money(order.total, order.currency)}</td>
            </tr>)}</tbody>
          </table>
        </div>}
        <div className="flex items-center justify-between gap-4 mt-6">
          <button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="underline disabled:opacity-30">← Föregående</button>
          <span className="text-sm">Sida {page} av {Math.max(1, Math.ceil(result.total / result.pageSize))}</span>
          <button disabled={page * result.pageSize >= result.total} onClick={() => setPage((value) => value + 1)} className="underline disabled:opacity-30">Nästa →</button>
        </div>
      </>}
    </main>
  );
}
