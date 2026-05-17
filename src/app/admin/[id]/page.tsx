"use client";

import { supabase } from "@/lib/supabase/supabase";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { assetUrl } from "@/assets/constants";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { Database, Pedigree } from "@/types/supabase";

type Dog = Database["public"]["Tables"]["dogs"]["Row"];

const Update = () => {
  const [dog, setDog] = useState<Dog | null>(null);
  const [formData, setFormData] = useState<Partial<Dog>>({});
  const [image, setImage] = useState<File | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newParent, setNewParent] = useState<Pedigree | null>();
  const [submitted, setSubmitted] = useState(false);
  const params = useParams();
  const URL = process.env.NEXT_PUBLIC_SERVER_URL;

  axios.defaults.withCredentials = true;
  console.log("formData: ", formData);

  useEffect(() => {
    axios.get(`${URL}/dogs/${params.id}`).then((response) => {
      const data: Dog = response.data;
      setDog(data);
      setFormData({
        name: data.name,
        nickname: data.nickname,
        breed: data.breed,
        gender: data.gender,
        hair_type: data.hair_type,
        reg_nr: data.reg_nr,
        color: data.color,
        ivdd: data.ivdd,
        bph: data.bph,
        eye: data.eye,
        birth_date: data.birth_date,
        description: data.description,
        titles: data.titles ?? [],
        pedigree: (data.pedigree as Pedigree[]) ?? [],
        image: data.image ?? [],
      });
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || null }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    try {
      await axios.put(
        `${URL}/dogs/${dog?.id}`,
        { ...formData, file: image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.access_token}`,
          },
          withCredentials: true,
        },
      );
      setSubmitted((prev) => !prev);
      setSelectedImg(null);
      setImage(null);
      toast("Uppdaterat!", { type: "success" });
    } catch (error) {
      setSelectedImg(null);
      setImage(null);
      toast((error as any).response?.data?.message || "Whops, nått gick fel!", {
        type: "error",
      });
    }
  };

  const handleRemoveImage = async (e: React.MouseEvent) => {
    e.preventDefault();
    const newImages = formData.image?.filter((img) => img !== selectedImg);
    try {
      await axios.patch(
        `${URL}/dogs/${dog?.id}`,
        { ...formData, image: newImages },
        { withCredentials: true },
      );
      setFormData((prev) => ({ ...prev, image: newImages }));
      setSubmitted((prev) => !prev);
      setSelectedImg(null);
    } catch (error) {
      console.log(error);
      setSelectedImg(null);
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
  ];

  return (
    <div className="pt-[15vh] mb-[5rem]">
      <div
        className="max-w-[90%] p-[3rem] m-auto mt-[0rem] border-accent border-[3px] w-full flex flex-col items-start"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 235, 1) 100%)",
        }}
      >
        <h2 className="w-fit m-auto font-cursive text-[4rem]">Uppdatera</h2>
        <div className="flex w-full justify-center">
          <form className="flex flex-wrap justify-center" onSubmit={onSubmit}>
            {/* Text fields */}
            {fields.map(({ label, name }) => (
              <div
                key={name}
                className="flex flex-col justify-start my-[1rem] w-[40%]"
              >
                <label className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]">
                  {label}:
                </label>
                <input
                  className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                  type="text"
                  name={name}
                  value={(formData[name] as string) ?? ""}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* Description */}
            <div className="flex flex-col justify-start my-[1rem] w-[40%]">
              <label className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]">
                Beskrivning:
              </label>
              <textarea
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px] min-h-[200px]"
                name="description"
                value={formData.description ?? ""}
                onChange={handleChange}
              />
            </div>

            {/* Pedigree */}
            <div className="flex flex-col justify-start my-[1rem] w-[40%]">
              <label className="text-[1.5rem] my-[1rem]">Stamtavla:</label>
              <div className="flex flex-wrap w-[70%]">
                {(formData.pedigree as Pedigree[])?.map((e, i) => (
                  <div
                    key={i}
                    className="bg-grey flex justify-between items-center border-dark border-[0.5px] w-full py-[1rem] px-[1rem] my-[0.5rem] gap-[0.5rem] rounded-[10px]"
                  >
                    <div className="flex flex-col">
                      <p>{e.name}</p>
                      <p className="text-accent italic">{e.titles}</p>
                    </div>
                    <FiX
                      size={20}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          pedigree: (prev.pedigree as Pedigree[]).filter(
                            (p) => p.name !== e.name,
                          ),
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
              <label className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]">
                Namn:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={newParent?.name}
                onChange={(e) =>
                  setNewParent((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={newParent?.titles}
                onChange={(e) =>
                  setNewParent((prev) => ({ ...prev, titles: e.target.value }))
                }
              />
              <button
                type="button"
                className="mt-[1rem] text-[1.3rem] py-[0.5rem] cursor-pointer border-accent border-[1px] flex justify-center bg-accent text-white"
                onClick={() => {
                  if (!newParent) return;
                  setFormData((prev) => ({
                    ...prev,
                    pedigree: prev.pedigree?.length
                      ? [
                          ...prev.pedigree,
                          { name: newParent.name, titles: newParent.titles },
                        ]
                      : [{ name: newParent.name, titles: newParent.titles }],
                  }));
                  setNewParent({ name: "", titles: "" });
                }}
              >
                Lägg till förälder
              </button>
            </div>

            {/* Titles */}
            <div className="flex flex-col justify-start my-[1rem] w-[40%]">
              <label className="text-[1.5rem] my-[1rem]">Titlar:</label>
              <div className="flex flex-wrap gap-[0.5rem]">
                {formData.titles?.map((title, i) => (
                  <div
                    key={i}
                    className="bg-grey flex justify-between items-center border-dark border-[0.5px] w-fit py-[0.5rem] px-[1rem] my-[0.5rem] gap-[0.5rem] rounded-[10px]"
                  >
                    <p>{title}</p>
                    <FiX
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          titles: prev.titles?.filter((t) => t !== title),
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
              <label>Titel:</label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button
                type="button"
                className="mt-[1rem] text-[1.3rem] py-[0.5rem] cursor-pointer border-accent border-[1px] flex justify-center bg-accent text-white"
                onClick={() => {
                  if (!newTitle) return;
                  setFormData((prev) => ({
                    ...prev,
                    titles: [...(prev.titles ?? []), newTitle],
                  }));
                  setNewTitle("");
                }}
              >
                Lägg till titel
              </button>
            </div>

            {/* Images */}
            <div className="flex flex-col justify-start my-[1rem] w-[80%]">
              <label>Bild:</label>
              <input
                type="file"
                name="file"
                onChange={handleImageChange}
                className="w-fit"
              />
              <div className="my-[2rem] flex flex-wrap gap-[1rem]">
                {formData.image?.map((img, i) => (
                  <div
                    key={i}
                    className={`relative w-[300px] h-[200px] cursor-pointer ${selectedImg === img && "border-accent border-[2px]"}`}
                    onClick={() => setSelectedImg(img)}
                  >
                    <img
                      src={`${assetUrl}${img}`}
                      alt="dog image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
              {selectedImg && (
                <div className="flex justify-start">
                  <button
                    className="bg-accent min-w-[200px] p-[1.5rem] text-grey"
                    onClick={handleRemoveImage}
                    type="button"
                  >
                    Ta bort vald bild
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-start my-[1rem] w-[80%] m-auto">
              <button
                className="bg-grey text-accent w-full p-[1.5rem] border-accent border-[1px]"
                type="submit"
              >
                Uppdatera
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
