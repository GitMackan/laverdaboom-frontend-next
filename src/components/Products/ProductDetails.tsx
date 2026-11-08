"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import type { Product, ProductVariant } from "@/app/shop/[slug]/page";
import { useCartStore } from "@/stores/cartStore";

type Props = {
  product: Product;
};

const s3BaseURL = "https://laverdaboom.s3.eu-north-1.amazonaws.com/";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(price / 100);

const getVariantLabel = (variant: ProductVariant) =>
  [
    variant.color,
    variant.length_cm !== null ? `${variant.length_cm} cm` : null,
    variant.size,
  ]
    .filter(Boolean)
    .join(" · ") || "Standard";

export default function ProductDetails({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.product_variants[0]?.id ?? "",
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = product.product_variants.find(
    (variant) => variant.id === selectedVariantId,
  );

  const images = product.product_images;

  const price = selectedVariant?.price ?? product.base_price;

  const available = selectedVariant
    ? selectedVariant.made_to_order || selectedVariant.stock_quantity > 0
    : false;

  const maxQuantity = selectedVariant?.made_to_order
    ? 99
    : (selectedVariant?.stock_quantity ?? 0);

  const addItem = useCartStore((state) => state.addItem);

  const addToCart = () => {
    if (!selectedVariant || !available) return;

    addItem(
      {
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        slug: product.slug,
        variantLabel: getVariantLabel(selectedVariant),
        imageKey: images[0]?.image_key ?? null,
        price,
        quantity,
      },
      maxQuantity,
    );

    toast.success("Produkten har lagts i varukorgen!");
  };

  return (
    <main className="pt-[25vh] pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/shop" className="font-primary text-sm underline">
          ← Tillbaka till shoppen
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-8">
          {/* Produktbilder */}
          <div>
            <div className="relative aspect-square bg-[#f7f2ef] overflow-hidden">
              {images.length > 0 ? (
                <Image
                  src={`${s3BaseURL}${images[selectedImage].image_key}`}
                  alt={images[selectedImage].alt_text ?? product.name}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full font-primary text-gray-400">
                  Ingen produktbild
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3 mt-4">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Visa bild ${index + 1}`}
                    aria-pressed={selectedImage === index}
                    className={`relative aspect-square overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-[#222]"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={`${s3BaseURL}${image.image_key}`}
                      alt={image.alt_text ?? product.name}
                      fill
                      unoptimized
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Produktinformation */}
          <div>
            <h1 className="font-cursive text-[3rem] md:text-[4rem] leading-tight">
              {product.name}
            </h1>

            <p className="font-secondary text-2xl mt-5">{formatPrice(price)}</p>

            {product.description && (
              <p className="font-primary whitespace-pre-line text-gray-700 mt-6 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="mt-8">
              <label htmlFor="variant" className="block font-secondary mb-3">
                Välj variant
              </label>

              <select
                id="variant"
                value={selectedVariantId}
                onChange={(event) => {
                  setSelectedVariantId(event.target.value);
                  setQuantity(1);
                }}
                className="w-full border border-gray-300 rounded-md bg-white px-4 py-3 font-primary"
                disabled={product.product_variants.length === 0}
              >
                {product.product_variants.length === 0 ? (
                  <option value="">Inga varianter tillgängliga</option>
                ) : (
                  product.product_variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {getVariantLabel(variant)}
                      {!variant.made_to_order && variant.stock_quantity === 0
                        ? " – Slutsåld"
                        : ""}
                    </option>
                  ))
                )}
              </select>
            </div>

            <p className="font-primary text-sm mt-4">
              {selectedVariant?.made_to_order
                ? "Tillverkas på beställning"
                : available
                  ? `${selectedVariant?.stock_quantity} st i lager`
                  : "Slutsåld"}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  disabled={!available || quantity <= 1}
                  className="px-4 py-3 disabled:opacity-30"
                  aria-label="Minska antal"
                >
                  −
                </button>

                <span className="font-primary min-w-8 text-center">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.min(maxQuantity, current + 1))
                  }
                  disabled={!available || quantity >= maxQuantity}
                  className="px-4 py-3 disabled:opacity-30"
                  aria-label="Öka antal"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={addToCart}
                disabled={!available}
                className="flex-1 min-w-[180px] !bg-[#222] !text-white font-primary uppercase px-8 py-4 rounded-md hover:!bg-[#444] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {available ? "Lägg i varukorgen" : "Slutsåld"}
              </button>
            </div>

            <p className="font-primary text-xs text-gray-500 mt-5">
              Handgjord med omsorg hos Kennel LaverdaBoom.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
