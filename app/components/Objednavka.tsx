"use client";

import { useState } from "react";
import { useActionState } from "react";
import { sendObjednavka, type ObjednavkaState } from "../actions/sendObjednavka";
import CallModal from "./CallModal";

const inputClass =
  "w-full bg-transparent border-b border-black/20 text-black text-sm py-3 outline-none focus:border-black transition-colors placeholder:text-black/25";

export default function Objednavka() {
  const [state, action, pending] = useActionState<ObjednavkaState, FormData>(
    sendObjednavka,
    null
  );
  const [callModal, setCallModal] = useState(false);

  return (
    <>
    {callModal && <CallModal onClose={() => setCallModal(false)} />}
    <section id="objednavka" className="bg-white relative overflow-hidden scroll-mt-24">
      <div className="max-w-4xl mx-auto px-8 md:px-14 py-8 md:py-10 relative z-10">

        {/* Centered heading */}
        <div className="text-center mb-7">
          <p className="text-black/30 text-xs uppercase tracking-[0.3em] mb-4">— Kontaktujte nás</p>
          <h2 className="font-black uppercase text-black leading-[0.88] text-4xl md:text-5xl lg:text-6xl mb-2">
            Dotaz
          </h2>
          <div className="text-3xl md:text-4xl lg:text-5xl text-black/30 mb-4" style={{ fontFamily: "var(--font-dripping-marker)", letterSpacing: "0.05em" }}>
            / Reklamace
          </div>
          <p className="text-black/40 text-sm max-w-sm mx-auto leading-relaxed mt-2">
            Máte dotaz nebo problém s objednávkou? Napište nám.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-12 bg-black/10" />
            <button onClick={() => setCallModal(true)} className="font-black text-lg text-black hover:text-black/50 transition-colors cursor-pointer">
              731 041 616
            </button>
            <div className="h-px w-12 bg-black/10" />
          </div>
        </div>

        {/* Form */}
        {state?.success ? (
          <div className="border-l-2 border-black pl-6 py-4 max-w-md mx-auto">
            <p className="text-black font-black text-xl uppercase tracking-widest mb-2">Odesláno ✓</p>
            <p className="text-black/50 text-sm">{state.message}</p>
          </div>
        ) : (
          <form action={action} className="flex flex-col gap-5">
            {state?.success === false && (
              <p className="text-red-500 text-xs uppercase tracking-widest border-l-2 border-red-500 pl-3">{state.message}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-black/30 text-xs uppercase tracking-[0.2em]">Jméno *</label>
                <input name="jmeno" type="text" required placeholder="Jan Novák" className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-black/30 text-xs uppercase tracking-[0.2em]">Telefon *</label>
                <input name="telefon" type="tel" required placeholder="731 041 616" className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black/30 text-xs uppercase tracking-[0.2em]">E-mail *</label>
              <input name="email" type="email" required placeholder="jan@example.cz" className={inputClass} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black/30 text-xs uppercase tracking-[0.2em]">Zpráva *</label>
              <textarea
                name="poznamka"
                required
                rows={3}
                placeholder="Napište váš dotaz nebo popište problém s objednávkou..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex justify-center pt-0">
              <button
                type="submit"
                disabled={pending}
                className="group bg-black text-white font-black uppercase tracking-widest text-sm px-12 py-4 hover:bg-black/80 transition-colors disabled:opacity-40 flex items-center gap-3"
              >
                {pending ? "Odesílám..." : "Odeslat"}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sipka.svg" alt="" aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
    </>
  );
}
