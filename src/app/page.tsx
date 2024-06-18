"use client";

import { assetUrl } from "@/assets/constants";
import HeroSection from "@/components/HeroSection";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { useRef } from "react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

export default function Home() {
	const newsRef = useRef<HTMLDivElement>(null);
	return (
		<div>
			<HeroSection />
			<div
				className="min-h-dvh"
				style={{
					background:
						"linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 235, 1) 100%)",
				}}
			>
				<div id="news" className="pb-[8rem] ">
					<div
						className="pt-[12rem] flex lg:px-[3rem] w-full gap-[5rem] flex-col lg:flex-row"
						id="news"
						ref={newsRef}
					>
						<div className="flex-1 ">
							<div className="relative items-center flex justify-center">
								<div
									className="absolute w-[200px] h-[200px] opacity-[10%]"
									style={{ top: "-100px", left: "75px" }}
								>
									<Reveal>
										<img
											src="https://laverdaboom.s3.eu-north-1.amazonaws.com/uploads/dog-paw.png"
											className="w-full h-full max-w-[800px]"
										/>
									</Reveal>
								</div>
								<Reveal>
									<h2 className="font-cursive text-[6rem] text-accent mb-[2rem] w-fit m-auto">
										Vilka är vi?
									</h2>
								</Reveal>
							</div>
							<Reveal>
								<p className="tracking-[0.03rem] font-primary leading-[2rem] px-[3rem] font-light">
									Laverdabooms kennel är en liten kennel som föder upp trevliga
									och sunda hundar i hemmamiljö. Kenneln registrerades 2015 och
									2016 fick vi vår första kull med långhåriga Standardtaxar. Vi
									som äger kenneln är Sandra och min mamma Rosa. På fritiden
									ägnar vi mycket tid till våra hundar och familjen.
									Rallylydnad, Utställning och viltspår är något vi gillar att
									aktivera våra hundar med. Vi Strävar efter att avla friska och
									trevliga hundar och lägger stor vikt i att hitta de perfekta
									hemmen till våra valpar.
								</p>
							</Reveal>
						</div>
						<div className="news-right flex flex-1">
							<Reveal>
								<img
									src={`${assetUrl}laverdaboom.jpeg`}
									alt=""
									className="rounded-xl"
									style={{
										boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
									}}
								/>
							</Reveal>
						</div>
					</div>
				</div>
			</div>
			<div
				className="flex flex-col justify-center pb-[5rem]"
				style={{
					background:
						"linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 235, 1) 100%)",
				}}
			>
				<div className="py-[3rem] flex-[2] flex flex-col-reverse  m-auto gap-[5rem] medium:gap-[2rem] items-center justify-center max-w-[1600px] w-[90%] lg:py-[3rem] lg:flex-row lg:flex">
					<div className="flex flex-col gap-[2rem] m-auto mt-[2rem] lg:ml-[2rem] w-full flex-1">
						<Reveal>
							<img
								src={`${assetUrl}Sirocco.jpeg`}
								className="min-w-[300px] w-full max-w-[400px] m-auto rounded-xl"
								style={{
									boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
								}}
							/>
						</Reveal>
						<Reveal>
							<img
								src={`${assetUrl}bella1.jpg`}
								className="min-w-[300px] w-full max-w-[400px] m-auto rounded-xl"
								style={{
									boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
								}}
							/>
						</Reveal>
					</div>

					<div className="p-[0.5rem] lg:p-[3rem] w-full flex flex-col justify-center items-center flex-[1]">
						<h2 className="text-[3.5rem] lg:text-[4rem] font-cursive text-center color-accent mb-[2rem] border-accent border-b-[1px] w-fit m-auto">
							Planerad valpkull
						</h2>
						<p className="font-extralight">
							Nu är Bella och Sirocco parade. Om allt går som det ska väntar vi
							valpar i mitten av Augusti.
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
				</div>
			</div>
		</div>
	);
}
