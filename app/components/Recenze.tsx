"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeIn from "./FadeIn";

const reviews = [
  {
    text: "Výborná burgrárna. Hamburgery jsou chuťově dobre vyladene, porce obrovská. Hranolky krupave a chutné. Prostě prasečina na vecer.",
    stars: 5,
    author: "Petr Ječmínek",
  },
  {
    text: "Nejlepší burger v okolí. Doporučuji každému!",
    stars: 5,
    author: "Jana Nováková",
  },
  {
    text: "Skvělá obsluha, rychlý rozvoz a maso perfektně propečené.",
    stars: 5,
    author: "Tomáš Kratochvíl",
  },
];

export default function Recenze() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  };
  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % reviews.length);
  };

  const review = reviews[index];

  return (
    <section id="recenze" className="scroll-mt-24 bg-[#0a0a0a] py-12 md:py-24 px-6" aria-label="Zákaznické recenze">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-12 text-center">

        <FadeIn direction="down">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/recenze.svg" alt="Recenze" className="max-h-20 md:max-h-36 w-auto mx-auto" />
        </FadeIn>

        <FadeIn className="w-full">
          <div className="relative flex items-center justify-center gap-6">

            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Předchozí recenze"
              className="opacity-40 hover:opacity-100 transition-opacity flex-shrink-0 w-10 flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sipka.svg" alt="" className="w-10 h-10 rotate-180" />
            </button>

            {/* Review card */}
            <div className="flex flex-col items-center gap-4 flex-1 overflow-hidden">

              {/* Fixed height container — žádný layout shift */}
              <div className="relative w-full h-[180px] md:h-[200px] overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={{
                      enter: (dir: number) => ({ opacity: 0, x: dir * 80, scale: 0.96 }),
                      center: { opacity: 1, x: 0, scale: 1 },
                      exit: (dir: number) => ({ opacity: 0, x: dir * -80, scale: 0.96 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      opacity: { duration: 0.45, ease: "easeInOut" },
                      x: { type: "spring", stiffness: 260, damping: 32, mass: 1 },
                      scale: { duration: 0.45, ease: "easeInOut" },
                    }}
                    className="absolute inset-0 flex items-center justify-center px-4 md:px-10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/caramara.svg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none" />
                    <p className="relative text-white text-base md:text-lg leading-snug max-w-2xl z-10">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-base md:text-lg">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* Author */}
              <p className="text-white/50 text-sm italic">{review.author}</p>

              {/* Dots */}
              <div className="flex gap-2" role="tablist" aria-label="Recenze">
                {reviews.map((r, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Recenze od ${r.author}`}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === index ? "bg-white" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Další recenze"
              className="opacity-40 hover:opacity-100 transition-opacity flex-shrink-0 w-10 flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sipka.svg" alt="" className="w-10 h-10" />
            </button>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
