"use client";

export default function CallModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col items-center gap-5 w-72"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-white/40 text-xs uppercase tracking-widest">Zavolat</p>
        <p className="font-black text-white text-3xl tracking-tight">607 741 803</p>
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 border border-white/15 text-white/40 font-bold uppercase text-xs tracking-widest py-3 hover:border-white/30 transition-colors"
          >
            Zrušit
          </button>
          <a
            href="tel:+420607741803"
            className="flex-1 bg-white text-black font-black uppercase text-xs tracking-widest py-3 text-center hover:bg-white/80 transition-colors"
          >
            Zavolat
          </a>
        </div>
      </div>
    </div>
  );
}
