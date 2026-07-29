import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { api } from "../lib/api";
import { formatApiErrorDetail } from "../lib/AuthContext";
import { toast, Toaster } from "sonner";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/contact", { name, email, message });
      toast.success("Thank you. Your note has reached the Trust.");
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" theme="dark" />
      <PageHeader
        chapter="X"
        eyebrow="Reach the Trust"
        titleLines={["Write to the", "Managing Trustee."]}
        subtitle="For seva, questions, corrections, or to contribute a photograph to the archive — please write. Every note is read."
        image="https://images.pexels.com/photos/32299890/pexels-photo-32299890.jpeg?auto=format&fit=crop&q=85&w=1200"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <Reveal className="lg:col-span-5 space-y-10">
            <div>
              <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-3">Trust</p>
              <p className="font-serif-display text-3xl md:text-4xl leading-tight">
                Shri Puri Jagannath<br />
                <span className="italic text-[#D4AF37]">Religious & Charitable Trust.</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-3">Web</p>
              <p className="text-stone-100 text-lg">purijagannathtrust.com</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-3">Facebook</p>
              <p className="text-stone-100 text-lg">Puri Jagannath Trust</p>
            </div>
            <div className="border-l-2 border-[#D4AF37] pl-5">
              <p className="font-devanagari text-2xl text-[#D4AF37]">जय जगन्नाथ</p>
              <p className="mt-2 text-stone-400 text-[13px] italic font-serif-display">
                — May the Lord be the path of your eyes.
              </p>
            </div>
          </Reveal>

          <form onSubmit={submit} className="lg:col-span-6 lg:col-start-7 space-y-6" data-testid="contact-form">
            <Field label="Your name" testId="contact-name">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-stone-700 focus:border-[#D4AF37] outline-none py-3 text-stone-100 text-lg placeholder:text-stone-600 transition-colors"
                placeholder="Śrī / Śrīmatī ..."
                data-testid="contact-name-input"
              />
            </Field>
            <Field label="Email" testId="contact-email">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-stone-700 focus:border-[#D4AF37] outline-none py-3 text-stone-100 text-lg placeholder:text-stone-600 transition-colors"
                placeholder="you@example.com"
                data-testid="contact-email-input"
              />
            </Field>
            <Field label="Message" testId="contact-message">
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full bg-transparent border-b border-stone-700 focus:border-[#D4AF37] outline-none py-3 text-stone-100 text-lg placeholder:text-stone-600 transition-colors resize-none"
                placeholder="Your note to the Trust ..."
                data-testid="contact-message-input"
              />
            </Field>
            <button
              disabled={busy}
              type="submit"
              data-testid="contact-submit"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-stone-950 text-[13px] uppercase tracking-eyebrow font-medium hover:bg-[#e6c34f] disabled:opacity-50 transition-colors"
            >
              {busy ? "Sending…" : "Send to the Trust"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, children, testId }) {
  return (
    <label className="block" data-testid={testId}>
      <span className="block text-[11px] uppercase tracking-eyebrow text-stone-400 mb-2">{label}</span>
      {children}
    </label>
  );
}
