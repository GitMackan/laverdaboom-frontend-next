import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import PuppyPageShell from "@/components/PuppyPageShell";

export const metadata: Metadata = {
  title: "Planerade valpar | Kennel Laverdaboom",
  description:
    "Information om kommande valpkullar hos Kennel Laverdaboom. Hör av dig för att veta mer om våra planer.",
};

export default function PlannedPuppies() {
  return (
    <PuppyPageShell
      active="/puppies/planned"
      eyebrow="Blicka framåt"
      title={
        <>
          Planer för <em>små tassar.</em>
        </>
      }
      description="Här delar vi våra planer för kommande valpkullar."
    >
      <section
        className="site-container puppy-status-section"
        aria-labelledby="puppy-plans-title"
      >
        <div className="puppy-status-card">
          <p className="site-eyebrow">Kommande kullar</p>
          <h2 id="puppy-plans-title">Nya planer presenteras här.</h2>
          <p>
            När vi har en ny planerad valpkull att berätta om uppdaterar vi den
            här sidan. Kontakta oss gärna om du vill veta mer om våra planer
            eller berätta om ditt intresse för en valp.
          </p>
          <div className="site-actions">
            <Link href="/contact" className="site-button site-button-green">
              Prata valp med oss <FiArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/puppies" className="site-text-link">
              Läs om att köpa valp <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      
      </section>
    </PuppyPageShell>
  );
}
