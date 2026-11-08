import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiHeart } from "react-icons/fi";
import { assetUrl } from "@/assets/constants";
import { Database } from "@/types/supabase";

type Dog = Database["public"]["Tables"]["dogs"]["Row"];

export const metadata: Metadata = {
  title: "Våra hundar | Kennel Laverdaboom",
  description: "Lär känna hundarna hos Kennel Laverdaboom i Västerås. Möt våra tikar, hanar och hundarna vi minns med värme.",
};

function DogCard({ dog }: { dog: Dog }) {
  const image = dog.image?.find((item) => item.trim().length > 0);
  return (
    <li>
      <Link href={`/dogs/${encodeURIComponent(dog.nickname)}`} className="dogs-card">
        <div className="dogs-card-image">
          {image ? <Image src={`${assetUrl}${image}`} alt={dog.nickname || dog.name} fill unoptimized sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" /> : <div className="dogs-image-placeholder"><FiHeart aria-hidden="true" /><span>Bild kommer snart</span></div>}
          {dog.gender && <span className="dogs-card-badge">{dog.gender}</span>}
        </div>
        <div className="dogs-card-heading"><h3>{dog.nickname || dog.name}</h3><span className="site-round-arrow"><FiArrowUpRight aria-hidden="true" /></span></div>
        {dog.nickname && <p className="dogs-registered-name">{dog.name}</p>}
        {dog.titles?.filter(Boolean).length ? <p className="dogs-titles">{dog.titles.filter(Boolean).join(" · ")}</p> : null}
        <span className="dogs-card-link">Lär känna {dog.nickname || dog.name} <FiArrowUpRight aria-hidden="true" /></span>
      </Link>
    </li>
  );
}

export default async function Dogs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dogs`, { cache: "no-store" });
  if (!response.ok) throw new Error("Kunde inte hämta hundarna.");
  const dogs: Dog[] = await response.json();
  const isAngel = (dog: Dog) => dog.angel_dog?.toLowerCase() === "true";
  const groups = [
    { id: "tikar", title: "Våra tikar", eyebrow: "Möt flickorna", description: "Lär känna tikarna i vår hundfamilj.", dogs: dogs.filter((dog) => !isAngel(dog) && dog.gender?.toLowerCase() === "tik") },
    { id: "hanar", title: "Våra hanar", eyebrow: "Möt pojkarna", description: "Egna personligheter med en självklar plats i familjen.", dogs: dogs.filter((dog) => !isAngel(dog) && dog.gender?.toLowerCase() === "hane") },
    { id: "anglahundar", title: "Alltid i våra hjärtan", eyebrow: "Våra änglahundar", description: "Så många fina minnen. Här finns hundarna vi minns med kärlek.", dogs: dogs.filter(isAngel) },
  ].filter((group) => group.dogs.length > 0);

  return (
    <main className="dogs-page">
      <header className="dogs-intro"><div className="site-container">
        <p className="site-eyebrow">Kennel Laverdaboom · Vår hundfamilj</p>
        <h1>Våra hundar.<br /><em>Vår stora kärlek.</em></h1>
        <div className="dogs-intro-bottom"><p>Fyra tassar och en alldeles egen personlighet.<br />Lär känna hundarna som gör vår vardag lite finare.</p><span>Långhårig standardtax · Västerås</span></div>
      </div></header>
      {groups.length > 0 ? <>
        <nav className="dogs-group-nav" aria-label="Hundgrupper"><div className="site-container">{groups.map((group) => <a key={group.id} href={`#${group.id}`}>{group.id === "anglahundar" ? "Änglahundar" : group.title}<span>{group.dogs.length}</span></a>)}</div></nav>
        <div className="site-container dogs-collection">{groups.map((group) => <section key={group.id} id={group.id} className={`dogs-group ${group.id === "anglahundar" ? "dogs-memorial" : ""}`} aria-labelledby={`${group.id}-title`}>
          <div className="dogs-section-heading"><div><p className="site-eyebrow">{group.eyebrow}</p><h2 id={`${group.id}-title`}>{group.title}</h2></div><p>{group.description}</p></div>
          <ul className="dogs-grid">{group.dogs.map((dog) => <DogCard key={dog.id} dog={dog} />)}</ul>
        </section>)}</div>
      </> : <div className="site-container dogs-empty"><h2>Här möter du snart våra hundar.</h2><p>Du är välkommen att kontakta oss om du vill veta mer om kenneln.</p></div>}
      <section className="dogs-contact"><div className="site-container"><div><p className="site-eyebrow">Nyfiken på en egen tax?</p><h2>Början på en <em>ny vänskap.</em></h2><p>Läs om att köpa valp hos oss eller hör av dig med dina frågor.</p></div><div className="site-actions"><Link href="/puppies" className="site-button site-button-green">Om att köpa valp <FiArrowUpRight aria-hidden="true" /></Link><Link href="/contact" className="site-text-link">Kontakta oss <FiArrowUpRight aria-hidden="true" /></Link></div></div></section>
    </main>
  );
}
