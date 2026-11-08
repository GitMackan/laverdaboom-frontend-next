import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiHeart, FiHome, FiSun } from "react-icons/fi";
import { assetUrl } from "@/assets/constants";
import HeroSection from "@/components/HeroSection";

const puppyImages = [
  { file: "bella-orange.jpg", name: "Taxvalp med orange halsband" },
  { file: "bella-gul.jpg", name: "Taxvalp med gult halsband" },
  { file: "bella-lila.jpg", name: "Taxvalp med lila halsband" },
  { file: "bella-red.jpg", name: "Taxvalp med rött halsband" },
];

export default function Home() {
  return (
    <main className="home-page">
      <HeroSection />
      <div className="home-intro-strip"><div className="site-container"><span>Långhårig standardtax</span><span>En del av familjen</span><span>Kennel sedan 2015</span></div></div>
      <section id="om-oss" className="site-container home-about" aria-labelledby="about-title">
        <div className="home-about-photo">
          <Image src={`${assetUrl}laverdaboom.jpeg`} alt="Hundarna hos Kennel Laverdaboom" fill unoptimized sizes="(max-width: 800px) 100vw, 50vw" />
          <div className="home-photo-note"><span>Uppfödning med hjärtat</span><span>sedan 2015</span></div>
        </div>
        <div className="home-about-copy">
          <p className="site-eyebrow">Välkommen till oss</p>
          <h2 id="about-title">Ett litet kennelliv.<br /><em>En stor passion.</em></h2>
          <p className="site-lead">Vi är Sandra och Rosa, mor och dotter med en gemensam kärlek till taxen.</p>
          <p>Laverdaboom är en liten kennel i Västerås där hundarna är en självklar del av familjen. Kenneln registrerades 2015 och året därpå välkomnade vi vår första kull långhåriga standardtaxar.</p>
          <p>Vardagen delar vi med våra hundar och vår familj. Vi tycker om att vara aktiva tillsammans – med rallylydnad, utställning och viltspår. I vår uppfödning strävar vi efter friska, sunda och trevliga hundar, och lägger stor omsorg på att hitta rätt hem till varje valp.</p>
          <Link href="/contact" className="site-text-link">Lär känna oss <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>
      <section className="home-values" aria-label="Det vi värdesätter"><div className="site-container home-values-grid">
        <div><FiHome aria-hidden="true" /><h3>En trygg start</h3><p>Våra valpar växer upp i hemmiljö, nära oss och vardagens alla små äventyr.</p></div>
        <div><FiHeart aria-hidden="true" /><h3>Omsorg i varje steg</h3><p>Vi strävar efter sunda, friska hundar med ett trevligt temperament.</p></div>
        <div><FiSun aria-hidden="true" /><h3>Ett aktivt liv tillsammans</h3><p>Från viltspår till rallylydnad. Vi älskar att upptäcka vad våra hundar kan.</p></div>
      </div></section>
      <section className="site-container home-discover" aria-labelledby="discover-title">
        <div className="home-section-heading"><div><p className="site-eyebrow">Livet med tax</p><h2 id="discover-title">Hitta din väg <em>hos oss.</em></h2></div><p>Lär känna våra hundar och läs mer om<br className="desktop-break" /> resan till en ny familjemedlem.</p></div>
        <div className="home-discover-grid">
          <Link href="/dogs" className="home-feature-card"><div className="home-feature-image"><Image src={`${assetUrl}laverdaboom.jpeg`} alt="Våra taxar" fill unoptimized sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="home-feature-caption"><div><p className="site-eyebrow">Personligheter på fyra tassar</p><h3>Våra hundar</h3></div><span className="site-round-arrow"><FiArrowUpRight aria-hidden="true" /></span></div></Link>
          <Link href="/puppies" className="home-feature-card"><div className="home-feature-image"><Image src={`${assetUrl}bella-with-puppies.jpg`} alt="Taxmamma tillsammans med sina valpar" fill unoptimized sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="home-feature-caption"><div><p className="site-eyebrow">Början på något fint</p><h3>Att köpa valp</h3></div><span className="site-round-arrow"><FiArrowUpRight aria-hidden="true" /></span></div></Link>
        </div>
      </section>
      <section className="home-litter" aria-labelledby="litter-title"><div className="site-container">
        <div className="home-section-heading"><div><p className="site-eyebrow">Ur vårt valpalbum · 12 augusti 2024</p><h2 id="litter-title">Fyra små <em>personligheter.</em></h2></div><Link href="/puppies/previous" className="site-text-link">Tidigare valpkullar <FiArrowRight aria-hidden="true" /></Link></div>
        <div className="home-puppy-grid">{puppyImages.map((image) => <div className="home-puppy-photo" key={image.file}><Image src={`${assetUrl}${image.file}`} alt={image.name} fill unoptimized sizes="(max-width: 650px) 50vw, 25vw" /></div>)}</div>
        <div className="home-litter-details"><div><p className="site-eyebrow">Föräldrar</p><p>Bella Rose Marzenie Gabrysi &amp; Pazir&apos;s Sirocco</p><p className="home-litter-health">Bella Rose: SE U(V)CH · Ögonlyst utan anmärkning · CDDY/CDDY<br />Pazir&apos;s Sirocco: SE U(V)CH, SE VCH · Ögonlyst utan anmärkning · IVDD 0</p></div><div><p className="site-eyebrow">Laverdabooms PS</p><p>Tamina · Tess · Tindra · Tosca</p></div></div>
      </div></section>
      <section className="site-container home-contact"><p className="site-eyebrow">Vi hörs gärna</p><h2>Nyfiken på taxlivet?<br /><em>Låt oss prata.</em></h2><p>Har du frågor om våra hundar eller funderar du på en valp?<br className="desktop-break" /> Du är varmt välkommen att höra av dig.</p><Link href="/contact" className="site-button site-button-green">Kontakta oss <FiArrowUpRight aria-hidden="true" /></Link></section>
    </main>
  );
}
