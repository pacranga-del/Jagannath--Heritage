import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, ArrowUpRight, ShoppingBag } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { api } from "../lib/api";

function formatWhatsAppUrl(phone, message) {
  const clean = (phone || "").replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${clean}?text=${encoded}`;
}

function formatPrice(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({ whatsapp_number: "", upi_id: "" });
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    Promise.all([api.get("/products"), api.get("/settings")])
      .then(([p, s]) => {
        setProducts(p.data);
        setSettings(s.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.variant || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
    );
  }, [products, query]);

  const orderMessage = (p) =>
    `Jai Jagannātha 🙏\n\nI would like to order the following item from the Trust marketplace:\n\n• ${p.name}${p.variant ? ` (${p.variant})` : ""}\n• Price: ${formatPrice(p.price)}\n\nPlease share the total, delivery address details and payment instructions.\n\nThank you.`;

  return (
    <>
      <PageHeader
        chapter="XI"
        eyebrow="Marketplace · Ritual Essentials"
        titleLines={["The small things", "a Vaiṣṇava needs."]}
        subtitle="A quiet catalog of ritual essentials — poonal, vibhūti, thiruman, śrīcūrṇam, pavithram and dharbai — sourced by the Trust and dispatched on request. Order by WhatsApp; pay by UPI."
        image="https://images.unsplash.com/photo-1701453344115-e4616d4844d9?auto=format&fit=crop&q=85&w=1200"
      />

      <section className="py-14 md:py-20 border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          {/* Bar */}
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-3">
                {filtered.length} items {query && <span className="text-stone-500">· filtered</span>}
              </p>
              <h2 className="font-serif-display text-3xl md:text-5xl leading-tight tracking-tight">
                All items are hand-picked and<br />
                <span className="italic">sourced through temple channels.</span>
              </h2>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <label className="text-[11px] uppercase tracking-eyebrow text-stone-400">Search catalog</label>
              <input
                data-testid="marketplace-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Pavithram, Poonal…"
                className="bg-transparent border-b border-stone-700 focus:border-[#D4AF37] outline-none py-2 min-w-[240px] text-stone-100 placeholder:text-stone-600 transition-colors"
              />
            </div>
          </Reveal>

          {/* Grid */}
          {loading ? (
            <div className="min-h-[300px] flex items-center justify-center text-stone-500 text-[13px] uppercase tracking-eyebrow">
              Loading catalog…
            </div>
          ) : filtered.length === 0 ? (
            <div className="min-h-[240px] flex items-center justify-center text-stone-500 text-[13px] uppercase tracking-eyebrow">
              No items match your search.
            </div>
          ) : (
            <div
              data-testid="marketplace-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filtered.map((p, i) => (
                <motion.article
                  key={p.id}
                  data-testid={`product-card-${p.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, delay: (i % 6) * 0.05, ease: [0.33, 1, 0.68, 1] }}
                  className="group flex flex-col bg-stone-950 border border-stone-800 hover:border-[#D4AF37]/50 transition-colors"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
                    <img
                      src={p.image_data}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                    />
                    {!p.is_available && (
                      <div className="absolute top-3 left-3 text-[10px] uppercase tracking-eyebrow px-3 py-1 bg-stone-950/90 text-stone-300 border border-stone-700">
                        Sold out
                      </div>
                    )}
                    <div className="absolute top-3 right-3 text-[11px] uppercase tracking-eyebrow px-3 py-1 bg-stone-950/90 text-[#D4AF37] border border-[#D4AF37]/50">
                      {formatPrice(p.price)}
                    </div>
                  </div>
                  <div className="p-6 md:p-7 flex flex-col grow gap-4">
                    <div>
                      {p.variant && (
                        <p className="text-[10px] uppercase tracking-eyebrow text-stone-500 mb-1.5">
                          {p.variant}
                        </p>
                      )}
                      <h3 className="font-serif-display text-2xl md:text-[28px] leading-tight tracking-tight text-stone-50">
                        {p.name}
                      </h3>
                    </div>
                    <p className="text-stone-400 text-[14px] leading-[1.7] flex-grow">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-3 pt-3 border-t border-stone-800 mt-auto">
                      <a
                        data-testid={`product-order-${p.id}`}
                        href={formatWhatsAppUrl(settings.whatsapp_number, orderMessage(p))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[12px] uppercase tracking-eyebrow bg-[#25D366]/10 text-[#4ade80] border border-[#25D366]/40 px-4 py-2.5 hover:bg-[#25D366] hover:text-stone-950 transition-colors"
                      >
                        <MessageCircle size={14} /> Order via WhatsApp
                      </a>
                      <Link
                        to="/payment"
                        data-testid={`product-pay-${p.id}`}
                        className="text-[11px] uppercase tracking-eyebrow text-stone-400 hover:text-[#D4AF37] link-underline ml-auto"
                      >
                        Pay
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <Reveal className="mb-14 max-w-3xl">
            <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-4">How it works</p>
            <h2 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
              Three simple steps,<br /><span className="italic">no complicated cart.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800 border border-stone-800">
            {[
              { t: "Choose", d: "Pick the items you need. Note the total price." },
              { t: "Message", d: "Tap 'Order via WhatsApp'. A pre-filled note is sent to the Trust." },
              { t: "Pay by UPI", d: "Scan the QR on the payment page and pay. Your order is shipped." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08} className="bg-stone-950 p-8 md:p-10">
                <p className="chapter-num text-5xl md:text-6xl mb-6">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="font-serif-display text-2xl md:text-3xl mb-3 tracking-tight">{s.t}</h4>
                <p className="text-stone-400 text-[14px] leading-relaxed">{s.d}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-4 items-center">
            <Link
              to="/payment"
              data-testid="marketplace-payment-cta"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#D4AF37] text-stone-950 text-[13px] uppercase tracking-eyebrow font-medium hover:bg-[#e6c34f] transition-colors"
            >
              <ShoppingBag size={16} /> Go to payment
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-6 py-3.5 border border-stone-600 text-stone-100 text-[13px] uppercase tracking-eyebrow font-medium hover:border-stone-100 transition-colors"
            >
              Ask the Trust <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
