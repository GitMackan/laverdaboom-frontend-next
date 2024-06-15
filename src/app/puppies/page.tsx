import React from "react";
import { FiCheck } from "react-icons/fi";
import { FaDog } from "react-icons/fa";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { assetUrl } from "@/assets/constants";
import Link from "next/link";
import { ImageCard } from "@/components/ImageCard";
import AnimatedListItem from "@/components/AnimatedListItem";

const Puppies = () => {
	return (
		<div className="pt-[15vh]">
			<ul className="flex gap-[5rem] items-center justify-center max-w-[1600px] m-auto flex-col p-[1rem] lg:flex-row lg:p-[5rem]">
				<AnimatedListItem index={0} className="flex-[1.5]">
					<div>
						<h2 className="m-auto font-cursive text-[4.5rem] lg:text-[4rem] mb-[2rem] border-detail border-b-[1px] w-fit pb-[0.5rem] text-accent">
							Våra Valpar
						</h2>
						<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
							Vi söker valpköpare där hunden får vara en stor del av familjen.
							Vi ser gärna att ni som valpköpare aktiverar era hundar genom
							kurser,viltspår m.m.
						</p>
						<br />
						<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
							Hos oss finns inget speciellt kö-system utan först träffas vi och
							ser vad ni och vi har för förväntningar på den nya
							familjemedlemmen och det nya hemmet. Om allt känns bra så placerar
							vi sedan ut valparna i hem, ut efter hur vi tror och anser att de
							passar bäst.
						</p>
						<h3 className="text-[1.2rem] mt-[2rem] font-normal mb-[1rem] font-secondary">
							Det som följer med valpen när du köper av oss är:
						</h3>
						<ul className="list-none">
							<li className="text-[1.1rem] mb-[0.8rem]">
								<div className="flex items-center gap-[1rem]">
									<FiCheck size={18} />
									<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
										SKK's köpekontrakt{" "}
									</p>
								</div>
							</li>
							<li className="text-[1.1rem] mb-[0.8rem]">
								<div className="flex items-center gap-[1rem]">
									<FiCheck size={18} />
									<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
										Stamtavla{" "}
									</p>
								</div>
							</li>
							<li className="text-[1.1rem] mb-[0.8rem]">
								<div className="flex items-center gap-[1rem]">
									<FiCheck size={18} className="shrink-0" />
									<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
										Ägaranmälan{" "}
									</p>
								</div>
							</li>
							<li className="text-[1.1rem] mb-[0.8rem]">
								<div className="flex items-center gap-[1rem]">
									<FiCheck size={18} className="shrink-0" />
									<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
										Startpaket med valpfoder (samma som valpen ätit hos oss),
										gosedjur, godis och en filt
									</p>
								</div>
							</li>
							<li className="text-[1.1rem] mb-[0.8rem]">
								<div className="flex items-center gap-[1rem]">
									<FiCheck size={18} />
									<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
										Informationsblad om försäkring{" "}
									</p>
								</div>
							</li>
						</ul>
						<h3 className="text-[1.2rem] mt-[2rem] font-normal mb-[1rem] font-secondary">
							När valpen flyttar är den:
						</h3>
						<ul className="list-none">
							<li className="text-[1.1rem] mb-[0.8rem]">
								<div className="flex items-center gap-[1rem]">
									<FiCheck size={18} />
									<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
										Registrerad i SKK
									</p>
								</div>
							</li>
							<li className="text-[1.1rem] mb-[0.8rem]">
								<div className="flex items-center gap-[1rem]">
									<FiCheck size={18} />
									<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
										Minst 8 veckor gammal
									</p>
								</div>
							</li>
							<li className="text-[1.1rem] mb-[0.8rem]">
								<div className="flex items-center gap-[1rem]">
									<FiCheck size={18} />
									<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
										Försäkrad i Folksam mot dolda fel
									</p>
								</div>
							</li>
							<li className="text-[1.1rem] mb-[0.8rem]">
								<div className="flex items-center gap-[1rem]">
									<FiCheck size={18} />
									<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
										Veterinärbesiktigade max 7 dagar innan flytt
									</p>
								</div>
							</li>
							<li className="text-[1.1rem] mb-[0.8rem]">
								<div className="flex items-center gap-[1rem]">
									<FiCheck size={18} />
									<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
										Vaccinerad
									</p>
								</div>
							</li>
							<li className="text-[1.1rem] mb-[0.8rem]">
								<div className="flex items-center gap-[1rem]">
									<FiCheck size={18} />
									<p className="max-w-[650px] tracking-[0.03rem] leading-[2rem] text-[1rem] font-thin">
										ID-märkta med godkänt chip
									</p>
								</div>
							</li>
						</ul>
					</div>
				</AnimatedListItem>
				<AnimatedListItem index={1} className="flex-1">
					<div className="flex flex-col gap-[5rem]">
						<ImageCard imageUrl={`${assetUrl}valpar-midsommar.jpeg`} />
						<ImageCard imageUrl={`${assetUrl}valpar_cover.jpeg`} />
					</div>
				</AnimatedListItem>
			</ul>
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
								Vi planerar en kull till sommaren 2024 mer information kommer
								när parningen är gjord.
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
								Läs mer om våra valpar här
							</Link>
						</div>
					</AnimatedListItem>
				</ul>
			</div>

			<div className="max-w-[1600px] m-auto">
				<div className="flex flex-col w-full lg:w-[80%] m-auto">
					<ul>
						<AnimatedListItem index={0}>
							<h2 className="text-center text-accent my-[5rem] font-cursive text-[3.5rem] lg:text-[4rem] border-detail border-b-[1px] w-fit m-auto">
								Tidigare valpkullar
							</h2>
						</AnimatedListItem>
					</ul>

					<ul className="flex flex-col lg:flex-row justify-center items-center border-[#faeded] border-b-[2px] pb-[3rem] mb-[3rem]">
						<AnimatedListItem index={0} className="flex-1">
							<div className="p-[3rem]">
								<h3 className="font-secondary font-medium text-[1.5rem] mb-[0.5rem]">
									Yxtanejdens Sarek x Laverdabooms Skrållan
								</h3>
								<p className="my-[1rem] font-secondary">2023-07-21</p>
								<ul className="list-none">
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Rosie Cotton </p>
												<p>SE42367/2023</p>
											</div>
										</div>
									</li>
								</ul>
								<ul>
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Legolas </p>
												<p>SE42363/2023</p>
											</div>
										</div>
									</li>
								</ul>
								<ul>
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Bilbo Bagger </p>
												<p>SE42364/2023</p>
											</div>
										</div>
									</li>
								</ul>
								<ul>
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Galadriel </p>
												<p>SE42366/2023</p>
											</div>
										</div>
									</li>
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Gimli </p>
												<p>SE42365/2023</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</AnimatedListItem>
						<AnimatedListItem index={1} className="flex-1">
							<div>
								<div
									className="grid gap-[0.5rem] w-full m-auto"
									style={{ gridTemplateColumns: "1fr 1fr" }}
								>
									<img
										src={`${assetUrl}lotr1.jpeg`}
										className="w-full rounded-xl "
										style={{
											boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
										}}
									/>
									<img
										src={`${assetUrl}lotr2.jpeg`}
										className="w-full rounded-xl "
										style={{
											boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
										}}
									/>
									<img
										src={`${assetUrl}lotr3.jpeg`}
										className="w-full rounded-xl "
										style={{
											boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
										}}
									/>
									<img
										src={`${assetUrl}lotr4.jpeg`}
										className="w-full rounded-xl "
										style={{
											boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
										}}
									/>
									<img
										src={`${assetUrl}lotr5.jpeg`}
										className="w-full rounded-xl "
										style={{
											boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
										}}
									/>
								</div>
							</div>
						</AnimatedListItem>
					</ul>

					<ul className="flex flex-col lg:flex-row justify-center items-center border-[#faeded] border-b-[2px] pb-[3rem] mb-[3rem]">
						<AnimatedListItem index={0} className="flex-1">
							<div className="p-[3rem]">
								<h3 className="font-secondary font-medium text-[1.5rem] mb-[0.5rem]">
									Laverdabooms My Little Pinkie Pie x Ögus Nappe
								</h3>
								<p className="my-[1rem] font-secondary">2021-01-23</p>
								<ul className="list-none">
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Dobby</p>
												<p>SE17821/2021</p>
											</div>
										</div>
									</li>
								</ul>
								<ul>
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Lily Potter</p>
												<p>SE17822/2021</p>
											</div>
										</div>
									</li>
								</ul>
								<ul>
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Luna Lovegood</p>
												<p>SE17819/2021</p>
											</div>
										</div>
									</li>
								</ul>
								<ul>
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Ginny Weasley</p>
												<p>SE17820/2021</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</AnimatedListItem>
						<AnimatedListItem index={1} className="flex-1">
							<div>
								<img
									src={`${assetUrl}valpkull3.jpg`}
									className="w-full rounded-xl "
									style={{
										boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
									}}
								/>
							</div>
						</AnimatedListItem>
					</ul>

					<ul className="flex flex-col lg:flex-row justify-center items-center border-[#faeded] border-b-[2px] pb-[3rem] mb-[3rem]">
						<AnimatedListItem index={0} className="flex-1">
							<div className="p-[3rem]">
								<h3 className="font-secondary font-medium text-[1.5rem] mb-[0.5rem]">
									Laverdabooms My Little Pinkie Pie x Red Top's Tiger Of Sweden
								</h3>
								<p className="my-[1rem] font-secondary">2020-04-12</p>
								<ul className="list-none">
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Mio Min Mio</p>
												<p>SE36328/2020</p>
											</div>
										</div>
									</li>
								</ul>
								<ul>
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												{" "}
												<p>Laverdabooms Skrållan</p>
												<p>SE36329/2020</p>
											</div>
										</div>
									</li>
								</ul>
								<ul>
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Madicken</p>
												<p>SE36330/2020</p>
											</div>
										</div>
									</li>
								</ul>
								<ul>
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms Kajsa Kavat</p>
												<p>SE36331/2020</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</AnimatedListItem>
						<AnimatedListItem index={1} className="flex-1">
							<div>
								<img
									src={`${assetUrl}valpkull2-2.jpg`}
									className="w-full rounded-xl "
									style={{
										boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
									}}
								/>
							</div>
						</AnimatedListItem>
					</ul>

					<ul className="flex flex-col lg:flex-row justify-center items-center pb-[3rem] mb-[3rem]">
						<AnimatedListItem index={0} className="flex-1">
							<div className="p-[3rem]">
								<h3 className="font-secondary font-medium text-[1.5rem] mb-[0.5rem]">
									Chirribi's Mc Laverdatax x Hannes Vom Strootbachtal
								</h3>
								<p className="my-[1rem] font-secondary">2016-03-24</p>
								<ul className="list-none">
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms My Little Shiningarmor</p>
												<p>SE28130/2016</p>
											</div>
										</div>
									</li>
								</ul>
								<ul className="list-none">
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms My Little King Sombra</p>
												<p>SE28131/2016</p>
											</div>
										</div>
									</li>
								</ul>
								<ul className="list-none">
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms My Little Pinkie Pie</p>
												<p>SE28128/2016</p>
											</div>
										</div>
									</li>
								</ul>
								<ul className="list-none">
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms My Little Sweetiebelle</p>
												<p>SE28129/2016</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</AnimatedListItem>
						<AnimatedListItem index={1} className="flex-1">
							<div>
								<img
									src={`${assetUrl}valpkull1.jpg`}
									className="w-full rounded-xl "
									style={{
										boxShadow: "0px 0px 50px 0px rgba(0, 0, 0, 0.5)",
									}}
								/>
							</div>
						</AnimatedListItem>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Puppies;
