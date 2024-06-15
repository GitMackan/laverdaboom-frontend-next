"use client";

import { Dog } from "@/app/dogs/page";
import { assetUrl } from "@/assets/constants";
import ImageGallery from "react-image-gallery";

import "./styles.scss";

interface ImageCarouselProps {
	dog: Dog;
}

export default function ImageCarousel({ dog }: ImageCarouselProps) {
	const images: any = dog?.image.map((e) => ({
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
