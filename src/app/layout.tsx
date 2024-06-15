import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { assetUrl } from "@/assets/constants";

export const metadata: Metadata = {
	title: "Kennel Laverdaboom | Uppfödare av taxar | Breeder of Dachshund",
	description: "En liten kennel som föder upp taxar i familjemiljö",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
				<link rel="icon" href={`${assetUrl}valpar-midsommar.jpeg`} />
			</Head>
			<body>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
