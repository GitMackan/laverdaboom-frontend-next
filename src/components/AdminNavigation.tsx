"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const sections = [
  { href: "/admin", label: "Översikt" },
  { href: "/admin/dogs", label: "Hundar" },
  { href: "/admin/products", label: "Produkter" },
  { href: "/admin/orders", label: "Beställningar" },
];

export default function AdminNavigation({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;
  const section = pathname === "/admin" ? sections[0]
    : pathname.startsWith("/admin/orders") ? sections[3]
    : pathname.startsWith("/admin/products") ? sections[2] : sections[1];
  const isList = pathname === section.href;
  return (
    <div className="pt-[15vh] pb-16 min-h-screen">
      <header className="w-[90%] max-w-[1200px] mx-auto mb-8 border-b border-gray-200 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <Link href="/admin" className="font-secondary text-xl">Administration</Link>
          <Link href="/" className="font-primary text-sm underline">Visa webbplatsen ↗</Link>
        </div>
        <nav aria-label="Adminmeny" className="flex flex-wrap gap-2">
          {sections.map((item) => (
            <Link key={item.href} href={item.href} aria-current={section.href === item.href ? "page" : undefined}
              className={`font-primary rounded-md px-5 py-3 text-sm transition-colors ${section.href === item.href
                ? "!bg-[#222] !text-white" : "bg-[#f7f2ef] hover:bg-[#eee4de]"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        {pathname !== "/admin" && (
          <nav aria-label="Du är här" className="font-primary text-sm text-gray-600 mt-5 flex flex-wrap gap-2">
            <Link href="/admin" className="underline">Översikt</Link><span aria-hidden="true">/</span>
            {isList ? <span aria-current="page">{section.label}</span> : <>
              <Link href={section.href} className="underline">{section.label}</Link>
              <span aria-hidden="true">/</span><span aria-current="page">{section.href === "/admin/orders" ? "Orderdetaljer" : pathname.endsWith("/add") ? "Lägg till" : "Redigera"}</span>
            </>}
          </nav>
        )}
      </header>
      {children}
    </div>
  );
}
