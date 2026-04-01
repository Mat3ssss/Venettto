"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Rozvoz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rozvoz" className="scroll-mt-24 flex flex-col md:flex-row min-h-[300px]">
      {/* Left — info slides from left */}
      <div className="flex-1 bg-white px-10 py-8 flex flex-col gap-6 relative overflow-hidden">
        {/* Scooter — přijede zleva a zabrzdí */}
        <motion.img
          ref={ref}
          src="/skutrskutrskutr.svg"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-4 w-96 opacity-30 pointer-events-none select-none"
          initial={{ x: "-120%", rotate: -5 }}
          animate={inView ? { x: 0, rotate: 0 } : { x: "-120%", rotate: -5 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 12,
            mass: 1.2,
            delay: 0.3,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/rozvoz.svg" alt="Rozvoz" className="max-h-36 w-auto relative z-10" />
        <p className="text-black font-black text-4xl tracking-tight relative z-10">607 741 803</p>
        <div className="flex flex-col sm:flex-row gap-10 relative z-10">
          <div>
            <p className="text-black font-black uppercase text-sm tracking-widest">Městec Králové</p>
            <p className="text-black/50 text-sm mt-1">při objednávce do 300 Kč - 20 Kč</p>
          </div>
          <div>
            <p className="text-black font-black uppercase text-sm tracking-widest">Mimo město</p>
            <p className="text-black/50 text-sm mt-1">Do 10 KM (6,- / km)</p>
          </div>
        </div>
      </div>

      {/* Right — map slides from right */}
      <div className="flex-1 min-h-[280px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.7026527141247!2d15.492245200000003!3d50.2414597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c2188859b8227%3A0x61cff8ac82475312!2sVenetto%20Burger!5e0!3m2!1sen!2scz!4v1774102330536!5m2!1sen!2scz"
          title="Venetto Burger na mapě"
          className="absolute inset-0 w-full h-full border-0 grayscale"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>
    </section>
  );
}
