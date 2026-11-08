
"use client";

import { supabase } from "@/lib/supabase/supabase";
import axios from "axios";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";

type ProductVariant = {
  id: string;
  product_id: string;
  color: string | null;
  length_cm: number | null;
  size: string | null;
  sku: string | null;
  price: number;
  stock_quantity: number;
  reserved_quantity: number;
  made_to_order: boolean;
  active: boolean;
};

type ProductWithVariants = {
  id: string;
  product_variants: ProductVariant[];
};

type VariantForm = {
  color: string;
  length_cm: string;
  size: string;
  sku: string;
  price: string;
  stock_quantity: string;
  made_to_order: boolean;
  active: boolean;
};

type Props = {
  productId: string;
  basePrice: number;
};

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

const inputClass =
  "w-full border border-accent rounded-md px-3 py-2 bg-white font-primary";

const buttonClass =
  "!bg-[#222] !text-white font-primary uppercase px-5 py-3 rounded-md hover:!bg-[#444] disabled:opacity-50 cursor-pointer";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(price / 100);

const emptyForm = (basePrice: number): VariantForm => ({
  color: "",
  length_cm: "",
  size: "",
  sku: "",
  price: String(basePrice / 100),
  stock_quantity: "0",
  made_to_order: false,
  active: true,
});

const variantToForm = (variant: ProductVariant): VariantForm => ({
  color: variant.color ?? "",
  length_cm:
    variant.length_cm === null ? "" : String(variant.length_cm),
  size: variant.size ?? "",
  sku: variant.sku ?? "",
  price: String(variant.price / 100),
  stock_quantity: String(variant.stock_quantity),
  made_to_order: variant.made_to_order,
  active: variant.active,
});

