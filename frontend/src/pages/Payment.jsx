import React, { useEffect, useState } from "react";
import { Copy, Check, MessageCircle } from "lucide-react";
import { toast, Toaster } from "sonner";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { api } from "../lib/api";

// Simple SVG placeholder QR pattern (looks like a QR but obviously a placeholder)
const PLACEHOLDER_QR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='400' height='400'>
  <rect width='200' height='200' fill='#ffffff'/>
  <g fill='#0C0A09'>
    ${Array.from({ length: 20 })
      .map((_, r) =>
        Array.from({ length: 20 })
          .map((_, c) => {
            // deterministic pseudo-random pattern
            const on = ((r * 31 + c * 17 + r * c) % 7) < 3 || (r < 3 && c < 3) || (r < 3 && c > 16) || (r > 16 && c < 3);
            return on ? `<rect x='${c * 10}' y='${r * 10}' width='10' height='10'/>` : "";
          })
          .join("")
      )
      .join("")}
    <!-- position markers -->
    <rect x='0' y='0' width='30' height='30' fill='#0C0A09'/><rect x='5' y='5' width='20' height='20' fill='#fff'/><rect x='10' y='10' width='10' height='10' fill='#0C0A09'/>
    <rect x='170' y='0' width='30' height='30' fill='#0C0A09'/><rect x='175' y='5' width='20' height='20' fill='#fff'/><rect x='180' y='10' width='10' height='10' fill='#0C0A09'/>
    <rect x='0' y='170' width='30' height='30' fill='#0C0A09'/><rect x='5' y='175' width='20' height='20' fill='#fff'/><rect x='10' y='180' width='10' height='10' fill='#0C0A09'/>
  </g>
  <rect x='84' y='84' width='32' height='32' fill='#D4AF37'/>
  <text x='100' y='106' text-anchor='middle' fill='#0C0A09' font-family='serif' font-size='18' font-weight='700'>ॐ</text>
</svg>`.trim());

function upiIntentUrl(upiId, payeeName, amount) {
  if (!upiId) return "#";
  const params = new URLSearchParams({
    pa: upiId,
    pn: payeeName || "Puri Jagannath Trust",
    cu: "INR",
  });
  if (amount) params.set("am", String(amount));
  return `upi://pay?${params.toString()}`;
}

function formatWhatsAppUrl(phone, message) {
  const clean = (phone || "").replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export default function Payment() {
  const [settings, setSettings] = useState({ whatsapp_number: "", upi_id: "", upi_qr_image: "", payee_name: "" });
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.get("/settings").then(({ data }) => setSettings(data));
  }, []);

  const qrSrc = settings.upi_qr_image || PLACEHOLDER_QR;
  const usingPlaceholder = !settings.upi_qr_image;

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(settings.upi_id);
      setCopied(true);
      toast.success("UPI ID copied.");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed — please select and copy manually.");
    }
  };

  const confirmMsg = `Jai Jagannātha 🙏\n\nI've made a UPI payment to the Trust${amount ? ` of ₹${amount}` : ""}. Please find the transaction details attached / below.\n\nUPI ID used: ${settings.upi_id}\n\nThank you.`;

  return (
    <>
      <Toaster richColors position="top-center" theme="dark" />
      <PageHeader
        chapter="XII"
        eyebrow="Payment · UPI"
        titleLines={["Scan, pay,", "and send confirmation."]}
        subtitle="Scan the QR with any UPI app (GPay, PhonePe, Paytm, BHIM), pay to the Trust's UPI ID, and share a screenshot on WhatsApp for confirmation."
      />

      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* QR */}
          <Reveal className="lg:col-span-6">
            <div className="relative bg-stone-950 border border-stone-800 p-6 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37]">
                  Scan to pay
                </p>
                <p className="text-[11px] uppercase tracking-eyebrow text-stone-500">
                  {usingPlaceholder ? "Placeholder QR" : "Live QR"}
                </p>
              </div>

              <div className="relative bg-white p-6 md:p-10 aspect-square max-w-[520px] mx-auto">
                <img
                  data-testid="payment-qr"
                  src={qrSrc}
                  alt="UPI QR code"
                  className="w-full h-full object-contain"
                />
                {usingPlaceholder && (
                  <div className="absolute inset-x-6 bottom-3 text-center text-[10px] uppercase tracking-eyebrow text-stone-500">
                    Trust to upload the actual UPI QR image
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  data-testid="payment-upi-intent"
                  href={upiIntentUrl(settings.upi_id, settings.payee_name, amount)}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#D4AF37] text-stone-950 text-[12px] uppercase tracking-eyebrow font-medium hover:bg-[#e6c34f] transition-colors"
                >
                  Open in UPI app
                </a>
                <p className="text-[11px] uppercase tracking-eyebrow text-stone-500">
                  or scan the QR above
                </p>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.1} className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-3">UPI ID</p>
              <div className="flex items-center gap-3 border-b border-stone-700 pb-3">
                <p
                  data-testid="payment-upi-id"
                  className="font-serif-display text-2xl md:text-4xl text-[#D4AF37] tracking-tight break-all"
                >
                  {settings.upi_id || "—"}
                </p>
                <button
                  onClick={copyUpi}
                  data-testid="payment-copy-upi"
                  className="ml-auto text-[11px] uppercase tracking-eyebrow flex items-center gap-2 px-3 py-2 border border-stone-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-3">Payee</p>
              <p className="font-serif-display text-2xl md:text-3xl text-stone-100 leading-tight">
                {settings.payee_name || "Shri Puri Jagannath Religious & Charitable Trust"}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-3">
                Amount <span className="text-stone-600">· optional</span>
              </p>
              <div className="flex items-baseline gap-3 border-b border-stone-700 pb-2">
                <span className="font-serif-display text-3xl text-[#D4AF37]">₹</span>
                <input
                  data-testid="payment-amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                  placeholder="0"
                  inputMode="decimal"
                  className="flex-1 bg-transparent outline-none text-3xl md:text-4xl font-serif-display text-stone-100 placeholder:text-stone-700"
                />
              </div>
              <p className="mt-2 text-[12px] text-stone-500">
                Leaving it blank lets you enter the amount inside your UPI app.
              </p>
            </div>

            <div className="pt-6 border-t border-stone-800">
              <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-4">
                After paying, please share the screenshot
              </p>
              <a
                data-testid="payment-confirm-whatsapp"
                href={formatWhatsAppUrl(settings.whatsapp_number, confirmMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 text-[#4ade80] border border-[#25D366]/50 text-[12px] uppercase tracking-eyebrow font-medium hover:bg-[#25D366] hover:text-stone-950 transition-colors"
              >
                <MessageCircle size={16} /> Confirm on WhatsApp
              </a>
            </div>

            <div className="pt-6 border-l-2 border-[#9F1239] pl-5">
              <p className="text-[13px] text-stone-400 leading-relaxed">
                <strong className="text-stone-100">Note:</strong> This is a devotional trust payment page. Please retain your UPI transaction reference for your records. For queries, write to the Trust via WhatsApp above.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
