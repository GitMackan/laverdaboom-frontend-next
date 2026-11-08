"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import CartIcon from "./Products/CartIcon";
import { shopEnabled } from "@/lib/features";

const links = [
  { href: "/", label: "Hem" },
  { href: "/dogs", label: "Våra hundar" },
  { href: "/puppies", label: "Valpar" },
  { href: "/news", label: "Nyheter" },
  ...(shopEnabled ? [{ href: "/shop", label: "Shop" }] : []),
];
const puppyLinks = [
  { href: "/puppies", label: "Att köpa valp" },
  { href: "/puppies/current", label: "Aktuell valpkull" },
  { href: "/puppies/planned", label: "Planerade valpar" },
  { href: "/puppies/previous", label: "Tidigare valpar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [puppiesOpen, setPuppiesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const puppyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMenuOpen(false); setPuppiesOpen(false); }, [pathname]);
  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) { setPuppiesOpen(false); setMenuOpen(false); }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false); setPuppiesOpen(false);
        if (menuOpen) menuButtonRef.current?.focus();
        else if (puppiesOpen) puppyButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("pointerdown", handlePointer); document.removeEventListener("keydown", handleKey); };
  }, [menuOpen, puppiesOpen]);

  const active = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const closeMenus = () => { setMenuOpen(false); setPuppiesOpen(false); };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-container site-header-inner">
        <Link href="/" className="site-brand" aria-label="Kennel Laverdaboom – startsida" onClick={closeMenus}><span>Laverdaboom</span><small>KENNEL · SEDAN 2015</small></Link>
        <nav aria-label="Huvudmeny" className="site-desktop-nav"><ul>{links.map((link) => <li key={link.href} className="site-nav-item">
          <div className="site-nav-link-row"><Link href={link.href} className={active(link.href) ? "site-nav-link is-active" : "site-nav-link"} aria-current={pathname === link.href ? "page" : undefined} onClick={closeMenus}>{link.label}</Link>{link.href === "/puppies" && <button ref={puppyButtonRef} type="button" className="site-dropdown-toggle" aria-label="Visa valpsidor" aria-expanded={puppiesOpen} aria-controls="puppy-menu" onClick={() => setPuppiesOpen(!puppiesOpen)}><FiChevronDown aria-hidden="true" /></button>}</div>
          {link.href === "/puppies" && puppiesOpen && <ul id="puppy-menu" className="site-dropdown">{puppyLinks.map((child) => <li key={child.href}><Link href={child.href} aria-current={pathname === child.href ? "page" : undefined} onClick={closeMenus}>{child.label}</Link></li>)}</ul>}
        </li>)}</ul><Link href="/contact" className="site-nav-contact" aria-current={pathname === "/contact" ? "page" : undefined} onClick={closeMenus}>Kontakta oss</Link></nav>
        <div className="site-header-actions">{shopEnabled && <CartIcon />}<button ref={menuButtonRef} type="button" className="site-menu-toggle" aria-label={menuOpen ? "Stäng menyn" : "Öppna menyn"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}</button></div>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="site-mobile-nav" aria-label="Mobilmeny"><ul>{links.map((link) => <li key={link.href}><div className="site-mobile-link-row"><Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={active(link.href) ? "is-active" : ""} onClick={closeMenus}>{link.label}</Link>{link.href === "/puppies" && <button type="button" aria-label="Visa valpsidor" aria-expanded={puppiesOpen} aria-controls="mobile-puppy-menu" onClick={() => setPuppiesOpen(!puppiesOpen)}><FiChevronDown aria-hidden="true" /></button>}</div>{link.href === "/puppies" && puppiesOpen && <ul id="mobile-puppy-menu" className="site-mobile-sublinks">{puppyLinks.map((child) => <li key={child.href}><Link href={child.href} onClick={closeMenus} aria-current={pathname === child.href ? "page" : undefined}>{child.label}</Link></li>)}</ul>}</li>)}<li><Link href="/contact" className="site-nav-contact" onClick={closeMenus}>Kontakta oss</Link></li></ul></nav>}
    </header>
  );
}
