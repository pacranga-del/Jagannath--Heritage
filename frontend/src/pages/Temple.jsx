import React from "react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";

const RITUALS = [
  { time: "Dawn", name: "Dwāradāṇā & Mangala Ārati", note: "The doors open before daybreak; the first vision of the Lord." },
  { time: "Morning", name: "Mailam & Abakāsha", note: "Fresh clothing and the Lord's morning toilette." },
  { time: "Late Morning", name: "Gopāla Ballabha & Sakāla Dhūpa", note: "Breakfast of curd, chipped rice, sweetened yogurt; then the mid-morning bhoga." },
  { time: "Midday", name: "Madhyāhna Dhūpa & Mahā Prasāda", note: "The great offering — 56 preparations of the Chappana Bhoga." },
  { time: "Afternoon", name: "Madhyāhna Pahuḍa", note: "The Lord rests. The temple is quieter." },
  { time: "Evening", name: "Sandhyā Ārati & Sandhyā Dhūpa", note: "Lamps rise, ashṭapadis are sung." },
  { time: "Night", name: "Bada Śṛṅgāra & Pahuḍa", note: "The night dress; the Lord retires." },
];

const KINGS = [
  { name: "Indradyumna", period: "Legendary", note: "The Mālava king to whom the daru-brahma was first revealed; the first temple is attributed to him in the Skanda Purāṇa." },
  { name: "Yayāti Keśari", period: "9th c.", note: "The Somavaṃśī king who is said to have restored the shrine after Muslim invasions of the Mādala Pañjī." },
  { name: "Anantavarman Chodaganga", period: "1078–1147", note: "The Eastern Ganga emperor under whom the present great temple was built at Nīlācala." },
  { name: "Anaṅga Bhīma Deva III", period: "1211–1238", note: "Completed the temple, established the Chappana Bhoga tradition and the daily seva structure." },
  { name: "Puruṣottama Deva", period: "1467–1497", note: "A great Vaiṣṇava Gajapati; connected to the story of the sweeper-king who sweeps the chariot road." },
  { name: "Pratāparudra Deva", period: "1497–1540", note: "Contemporary and disciple of Śrī Caitanya Mahāprabhu; hosted the Master in Purī for years." },
];

export default function Temple() {
  return (
    <>
      <PageHeader
        chapter="I"
        eyebrow="Śrī Jagannātha Kṣetra · Purī · Nīlācala"
        titleLines={["The temple", "of the world."]}
        subtitle="On the sea-blue hill of Nīlācala, three wooden deities preside over one of the four cardinal dhāms. Its towers rise 65 metres; its history reaches back into legend."
        image="https://images.pexels.com/photos/31969428/pexels-photo-31969428.jpeg?auto=format&fit=crop&q=85&w=1200"
        imageAlt="Puri Jagannath temple architecture"
      />

      {/* Kshetra Puranam */}
      <section className="py-24 md:py-32 border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">Kṣetra Purāṇam</p>
            <h2 className="font-serif-display text-4xl md:text-5xl leading-[1.02] tracking-tight">
              The story of<br /><span className="italic">daru-brahma.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6 space-y-6 text-stone-300 text-[17px] leading-[1.85]">
            <p>
              The Skanda Purāṇa recounts how King Indradyumna, having heard of a mysterious blue deity worshipped in secret by a tribal chief named Viśvāvasu, sent his minister Vidyāpati in search. The Lord vanished from that shrine when discovered, and reappeared as a piece of driftwood — <em className="italic text-stone-100">daru-brahma</em> — on the shore of Purī.
            </p>
            <p>
              Nārada instructed the king that the divine artisan Viśvakarmā would carve the three deities, on the condition that he not be disturbed for twenty-one days. The queen Guṇḍicā, unable to bear the silence, prompted the doors to be opened; and the deities remained forever unfinished — <em className="italic text-stone-100">without complete limbs, without eyes-fully-formed</em> — the primordial form of God.
            </p>
            <p>
              To this day the sanctum contains not marble but wood; and every twelve to nineteen years, in the <em className="italic text-stone-100">Nabakalebara</em>, the deities are renewed from new neem trees identified by omens.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Rituals table */}
      <section className="py-24 md:py-32 border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-14">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">The Daily Sevās</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              A day in the life<br /><span className="italic">of the Lord.</span>
            </h2>
          </Reveal>
          <div className="border-t border-stone-800">
            {RITUALS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.04}>
                <div className="grid grid-cols-12 gap-4 py-6 border-b border-stone-800 items-baseline">
                  <p className="col-span-3 md:col-span-2 chapter-num text-2xl md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="col-span-9 md:col-span-2 text-[11px] uppercase tracking-eyebrow text-stone-400">
                    {r.time}
                  </p>
                  <h3 className="col-span-12 md:col-span-4 font-serif-display text-2xl md:text-3xl tracking-tight">
                    {r.name}
                  </h3>
                  <p className="col-span-12 md:col-span-4 text-stone-300 text-[15px] leading-relaxed">
                    {r.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kings & bhagavatas */}
      <section className="py-24 md:py-32 border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-14 max-w-3xl">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">Kings &amp; Bhāgavatas</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              Those who kept the<br /><span className="italic">temple's fire alive.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {KINGS.map((k, i) => (
              <Reveal key={k.name} delay={(i % 2) * 0.08}>
                <div className="border-t border-stone-800 pt-6">
                  <div className="flex items-baseline justify-between mb-3">
                    <h4 className="font-serif-display text-2xl md:text-3xl tracking-tight">{k.name}</h4>
                    <span className="text-[11px] uppercase tracking-eyebrow text-stone-500">{k.period}</span>
                  </div>
                  <p className="text-stone-300 text-[15px] leading-relaxed">{k.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Miracles */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">Miracles &amp; Bhaktas</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              When the Lord<br /><span className="italic">came out to meet His own.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 space-y-8 text-stone-300 text-[17px] leading-[1.85]">
            <div>
              <h4 className="font-serif-display text-2xl text-stone-100 mb-2">Salabega, the Muslim bhakta</h4>
              <p>Once, when Sālabega — a leper Muslim devotee — could not reach Purī in time for Ratha Yātrā, the Lord's chariot stopped on the Grand Road and refused to move until he arrived. It stopped at Bālīsāhi, and there stands his samādhi to this day.</p>
            </div>
            <div>
              <h4 className="font-serif-display text-2xl text-stone-100 mb-2">Dāsia Bāuri &amp; the coconut</h4>
              <p>An untouchable devotee offered a coconut but could not enter the temple; a priest carried it in his contempt. The Lord did not touch it. When the priest went back and confessed, and the coconut was offered with love, marks of the Lord's hand were seen on it.</p>
            </div>
            <div>
              <h4 className="font-serif-display text-2xl text-stone-100 mb-2">Bandhu Mahānti's khichdi</h4>
              <p>Once a poor bhakta cooked a small pot of khichḍī and forgot to offer it before eating. In deep remorse he wept. The temple pujārīs found the Lord's mouth stained with rice, and understood that He had accepted the offering directly from the devotee's home.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
