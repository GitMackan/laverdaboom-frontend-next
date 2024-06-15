"use client";

import React, { useEffect } from "react";
import { FiMinus } from "react-icons/fi";
import Link from "next/link";
import { Dog } from "@/app/dogs/page";
import { useWindowSize } from "@/utils/useWindowSize";
import MobileSidebar from "./MobileSidebar";

const Sidebar = ({ dogs }: SidebarProps) => {
	const screenWidth = useWindowSize().width;
	const maleDogs = dogs?.filter((e) => e.gender?.toLowerCase() === "hane");
	const femaleDogs = dogs?.filter(
		(e) => e.gender?.toLowerCase() === "tik" && e.angelDog !== "true"
	);
	const angelDogs = dogs?.filter((e) => e.angelDog?.toLowerCase() === "true");

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

	return screenWidth! < 1150 ? (
		<MobileSidebar dogs={dogs} />
	) : (
		<div className="border-solid border-r-[1px] border-dark pl-[2rem] pr-[3rem]">
			<div className="mb-[2rem] font-secondary text-[1.2rem]">
				<Link href={"/dogs"}>
					<p className="cursor-pointer">Se alla</p>
				</Link>
			</div>
			<ul className="list-none mb-[2rem]">
				<h3 className="text-[1.1rem] font-secondary uppercase font-light border-solid border-detail border-b-[1px] w-fit pb-[0.2rem] mb-[1rem]">
					Tikar
				</h3>
				{femaleDogs?.map((e) => (
					<li key={e._id} className="my-[0.5rem] font-secondary">
						<Link href={`/dogs/${generateSelectedDogName(e.nickName)}`}>
							<div className="flex items-center gap-[0.5rem]">
								{/* <FiMinus size={10} /> */}
								<p className="cursor-pointer font-[1.1rem] hover:underline">
									{e.nickName}
								</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
			<ul className="list-none mb-[2rem]">
				<h3 className="text-[1.1rem] font-secondary uppercase font-light border-solid border-detail border-b-[1px] w-fit pb-[0.2rem] mb-[1rem]">
					Hanar
				</h3>
				{maleDogs?.map((e) => (
					<li key={e._id} className="my-[0.5rem] font-secondary">
						<Link href={`/dogs/${generateSelectedDogName(e.nickName)}`}>
							<div className="flex items-center gap-[0.5rem]">
								{/* <FiMinus size={10} /> */}
								<p className="cursor-pointer font-[1.1rem] hover:underline">
									{e.nickName}
								</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
			<ul className="list-none mb-[2rem]">
				<h3 className="text-[1.1rem] font-secondary uppercase font-light border-solid border-detail border-b-[1px] w-fit pb-[0.2rem] mb-[1rem]">
					Änglahundar
				</h3>
				{angelDogs?.map((e) => (
					<li key={e._id} className="my-[0.5rem] font-secondary">
						<Link href={`/dogs/${generateSelectedDogName(e.nickName)}`}>
							<div className="flex items-center gap-[0.5rem]">
								{/* <FiMinus size={10} /> */}
								<p className="cursor-pointer font-[1.1rem] hover:underline">
									{e.nickName}
								</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;

interface SidebarProps {
	dogs: Dog[] | undefined;
}
