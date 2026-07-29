import React from "react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";

const AZHWARS = [
  { name: "Poigai Āzhvār", place: "Kāñchī", note: "Author of the Mudhal Tiruvantādi — 100 verses on Māyon (Kṛṣṇa)." },
  { name: "Bhūtat Āzhvār", place: "Māmallapuram", note: "Composer of the Iraṇdām Tiruvantādi." },
  { name: "Pēy Āzhvār", place: "Mylāpore", note: "Author of the Mūnrām Tiruvantādi — first to have direct darśana of the Lord." },
  { name: "Tirumazhisai Āzhvār", place: "Tirumazhisai", note: "Nānmugan Tiruvantādi and Tiruccanda Viruttam." },
  { name: "Nammāzhvār", place: "Ālwārtirunagari", note: "The chief among Āzhvārs — composer of the Tiruvāymoli, 1102 verses considered the Tamil Veda." },
  { name: "Madhurakavi Āzhvār", place: "Tirukkolur", note: "Disciple of Nammāzhvār; composer of the Kanninuṇ Ciṛuttāmpu." },
  { name: "Kulasēkhara Āzhvār", place: "Kerala", note: "The king who renounced his throne — author of the Perumāl Tirumoli." },
  { name: "Periāzhvār", place: "Śrīvillipputtūr", note: "Foster-father of Āṇḍāl; composer of the Tiruppallāṇdu." },
  { name: "Āṇḍāl", place: "Śrīvillipputtūr", note: "The only female Āzhvār; composed the Tiruppāvai and Nācciyār Tirumoli, and married Śrī Raṅganātha." },
  { name: "Tondaradippodi Āzhvār", place: "Tirumaṇdaṅgudi", note: "Composer of the Tirumālai and Tiruppalliezhucchi." },
  { name: "Tiruppāṇ Āzhvār", place: "Uraiyūr", note: "Author of the Amalanādipirān — 10 verses head-to-foot on Śrī Raṅganātha." },
  { name: "Tirumaṅgai Āzhvār", place: "Tirumaṅgai", note: "The former chieftain and reformed dacoit — composer of the largest body of Prabandham hymns." },
];

const BIOS = [
  {
    name: "Śrī Rāmānujācārya",
    dates: "1017 – 1137 CE",
    where: "Śrīperumbudūr · Śrīraṅgam · Melkote",
    body:
      "Born in Śrīperumbudūr and initiated by Periya Nambi, Rāmānuja studied briefly under the Advaita teacher Yādava Prakāśa but eventually accepted the discipleship of Yāmunācārya, who died before Rāmānuja could meet him. Rāmānuja is said to have vowed at the deceased ācārya's bedside to fulfill three of his unfulfilled wishes: to write a commentary on the Brahma Sūtras (Śrī Bhāṣya), to honour the Āzhvārs by preserving the Divya Prabandham, and to compose a commentary on the Divya Prabandham. He climbed the tower of a temple to publicly reveal a secret Vaiṣṇava mantra, saying he would rather go to hell for disobedience than let millions be deprived of grace. He established Pāñcarātra worship at Śrīraṅgam, organized the temple administration, and instituted the practice of the Ashṭākṣara mantra for all castes.",
    image: "https://images.unsplash.com/photo-1714248376481-f3e37e023ec8?auto=format&fit=crop&q=85&w=1200",
  },
  {
    name: "Śrī Vedānta Deśika",
    dates: "1268 – 1369 CE",
    where: "Tūppūl · Kāñchī · Śrīraṅgam",
    body:
      "Known as Kavitārkikasiṃha — the lion among poets and logicians — Vedānta Deśika composed over a hundred works in Sanskrit, Tamil, Prākṛt and Maṇipravāḷa. His Tātparya Chandrikā, Rahasyatrayasāra, Pādukā-sahasra (a thousand verses on the Lord's sandals composed in a single night to win a poetic contest), and the philosophical treatise Nyāya-siddhāñjana are foundational. When Śrīraṅgam was sacked by Malik Kāfūr's army, Deśika saved the temple's texts and the deity's utsava-mūrti, and eventually returned to consecrate the sanctum. He is the founder of the Vaḍagalai school of Śrī Vaiṣṇavism.",
    image: "https://images.pexels.com/photos/34717652/pexels-photo-34717652.jpeg?auto=format&fit=crop&q=85&w=1200",
  },
];

export default function Acharyas() {
  return (
    <>
      <PageHeader
        chapter="VII"
        eyebrow="The Ācāryas · Āzhvārs · Śrī Vaiṣṇava Sampradāya"
        titleLines={["Twelve poet-saints", "and two great teachers."]}
        subtitle="The Āzhvārs sang the Lord into Tamil in twelve voices; Rāmānuja and Vedānta Deśika turned that song into a philosophy and a temple science."
        image="https://images.pexels.com/photos/37804098/pexels-photo-37804098.jpeg?auto=format&fit=crop&q=85&w=1200"
      />

      {/* Ramanuja & Desika biographies */}
      <section className="py-24 md:py-32 border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 space-y-24 md:space-y-32">
          {BIOS.map((b, i) => (
            <Reveal key={b.name} delay={0.04}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-start ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden sticky top-24">
                    <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-stone-100/10" />
                  </div>
                </div>
                <div className={`lg:col-span-6 lg:col-start-7 ${i % 2 === 1 ? "lg:[direction:ltr] lg:col-start-2" : ""}`}>
                  <p className="chapter-num text-5xl md:text-7xl mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-3">
                    {b.dates} · {b.where}
                  </p>
                  <h3 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight mb-6">
                    {b.name}
                  </h3>
                  <p className="text-stone-300 text-[17px] leading-[1.85] max-w-2xl">{b.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 12 Azhwars grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-14 max-w-3xl">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">The Twelve Āzhvārs</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              The poets who sang<br /><span className="italic">the Lord into Tamil.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-800 border border-stone-800">
            {AZHWARS.map((a, i) => (
              <Reveal key={a.name} delay={(i % 3) * 0.06} className="bg-stone-950 p-6 md:p-8 hover:bg-stone-900 transition-colors">
                <div className="flex items-baseline justify-between mb-4">
                  <p className="chapter-num text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-[11px] uppercase tracking-eyebrow text-stone-500">{a.place}</p>
                </div>
                <h4 className="font-serif-display text-2xl md:text-3xl tracking-tight mb-3">{a.name}</h4>
                <p className="text-stone-400 text-[14px] leading-relaxed">{a.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