export default function ProductVariants({
  productId,
  basePrice,
}: Props) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [form, setForm] = useState<VariantForm>(() =>
    emptyForm(basePrice)
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("Du måste vara inloggad.");
    }

    return {
      Authorization: `Bearer ${session.access_token}`,
    };
  };

  const fetchVariants = useCallback(async () => {
    const headers = await getAuthHeaders();

    // Admin endpoint must include inactive variants.
    const { data } = await axios.get<ProductWithVariants[]>(
      `${serverURL}/products/admin`,
      { headers }
    );

    const product = data.find((item) => item.id === productId);

    if (!product) {
      throw new Error("Produkten kunde inte hittas.");
    }

    setVariants(
      [...(product.product_variants ?? [])].sort(
        (a, b) => Number(b.active) - Number(a.active)
      )
    );
  }, [productId]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        await fetchVariants();
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Kunde inte hämta varianterna."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [fetchVariants]);

  const updateField = <K extends keyof VariantForm>(
    field: K,
    value: VariantForm[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm(basePrice));
  };

  const editVariant = (variant: ProductVariant) => {
    setEditingId(variant.id);
    setForm(variantToForm(variant));
  };

  const saveVariant = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving) return;

    const price = Number(form.price);
    const stock = Number(form.stock_quantity);
    const length = form.length_cm.trim()
      ? Number(form.length_cm)
      : null;

    if (
      form.price.trim() === "" ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isSafeInteger(Math.round(price * 100)) ||
      form.stock_quantity.trim() === "" ||
      !Number.isSafeInteger(stock) ||
      stock < 0 ||
      (length !== null &&
        (!Number.isFinite(length) || length <= 0))
    ) {
      toast.error("Kontrollera pris, längd och lagersaldo.");
      return;
    }

    setSaving(true);

    const payload = {
      color: form.color.trim() || null,
      length_cm: length,
      size: form.size.trim() || null,
      sku: form.sku.trim() || null,
      price: Math.round(price * 100),
      stock_quantity: stock,
      made_to_order: form.made_to_order,
      active: form.active,
    };

    try {
      const headers = await getAuthHeaders();

      if (editingId) {
        await axios.put(
          `${serverURL}/product-variants/${editingId}`,
          { ...payload, expected_stock_quantity: variants.find((variant) => variant.id === editingId)?.stock_quantity },
          { headers }
        );

        toast.success("Varianten har uppdaterats!");
      } else {
        await axios.post(
          `${serverURL}/product-variants`,
          {
            ...payload,
            product_id: productId,
          },
          { headers }
        );

        toast.success("Varianten har skapats!");
      }

      await fetchVariants();
      resetForm();
    } catch (err) {
      console.error("Could not save variant:", err);

      toast.error(
        axios.isAxiosError(err)
          ? err.response?.data?.message ??
              err.response?.data?.error ??
              "Kunde inte spara varianten."
          : err instanceof Error
            ? err.message
            : "Kunde inte spara varianten."
      );
    } finally {
      setSaving(false);
    }
  };

  const deactivateVariant = async (variant: ProductVariant) => {
    if (!window.confirm("Vill du avaktivera varianten?")) {
      return;
    }

    try {
      const headers = await getAuthHeaders();

      await axios.delete(
        `${serverURL}/product-variants/${variant.id}`,
        { headers }
      );

      await fetchVariants();

      if (editingId === variant.id) {
        resetForm();
      }

      toast.success("Varianten har avaktiverats.");
    } catch (err) {
      console.error("Could not deactivate variant:", err);
      toast.error("Kunde inte avaktivera varianten.");
    }
  };

  return (
    <section className="mt-12 border-t border-gray-300 pt-8">
      <h2 className="font-cursive text-[2.5rem] mb-6">
        Produktvarianter
      </h2>

      {loading ? (
        <p className="font-primary">Hämtar varianter...</p>
      ) : error ? (
        <p className="font-primary text-red-600">{error}</p>
      ) : variants.length === 0 ? (
        <p className="font-primary text-gray-500 mb-6">
          Produkten har inga varianter ännu.
        </p>
      ) : (
        <div className="flex flex-col gap-3 mb-8">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="border border-gray-300 rounded-md bg-white p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-secondary text-lg">
                    {[
                      variant.color,
                      variant.length_cm !== null
                        ? `${variant.length_cm} cm`
                        : null,
                      variant.size,
                    ]
                      .filter(Boolean)
                      .join(" · ") || "Standardvariant"}
                  </h3>

                  <p className="font-primary text-sm mt-1">
                    {formatPrice(variant.price)}
                  </p>

                  <p className="font-primary text-sm text-gray-500 mt-1">
                    {variant.made_to_order
                      ? "Tillverkas på beställning"
                      : `${variant.stock_quantity} st i lager, ${variant.reserved_quantity ?? 0} reserverade, ${variant.stock_quantity - (variant.reserved_quantity ?? 0)} tillgängliga`}
                  </p>

                  <p
                    className={`font-primary text-sm mt-1 ${
                      variant.active
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {variant.active ? "Aktiv" : "Inaktiv"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => editVariant(variant)}
                    className="border border-black px-4 py-2 rounded-md font-primary text-sm cursor-pointer"
                  >
                    Redigera
                  </button>

                  {variant.active && (
                    <button
                      type="button"
                      onClick={() => deactivateVariant(variant)}
                      className="border border-red-600 text-red-600 px-4 py-2 rounded-md font-primary text-sm cursor-pointer"
                    >
                      Avaktivera
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="font-secondary text-xl mb-5">
        {editingId ? "Redigera variant" : "Lägg till variant"}
      </h3>

      <form onSubmit={saveVariant} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 font-secondary">
              Färg
            </label>
            <input
              className={inputClass}
              value={form.color}
              onChange={(e) =>
                updateField("color", e.target.value)
              }
              placeholder="Svart"
            />
          </div>

          <div>
            <label className="block mb-2 font-secondary">
              Längd (cm)
            </label>
            <input
              type="number"
              min="0.1"
              step="any"
              className={inputClass}
              value={form.length_cm}
              onChange={(e) =>
                updateField("length_cm", e.target.value)
              }
              placeholder="120"
            />
          </div>

          <div>
            <label className="block mb-2 font-secondary">
              Storlek
            </label>
            <input
              className={inputClass}
              value={form.size}
              onChange={(e) =>
                updateField("size", e.target.value)
              }
              placeholder="S, M, L..."
            />
          </div>

          <div>
            <label className="block mb-2 font-secondary">
              SKU (valfritt)
            </label>
            <input
              className={inputClass}
              value={form.sku}
              onChange={(e) =>
                updateField("sku", e.target.value)
              }
              placeholder="KOP-SVART-120"
            />
          </div>

          <div>
            <label className="block mb-2 font-secondary">
              Pris (SEK) *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              className={inputClass}
              value={form.price}
              onChange={(e) =>
                updateField("price", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-secondary">
              Lagersaldo *
            </label>
            <input
              type="number"
              min="0"
              step="1"
              required
              className={inputClass}
              value={form.stock_quantity}
              onChange={(e) =>
                updateField("stock_quantity", e.target.value)
              }
            />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.made_to_order}
            onChange={(e) =>
              updateField("made_to_order", e.target.checked)
            }
            className="w-5 h-5 accent-black"
          />
          <span className="font-secondary">
            Tillverkas på beställning
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) =>
              updateField("active", e.target.checked)
            }
            className="w-5 h-5 accent-black"
          />
          <span className="font-secondary">
            Varianten är aktiv
          </span>
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className={buttonClass}
          >
            {saving
              ? "Sparar..."
              : editingId
                ? "Spara variant"
                : "Lägg till variant"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-black px-5 py-3 rounded-md font-primary uppercase cursor-pointer"
            >
              Avbryt redigering
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
