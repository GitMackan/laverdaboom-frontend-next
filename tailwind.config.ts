import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			dark: "#383838",
			accent: "#324b4c",
			white: "#ffffff",
			grey: "#fff",
			secondary: "#fff8d6",
			detail: "#ff00dc",
		},
		fontFamily: {
			primary: ["Roboto", "sans-serif"],
			cursive: ["The nautigal", "cursive"],
			secondary: ["Playfair", "serif"],
		},
		screens: {
			sm: "650px",
			medium: "900px",
			lg: "1150px",
		},
		extend: {
			gridTemplateColumns: {
				small: "repeat(auto-fit, minmax(300px, 1fr))",
				large: "repeat(auto-fit, minmax(400px, 1fr))",
			},
		},
	},
	plugins: [],
};
export default config;
