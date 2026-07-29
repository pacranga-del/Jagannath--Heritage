import React, { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { Upload, Save } from "lucide-react";
import { api } from "../lib/api";
import { formatApiErrorDetail } from "../lib/AuthContext";

const MAX_MB = 2;

export default function AdminSettings() {
  const [form, setForm] = useState({
    whatsapp_number: "",
    upi_id: "",
    payee_name: "",
    upi_qr_image: "",
  });
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    api.get("/settings").then(({ data }) => setForm({
      whatsapp_number: data.whatsapp_number || "",
      upi_id: data.upi_id || "",
      payee_name: data.payee_name || "",
      upi_qr_image: data.upi_qr_image || "",
    }));
  }, []);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) { toast.error("Please choose an image."); return; }
    if (f.size > MAX_MB * 1024 * 1024) { toast.error(`Image must be under ${MAX_MB} MB.`); return; }
    const reader = new FileReader();
    reader.onload = () => setForm((v) => ({ ...v, upi_qr_image: reader.result }));
    reader.readAsDataURL(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.put("/settings", form);
      toast.success("Settings saved.");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} data-testid="admin-settings-form" className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-6 space-y-6">
        <div>
          <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-2">WhatsApp</p>
          <label className="block">
            <span className="block text-[11px] uppercase tracking-eyebrow text-stone-400 mb-1.5">
              WhatsApp number <span className="text-stone-600">· with country code, no + or spaces</span>
            </span>
            <input
              data-testid="admin-settings-whatsapp"
              value={form.whatsapp_number}
              onChange={(e) => setForm((s) => ({ ...s, whatsapp_number: e.target.value.replace(/\D/g, "").slice(0, 20) }))}
              placeholder="919999999999"
              className="w-full bg-transparent border-b border-stone-700 focus:border-[#D4AF37] outline-none py-2.5 text-stone-100 placeholder:text-stone-600 transition-colors"
            />
          </label>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-2">UPI</p>
          <label className="block mb-4">
            <span className="block text-[11px] uppercase tracking-eyebrow text-stone-400 mb-1.5">UPI ID</span>
            <input
              data-testid="admin-settings-upi-id"
              value={form.upi_id}
              onChange={(e) => setForm((s) => ({ ...s, upi_id: e.target.value }))}
              placeholder="trust@upi"
              className="w-full bg-transparent border-b border-stone-700 focus:border-[#D4AF37] outline-none py-2.5 text-stone-100 placeholder:text-stone-600 transition-colors"
            />
          </label>
          <label className="block">
            <span className="block text-[11px] uppercase tracking-eyebrow text-stone-400 mb-1.5">Payee name</span>
            <input
              data-testid="admin-settings-payee"
              value={form.payee_name}
              onChange={(e) => setForm((s) => ({ ...s, payee_name: e.target.value }))}
              placeholder="Shri Puri Jagannath Trust"
              className="w-full bg-transparent border-b border-stone-700 focus:border-[#D4AF37] outline-none py-2.5 text-stone-100 placeholder:text-stone-600 transition-colors"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={busy}
          data-testid="admin-settings-submit"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-stone-950 text-[12px] uppercase tracking-eyebrow font-medium hover:bg-[#e6c34f] disabled:opacity-40 transition-colors"
        >
          {busy ? "Saving…" : (<><Save size={14} /> Save settings</>)}
        </button>
      </div>

      <div className="lg:col-span-6">
        <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-3">UPI QR image</p>
        <p className="text-[13px] text-stone-400 mb-4 leading-relaxed">
          Upload a square QR image (from your UPI app's "Show QR" screen). Shown on the public Payment page.
        </p>
        <div className="border border-dashed border-stone-700 hover:border-[#D4AF37] transition-colors p-6 min-h-[280px] flex flex-col items-center justify-center text-center">
          {form.upi_qr_image ? (
            <>
              <div className="bg-white p-4 w-full max-w-[280px] aspect-square">
                <img src={form.upi_qr_image} alt="QR preview" className="w-full h-full object-contain" />
              </div>
              <button
                type="button"
                onClick={() => setForm((s) => ({ ...s, upi_qr_image: "" }))}
                data-testid="admin-settings-clear-qr"
                className="mt-4 text-[11px] uppercase tracking-eyebrow text-stone-400 hover:text-[#9F1239]"
              >
                Remove
              </button>
            </>
          ) : (
            <>
              <Upload size={24} className="text-[#D4AF37] mb-3" />
              <p className="text-[13px] text-stone-300 mb-1">Upload UPI QR</p>
              <p className="text-[11px] text-stone-500">PNG or JPG · under {MAX_MB} MB</p>
              <label className="mt-4 inline-block px-5 py-2 border border-stone-600 text-[11px] uppercase tracking-eyebrow hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer">
                Choose file
                <input
                  ref={fileRef}
                  onChange={onFile}
                  data-testid="admin-settings-qr-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
