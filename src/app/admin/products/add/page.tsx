"use client";

import { supabase } from "@/lib/supabase/supabase";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

type ProductCategory = "leash" | "collar" | "other";

type ProductForm = {
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  base_price: string;
  active: boolean;
};

type CreatedProduct = {
  id: string;
  name: string;
  slug: string;
};

const initialState: ProductForm = {
  name: "",
  slug: "",
  description: "",
  category: "leash",
  base_price: "399",
  active: true,
};

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

export default function AddProductPage() {
  const router = useRouter();

  const [product, setProduct] = useState<ProductForm>(initialState);

  const [saving, setSaving] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);

  const updateField = <K extends keyof ProductForm>(
    field: K,
    value: ProductForm[K],
  ) => {
    setProduct((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleNameChange = (name: string) => {
    setProduct((previous) => ({
      ...previous,
      name,
      slug: slugEdited ? previous.slug : createSlug(name),
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving) return;

    const price = Number(product.base_price);

    if (
      !product.name.trim() ||
      !product.slug.trim() ||
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

      const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

      const { data } = await axios.post<CreatedProduct>(
        `${serverURL}/products`,
        {
          name: product.name.trim(),
          slug: product.slug.trim(),
          description: product.description.trim() || null,
          category: product.category,
          base_price: Math.round(price * 100),
          active: product.active,
        },
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          withCredentials: true,
        },
      );

      toast.success("Produkten har skapats!");

      router.push(`/admin/products/${data.id}`);
    } catch (error) {
      console.error("Could not create product:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Kunde inte skapa produkten.",
        );
      } else {
        toast.error("Ett oväntat fel inträffade.");
      }
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full border border-accent rounded-md px-3 py-2 bg-white font-primary";

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
          Lägg till produkt
        </h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="product-name" className="block mb-2 font-secondary">
              Produktnamn *
            </label>
            <input
              id="product-name"
              className={inputClass}
              value={product.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Handgjort utställningskoppel"
              required
            />
          </div>

          <div>
            <label htmlFor="product-slug" className="block mb-2 font-secondary">
              URL (slug) *
            </label>
            <input
              id="product-slug"
              className={inputClass}
              value={product.slug}
              onChange={(e) => {
                setSlugEdited(true);
                updateField("slug", createSlug(e.target.value));
              }}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Genereras automatiskt från produktnamnet.
            </p>
          </div>

          <div>
            <label
              htmlFor="product-description"
              className="block mb-2 font-secondary"
            >
              Beskrivning
            </label>
            <textarea
              id="product-description"
              className={`${inputClass} min-h-[140px]`}
              value={product.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Beskriv produkten..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="product-category"
                className="block mb-2 font-secondary"
              >
                Kategori *
              </label>
              <select
                id="product-category"
                className={inputClass}
                value={product.category}
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
              <label
                htmlFor="product-price"
                className="block mb-2 font-secondary"
              >
                Grundpris (SEK) *
              </label>
              <input
                id="product-price"
                type="number"
                min="0"
                step="0.01"
                className={inputClass}
                value={product.base_price}
                onChange={(e) => updateField("base_price", e.target.value)}
                required
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={product.active}
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
              {saving ? "Sparar..." : "Skapa produkt"}
            </button>

            <Link
              href="/admin/products"
              className="border border-black font-primary uppercase px-8 py-3 rounded-md"
            >
              Avbryt
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
