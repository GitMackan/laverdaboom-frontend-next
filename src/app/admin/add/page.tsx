"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const AddNew = () => {
  const [name, setName] = useState<string | undefined>();
  const [nickname, setNickname] = useState<string | undefined>();
  const [breed, setBreed] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();
  const [hairType, setHairType] = useState<string | undefined>();
  const [regNr, setRegNr] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>();
  const [IVDD, setIVDD] = useState<string | undefined>();
  const [BPH, setBPH] = useState<string | undefined>();
  const [eyes, setEyes] = useState<string | undefined>();
  const [birthDate, setBirthDate] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [cookies, setCookie] = useCookies(["LAVERDABOOM-AUTH"]);
  const [image, setImage] = useState<any>();
  const [displayImage, setDisplayImage] = useState<any>(null);
  const cookie = cookies["LAVERDABOOM-AUTH"];
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);

    setDisplayImage(URL.createObjectURL(event.target.files[0]));
  };

  console.log("serverURL: ", serverURL);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log("japp");
      await axios.post(
        `${serverURL}/dogs`,
        {
          name: name,
          breed: breed && breed,
          gender: gender && gender,
          hair_type: hairType && hairType,
          reg_nr: regNr && regNr,
          color: color && color,
          IVDD: IVDD && IVDD,
          BPH: BPH && BPH,
          eyes: eyes && eyes,
          birth_date: birthDate && birthDate,
          description: description && description,
          image: image && image,
          nickname: nickname,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Cookie: cookie,
          },
          withCredentials: true,
        },
      );
      console.log("kom hit");
      toast("Hund tillagd!", { type: "success" });
    } catch (error) {
      toast((error as any)?.response?.data?.message, { type: "error" });
      console.log("error: ", error);
    }
  };

  return (
    <div className="pt-[25vh] mb-[5rem]">
      <div className="px-[6rem] py-[1rem] flex gap-[1rem] items-center">
        <Link href="/admin">Admin</Link>
        <FaArrowRight />
      </div>
      <div
        className="max-w-[800px] p-[3rem] m-auto mt-[0rem] border-accent border-[3px] w-full flex flex-col items-start"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 235, 1) 100%)",
        }}
      >
        <h2 className="w-fit m-auto font-cursive text-[4rem]">
          Lägg till hund
        </h2>
        <div className="add-form-container">
          <form
            className="m-auto w-full mx-[3rem] grid mt-[2rem]"
            onSubmit={onSubmit}
          >
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">Namn:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">Smeknamn:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">Ras:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">Kön:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">Hår:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={hairType}
                onChange={(e) => setHairType(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">Regnr:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={regNr}
                onChange={(e) => setRegNr(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">Färg:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">IVDD:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={IVDD}
                onChange={(e) => setIVDD(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">BPH:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={BPH}
                onChange={(e) => setBPH(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">Ögon:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={eyes}
                onChange={(e) => setEyes(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">Födelsedatum:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">Beskrivning:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <label htmlFor="">Bild:</label>
              <input
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <div className="grid justify-start my-[1rem] w-full">
              <button
                className="bg-accent text-grey text-[1.2rem] py-[16px] px-[12px] cursor-pointer w-[15rem] hover:underline"
                type="submit"
              >
                Lägg till
              </button>
            </div>
          </form>
        </div>
        {image && (
          <div className="w-[80%] m-auto mt-[3rem]">
            <img src={displayImage} alt="display" className="max-w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNew;
