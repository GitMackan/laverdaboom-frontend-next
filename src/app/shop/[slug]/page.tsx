
import ProductDetails from "@/components/Products/ProductDetails";
import { notFound } from "next/navigation";

export type ProductVariant = {
  id: string;
  product_id: string;
  color: string | null;
  length_cm: number | null;
  size: string | null;
  sku: string | null;
  price: number;
  stock_quantity: number;
  made_to_order: boolean;
  active: boolean;
};

export type ProductImage = {
  id: string;
  image_key: string;
  alt_text: string | null;
  sort_order: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: "leash" | "collar" | "other";
  base_price: number;
  active: boolean;
  product_variants: ProductVariant[];
  product_images: ProductImage[];
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!serverURL) {
    throw new Error("NEXT_PUBLIC_SERVER_URL saknas.");
  }

  const response = await fetch(
    `${serverURL}/products/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Kunde inte hämta produkten.");
  }

  const product: Product = await response.json();

  if (!product.active) {
    notFound();
  }

  return (
    <ProductDetails
      product={{
        ...product,
        product_variants: (product.product_variants ?? []).filter(
          (variant) => variant.active
        ),
        product_images: [...(product.product_images ?? [])].sort(
          (a, b) => a.sort_order - b.sort_order
        ),
      }}
    />
  );
}
