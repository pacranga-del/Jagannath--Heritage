import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HERO_LINES, HERO_SUB, CHAPTERS, MARQUEE_TEXT } from "../lib/content";
import { MaskedLines, Reveal, StaggerWords } from "../components/Reveal";
import EditorialMarquee from "../components/EditorialMarquee";

const HERO_IMG =
  "https://images.unsplash.com/photo-1750992459302-7c17ef2501e4?auto=format&fit=crop&q=85&w=1800";

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 160]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);

  return (
    <>
      {/* HERO */}
      <section
        data-testid="hero-section"
        className="relative h-[100svh] min-h-[720px] w-full overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img
            src={HERO_IMG}
            alt="Śrī Jagannātha darśana"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/70" />
          <div className="absolute inset-0 glow-vermilion pointer-events-none" />
        </motion.div>

        <div className="relative h-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-24 md:pb-32">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-8"
            data-testid="hero-eyebrow"
          >
            <span className="inline-block w-8 h-px bg-[#D4AF37] align-middle mr-4" />
            An archive of Sanātana Dharma · Est. under vow to Śrī Jagannātha
          </motion.p>

          <MaskedLines
            testId="hero-title"
            lines={HERO_LINES}
            className="font-serif-display text-[64px] sm:text-[96px] md:text-[132px] lg:text-[176px] leading-[0.92] tracking-[-0.02em]"
          />

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <Reveal delay={0.7} className="md:col-span-6">
              <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-xl">
                {HERO_SUB}
              </p>
            </Reveal>
            <Reveal delay={0.9} className="md:col-span-6 md:justify-self-end">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/temple"
                  data-testid="hero-cta-primary"
                  className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#D4AF37] text-stone-950 text-[13px] uppercase tracking-eyebrow font-medium hover:bg-[#e6c34f] transition-colors"
                >
                  Enter the Temple
                  <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                </Link>
                <Link
                  to="/gallery"
                  data-testid="hero-cta-secondary"
                  className="group inline-flex items-center gap-3 px-6 py-3.5 border border-stone-500 text-stone-100 text-[13px] uppercase tracking-eyebrow font-medium hover:border-stone-100 transition-colors"
                >
                  Darśana Gallery
                  <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-400 text-[10px] uppercase tracking-eyebrow flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-px h-8 bg-stone-500"
          />
        </motion.div>

        {/* Top-right sanskrit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 1.2, duration: 1.4 }}
          className="hidden md:block absolute top-32 right-10 max-w-xs text-right"
        >
          <p className="sloka text-lg leading-[1.9]">
            जगन्नाथः स्वामी<br />नयनपथगामी<br />भवतु मे
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-eyebrow text-stone-400 italic font-serif-display">
            — Ādi Śaṅkarācārya
          </p>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <EditorialMarquee text={MARQUEE_TEXT} />

      {/* CHAPTERS - manifesto */}
      <section data-testid="chapters-section" className="relative py-24 md:py-40 border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-16 md:mb-24 max-w-3xl">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-6">Six chapters</p>
            <h2 className="font-serif-display text-5xl md:text-7xl leading-[0.98] tracking-tight">
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
                  <h3 className="font-serif-display text-3xl md:text-5xl leading-[1.05] tracking-tight">
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

      {/* GITA GOVINDA FEATURE */}
      <FeatureBlock
        eyebrow="Gīta Govinda · Jayadeva"
        title={["Songs the Lord Himself", "is said to have edited."]}
        body="In the twelfth century, Jayadeva of Kenduli composed the Gīta Govinda — twenty-four ashṭapadis on the love of Rādhā and Kṛṣṇa. Every evening, they are still sung inside the sanctum at Purī."
        image="https://images.unsplash.com/photo-1713986719526-8c44918a9688?auto=format&fit=crop&q=85&w=1200"
        to="/gita-govinda"
        cta="Read the Ashṭapadis"
      />

      {/* RATHA YATRA FEATURE — reversed */}
      <FeatureBlock
        reversed
        eyebrow="Ratha Yātrā · The Chariot Festival"
        title={["When the Lord leaves", "His sanctum for us."]}
        body="Once a year, three enormous wooden chariots — Nandighoṣa, Tāladhwaja, and Darpadalana — carry Jagannātha, Balabhadra and Subhadrā down the Grand Road. Kings sweep the path. The world watches."
        image="https://images.pexels.com/photos/17349035/pexels-photo-17349035.jpeg?auto=format&fit=crop&q=85&w=1200"
        to="/ratha-yatra"
        cta="Enter the Yātrā"
      />

      {/* ACHARYAS block */}
      <FeatureBlock
        eyebrow="The Ācāryas · Rāmānuja · Vedānta Deśika · Āzhvārs"
        title={["A lineage of teachers,", "a philosophy of nearness."]}
        body="Advaita, Dvaita, Viśiṣṭādvaita — three ways of speaking about the same one. The Śrī Vaiṣṇava tradition of Rāmānuja resolves them through the doctrine of the qualified non-dual, and gives us the temple sciences of Pāñcarātra and Vaikhānasa."
        image="https://images.unsplash.com/photo-1714248376481-f3e37e023ec8?auto=format&fit=crop&q=85&w=1200"
        to="/acharyas"
        cta="Meet the Ācāryas"
      />

      {/* Handbook grid */}
      <section className="relative py-24 md:py-40 border-b border-stone-800 glow-gold">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-6">Nityānusthānam</p>
              <h2 className="font-serif-display text-5xl md:text-7xl leading-[0.98] tracking-tight">
                A handbook<br /><span className="italic">for the householder Vaiṣṇava.</span>
              </h2>
            </div>
            <div className="md:col-span-4">
              <p className="text-stone-300 text-[16px] leading-relaxed">
                Sandhyāvandanam. Yajñopavīta. Tarpaṇam. Śrāddham. The small rituals that quietly hold up a life. Learn to perform them yourself.
              </p>
              <Link
                to="/nityanushtanam"
                data-testid="handbook-cta"
                className="mt-6 inline-flex items-center gap-2 text-[#D4AF37] text-[13px] uppercase tracking-eyebrow link-underline"
              >
                Open the handbook <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-800 border border-stone-800">
            {[
              { t: "Sandhyāvandanam", d: "Thrice-daily upāsanā of Sūrya-nārāyaṇa. Full procedure and mantras." },
              { t: "Yajñopavīta Dhāraṇam", d: "The wearing and renewal of the sacred thread — with mantras." },
              { t: "Tarpaṇam", d: "Water-offerings to devatās, ṛṣis and pitṛs, and their occasions." },
              { t: "Śrāddham", d: "Rites for ancestors, month by month, with substitutions permitted." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.08} className="bg-stone-950 p-8 md:p-10 hover:bg-stone-900 transition-colors">
                <p className="chapter-num text-4xl mb-6">{String(i + 1).padStart(2, "0")}</p>
                <h4 className="font-serif-display text-2xl md:text-3xl mb-3 tracking-tight">{c.t}</h4>
                <p className="text-stone-400 text-[14px] leading-relaxed">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ashtakam quote block */}
      <section className="relative py-32 md:py-48 overflow-hidden">
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
            data-testid="ashtakam-cta"
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
              <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
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
                data-testid="home-contact-cta"
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

function FeatureBlock({ eyebrow, title, body, image, to, cta, reversed }) {
  return (
    <section className="relative py-24 md:py-32 border-b border-stone-800">
      <div className={`max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${reversed ? "lg:[direction:rtl]" : ""}`}>
        <Reveal className={`lg:col-span-6 ${reversed ? "lg:[direction:ltr]" : ""}`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img src={image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-stone-100/10" />
          </div>
        </Reveal>
        <Reveal delay={0.15} className={`lg:col-span-5 lg:col-start-8 ${reversed ? "lg:[direction:ltr] lg:col-start-2" : ""}`}>
          <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-6">{eyebrow}</p>
          <h3 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
            {title.map((l, i) => (
              <span key={i} className="block">{i === title.length - 1 ? <em className="italic text-stone-100">{l}</em> : l}</span>
            ))}
          </h3>
          <p className="mt-6 text-stone-300 text-[16px] md:text-[17px] leading-relaxed max-w-lg">{body}</p>
          <Link
            to={to}
            className="mt-8 inline-flex items-center gap-2 text-[#D4AF37] text-[12px] uppercase tracking-eyebrow link-underline"
          >
            {cta} <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
