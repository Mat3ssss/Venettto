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
  { id: "burgery", label: "Burgery" },
  { id: "saláty", label: "Saláty" },
  { id: "tortily", label: "Tortily" },
  { id: "sides", label: "Přílohy" },
  { id: "omacky", label: "Omáčky" },
];

type MenuItem = { name: string; desc: string; price: string; color?: string; hot?: boolean; top?: boolean };

const menuData: Record<string, MenuItem[]> = {
  burgery: [
    { name: "Classic Burger", desc: "bulka | salát | hovězí maso | hořčice | kečup | okurka | rajče | cheddar", price: "185 / 255 Kč" },
    { name: "Bacon Burger", desc: "bulka | salát | hovězí maso | pepper mayo | slanina | cibule | okurka | rajče", price: "189 / 259 Kč" },
    { name: "Chilli Burger", desc: "bulka | hovězí maso | chilli dip | salát | cheddar | jalapeño", price: "189 / 259 Kč", hot: true },
    { name: "Cheese Burger", desc: "bulka | hovězí maso | dip | salát | rajče | okurka | cheddar", price: "189 / 259 Kč" },
    { name: "BBQ Burger", desc: "bulka | salát | hovězí maso | BBQ dresing | cibule | okurka | rajče | cheddar", price: "189 / 259 Kč" },
    { name: "Double Cheese & Bacon", desc: "bulka | salát | hovězí maso | pepřová mayo | double slanina | double cheddar", price: "199 / 269 Kč", top: true },
    { name: "MM Burger", desc: "bulka | smash maso | ledový salát | sweet hot dip | 2× cheddar | pražená cíba", price: "230 / 300 Kč" },
    { name: "Grand Burger", desc: "bulka | smash maso | ledový salát | mayo | BBQ dip | slanina | rajče | cibule", price: "235 / 305 Kč" },
    { name: "Chipotle Burger", desc: "bulka | salát | hovězí maso | chipotle | okurka | slanina | cheddar", price: "199 / 269 Kč" },
    { name: "Big Burger (400g)", desc: "bulka | dvojité hovězí maso | BBQ dip | dvojitý cheddar | okurka", price: "265 / 335 Kč" },
    { name: "Fat Boy", desc: "bulka | mayo | salát | hovězí maso | grilovaný hermelín obalený ve slanině | brusinky", price: "255 / 325 Kč" },
    { name: "Rings Burger", desc: "bulka | salát | hovězí maso | pepper mayo | cheddar | cibulové kroužky", price: "199 / 269 Kč" },
    { name: "Cheese King", desc: "bulka | hovězí maso | majonéza | rajče | salát | smažený sýr", price: "235 / 305 Kč" },
    { name: "Smažák", desc: "bulka | salát | smažený sýr | majonéza | rajče", price: "189 / 259 Kč" },
    { name: "Ogar Burger", desc: "bulka | hovězí maso | cibule | domácí tatarák ze syrečků | česnekové mayo", price: "199 / 269 Kč" },
    { name: "American Burger", desc: "bulka | hranolky | dip | hovězí maso | cheddar | slanina", price: "199 / 269 Kč" },
    { name: "Blue Cheese Burger", desc: "bulka | hovězí maso | česnekový dip | slanina | blue cheese | salátek | pražená cibulka", price: "209 / 279 Kč" },
    { name: "Chicken Burger", desc: "bulka | kuřecí maso | salát | slanina | rajče | okurka | dip", price: "189 / 259 Kč" },
    { name: "Pulled Pork Burger", desc: "bulka | coleslaw | mayo | trhané vepřové maso", price: "199 / 269 Kč" },
  ],
  "saláty": [
    { name: "Salát s kuřecím masem", desc: "ledový salát | bylinkový dresink | slanina | 2× kuřecí strips | opečený chléb", price: "179 Kč" },
  ],
  tortily: [
    { name: "Chicken Wrap", desc: "tortilla | kuřecí stripsy | slanina | hranolky | BBQ | sýr", price: "179 / 249 Kč" },
    { name: "Chilli Tortilla", desc: "salát | hovězí maso | jalapeňo | dip | cheddar", price: "189 / 259 Kč", hot: true },
    { name: "Bacon Tortilla", desc: "salát | hovězí maso | cibule | rajče | okurka | slanina | dip", price: "189 / 259 Kč" },
    { name: "Double Cheese Tortilla", desc: "salát | hovězí maso | dip | dvojitá slanina | dvojitý cheddar", price: "199 / 269 Kč" },
    { name: "Blue Tortilla", desc: "salát | hovězí maso | blue cheese | dip | cibulka | slanina", price: "209 / 279 Kč" },
    { name: "Pulled Pork Tortilla", desc: "trhané vepřové maso | cibulka | cheddar | salát", price: "189 / 259 Kč" },
  ],
  sides: [
    { name: "Hrancle s trhaným masem", desc: "hranolky | trhané vepřové maso | okurka | cibule | cheddarová omáčka (možné i ve spicy verzi)", price: "199 Kč" },
    { name: "Hrancle se slaninou a cheddarem", desc: "", price: "139 Kč" },
    { name: "Hrancle", desc: "", price: "59 Kč" },
    { name: "Cheddarové uhlí (5 ks)", desc: "", price: "75 Kč" },
    { name: "Cibuláky (8 ks)", desc: "", price: "69 Kč" },
    { name: "BBQ Hot Wings", desc: "7 ks pikantních křidýlek v kukuřičné krustě", price: "199 / 269 Kč" },
    { name: "Chicken Strips", desc: "6 ks + 2× dip", price: "199 / 269 Kč" },
  ],
  omacky: [
    { name: "Kečup", desc: "", price: "20 Kč", color: "#c0392b" },
    { name: "Hořčice", desc: "", price: "20 Kč", color: "#e6b800" },
    { name: "Chilli dip", desc: "", price: "25 Kč", color: "#e84118", hot: true },
    { name: "BBQ dip", desc: "", price: "25 Kč", color: "#6b3a1f" },
    { name: "Pepřový dip", desc: "", price: "25 Kč", color: "#444" },
    { name: "Mayo", desc: "", price: "20 Kč", color: "#f5e6c8" },
  ],
};

export default function Menu() {
  const [active, setActive] = useState("burgery");
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
          <p className="text-center text-white/50 text-sm mb-8 uppercase tracking-widest">Menu +70 Kč</p>
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
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${active === "omacky" ? "max-w-md mx-auto" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {items.map((item, i) => (
              <motion.div
                key={item.name}
                className="flex gap-4 items-start group"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
              >
                {/* Photo / color blob */}
                {item.color ? (
                  <div
                    className="w-28 h-28 flex-shrink-0 rounded-xl flex items-center justify-center overflow-hidden relative"
                    style={{ background: item.color }}
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
                      <Image src="/burger.png" alt={item.name} fill sizes="112px" className="object-cover" />
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
                <div className="flex flex-col justify-between h-28">
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
            Cena včetně obalového materiálu &nbsp;·&nbsp; cena single / menu<br />
            *menu – majonéza, hranolky, nápoj, burger
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
