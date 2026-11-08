import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight, FiHeart } from "react-icons/fi";
import PuppyPageShell from "@/components/PuppyPageShell";

export const metadata: Metadata = { title: "Aktuell valpkull | Kennel Laverdaboom", description: "Just nu har Kennel Laverdaboom inga aktuella valpar. Kontakta oss om du är intresserad av en framtida valp." };

export default function CurrentPuppies() {
  return <PuppyPageShell active="/puppies/current" eyebrow="Här och nu" title={<>Aktuella <em>valpar.</em></>} description="Här berättar vi när det finns en aktuell valpkull hos oss."><section className="site-container puppy-status-section" aria-labelledby="puppy-status-title"><div className="puppy-status-card"><span className="puppy-status-icon"><FiHeart aria-hidden="true" /></span><p className="site-eyebrow">Just nu hos oss</p><h2 id="puppy-status-title">Vi har inga aktuella valpar just nu.</h2><p>Du är varmt välkommen att kontakta oss om du är intresserad av en framtida valp. Vi lär gärna känna dig och berättar mer om vår uppfödning.</p><div className="site-actions"><Link href="/contact" className="site-button site-button-green">Hör av dig till oss <FiArrowUpRight aria-hidden="true" /></Link><Link href="/puppies/previous" className="site-text-link">Se tidigare valpkullar <FiArrowUpRight aria-hidden="true" /></Link></div></div></section></PuppyPageShell>;
}
