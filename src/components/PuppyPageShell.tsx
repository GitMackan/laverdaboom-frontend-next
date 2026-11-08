import type { ReactNode } from "react";
import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";

const links = [
  { href: "/puppies/current", label: "Aktuell valpkull" },
  { href: "/puppies/planned", label: "Planerade valpar" },
  { href: "/puppies/previous", label: "Tidigare valpkullar" },
];

export default function PuppyPageShell({ active, eyebrow, title, description, children }: { active: string; eyebrow: string; title: ReactNode; description: string; children: ReactNode }) {
  return <main className="puppy-subpage"><header className="puppy-subpage-header"><div className="site-container"><Link href="/puppies" className="puppy-back"><FiArrowLeft aria-hidden="true" /> Om att köpa valp</Link><p className="site-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="puppy-subpage-description">{description}</p></div></header><nav className="puppy-subpage-nav" aria-label="Valpsidor"><div className="site-container">{links.map((link) => <Link key={link.href} href={link.href} aria-current={active === link.href ? "page" : undefined}>{link.label}</Link>)}</div></nav>{children}<section className="puppy-subpage-contact"><div className="site-container"><div><p className="site-eyebrow">Vi hörs gärna</p><h2>Nyfiken på en <em>ny familjemedlem?</em></h2><p>Berätta om dig och din vardag, eller hör av dig med dina frågor.</p></div><Link href="/contact" className="site-button site-button-green">Kontakta oss <FiArrowUpRight aria-hidden="true" /></Link></div></section></main>;
}
