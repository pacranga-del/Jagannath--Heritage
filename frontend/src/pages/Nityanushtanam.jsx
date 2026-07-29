import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const CHAPTERS = [
  {
    id: "sandhya",
    title: "Sandhyāvandanam",
    kicker: "Thrice-daily upāsanā",
    intro:
      "The thrice-daily worship of Sūrya-Nārāyaṇa, prescribed for every dvija after the sacred thread. Performed at prātaḥ (dawn), mādhyāhnika (noon) and sāyam (dusk). The following is the Yajur-Vaiṣṇava order.",
    steps: [
      { name: "Ācamanam", dev: "ॐ अच्युताय नमः । अनन्ताय नमः । गोविन्दाय नमः ।", en: "Sipping water thrice with the names of Achyuta, Ananta, Govinda." },
      { name: "Prāṇāyāma", dev: "ॐ भूः । ॐ भुवः । ॐ सुवः । ॐ महः । ॐ जनः । ॐ तपः । ॐ सत्यम् । ॐ तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥ ॐ आपोज्योतिरसोऽमृतं ब्रह्म भूर्भुवस्सुवरोम् ॥", en: "One round of prāṇāyāma with the seven vyāhṛtis, the Gāyatrī, and the closing āpo-jyoti mantra." },
      { name: "Saṅkalpa", dev: "मम उपात्त समस्त दुरितक्षय द्वारा श्री परमेश्वर प्रीत्यर्थं प्रातः / मध्याह्न / सायं सन्ध्यामुपासिष्ये", en: "The formal declaration of intent — at the given time of day." },
      { name: "Mārjanam", dev: "आपोहिष्ठा मयोभुवः ॥ ता न ऊर्जे दधातन ॥ महे रणाय चक्षसे ॥", en: "Sprinkling of water with the āpo-hi-ṣṭhā mantras of the Ṛg-veda." },
      { name: "Prāśanam", dev: "सूर्यश्च मामन्युश्च मन्युपतयश्च मन्युकृतेभ्यः पापेभ्यो रक्षन्ताम्", en: "Sipping water while reciting the prāśana mantra — for absolving sins of the day." },
      { name: "Arghya-pradāna", dev: "ॐ भूर्भुवस्सुवः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥", en: "Offering of water thrice to Sūrya with the Gāyatrī mantra (four times at noon, thrice at dawn and dusk)." },
      { name: "Gāyatrī Japa", dev: "ॐ भूर्भुवस्सुवः । तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥", en: "Silent recitation of the Gāyatrī — a minimum of 10, 28, or 108 times." },
      { name: "Upasthānam & Digvandanam", dev: "मित्रस्य चर्षणीधृतः ॥ ... ॐ प्राच्यै दिशे नमः ...", en: "Standing hymn to the Sun (varying by time), followed by salutations to the eight directions and to Brahmā, Viṣṇu and Rudra." },
      { name: "Abhivādanam & Samarpaṇam", dev: "अभिवादये ... गोत्रः / प्रवरान्वित / सूत्रः / शाखाध्यायी / नामाहम् अस्मि भोः ।", en: "Announcement of one's gotra, sūtra, śākhā and name; and dedication of the ritual to Bhagavān." },
    ],
  },
  {
    id: "yagnopavita",
    title: "Yajñopavīta Dhāraṇam",
    kicker: "Wearing of the sacred thread",
    intro:
      "Performed at Śrāvaṇī / Upākarma each year, or whenever the thread breaks or becomes impure. The old thread is replaced with a new one after a brief śuddhi.",
    steps: [
      { name: "Ācamanam & Saṅkalpa", dev: "मम उपात्त समस्त दुरितक्षय द्वारा श्री परमेश्वर प्रीत्यर्थं यज्ञोपवीत धारणं करिष्ये", en: "Sip water; declare intent to renew the sacred thread." },
      { name: "Purification of the new sūtra", dev: "यज्ञोपवीतम् परमं पवित्रं प्रजापतेर्यत्सहजं पुरस्तात् । आयुष्यमग्र्यं प्रतिमुञ्च शुभ्रं यज्ञोपवीतम् बलमस्तु तेजः ॥", en: "The Yajñopavīta-dhāraṇa mantra — declaring the thread as most sacred, born with Prajāpati; may it grant longevity, strength and radiance." },
      { name: "Wearing", dev: "ॐ यज्ञोपवीतम् बलमस्तु तेजः ।", en: "Wear the thread over the left shoulder, under the right arm — savya position for gods." },
      { name: "Discarding the old", dev: "उपवीतम् भिन्नतन्तुं जीर्णं कश्मलदूषितम् । विसृजामि जले ब्रह्मन् वर्चो दीर्घायुरस्तु मे ॥", en: "Recite while discarding the old thread into water." },
      { name: "Ten Gāyatrī japa", dev: "ॐ भूर्भुवस्सुवः तत्सवितुर्वरेण्यं ...", en: "Ten repetitions of the Gāyatrī to seal the renewal." },
    ],
  },
  {
    id: "tarpanam",
    title: "Tarpaṇam",
    kicker: "Offering water to devas, ṛṣis and pitṛs",
    intro:
      "The daily / occasional offering of water. Three streams — deva-tarpaṇa (with the thread on the left shoulder), ṛṣi-tarpaṇa (thread as a garland, niviti), pitṛ-tarpaṇa (thread on the right, prācīnāvīti).",
    steps: [
      { name: "Deva-tarpaṇa", dev: "ब्रह्मादयो देवाः तृप्यन्ताम् ॥ प्रजापतिस्तृप्यताम् ॥ इन्द्रस्तृप्यताम् ॥ यमः तृप्यताम् ॥ वरुणः तृप्यताम् ॥ सोमः तृप्यताम् ॥", en: "Water offered to Brahmā, Prajāpati, Indra, Yama, Varuṇa, Soma, etc. — the thread on the left shoulder, water poured from finger-tips." },
      { name: "Ṛṣi-tarpaṇa", dev: "कृष्णद्वैपायनादयो ऋषयः तृप्यन्ताम् ॥ सनकादयो ऋषयः तृप्यन्ताम् ॥ मरीच्यादयो ऋषयः तृप्यन्ताम् ॥", en: "Water offered to Vyāsa, the Sanaka-kumāras, the seven sages — thread worn as garland (nivīti), water poured from the base of the little finger." },
      { name: "Pitṛ-tarpaṇa", dev: "पितरः तृप्यन्ताम् । पितामहाः तृप्यन्ताम् । प्रपितामहाः तृप्यन्ताम् । मातरः तृप्यन्ताम् । पितामह्यः तृप्यन्ताम् । प्रपितामह्यः तृप्यन्ताम् ॥", en: "Water offered with sesame seeds to father, grandfather, great-grandfather, mother, grandmother, great-grandmother — thread on the right shoulder (prācīnāvīti), water from the pitr-tīrtha (between thumb and index)." },
    ],
  },
  {
    id: "sraddham",
    title: "Śrāddham",
    kicker: "Rites for the ancestors",
    intro:
      "Performed on the tithi of the ancestor's passing (annual Pratisāṃvatsarika), on New Moon (Amāvāsyā tarpaṇa), during Mahālaya Pakṣa (fortnight of the ancestors in Bhādrapada / Āśvina), and at pilgrimage places like Gayā.",
    steps: [
      { name: "Preparation", dev: "—", en: "Three brāhmaṇas invited (or one, if unavailable) — one for the Viśvedevas, one for the ancestors, and one representing the Rudras / Ādityas. Offerings of rice-balls (piṇḍa), sesame, darbha grass, and food." },
      { name: "Piṇḍa-pradāna", dev: "पितरः तृप्यन्तु ॥ पितामहाः तृप्यन्तु ॥ प्रपितामहाः तृप्यन्तु ॥", en: "Three piṇḍas offered on darbha grass to the father, grandfather, great-grandfather; three more for the female line; water and sesame poured over them." },
      { name: "Brāhmaṇa-bhojanam", dev: "—", en: "Feeding of the brāhmaṇas with prescribed food; touching the piṇḍa to the food to sanctify." },
      { name: "Visarjanam", dev: "पितृभ्यः स्वधा नमः ।", en: "Formal dismissal of the invited pitrs; piṇḍas placed in flowing water or given to a cow." },
    ],
  },
];

