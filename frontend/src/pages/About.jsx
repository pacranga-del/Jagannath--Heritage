import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Reveal, StaggerWords } from "../components/Reveal";
import { CHAPTERS } from "../lib/content";

export default function About() {
  return (
    <>
      <PageHeader
        chapter="0"
        eyebrow="About · The Trust"
        titleLines={["A vow, a lineage,", "a small circle of seva."]}
        subtitle="Shri Puri Jagannath Religious and Charitable Trust exists to keep the fire of Sanātana Dharma alive — through study, ritual, feeding, and the patient work of remembering. What we remember, and how we remember it, is set out in six chapters."
        image="https://images.unsplash.com/photo-1722404348790-85bf847dd863?auto=format&fit=crop&q=85&w=1200"
      />

      {/* Chapters */}
      <section data-testid="about-chapters" className="relative py-24 md:py-40 border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-16 md:mb-24 max-w-3xl">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-6">Six chapters</p>
            <h2 className="font-serif-display text-5xl md:text-7xl leading-[1.02] tracking-tight pt-2">
              <StaggerWords text="What this Trust remembers, and how we remember it." />
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24 gap-x-8">
            {CHAPTERS.map((c, i) => (
              <React.Fragment key={c.num}>
                <Reveal delay={0.05} className={`md:col-span-2 ${i % 2 === 1 ? "md:col-start-2" : ""}`}>
                  <p className="chapter-num text-[96px] md:text-[128px] leading-none">
                    {c.num}
                  </p>
                </Reveal>
                <Reveal delay={0.15} className={`md:col-span-6 ${i % 2 === 1 ? "md:col-start-6" : ""}`}>
                  <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-4">
                    {c.kicker}
                  </p>
                  <h3 className="font-serif-display text-3xl md:text-5xl leading-[1.08] tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-6 text-stone-300 text-[16px] md:text-[17px] leading-[1.75] max-w-xl">
                    {c.body}
                  </p>
                </Reveal>
                <div className={`md:col-span-3 ${i % 2 === 1 ? "md:col-start-12" : "md:col-start-10"} hidden md:flex items-end`}>
                  <div className="w-full rule" />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Ashtakam block */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.pexels.com/photos/31969419/pexels-photo-31969419.jpeg?auto=format&fit=crop&q=85&w=1800"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/60" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
          <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-8">
            Śrī Jagannātha Ashṭakam · Verse 1
          </p>
          <p className="sloka text-2xl md:text-4xl mb-8 leading-[1.9]">
            कदाचित् कालिन्दी तट विपिन सङ्गीत तरलो<br />
            मुदाभीरी नारी वदन कमलास्वाद मधुपः ।<br />
            रमा शम्भु ब्रह्मामर पति गणेशार्चित पदो<br />
            जगन्नाथः स्वामी नयनपथगामी भवतु मे ॥
          </p>
          <p className="font-serif-display italic text-stone-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            "May that Lord Jagannātha, whose feet are worshipped by Lakṣmī, Śiva, Brahmā, Indra and Gaṇeśa — may He become the object of my vision."
          </p>
          <Link
            to="/jagannathastakam"
            data-testid="about-ashtakam-cta"
            className="mt-12 inline-block text-[12px] uppercase tracking-eyebrow text-[#D4AF37] link-underline"
          >
            Read all eight verses →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 border-t border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-8">
            <Reveal>
              <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.05] tracking-tight pt-2">
                Come, be part of a<br />
                <span className="italic text-[#D4AF37]">living tradition.</span>
              </h2>
              <p className="mt-6 text-stone-300 max-w-xl text-lg leading-relaxed">
                Share a photograph, ask a question, offer seva. Reach the Managing Trustee directly.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Reveal delay={0.1}>
              <Link
                to="/contact"
                data-testid="about-contact-cta"
                className="inline-flex items-center gap-3 px-8 py-4 border border-[#D4AF37] text-[#D4AF37] text-[13px] uppercase tracking-eyebrow font-medium hover:bg-[#D4AF37] hover:text-stone-950 transition-colors"
              >
                Write to the Trust <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
