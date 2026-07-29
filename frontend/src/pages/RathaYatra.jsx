import React from "react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";

const CHARIOTS = [
  {
    name: "Nandighoṣa",
    lord: "Śrī Jagannātha",
    color: "Yellow & Red",
    wheels: "16",
    height: "45 ft",
    horses: "4 white",
    charioteer: "Dāruka",
    flag: "Trailokyamohinī",
  },
  {
    name: "Tāladhwaja",
    lord: "Śrī Balabhadra",
    color: "Blue & Red",
    wheels: "14",
    height: "44 ft",
    horses: "4 black",
    charioteer: "Mātali",
    flag: "Uṇāni",
  },
  {
    name: "Darpadalana",
    lord: "Devī Subhadrā",
    color: "Black & Red",
    wheels: "12",
    height: "43 ft",
    horses: "4 reddish",
    charioteer: "Arjuna",
    flag: "Nadambika",
  },
];

const YATRA_TIMELINE = [
  { d: "Snāna Yātrā", n: "Jyeṣṭha Pūrṇimā — the deities are bathed with 108 pots of scented water; they then fall 'ill' and go into isolation (Anavasara)." },
  { d: "Netrotsava", n: "Āṣāḍha Amāvāsyā — the eye-festival: after painting, the deities are once again revealed to devotees." },
  { d: "Gundicā Mārjana", n: "The day before Ratha Yātrā — the Gundicā temple is cleaned by devotees; Śrī Caitanya famously led this seva every year." },
  { d: "Ratha Yātrā", n: "Āṣāḍha Śukla Dwitīya — the three chariots begin their journey to Gundicā Ghar." },
  { d: "Herā Pañcamī", n: "The fifth day — Lakṣmī, missing Her Lord, comes in search and reprimands Him." },
  { d: "Bahudā Yātrā", n: "The return of the deities from Gundicā to the Śrī Mandir." },
  { d: "Suna Bēsha", n: "The golden dress — the deities are adorned with 208 kg of gold ornaments." },
  { d: "Nīladri Bije", n: "The final return into the sanctum; the Lord bribes Lakṣmī with rasagollā." },
];

const RATHA_IMAGES = [
  "https://images.pexels.com/photos/17349035/pexels-photo-17349035.jpeg?auto=format&fit=crop&q=85&w=1200",
  "https://images.unsplash.com/photo-1784177542889-49bc95213140?auto=format&fit=crop&q=85&w=1200",
  "https://images.unsplash.com/photo-1577649428994-a41a39ff862c?auto=format&fit=crop&q=85&w=1200",
  "https://images.unsplash.com/photo-1577649428176-212243cd0655?auto=format&fit=crop&q=85&w=1200",
];

export default function RathaYatra() {
  return (
    <>
      <PageHeader
        chapter="II"
        eyebrow="Ratha Yātrā · The Chariot Festival"
        titleLines={["When the Lord", "walks the road."]}
        subtitle="Once every year in Āṣāḍha, three enormous chariots are pulled by hand through the Grand Road of Purī. Kings sweep the path. The Lord comes out to be seen by everyone."
        image="https://images.unsplash.com/photo-1784177542889-49bc95213140?auto=format&fit=crop&q=85&w=1200"
      />

      {/* Chariots */}
      <section className="py-24 md:py-32 border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-14 max-w-3xl">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">The Three Chariots</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              Built anew every year,<br /><span className="italic">from thousands of pieces of wood.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800 border border-stone-800">
            {CHARIOTS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1} className="bg-stone-950 p-8">
                <p className="chapter-num text-4xl mb-4">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-serif-display text-3xl md:text-4xl tracking-tight mb-2">{c.name}</h3>
                <p className="text-[13px] uppercase tracking-eyebrow text-[#D4AF37] mb-6">{c.lord}</p>
                <dl className="space-y-2 text-[14px] text-stone-300">
                  {[["Colour", c.color], ["Wheels", c.wheels], ["Height", c.height], ["Horses", c.horses], ["Charioteer", c.charioteer], ["Flag", c.flag]].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-stone-800/60 pb-2">
                      <dt className="text-stone-500">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo band */}
      <section className="py-16 border-b border-stone-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {RATHA_IMAGES.map((src, i) => (
            <Reveal key={src} delay={i * 0.06}>
              <div className="aspect-[3/4] overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-14 max-w-3xl">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">The Yātrā Calendar</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              A twelve-day festival<br /><span className="italic">across the fortnight of Āṣāḍha.</span>
            </h2>
          </Reveal>
          <ol className="border-l border-stone-800 pl-8 md:pl-12 space-y-10">
            {YATRA_TIMELINE.map((t, i) => (
              <Reveal key={t.d} delay={i * 0.04}>
                <li className="relative">
                  <span className="absolute -left-[42px] md:-left-[54px] top-2 w-3 h-3 bg-[#D4AF37] rotate-45" />
                  <h4 className="font-serif-display text-2xl md:text-3xl tracking-tight mb-2">{t.d}</h4>
                  <p className="text-stone-300 text-[16px] leading-relaxed max-w-2xl">{t.n}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
