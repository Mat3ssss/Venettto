export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-5 px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} VENETTO BURGER. Všechna práva vyhrazena.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-white/30 text-xs">Web vytvořili</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/tensioncreative.svg" alt="Tension Creative" className="h-5 w-auto opacity-40" />
        </div>
      </div>
    </footer>
  );
}
