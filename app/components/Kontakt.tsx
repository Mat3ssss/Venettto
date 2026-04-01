import FadeIn from "./FadeIn";

const hodiny = [
  { den: "Pondělí", cas: "zavřeno" },
  { den: "Úterý", cas: "11:00 – 20:00" },
  { den: "Středa", cas: "11:00 – 20:00" },
  { den: "Čtvrtek", cas: "11:00 – 20:00" },
  { den: "Pátek", cas: "11:00 – 21:00" },
  { den: "Sobota", cas: "11:00 – 21:00" },
  { den: "Neděle", cas: "12:00 – 20:00" },
];

export default function Kontakt() {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-white pt-16 pb-10 px-8 overflow-hidden relative" aria-label="Kontakt a otevírací doba">

      {/* Zámek — absolutně vpravo dole */}
      <FadeIn direction="right" className="absolute bottom-0 right-0 w-[55%] pointer-events-none select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bydzovzamek.svg" alt="" aria-hidden="true" className="w-full object-contain opacity-[0.06] translate-y-16 invert" />
      </FadeIn>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Nadpis */}
        <FadeIn direction="down">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kontakt.svg" alt="Kontakt" className="h-24 mb-12" />
        </FadeIn>

        {/* Grid obsahu */}
        <div className="flex flex-col md:flex-row gap-10 items-start">

          {/* Otevírací doba */}
          <FadeIn direction="left" className="flex-1">
            <h2 className="font-black uppercase text-lg tracking-widest mb-6 text-black">Otevírací doba</h2>
            <div className="flex flex-col gap-2">
              {hodiny.map(({ den, cas }) => (
                <div key={den} className="flex justify-between gap-8 text-sm border-b border-black/10 pb-2">
                  <span className="text-black/70">{den}</span>
                  <span className={`font-bold ${cas === "zavřeno" ? "text-black/30" : "text-black"}`}>{cas}</span>
                </div>
              ))}
            </div>
            <p className="text-black/40 text-xs mt-4">Doba rozvozu je stejná jako otevírací doba prodejny.</p>
          </FadeIn>

          {/* Adresa */}
          <FadeIn direction="up" className="flex-1">
            <h2 className="font-black uppercase text-lg tracking-widest mb-6 text-black">Adresa</h2>
            <p className="text-black/70 text-sm leading-relaxed">
              Dukelská třída 1127<br />
              Nový Bydžov<br />
              504 01
            </p>
            <div className="mt-6">
              <p className="text-black/50 text-xs uppercase tracking-widest mb-1">objednávky na tel.:</p>
              <a href="tel:+420607741803" className="font-black text-xl text-black hover:text-black/60 transition-colors">
                607 741 803
              </a>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
