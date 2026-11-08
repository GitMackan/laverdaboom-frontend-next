
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useCartStore } from "@/stores/cartStore";

const s3BaseURL =
  "https://laverdaboom.s3.eu-north-1.amazonaws.com/";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(price / 100);

export default function CartPage() {
  const cart = useCartStore((state) => state.items);
  const hydrated = useCartStore((state) => state.hydrated);
  const [stockLimits, setStockLimits] = useState<Record<string, number>>({});
  const [stockError, setStockError] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const productIds = JSON.stringify(Array.from(new Set(cart.map((item) => item.productId))).sort());
  const refreshStock = useCallback(async () => {
    try {
      const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!serverURL) throw new Error("Kunde inte kontrollera lagret. Försök igen.");
      const products: { id: string; stock_quantity: number; made_to_order: boolean }[][] = await Promise.all(
        (JSON.parse(productIds) as string[]).map(async (id) => {
          const response = await fetch(`${serverURL}/product-variants/product/${encodeURIComponent(id)}`, { cache: "no-store" });
          if (!response.ok) throw new Error("Kunde inte kontrollera lagret. Försök igen.");
          return response.json();
        }),
      );
      const limits: Record<string, number> = {};
      for (const variant of products.flat()) limits[variant.id] = variant.made_to_order ? 99 : Math.min(99, variant.stock_quantity);
      // Missing/inactive variants are unavailable, rather than unlimited.
      for (const item of useCartStore.getState().items) limits[item.variantId] ??= 0;
      setStockLimits(limits);
      setStockError("");
      return limits;
    } catch (error) {
      setStockError("Kunde inte kontrollera lagret. Försök igen.");
      throw error;
    }
  }, [productIds]);
  useEffect(() => {
    if (!hydrated) return;
    const refresh = () => { void refreshStock().catch(() => {}); };
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("cart-stock-refresh", refresh);
    const timer = setInterval(refresh, 30_000);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("cart-stock-refresh", refresh);
    };
  }, [hydrated, refreshStock]);
  const [cancelled, setCancelled] = useState(false);
  const [cancellationError, setCancellationError] = useState("");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("cancelled") !== "1") return;
    setCancelled(true);
    const cancelCheckout = async () => {
      try {
        const snapshot = JSON.parse(sessionStorage.getItem("laverdaboom-checkout-cart") || "null");
        if (!snapshot?.sessionId) return;
        const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
        if (!serverURL) throw new Error("Kassan är inte konfigurerad ännu.");
        const response = await fetch(`${serverURL}/checkout/session/${encodeURIComponent(snapshot.sessionId)}/cancel`, { method: "POST" });
        if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("Kunde inte avsluta kassan.");
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Kunde inte avsluta kassan.");
        if (result.paymentStatus === "paid") {
          window.location.replace(`/shop/success?session_id=${encodeURIComponent(snapshot.sessionId)}`);
        } else if (result.expired) {
          sessionStorage.removeItem("laverdaboom-checkout-cart");
          window.dispatchEvent(new Event("cart-stock-refresh"));
        }
      } catch (error) {
        setCancellationError(error instanceof Error ? error.message : "Reservationen släpps när kassan löper ut.");
      }
    };
    void cancelCheckout();
  }, []);
  const [checkingOut, setCheckingOut] = useState(false);
  const checkoutLock = useRef(false);
  const [checkoutError, setCheckoutError] = useState("");
  useEffect(() => {
    if (checkoutError) errorRef.current?.focus();
  }, [checkoutError]);

  const checkout = async () => {
    if (checkoutLock.current || cart.length === 0) return;
    checkoutLock.current = true;
    setCheckingOut(true);
    setCheckoutError("");
    try {
      const limits = await refreshStock();
      if (cart.some((item) => item.quantity > limits[item.variantId])) {
        throw new Error("Lagret har ändrats. Justera de markerade produkterna nedan innan du går till kassan.");
      }
      const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
      if (!serverURL) throw new Error("Kassan är inte konfigurerad ännu.");
      const response = await fetch(`${serverURL}/checkout/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart.map(({ variantId, quantity }) => ({ variantId, quantity })) }),
      });
      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error(`Kassan fick ett oväntat svar från API:t (HTTP ${response.status}). Kontrollera NEXT_PUBLIC_SERVER_URL och att API:t kör den senaste koden.`);
      }
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Kunde inte starta betalningen.");
      const destination = new URL(data.url);
      if (destination.protocol !== "https:" || destination.hostname !== "checkout.stripe.com") {
        throw new Error("Ogiltig betalningslänk.");
      }
      sessionStorage.setItem("laverdaboom-checkout-cart", JSON.stringify({ sessionId: data.sessionId, items: cart }));
      window.location.assign(destination.href);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Kunde inte ansluta till kassan. Försök igen.");
      void refreshStock().catch(() => {});
      checkoutLock.current = false;
      setCheckingOut(false);
    }
  };

  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const removeCartItem = useCartStore(
    (state) => state.removeItem
  );

  const clearCartItems = useCartStore(
    (state) => state.clearCart
  );

  const changeQuantity = (
    variantId: string,
    amount: number
  ) => {
    const item = cart.find(
      (item) => item.variantId === variantId
    );

    if (!item) return;

    const limit = stockLimits[variantId];
    if (amount > 0 && (limit === undefined || item.quantity >= limit)) return;
    updateQuantity(variantId, item.quantity + amount);
  };

  const removeItem = (variantId: string) => {
    removeCartItem(variantId);
    toast.success("Produkten har tagits bort.");
  };

  const clearCart = () => {
    if (!window.confirm("Vill du tömma varukorgen?")) {
      return;
    }

    clearCartItems();
    toast.success("Varukorgen har tömts.");
  };

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!hydrated) {
    return (
      <main className="pt-[25vh] text-center font-primary">
        Hämtar varukorgen...
      </main>
    );
  }

  return (
    <main className="pt-[25vh] pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/shop"
          className="font-primary text-sm underline"
        >
          ← Fortsätt handla
        </Link>

        <h1 className="font-cursive text-[3.5rem] md:text-[5rem] text-center mb-12">
          Varukorg
        </h1>
        {cancelled && <p role="status" className="font-primary text-center mb-8">Du har lämnat kassan. Dina produkter finns kvar och du kan försöka igen.</p>}
        {cancellationError && <p role="alert" className="font-primary text-center text-red-700 mb-8">{cancellationError}</p>}
        {checkoutError && <div ref={errorRef} tabIndex={-1} role="alert" className="font-primary border border-red-300 bg-red-50 text-red-800 rounded-md p-5 mb-8">{checkoutError}</div>}
        {stockError && <p role="alert" className="font-primary text-red-700 mb-6">{stockError} <button type="button" className="underline" onClick={() => { void refreshStock().catch(() => {}); }}>Kontrollera lagret igen</button></p>}

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-secondary text-xl mb-8">
              Din varukorg är tom.
            </p>

            <Link
              href="/shop"
              className="inline-block !bg-[#222] !text-white font-primary uppercase px-8 py-4 rounded-md"
            >
              Till shoppen
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
            {/* Produkter */}
            <div className="flex flex-col">
              {cart.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 sm:gap-6 py-6 border-b border-gray-200"
                >
                  <Link
                    href={`/shop/${item.slug}`}
                    className="relative w-24 h-28 sm:w-36 sm:h-40 shrink-0 bg-[#f7f2ef]"
                  >
                    {item.imageKey ? (
                      <Image
                        src={`${s3BaseURL}${item.imageKey}`}
                        alt={item.name}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 96px, 144px"
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-primary">
                        Ingen bild
                      </div>
                    )}
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="font-secondary text-lg sm:text-xl hover:underline"
                    >
                      {item.name}
                    </Link>

                    <p className="font-primary text-sm text-gray-500 mt-1">
                      {item.variantLabel}
                    </p>
                    <div aria-live="polite" className="font-primary text-sm mt-2">
                      {stockLimits[item.variantId] === undefined ? <p>Kontrollerar lagret…</p>
                        : stockLimits[item.variantId] === 0 ? <p className="text-red-700">Slut i lager eller tillfälligt reserverad. Ta bort produkten för att fortsätta.</p>
                        : item.quantity > stockLimits[item.variantId] ? <p className="text-red-700">
                          Endast {stockLimits[item.variantId]} st finns tillgängliga just nu.{" "}
                          <button type="button" className="underline font-semibold" onClick={() => updateQuantity(item.variantId, stockLimits[item.variantId])}>Ändra till {stockLimits[item.variantId]} st</button>
                        </p> : <p className="text-gray-500">Du kan köpa högst {stockLimits[item.variantId]} st just nu.</p>}
                    </div>

                    <p className="font-primary mt-3">
                      {formatPrice(item.price)}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(item.variantId, -1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Minska antal"
                          className="px-3 py-2 disabled:opacity-30 cursor-pointer"
                        >
                          −
                        </button>

                        <span className="font-primary min-w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(item.variantId, 1)
                          }
                          disabled={checkingOut || !!stockError || stockLimits[item.variantId] === undefined || item.quantity >= stockLimits[item.variantId]}
                          aria-label="Öka antal"
                          className="px-3 py-2 disabled:opacity-30 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        className="font-primary text-sm text-red-700 underline cursor-pointer"
                      >
                        Ta bort
                      </button>
                    </div>

                    <p className="font-primary text-sm mt-4">
                      Summa:{" "}
                      <span className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="self-start font-primary text-sm underline mt-6 cursor-pointer"
              >
                Töm varukorgen
              </button>
            </div>

            {/* Sammanfattning */}
            <aside className="lg:sticky lg:top-28 self-start border border-gray-200 bg-[#faf7f5] p-6">
              <h2 className="font-secondary text-2xl mb-6">
                Sammanfattning
              </h2>

              <div className="flex justify-between font-primary mb-4">
                <span>Produkter ({totalQuantity} st)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between font-primary mb-4">
                <span>Frakt</span>
                <span>0 kr</span>
              </div>

              <div className="border-t border-gray-300 pt-5 mt-5 flex justify-between font-secondary text-xl">
                <span>Delsumma</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <button
                type="button"
                onClick={checkout}
                disabled={checkingOut || !!stockError || cart.some((item) => stockLimits[item.variantId] === undefined || item.quantity > stockLimits[item.variantId])}
                className="block w-full text-center !bg-[#222] !text-white font-primary uppercase px-6 py-4 rounded-md mt-8 disabled:opacity-50 disabled:cursor-wait"
              >
                {checkingOut ? "Öppnar kassan…" : "Till kassan"}
              </button>

              <p className="font-primary text-xs text-gray-500 text-center mt-3">
                Betala säkert via Stripe. Du anger leveransuppgifter i kassan.
              </p>
              <p className="font-primary text-xs text-gray-500 text-center mt-2">Lagerförda varor reserveras när kassan öppnas. Slutför betalningen inom 30 minuter.</p>
              {cart.some((item) => item.quantity > stockLimits[item.variantId]) && <p role="status" className="font-primary text-sm text-red-700 mt-4">Justera antal eller ta bort otillgängliga produkter för att fortsätta.</p>}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
