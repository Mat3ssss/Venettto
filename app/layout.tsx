import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const drippingMarker = localFont({
  src: "./fonts/adrip1.ttf",
  variable: "--font-dripping-marker",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  icons: { icon: "/vntlogo2.png" },
  title: "Pizza Venetto – Městec Králové",
  description: "Pizza Venetto – pizza a burgery v Městci Králové. Rozvoz po Městci Králové a okolí. Objednávky na tel. 731 041 616.",
  keywords: ["pizza", "burger", "Městec Králové", "Venetto", "rozvoz", "hamburgery"],
  openGraph: {
    title: "Pizza Venetto – Městec Králové",
    description: "Pizza a burgery v Městci Králové s rozvozen po okolí. Objednávky: 731 041 616.",
    url: "https://venettoburger.cz",
    siteName: "Pizza Venetto",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "https://venettoburger.cz/hotpicture.png",
        width: 1200,
        height: 630,
        alt: "Pizza Venetto Městec Králové",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizza Venetto – Městec Králové",
    description: "Pizza a burgery v Městci Králové s rozvozen po okolí.",
    images: ["https://venettoburger.cz/hotpicture.png"],
  },
  metadataBase: new URL("https://venettoburger.cz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${drippingMarker.variable} ${bebasNeue.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
