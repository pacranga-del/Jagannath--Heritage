import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { api } from "../lib/api";

const ALL = { slug: "all", label: "All", count: null };

export default function Gallery() {
  const [categories, setCategories] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState(null); // index in photos
  const [loading, setLoading] = useState(true);

  const loadCats = useCallback(async () => {
    const { data } = await api.get("/gallery/categories");
    setCategories(data);
  }, []);

  const loadPhotos = useCallback(async (cat) => {
    setLoading(true);
    const { data } = await api.get("/gallery", { params: { category: cat } });
    setPhotos(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadCats(); }, [loadCats]);
  useEffect(() => { loadPhotos(active); }, [active, loadPhotos]);

  const tabs = useMemo(() => [ALL, ...categories], [categories]);

  const closeLightbox = () => setLightbox(null);
  const next = useCallback(() => setLightbox((i) => (i == null ? null : (i + 1) % photos.length)), [photos.length]);
  const prev = useCallback(() => setLightbox((i) => (i == null ? null : (i - 1 + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (lightbox == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, next, prev]);

  return (
    <>
      <PageHeader
        chapter="IX"
        eyebrow="Darśana Gallery"
        titleLines={["Photographs from", "the temple, the yātrā,", "and the seva of the trust."]}
        subtitle="An evolving archive of Ratha Yātrā, daily darśana, charitable activities and festivals. New photographs are added by the Trust from time to time."
      />

      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          {/* Category tabs */}
          <Reveal className="mb-12 flex flex-wrap gap-2 md:gap-3 border-b border-stone-800 pb-6">
            {tabs.map((t) => (
              <button
                key={t.slug}
                data-testid={`gallery-tab-${t.slug}`}
                onClick={() => setActive(t.slug)}
                className={`text-[12px] uppercase tracking-eyebrow px-4 py-2 border transition-colors ${
                  active === t.slug
                    ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5"
                    : "border-stone-800 text-stone-300 hover:border-stone-600"
                }`}
              >
                {t.label}
                {t.count != null && (
                  <span className="ml-2 text-stone-500">{t.count}</span>
                )}
              </button>
            ))}
          </Reveal>

          {/* Grid */}
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center text-stone-500 text-[13px] uppercase tracking-eyebrow">
              Loading darśana…
            </div>
          ) : photos.length === 0 ? (
            <div className="min-h-[300px] flex items-center justify-center text-stone-500 text-[13px] uppercase tracking-eyebrow">
              No photographs in this category yet.
            </div>
          ) : (
            <div
              data-testid="gallery-grid"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            >
              {photos.map((p, i) => (
                <motion.button
                  key={p.id}
                  data-testid={`gallery-item-${p.id}`}
                  onClick={() => setLightbox(i)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: (i % 8) * 0.04, ease: [0.33, 1, 0.68, 1] }}
                  className={`gal-card relative overflow-hidden bg-stone-900 ring-1 ring-stone-800 hover:ring-[#D4AF37]/60 transition-all text-left ${
                    i % 7 === 3 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  <img
                    src={p.image_data}
                    alt={p.caption || p.category_label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-t from-stone-950/85 to-transparent">
                    <p className="text-[10px] uppercase tracking-eyebrow text-[#D4AF37] mb-1">
                      {p.category_label}
                    </p>
                    <p className="text-stone-100 text-[13px] leading-snug line-clamp-2">
                      {p.caption || "—"}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && photos[lightbox] && (
          <motion.div
            data-testid="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-stone-950/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              data-testid="gallery-lightbox-close"
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-6 right-6 text-stone-300 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              data-testid="gallery-lightbox-prev"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-stone-300 hover:text-white p-3 border border-stone-700 hover:border-stone-400 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              data-testid="gallery-lightbox-next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-stone-300 hover:text-white p-3 border border-stone-700 hover:border-stone-400 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={photos[lightbox].id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[86vh] flex flex-col items-center gap-4"
            >
              <img
                src={photos[lightbox].image_data}
                alt={photos[lightbox].caption}
                className="max-w-[92vw] max-h-[72vh] object-contain"
              />
              <div className="text-center max-w-2xl px-4">
                <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-2">
                  {photos[lightbox].category_label} · {lightbox + 1} / {photos.length}
                </p>
                {photos[lightbox].caption && (
                  <p className="font-serif-display italic text-stone-100 text-xl md:text-2xl leading-snug">
                    {photos[lightbox].caption}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
