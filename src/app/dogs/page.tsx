import { assetUrl } from "../../assets/constants";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AnimatedListItem from "@/components/AnimatedListItem";
import { Database } from "@/types/supabase";

export type Parent = {
	name: string;
	titles: string;
};

type Dog = Database['public']['Tables']['dogs']['Row']

export default async function Dogs() {
	const URL = process.env.NEXT_PUBLIC_SERVER_URL

	const res = await fetch(URL + '/dogs', { method: 'GET', cache: 'no-store' });
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
												<img src={`${assetUrl}${e?.image?.[0]}`} alt="img" className="max-h-[100%] max-w-full cursor-pointer rounded-xl"/>
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
