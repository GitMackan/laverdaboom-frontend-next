"use client";

import ProductImages from "@/components/Products/ProductImages";
import ProductVariants from "@/components/Products/ProductVariants";
import { supabase } from "@/lib/supabase/supabase";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";

type ProductCategory = "leash" | "collar" | "other";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: ProductCategory;
  base_price: number;
  active: boolean;
};

type ProductForm = {
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  base_price: string;
  active: boolean;
};

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

const inputClass =
  "w-full border border-accent rounded-md px-3 py-2 bg-white font-primary";

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const [form, setForm] = useState<ProductForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          throw new Error("Du måste vara inloggad.");
        }

        const { data: products } = await axios.get<Product[]>(
          `${serverURL}/products/admin`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          },
        );

        const product = products.find((item) => item.id === productId);

        if (!product) {
          throw new Error("Produkten kunde inte hittas.");
        }

        if (!cancelled) {
          setForm({
            name: product.name,
            slug: product.slug,
            description: product.description ?? "",
            category: product.category,
            base_price: String(product.base_price / 100),
            active: product.active,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Kunde inte hämta produkten.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [productId]);

  const updateField = <K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K],
  ) => {
    setForm((previous) => (previous ? { ...previous, [field]: value } : null));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form || saving) return;

    const price = Number(form.base_price);

    if (
      !form.name.trim() ||
      !form.slug.trim() ||
      form.base_price.trim() === "" ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isSafeInteger(Math.round(price * 100))
    ) {
      toast.error("Kontrollera namn, URL och pris.");
      return;
    }

    setSaving(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        toast.error("Du måste vara inloggad.");
        return;
      }

      await axios.put(
        `${serverURL}/products/${productId}`,
        {
          name: form.name.trim(),
          slug: createSlug(form.slug),
          description: form.description.trim() || null,
          category: form.category,
          base_price: Math.round(price * 100),
          active: form.active,
        },
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      );

      toast.success("Produkten har uppdaterats!");
    } catch (err) {
      console.error("Failed to update product:", err);

      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ??
            err.response?.data?.error ??
            "Kunde inte uppdatera produkten.",
        );
      } else {
        toast.error("Ett oväntat fel inträffade.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center font-primary">
        Hämtar produkt...
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="text-center font-primary">
        <p className="text-red-600 mb-4">
          {error ?? "Produkten kunde inte hittas."}
        </p>
        <Link href="/admin/products" className="underline">
          Tillbaka till produkter
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-[5rem] px-4">
      <div
        className="max-w-[800px] mx-auto border-accent border-[3px] p-6 md:p-12"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,235,235,1) 100%)",
        }}
      >
        <Link href="/admin/products" className="font-primary text-sm underline">
          Tillbaka till produkter
        </Link>

        <h1 className="font-cursive text-[3rem] md:text-[4rem] text-center my-6">
          Redigera produkt
        </h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-secondary">
              Produktnamn *
            </label>
            <input
              id="name"
              className={inputClass}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block mb-2 font-secondary">
              URL (slug) *
            </label>
            <input
              id="slug"
              className={inputClass}
              value={form.slug}
              onChange={(e) => updateField("slug", createSlug(e.target.value))}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 font-secondary">
              Beskrivning
            </label>
            <textarea
              id="description"
              className={`${inputClass} min-h-[140px]`}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="category" className="block mb-2 font-secondary">
                Kategori
              </label>
              <select
                id="category"
                className={inputClass}
                value={form.category}
                onChange={(e) =>
                  updateField("category", e.target.value as ProductCategory)
                }
              >
                <option value="leash">Koppel</option>
                <option value="collar">Halsband</option>
                <option value="other">Övrigt</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block mb-2 font-secondary">
                Grundpris (SEK)
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                className={inputClass}
                value={form.base_price}
                onChange={(e) => updateField("base_price", e.target.value)}
                required
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => updateField("active", e.target.checked)}
              className="w-5 h-5 accent-black"
            />
            <span className="font-secondary">Produkten är aktiv</span>
          </label>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              type="submit"
              disabled={saving}
              className="!bg-[#222] !text-white font-primary uppercase px-8 py-3 rounded-md hover:!bg-[#444] disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Sparar..." : "Spara ändringar"}
            </button>

            <Link
              href="/admin/products"
              className="border border-black font-primary uppercase px-8 py-3 rounded-md"
            >
              Avbryt
            </Link>
          </div>
        </form>

        <ProductVariants
          productId={productId}
          basePrice={Number(form.base_price) * 100}
        />

        <ProductImages productId={productId} />
      </div>
    </div>
  );
}
