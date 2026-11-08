"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { adminOrdersRequest, date, money, orderStatuses, paymentStatuses, type OrderDetails } from "@/lib/adminOrders";

const nextSteps: Record<string, { status: string; label: string }[]> = {
  paid: [{ status: "processing", label: "Påbörja behandling" }, { status: "shipped", label: "Markera som skickad" }],
  processing: [{ status: "shipped", label: "Markera som skickad" }],
  shipped: [{ status: "completed", label: "Markera som slutförd" }],
};
const inventoryLabels: Record<string, string> = { legacy: "Äldre order – inget automatiskt lageravdrag", reserved: "Reserverat", committed: "Avdraget från lager", released: "Reservation släppt" };
const paymentLabels: Record<string, string> = { succeeded: "Genomförd", pending: "Behandlas", failed: "Misslyckad", cancelled: "Avbruten", refunded: "Återbetald", partially_refunded: "Delvis återbetald" };
const emailLabels: Record<string, string> = { queued: "Väntar på utskick", sending: "Skickas", sent: "Skickad", retry: "Nytt försök planerat", failed: "Kunde inte skickas", uncertain: "Behöver kontrolleras – leveransstatus okänd" };

export default function AdminOrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [version, setVersion] = useState(0);
  const [proposedStatus, setProposedStatus] = useState("");
  const loadOrder = useCallback((signal?: AbortSignal) => adminOrdersRequest<OrderDetails>(`/${encodeURIComponent(id)}`, { signal }), [id]);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(""); setProposedStatus("");
    loadOrder(controller.signal)
      .then((data) => { if (!controller.signal.aborted) setOrder(data); })
      .catch((err) => { if (!controller.signal.aborted) setError(err instanceof Error ? err.message : "Kunde inte hämta ordern."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [loadOrder, version]);

  const saveStatus = async () => {
    if (!order || saving || !proposedStatus) return;
    setSaving(true); setError(""); setMessage("");
    const status = proposedStatus;
    try {
      const updated = await adminOrdersRequest<{ status: string; payment_status: string }>(`/${id}/status`, {
        method: "PATCH", body: JSON.stringify({ expectedStatus: order.status, status }),
      });
      setOrder((current) => current ? { ...current, ...updated } : current);
      setMessage(`Orderstatus ändrad till ${orderStatuses[updated.status].toLowerCase()}.`);
      setProposedStatus("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunde inte uppdatera ordern.");
    } finally { setSaving(false); }
  };

  const address = order?.shipping_address;
  const steps = order?.payment_status === "paid" ? nextSteps[order.status] ?? [] : [];
  return (
    <main className="w-[90%] max-w-[1200px] mx-auto font-primary">
      <Link href="/admin/orders" className="text-sm underline">← Alla beställningar</Link>
      <div className="flex flex-wrap items-center justify-between gap-4 my-6">
        <h1 className="font-cursive text-5xl md:text-6xl">{order ? `Beställning #${order.order_number}` : "Beställning"}</h1>
        <button onClick={() => { setVersion((value) => value + 1); setMessage(""); }} disabled={loading || saving} className="border border-[#ccc] px-4 py-3 rounded-md disabled:opacity-50">Uppdatera ordern</button>
      </div>
      {loading && <p role="status">Hämtar beställningen…</p>}
      {error && <p role="alert" className="border border-[#e8bbbb] bg-[#fff5f5] text-[#a52222] rounded-md p-4 mb-6">{error}</p>}
      {message && <p role="status" className="border border-[#b9d4bc] bg-[#f2faf3] p-4 rounded-md mb-6">{message}</p>}
      {!loading && order && <>
        <section className="bg-[#faf7f5] border border-[#ddd] p-6 rounded-lg mb-8">
          <h2 className="font-secondary text-2xl mb-4">Status och leverans</h2>
          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><dt>Orderstatus</dt><dd className="font-semibold mt-1">{orderStatuses[order.status] || order.status}</dd></div>
            <div><dt>Betalning</dt><dd className="font-semibold mt-1">{paymentStatuses[order.payment_status] || order.payment_status}</dd></div>
            <div><dt>Beställd</dt><dd className="mt-1">{date(order.created_at)}</dd></div>
            <div><dt>Lager</dt><dd className="mt-1">{inventoryLabels[order.inventory_status] || order.inventory_status}</dd></div>
            <div><dt>Orderbekräftelse via mejl</dt><dd className="mt-1">{order.confirmation_email ? emailLabels[order.confirmation_email.status] || order.confirmation_email.status : "Ingen bekräftelse köad"}{order.confirmation_email?.sent_at && ` · ${date(order.confirmation_email.sent_at)}`}</dd></div>
          </dl>
          {steps.length > 0 && <div className="flex flex-wrap gap-3 mt-6">{steps.map((step) => <button key={step.status} disabled={saving} onClick={() => { setProposedStatus(step.status); setMessage(""); }} className="!bg-[#222] !text-white px-5 py-3 rounded-md disabled:opacity-50">{step.label}</button>)}</div>}
          {proposedStatus && <div className="border border-[#ccc] bg-white p-4 rounded-md mt-4">
            <p>Ändra beställningen till <strong>{orderStatuses[proposedStatus].toLowerCase()}</strong>?</p>
            <p className="text-sm mt-2">Detta uppdaterar orderstatus. Leveransmejl skickas inte vid statusändringar.</p>
            <div className="flex gap-4 mt-4"><button onClick={saveStatus} disabled={saving} className="!bg-[#222] !text-white rounded-md px-4 py-2 disabled:opacity-50">{saving ? "Sparar…" : "Bekräfta"}</button><button onClick={() => setProposedStatus("")} disabled={saving} className="underline">Avbryt</button></div>
          </div>}
          {order.payment_status !== "paid" && <p className="text-sm mt-5">Beställningen behöver vara fullt betald innan den kan behandlas eller skickas.</p>}
        </section>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <section className="border border-[#ddd] rounded-lg p-6"><h2 className="font-secondary text-2xl mb-4">Kund</h2>
            <p>{order.customer_name || "Namn saknas"}</p>
            {order.customer_email && <p className="mt-2 break-words"><a className="underline" href={`mailto:${order.customer_email}`}>{order.customer_email}</a></p>}
            {order.customer_phone && <p className="mt-2"><a className="underline" href={`tel:${order.customer_phone}`}>{order.customer_phone}</a></p>}
            {order.customer_note && <p className="mt-4 whitespace-pre-wrap">Kundens meddelande: {order.customer_note}</p>}
          </section>
          <section className="border border-[#ddd] rounded-lg p-6"><h2 className="font-secondary text-2xl mb-4">Leveransadress</h2>
            {address ? <address className="not-italic leading-relaxed"><p>{order.customer_name}</p><p>{address.line1}</p>{address.line2 && <p>{address.line2}</p>}<p>{address.postal_code} {address.city}</p>{address.state && <p>{address.state}</p>}<p>{address.country === "SE" ? "Sverige" : address.country}</p></address> : <p>Leveransuppgifter saknas ännu.</p>}
          </section>
        </div>
        <section className="mb-8"><h2 className="font-secondary text-2xl mb-4">Produkter</h2>
          <div className="overflow-x-auto border border-[#ddd] rounded-lg"><table className="w-full text-left text-sm">
            <thead className="bg-[#faf7f5]"><tr>{["Produkt", "Antal", "Styckpris", "Summa"].map((label) => <th scope="col" key={label} className="p-4">{label}</th>)}</tr></thead>
            <tbody>{order.items.map((item) => <tr key={item.id} className="border-t border-[#eee]"><td className="p-4">{item.product_name}<p className="text-xs mt-1">{item.customization?.variant_label || [item.product_variants?.color, item.product_variants?.length_cm ? `${item.product_variants.length_cm} cm` : null, item.product_variants?.size].filter(Boolean).join(" · ") || "Standard"}</p>{item.sku && <p className="text-xs mt-1">Artikelnummer: {item.sku}</p>}</td><td className="p-4">{item.quantity}</td><td className="p-4 whitespace-nowrap">{money(item.unit_price, order.currency)}</td><td className="p-4 whitespace-nowrap">{money(item.unit_price * item.quantity, order.currency)}</td></tr>)}</tbody>
          </table></div>
          <dl className="max-w-sm ml-auto mt-6 space-y-3"><div className="flex justify-between"><dt>Produkter</dt><dd>{money(order.subtotal, order.currency)}</dd></div><div className="flex justify-between"><dt>Frakt</dt><dd>{money(order.shipping_cost, order.currency)}</dd></div><div className="flex justify-between border-t border-[#ddd] pt-3 font-semibold"><dt>Totalt</dt><dd>{money(order.total, order.currency)}</dd></div></dl>
        </section>
        <section><h2 className="font-secondary text-2xl mb-4">Betalningar</h2>
          {order.payments.length === 0 ? <p>Ingen genomförd betalning har registrerats ännu.</p> : <ul className="space-y-3">{order.payments.map((payment) => <li key={payment.id} className="border border-[#ddd] rounded-md p-4 text-sm">{date(payment.created_at)} · {payment.provider} · {paymentLabels[payment.status] || payment.status} · {money(payment.amount, payment.currency)}</li>)}</ul>}
        </section>
      </>}
    </main>
  );
}
