"use client";

import { useState, useRef } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Flame, Beef, Zap, Droplets, Leaf, ChefHat } from "lucide-react";
import FadeIn from "./FadeIn";

const dipIcons: Record<string, ReactNode> = {
  "Kečup":       <Droplets size={36} color="rgba(255,255,255,0.85)" strokeWidth={1.5} />,
  "Hořčice":     <Leaf size={36} color="rgba(255,255,255,0.85)" strokeWidth={1.5} />,
  "Chilli dip":  <Flame size={36} color="rgba(255,255,255,0.85)" strokeWidth={1.5} />,
  "BBQ dip":     <Beef size={36} color="rgba(255,255,255,0.85)" strokeWidth={1.5} />,
  "Pepřový dip": <Zap size={36} color="rgba(255,255,255,0.85)" strokeWidth={1.5} />,
  "Mayo":        <ChefHat size={36} color="rgba(255,255,255,0.85)" strokeWidth={1.5} />,
};

const categories = [
  { id: "pizza", label: "Pizza" },
  { id: "pizza-special", label: "Pizza Speciál" },
  { id: "pizza-exclusive", label: "Pizza Exclusive" },
  { id: "burgery", label: "Burgery" },
  { id: "sides", label: "Přílohy" },
  { id: "ingredience", label: "Ingredience" },
  { id: "napoje", label: "Nápoje" },
];

type MenuItem = { name: string; desc: string; price: string; color?: string; hot?: boolean; top?: boolean; photo?: string };

