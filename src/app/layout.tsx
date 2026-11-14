import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { assetUrl } from "@/assets/constants";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/lib/toastify/ToastProvider";

export const metadata: Metadata = {
  title: "Kennel Laverdaboom | Uppfödare av taxar | Breeder of Dachshund",
  description: "En liten kennel som föder upp taxar i familjemiljö",
  icons: {
    icon: `${assetUrl}valpar-midsommar.jpeg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="dba30571-74b9-43cd-8d36-5bf331604949"
          strategy="afterInteractive"
        />
        <Navbar />
        {children}
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}
