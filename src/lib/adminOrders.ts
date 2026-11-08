import { supabase } from "@/lib/supabase/supabase";

export type OrderSummary = {
  id: string; order_number: number; created_at: string;
  customer_name: string | null; customer_email: string | null;
  status: string; payment_status: string; total: number; currency: string;
};
export type OrderDetails = OrderSummary & {
  customer_phone: string | null; shipping_address: Record<string, string | null> | null;
  customer_note: string | null; subtotal: number; shipping_cost: number;
  inventory_status: string;
  confirmation_email: { status: string; attempts: number; sent_at: string | null; last_error: string | null } | null;
  items: { id: string; product_name: string; sku: string | null; quantity: number; unit_price: number;
    customization: { variant_label?: string };
    product_variants: { color: string | null; length_cm: number | null; size: string | null } | null;
  }[];
  payments: { id: string; provider: string; amount: number; currency: string; status: string; created_at: string }[];
};
export const orderStatuses: Record<string, string> = {
  pending: "Inväntar betalning", paid: "Betald", processing: "Under behandling",
  shipped: "Skickad", completed: "Slutförd", cancelled: "Avbruten",
};
export const paymentStatuses: Record<string, string> = {
  unpaid: "Obetald", pending: "Behandlas", paid: "Betald", failed: "Misslyckad",
  refunded: "Återbetald", partially_refunded: "Delvis återbetald",
};
export const money = (amount: number, currency = "SEK") => new Intl.NumberFormat("sv-SE", { style: "currency", currency }).format(amount / 100);
export const date = (value: string) => new Intl.DateTimeFormat("sv-SE", {
  dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Stockholm",
}).format(new Date(value));

export async function adminOrdersRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Du behöver logga in igen.");
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!serverURL) throw new Error("API-adressen är inte konfigurerad.");
  const response = await fetch(`${serverURL}/orders${path}`, {
    ...options, cache: "no-store",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}`, ...options.headers },
  });
  if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("Kunde inte kontakta orderhanteringen. Kontrollera att API:t är uppdaterat.");
  const data = await response.json();
  if (!response.ok) throw new Error(response.status === 401 ? "Du behöver logga in som administratör igen." : data.error || "Kunde inte hämta beställningen.");
  return data;
}
