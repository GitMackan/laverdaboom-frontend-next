import { assetUrl } from "../../assets/constants";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AnimatedListItem from "@/components/AnimatedListItem";

export type Parent = {
	name: string;
	titles: string[];
};

export type Dog = {
	_id: string;
	name: string;
	breed?: string;
	gender?: string;
	size?: string;
	hairType?: string;
	regNr?: string;
	color?: string;
	IVDD?: string;
	nickName: string;
	BPH?: string;
	eye?: string;
	birthDate?: string;
	description?: string;
	angelDog?: string;
	titles?: string[];
	image: string[];
	pedigree: Parent[];
};

export default async function Dogs() {
	const URL = "https://laverdaboom-api.herokuapp.com";

	const res = await fetch(`${URL}/dogs`);
	const dogs: Dog[] = await res.json();

	const generateSelectedDogName = (name: string): string => {
		const characterMap = {
			å: "a",
			ä: "a",
			ö: "o",
		};

		const sanitizedName = name
			.toLowerCase()
			.replace(/[åäö]/g, (match) => (characterMap as any)[match] || match);

		return sanitizedName;
	};

	return (
		<div>
			<div className="pt-[15vh] bg-white w-full gap-y-[2rem] flex flex-col mb-[4rem] lg:flex-row">
				<Sidebar dogs={dogs} />
				<div className="w-full">
					<div className="p-[2rem] grid gap-y-[3rem] gap-x-[3rem] w-full grid-cols-small lg:grid-cols-large">
						{dogs
							?.filter(
								(e) =>
									e.breed === "Normalstor Tax" &&
									e.gender === "Tik" &&
									e.angelDog !== "true"
							)
							.map((e, index) => (
								<ul
									key={e._id}
									className="flex flex-col text-center gap-[1rem] overflow-hidden"
								>
									<AnimatedListItem index={index}>
										<h3 className="text-[1.1rem] font-secondary font-thin mb-[.5rem]">
											{e.name} {e.nickName === "Astrid" && ` - ${e.nickName}`}
										</h3>
										<Link
											href={`/dogs/${generateSelectedDogName(e.nickName)}`}
											className="m-auto"
										>
											<div className="w-full overflow-hidden">
												<img
													src={`${assetUrl}${e.image[0]}`}
													className="max-h-[100%] max-w-full cursor-pointer rounded-xl"
												/>
											</div>
										</Link>
									</AnimatedListItem>
								</ul>
							))}
						{dogs
							?.filter(
								(e) =>
									e.breed === "Normalstor Tax" &&
									e.gender === "Hane" &&
									e.angelDog !== "true"
							)
							.map((e, index) => (
								<ul
									key={e._id}
									className="flex flex-col text-center gap-[1rem] overflow-hidden"
								>
									<AnimatedListItem index={index}>
										<h3 className="text-[1.1rem] font-secondary font-thin mb-[.5rem]">
											{e.name}
										</h3>
										<Link
											href={`/dogs/${generateSelectedDogName(e.nickName)}`}
											className="m-auto"
										>
											<div className="w-full overflow-hidden">
												<img
													src={`${assetUrl}${e.image[0]}`}
													className="max-h-[100%] max-w-[100%] cursor-pointer rounded-xl"
												/>
											</div>
										</Link>
									</AnimatedListItem>
								</ul>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
