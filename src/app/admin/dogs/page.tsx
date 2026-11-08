"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { assetUrl } from "@/assets/constants";
import type { Database } from "@/types/supabase";

type Dog = Database["public"]["Tables"]["dogs"]["Row"];

export default function AdminDogsPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    axios.get<Dog[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/dogs`, { signal: controller.signal })
      .then(({ data }) => setDogs(data))
      .catch(() => { if (!controller.signal.aborted) setError("Kunde inte hämta hundarna. Ladda om sidan för att försöka igen."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);
  return (
    <main className="w-[90%] max-w-[1200px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <h1 className="font-cursive text-5xl md:text-6xl">Hundar</h1>
        <Link href="/admin/add" className="flex items-center gap-2 border border-black p-3 rounded-md hover:bg-[#eee] font-primary text-sm">
          <IoAddCircleOutline size={24} aria-hidden="true" /> Lägg till hund
        </Link>
      </div>
      {loading && <p role="status" className="font-primary">Hämtar hundar…</p>}
      {error && <p role="alert" className="font-primary text-red-700">{error}</p>}
      {!loading && !error && dogs.length === 0 && <p className="font-primary">Det finns inga hundar ännu. Börja med att lägga till en hund.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dogs.map((dog) => (
          <Link key={dog.id} href={`/admin/${dog.id}`} className="group rounded-xl border border-gray-200 overflow-hidden hover:border-gray-500 transition-colors">
            <div className="aspect-square bg-[#faf7f5]">
              {dog.image?.[0] ? <Image src={`${assetUrl}${dog.image[0]}`} alt={dog.name} width={500} height={500} unoptimized className="w-full h-full object-cover" />
                : <div className="h-full flex items-center justify-center font-primary text-gray-500">Ingen bild</div>}
            </div>
            <div className="p-5">
              <h2 className="font-secondary text-xl">{dog.name}{dog.nickname === "Astrid" ? ` – ${dog.nickname}` : ""}</h2>
              <p className="font-primary text-sm underline mt-3">Redigera hund →</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
