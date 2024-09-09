import { assetUrl } from "@/assets/constants";
import AnimatedListItem from "@/components/AnimatedListItem";
import React from "react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { FaDog } from "react-icons/fa";

const CurrentPuppies = () => {
	return (
		<div className="pt-[15vh]">
			<div className="max-w-[1600px] flex flex-col w-full lg:w-[80%] m-auto">
				<ul>
					<AnimatedListItem index={0}>
						<h2 className="text-center text-accent my-[5rem] font-cursive text-[3.5rem] lg:text-[4rem] border-detail border-b-[1px] w-fit m-auto">
							Aktuell valpkull
						</h2>
					</AnimatedListItem>
				</ul>
				<ul className="flex flex-col lg:flex-row justify-center items-center  pb-[3rem] mb-[3rem] gap-[3rem]">
					<AnimatedListItem index={0} className="flex-1">
						<div className="p-[3rem]">
							<p className="mb-[3rem] text-[1rem] font-secondary border-b-[0.1px] border-detail uppercase w-fit">
								En tik i kullen söker ett hem
							</p>
							<div className="flex flex-col gap-[1.5rem]">
								<div className="flex justify-stretch items-center gap-[1rem] border-b-[.5px] border-b-detail pb-[1.5rem]">
									<BsGenderMale size={32} />
									<div>
										<p className="text-[#767171] font-secondary">SE U(V)CH</p>
										<h3 className="font-secondary font-medium text-[1.5rem]">
											Bella Rose Marzenie Gabrysi
										</h3>

										<p className="text-[#767171] font-secondary">
											Eye test - Clear
										</p>
										<p className="text-[#767171] font-secondary">CDDY/CDDY</p>
									</div>
								</div>
								<div className="flex justify-stretch items-center gap-[1rem]">
									<BsGenderFemale size={32} />
									<div>
										<p className="text-[#767171] font-secondary">
											SE U(V)CH SE VCH
										</p>
										<h3 className="font-secondary font-medium text-[1.5rem]">
											Pazir's Sirocco
										</h3>

										<p className="text-[#767171] font-secondary">
											Eye test - Clear
										</p>
										<p className="text-[#767171] font-secondary">IVDD 0</p>
									</div>
								</div>
							</div>
							<p className="mb-[1.5rem] mt-[2rem] font-secondary">2024-08-12</p>
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
	);
};

export default CurrentPuppies;
