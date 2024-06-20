import { assetUrl } from "@/assets/constants";
import AnimatedListItem from "@/components/AnimatedListItem";
import Link from "next/link";
import React from "react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

const PlannedPuppies = () => {
	return (
		<div className="pt-[15vh]">
			<div
				className="flex flex-col justify-center pb-[5rem]"
				style={{
					background:
						"linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 235, 1) 100%)",
				}}
			>
				<ul className="py-[3rem] flex flex-col-reverse  m-auto gap-[5rem] medium:gap-[2rem] items-center justify-center max-w-[1600px] w-[90%] lg:py-[3rem] lg:flex-row lg:flex">
					<AnimatedListItem index={0} className="w-full flex-1">
						<div className="flex flex-col gap-[2rem] m-auto mt-[2rem] lg:ml-[2rem] w-full">
							<img
								src={`${assetUrl}Sirocco.jpeg`}
								className="min-w-[300px] w-full max-w-[400px] m-auto rounded-xl "
								style={{
									boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
								}}
							/>
							<img
								src={`${assetUrl}bella1.jpg`}
								className="min-w-[300px] w-full max-w-[400px] m-auto rounded-xl "
								style={{
									boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
								}}
							/>
						</div>
					</AnimatedListItem>
					<AnimatedListItem index={1} className="w-full flex-[1.5]">
						<div className="p-[0.5rem] lg:p-[3rem] w-full flex flex-col justify-center items-center">
							<h2 className="text-[3.5rem] lg:text-[4rem] font-cursive text-center color-accent mb-[2rem] border-accent border-b-[1px] w-fit m-auto">
								Planerad valpkull
							</h2>
							<p className="font-extralight">
								Nu är Bella och Sirocco parade. Om allt går som det ska väntar
								vi valpar i mitten av Augusti.
							</p>
							<div className="flex justify-center items-center gap-[1rem] max-w-[600px] p-[1rem]">
								<BsGenderMale size={40} className={"gender-icon"} />
								<p className="font-extralight">
									<b className="text-[1.2rem] uppercase font-secondary font-normal text-accent">
										Sire:
									</b>{" "}
									SE U(V)CH SE VCH Pazir's Sirocco (Ögus Nappe x Koppargläntans
									Debbi Fergusson) Öga UA IVDD0
								</p>
							</div>
							<div className="flex justify-center items-center gap-[1rem] max-w-[600px] p-[1rem]">
								<BsGenderFemale size={40} className={"gender-icon"} />
								<p className="font-extralight">
									<b className="text-[1.2rem] uppercase font-secondary font-normal text-accent">
										Dam:
									</b>{" "}
									SE U(V)CH Bella Rose Marzenie Gabrysi (Figarro Rude x Secret
									Garden Slim Extreme) Öga UA Bph-Genomförd
								</p>
							</div>
							<Link
								href={"/puppies"}
								className="font-extralight underline underline-offset-4"
							>
								Köpa valp från oss? Titta hit.
							</Link>
						</div>
					</AnimatedListItem>
				</ul>
			</div>
		</div>
	);
};

export default PlannedPuppies;