export default function Nityanushtanam() {
  return (
    <>
      <PageHeader
        chapter="VIII"
        eyebrow="Vaiṣṇava Nityānusthānam"
        titleLines={["A handbook for the", "householder Vaiṣṇava."]}
        subtitle="Sandhyāvandanam, Yajñopavīta Dhāraṇam, Tarpaṇam and Śrāddham — the daily and occasional karmānushtānas. Each entry includes the mantras and the method."
        image="https://images.unsplash.com/photo-1666694051761-cd972857da30?auto=format&fit=crop&q=85&w=1200"
      />

      <section className="py-16 md:py-24 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Reveal className="mb-10 text-stone-400 text-[15px] leading-relaxed border-l-2 border-[#9F1239] pl-4">
            <p><strong className="text-stone-100">Note:</strong> The procedures below are given in the Yajur-śākhā Vaiṣṇava order and are intended as a starting reference. Please always confirm details with your family ācārya, especially for śrāddha rites where dates, gotras, and śākhā-specific mantras vary.</p>
          </Reveal>

          <div className="space-y-4">
            {CHAPTERS.map((c, i) => (
              <Accordion key={c.id} chapter={c} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Accordion({ chapter, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div data-testid={`nitya-item-${chapter.id}`} className="border border-stone-800 bg-stone-950/60">
      <button
        onClick={() => setOpen((v) => !v)}
        data-testid={`nitya-toggle-${chapter.id}`}
        className="w-full text-left px-6 md:px-8 py-6 flex items-center justify-between gap-6 hover:bg-stone-900/60 transition-colors"
      >
        <div className="flex items-baseline gap-6 md:gap-10 min-w-0">
          <span className="chapter-num text-2xl md:text-4xl shrink-0">{String(index + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-1">{chapter.kicker}</p>
            <h3 className="font-serif-display text-2xl md:text-4xl tracking-tight truncate">{chapter.title}</h3>
          </div>
        </div>
        <ChevronDown size={22} className={`shrink-0 text-[#D4AF37] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden border-t border-stone-800"
          >
            <div className="p-6 md:p-10 space-y-6">
              <p className="text-stone-300 text-[16px] leading-[1.85]">{chapter.intro}</p>
              <div className="space-y-8">
                {chapter.steps.map((s, i) => (
                  <div key={s.name} className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-stone-800 pt-6">
                    <p className="md:col-span-3 text-[11px] uppercase tracking-eyebrow text-[#D4AF37]">
                      Step {String(i + 1).padStart(2, "0")}<br />
                      <span className="text-stone-100 normal-case tracking-normal font-serif-display text-lg mt-1 block">{s.name}</span>
                    </p>
                    <div className="md:col-span-9 space-y-3">
                      {s.dev !== "—" && (
                        <pre className="sloka text-lg md:text-xl whitespace-pre-wrap leading-[2]">{s.dev}</pre>
                      )}
                      <p className="text-stone-300 text-[15px] leading-relaxed">{s.en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
