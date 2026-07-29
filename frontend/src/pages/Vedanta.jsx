import React from "react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";

const SCHOOLS = [
  {
    name: "Advaita",
    teacher: "Ādi Śaṅkarācārya",
    dates: "c. 788 – 820 CE",
    thesis: "Brahman alone is real; the world is an appearance (māyā). The ātman is Brahman.",
    body: "Śaṅkara's Advaita-vedānta holds that Brahman is nirguṇa — beyond attributes — and that the plurality of the world is a superimposition (adhyāsa) on the one non-dual reality. Liberation is the direct realization of the identity of ātman and Brahman: tat tvam asi.",
  },
  {
    name: "Viśiṣṭādvaita",
    teacher: "Śrī Rāmānujācārya",
    dates: "1017 – 1137 CE",
    thesis: "Brahman is qualified (viśiṣṭa) by souls and matter as its inseparable modes.",
    body: "Rāmānuja teaches a qualified non-dualism: Brahman (Nārāyaṇa with Śrī) alone is real, but the world of souls and matter are His body — dependent yet real. The soul remains eternally distinct from Brahman, and yet inseparable. Liberation is service in Vaikuṇṭha.",
  },
  {
    name: "Dvaita",
    teacher: "Śrī Madhvācārya",
    dates: "1238 – 1317 CE",
    thesis: "Five eternal differences (pañca-bheda) between souls, matter, and God.",
    body: "Madhva holds a strict dualism: God (Viṣṇu) is supreme and utterly distinct from the individual soul and from insentient matter. Liberation is the fulfilled service of the Lord in one's eternal individual capacity.",
  },
];

const AGAMAS = [
  {
    name: "Pāñcarātra Āgama",
    body: "The Pāñcarātra tradition holds that Nārāyaṇa manifests in five modes — para (transcendent), vyūha (fourfold: Vāsudeva, Saṅkarṣaṇa, Pradyumna, Aniruddha), vibhava (avatāras), antaryāmī (inner witness), and arcā (image). Its texts (Sātvata, Pauṣkara, Jayākhya, Ahirbudhnya) prescribe temple worship centered on mantras and bhakti. Rāmānuja established Pāñcarātra worship in most Śrī Vaiṣṇava temples.",
  },
  {
    name: "Vaikhānasa Āgama",
    body: "The Vaikhānasa tradition claims direct descent from the sage Vikhanas and is followed at Tirumala, Kāñcīpuram, and many ancient Viṣṇu temples. Its priesthood is hereditary; its rites emphasize the pañca-yajña of a householder brāhmaṇa carried into the temple setting. It uses the six Vaikhānasa sūtras of Ātri, Bhṛgu, Marīci, and Kāśyapa.",
  },
];

export default function Vedanta() {
  return (
    <>
      <PageHeader
        chapter="VI"
        eyebrow="Vaiṣṇava Sampradāya · Vedānta"
        titleLines={["One reality,", "three ways to speak of it."]}
        subtitle="Advaita, Viśiṣṭādvaita, and Dvaita — three great philosophical schools reading the same Upaniṣads. And two Āgamic traditions — Pāñcarātra and Vaikhānasa — governing how the Lord is worshipped in temples."
        image="https://images.pexels.com/photos/34717652/pexels-photo-34717652.jpeg?auto=format&fit=crop&q=85&w=1200"
      />

      {/* Three Schools */}
      <section className="py-24 md:py-32 border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-14 max-w-3xl">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">The Three Vedāntas</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              How can the many<br /><span className="italic">be reconciled with the one?</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-stone-800 border border-stone-800">
            {SCHOOLS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.1} className="bg-stone-950 p-8 md:p-10">
                <p className="chapter-num text-5xl md:text-6xl mb-6">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif-display text-3xl md:text-4xl tracking-tight mb-2">{s.name}</h3>
                <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-6">
                  {s.teacher} · {s.dates}
                </p>
                <p className="font-serif-display italic text-stone-100 text-lg leading-relaxed mb-6 border-l-2 border-[#D4AF37] pl-4">
                  {s.thesis}
                </p>
                <p className="text-stone-300 text-[15px] leading-[1.85]">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24 md:py-32 border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-10">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">A Side-by-Side</p>
            <h2 className="font-serif-display text-3xl md:text-5xl leading-tight tracking-tight">
              Where the schools <span className="italic">diverge.</span>
            </h2>
          </Reveal>
          <div className="border border-stone-800 overflow-x-auto">
            <table className="w-full text-[14px] md:text-[15px]">
              <thead>
                <tr className="border-b border-stone-800 bg-stone-900/40">
                  <th className="text-left p-4 font-normal text-[11px] uppercase tracking-eyebrow text-stone-400 w-40">Question</th>
                  <th className="text-left p-4 font-normal text-[11px] uppercase tracking-eyebrow text-[#D4AF37]">Advaita</th>
                  <th className="text-left p-4 font-normal text-[11px] uppercase tracking-eyebrow text-[#D4AF37]">Viśiṣṭādvaita</th>
                  <th className="text-left p-4 font-normal text-[11px] uppercase tracking-eyebrow text-[#D4AF37]">Dvaita</th>
                </tr>
              </thead>
              <tbody className="text-stone-300">
                {[
                  ["Nature of Brahman", "Nirguṇa (attribute-less)", "Saguṇa (Nārāyaṇa with Śrī)", "Saguṇa (Viṣṇu)"],
                  ["Reality of the world", "Vyāvahārika (empirical only)", "Real, body of Brahman", "Real and dependent"],
                  ["Soul & God", "Identical", "Distinct yet inseparable", "Eternally distinct"],
                  ["Path", "Jñāna", "Bhakti + prapatti", "Bhakti"],
                  ["Liberation", "Merging into Brahman", "Sāyujya in Vaikuṇṭha", "Service in Vaikuṇṭha"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-stone-800/80 last:border-b-0 hover:bg-stone-900/30">
                    <td className="p-4 text-stone-400">{row[0]}</td>
                    <td className="p-4">{row[1]}</td>
                    <td className="p-4">{row[2]}</td>
                    <td className="p-4">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Agamas */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-14 max-w-3xl">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">The Āgamic Traditions</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              How the Lord is<br /><span className="italic">actually worshipped.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {AGAMAS.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.1}>
                <div className="border-t border-stone-800 pt-8">
                  <p className="chapter-num text-5xl md:text-6xl mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-serif-display text-3xl md:text-4xl tracking-tight mb-4">
                    {a.name}
                  </h3>
                  <p className="text-stone-300 text-[16px] leading-[1.85]">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
