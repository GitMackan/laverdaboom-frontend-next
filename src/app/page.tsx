"use client";

import { assetUrl } from "@/assets/constants";
import AnimatedListItem from "@/components/AnimatedListItem";
import HeroSection from "@/components/HeroSection";
import Reveal from "@/components/Reveal";
import { useRef } from "react";
import { FaDog } from "react-icons/fa";

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
				<div id="news" className="pb-[3.5rem] md:pb-[8rem] ">
					<div
						className="pt-[12rem] flex lg:px-[3rem] w-full gap-[5rem] flex-col lg:flex-row"
						id="news"
						ref={newsRef}
					>
						<div className="flex-1">
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
								<p className="tracking-[0.03rem] font-primary leading-[2rem] px-[1.5rem] lg:px-[3rem] font-light">
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
				className="flex flex-col justify-center md:pb-[5rem]"
				style={{
					background:
						"linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 235, 1) 100%)",
				}}
			>
				<div className="py-[3rem] flex-[2] flex flex-col-reverse  m-auto gap-[5rem] medium:gap-[2rem] items-center justify-center max-w-[1600px] w-[100%] lg:w-[90%] lg:py-[3rem] lg:flex-row lg:flex">
					<div className="max-w-[1600px] flex flex-col w-full lg:w-[80%] m-auto">
						<ul>
							<AnimatedListItem index={0}>
								<h2 className="text-center text-accent md:my-[5rem] font-cursive text-[4rem] lg:text-[4rem] border-detail border-b-[1px] w-fit m-auto">
									Aktuell valpkull
								</h2>
							</AnimatedListItem>
						</ul>
						<ul className="flex flex-col lg:flex-row justify-center items-center  md:pb-[3rem] mb-[3rem] gap-[3rem]">
							<AnimatedListItem index={0} className="flex-1">
								<div className="p-[3rem]">
									<p className="mb-[3rem] text-[1rem] font-secondary border-b-[0.1px] border-detail uppercase w-fit">
										En tik i kullen söker ett hem
									</p>
									<h3 className="font-secondary font-medium text-[1.5rem] mb-[0.5rem]">
										Bella Rose Marzenie Gabrysi x Pazir's Sirocco
									</h3>
									<p className="my-[1rem] font-secondary">2024-08-12</p>
									<ul className="list-none">
										<li className="mb-[1rem]">
											<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
												<FaDog size={18} />
												<div>
													<p>Laverdabooms PS TAMINA</p>
													{/* <p>SE17821/2021</p> */}
												</div>
											</div>
										</li>
									</ul>
									<ul>
										<li className="mb-[1rem]">
											<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
												<FaDog size={18} />
												<div>
													<p>Laverdabooms PS TESS</p>
													{/* <p>SE17822/2021</p> */}
												</div>
											</div>
										</li>
									</ul>
									<ul>
										<li className="mb-[1rem]">
											<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
												<FaDog size={18} />
												<div>
													<p>Laverdabooms PS TINDRA</p>
													{/* <p>SE17819/2021</p> */}
												</div>
											</div>
										</li>
									</ul>
									<ul>
										<li className="mb-[1rem]">
											<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
												<FaDog size={18} />
												<div>
													<p>Laverdabooms PS TOSCA</p>
													{/* <p>SE17820/2021</p> */}
												</div>
											</div>
										</li>
									</ul>
								</div>
							</AnimatedListItem>
							<div className="flex flex-col w-[100%] flex-1 gap-[3rem]">
								<AnimatedListItem index={1} className="flex-1">
									<div>
										<div
											className="grid gap-[0.5rem] w-full m-auto"
											style={{ gridTemplateColumns: "1fr 1fr" }}
										>
											<img
												src={`${assetUrl}bella-orange.jpg`}
												className="w-full rounded-xl "
												style={{
													boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
												}}
											/>
											<img
												src={`${assetUrl}bella-gul.jpg`}
												className="w-full rounded-xl "
												style={{
													boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
												}}
											/>
											<img
												src={`${assetUrl}bella-lila.jpg`}
												className="w-full rounded-xl "
												style={{
													boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
												}}
											/>
											<img
												src={`${assetUrl}bella-red.jpg`}
												className="w-full rounded-xl "
												style={{
													boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
												}}
											/>
										</div>
									</div>
								</AnimatedListItem>
								<AnimatedListItem index={1} className="flex-1">
									<div>
										<img
											src={`${assetUrl}bella-with-puppies.jpg`}
											className="w-full rounded-xl "
											style={{
												boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
											}}
										/>
									</div>
								</AnimatedListItem>
							</div>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
