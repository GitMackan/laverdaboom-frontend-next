"use client";

import SucessModal from "@/components/SuccessModal";
import { useWindowSize } from "@/utils/useWindowSize";
import axios from "axios";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

export default function Contact() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const URL = process.env.NEXT_PUBLIC_SERVER_URL;
	const screenWidth = useWindowSize().width;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true);
		e.preventDefault();

		try {
			await axios.post(`${URL}/email`, {
				name,
				email,
				message,
			});

			setName("");
			setEmail("");
			setMessage("");
		} catch (error) {
			console.error("Failed.", error);
		}
		setLoading(false);
		setSuccess(true);
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "auto" });
	}, []);
	return (
		<div
			className="pt-[20vh] min-h-[100vh] bg-grey flex flex-col justify-center items-center pb-[5rem]"
			style={{
				background:
					"linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 235, 1) 100%)",
			}}
		>
			<div
				className="w-full lg:w-[80%] grid px-[1.5rem] lg:px-[3rem] items-center gap-[5rem]"
				style={{
					gridTemplateColumns: screenWidth! >= 1100 ? "1fr 1fr" : "1fr",
				}}
			>
				<div className="w-full font-thin">
					<h2 className="font-cursive text-[4rem] text-accent mb-[2rem] w-fit border-detail border-b-[0.5px]">
						Kontakta oss
					</h2>
					<p className="text-accent text-[1.2rem]">
						Har du några frågor eller funderingar, tveka inte att kontakta oss.
						Det kan ni göra antingen via detta formulär eller direkt till:
					</p>
					<div className="mt-[2rem]">
						<p className="text-accent text-[1.2rem] font-light">
							Sandra Brännström
						</p>
						<ul className="list-none mt-[1rem]">
							<li className="text-accent text-left mb-[0.3rem] font-thin">
								Sigfrid Edströms Gata 25B
							</li>
							<li className="text-accent text-left mb-[0.3rem] font-thin">
								72466 Västerås
							</li>
							<li className="text-accent text-left mb-[0.3rem] font-thin">
								sandra.brannstrom@hotmail.com
							</li>
							<li className="text-accent text-left mb-[0.3rem] font-thin">
								070-773 91 50
							</li>
						</ul>
					</div>
					<div className="mt-[2rem]">
						<p className="text-accent text-[1.2rem] font-light">
							Rosa Johansson
						</p>
						<ul className="list-none mt-[1rem]">
							<li className="text-accent text-left mb-[0.3rem] font-thin">
								Tunnbrödsvägen 3
							</li>
							<li className="text-accent text-left mb-[0.3rem] font-thin">
								724 84 Västerås
							</li>
							<li className="text-accent text-left mb-[0.3rem] font-thin">
								rosajohansson@hotmail..se
							</li>
							<li className="text-accent text-left mb-[0.3rem] font-thin">
								073-947 98 79
							</li>
						</ul>
					</div>
				</div>
				<form onSubmit={handleSubmit} className="w-full text-[1.5rem]">
					<div className="flex flex-col my-[2rem]">
						<label htmlFor="" className="mb-[0.5rem] text-[1.2rem] text-accent">
							Namn:
						</label>
						<input
							className="h-[3rem] pl-[0.5rem] text-accent text-[1.4rem] border-b-[.5px] border-accent"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col my-[2rem]">
						<label htmlFor="" className="mb-[0.5rem] text-[1.2rem] text-accent">
							Email:
						</label>
						<input
							className="h-[3rem] pl-[0.5rem] text-[1.4rem] text-accent border-b-[.5px] border-accent"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-col my-[2rem]">
						<label htmlFor="" className="mb-[0.5rem] text-[1.2rem] text-accent">
							Meddelande:
						</label>
						<textarea
							className="h-[10rem] p-[0.5rem] text-[1.4rem] border-b-[.5px] border-accent"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</div>
					<div className="flex flex-col my-[2rem]">
						<button
							type="submit"
							className="border-grey border-[1px] bg-accent text-grey p-[1rem] cursor-pointer text-center text-[1.1rem] h-[60px] flex justify-center items-center"
						>
							{loading ? (
								<BarLoader color="white" width={"50%"} />
							) : (
								"Skicka meddelande"
							)}
						</button>
					</div>
				</form>
				{success && (
					<SucessModal
						isOpen={success}
						onClose={() => setSuccess(false)}
						title="Tack för ditt meddelande!"
						message="Vi svarar dig så fort vi kan!"
					/>
				)}
			</div>
		</div>
	);
}
