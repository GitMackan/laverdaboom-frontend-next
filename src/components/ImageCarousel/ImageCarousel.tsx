"use client";

import { assetUrl } from "@/assets/constants";
import ImageGallery from "react-image-gallery";
import { Database } from "@/types/supabase";
import "./styles.scss";

type Dog = Database["public"]["Tables"]["dogs"]["Row"];

export default function ImageCarousel({ dog }: { dog: Dog }) {
  const images = (dog.image ?? []).filter((image) => image.trim()).map((image, index) => ({
    original: `${assetUrl}${image}`,
    thumbnail: `${assetUrl}${image}`,
    originalAlt: `${dog.nickname || dog.name}, bild ${index + 1}`,
    thumbnailAlt: `Visa bild ${index + 1} av ${dog.nickname || dog.name}`,
  }));

  if (!images.length) return null;

  return <ImageGallery items={images} showBullets={images.length > 1} showThumbnails={images.length > 1} showNav={images.length > 1} showPlayButton={false} autoPlay={false} />;
}
