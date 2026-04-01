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
  title: "Venetto Burger – Nový Bydžov",
  description: "Venetto Burger – nejlepší burgery v Novém Bydžově. Rozvoz po Novém Bydžově a okolí. Objednávky na tel. 731 041 616.",
  keywords: ["burger", "Nový Bydžov", "Venetto", "rozvoz", "hamburgery"],
  openGraph: {
    title: "Venetto Burger – Nový Bydžov",
    description: "Nejlepší burgery v Novém Bydžově s rozvozen po Novém Bydžově a okolí. Objednávky: 731 041 616.",
    url: "https://venettoburger.cz",
    siteName: "Venetto Burger",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "https://venettoburger.cz/hotpicture.png",
        width: 1200,
        height: 630,
        alt: "Venetto Burger Nový Bydžov",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Venetto Burger – Nový Bydžov",
    description: "Nejlepší burgery v Novém Bydžově s rozvozen po Novém Bydžově a okolí.",
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
