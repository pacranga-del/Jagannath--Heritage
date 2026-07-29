import React from "react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";

const SAINTS = [
  {
    name: "Śrī Caitanya Mahāprabhu",
    dates: "1486 – 1534",
    where: "Navadvīpa · Purī",
    body: "Born in Māyāpur, he took sannyāsa at twenty-four and spent the last eighteen years of his life in Puri, in constant sight of Śrī Jagannātha. He inaugurated the movement of saṅkīrtana — the public chanting of the divine names — and taught the philosophy of acintya-bheda-abheda: inconceivable simultaneous oneness and difference between the soul and the Lord. King Pratāparudra was his intimate disciple.",
    image: "https://images.pexels.com/photos/37804098/pexels-photo-37804098.jpeg?auto=format&fit=crop&q=85&w=900",
  },
  {
    name: "Śrī Nityānanda Prabhu",
    dates: "1474 – c. 1540",
    where: "Ekacakra · Bengal",
    body: "The eternal companion of Mahāprabhu, considered non-different from Baladeva. It was Nityānanda who preached the mercy of Caitanya throughout Bengal, especially converting Jagāi and Mādhāi — two drunkards who became devotees after being embraced by him.",
    image: "https://images.pexels.com/photos/34717652/pexels-photo-34717652.jpeg?auto=format&fit=crop&q=85&w=900",
  },
  {
    name: "Śrī Rūpa Gosvāmī",
    dates: "1489 – 1564",
    where: "Rāmakelī · Vṛndāvana",
    body: "Once a minister of the Sultan of Bengal named Sākar Mallik, he renounced everything at Mahāprabhu's instruction. In Vṛndāvana he composed the Bhakti-rasāmṛta-sindhu — a rasa-śāstra of devotion — and revealed the transcendental līlās of Rādhā-Kṛṣṇa in the Ujjvala-nīlamaṇi.",
    image: "https://images.pexels.com/photos/34484944/pexels-photo-34484944.jpeg?auto=format&fit=crop&q=85&w=900",
  },
  {
    name: "Śrī Sanātana Gosvāmī",
    dates: "1488 – 1558",
    where: "Rāmakelī · Vṛndāvana",
    body: "Elder brother of Rūpa, and once Dabir Khās, the chief minister. He wrote the Bṛhad-bhāgavatāmṛta and the Hari-bhakti-vilāsa, the code of daily conduct for Gauḍīya Vaiṣṇavas. He lived his last years at the Madana-mohana temple in Vṛndāvana.",
    image: "https://images.pexels.com/photos/19195759/pexels-photo-19195759.jpeg?auto=format&fit=crop&q=85&w=900",
  },
];

const LINEAGE = [
  "Śrī Kṛṣṇa",
  "Brahmā",
  "Nārada",
  "Vyāsa",
  "Madhvācārya",
  "Padmanābha Tīrtha",
  "Nṛhari Tīrtha",
  "Mādhavendra Purī",
  "Īśvara Purī",
  "Śrī Caitanya Mahāprabhu",
  "The Six Goswāmis of Vṛndāvana",
  "Śrīnivāsa Ācārya · Narottama Dāsa · Śyāmānanda",
];

export default function Gaudiya() {
  return (
    <>
      <PageHeader
        chapter="V"
        eyebrow="Gauḍīya Vaiṣṇava Sampradāya"
        titleLines={["A river of bhakti", "that flows through Purī."]}
        subtitle="The lineage of Mahāprabhu Śrī Caitanya, his eternal associate Nityānanda, and the Six Gosvāmīs of Vṛndāvana — a tradition of ecstatic love of the Divine that has shaped devotion for five centuries."
        image="https://images.unsplash.com/photo-1667506420529-b9f71a103ef9?auto=format&fit=crop&q=85&w=1200"
      />

      {/* Saints */}
      <section className="py-24 md:py-32 border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 space-y-24 md:space-y-32">
          {SAINTS.map((s, i) => (
            <Reveal key={s.name} delay={0.04}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-stone-100/10" />
                  </div>
                </div>
                <div className={`lg:col-span-6 lg:col-start-7 ${i % 2 === 1 ? "lg:[direction:ltr] lg:col-start-2" : ""}`}>
                  <p className="chapter-num text-5xl md:text-7xl mb-6">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-3">
                    {s.dates} · {s.where}
                  </p>
                  <h3 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight mb-6">
                    {s.name}
                  </h3>
                  <p className="text-stone-300 text-[17px] leading-[1.85] max-w-xl">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lineage */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">Guru-Paramparā</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              The lineage,<br /><span className="italic">from Kṛṣṇa to the present.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <ol className="border-l border-stone-800 pl-8 space-y-6">
              {LINEAGE.map((n, i) => (
                <li key={n} className="relative">
                  <span className="absolute -left-[36px] top-2 chapter-num text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-serif-display text-2xl md:text-3xl tracking-tight text-stone-100">
                    {n}
                  </h4>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  );
}
