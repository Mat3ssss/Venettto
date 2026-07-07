"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const items = [
  { name: "Double Cheese & Bacon", price: "269,-", desc: "bulka | salát | hovězí maso | pepřová mayo | double slanina | double cheddar", img: "/hotpicture.png" },
  { name: "Kuřecí Pizza", price: "230,-", desc: "smetana | sýr | šunka | kuřecí maso | špenát | česnek", img: "/kure.jpeg" },
  { name: "Slider", price: "129,-", desc: "speciální bulka | 80 g masa | kečup | hořčice | cibule | okurka", img: "/hotpicture.png" },
];

export default function HotPicks() {
  return (
    <section id="hotpicks" className="py-20 px-6 bg-white text-black relative overflow-hidden" aria-label="Hot Picks Týdne">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/cary.svg" alt="" aria-hidden="true" className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-5 invert" />
      {/* Heading — from top */}
      <FadeIn direction="down" className="text-center mb-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hot1.svg" alt="Hot Picks Týdne" className="mx-auto max-h-36 w-auto" />
      </FadeIn>

      {/* Cards grid — staggered from bottom */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            className="flex sm:flex-col gap-4"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px 0px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Photo */}
            <div className="relative w-28 h-28 sm:w-full sm:h-auto flex-shrink-0 overflow-hidden sm:[aspect-ratio:968/1256]">
              <Image src={item.img} alt={item.name} fill sizes="(max-width: 640px) 112px, 33vw" className="object-cover" />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center sm:block">
              <span className="block font-black uppercase text-base sm:text-xl leading-tight sm:min-h-[3.5rem]">{item.name}</span>
              <span className="block text-3xl sm:text-5xl leading-none mt-0.5" style={{ fontFamily: "var(--font-dripping-marker)" }}>{item.price}</span>
              <p className="text-xs sm:text-sm text-black/60 mt-1">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
