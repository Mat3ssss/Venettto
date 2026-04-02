"use client";

import Image from "next/image";

const topImages = [
  { src: "/burger1.jpg", alt: "Burger Venetto 1", style: { objectPosition: "center 65%" } },
  { src: "/burger2.jpeg", alt: "Burger Venetto 2", style: { objectPosition: "center center" } },
  { src: "/burger3.jpeg", alt: "Burger Venetto 3", style: { objectPosition: "center center" } },
  { src: "/burger4.jpeg", alt: "Burger Venetto 4", style: { objectPosition: "center 55%" } },
  { src: "/burger5.jpg", alt: "Burger Venetto 5", style: { objectPosition: "center center" } },
  { src: "/burger6.jpg", alt: "Burger Venetto 6", style: { objectPosition: "center center" } },
  { src: "/burger7.jpeg", alt: "Burger Venetto 7", style: { objectPosition: "center center" } },
  { src: "/martin.jpg", alt: "Tým Venetto Burger", style: { objectPosition: "center 20%" } },
];

const bottomImages = [
  { src: "/burger1.jpg", alt: "Burger Venetto 1", style: { objectPosition: "center 65%" } },
  { src: "/burger2.jpeg", alt: "Burger Venetto 2", style: { objectPosition: "center center" } },
  { src: "/burger3.jpeg", alt: "Burger Venetto 3", style: { objectPosition: "center center" } },
  { src: "/burger4.jpeg", alt: "Burger Venetto 4", style: { objectPosition: "center 55%" } },
  { src: "/burger5.jpg", alt: "Burger Venetto 5", style: { objectPosition: "center center" } },
  { src: "/burger6.jpg", alt: "Burger Venetto 6", style: { objectPosition: "center center" } },
  { src: "/burger7.jpeg", alt: "Burger Venetto 7", style: { objectPosition: "center center" } },
  { src: "/marekparek.png", alt: "Marek – Venetto Burger", style: { objectPosition: "center center" } },
  { src: "/mates.jpg", alt: "Mates – Venetto Burger", style: { objectPosition: "center center" } },
];

function MarqueeRow({ items, reverse = false }: { items: typeof topImages; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-4"
        style={{
          width: "max-content",
          animation: `${reverse ? "galleryMarqueeReverse" : "galleryMarquee"} 55s linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="w-[260px] h-48 md:w-[420px] md:h-72 flex-shrink-0 relative overflow-hidden">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="420px"
              className="object-cover"
              style={item.style}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section className="bg-[#0a0a0a] py-16 flex flex-col gap-4 overflow-hidden" aria-label="Galerie jídel">
      <style>{`
        @keyframes galleryMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes galleryMarqueeReverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
      <MarqueeRow items={topImages} />
      <MarqueeRow items={bottomImages} reverse />
    </section>
  );
}
