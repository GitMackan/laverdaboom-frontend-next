import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
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
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}
