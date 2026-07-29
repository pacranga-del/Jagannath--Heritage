import React from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../lib/content";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="relative border-t border-stone-800 mt-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="text-[11px] uppercase tracking-eyebrow text-stone-500 mb-6">
            The Trust
          </p>
          <h3 className="font-serif-display text-3xl md:text-4xl leading-[1.05] tracking-tight">
            Shri Puri Jagannath
            <br />
            <span className="italic text-[#D4AF37]">Religious &amp; Charitable Trust.</span>
          </h3>
          <p className="mt-6 max-w-md text-stone-400 text-[15px] leading-relaxed">
            A quiet effort to preserve Sanātana Dharma through study, ritual, feeding,
            and the daily remembrance of Śrī Jagannātha.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-eyebrow text-stone-500 mb-6">
            Explore
          </p>
          <ul className="space-y-3">
            {NAV_LINKS.slice(0, 6).map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-${l.testId}`}
                  className="text-stone-300 hover:text-[#D4AF37] transition-colors text-[14px] link-underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-[11px] uppercase tracking-eyebrow text-stone-500 mb-6">
            Reach the Trust
          </p>
          <ul className="space-y-3 text-[14px] text-stone-300">
            <li>
              <span className="text-stone-500">Web</span>{" "}
              <a href="https://purijagannathtrust.com" className="link-underline">
                purijagannathtrust.com
              </a>
            </li>
            <li>
              <span className="text-stone-500">Facebook</span>{" "}
              Puri Jagannath Trust
            </li>
            <li>
              <Link to="/contact" className="link-underline text-[#D4AF37]">
                Write to the Managing Trustee →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[12px] text-stone-500">
          <p className="uppercase tracking-eyebrow">
            © {new Date().getFullYear()} Puri Jagannath Trust. All rites reserved.
          </p>
          <p className="font-devanagari text-[#D4AF37]/80">जय जगन्नाथ</p>
        </div>
      </div>
    </footer>
  );
}