const menuData: Record<string, MenuItem[]> = {
  pizza: [
    { name: "Margarita", desc: "tomato | sýr | bazalka", price: "195 Kč", photo: "/pizza.jpg" },
    { name: "Šunková", desc: "tomato | sýr | šunka", price: "200 Kč", photo: "/pizza.jpg" },
    { name: "Salámová", desc: "tomato | sýr | salám", price: "200 Kč", photo: "/pizza.jpg" },
    { name: "Slaninová", desc: "tomato | sýr | slanina | cibule", price: "200 Kč", photo: "/pizza.jpg" },
    { name: "Hawai", desc: "tomato | sýr | šunka | ananas", price: "200 Kč", photo: "/pizza.jpg" },
    { name: "Americana", desc: "tomato | sýr | šunka | kukuřice", price: "200 Kč", photo: "/pizza.jpg" },
    { name: "Sýrová", desc: "smetana | gouda | niva | uzený sýr | parmazán", price: "220 Kč", photo: "/pizza.jpg" },
    { name: "Tuňáková", desc: "tomato | sýr | tuňák | červená cibule", price: "220 Kč", photo: "/pizza.jpg" },
    { name: "Olivová", desc: "tomato | sýr | šunka | olivy", price: "200 Kč", photo: "/pizza.jpg" },
    { name: "Feferone", desc: "tomato | sýr | pikantní salám | feferony | cibule", price: "205 Kč", hot: true, photo: "/pizza.jpg" },
    { name: "Žampionová", desc: "tomato | sýr | šunka | žampiony", price: "200 Kč", photo: "/pizza.jpg" },
    { name: "Špenátová", desc: "tomato | sýr | slanina | špenát | česnek", price: "205 Kč", photo: "/pizza.jpg" },
  ],
  "pizza-special": [
    { name: "Pepato", desc: "tomato | sýr | salám | feferonky | cibule | slanina | olivy", price: "230 Kč", hot: true, photo: "/pizza.jpg" },
    { name: "Polo", desc: "tomato | sýr | kuřecí maso | niva | parmazán", price: "230 Kč", photo: "/pizza.jpg" },
    { name: "Kuřecí", desc: "smetana | sýr | šunka | kuřecí maso | špenát | česnek", price: "230 Kč", photo: "/pizza.jpg" },
    { name: "Mexicana", desc: "tomato | sýr | pikantní salám | niva | česnek", price: "230 Kč", hot: true, photo: "/pizza.jpg" },
    { name: "Jalapeňo", desc: "tomato | sýr | pikantní salám | jalapeňo | parmazán", price: "230 Kč", hot: true, photo: "/pizza.jpg" },
    { name: "Olomoučíno", desc: "tomato | sýr | olomoucké syrečky | cibule", price: "230 Kč", photo: "/pizza.jpg" },
    { name: "Brusinková", desc: "smetana | sýr | šunka | hermelín | brusinky", price: "225 Kč", photo: "/pizza.jpg" },
    { name: "Venetto", desc: "smetana | sýr | šunka | cibule | tuňák", price: "230 Kč", top: true, photo: "/pizza.jpg" },
    { name: "Italia", desc: "tomato | sýr | salám | žampiony | olivy | čerstvá paprika", price: "230 Kč", photo: "/pizza.jpg" },
  ],
  "pizza-exclusive": [
    { name: "Carbonara", desc: "smetana | slanina | cibule | vejce | sýr", price: "235 Kč", photo: "/pizza.jpg" },
    { name: "Gulia", desc: "tomato | šunka | slanina | salám | niva | česnek | oregano | sýr", price: "240 Kč", photo: "/pizza.jpg" },
    { name: "Curry", desc: "smetana | šunka | pórek | kuřecí maso | kari | sýr", price: "235 Kč", photo: "/pizza.jpg" },
    { name: "Prosciutto", desc: "tomato | sýr | cherry rajčata | prosciutto | parmazán", price: "235 Kč", photo: "/pizza.jpg" },
  ],
  ingredience: [
    { name: "Ingredience", desc: "sýr | maso | salám | šunka | slanina | niva | olomoucké syrečky | parma | tuňák | hermelín | vejce", price: "+45 Kč", color: "#1a1a1a" },
    { name: "Ingredience", desc: "kukuřice | špenát | cibule | olivy | žampiony | česnek | feferonky | ananas | jalapeňo", price: "+30 Kč", color: "#1a1a1a" },
    { name: "Krabice na pizzu", desc: "", price: "15 Kč", color: "#1a1a1a" },
    { name: "Půlená pizza", desc: "", price: "20 Kč", color: "#1a1a1a" },
    { name: "Změna základu na smetanový", desc: "", price: "10 Kč", color: "#1a1a1a" },
  ],
  burgery: [
    { name: "Classic", desc: "bulka | salát | hovězí maso | hořčice | kečup | okurka | rajče | cheddar", price: "185 / 255 Kč" },
    { name: "Bacon", desc: "bulka | salát | hovězí maso | pepřový dip | slanina | cibule | rajče | okurka", price: "189 / 259 Kč" },
    { name: "Cheese", desc: "bulka | hovězí maso | dip | salát | rajče | okurka | cheddar", price: "189 / 259 Kč" },
    { name: "Chilli", desc: "bulka | salát | hovězí maso | jalapeňo papričky | dip | cheddar", price: "189 / 259 Kč", hot: true },
    { name: "BBQ", desc: "bulka | salát | hovězí maso | rajče | okurka | cibule | BBQ dip | cheddar", price: "189 / 259 Kč" },
    { name: "Double Cheese & Bacon", desc: "bulka | hovězí maso | salát | dvojitá slanina | dvojitý cheddar", price: "199 / 269 Kč", top: true },
    { name: "Chipotle", desc: "bulka | hovězí maso | slanina | cheddar | chipotle dip", price: "199 / 269 Kč" },
    { name: "Chicken Burger", desc: "bulka | kuřecí maso | salát | slanina | rajče | okurka | dip", price: "189 / 259 Kč" },
    { name: "Chicken Strips", desc: "6 ks + 2× dip", price: "199 / 269 Kč" },
    { name: "BBQ Hot Wings", desc: "7 ks kuřecích křidýlek v křupavé krustě | BBQ dip", price: "199 / 269 Kč" },
    { name: "Slider", desc: "speciální bulka | 80 g masa | kečup | hořčice | cibule | okurka", price: "129 Kč" },
  ],
  sides: [
    { name: "Hranolky", desc: "", price: "59 Kč" },
    { name: "Cibulové kroužky", desc: "", price: "69 Kč" },
    { name: "Cheddarové uhlí (5 ks)", desc: "", price: "75 Kč" },
  ],
  napoje: [
    { name: "Fanta", desc: "", price: "40 Kč", color: "#e65c00" },
    { name: "Sprite", desc: "", price: "40 Kč", color: "#1a7a1a" },
    { name: "Coca-Cola", desc: "", price: "40 Kč", color: "#8b0000" },
    { name: "Pepsi", desc: "", price: "40 Kč", color: "#00308f" },
    { name: "Mirinda", desc: "", price: "40 Kč", color: "#7b2d8b" },
    { name: "Pivo 0,5 l", desc: "dle nabídky", price: "50 Kč", color: "#8b6914" },
  ],
};

