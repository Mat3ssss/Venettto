"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import FadeIn from "./FadeIn";
import CallModal from "./CallModal";

const pozice = [
  { target: 1, title: "Rozvoz jídel", note: "ŘP sk. B" },
  { target: 2, title: "Výpomoc v kuchyni", note: "" },
  { target: 3, title: "Pizzař", note: "" },
  { target: 4, title: "Grill", note: "burgery, tortilly apod." },
];

const cols = [
  {
    label: "Co tě čeká",
    items: ["Spolehlivost a chuť pracovat", "Základní komunikaci", "ŘP sk. B (u rozvozu)"],
  },
  {
    label: "Výhodou",
    items: ["Zkušenosti z gastronomie", "Orientace v kuchyni nebo rozvozu"],
  },
  {
    label: "Co nabízíme",
    items: ["Zaučení na pozici", "Flexibilní směny", "Přátelský kolektiv", "Férové ohodnocení", "Dlouhodobou spolupráci"],
  },
];

function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 600;
    const step = 16;
    const inc = target / (duration / step);
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span>{String(val).padStart(2, "0")}</span>;
}

export default function Brigada() {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });
  const [callModal, setCallModal] = useState(false);

  return (
    <>
    {callModal && <CallModal onClose={() => setCallModal(false)} />}
    <section id="hledame" className="bg-[#0a0a0a] text-white relative overflow-hidden scroll-mt-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/cary.svg" alt="" aria-hidden="true" className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-[0.04]" />

      <div className="max-w-6xl mx-auto px-8 md:px-14 py-12 md:py-16 relative z-10">

        {/* Top row */}
        <FadeIn direction="down" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-10 border-b border-white/10">
          <div>
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3">— Připoj se k nám · Městec Králové / Nový Bydžov</p>
            <h2 className="font-black uppercase leading-[0.88] text-5xl md:text-6xl lg:text-7xl">
              Hledáme<br />
              <span className="text-white/40" style={{ fontFamily: "var(--font-dripping-marker)", letterSpacing: "0.15em" }}>posily</span><br />
              do týmu
            </h2>
          </div>
          <button onClick={() => setCallModal(true)} className="group flex flex-col gap-1 md:text-right flex-shrink-0 cursor-pointer">
            <span className="text-white/30 text-xs uppercase tracking-widest">Máš zájem? Zavolej</span>
            <span className="font-black text-3xl group-hover:text-white/50 transition-colors">731 041 616</span>
          </button>
        </FadeIn>

        {/* Positions */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mb-10">
          {pozice.map((p, i) => (
            <div key={p.target} className="bg-[#0a0a0a] p-5 md:p-6 flex flex-col gap-2 relative overflow-hidden">
              <span className="font-black text-4xl leading-none select-none text-white/10">
                <CountUp target={p.target} inView={inView} />
              </span>
              <span className="font-black uppercase text-sm md:text-base leading-tight text-white">{p.title}</span>
              {p.note && <span className="text-white/30 text-xs">{p.note}</span>}
            </div>
          ))}
        </div>

        {/* Info columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cols.map((col) => (
            <FadeIn key={col.label} direction="up">
              <p className="font-black uppercase text-xs tracking-widest mb-4 pb-3 border-b border-white/10">{col.label}</p>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-white/50 text-sm">
                    <span className="text-white/20 mt-0.5 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
    </>
  );
}
