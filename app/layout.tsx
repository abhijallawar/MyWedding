import type { Metadata } from "next";
import localFont from "next/font/local";
import { wedding } from "../config/wedding";
import "./globals.css";

const script = localFont({ src: "./fonts/pinyon-script.woff2", variable: "--font-script", display: "swap" });
const display = localFont({ src: "./fonts/cormorant-garamond.woff2", variable: "--font-display", display: "swap", weight: "400 700" });
const body = localFont({ src: "./fonts/dm-sans.woff2", variable: "--font-body", display: "swap", weight: "400 700" });

export const metadata: Metadata = {
  title: wedding.names.join(" weds "),
  description: "An invitation to the wedding of " + wedding.names.join(" and ") + ".",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${script.variable} ${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
