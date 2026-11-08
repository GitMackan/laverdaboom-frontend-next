import Image from "next/image";
import Link from "next/link";
import { assetUrl } from "@/assets/constants";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <Image src={`${assetUrl}valpar_cover.jpeg`} alt="Taxvalpar hos Kennel Laverdaboom" fill priority unoptimized sizes="100vw" className="home-hero-image" />
      <div className="home-hero-shade" />
      <div className="site-container home-hero-content">
        <p className="site-eyebrow">Kennel Laverdaboom · Västerås</p>
        <h1 id="home-title">Små tassar.<br />Stor <em>kärlek.</em></h1>
        <p className="home-hero-description">Långhåriga standardtaxar, uppfödda i hemmiljö.<br className="desktop-break" /> Med omsorg om varje hund, från första dagen.</p>
        <div className="site-actions">
          <Link href="/dogs" className="site-button site-button-light">Lär känna våra hundar <FiArrowUpRight aria-hidden="true" /></Link>
          <Link href="/puppies" className="hero-text-link">Om att köpa valp <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="site-container home-hero-bottom"><span>En liten kennel. En stor del av familjen.</span><a href="#om-oss" aria-label="Läs om kenneln"><FiArrowDown aria-hidden="true" /></a></div>
    </section>
  );
}
