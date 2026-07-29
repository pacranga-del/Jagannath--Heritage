import React from "react";
import { Reveal, MaskedLines } from "./Reveal";

// Reusable editorial header for interior pages
export default function PageHeader({ eyebrow, titleLines, subtitle, image, imageAlt = "", chapter }) {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 border-b border-stone-800 glow-gold">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7">
          {chapter && (
            <p className="chapter-num text-[80px] md:text-[120px] leading-none mb-4">
              {chapter}
            </p>
          )}
          {eyebrow && (
            <p data-testid="page-eyebrow" className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-6">
              {eyebrow}
            </p>
          )}
          <MaskedLines
            testId="page-title"
            lines={titleLines}
            className="font-serif-display text-5xl md:text-7xl lg:text-[92px] leading-[0.98] tracking-tight text-stone-50"
          />
          {subtitle && (
            <Reveal delay={0.35}>
              <p className="mt-8 max-w-2xl text-stone-300 text-lg md:text-xl leading-relaxed">
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>

        {image && (
          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-stone-100/10" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
