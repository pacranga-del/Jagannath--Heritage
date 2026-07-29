import React from "react";
import Marquee from "react-fast-marquee";

export default function EditorialMarquee({ text }) {
  const segments = text.split("·");
  return (
    <div
      data-testid="editorial-marquee"
      className="relative py-10 border-y border-stone-800 bg-stone-950 marquee-fade"
    >
      <Marquee gradient={false} speed={28} pauseOnHover>
        {segments.map((s, i) => (
          <span
            key={i}
            className="font-serif-display italic text-4xl md:text-6xl text-stone-100/85 mx-8"
          >
            {s.trim()}
            <span className="text-[#D4AF37] mx-8 not-italic">◆</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
