import { FiAward } from "react-icons/fi";
import { Dog } from "../page";
import Sidebar from "@/components/Sidebar";
import { assetUrl, colors } from "@/assets/constants";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import { motion } from "framer-motion";
import AnimatedListItem from "@/components/AnimatedListItem";

export default async function Dog({ params }: { params: { name: string } }) {
	const URL = process.env.NEXT_PUBLIC_SERVER_URL;
	console.log(URL);

	const getDogs = await fetch(`${URL}/dogs`);
	const dogs: Dog[] = await getDogs.json();

	const getDog = await fetch(`${URL}/dogs/${params.name}`);
	const dog: Dog = await getDog.json();

	const images: any = dog?.image.map((e) => ({
		original: `${assetUrl}${e}`,
		thumbnail: `${assetUrl}${e}`,
	}));

	return (
		<div>
			<div className="pt-[15vh] bg-white w-full flex flex-col lg:flex-row mb-[4rem]">
				<Sidebar dogs={dogs} />

				<div className="flex flex-col justify-center w-full">
					<h1 className="font-secondary font-thin text-[1.5rem] text-center">
						{dog?.name}
					</h1>
					<div className="flex justify-center m-auto mt-[1.5rem] mb-[5rem] flex-1 w-[80%] mediumw-[70%] lg:w-[60%]">
						{dog?.image && (
							<div className="w-full max-w-[100%]">
								<ImageCarousel dog={dog} />
							</div>
						)}
					</div>
					<div className="w-full lg:w-[80%] m-auto flex justify-center items-centerr relative flex-col pb-[15px]">
						<div className="flex m-auto text-accent text-[1rem] self-center items-center w-[100%] lg:[w-[80%] h-auto rounded-[10px] pb-[3rem] ">
							<ul
								className="grid list-none w-full justify-center gap-x-[1rem] pt-[1rem]"
								style={{
									gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
								}}
							>
								{dog?.regNr && (
									<li className="flex items-center gap-[10px] justify-start">
										<div className="flex justify-center items-center gap-[1rem] py-[1rem] px-[3rem]">
											<div>
												<p className="text-[0.8rem] uppercase">Reg.nr:</p>
												<p className="text-[20px] leading-[2rem]">
													{dog.regNr}
												</p>
											</div>
										</div>
									</li>
								)}
								{dog?.breed && (
									<li className="flex items-center gap-[10px] justify-start">
										<div className="flex justify-center items-center gap-[1rem] py-[1rem] px-[3rem]">
											<div>
												<p className="text-[0.8rem] uppercase">Ras:</p>
												<p className="text-[20px] leading-[2rem]">
													{dog.breed}
												</p>
											</div>
										</div>
									</li>
								)}
								{dog?.gender && (
									<li className="flex items-center gap-[10px] justify-start">
										<div className="flex justify-center items-center gap-[1rem] py-[1rem] px-[3rem]">
											<div>
												<p className="text-[0.8rem] uppercase">Kön:</p>
												<p className="text-[20px] leading-[2rem]">
													{dog.gender}
												</p>
											</div>
										</div>
									</li>
								)}
								{dog?.hairType && (
									<li className="flex items-center gap-[10px] justify-start">
										<div className="flex justify-center items-center gap-[1rem] py-[1rem] px-[3rem]">
											<div>
												<p className="text-[0.8rem] uppercase">Hårlag:</p>
												<p className="text-[20px] leading-[2rem]">
													{dog.hairType}
												</p>
											</div>
										</div>
									</li>
								)}
								{dog?.color && (
									<li className="flex items-center gap-[10px] justify-start">
										<div className="flex justify-center items-center gap-[1rem] py-[1rem] px-[3rem]">
											<div>
												<p className="text-[0.8rem] uppercase">Färg:</p>
												<p className="text-[20px] leading-[2rem]">
													{dog.color}
												</p>
											</div>
										</div>
									</li>
								)}
								{dog?.IVDD && (
									<li className="flex items-center gap-[10px] justify-start">
										<div className="flex justify-center items-center gap-[1rem] py-[1rem] px-[3rem]">
											<div>
												<p className="text-[0.8rem] uppercase">Ivdd:</p>
												<p className="text-[20px] leading-[2rem]">{dog.IVDD}</p>
											</div>
										</div>
									</li>
								)}
								{dog?.BPH && (
									<li className="flex items-center gap-[10px] justify-start">
										<div className="flex justify-center items-center gap-[1rem] py-[1rem] px-[3rem]">
											<div>
												<p className="text-[0.8rem] uppercase">BPH:</p>
												<p className="text-[20px] leading-[2rem]">{dog.BPH}</p>
											</div>
										</div>
									</li>
								)}
								{dog?.eye && (
									<li className="flex items-center gap-[10px] justify-start">
										<div className="flex justify-center items-center gap-[1rem] py-[1rem] px-[3rem]">
											<div>
												<p className="text-[0.8rem] uppercase">Ögon:</p>
												<p className="text-[20px] leading-[2rem]">{dog.eye}</p>
											</div>
										</div>
									</li>
								)}
								{dog?.birthDate && (
									<li className="flex items-center gap-[10px] justify-start">
										<div className="flex justify-center items-center gap-[1rem] py-[1rem] px-[3rem]">
											<div>
												<p className="text-[0.8rem] uppercase">Födelsedatum:</p>
												<p className="text-[20px] leading-[2rem]">
													{dog.birthDate}
												</p>
											</div>
										</div>
									</li>
								)}
							</ul>
						</div>

						{dog?.description && (
							<div className="m-auto bg-[#eff4f4] text-accent font-secondary text-[1.1rem] py-[3rem] px-[1rem] flex justify-center items-center w-full">
								<p className="border-details border-b-[0.5px] pb-[0.5rem] font-thin leading-[1.8rem] lg:w-[70%] w-[90%] text-center m-auto">
									{dog.description}
								</p>
							</div>
						)}
						{dog?.titles && dog?.titles?.length > 0 && (
							<div className="w-full lg:w-[80%] m-auto mt-[3rem]">
								<h5 className="text-[2.2rem] font-secondary font-thin text-center mt-[1rem] mb-[3rem]">
									Titlar & Meriter
								</h5>

								<div className="w-[80%] m-auto lg:w-full">
									<ul className="flex flex-wrap justify-between gap-y-[2rem] gap-[1rem]">
										{dog?.titles.map((e, index) => (
											<AnimatedListItem
												index={index}
												className="flex w-full sm:w-[250px] text-accent font-medium p-[0.5rem] items-center gap-[0.6rem] h-[50px] text-[1.2rem] justify-start font-secondary border-[#faeded] border-b-[2px]"
											>
												<FiAward color={"#324b4c"} size={24} />
												<p>{e}</p>
											</AnimatedListItem>
										))}
									</ul>
								</div>
							</div>
						)}
					</div>
					{dog?.pedigree && dog.pedigree.length > 0 && (
						<div className="w-full">
							<div className="w-[90%] border-none py-[3rem] m-auto">
								<h2 className="text-[2.2rem] font-secondary font-thin text-center mt-[1rem] mb-[3rem] text-accent">
									Stamtavla
								</h2>

								<div className="flex w-full h-auto">
									<div className="flex flex-1 flex-col">
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[0].titles?.join(" ")}
											</span>
											<p>{dog.pedigree[0]?.name}</p>
										</div>
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[1]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[1]?.name}</p>
										</div>
									</div>
									<div className="flex flex-1 flex-col">
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[2]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[2]?.name}</p>
										</div>
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[3]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[3]?.name}</p>
										</div>
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[4]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[4]?.name}</p>
										</div>
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[5]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[5]?.name}</p>
										</div>
									</div>
									<div className="flex flex-1 flex-col">
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[6]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[6]?.name}</p>
										</div>
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[7]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[7]?.name}</p>
										</div>
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[8]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[8]?.name}</p>
										</div>
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[9]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[9]?.name}</p>
										</div>
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[10]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[10]?.name}</p>
										</div>
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[11]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[11]?.name}</p>
										</div>
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[12]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[12]?.name}</p>
										</div>
										<div
											className="flex flex-1 justify-center font-thin py-[1.5rem] px-[0.5rem] font-secondary text-[1.2rem] flex-col gap-[0.3rem] text-center text-accent"
											style={{
												background:
													"linear-gradient(white, rgb(250, 237, 237))",
												boxShadow: `0px 0px 0.8px 0px ${colors.accent}`,
											}}
										>
											<span className="font-thin text-[1rem] text-[#5a888a]">
												{dog?.pedigree[13]?.titles?.join(" ")}
											</span>
											<p>{dog.pedigree[13]?.name}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
