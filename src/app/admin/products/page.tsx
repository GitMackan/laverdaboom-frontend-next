
"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { supabase } from "@/lib/supabase/supabase";

type ProductVariant = {
  id: string;
  price: number;
  stock_quantity: number;
  made_to_order: boolean;
  active: boolean;
};

type ProductImage = {
  id: string;
  image_key: string;
  alt_text: string | null;
  sort_order: number;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  base_price: number;
  active: boolean;
  product_variants: ProductVariant[];
  product_images: ProductImage[];
};

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

const s3BaseUrl =
  "https://laverdaboom.s3.eu-north-1.amazonaws.com/";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(price / 100);

const categoryLabels: Record<string, string> = {
  leash: "Koppel",
  collar: "Halsband",
  other: "Övrigt",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("Du behöver logga in igen.");
        const { data } = await axios.get<Product[]>(
          `${serverURL}/products/admin`,
          { headers: { Authorization: `Bearer ${session.access_token}` } }
        );

        if (!cancelled) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);

        if (!cancelled) {
          setError("Kunde inte hämta produkterna.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="pb-[5rem]">
      <div className="w-[90%] max-w-[1200px] m-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-[3rem]">
          <h1 className="font-cursive text-[3rem] md:text-[4rem]">
            Produkter
          </h1>

          <Link
            href="/admin/products/add"
            className="flex items-center gap-2 border border-black p-3 rounded-md hover:bg-[#eee]"
          >
            <IoAddCircleOutline size={24} />
            <span className="font-primary uppercase text-[.8rem]">
              Lägg till produkt
            </span>
          </Link>
        </div>

        {loading && (
          <p className="font-primary">Hämtar produkter...</p>
        )}

        {error && (
          <p className="text-red-600">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="font-primary">
            Det finns inga produkter ännu.
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const image = [...product.product_images].sort(
                (a, b) => a.sort_order - b.sort_order
              )[0];

              const activeVariants =
                product.product_variants.filter(
                  (variant) => variant.active
                );

              const stock = activeVariants.reduce(
                (total, variant) =>
                  total + variant.stock_quantity,
                0
              );

              const madeToOrder = activeVariants.some(
                (variant) => variant.made_to_order
              );

              return (
                <Link
                  key={product.id}
                  href={`/admin/products/${product.id}`}
                  className="group"
                >
                  <div className="aspect-square bg-[#f5f5f5] rounded-xl overflow-hidden">
                    {image ? (
                      <Image
                        src={`${s3BaseUrl}${image.image_key}`}
                        alt={image.alt_text ?? product.name}
                        width={500}
                        height={500}
                        unoptimized
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-primary">
                        Ingen bild
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <h2 className="font-secondary text-xl">
                      {product.name}
                    </h2>
                    <p className={`font-primary text-sm mt-1 ${product.active ? "text-green-700" : "text-gray-500"}`}>{product.active ? "Publicerad" : "Opublicerad"}</p>

                    <p className="font-primary text-sm text-gray-500 mt-1">
                      {categoryLabels[product.category] ??
                        product.category}
                    </p>

                    <p className="font-primary mt-2">
                      {formatPrice(product.base_price)}
                    </p>

                    <p className="font-primary text-sm text-gray-500 mt-1">
                      {madeToOrder
                        ? "Tillverkas på beställning"
                        : `${stock} st i lager`}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
