import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HotPicks from "./components/HotPicks";
import Menu from "./components/Menu";
import Rozvoz from "./components/Rozvoz";
import Objednavka from "./components/Objednavka";
import Recenze from "./components/Recenze";
import Gallery from "./components/Gallery";
import Brigada from "./components/Brigada";
import Kontakt from "./components/Kontakt";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <HotPicks />
      <Menu />
      <Rozvoz />
      <Recenze />
      <Gallery />
      <Objednavka />
      <Brigada />
      <Kontakt />
      <Footer />
    </main>
  );
}
