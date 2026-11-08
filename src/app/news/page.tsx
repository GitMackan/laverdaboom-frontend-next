import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight, FiInstagram } from "react-icons/fi";
import InstagramWidget from "@/components/instagramWidget";

export const metadata: Metadata = {
  title: "Nyheter & vardagsliv | Kennel Laverdaboom",
  description: "Följ vardagen hos Kennel Laverdaboom. Bilder och glimtar från livet med våra taxar, direkt från Sandras Instagram.",
};

const instagramURL = "https://www.instagram.com/sandra_kennellaverdaboom/";

export default function News() {
  return (
    <main className="news-page">
      <header className="news-intro"><div className="site-container"><p className="site-eyebrow">Små ögonblick från kennellivet</p><h1>Nyheter &amp;<br /><em>vardagsglädje.</em></h1><div className="news-intro-bottom"><p>Hundliv, valpmys och äventyr tillsammans.<br />Följ med i vår vardag genom Sandras Instagram.</p><a href={instagramURL} target="_blank" rel="noopener noreferrer" className="site-button site-button-green"><FiInstagram aria-hidden="true" /> Följ oss på Instagram <FiArrowUpRight aria-hidden="true" /></a></div></div></header>
      <section className="site-container news-feed" aria-labelledby="news-feed-title"><div className="news-feed-heading"><div><p className="site-eyebrow">Från vårt Instagram</p><h2 id="news-feed-title">Livet med våra <em>taxar.</em></h2></div><a href={instagramURL} target="_blank" rel="noopener noreferrer" className="news-profile-link"><FiInstagram aria-hidden="true" /><span>@sandra_kennellaverdaboom</span><FiArrowUpRight aria-hidden="true" /></a></div><div className="news-widget"><InstagramWidget /></div><div className="news-feed-note"><p>Syns inte bilderna? Du kan också se inläggen direkt på Instagram.</p><a href={instagramURL} target="_blank" rel="noopener noreferrer" className="site-text-link">Öppna Instagram <FiArrowUpRight aria-hidden="true" /></a></div></section>
      <section className="news-more"><div className="site-container"><div><p className="site-eyebrow">Lär känna vår hundfamilj</p><h2>Mer än fina <em>ögonblick.</em></h2><p>Upptäck personligheterna bakom bilderna och läs om våra valpar.</p></div><div className="site-actions"><Link href="/dogs" className="site-button site-button-green">Möt våra hundar <FiArrowUpRight aria-hidden="true" /></Link><Link href="/puppies" className="site-text-link">Om våra valpar <FiArrowUpRight aria-hidden="true" /></Link></div></div></section>
    </main>
  );
}
