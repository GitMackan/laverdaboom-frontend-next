import { assetUrl } from "@/assets/constants";
import AnimatedListItem from "@/components/AnimatedListItem";
import React from "react";

const PlannedPuppies = () => {
	return (
		<div className="pt-[15vh]">
			<div
				className="flex flex-col justify-start pb-[5rem] min-h-[80dvh]"
				style={{
					background:
						"linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 235, 1) 100%)",
				}}
			>
				<ul>
					<AnimatedListItem index={0}>
						<h2 className="text-center text-accent my-[5rem] font-cursive text-[3.5rem] lg:text-[4rem] border-detail border-b-[1px] w-fit m-auto">
							Planerade valpar
						</h2>
					</AnimatedListItem>
					<AnimatedListItem index={0}>
						<p className="text-center text-accent my-[5rem] font-secondary text-[0.9rem] lg:text-[1.1em]  w-[90%] lg:w-[50%] m-auto">
							I juni väntar vi med stor glädje vår valpkull efter Daxwall´s Dream Come True & Huntaks Look At Me Now ✨🐾
Förväntningarna är en kull med trevliga hundar, både mentalt och exteriört. Pappan bär även genen N/CDDY, så det blir spännande att se om den förs vidare till någon av valparna.
						</p>
						<img src={`${assetUrl}hippo-knopa.png`} alt="" className="max-h-[100%] w-[90%] lg:w-[60%] max-w-[100%] cursor-pointer rounded-xl m-auto" />
					</AnimatedListItem>
				</ul>

			</div>
		</div>
	);
};

export default PlannedPuppies;
