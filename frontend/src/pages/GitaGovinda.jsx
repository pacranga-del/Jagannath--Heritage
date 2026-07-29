import React from "react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";

const ASHTAPADIS = [
  {
    num: "I · Daśāvatāra-stotra",
    dev: "प्रलयपयोधिजले धृतवानसि वेदं\nविहितवहित्रचरित्रमखेदम् ।\nकेशव धृतमीनशरीर जय जगदीश हरे ॥",
    trans: "Praḷaya-payodhi-jale dhṛtavān-asi vedaṃ / vihita-vahitra-caritram akhedaṃ / Keśava dhṛta-mīna-śarīra, jaya jagadīśa hare",
    gloss: "O Keśava, who took the form of the fish in the waters of the deluge and effortlessly held up the Veda — glory to You, Lord of the universe.",
  },
  {
    num: "III · Rādhā-viraha",
    dev: "सञ्चरदधरसुधामधुरध्वनिमुखरितमोहनवंशम् ।\nवलितदृगञ्चलचञ्चलमौलिकपोलविलोलकपोलम् ॥",
    trans: "Sañcarad-adhara-sudhā-madhura-dhvani-mukharita-mohana-vaṃśam / valita-dṛg-añcala-cañcala-mauli-kapola-vilola-kapolam",
    gloss: "His enchanting flute is sweetened by the nectar of His moving lips; His restless eyes flicker across His cheek — the very peacock-feather on His crown sways.",
  },
  {
    num: "V · Sakhī's plea",
    dev: "पश्यति दिशि दिशि रहसि भवन्तम् ।\nतदधरमधुरमधूनि पिबन्तम् ॥",
    trans: "Paśyati diśi diśi rahasi bhavantaṃ / tad-adhara-madhura-madhūni pibantam",
    gloss: "In every direction, in solitude, she sees only You — drinking again and again from the honey of her lower lip.",
  },
  {
    num: "X · The reconciliation",
    dev: "प्रिये चारुशीले प्रिये चारुशीले\nमुञ्च मयि मानमनिदानम् ॥",
    trans: "Priye cāruśīle priye cāruśīle / muñca mayi mānam anidānam",
    gloss: "Beloved of graceful conduct — abandon this baseless indignation towards Me.",
  },
];

export default function GitaGovinda() {
  return (
    <>
      <PageHeader
        chapter="III"
        eyebrow="Śrī Gīta Govindam · Jayadeva Gosvāmī · 12th c."
        titleLines={["The love-song", "of the Lord."]}
        subtitle="Twenty-four ashṭapadis composed by Jayadeva of Kenduli — sung every evening inside the sanctum of Puri, where the Lord Himself is said to have edited a line the poet feared to write."
        image="https://images.unsplash.com/photo-1713986719526-8c44918a9688?auto=format&fit=crop&q=85&w=1200"
      />

      {/* The story */}
      <section className="py-24 md:py-32 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-stone-300 text-[17px] md:text-[19px] leading-[1.85] space-y-8">
          <p>
            <span className="font-serif-display text-5xl md:text-6xl float-left mr-4 mt-1 text-[#D4AF37] leading-none italic">J</span>
            ayadeva was a Sanskrit poet of the twelfth century, born in Kenduli, and later a court poet of King Lakṣmaṇasena of Bengal. He wrote a single work — the <em className="italic text-stone-100">Gīta Govindam</em>, a lyrical drama in twelve chapters that describes the love-longing of Rādhā and Kṛṣṇa. Every one of its twenty-four songs is an <em className="italic text-stone-100">ashṭapadi</em>, eight paired lines set to a rāga and tāla.
          </p>
          <p>
            Tradition holds that when Jayadeva reached the tenth ashṭapadi and had to write the line <em className="italic text-stone-100">"smara-garaḷa-khaṇḍanam, mama śirasi maṇḍanam, dehi pada-pallavam-udāram"</em> — "place, O beloved, thy tender foot upon my head" — he hesitated to place Kṛṣṇa's foot upon Rādhā, and went for his bath. In his absence, the Lord Himself is said to have completed the line. When Jayadeva returned and found the verse written, he understood who had visited.
          </p>
          <p>
            In Purī, the tradition of singing the Gīta Govindam every evening in the Śrī Mandir was established by the Gajapati kings. Even today, the maharis (temple dancers) of Purī sing these ashṭapadis at the time of the Bada Śṛṅgāra seva.
          </p>
        </div>
      </section>

      {/* Ashtapadi cards */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-14">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">Four Ashṭapadis</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              A garland of<br /><span className="italic">love-verses.</span>
            </h2>
          </Reveal>
          <div className="space-y-16 md:space-y-24">
            {ASHTAPADIS.map((a, i) => (
              <Reveal key={a.num} delay={0.06}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-stone-800 pt-12">
                  <div className="lg:col-span-3">
                    <p className="chapter-num text-3xl md:text-5xl leading-none mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-[11px] uppercase tracking-eyebrow text-stone-400">{a.num}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <pre className="sloka text-xl md:text-2xl whitespace-pre-wrap font-normal">
                      {a.dev}
                    </pre>
                    <p className="mt-6 font-serif-display italic text-stone-400 text-[15px] leading-relaxed">
                      {a.trans}
                    </p>
                  </div>
                  <div className="lg:col-span-4">
                    <p className="text-stone-300 text-[16px] leading-[1.8]">{a.gloss}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