export default function Menu() {
  const [active, setActive] = useState("pizza");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const burgirY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const items = menuData[active];

  return (
    <section ref={sectionRef} id="menu" className="scroll-mt-24 py-20 px-6 bg-[#0a0a0a] relative overflow-hidden" style={{ overflowAnchor: "none" }}>
      {/* Decorative burgir */}
      <motion.div
        className="pointer-events-none select-none absolute right-0 inset-y-0 flex items-center w-64"
        style={{ y: burgirY }}
      >
        <motion.img
          src="/burgir.svg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto"
          style={{ opacity: 0.4 }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <FadeIn direction="down" className="text-center mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/menu.svg" alt="Menu" className="mx-auto max-h-36 w-auto" />
        </FadeIn>

        {/* Note */}
        <FadeIn delay={0.15}>
          <p className="text-center text-white/50 text-sm mb-8 uppercase tracking-widest">Burgery: single / menu +70 Kč</p>
        </FadeIn>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Kategorie menu">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              role="tab"
              aria-selected={active === cat.id}
              className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                active === cat.id ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              {cat.label}
              {active === cat.id && (
                <motion.svg
                  className="absolute inset-[-6px] w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 12,50 C 10,18 90,14 92,50 C 94,82 12,86 10,50"
                    stroke="white"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                  />
                </motion.svg>
              )}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <motion.div layout transition={{ duration: 0.4, ease: "easeInOut" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${active === "napoje" || active === "ingredience" ? "max-w-md mx-auto" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {items.map((item, i) => (
              <motion.div
                key={item.name + i}
                className="flex gap-4 items-start group"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
              >
                {/* Photo / color blob */}
                {item.color ? (
                  <div
                    className="w-28 h-28 flex-shrink-0 rounded-xl flex items-center justify-center overflow-hidden relative"
                    style={{ background: item.color, border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="absolute w-20 h-20 rounded-full blur-xl animate-pulse-blob" style={{ background: "white" }} />
                    {item.hot
                      ? <img src="/chilli.svg" alt="chilli" className="w-10 h-10 drop-shadow-lg" />
                      : (dipIcons[item.name] ?? (
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)" stroke="none">
                            <path d="M12 2 C12 2 5 10.5 5 15a7 7 0 0 0 14 0C19 10.5 12 2 12 2z"/>
                          </svg>
                        ))
                    }
                  </div>
                ) : (
                  <div className="flex-shrink-0 relative" style={{ width: 112, height: 112 }}>
                    <div className="absolute inset-0 rounded overflow-hidden">
                      <Image src={item.photo ?? "/burger.png"} alt={item.name} fill sizes="112px" className="object-cover" />
                      {item.hot && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src="/fire.gif"
                          alt=""
                          aria-hidden="true"
                          className="pointer-events-none select-none absolute opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                          style={{
                            width: "100%",
                            height: "80%",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            mixBlendMode: "screen",
                            objectFit: "cover",
                            zIndex: 2,
                          }}
                        />
                      )}
                    </div>
                    {item.hot && (
                      <img src="/chilli.svg" alt="chilli" className="absolute -top-3 -left-3 w-8 h-8 drop-shadow-lg" style={{ zIndex: 3 }} />
                    )}
                    {item.top && (
                      <img src="/toptop.svg" alt="top" className="absolute -top-4 -left-4 w-11 h-11 drop-shadow-lg" style={{ zIndex: 3 }} />
                    )}
                  </div>
                )}
                {/* Info */}
                <div className="flex flex-col justify-between min-h-28">
                  <div>
                    <p className="text-white font-black uppercase text-sm tracking-wide">{item.name}</p>
                    {item.desc && <p className="text-white/50 text-xs mt-1">{item.desc}</p>}
                  </div>
                  <p className="text-white font-black text-2xl">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        </motion.div>

        {/* Footnote */}
        <FadeIn delay={0.2} className="mt-12">
          <p className="text-center text-white/30 text-xs leading-relaxed">
            Pizza Ø40 cm &nbsp;·&nbsp; Krabice + 15 Kč<br />
            Burgery: single / menu (hranolky + nápoj) &nbsp;·&nbsp; Cena včetně obalového materiálu
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
