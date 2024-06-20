"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Login = ({ setIsLoggedIn }: LoginProps) => {
	const [username, setUsername] = useState<string | undefined>();
	const [password, setPassword] = useState<string | undefined>();
	const [error, setError] = useState(false);
	const [cookies, setCookie] = useCookies(["LAVERDABOOM-AUTH"]);
	const URL = process.env.NEXT_PUBLIC_SERVER_URL;

	useEffect(() => {
		axios.defaults.withCredentials = true;
	}, []);

	const login = async () => {
		try {
			await axios
				.post(
					`${URL}/login`,
					{
						username: username,
						password: password,
					},
					{
						headers: {
							"Content-Type": "application/json; charset=utf-8",
						},
					}
				)
				.then((response) => {
					setCookie("LAVERDABOOM-AUTH", response.data.sessionToken, {
						path: "/",
					});
					setIsLoggedIn(true);
					sessionStorage.setItem("laverdaboom-auth", "loggedIn");
				})
				.catch((error) => {
					console.log(error);
					setError(true);
				});
		} catch (error) {
			console.log(error);
			setError(true);
		}
	};

	return (
		<div className="pt-[10vh] min-h-[75dvh] min-w-[500px] max-w-[750px] m-auto">
			<div className="flex flex-col justify-center mt-[5rem] border-dark border-[1px] p-[2rem] max-w-[400] w-[80%] m-auto">
				<h3>Logga in</h3>
				<div className="flex flex-col gap-[0.5rem] mt-[1rem]">
					<div className="flex flex-col gap-[0.3rem]">
						<label>Användarnamn:</label>
						<input
							className="h-[2rem] border-accent border-[1px]"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-[0.3rem]">
						<label>Lösenord:</label>
						<input
							className="h-[2rem] border-[1px]"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						className="bg-accent border-black border-[1px] py-[8px] px-[4px] text-white uppercase cursor-pointer hover:underline mt-[2rem]"
						onClick={login}
					>
						Logga in
					</button>
				</div>
				{error && <p className="mt-[1rem] text-error">Något gick fel!</p>}
			</div>
		</div>
	);
};

export default Login;

interface LoginProps {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
