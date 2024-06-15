"use client";

import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { assetUrl } from "@/assets/constants";
import AnimatedListItem from "./AnimatedListItem";

const Footer = () => {
	return (
		<div
			className="min-h-[60vh] flex flex-col justify-center pt-[10vh]"
			style={{
				background:
					"radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(204, 210, 210, 1) 0%, rgba(196, 203, 203, 1) 0%, rgba(176, 186, 186, 1) 0%, rgba(151, 164, 165, 1) 0%, rgba(109, 127, 128, 1) 0%, rgba(50, 75, 76, 1) 100%)",
			}}
		>
			<ul className="flex flex-col medium:flex-row gap-[4rem] items-center justify-around m-auto w-full">
				<AnimatedListItem index={0}>
					<div className="flex flex-col gap-[0.3rem] text-center text-[1.1rem]">
						<div className="max-w-[300px] mb-[2rem]">
							<img
								src={`${assetUrl}sandra.jpeg`}
								className="rounded-full max-w-[100%] border-solid border-[1px] border-secondary"
							/>
						</div>
						<p className="mb-[1rem] text-[2rem] text-grey">Sandra Brännström</p>
						<p className="text-grey">Sigfrid Edströms Gata 25B</p>
						<p className="text-grey">724 66 Västerås</p>
						<a
							href="mailto:sandra.brannstrom@hotmail.se"
							className="text-grey underline"
						>
							sandra.brannstrom@hotmail.com
						</a>
						<div className="flex justify-center gap-[2rem] mt-[1rem]">
							<div className="text-[3rem] cursor-pointer">
								<FaFacebook
									color="white"
									onClick={() => {
										window.open(
											"https://www.facebook.com/profile.php?id=100008493274506",
											"_blank"
										);
									}}
								/>
							</div>

							<div className="text-[3rem] cursor-pointer">
								<FaInstagram
									color="white"
									onClick={() => {
										window.open(
											"https://www.instagram.com/sandra_kennellaverdaboom/",
											"_blank"
										);
									}}
								/>
							</div>
						</div>
					</div>
				</AnimatedListItem>
				<AnimatedListItem index={1}>
					<div className="flex flex-col gap-[0.3rem] text-center text-[1.1rem]">
						<div className="max-w-[300px] mb-[2rem]">
							<img
								src={`${assetUrl}rosa.jpeg`}
								className="rounded-full max-w-[100%] border-solid border-[1px] border-secondary"
							/>
						</div>
						<p className="mb-[1rem] text-[2rem] text-grey">Rosa Johansson</p>
						<p className="text-grey">Tunnbrödsvägen 3</p>
						<p className="text-grey">724 84 Västerås</p>
						<a
							className="text-grey underline"
							href="mailto:rosajohansson@hotmail.se"
						>
							rosajohansson@hotmail.se
						</a>
						<div className="flex justify-center gap-[2rem] mt-[1rem]">
							<div className="text-[3rem] cursor-pointer">
								<FaFacebook
									color="white"
									onClick={() => {
										window.open(
											"https://www.facebook.com/rosa.johansson.5",
											"_blank"
										);
									}}
								/>
							</div>

							<div className="text-[3rem] cursor-pointer">
								<FaInstagram
									color="white"
									onClick={() => {
										window.open(
											"https://www.instagram.com/rosaajohansson/",
											"_blank"
										);
									}}
								/>
							</div>
						</div>
					</div>
				</AnimatedListItem>
			</ul>
			<p className="text-grey text-center text-[14px] my-[3rem]">
				© 2023 Kennel Laverdaboom
			</p>
		</div>
	);
};

export default Footer;
