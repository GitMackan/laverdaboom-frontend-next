"use client";

import { Dog } from "@/app/dogs/page";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Parent, Pedigree } from "../page";
import { FiX } from "react-icons/fi";
import { assetUrl } from "@/assets/constants";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const Update = () => {
  const [dog, setDog] = useState<Dog>();
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
  const [images, setImages] = useState<any>();
  const [description, setDescription] = useState<string | undefined>();
  const [cookies, setCookie] = useCookies(["LAVERDABOOM-AUTH"]);
  const [image, setImage] = useState<any>();
  const [selectedImg, setSelectedImg] = useState<string | undefined>();
  const cookie = cookies["LAVERDABOOM-AUTH"];
  const [submitted, setSubmitted] = useState(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newParentName, setNewParentName] = useState<string>("");
  const [pedigree, setPedigree] = useState<Pedigree[]>([]);
  const [chosenParent, setChosenParent] = useState<Parent>();
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState<number>();
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
  const URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const params = useParams();

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  axios.defaults.withCredentials = true;

  console.log("URL : ", URL);
  console.log("params: ", params);

  const getDog = async () => {
    await axios.get(`${URL}/dogs/${params.name}`).then((response) => {
      setDog(response.data);
    });
  };

  useEffect(() => {
    getDog();
  }, []);

  console.log("dog: ", dog);

  useEffect(() => {
    if (dog) {
      setName(dog.name || undefined);
      setBreed(dog.breed || undefined);
      setGender(dog.gender);
      setHairType(dog.hair_type);
      setRegNr(dog.reg_nr);
      setColor(dog.color);
      setIVDD(dog.IVDD);
      setBPH(dog.BPH);
      setEyes(dog.eye);
      setBirthDate(dog.birth_date);
      setDescription(dog.description);
      setTitles(dog.titles as string[]);
      setPedigree(dog.pedigree);
      setNickName(dog.nickname);
      setImages(dog.image);
    }
  }, [dog]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(
        `${URL}/dogs/${dog?.id}`,
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
          image: dog && dog.image,
          file: image && image,
          titles: titles && titles,
          sessionToken: cookie,
          pedigree: pedigree && pedigree,
          nickname: nickName && nickName,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      setSubmitted(!submitted);
      setSelectedImg(undefined);
      setImage(undefined);
      setSuccessModalOpen(true);
      toast("Uppdaterat!", { type: "success" });
    } catch (error) {
      console.log(error);
      setSelectedImg(undefined);
      setImage(undefined);
      toast((error as any).response.data.message || "Whops, nått gick fel!", {
        type: "error",
      });
    }
  };

  const handleRemoveImage = async (e: any) => {
    e.preventDefault();
    const newImages = dog?.image.filter((e) => e !== selectedImg);
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
        },
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

  return (
    <div className="pt-[15vh] mb-[5rem]">
      <div className="px-[6rem] py-[1rem] flex gap-[1rem] items-center">
        <Link href="/admin">Admin</Link>
        <FaArrowRight />
        <Link href="/admin/update">Update</Link>
        <FaArrowRight />
        <Link href="/admin/update" className="underline">
          {dog?.nickname}
        </Link>
      </div>
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
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                Namn:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={name ? name : ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                Smeknamn:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={nickName ? nickName : ""}
                onChange={(e) => setNickName(e.target.value)}
              />
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                Ras:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={breed ? breed : ""}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                Kön:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={gender ? gender : ""}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                Hår:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={hairType ? hairType : ""}
                onChange={(e) => setHairType(e.target.value)}
              />
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                Regnr:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={regNr ? regNr : ""}
                onChange={(e) => setRegNr(e.target.value)}
              />
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                Färg:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={color ? color : ""}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                IVDD:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={IVDD ? IVDD : ""}
                onChange={(e) => setIVDD(e.target.value)}
              />
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                BPH:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={BPH ? BPH : ""}
                onChange={(e) => setBPH(e.target.value)}
              />
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                Ögon:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={eyes ? eyes : ""}
                onChange={(e) => setEyes(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                Födelsedatum:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={birthDate ? birthDate : ""}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                Beskrivning:
              </label>
              <textarea
                className="border-accent border-[1px] py-[0.3rem] px-[0.5rem] w-[400px] min-h-[200px]"
                value={description ? description : ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label htmlFor="" className="text-[1.5rem] my-[1rem]">
                Stamtavla:
              </label>
              <div className="flex flex-wrap x-gap-[1rem] w-[70%]">
                {pedigree?.length > 0 &&
                  pedigree?.map((e, i) => (
                    <div
                      key={i}
                      className="bg-grey flex justify-between items-center border-dark border-[0.5px] w-full py-[1rem] px-[1rem] my-[0.5rem] gap-[0.5rem] rounded-[10px]"
                    >
                      <div className="flex flex-col">
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setChosenParent(pedigree[i]);
                            setIndex(i);
                            setOpenModal(true);
                          }}
                        >
                          {e.name}
                        </p>
                        <p className="text-accent italic">{e.titles}</p>
                      </div>

                      <FiX
                        size={20}
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                        onClick={() =>
                          setPedigree(
                            pedigree.filter((parent) => parent.name !== e.name),
                          )
                        }
                      />
                    </div>
                  ))}
              </div>

              <label
                htmlFor=""
                className="font-primary uppercase font-normal text-[.8rem] mb-[.3rem]"
              >
                Namn:
              </label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={newParentName ? newParentName : ""}
                onChange={(e) => setNewParentName(e.target.value)}
              />

              {/* <button
                className="mt-[1rem] text-[1.3rem] py-[0.5rem] cursor-pointer border-accent border-[1px] flex justify-center bg-accent text-white"
                onClick={() => {
                  setPedigree((prevState) => [
                    ...prevState,
                    { name: newParentName, titles: [] },
                  ]);
                  setNewParentName("");
                }}
              >
                Lägg till förälder
              </button> */}
            </div>
            <div className="flex flex-col  justify-start my-[1rem] w-[40%]">
              <label htmlFor="" className="text-[1.5rem] my-[1rem]">
                Titlar:
              </label>
              <div className="flex flex-wrap x-gap-[1rem] gap-[0.5rem]">
                {titles?.map((e, i) => (
                  <div
                    key={i}
                    className="bg-grey flex justify-between items-center border-dark border-[0.5px] w-fit py-[0.5rem] px-[1rem] my-[0.5rem] gap-[0.5rem] rounded-[10px]"
                  >
                    <p>{e}</p>
                    <FiX
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setTitles(titles.filter((title) => title !== e))
                      }
                    />
                  </div>
                ))}
              </div>
              <label htmlFor="">Titel:</label>
              <input
                className="border-accent border-[1px] p-[.8rem] w-[400px] rounded-[4px]"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button
                className="mt-[1rem] text-[1.3rem] py-[0.5rem] cursor-pointer border-accent border-[1px] flex justify-center bg-accent text-white"
                type="button"
                onClick={() => {
                  setTitles((prevTitles) => [...prevTitles, newTitle]);
                  setNewTitle("");
                }}
              >
                Lägg till titel
              </button>
            </div>
            <div className="flex flex-col justify-start my-[1rem] w-[80%]">
              <label htmlFor="">Bild:</label>
              <input
                type="file"
                name="file"
                onChange={handleImageChange}
                className="w-fit"
              />
              <div className="my-[2rem] flex flex-wrap gap-[1rem]">
                {dog?.image.map((e, i) => (
                  <img
                    src={`${assetUrl}${e}`}
                    key={i}
                    className={`max-w-[300px] cursor-pointer ${
                      selectedImg === e && "border-accent border-[2px]"
                    }`}
                    onClick={() => setSelectedImg(e)}
                  />
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
