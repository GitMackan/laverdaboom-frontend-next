import { useEffect, useRef, useState } from "react";
import { Dog } from "@/app/dogs/page";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export type Option = {
	_key?: string;
	info?: string;
	value?: string;
	label: string;
	_type?: string;
	id?: string;
};

export function useOutsideAlerter(ref: any, setState: any) {
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current.contains(event.target)) {
				setState(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}

const DropdownMenu = ({ options }: DropdownMenuProps) => {
	const params = useParams();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const dropDownRef = useRef(null);
	useOutsideAlerter(dropDownRef, setIsOpen);

	const toggleList = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [params]);

	return (
		<div
			ref={dropDownRef}
			className={
				"relative w-[90%] m-auto cursor-pointer flex flex-col justify-center items-center mb-[0rem]"
			}
		>
			<div
				onClick={toggleList}
				className="w-full border-solid border-b-dark border-b-[2px] bg-white p-[16px] font-secondary font-[1.2rem]"
			>
				<div className="flex items-center gap-[5px] w-full justify-between">
					<p className="capitalize">{params.name || "Välj hund"}</p>
					{isOpen ? <FaAngleUp /> : <FaAngleDown />}
				</div>
			</div>
			{isOpen && (
				<ul
					className="flex list-none top-[100%] flex-col w-full absolute bg-white overflow-scroll max-h-[70vh]"
					style={{
						zIndex: isOpen ? 10 : 0,
						display: isOpen ? "block" : "none",
					}}
				>
					<li>
						<p className="font-[1.5rem] p-[1rem] font-secondary bg-accent text-grey">
							Tikar
						</p>
					</li>
					{options
						?.filter((e) => e.gender?.toLowerCase() === "tik" && !e.angelDog)
						.map((dog) => (
							<li
								id={dog.name}
								className="cursor-pointer bg-white font-secondary] hover:bg-[#eff4f4]"
								key={dog._id}
							>
								<div>
									<Link
										href={`/dogs/${dog.nickName}`}
										className="no-underline text-accent"
									>
										<p className="font-[1.2rem] p-[1rem]">{dog?.name}</p>
									</Link>
								</div>
							</li>
						))}
					<li>
						<p className="font-[1.5rem] p-[1rem] font-secondary bg-accent text-grey">
							Hanar
						</p>
					</li>
					{options
						?.filter((e) => e.gender?.toLowerCase() === "hane" && !e.angelDog)
						.map((dog) => (
							<li
								id={dog.name}
								className="cursor-pointer bg-white font-secondary] hover:bg-[#e8f1f2]"
								key={dog._id}
							>
								<div>
									<Link href={`/dogs/${dog.nickName}`}>
										<p className="font-[1.2rem] p-[1rem]">{dog?.name}</p>
									</Link>
								</div>
							</li>
						))}
					<li>
						<p className="font-[1.5rem] p-[1rem] font-secondary bg-accent text-grey">
							Änglahundar
						</p>
					</li>
					{options
						?.filter((e) => e.angelDog)
						.map((dog) => (
							<li
								id={dog.name}
								className="cursor-pointer bg-white font-secondary] hover:bg-[#e8f1f2]"
								key={dog._id}
							>
								<div>
									<Link href={`/dogs/${dog.nickName}`}>
										<p className="font-[1.2rem] p-[1rem]">{dog?.name}</p>
									</Link>
								</div>
							</li>
						))}
				</ul>
			)}
		</div>
	);
};

export default DropdownMenu;

interface DropdownMenuProps {
	options?: Dog[];
	title?: string;
	label?: string;
	onChange?: any;
	name?: string;
}
