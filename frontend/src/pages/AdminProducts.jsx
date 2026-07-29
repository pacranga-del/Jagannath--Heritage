import React, { useEffect, useRef, useState, useCallback } from "react";
import { Toaster, toast } from "sonner";
import { Upload, Trash2, Plus, Save, X } from "lucide-react";
import { api } from "../lib/api";
import { formatApiErrorDetail } from "../lib/AuthContext";

const MAX_MB = 5;
const emptyForm = { id: null, name: "", variant: "", description: "", price: "", image_data: "", is_available: true };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get("/products");
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const isEditing = !!form.id;

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) { toast.error("Please choose an image file."); return; }
    if (f.size > MAX_MB * 1024 * 1024) { toast.error(`Image must be under ${MAX_MB} MB.`); return; }
    const reader = new FileReader();
    reader.onload = () => setForm((v) => ({ ...v, image_data: reader.result }));
    reader.readAsDataURL(f);
  };

  const reset = () => {
    setForm(emptyForm);
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.price === "" || Number(form.price) < 0 || !form.image_data) {
      toast.error("Name, price and image are required.");
      return;
    }
    setBusy(true);
    const payload = {
      name: form.name.trim(),
      variant: form.variant.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      image_data: form.image_data,
      is_available: form.is_available,
    };
    try {
      if (isEditing) {
        await api.put(`/products/${form.id}`, payload);
        toast.success("Product updated.");
      } else {
        await api.post("/products", payload);
        toast.success("Product added.");
      }
      reset();
      await load();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    } finally {
      setBusy(false);
    }
  };

  const edit = (p) => {
    setForm({
      id: p.id,
      name: p.name,
      variant: p.variant || "",
      description: p.description || "",
      price: String(p.price),
      image_data: p.image_data,
      is_available: p.is_available,
    });
    if (fileRef.current) fileRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Deleted.");
      if (form.id === id) reset();
      await load();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Form */}
      <form
        onSubmit={submit}
        data-testid="admin-product-form"
        className="lg:col-span-5 border border-stone-800 p-6 md:p-8 bg-stone-950/60 space-y-5 h-fit lg:sticky lg:top-24"
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37]">
            {isEditing ? "Edit product" : "New product"}
          </p>
          {isEditing && (
            <button
              type="button"
              onClick={reset}
              data-testid="admin-product-cancel"
              className="text-[11px] uppercase tracking-eyebrow text-stone-400 hover:text-[#9F1239] flex items-center gap-1"
            >
              <X size={12} /> Cancel edit
            </button>
          )}
        </div>

        {/* Image */}
        <div>
          <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-2">Photograph</p>
          <div className="border border-dashed border-stone-700 hover:border-[#D4AF37] transition-colors p-4 min-h-[160px] flex flex-col items-center justify-center text-center">
            {form.image_data ? (
              <>
                <img src={form.image_data} alt="Preview" className="w-full max-h-[220px] object-contain" />
                <button
                  type="button"
                  onClick={() => setForm((v) => ({ ...v, image_data: "" }))}
                  data-testid="admin-product-clear-image"
                  className="mt-3 text-[11px] uppercase tracking-eyebrow text-stone-400 hover:text-[#9F1239]"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <Upload size={20} className="text-[#D4AF37] mb-2" />
                <p className="text-[12px] text-stone-400">JPG · PNG · WEBP · up to {MAX_MB} MB</p>
                <label className="mt-3 inline-block px-4 py-1.5 border border-stone-600 text-[11px] uppercase tracking-eyebrow hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Choose file
                  <input
                    ref={fileRef}
                    onChange={onFile}
                    data-testid="admin-product-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>
        </div>

        <TextField
          label="Name"
          value={form.name}
          onChange={(v) => setForm((s) => ({ ...s, name: v }))}
          placeholder="e.g. Pavithram (2-Dharbai)"
          testId="admin-product-name"
        />
        <TextField
          label="Variant"
          value={form.variant}
          onChange={(v) => setForm((s) => ({ ...s, variant: v }))}
          placeholder="e.g. Two-blade variant · optional"
          testId="admin-product-variant"
        />
        <TextField
          label="Price (₹)"
          value={form.price}
          onChange={(v) => setForm((s) => ({ ...s, price: v.replace(/[^\d.]/g, "") }))}
          placeholder="0"
          testId="admin-product-price"
          inputMode="decimal"
        />
        <label className="block">
          <span className="block text-[11px] uppercase tracking-eyebrow text-stone-400 mb-1.5">Description</span>
          <textarea
            data-testid="admin-product-description"
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            rows={4}
            className="w-full bg-transparent border border-stone-700 focus:border-[#D4AF37] outline-none py-2.5 px-3 text-stone-100 text-[14px] transition-colors resize-none"
            placeholder="Description of the item…"
          />
        </label>

        <label className="flex items-center gap-3 text-[13px] text-stone-300">
          <input
            data-testid="admin-product-available"
            type="checkbox"
            checked={form.is_available}
            onChange={(e) => setForm((s) => ({ ...s, is_available: e.target.checked }))}
            className="w-4 h-4 accent-[#D4AF37]"
          />
          <span>Available for order</span>
        </label>

        <button
          type="submit"
          disabled={busy}
          data-testid="admin-product-submit"
          className="w-full py-3.5 bg-[#D4AF37] text-stone-950 text-[12px] uppercase tracking-eyebrow font-medium hover:bg-[#e6c34f] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
        >
          {busy ? "Saving…" : isEditing ? (<><Save size={14} /> Update product</>) : (<><Plus size={14} /> Add product</>)}
        </button>
      </form>

      {/* List */}
      <div className="lg:col-span-7">
        <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-6">
          Catalog · <span className="text-[#D4AF37]">{products.length}</span>
        </p>
        {loading ? (
          <div className="border border-stone-800 py-24 text-center text-stone-500 text-[13px] uppercase tracking-eyebrow">
            Loading…
          </div>
        ) : products.length === 0 ? (
          <div className="border border-stone-800 py-24 text-center text-stone-500 text-[13px] uppercase tracking-eyebrow">
            No products yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                data-testid={`admin-product-row-${p.id}`}
                className={`flex gap-4 border p-3 bg-stone-950 transition-colors ${
                  form.id === p.id ? "border-[#D4AF37]" : "border-stone-800 hover:border-stone-600"
                }`}
              >
                <div className="w-24 h-24 bg-stone-900 overflow-hidden shrink-0">
                  <img src={p.image_data} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-eyebrow text-stone-500 mb-0.5">{p.variant || "\u00A0"}</p>
                  <h4 className="font-serif-display text-lg leading-tight tracking-tight text-stone-50 truncate">
                    {p.name}
                  </h4>
                  <p className="text-[12px] text-stone-400 line-clamp-2 mt-1">{p.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[13px] text-[#D4AF37]">₹{Number(p.price).toLocaleString("en-IN")}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => edit(p)}
                        data-testid={`admin-product-edit-${p.id}`}
                        className="text-[10px] uppercase tracking-eyebrow px-2.5 py-1 border border-stone-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(p.id)}
                        data-testid={`admin-product-delete-${p.id}`}
                        className="text-[10px] uppercase tracking-eyebrow px-2.5 py-1 border border-stone-700 hover:border-[#9F1239] hover:text-[#9F1239] transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, testId, inputMode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-eyebrow text-stone-400 mb-1.5">{label}</span>
      <input
        data-testid={testId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full bg-transparent border-b border-stone-700 focus:border-[#D4AF37] outline-none py-2 text-stone-100 placeholder:text-stone-600 transition-colors"
      />
    </label>
  );
}
