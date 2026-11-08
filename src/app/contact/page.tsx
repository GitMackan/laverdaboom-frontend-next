"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import { FiArrowUpRight, FiCheckCircle, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { assetUrl } from "@/assets/constants";

const contacts = [
  { name: "Sandra Brännström", image: "sandra.jpeg", address: "Sigfrid Edströms Gata 25B", city: "724 66 Västerås", email: "sandra.brannstrom@hotmail.com", phone: "070-773 91 50", tel: "+46707739150" },
  { name: "Rosa Johansson", image: "rosa.jpeg", address: "Tunnbrödsvägen 3", city: "724 84 Västerås", email: "rosajohansson@hotmail.se", phone: "073-947 98 79", tel: "+46739479879" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sendingRef = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Fyll i ditt namn, din e-postadress och ett meddelande.");
      setSuccess(false);
      return;
    }
    sendingRef.current = true;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/email`, { name: name.trim(), email: email.trim(), message: message.trim() });
      setName(""); setEmail(""); setMessage(""); setSuccess(true);
    } catch {
      setError("Ditt meddelande kunde inte skickas just nu. Försök igen om en stund eller kontakta oss direkt via e-post eller telefon.");
    } finally {
      sendingRef.current = false;
      setLoading(false);
    }
  }

  return (
    <main className="contact-page">
      <header className="contact-intro"><div className="site-container"><p className="site-eyebrow">Kennel Laverdaboom · Västerås</p><h1>En fråga, en tanke<br /><em>eller bara ett hej.</em></h1><p>Nyfiken på våra hundar eller funderar du på en valp?<br />Du är varmt välkommen att höra av dig till oss.</p></div></header>
      <div className="site-container contact-layout">
        <section className="contact-people" aria-labelledby="contact-people-title"><p className="site-eyebrow">Vi finns här</p><h2 id="contact-people-title">Sandra &amp; Rosa</h2><p className="contact-section-description">Skriv några rader eller slå en signal. Vi berättar gärna mer om våra hundar och livet på kenneln.</p><div className="contact-person-list">{contacts.map((person) => <article className="contact-person" key={person.name}><div className="contact-person-heading"><Image src={`${assetUrl}${person.image}`} alt={person.name} width={64} height={64} unoptimized /><h3>{person.name}</h3></div><address><div><FiMapPin aria-hidden="true" /><span>{person.address}<br />{person.city}</span></div><a href={`mailto:${person.email}`}><FiMail aria-hidden="true" /><span>{person.email}</span></a><a href={`tel:${person.tel}`}><FiPhone aria-hidden="true" /><span>{person.phone}</span></a></address></article>)}</div></section>
        <section className="contact-form-panel" aria-labelledby="contact-form-title"><p className="site-eyebrow">Låt oss lära känna dig</p><h2 id="contact-form-title">Skriv till oss</h2><p className="contact-section-description">Berätta vad du funderar på. Om du är intresserad av en valp får du gärna beskriva dig själv och din vardag.</p><form onSubmit={handleSubmit} aria-labelledby="contact-form-title" aria-busy={loading}><p className="contact-required-note">Alla fält är obligatoriska.</p><fieldset disabled={loading}><legend className="sr-only">Dina kontaktuppgifter och ditt meddelande</legend><div className="contact-field"><label htmlFor="contact-name">Ditt namn</label><input id="contact-name" name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="För- och efternamn" /></div><div className="contact-field"><label htmlFor="contact-email">E-postadress</label><input id="contact-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="namn@exempel.se" /></div><div className="contact-field"><label htmlFor="contact-message">Ditt meddelande</label><textarea id="contact-message" name="message" required rows={6} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Hej Sandra och Rosa…" /></div><button type="submit" className="site-button site-button-green contact-submit">{loading ? "Skickar meddelande…" : "Skicka meddelande"}<FiArrowUpRight aria-hidden="true" /></button></fieldset><div className="contact-feedback" aria-live="polite" aria-atomic="true">{success && <p className="contact-success"><FiCheckCircle aria-hidden="true" /><span>Tack för ditt meddelande! Vi svarar dig så fort vi kan.</span></p>}</div>{error && <p className="contact-error" role="alert">{error}</p>}</form></section>
      </div>
      <section className="contact-explore"><div className="site-container"><div><p className="site-eyebrow">Medan du är här</p><h2>Lär känna vår <em>hundfamilj.</em></h2></div><Link href="/dogs" className="site-text-link">Möt våra hundar <FiArrowUpRight aria-hidden="true" /></Link></div></section>
    </main>
  );
}
