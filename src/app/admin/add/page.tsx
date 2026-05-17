"use client";

import { supabase } from "@/lib/supabase/supabase";
import { Database } from "@/types/supabase";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

type Dog = Database['public']['Tables']['dogs']['Row']

const INITIAL_STATE: Partial<Dog> = {
  name: "",
  nickname: "",
  breed: null,
  gender: null,
  hair_type: null,
  reg_nr: null,
  color: null,
  ivdd: null,
  bph: null,
  eye: null,
  birth_date: null,
  description: null,
};

const AddNew = () => {
  const [dog, setDog] = useState<Partial<Dog>>(INITIAL_STATE);
  const [image, setImage] = useState<File | null>(null);
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDog((prev) => ({ ...prev, [name]: value || null }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setDisplayImage(URL.createObjectURL(file));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { session } } = await supabase.auth.getSession();

    try {
      await axios.post(
        `${serverURL}/dogs`,
        { ...dog, image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.access_token}`,
          },
          withCredentials: true,
        },
      );
      toast("Hund tillagd!", { type: "success" });
      setDog(INITIAL_STATE);
      setImage(null);
      setDisplayImage(null);
    } catch (error) {
      toast((error as any)?.response?.data?.message, { type: "error" });
      console.log("error: ", error);
    }
  };

  const fields: { label: string; name: keyof Dog }[] = [
    { label: "Namn", name: "name" },
    { label: "Smeknamn", name: "nickname" },
    { label: "Ras", name: "breed" },
    { label: "Kön", name: "gender" },
    { label: "Hår", name: "hair_type" },
    { label: "Regnr", name: "reg_nr" },
    { label: "Färg", name: "color" },
    { label: "IVDD", name: "ivdd" },
    { label: "BPH", name: "bph" },
    { label: "Ögon", name: "eye" },
    { label: "Födelsedatum", name: "birth_date" },
    { label: "Beskrivning", name: "description" },
  ];

  return (
    <div className="pt-[25vh] mb-[5rem]">
      <div
        className="max-w-[800px] p-[3rem] m-auto mt-[0rem] border-accent border-[3px] w-full flex flex-col items-start"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 235, 1) 100%)",
        }}
      >
        <h2 className="w-fit m-auto font-cursive text-[4rem]">Lägg till hund</h2>
        <div className="add-form-container">
          <form
            className="m-auto w-full mx-[3rem] grid mt-[2rem]"
            onSubmit={onSubmit}
          >
            {fields.map(({ label, name }) => (
              <div key={name} className="grid justify-start my-[1rem] w-full">
                <label>{label}:</label>
                <input
                  className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px]"
                  type="text"
                  name={name}
                  value={(dog[name] as string) ?? ""}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="grid justify-start my-[1rem] w-full">
              <label>Bild:</label>
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
        {displayImage && (
          <div className="relative w-[80%] h-[300px] m-auto mt-[3rem]">
            <Image src={displayImage} alt="preview" fill className="object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNew;