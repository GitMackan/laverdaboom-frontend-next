import { assetUrl } from "@/assets/constants";
import AnimatedListItem from "@/components/AnimatedListItem";
import React from "react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { FaDog } from "react-icons/fa";

const CurrentPuppies = () => {
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
							Aktuell valpkull
						</h2>
					</AnimatedListItem>
					<AnimatedListItem index={0}>
						<p className="text-center text-accent my-[5rem] font-secondary text-[0.9rem] lg:text-[1.1em] w-fit m-auto">
							För tillfället har vi ingen aktuell valpkull.
						</p>
					</AnimatedListItem>
				</ul>
			</div>
		</div>
	);
};

export default CurrentPuppies;
