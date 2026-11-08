import Link from "next/link";
import { FiArrowRight, FiPackage, FiClipboard } from "react-icons/fi";
import { LuDog } from "react-icons/lu";

const sections = [
  { title: "Hundar", description: "Hantera hundarnas information, bilder och stamtavlor.", href: "/admin/dogs", addHref: "/admin/add", addLabel: "Lägg till hund", Icon: LuDog },
  { title: "Produkter", description: "Hantera shopens produkter, bilder, varianter och lager.", href: "/admin/products", addHref: "/admin/products/add", addLabel: "Lägg till produkt", Icon: FiPackage },
  { title: "Beställningar", description: "Se betalda köp, kunduppgifter och leveranser. Följ beställningen tills den är slutförd.", href: "/admin/orders", addHref: "", addLabel: "", Icon: FiClipboard },
];

export default function AdminOverview() {
  return (
    <main className="w-[90%] max-w-[1200px] mx-auto">
      <h1 className="font-cursive text-5xl md:text-6xl mb-4">Översikt</h1>
      <p className="font-primary text-gray-600 mb-10">Välj vad du vill arbeta med.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map(({ title, description, href, addHref, addLabel, Icon }) => (
          <section key={href} className="rounded-xl border border-gray-200 bg-[#faf7f5] p-6 md:p-8">
            <Icon size={32} aria-hidden="true" className="mb-5" />
            <h2 className="font-secondary text-2xl mb-3">{title}</h2>
            <p className="font-primary text-gray-600 mb-8">{description}</p>
            <div className="flex flex-wrap items-center gap-5">
              <Link href={href} className="inline-flex items-center gap-3 !bg-[#222] !text-white rounded-md px-5 py-3 font-primary text-sm">
                Hantera {title.toLowerCase()} <FiArrowRight aria-hidden="true" />
              </Link>
              {addHref && <Link href={addHref} className="font-primary text-sm underline">{addLabel}</Link>}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
