import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiCheck, FiHeart } from "react-icons/fi";
import { assetUrl } from "@/assets/constants";

export const metadata: Metadata = {
  title: "Att köpa valp | Kennel Laverdaboom",
  description: "Läs om att köpa taxvalp hos Kennel Laverdaboom. Så hittar vi rätt hem till våra valpar och det här följer med när valpen flyttar.",
};

const included = ["SKK:s köpekontrakt", "Stamtavla", "Ägaranmälan", "Startpaket med valpfoder som valpen ätit hos oss, gosedjur, godis och en filt", "Informationsblad om försäkring"];
const readyToMove = ["Registrerad i SKK", "Minst 8 veckor gammal", "Försäkrad i Folksam mot dolda fel", "Veterinärbesiktigad högst 7 dagar före flytt", "Vaccinerad", "ID-märkt med godkänt chip"];
const litterLinks = [
  { href: "/puppies/current", eyebrow: "Här och nu", title: "Aktuell valpkull", text: "Just nu har vi inga aktuella valpar. Läs mer och hör gärna av dig." },
  { href: "/puppies/planned", eyebrow: "Blicka framåt", title: "Planerade valpar", text: "Ta del av våra planer för kommande kullar." },
  { href: "/puppies/previous", eyebrow: "Ur valpalbumet", title: "Tidigare valpar", text: "Möt valparna som har börjat sina liv hos oss." },
];

export default function Puppies() {
  return (
    <main className="puppies-page">
      <section className="site-container puppies-hero" aria-labelledby="puppies-title">
        <div className="puppies-hero-copy"><p className="site-eyebrow">En ny familjemedlem</p><h1 id="puppies-title">Små tassar.<br /><em>En vän för livet.</em></h1><p>Att välkomna en valp är början på något stort. Hos oss börjar resan med omtanke – om både valpen och dess nya familj.</p><div className="site-actions"><Link href="/contact" className="site-button site-button-green">Berätta om dig själv <FiArrowUpRight aria-hidden="true" /></Link><a href="#valpkop" className="site-text-link">Så går ett valpköp till <FiArrowUpRight aria-hidden="true" /></a></div></div>
        <div className="puppies-hero-photo"><Image src={`${assetUrl}valpar-midsommar.jpeg`} alt="Taxvalpar hos Kennel Laverdaboom" fill priority unoptimized sizes="(max-width: 800px) 100vw, 50vw" /><span><FiHeart aria-hidden="true" /> En trygg start i hemmiljö</span></div>
      </section>
      <nav className="puppies-litter-nav" aria-label="Våra valpkullar"><div className="site-container">{litterLinks.map((item) => <Link key={item.href} href={item.href}><div><p className="site-eyebrow">{item.eyebrow}</p><h2>{item.title}</h2><p className="puppies-link-description">{item.text}</p></div><span className="site-round-arrow"><FiArrowUpRight aria-hidden="true" /></span></Link>)}</div></nav>
      <section id="valpkop" className="site-container puppies-buying" aria-labelledby="buying-title">
        <div><p className="site-eyebrow">Rätt hund i rätt hem</p><h2 id="buying-title">Ett hem att <em>höra till.</em></h2></div>
        <div className="puppies-buying-copy"><p className="puppies-lead">Vi söker hem där hunden får vara en stor del av familjen.</p><p>Vi ser gärna att du vill aktivera din hund, till exempel genom kurser och viltspår. För oss är det viktigt att varje valp får ett hem som passar just dess personlighet.</p><p>Hos oss finns inget särskilt kösystem. Vi börjar med att träffas och prata om era och våra förväntningar på den nya familjemedlemmen och det nya hemmet. Om allt känns bra matchar vi sedan valparna med de hem vi tror passar dem bäst.</p></div>
      </section>
      <section className="puppies-preparation" aria-labelledby="preparation-title"><div className="site-container"><div className="puppies-section-heading"><p className="site-eyebrow">När det är dags att flytta</p><h2 id="preparation-title">En omsorgsfull start.<br /><em>Hela vägen hem.</em></h2><p>Här ser du vad som följer med valpen och hur den är förberedd inför flytten.</p></div><div className="puppies-checklist-grid"><section className="puppies-checklist" aria-labelledby="included-title"><span className="puppies-list-number">01</span><h3 id="included-title">Det här följer med</h3><ul>{included.map((item) => <li key={item}><FiCheck aria-hidden="true" /><span>{item}</span></li>)}</ul></section><section className="puppies-checklist" aria-labelledby="moving-title"><span className="puppies-list-number">02</span><h3 id="moving-title">När valpen flyttar</h3><ul>{readyToMove.map((item) => <li key={item}><FiCheck aria-hidden="true" /><span>{item}</span></li>)}</ul></section></div></div></section>
      <section className="site-container puppies-outro" aria-labelledby="puppies-contact-title"><div className="puppies-outro-photo"><Image src={`${assetUrl}valpar_cover.jpeg`} alt="En stund tillsammans med taxvalparna" fill unoptimized sizes="(max-width: 800px) 100vw, 50vw" /></div><div><p className="site-eyebrow">Vi lär gärna känna dig</p><h2 id="puppies-contact-title">Börjar taxlivet<br /><em>här hos oss?</em></h2><p>Berätta om dig, din vardag och vad du hoppas på i en ny familjemedlem. Du är också varmt välkommen att höra av dig med frågor om våra valpar.</p><Link href="/contact" className="site-button site-button-green">Kontakta oss <FiArrowUpRight aria-hidden="true" /></Link></div></section>
    </main>
  );
}
