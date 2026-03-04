"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dog } from "@/app/dogs/page";
import { assetUrl } from "@/assets/constants";
import Link from "next/link";
import AnimatedListItem from "@/components/AnimatedListItem";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";


export type Parent = {
  name: string;
  titles: string;
};

export type Pedigree = Parent;

const Admin = () => {
  const router = useRouter();
  const [dogs, setDogs] = useState<Dog[] | undefined>();
  const URL = process.env.NEXT_PUBLIC_SERVER_URL;

  axios.defaults.withCredentials = true;

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user: ", user);
      if (!user) router.push("/admin");
    };
    checkAuth();
  }, []);

  useEffect(() => {
    axios.get(`${URL}/dogs`).then((response) => {
      setDogs(response.data);
    });
  }, []);

  return (
    <div className="pt-[15vh]">
      <div className="mt-[3rem] w-[80%] m-auto">
        <div className="flex items-center gap-[.6rem] border border-black w-fit justify-self-end p-[.6rem] mr-[2rem] rounded-md cursor-pointer hover:bg-[#ccc]" onClick={() => router.push('/admin/add')}>
          <IoAddCircleOutline size={24} />
          <p className="font-primary uppercase font-normal text-[.8rem]">Lägg till hund</p>
        </div>
        <div className="w-full">
          <div className="p-[2rem] grid gap-y-[3rem] gap-x-[3rem] w-full grid-cols-small lg:grid-cols-large">
            {dogs?.map((e, index) => (
              <ul
                key={e.id}
                className="flex flex-col text-center gap-[1rem] overflow-hidden"
              >
                <AnimatedListItem index={index}>
                  <h3 className="text-[1.1rem] font-secondary font-thin mb-[.5rem]">
                    {e.name} {e.nickname === "Astrid" && ` - ${e.nickname}`}
                  </h3>
                  <Link href={`/admin/${e.id}`} className="m-auto">
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

export default Admin;
