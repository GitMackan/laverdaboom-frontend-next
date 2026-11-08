"use client";

import { supabase } from "@/lib/supabase/supabase";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type ProductImage = {
  id: string;
  product_id: string;
  image_key: string;
  alt_text: string | null;
  sort_order: number;
};

type ProductWithImages = {
  id: string;
  product_images: ProductImage[];
};

type Props = {
  productId: string;
};

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

const s3BaseURL = "https://laverdaboom.s3.eu-north-1.amazonaws.com/";

const imageURL = (imageKey: string) => `${s3BaseURL}${imageKey}`;

const buttonClass =
  "!bg-[#222] !text-white font-primary px-5 py-3 rounded-md hover:!bg-[#444] disabled:opacity-50 cursor-pointer";

export default function ProductImages({ productId }: Props) {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const fetchImages = useCallback(async () => {
    const headers = await getAuthHeaders();

    const { data: products } = await axios.get<ProductWithImages[]>(
      `${serverURL}/products/admin`,
      { headers },
    );

    const product = products.find((item) => item.id === productId);

    if (!product) {
      throw new Error("Produkten kunde inte hittas.");
    }

    setImages(
      [...(product.product_images ?? [])].sort(
        (a, b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id),
      ),
    );
  }, [productId]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        await fetchImages();
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Kunde inte hämta bilderna.",
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
  }, [fetchImages]);

  const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0 || uploading) return;

    setUploading(true);

    try {
      const headers = await getAuthHeaders();

      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} är inte en bild.`);
          continue;
        }

        const formData = new FormData();
        formData.append("image", file);

        await axios.post(`${serverURL}/product-images/${productId}`, formData, {
          headers,
        });
      }

      await fetchImages();
      toast.success("Bilduppladdningen är klar!");
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Kunde inte ladda upp bilden.");
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const updateImage = async (
    imageId: string,
    payload: Partial<Pick<ProductImage, "sort_order" | "alt_text">>,
  ) => {
    const headers = await getAuthHeaders();

    await axios.put(`${serverURL}/product-images/${imageId}`, payload, {
      headers,
    });
  };

  const moveImage = async (imageId: string, direction: -1 | 1) => {
    if (busy) return;

    const index = images.findIndex((image) => image.id === imageId);
    const newIndex = index + direction;

    if (index < 0 || newIndex < 0 || newIndex >= images.length) {
      return;
    }

    const previousImages = [...images];
    const reorderedImages = [...images];

    [reorderedImages[index], reorderedImages[newIndex]] = [
      reorderedImages[newIndex],
      reorderedImages[index],
    ];

    const updatedImages = reorderedImages.map((image, index) => ({
      ...image,
      sort_order: index,
    }));

    setImages(updatedImages);
    setBusy(true);

    try {
      await Promise.all(
        updatedImages.map((image) =>
          updateImage(image.id, {
            sort_order: image.sort_order,
          }),
        ),
      );

      toast.success("Bildordningen har uppdaterats!");
    } catch (err) {
      console.error("Could not reorder images:", err);

      // Läs tillbaka faktisk ordning från databasen.
      // Vissa uppdateringar kan ha hunnit lyckas.
      try {
        await fetchImages();
      } catch {
        setImages(previousImages);
      }

      toast.error("Kunde inte ändra bildordningen.");
    } finally {
      setBusy(false);
    }
  };

  const removeImage = async (image: ProductImage) => {
    if (!window.confirm("Vill du ta bort bilden permanent?")) {
      return;
    }

    setBusy(true);

    try {
      const headers = await getAuthHeaders();

      await axios.delete(`${serverURL}/product-images/${image.id}`, {
        headers,
      });

      await fetchImages();
      toast.success("Bilden har tagits bort.");
    } catch (err) {
      console.error("Could not remove image:", err);
      toast.error("Kunde inte ta bort bilden.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mt-12 border-t border-gray-300 pt-8">
      <h2 className="font-cursive text-[2.5rem] mb-4">Produktbilder</h2>

      <p className="font-primary text-gray-600 mb-6">
        Den första bilden används som huvudbild. Ändra ordningen med pilarna.
      </p>

      <div className="mb-8">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={uploading || busy}
          onChange={uploadImages}
          className="hidden"
          id="product-image-upload"
        />

        <button
          type="button"
          disabled={uploading || busy}
          onClick={() => fileInputRef.current?.click()}
          className={buttonClass}
        >
          {uploading ? "Laddar upp..." : "Ladda upp bilder"}
        </button>
      </div>

      {loading ? (
        <p className="font-primary">Hämtar bilder...</p>
      ) : error ? (
        <p className="font-primary text-red-600">{error}</p>
      ) : images.length === 0 ? (
        <p className="font-primary text-gray-500">
          Inga bilder har laddats upp ännu.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="border border-gray-300 rounded-md bg-white overflow-hidden"
            >
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={imageURL(image.image_key)}
                  alt={image.alt_text ?? "Produktbild"}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 350px"
                  className="object-contain"
                />

                {index === 0 && (
                  <span className="absolute top-3 left-3 bg-black text-black text-xs font-primary px-3 py-1 rounded-md">
                    Huvudbild
                  </span>
                )}
              </div>

              <div className="p-4">
                <p className="font-primary text-sm text-gray-500 mb-3">
                  Bild {index + 1} av {images.length}
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busy || index === 0}
                    onClick={() => moveImage(image.id, -1)}
                    className="border border-black rounded-md px-3 py-2 font-primary text-sm disabled:opacity-30 cursor-pointer"
                  >
                    ← Flytta upp
                  </button>

                  <button
                    type="button"
                    disabled={busy || index === images.length - 1}
                    onClick={() => moveImage(image.id, 1)}
                    className="border border-black rounded-md px-3 py-2 font-primary text-sm disabled:opacity-30 cursor-pointer"
                  >
                    Flytta ner →
                  </button>

                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => removeImage(image)}
                    className="border border-red-600 text-red-600 rounded-md px-3 py-2 font-primary text-sm disabled:opacity-30 cursor-pointer"
                  >
                    Ta bort
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
