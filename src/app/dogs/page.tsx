import { assetUrl } from "../../assets/constants";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AnimatedListItem from "@/components/AnimatedListItem";

export type Parent = {
	name: string;
	titles: string;
};

export type Dog = {
	id: number;
	name: string;
	breed?: string;
	gender?: string;
	size?: string;
	hair_type?: string;
	reg_nr?: string;
	color?: string;
	IVDD?: string;
	nickname: string;
	BPH?: string;
	eye?: string;
	birth_date?: string;
	description?: string;
	angel_dog?: string;
	titles?: string[];
	image: string[];
	pedigree: Parent[];
};

export default async function Dogs() {
	const URL = process.env.NEXT_PUBLIC_SERVER_URL

	const res = await fetch(URL + '/dogs', { method: 'GET', cache: 'no-store' });
	console.log("res: ", res)
	const dogs: Dog[] = await res.json();


	return (
		<div>
			<div className="pt-[15vh] bg-white w-full gap-y-[2rem] flex flex-col mb-[4rem] lg:flex-row">
				<Sidebar dogs={dogs} />
				<div className="w-full">
					<div className="p-[2rem] grid gap-y-[3rem] gap-x-[3rem] w-full grid-cols-small lg:grid-cols-large">
						{dogs
							?.filter(
								(e) =>
									e.breed === "Tax" &&
									e.gender === "Tik" &&
									e.angel_dog !== "true"
							)
							.map((e, index) => (
								<ul
									key={e.id}
									className="flex flex-col text-center gap-[1rem] overflow-hidden"
								>
									<AnimatedListItem index={index}>
										<h3 className="text-[1.1rem] font-secondary font-thin mb-[.5rem]">
											{e.name} {e.nickname === "Astrid" && ` - ${e.nickname}`}
										</h3>
										<Link
											href={`/dogs/${e.nickname}`}
											className="m-auto"
										>
											<div className="w-full overflow-hidden">
												<img
													src={`${assetUrl}${e?.image?.[0]}`}
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
									e.breed === "Tax" &&
									e.gender === "Hane" &&
									e.angel_dog !== "true"
							)
							.map((e, index) => (
								<ul
									key={e.id}
									className="flex flex-col text-center gap-[1rem] overflow-hidden"
								>
									<AnimatedListItem index={index}>
										<h3 className="text-[1.1rem] font-secondary font-thin mb-[.5rem]">
											{e.name}
										</h3>
										<Link
											href={`/dogs/${e.nickname}`}
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
