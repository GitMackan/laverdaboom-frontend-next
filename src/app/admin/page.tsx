"use client";

import Login from "@/components/Login";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { RiseLoader } from "react-spinners";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user: ", user);
      if (!user) setIsLoggedIn(false);
      else setIsLoggedIn(true);

	  setLoading(false)
    };
    checkAuth();
  }, []);

  if (typeof loading === "undefined" && !isLoggedIn)
    return (
      <div className="py-[15vh] min-h-[75vh] max-w-full flex justify-center items-center">
        <RiseLoader />
      </div>
    );

  return (
    <div className="py-[15vh] min-h-[75vh] max-w-full">
      {isLoggedIn ? (
        <div className="w-full flex max-w-[960px] justify-between m-auto mt-[3rem] flex-col gap-[3rem]">
          <Link
            href="/admin/add"
            className="border-accent border-b-[1px] pb-[.4rem] text-[1.2rem] cursor-pointer w-[200px]"
          >
            Lägg till hund
          </Link>
          <Link
            href="/admin/update"
            className="border-accent border-b-[1px] pb-[.4rem] text-[1.2rem] cursor-pointer w-[200px]"
          >
            Uppdatera hund
          </Link>
          <div className="border-accent border-b-[1px] pb-[.4rem] text-[1.2rem] cursor-pointer w-[200px]">
            Ta bort hund
          </div>
        </div>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default Admin;
