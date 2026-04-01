"use client";

import Image from "next/image";
import { useState } from "react";

const navItems = [
  { label: "Domu", hash: "domu" },
  { label: "Menu", hash: "menu" },
  { label: "Rozvoz", hash: "rozvoz" },
  { label: "Objednávka", hash: "objednavka" },
  { label: "Tým", hash: "hledame" },
  { label: "Kontakt", hash: "kontakt" },
];

function IconInstagram() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function scrollTo(hash: string) {
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(hash, { offset: -80 });
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full px-8 py-5 flex items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-md">
      <Image src="/logo.png" alt="Venetto Burger" width={80} height={80} priority />

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-10 items-center">
        {navItems.map(({ label, hash }) => (
          <a
            key={hash}
            href={`#${hash}`}
            onClick={(e) => { e.preventDefault(); scrollTo(`#${hash}`); }}
            className="text-white font-bold uppercase tracking-widest text-sm hover:text-white/60 transition-colors relative"
          >
            {label}
            {hash === "hledame" && (
              <span className="absolute -top-1.5 -right-3 flex items-center justify-center">
                <span className="absolute inline-flex w-2 h-2 rounded-full bg-white opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-white" />
              </span>
            )}
          </a>
        ))}

        {/* Social icons */}
        <div className="flex gap-4 ml-4 border-l border-white/20 pl-6">
          <a
            href="https://www.instagram.com/venettoburger/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/60 transition-colors"
            aria-label="Instagram"
          >
            <IconInstagram />
          </a>
          <a
            href="https://www.facebook.com/venettoburgers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/60 transition-colors"
            aria-label="Facebook"
          >
            <IconFacebook />
          </a>
        </div>
      </nav>

      {/* Hamburger button */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <nav className="absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 flex flex-col items-center gap-6 py-8 md:hidden">
          {navItems.map(({ label, hash }) => (
            <a
              key={hash}
              href={`#${hash}`}
              onClick={(e) => { e.preventDefault(); scrollTo(`#${hash}`); setOpen(false); }}
              className="text-white font-bold uppercase tracking-widest text-sm hover:text-white/60 transition-colors relative"
            >
              {label}
              {hash === "hledame" && (
                <span className="absolute -top-1.5 -right-3 flex items-center justify-center">
                  <span className="absolute inline-flex w-2 h-2 rounded-full bg-white opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-white" />
                </span>
              )}
            </a>
          ))}
          {/* Social icons mobile */}
          <div className="flex gap-6 pt-2 border-t border-white/10 w-full justify-center">
            <a href="https://www.instagram.com/venettoburger/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/60 transition-colors" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href="https://www.facebook.com/venettoburgers" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/60 transition-colors" aria-label="Facebook">
              <IconFacebook />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
