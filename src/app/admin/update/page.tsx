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

export type Parent = {
  name: string;
  titles: string;
};

export type Pedigree = Parent;

const Update = () => {
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

  console.log(dogs);

  return (
    <div className="pt-[15vh]">
      <div className="px-[6rem] flex gap-[1rem] items-center">
        <Link href="/admin">Admin</Link>
        <FaArrowRight />
        <Link href="/admin/update" className="underline">Update</Link>
      </div>
      <div className="mt-[3rem] w-full">
        <div>
          <h1 className="font-cursive text-[4rem] text-accent text-center mb-[2rem]">
            Uppdatera
          </h1>
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
                  <Link href={`/admin/update/${e.id}`} className="m-auto">
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
