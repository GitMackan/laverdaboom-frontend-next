"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Hamburger from "hamburger-react";
import { motion } from "framer-motion";
import { colors } from "@/assets/constants";
import { usePathname } from "next/navigation";

const navItems = [
	{ label: "Hem", href: "/" },
	{ label: "Våra hundar", href: "/dogs" },
	{
		label: "Valpar",
		href: "/puppies",
		childLinks: [
			{ name: "Valpköp", href: "/puppies" },
			{ name: "Tidigare valpar", href: "/puppies/previous" },
			{ name: "Plannerade valpar", href: "/puppies/planned" },
		],
	},
	{ label: "Nyheter", href: "/news" },
	{ label: "Kontakt", href: "/contact" },
];

const fadeInAnimationVariants = {
	initial: {
		opacity: 0,
		y: 100,
	},
	animate: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.15 * index,
		},
	}),
};

const Navbar = () => {
	const pathname = usePathname();
	const [topScroll, setTopScroll] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [mobilePuppieSectionOpen, setMobilePuppieSectionOpen] = useState(false);
	const changeBackground = () => {
		if (window.scrollY >= 80) {
			setTopScroll(false);
		} else {
			setTopScroll(true);
		}
	};

	useEffect(() => {
		changeBackground();
		window.addEventListener("scroll", changeBackground);
	}, []);

	function CustomLink({
		to,
		children,
		className,
		active,
		...props
	}: {
		to: string;
		children: React.ReactNode;
		className?: string;
		active: boolean;
	}) {
		const setBorder = (): string => {
			if (pathname === "/") return active ? "" : "hover:border-b-[1px]";

			return active ? "" : "hover:border-accent hover:border-b-[1px]";
		};

		const setHoverColor = (): string => {
			if (!active) return "";
			return pathname === "/"
				? "border-b-[3px] border-white"
				: "border-b-[3px] border-accent";
		};

		const setColor = (): string => {
			if (pathname === "/") return !topScroll ? colors.accent : colors.grey;

			return colors.accent;
		};

		return (
			<div className={className}>
				<div
					className={`flex flex-col justify-center items-center mx-[1rem] ${setBorder()} ${setHoverColor()} `}
				>
					<li>
						<Link
							href={to}
							{...props}
							className="uppercase text-[0.9rem] font-primary font-light"
							style={{
								color: setColor(),
							}}
						>
							{children}
						</Link>
					</li>
				</div>
			</div>
		);
	}
	return (
		<nav
			className="fixed w-full flex justify-between items-center py-[1rem] px-[2rem] z-10 min-h-[10vh]"
			id="navbar"
			style={{
				background: topScroll ? "transparent" : "#FFF",
			}}
		>
			<div className="flex items-center justify-center">
				<h1 className="text-[3rem] font-cursive font-bold z-[995]">
					<Link
						href="/"
						style={{
							color: menuOpen
								? colors.accent
								: pathname === "/"
								? !topScroll
									? colors.accent
									: colors.grey
								: colors.accent,
						}}
					>
						Laverdaboom
					</Link>
				</h1>
			</div>
			<ul className="hidden lg:flex flex-1 justify-end items-center list-none text-white cursor-pointer ">
				<div>
					<CustomLink to="/" active={pathname === "/"}>
						Hem
					</CustomLink>
				</div>
				<div>
					<CustomLink to="/dogs" active={pathname === "/dogs"}>
						Våra hundar
					</CustomLink>
				</div>
				<div
					className="relative"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<CustomLink to="/puppies" active={pathname === "/puppies"}>
						Valpar
					</CustomLink>
					<div className="absolute w-fit flex flex-col left-[10px] bg-[#fff]">
						{isHovered && (
							<>
								<Link
									href="/puppies/previous"
									className="text-accent font-primary uppercase text-[0.8rem] p-[0.4rem] whitespace-nowrap hover:underline font-light cursor-pointer"
								>
									Tidigare valpar
								</Link>
								<Link
									href="/puppies/planned"
									className="text-accent font-primary uppercase text-[0.8rem] p-[0.4rem] whitespace-nowrap hover:underline font-light cursor-pointer"
								>
									Planerade valpar
								</Link>
							</>
						)}
					</div>
				</div>
				<div>
					<CustomLink to="/news" active={pathname === "/news"}>
						Nyheter
					</CustomLink>
				</div>
				<div>
					<CustomLink to="/contact" active={pathname === "/contact"}>
						Kontakt
					</CustomLink>
				</div>
			</ul>
			<div className="flex lg:hidden">
				<div className="z-[999]">
					<Hamburger
						direction="left"
						onToggle={() => setMenuOpen(!menuOpen)}
						toggled={menuOpen}
						color={
							menuOpen
								? "black"
								: topScroll
								? pathname === "/"
									? "white"
									: "black"
								: "black"
						}
					/>
				</div>
				{menuOpen && (
					<div
						className="flex items-center justify-center fixed w-full h-[100vh] transition-all duration-300 ease-in left-0 z-[990] bg-white"
						style={menuOpen ? { top: "0" } : { top: "-100%" }}
					>
						<ul className="navbar-smallscreen_links">
							{navItems.map((e, index) => (
								<motion.li
									onClick={() => {
										if (e.label.toLowerCase() === "valpar") {
											setMobilePuppieSectionOpen(!mobilePuppieSectionOpen);
										} else {
											setMenuOpen(false);
										}
									}}
									key={index}
									variants={fadeInAnimationVariants}
									initial="initial"
									whileInView="animate"
									custom={index}
									className="m-[2rem] cursor-pointer text-[1.4rem] text-center"
								>
									{e.label.toLowerCase() !== "valpar" ? (
										<Link
											href={e.href}
											className="font-secondary no-underline pb-[0.3rem] text-accent uppercase text-[1.1rem]"
										>
											{e.label}
										</Link>
									) : (
										<p
											className="font-secondary no-underline pb-[0.3rem] text-accent uppercase text-[1.1rem]"
											onClick={() =>
												setMobilePuppieSectionOpen(!mobilePuppieSectionOpen)
											}
										>
											{e.label}
										</p>
									)}
									{mobilePuppieSectionOpen && (
										<div className="flex flex-col">
											{e.childLinks?.map((e, i) => (
												<Link
													key={i}
													href={e.href}
													onClick={() => setMenuOpen(false)}
													className={`font-secondary no-underline pb-[0.3rem] text-accent uppercase text-[.9rem] ${
														i === 0 ? "mt-[.4rem]" : "0"
													}`}
												>
													{e.name}
												</Link>
											))}
										</div>
									)}
								</motion.li>
							))}
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
};
export default Navbar;
