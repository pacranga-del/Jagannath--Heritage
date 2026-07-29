import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HERO_LINES, HERO_SUB, MARQUEE_TEXT } from "../lib/content";
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
            className="font-serif-display text-[56px] sm:text-[88px] md:text-[124px] lg:text-[164px] leading-[1.05] tracking-[-0.02em] pt-2"
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

      {/* PAGE DIRECTORY — every section is now its own page */}
      <section data-testid="home-directory" className="relative py-24 md:py-32 border-b border-stone-800 glow-gold">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-14 md:mb-20 max-w-3xl">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-6">The Archive · Twelve pages</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.05] tracking-tight pt-2">
              <StaggerWords text="Every section is its own page — choose your path." />
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-800 border border-stone-800">
            {[
              { num: "01", to: "/about", kicker: "The Trust", title: "About", body: "A vow to preserve, teach and serve. The six chapters of our work.", img: "https://images.unsplash.com/photo-1722404348790-85bf847dd863?auto=format&fit=crop&q=85&w=800" },
              { num: "02", to: "/temple", kicker: "Nīlācala · Purī", title: "Temple", body: "History, kṣetra purāṇam, daily sevās, kings and bhaktas.", img: "https://images.pexels.com/photos/31969428/pexels-photo-31969428.jpeg?auto=format&fit=crop&q=85&w=800" },
              { num: "03", to: "/ratha-yatra", kicker: "The Chariot Festival", title: "Ratha Yātrā", body: "Three chariots, the Grand Road, and a twelve-day yātrā calendar.", img: "https://images.pexels.com/photos/17349035/pexels-photo-17349035.jpeg?auto=format&fit=crop&q=85&w=800" },
              { num: "04", to: "/gita-govinda", kicker: "Jayadeva", title: "Gīta Govinda", body: "Twenty-four ashṭapadis — love-songs sung every evening at Purī.", img: "https://images.unsplash.com/photo-1713986719526-8c44918a9688?auto=format&fit=crop&q=85&w=800" },
              { num: "05", to: "/jagannathastakam", kicker: "Ādi Śaṅkarācārya", title: "Ashṭakam", body: "Eight verses composed by Śaṅkara — jagannāthaḥ svāmī nayanapathagāmī bhavatu me.", img: "https://images.unsplash.com/photo-1667506420529-b9f71a103ef9?auto=format&fit=crop&q=85&w=800" },
              { num: "06", to: "/gaudiya", kicker: "Caitanya · Nityānanda · Six Gosvāmīs", title: "Gauḍīya", body: "Five centuries of ecstatic bhakti flowing through Purī and Vṛndāvana.", img: "https://images.pexels.com/photos/37804098/pexels-photo-37804098.jpeg?auto=format&fit=crop&q=85&w=800" },
              { num: "07", to: "/vedanta", kicker: "Vedānta · Āgama", title: "Sampradāya", body: "Advaita, Viśiṣṭādvaita, Dvaita — and the temple sciences of Pāñcarātra & Vaikhānasa.", img: "https://images.pexels.com/photos/34717652/pexels-photo-34717652.jpeg?auto=format&fit=crop&q=85&w=800" },
              { num: "08", to: "/acharyas", kicker: "Rāmānuja · Deśika · Āzhvārs", title: "Ācāryas", body: "Two great teachers of the Śrī Vaiṣṇava tradition, and the twelve poet-saints.", img: "https://images.unsplash.com/photo-1714248376481-f3e37e023ec8?auto=format&fit=crop&q=85&w=800" },
              { num: "09", to: "/nityanushtanam", kicker: "The Householder's Book", title: "Nityānusthānam", body: "Sandhyāvandanam, Yajñopavīta, Tarpaṇam, Śrāddham — with mantras.", img: "https://images.unsplash.com/photo-1666694051761-cd972857da30?auto=format&fit=crop&q=85&w=800" },
              { num: "10", to: "/gallery", kicker: "Darśana", title: "Gallery", body: "Rath Yatra, daily darśana, charitable seva and festivals — in photographs.", img: "https://images.unsplash.com/photo-1701453344115-e4616d4844d9?auto=format&fit=crop&q=85&w=800" },
              { num: "11", to: "/marketplace", kicker: "Ritual Essentials", title: "Marketplace", body: "Poonal, vibhūti, thiruman, pavithram and dharbai — ordered by WhatsApp.", img: "https://images.pexels.com/photos/31317668/pexels-photo-31317668.jpeg?auto=format&fit=crop&q=85&w=800" },
              { num: "12", to: "/contact", kicker: "Write to the Trust", title: "Contact", body: "Reach the Managing Trustee. Offer seva, share a photograph, ask a question.", img: "https://images.pexels.com/photos/32299890/pexels-photo-32299890.jpeg?auto=format&fit=crop&q=85&w=800" },
            ].map((card, i) => (
              <Reveal key={card.to} delay={(i % 6) * 0.05}>
                <Link
                  to={card.to}
                  data-testid={`home-directory-${card.to.replace(/\//g, "")}`}
                  className="group relative flex flex-col justify-between h-full min-h-[300px] p-7 md:p-8 bg-stone-950 hover:bg-stone-900 transition-colors overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-[0.12] group-hover:opacity-25 transition-opacity">
                    <img src={card.img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
                  </div>
                  <div className="relative">
                    <div className="flex items-baseline justify-between mb-6">
                      <p className="chapter-num text-4xl md:text-5xl">{card.num}</p>
                      <ArrowUpRight size={16} className="text-stone-500 group-hover:text-[#D4AF37] group-hover:rotate-45 transition-all" />
                    </div>
                    <p className="text-[10px] uppercase tracking-eyebrow text-stone-400 mb-2">{card.kicker}</p>
                    <h3 className="font-serif-display text-3xl md:text-4xl leading-tight tracking-tight text-stone-50">
                      {card.title}
                    </h3>
                  </div>
                  <p className="relative mt-6 text-stone-300 text-[14px] leading-relaxed">
                    {card.body}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32">
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
          <h3 className="font-serif-display text-4xl md:text-6xl leading-[1.05] tracking-tight pt-2">
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
