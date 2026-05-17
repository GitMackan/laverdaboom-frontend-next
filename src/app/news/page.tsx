import React from "react";
import InstagramWidget from "@/components/instagramWidget";

export default async function News() {
  return (
    <div
      className="pt-[15vh]"
      style={{
        background:
          "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 235, 235, 1) 100%)",
      }}
    >
      {/* <h2 className="text-center m-auto mt-[2rem] font-cursive text-[5rem] border-detail border-b-[1px] w-fit pb-[0.5rem]">
        Nyheter
      </h2>
      <p className="w-[80%] m-auto text-center max-w-[600px] mt-[2rem] text-[1.2rem] mb-[2rem] font-secondary">
        Håll dig uppdaterad om nyheter i kenneln genom Sandras instagram!
      </p> */}
      <div className="w-[100%] m-auto flex flex-col">
        <InstagramWidget />
      </div>
    </div>
  );
}
