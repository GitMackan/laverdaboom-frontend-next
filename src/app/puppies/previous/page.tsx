import type { Metadata } from "next";
import Image from "next/image";
import { assetUrl } from "@/assets/constants";
import PuppyPageShell from "@/components/PuppyPageShell";
import litters from "./litters.json";

export const metadata: Metadata = {
  title: "Tidigare valpkullar | Kennel Laverdaboom",
  description:
    "Valpalbum från Kennel Laverdaboom. Möt våra tidigare kullar, deras föräldrar och valparna som har vuxit upp hos oss.",
};

function AlbumImage({ file, alt }: { file: string; alt: string }) {
  return (
    <div className="puppy-album-image">
      <Image
        src={`${assetUrl}${file}`}
        alt={alt}
        fill
        unoptimized
        sizes="(max-width: 800px) 100vw, 50vw"
      />
    </div>
  );
}

export default function PreviousPuppies() {
  return (
    <PuppyPageShell
      active="/puppies/previous"
      eyebrow="Ur vårt valpalbum"
      title={
        <>
          Små tassar.
          <br />
          <em>Stora minnen.</em>
        </>
      }
      description="Här samlar vi våra tidigare valpkullar och minnen från deras första tid hos oss."
    >
      <div className="site-container puppy-archive">
        <article
          id="senaste-kullen"
          className="puppy-litter"
          aria-labelledby="latest-litter-title"
        >
          <div className="puppy-litter-copy">
            <p className="site-eyebrow">Tidigare aktuell valpkull</p>
            <h2 id="latest-litter-title">
              Daxwall&apos;s Dream Come True × Huntaks Look At Me Now
            </h2>
            <p>
              Efter en lugn och smidig valpning under natten välkomnade vi fyra
              pigga valpar till världen – tre hanar och en tik.
            </p>
            <dl className="puppy-litter-parents">
              <div>
                <dt>Pappa</dt>
                <dd>
                  Daxwall&apos;s Dream Come True <span>N/CDDY</span>
                </dd>
              </div>
              <div>
                <dt>Mamma</dt>
                <dd>Huntaks Look At Me Now</dd>
              </div>
            </dl>
            <span className="puppy-archive-badge">Arkiverad valpkull</span>
          </div>
          <div className="puppy-litter-album">
            <AlbumImage
              file="knopa_valpar.jpg"
              alt="De fyra valparna efter Daxwall's Dream Come True och Huntaks Look At Me Now"
            />
          </div>
        </article>
        {litters.map((litter) => (
          <article
            className="puppy-litter"
            key={litter.date}
            aria-labelledby={`litter-${litter.date}`}
          >
            <div className="puppy-litter-copy">
              <p className="site-eyebrow">
                Födda{" "}
                <time dateTime={litter.date}>
                  {new Intl.DateTimeFormat("sv-SE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  }).format(new Date(litter.date))}
                </time>
              </p>
              <h2 id={`litter-${litter.date}`}>
                {litter.parents.replace(" x ", " × ")}
              </h2>
              <ul className="puppy-litter-puppies">
                {litter.puppies.map((puppy) => (
                  <li key={puppy.registration}>
                    <span>{puppy.name}</span>
                    <small>{puppy.registration}</small>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`puppy-litter-album ${litter.images.length > 1 ? "puppy-album-grid" : ""}`}
            >
              {litter.images.map((file, index) => (
                <AlbumImage
                  key={file}
                  file={file}
                  alt={`Valpkullen född ${litter.date}, bild ${index + 1}`}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </PuppyPageShell>
  );
}
