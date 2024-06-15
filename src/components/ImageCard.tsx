"use client";

import React from "react";
import { CardContainer, CardItem } from "./3d-card";

interface ImageCardProps {
	imageUrl: string;
}

export function ImageCard({ imageUrl }: ImageCardProps) {
	return (
		<CardContainer>
			<CardItem translateZ="100" className="w-full">
				<img
					src={imageUrl}
					style={{ boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)" }}
					height="1000"
					width="1000"
					className="w-full rounded-xl "
					alt="thumbnail"
				/>
			</CardItem>
		</CardContainer>
	);
}
