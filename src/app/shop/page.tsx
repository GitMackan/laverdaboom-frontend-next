
import Image from "next/image";
import Link from "next/link";

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
  sort_order: number;
};

type Product = {
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

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

const s3BaseURL =
  "https://laverdaboom.s3.eu-north-1.amazonaws.com/";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(price / 100);

async function getProducts(): Promise<Product[]> {
  if (!serverURL) {
    throw new Error("NEXT_PUBLIC_SERVER_URL saknas.");
  }

  const response = await fetch(`${serverURL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta produkter.");
  }

  const products: Product[] = await response.json();

  return products
    .filter((product) => product.active)
    .map((product) => ({
      ...product,
      product_variants: (product.product_variants ?? []).filter(
        (variant) => variant.active
      ),
    }));
}

function getMainImage(product: Product) {
  return [...(product.product_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order
  )[0];
}

function getDisplayPrice(product: Product) {
  const prices = product.product_variants.map(
    (variant) => variant.price
  );

  return prices.length > 0
    ? Math.min(...prices)
    : product.base_price;
}

function isAvailable(product: Product) {
  return product.product_variants.some(
    (variant) =>
      variant.made_to_order || variant.stock_quantity > 0
  );
}

const categories = [
  { value: "all", label: "Alla produkter" },
  { value: "leash", label: "Koppel" },
  { value: "collar", label: "Halsband" },
  { value: "other", label: "Övrigt" },
] as const;

type ShopPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const { category = "all" } = await searchParams;
  const products = await getProducts();

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          (product) => product.category === category
        );

  return (
    <main className="pt-[25vh] pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-cursive text-[3.5rem] md:text-[5rem]">
            Shop
          </h1>

          <p className="font-primary text-gray-600 mt-3 max-w-xl mx-auto">
            Handgjorda koppel och halsband, skapade med
            omsorg om både hund och ägare.
          </p>
        </div>

        <nav
          aria-label="Produktkategorier"
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((item) => {
            const selected = category === item.value;

            return (
              <Link
                key={item.value}
                href={
                  item.value === "all"
                    ? "/shop"
                    : `/shop?category=${item.value}`
                }
                className={`font-primary px-5 py-2 rounded-full border transition-colors ${
                  selected
                    ? "bg-[#222] text-white border-[#222]"
                    : "bg-white text-[#222] border-gray-300 hover:border-[#222]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-secondary text-xl">
              Inga produkter hittades.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-5 underline font-primary"
            >
              Visa alla produkter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const mainImage = getMainImage(product);
              const price = getDisplayPrice(product);
              const available = isAvailable(product);

              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-square bg-[#f7f2ef] overflow-hidden rounded-sm">
                    {mainImage ? (
                      <Image
                        src={`${s3BaseURL}${mainImage.image_key}`}
                        alt={product.name}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-primary">
                        Ingen bild
                      </div>
                    )}

                    {!available &&
                      product.product_variants.length > 0 && (
                        <span className="absolute top-4 left-4 bg-white/95 px-3 py-1 text-sm font-primary">
                          Slutsåld
                        </span>
                      )}
                  </div>

                  <div className="pt-4 text-center">
                    <h2 className="font-secondary text-xl group-hover:underline">
                      {product.name}
                    </h2>

                    <p className="font-primary text-gray-700 mt-2">
                      {product.product_variants.length > 1
                        ? "Från "
                        : ""}
                      {formatPrice(price)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
