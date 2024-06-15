"use client";

import Login from "@/components/Login";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";

const Admin = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
	const [loading, setLoading] = useState<boolean | undefined>(undefined);

	const checkIfLoggedIn = async () => {
		setLoading(true);
		const loggedIn =
			(await sessionStorage.getItem("laverdaboom-auth")) === "loggedIn";

		setIsLoggedIn(loggedIn);
		setLoading(false);
	};

	useEffect(() => {
		checkIfLoggedIn();
	}, []);

	if (typeof loading === "undefined" || typeof isLoggedIn === "undefined")
		return (
			<div className="py-[15vh] min-h-[75vh] max-w-full flex justify-center items-center">
				<RiseLoader />
			</div>
		);

	return (
		<div className="py-[15vh] min-h-[75vh] max-w-full">
			{isLoggedIn ? (
				<div className="w-full flex max-w-[960px] justify-between m-auto mt-[3rem] flex-col gap-[3rem]">
					<Link
						href="/admin/add"
						className="border-accent border-b-[1px] pb-[.4rem] text-[1.2rem] cursor-pointer w-[200px]"
					>
						Lägg till hund
					</Link>
					<Link
						href="/admin/update"
						className="border-accent border-b-[1px] pb-[.4rem] text-[1.2rem] cursor-pointer w-[200px]"
					>
						Uppdatera hund
					</Link>
					<div className="border-accent border-b-[1px] pb-[.4rem] text-[1.2rem] cursor-pointer w-[200px]">
						Ta bort hund
					</div>
				</div>
			) : (
				<Login setIsLoggedIn={setIsLoggedIn} />
			)}
		</div>
	);
};

export default Admin;
