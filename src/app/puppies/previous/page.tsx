import { assetUrl } from "@/assets/constants";
import AnimatedListItem from "@/components/AnimatedListItem";
import React from "react";
import { FaDog } from "react-icons/fa";

const PreviousPuppies = () => {
	return (
		<div className="pt-[15vh]">
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
									Pazir's Sirocco x Bella Rose Marzenie Gabrysi
								</h3>
								<p className="my-[1rem] font-secondary">2024-08-12</p>
								<ul className="list-none">
									<li className="mb-[1rem]">
										<div className="flex items-center gap-[1rem] font-secondary leading-[1.5rem] border-[#faeded] border-b-[2px] p-[1rem]">
											<FaDog size={18} />
											<div>
												<p>Laverdabooms PS TAMINA</p>
												<p>SE40939/2024</p>
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
												<p>SE40940/2024</p>
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
												<p>SE40941/2024</p>
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
												<p>SE40942/2024</p>
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

export default PreviousPuppies;
