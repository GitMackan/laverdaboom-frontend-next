import React from "react";
import { FiCheck } from "react-icons/fi";
import { assetUrl } from "@/assets/constants";
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
		</div>
	);
};

export default Puppies;
