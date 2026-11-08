import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { assetUrl } from "@/assets/constants";
import { shopEnabled } from "@/lib/features";

const contacts = [
  { name: "Sandra Brännström", image: "sandra.jpeg", address: "Sigfrid Edströms Gata 25B", city: "724 66 Västerås", email: "sandra.brannstrom@hotmail.com", facebook: "https://www.facebook.com/profile.php?id=100008493274506", instagram: "https://www.instagram.com/sandra_kennellaverdaboom/" },
  { name: "Rosa Johansson", image: "rosa.jpeg", address: "Tunnbrödsvägen 3", city: "724 84 Västerås", email: "rosajohansson@hotmail.se", facebook: "https://www.facebook.com/rosa.johansson.5", instagram: "https://www.instagram.com/rosaajohansson/" },
];

export default function Footer() {
  return (
    <footer className="site-footer"><div className="site-container">
      <div className="site-footer-grid"><div className="site-footer-intro"><Link href="/" className="site-footer-brand">Laverdaboom</Link><p>En liten kennel med stor kärlek<br />till den långhåriga standardtaxen.</p><Link href="/contact" className="site-footer-contact">Välkommen att höra av dig ↗</Link><nav aria-label="Länkar i sidfoten"><Link href="/dogs">Våra hundar</Link><Link href="/puppies">Valpar</Link>{shopEnabled && <Link href="/shop">Shop</Link>}</nav></div>
      {contacts.map((contact) => <div className="site-footer-person" key={contact.name}><div className="site-footer-person-heading"><Image src={`${assetUrl}${contact.image}`} alt={contact.name} width={56} height={56} unoptimized /><h2>{contact.name}</h2></div><address><p>{contact.address}<br />{contact.city}</p><a href={`mailto:${contact.email}`}>{contact.email}</a></address><div className="site-socials"><a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${contact.name} på Facebook`}><FaFacebookF aria-hidden="true" /></a><a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${contact.name} på Instagram`}><FaInstagram aria-hidden="true" /></a></div></div>)}
      </div><div className="site-footer-bottom"><span>© {new Date().getFullYear()} Kennel Laverdaboom</span><span>Uppfödda med omsorg. Älskade för livet.</span></div>
    </div></footer>
  );
}
