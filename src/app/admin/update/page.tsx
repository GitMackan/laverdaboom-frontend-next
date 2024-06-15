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
	const [selectedDogId, setSelectedDogId] = useState<string>();
	const [name, setName] = useState<string | undefined>();
	const [breed, setBreed] = useState<string | undefined>();
	const [gender, setGender] = useState<string | undefined>();
	const [hairType, setHairType] = useState<string | undefined>();
	const [regNr, setRegNr] = useState<string | undefined>();
	const [color, setColor] = useState<string | undefined>();
	const [IVDD, setIVDD] = useState<string | undefined>();
	const [nickName, setNickName] = useState<string | undefined>();
	const [BPH, setBPH] = useState<string | undefined>();
	const [eyes, setEyes] = useState<string | undefined>();
	const [birthDate, setBirthDate] = useState<string | undefined>();
	const [titles, setTitles] = useState<string[]>([]);
	const [description, setDescription] = useState<string | undefined>();
	const [cookies, setCookie] = useCookies(["LAVERDABOOM-AUTH"]);
	const [image, setImage] = useState<any>();
	const [selectedImg, setSelectedImg] = useState<string | undefined>();
	const cookie = cookies["LAVERDABOOM-AUTH"];
	const [submitted, setSubmitted] = useState(false);
	const [newTitle, setNewTitle] = useState<string>("");
	const [newParentName, setNewParentName] = useState<string>("");
	const [pedigree, setPedigree] = useState<Pedigree>([]);
	const [chosenParent, setChosenParent] = useState<Parent>();
	const [openModal, setOpenModal] = useState(false);
	const [index, setIndex] = useState<number>();
	const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
	const URL = process.env.NEXT_PUBLIC_SERVER_URL;

	const handleImageChange = (event: any) => {
		setImage(event.target.files[0]);
	};

	axios.defaults.withCredentials = true;

	useEffect(() => {
		setSelectedImg(undefined);
		setImage(undefined);
	}, [selectedDogId]);

	const onSubmit = async (e: any) => {
		e.preventDefault();
		try {
			await axios.patch(
				`${URL}/dogs/${selectedDogId}`,
				{
					name: name,
					breed: breed && breed,
					gender: gender && gender,
					hairType: hairType && hairType,
					regNr: regNr && regNr,
					color: color && color,
					IVDD: IVDD && IVDD,
					BPH: BPH && BPH,
					eye: eyes && eyes,
					birthDate: birthDate && birthDate,
					description: description && description,
					image: selectedDog && selectedDog.image,
					file: image && image,
					titles: titles && titles,
					sessionToken: cookie,
					pedigree: pedigree && pedigree,
					nickName: nickName && nickName,
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			setSubmitted(!submitted);
			setSelectedImg(undefined);
			setImage(undefined);
			setSuccessModalOpen(true);
		} catch (error) {
			console.log(error);
			setSelectedImg(undefined);
			setImage(undefined);
		}
	};

	const handleRemoveImage = async (e: any) => {
		e.preventDefault();
		const newImages = selectedDog?.image.filter((e) => e !== selectedImg);
		try {
			await axios.patch(
				`${URL}/dogs/${selectedDogId}`,
				{
					name: name && name,
					breed: breed && breed,
					gender: gender && gender,
					hairType: hairType && hairType,
					regNr: regNr && regNr,
					color: color && color,
					IVDD: IVDD && IVDD,
					BPH: BPH && BPH,
					eyes: eyes && eyes,
					birthDate: birthDate && birthDate,
					description: description && description,
					file: image && image,
					image: newImages,
					titles: titles && titles,
					sessionToken: cookie,
					pedigree: pedigree && pedigree,
					nickName: nickName && nickName,
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);

			setSubmitted(!submitted);
			setSelectedImg(undefined);
			setImage(undefined);
		} catch (error) {
			console.log(error);
			setSelectedImg(undefined);
			setImage(undefined);
		}
	};

	useEffect(() => {
		axios.get(`${URL}/dogs`).then((response) => {
			setDogs(response.data);
		});
	}, [submitted]);

	const selectedDog = dogs?.find(
		(e) => e._id.toLowerCase() === selectedDogId?.toLowerCase()
	);

	useEffect(() => {
		if (selectedDog) {
			setName(selectedDog.name || undefined);
			setBreed(selectedDog.breed || undefined);
			setGender(selectedDog.gender);
			setHairType(selectedDog.hairType);
			setRegNr(selectedDog.regNr);
			setColor(selectedDog.color);
			setIVDD(selectedDog.IVDD);
			setBPH(selectedDog.BPH);
			setEyes(selectedDog.eye);
			setBirthDate(selectedDog.birthDate);
			setDescription(selectedDog.description);
			setTitles(selectedDog.titles as string[]);
			setPedigree(selectedDog.pedigree);
			setNickName(selectedDog.nickName);
		}
	}, [selectedDogId]);

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
				{successModalOpen && (
					<SucessModal
						title="Sådär!"
						isOpen={successModalOpen}
						onClose={() => setSuccessModalOpen(false)}
						message={`${selectedDog?.nickName} är nu uppdaterad!`}
					/>
				)}
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
