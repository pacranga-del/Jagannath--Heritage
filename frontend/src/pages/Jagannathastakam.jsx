import React from "react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";

const VERSES = [
  {
    dev: "कदाचित् कालिन्दी तट विपिन सङ्गीत तरलो\nमुदाभीरी नारी वदन कमलास्वाद मधुपः ।\nरमा शम्भु ब्रह्मामर पति गणेशार्चित पदो\nजगन्नाथः स्वामी नयनपथगामी भवतु मे ॥ १ ॥",
    en: "He who plays the flute on the banks of the Kālindī, delighting the cowherd damsels, whose feet are worshipped by Lakṣmī, Śiva, Brahmā, Indra and Gaṇeśa — may that Lord Jagannātha be the path of my eyes.",
  },
  {
    dev: "भुजे सव्ये वेणुं शिरसि शिखिपिच्छं कटितटे\nदुकूलं नेत्रान्ते सहचरकटाक्षं विदधते ।\nसदा श्रीमद्वृन्दावन वसतिलीलापरिचयो\nजगन्नाथः स्वामी नयनपथगामी भवतु मे ॥ २ ॥",
    en: "Flute on the left arm, peacock-feather on the head, yellow silks around the waist, side-glancing at the gopīs — He who is ever engaged in the līlās of Vṛndāvana — may that Lord Jagannātha be the path of my eyes.",
  },
  {
    dev: "महाम्भोधेस्तीरे कनक रुचिरे नील शिखरे\nवसन् प्रासादान्तः सहज बलभद्रेण बलिना ।\nसुभद्रा मध्यस्थः सकल सुरसेवावसरदो\nजगन्नाथः स्वामी नयनपथगामी भवतु मे ॥ ३ ॥",
    en: "On the shore of the great ocean, on the golden-bright blue hill, dwelling inside the palace with His brother Balabhadra, with Subhadrā between them, receiving the worship of all the devas — may that Lord Jagannātha be the path of my eyes.",
  },
  {
    dev: "कृपापारावारः सजल जलद श्रेणिरुचिरो\nरमावाणी रामः स्फुरदमल पंकेरुह मुखः ।\nसुरेन्द्रैराराध्यः श्रुतिगण शिखा गीत चरितो\nजगन्नाथः स्वामी नयनपथगामी भवतु मे ॥ ४ ॥",
    en: "Ocean of compassion, dark-blue like a rain-cloud, delighting Ramā and Sarasvatī, His face a spotless lotus, worshipped by Indra and the devas, His deeds sung at the crest of the Vedas — may that Lord Jagannātha be the path of my eyes.",
  },
  {
    dev: "रथारूढो गच्छन् पथि मिलितभूदेव पटलैः\nस्तुतिप्रादुर्भावं प्रतिपदमुपाकर्ण्य सदयः ।\nदयासिन्धुर्बन्धुः सकल जगतां सिन्धुसुतया\nजगन्नाथः स्वामी नयनपथगामी भवतु मे ॥ ५ ॥",
    en: "Riding His chariot on the road, hearing the hymns of the brāhmaṇas gathered at every step, moved with compassion, ocean of mercy, kinsman of the entire world, together with the daughter of the ocean — may that Lord Jagannātha be the path of my eyes.",
  },
  {
    dev: "परब्रह्मापीड़ः कुवलय दलोत्फुल्ल नयनो\nनिवासी नीलाद्रौ निहित चरणोऽनन्त शिरसि ।\nरसानन्दो राधा सरस वपुरालिङ्गनसुखो\nजगन्नाथः स्वामी नयनपथगामी भवतु मे ॥ ६ ॥",
    en: "The very crown of Parabrahman, eyes wide as blooming blue lotus petals, dwelling on Nīlācala, His feet on the head of Ananta Śeṣa, delighting in embracing the sweet form of Rādhā — may that Lord Jagannātha be the path of my eyes.",
  },
  {
    dev: "न वै याचे राज्यं न च कनक माणिक्य विभवं\nन याचेऽहं रम्यां सकल जन काम्यां वरवधूम् ।\nसदा काले काले प्रमथ पतिना गीत चरितो\nजगन्नाथः स्वामी नयनपथगामी भवतु मे ॥ ७ ॥",
    en: "I ask no kingdom, no gold or jewels, no beautiful wife desired by all — I ask only for that Lord whose deeds are sung day after day by Śiva Himself. May that Lord Jagannātha be the path of my eyes.",
  },
  {
    dev: "हर त्वं संसारं द्रुततरमसारं सुरपते\nहर त्वं पापानां विततिमपरां यादवपते ।\nअहो दीनेऽनाथे निहित चरणो निश्चितमिदं\nजगन्नाथः स्वामी नयनपथगामी भवतु मे ॥ ८ ॥",
    en: "Remove, O Lord of devas, this fleeting worthless samsāra; remove, O Master of the Yādavas, the boundless mass of sins. On the destitute and the orphan He places His feet — this is certain. May that Lord Jagannātha be the path of my eyes.",
  },
];

export default function Jagannathastakam() {
  return (
    <>
      <PageHeader
        chapter="IV"
        eyebrow="Śrī Jagannāthāṣṭakam · Ādi Śaṅkarācārya"
        titleLines={["May He become", "the path of my eyes."]}
        subtitle="Eight verses composed by Ādi Śaṅkarācārya on his pilgrimage to Purī. The refrain — jagannāthaḥ svāmī nayana-pathagāmī bhavatu me — is one of the most recited prayers in Sanātana Dharma."
        image="https://images.unsplash.com/photo-1722404348790-85bf847dd863?auto=format&fit=crop&q=85&w=1200"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-16">
          {VERSES.map((v, i) => (
            <Reveal key={i} delay={0.04}>
              <article className="border-t border-stone-800 pt-10">
                <p className="chapter-num text-3xl md:text-4xl mb-6">
                  Verse {String(i + 1).padStart(2, "0")}
                </p>
                <pre className="sloka text-xl md:text-2xl leading-[2] whitespace-pre-wrap">
                  {v.dev}
                </pre>
                <p className="mt-8 font-serif-display italic text-stone-300 text-lg md:text-xl leading-relaxed">
                  {v.en}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
