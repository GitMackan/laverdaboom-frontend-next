"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cartStore";

type Receipt = {
  orderNumber: number;
  paymentStatus: string;
  expired: boolean;
  total: number;
  currency: string;
};

export default function CheckoutSuccessPage() {
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [waiting, setWaiting] = useState(true);
  const hydrated = useCartStore((state) => state.hydrated);

  useEffect(() => {
    if (!hydrated) return;
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) {
      setError("Betalningsreferensen saknas. Gå tillbaka till varukorgen.");
      setWaiting(false);
      return;
    }
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let polls = 0;
    setError("");
    setWaiting(true);

    const check = async () => {
      try {
        const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
        if (!serverURL) throw new Error("Kassan är inte konfigurerad ännu.");
        const response = await fetch(`${serverURL}/checkout/session/${encodeURIComponent(sessionId)}`, {
          cache: "no-store", signal: controller.signal,
        });
        if (!response.headers.get("content-type")?.includes("application/json")) {
          throw new Error(`Kunde inte kontrollera betalningen: oväntat API-svar (HTTP ${response.status}). Kontrollera NEXT_PUBLIC_SERVER_URL och att API:t kör den senaste koden.`);
        }
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Kunde inte kontrollera betalningen.");
        if (controller.signal.aborted) return;
        setReceipt(data);
        if (data.paymentStatus === "paid") {
          // Only clear the unchanged cart belonging to this checkout, once.
          try {
            const snapshot = JSON.parse(sessionStorage.getItem("laverdaboom-checkout-cart") || "null");
            if (snapshot?.sessionId === sessionId) {
              const store = useCartStore.getState();
              if (JSON.stringify(store.items) === JSON.stringify(snapshot.items)) store.clearCart();
              sessionStorage.removeItem("laverdaboom-checkout-cart");
            }
          } catch { /* Receipt remains usable when browser storage is unavailable. */ }
        } else if (!data.expired && data.paymentStatus !== "failed" && ++polls < 15) {
          timer = setTimeout(check, 2000);
          return;
        }
        setWaiting(false);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Kunde inte kontrollera betalningen. Försök igen.");
        setWaiting(false);
      }
    };
    void check();
    return () => { controller.abort(); clearTimeout(timer); };
  }, [hydrated, attempt]);

  const paid = receipt?.paymentStatus === "paid";
  const failed = receipt?.paymentStatus === "failed" || receipt?.expired;
  return (
    <main className="pt-[25vh] pb-24 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="font-cursive text-5xl mb-8">{paid ? "Tack för din beställning!" : "Din betalning"}</h1>
        <div aria-live="polite" className="font-primary">
          {error ? <p role="alert">{error}</p> : paid ? (
            <>
              <p>Betalningen är bekräftad.</p>
              <p className="mt-4">Ordernummer: {receipt.orderNumber}</p>
              <p className="mt-2">{new Intl.NumberFormat("sv-SE", { style: "currency", currency: receipt.currency }).format(receipt.total / 100)}</p>
            </>
          ) : failed ? <p>Betalningen slutfördes inte. Dina produkter finns kvar i varukorgen.</p>
            : <p>{waiting ? "Kontrollerar betalningen…" : "Betalningen är ännu inte bekräftad. Du kan kontrollera status igen om en stund."}</p>}
        </div>
        {!waiting && !paid && !failed && <button onClick={() => setAttempt((value) => value + 1)} className="font-primary underline mt-6">Kontrollera igen</button>}
        <div className="mt-10 flex justify-center gap-6 font-primary">
          {!paid && <Link href="/shop/cart" className="underline">Till varukorgen</Link>}
          <Link href="/shop" className="underline">Fortsätt handla</Link>
        </div>
      </div>
    </main>
  );
}
