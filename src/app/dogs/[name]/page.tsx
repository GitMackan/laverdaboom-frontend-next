import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiAward, FiHeart } from "react-icons/fi";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import { Database } from "@/types/supabase";

type Dog = Database["public"]["Tables"]["dogs"]["Row"];
const pedigreeLabels = ["Far", "Mor", "Farfar", "Farmor", "Morfar", "Mormor", "Farfars far", "Farfars mor", "Farmors far", "Farmors mor", "Morfars far", "Morfars mor", "Mormors far", "Mormors mor"];

export default async function SpecificDog({ params }: { params: { name: string } }) {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  const dogsResponse = await fetch(`${serverURL}/dogs`, { cache: "no-store" });
  if (!dogsResponse.ok) throw new Error("Kunde inte hämta hundarna.");
  const dogs: Dog[] = await dogsResponse.json();
  let requestedName: string;
  try {
    requestedName = decodeURIComponent(params.name).toLowerCase();
  } catch {
    notFound();
  }
  const selected = dogs.find((dog) => dog.nickname.toLowerCase() === requestedName);
  if (!selected) notFound();
  const response = await fetch(`${serverURL}/dogs/${selected.id}`, { cache: "no-store" });
  if (response.status === 404) notFound();
  if (!response.ok) throw new Error("Kunde inte hämta hunden.");
  const dog: Dog = await response.json();
  const name = dog.nickname || dog.name;
  const titles = dog.titles?.filter((title) => title.trim()) ?? [];
  const facts = [
    { label: "Registreringsnummer", value: dog.reg_nr },
    { label: "Född", value: dog.birth_date },
    { label: "Ras", value: dog.breed },
    { label: "Kön", value: dog.gender },
    { label: "Hårlag", value: dog.hair_type },
    { label: "Storlek", value: dog.size },
    { label: "Färg", value: dog.color },
  ].filter((fact) => fact.value);
  const health = [{ label: "Ögon", value: dog.eye }, { label: "IVDD", value: dog.ivdd }, { label: "BPH", value: dog.bph }].filter((fact) => fact.value);
  const currentIndex = dogs.findIndex((item) => item.id === dog.id);
  const previous = currentIndex > 0 ? dogs[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 ? dogs[currentIndex + 1] : undefined;
  const hasImages = dog.image?.some((image) => image.trim());

  return (
    <main className="dog-profile">
      <div className="site-container">
        <Link href="/dogs" className="dog-back"><FiArrowLeft aria-hidden="true" /> Alla våra hundar</Link>
        <div className="dog-profile-hero">
          <div className="dog-gallery">{hasImages ? <ImageCarousel dog={dog} /> : <div className="dog-photo-placeholder"><FiHeart aria-hidden="true" /><span>Bild kommer snart</span></div>}</div>
          <header className="dog-profile-intro"><p className="site-eyebrow">{dog.angel_dog?.toLowerCase() === "true" ? "Alltid i våra hjärtan" : "En del av vår familj"}</p><h1>{name}</h1><p className="dog-full-name">{dog.name}</p>
            {titles.length > 0 && <ul className="dog-title-badges" aria-label="Titlar">{titles.map((title, index) => <li key={`${title}-${index}`}><FiAward aria-hidden="true" />{title}</li>)}</ul>}
            {facts.length > 0 && <dl className="dog-facts">{facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}
          </header>
        </div>
        {(dog.description || health.length > 0) && <div className="dog-story-row">
          {dog.description && <section className="dog-story" aria-labelledby="dog-about-title"><p className="site-eyebrow">Personligheten bakom namnet</p><h2 id="dog-about-title">Lär känna <em>{name}.</em></h2><p className="dog-description">{dog.description}</p></section>}
          {health.length > 0 && <section className="dog-health" aria-labelledby="dog-health-title"><p className="site-eyebrow">Hälsa &amp; mentalitet</p><h2 id="dog-health-title">Undersökningar</h2><dl>{health.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></section>}
        </div>}
        {dog.pedigree && dog.pedigree.length > 0 && <section className="dog-pedigree" aria-labelledby="pedigree-title"><div className="dogs-section-heading"><div><p className="site-eyebrow">Rötter &amp; generationer</p><h2 id="pedigree-title">Stamtavla</h2></div><p>Familjen bakom {name}.</p></div><div className="dog-pedigree-scroll" tabIndex={0} role="region" aria-label={`Stamtavla för ${name}, rulla i sidled på mindre skärmar`}><div className="dog-pedigree-tree">{[{ start: 0, end: 2, label: "Föräldrar" }, { start: 2, end: 6, label: "Generation 2" }, { start: 6, end: 14, label: "Generation 3" }].map((generation) => <div className="dog-pedigree-column" key={generation.start}><h3>{generation.label}</h3><div>{Array.from({ length: generation.end - generation.start }, (_, index) => { const entryIndex = generation.start + index; const entry = dog.pedigree?.[entryIndex]; return <div className="dog-ancestor" key={entryIndex}><span>{pedigreeLabels[entryIndex]}</span>{entry?.titles && <small>{entry.titles}</small>}<p>{entry?.name || "Ej angivet"}</p></div>; })}</div></div>)}</div></div></section>}
        <nav className="dog-profile-navigation" aria-label="Fler hundar"><div>{previous && <Link href={`/dogs/${encodeURIComponent(previous.nickname)}`}><FiArrowLeft aria-hidden="true" /><span><small>Föregående hund</small>{previous.nickname || previous.name}</span></Link>}</div><Link href="/dogs" className="dog-all-link">Alla hundar</Link><div>{next && <Link href={`/dogs/${encodeURIComponent(next.nickname)}`}><span><small>Nästa hund</small>{next.nickname || next.name}</span><FiArrowRight aria-hidden="true" /></Link>}</div></nav>
      </div>
      <section className="dogs-contact"><div className="site-container"><div><p className="site-eyebrow">Vi berättar gärna mer</p><h2>Nyfiken på <em>{name}?</em></h2><p>Hör av dig om du vill veta mer om våra hundar och vår uppfödning.</p></div><Link href="/contact" className="site-button site-button-green">Kontakta oss <FiArrowUpRight aria-hidden="true" /></Link></div></section>
    </main>
  );
}
