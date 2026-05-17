"use client";

import { assetUrl } from "@/assets/constants";
import ImageGallery from "react-image-gallery";

type Dog = Database['public']['Tables']['dogs']['Row']

import "./styles.scss";
import { Database } from "@/types/supabase";

interface ImageCarouselProps {
	dog: Dog;
}

export default function ImageCarousel({ dog }: ImageCarouselProps) {
	const images: any = dog?.image?.map((e) => ({
		original: `${assetUrl}${e}`,
		thumbnail: `${assetUrl}${e}`,
	}));

	return (
		<div>
			<ImageGallery
				items={images}
				showBullets={true}
				showPlayButton={false}
				autoPlay={false}
			/>
		</div>
	);
}
