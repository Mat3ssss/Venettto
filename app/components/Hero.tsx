"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const [showCall, setShowCall] = useState(false);

  return (
    <>
      <section id="domu" className="relative flex-1 flex flex-col items-center justify-center min-h-screen overflow-hidden" aria-label="Venetto Burger úvod">
        {/* Zámek background — bottom aligned */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mkkostel.svg" alt="" className="w-1/2 h-auto object-contain invert" />
        </motion.div>


{/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
          {/* Subtitle — from top */}
          <motion.p
            className="uppercase tracking-[0.4em] text-white text-2xl font-medium"
            style={{ fontFamily: "var(--font-dripping-marker)" }}
            initial={{ opacity: 0, y: -32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            Mestec Kralove
          </motion.p>

          {/* Main title — from left, big */}
          <motion.h1
            className="text-[5rem] md:text-[12rem] leading-none text-white uppercase"
            style={{ fontFamily: "var(--font-dripping-marker)" }}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Venetto
          </motion.h1>

          {/* Phone CTA — fade up */}
          <motion.button
            onClick={() => setShowCall(true)}
            className="mt-2 cursor-pointer"
            aria-label="Zavolat na číslo 731 041 616"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="/cislo2svg.svg" alt="731 041 616" width={200} height={60} className="object-contain" priority />
          </motion.button>
        </div>
      </section>

      {/* Call modal */}
      <AnimatePresence>
        {showCall && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center pb-10 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCall(false)}
          >
            {/* Backdrop blur */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sheet */}
            <motion.div
              className="relative w-full max-w-sm rounded-3xl overflow-hidden"
              style={{ background: "rgba(20,20,20,0.95)", border: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center gap-5 p-7">
                <div className="w-10 h-1 rounded-full bg-white/20" />
                <p className="text-white/50 text-sm uppercase tracking-widest">Kontakt</p>
                <p className="text-white text-2xl font-semibold tracking-wide">+420 731 041 616</p>

                <motion.a
                  href="tel:+420731041616"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-black font-bold text-lg"
                  style={{ background: "white" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.1a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
                  </svg>
                  Zavolat
                </motion.a>

                <button
                  onClick={() => setShowCall(false)}
                  className="text-white/40 text-sm hover:text-white/70 transition-colors"
                >
                  Zrušit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
