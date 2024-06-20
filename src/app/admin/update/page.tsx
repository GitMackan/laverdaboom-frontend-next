"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FiX } from "react-icons/fi";
// import PedigreeModal from "../../components/PedigreeModal/PedigreeModal";
import { BarLoader } from "react-spinners";
import SucessModal from "@/components/SuccessModal";
import { Dog } from "@/app/dogs/page";
import { assetUrl } from "@/assets/constants";
import Link from "next/link";
import AnimatedListItem from "@/components/AnimatedListItem";

export type Parent = {
	name: string;
	titles: string[];
};

export type Pedigree = Parent[];

const Update = () => {
	const [dogs, setDogs] = useState<Dog[] | undefined>();
	const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
	const URL = process.env.NEXT_PUBLIC_SERVER_URL;

	axios.defaults.withCredentials = true;

	useEffect(() => {
		axios.get(`${URL}/dogs`).then((response) => {
			setDogs(response.data);
		});
	}, []);

	console.log(dogs);

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
		<div className="pt-[15vh]">
			<div className="mt-[3rem] w-full">
				<div>
					<h1 className="font-cursive text-[4rem] text-accent text-center mb-[2rem]">
						Uppdatera
					</h1>
				</div>
				<div className="w-full">
					<div className="p-[2rem] grid gap-y-[3rem] gap-x-[3rem] w-full grid-cols-small lg:grid-cols-large">
						{dogs?.map((e, index) => (
							<ul
								key={e._id}
								className="flex flex-col text-center gap-[1rem] overflow-hidden"
							>
								<AnimatedListItem index={index}>
									<h3 className="text-[1.1rem] font-secondary font-thin mb-[.5rem]">
										{e.name} {e.nickName === "Astrid" && ` - ${e.nickName}`}
									</h3>
									<Link
										href={`/admin/update/${generateSelectedDogName(
											e.nickName
										)}`}
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default Update;
