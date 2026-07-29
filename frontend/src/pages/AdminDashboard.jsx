import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { LogOut, Upload, Trash2 } from "lucide-react";
import { useAuth, formatApiErrorDetail } from "../lib/AuthContext";
import { api } from "../lib/api";

const CATEGORY_OPTIONS = [
  { slug: "rath-yatra", label: "Rath Yatra" },
  { slug: "daily-darshan", label: "Daily Darshan" },
  { slug: "charitable-activities", label: "Charitable Activities" },
  { slug: "festivals", label: "Festivals" },
];

const MAX_MB = 5;

export default function AdminDashboard() {
  const { user, ready, logout } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState("rath-yatra");
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState("all");
  const fileRef = useRef(null);

  const load = useCallback(async () => {
    const { data } = await api.get("/gallery", { params: { category: filter } });
    setPhotos(data);
  }, [filter]);

  useEffect(() => { if (user && user.role === "admin") load(); }, [user, load]);

  if (!ready) {
    return <div className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-500 text-[13px] uppercase tracking-eyebrow">Loading…</div>;
  }
  if (!user || user.role !== "admin") return <Navigate to="/admin/login" replace />;

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) { toast.error("Please choose an image file."); return; }
    if (f.size > MAX_MB * 1024 * 1024) { toast.error(`Image must be under ${MAX_MB} MB.`); return; }
    const reader = new FileReader();
    reader.onload = () => { setPreview(reader.result); setFileName(f.name); };
    reader.readAsDataURL(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!preview) { toast.error("Please choose a photograph."); return; }
    setBusy(true);
    try {
      await api.post("/gallery", { caption, category, image_data: preview });
      toast.success("Photograph added to the archive.");
      setCaption(""); setPreview(null); setFileName("");
      if (fileRef.current) fileRef.current.value = "";
      await load();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Remove this photograph from the archive?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success("Removed.");
      await load();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    }
  };

  const filteredCount = photos.length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Toaster richColors position="top-center" theme="dark" />
      {/* Top bar */}
      <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" data-testid="admin-brand" className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-[#D4AF37]" />
              <span className="font-serif-display text-[15px]">Puri Jagannath <em className="italic text-stone-400">· Admin</em></span>
            </Link>
            <span className="hidden md:inline text-[11px] uppercase tracking-eyebrow text-stone-500">
              {user.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/gallery"
              data-testid="admin-view-gallery"
              className="text-[11px] uppercase tracking-eyebrow text-stone-300 hover:text-[#D4AF37] transition-colors"
            >
              View public gallery →
            </Link>
            <button
              onClick={logout}
              data-testid="admin-logout"
              className="text-[11px] uppercase tracking-eyebrow text-stone-300 hover:text-[#9F1239] transition-colors flex items-center gap-2"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 md:px-10 py-10 md:py-14">
        {/* Heading */}
        <div className="mb-10 md:mb-14">
          <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-3">Gallery Manager</p>
          <h1 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
            Add, caption, and curate<br /><span className="italic">the archive.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Upload form */}
          <form
            onSubmit={submit}
            data-testid="admin-upload-form"
            className="lg:col-span-5 border border-stone-800 p-6 md:p-8 bg-stone-950/60 space-y-6 h-fit sticky top-24"
          >
            <div>
              <p className="text-[11px] uppercase tracking-eyebrow text-stone-400 mb-3">Photograph</p>
              <div className="border border-dashed border-stone-700 hover:border-[#D4AF37] transition-colors p-4 min-h-[200px] flex flex-col items-center justify-center text-center">
                {preview ? (
                  <div className="w-full">
                    <img src={preview} alt="Preview" className="w-full max-h-[260px] object-contain" />
                    <p className="mt-3 text-[12px] text-stone-400 truncate">{fileName}</p>
                    <button
                      type="button"
                      onClick={() => { setPreview(null); setFileName(""); if (fileRef.current) fileRef.current.value = ""; }}
                      data-testid="admin-clear-preview"
                      className="mt-3 text-[11px] uppercase tracking-eyebrow text-stone-400 hover:text-[#9F1239]"
                    >
                      Choose another
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={22} className="text-[#D4AF37] mb-3" />
                    <p className="text-[13px] text-stone-300 mb-1">Drop or select an image</p>
                    <p className="text-[11px] text-stone-500">JPG · PNG · WEBP · up to {MAX_MB} MB</p>
                    <label htmlFor="admin-file-input" className="mt-4 inline-block px-5 py-2 border border-stone-600 text-[11px] uppercase tracking-eyebrow hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer">
                      Choose file
                    </label>
                  </>
                )}
                <input
                  id="admin-file-input"
                  ref={fileRef}
                  onChange={onFile}
                  data-testid="admin-file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <label className="block">
              <span className="block text-[11px] uppercase tracking-eyebrow text-stone-400 mb-2">Caption</span>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={280}
                data-testid="admin-caption-input"
                className="w-full bg-transparent border-b border-stone-700 focus:border-[#D4AF37] outline-none py-3 text-stone-100 placeholder:text-stone-600 transition-colors"
                placeholder="e.g. Morning aarti · Bada Danda"
              />
            </label>

            <label className="block">
              <span className="block text-[11px] uppercase tracking-eyebrow text-stone-400 mb-2">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                data-testid="admin-category-select"
                className="w-full bg-stone-900 border border-stone-700 focus:border-[#D4AF37] outline-none py-3 px-4 text-stone-100 transition-colors"
              >
                {CATEGORY_OPTIONS.map((o) => (
                  <option key={o.slug} value={o.slug}>{o.label}</option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              disabled={busy || !preview}
              data-testid="admin-upload-submit"
              className="w-full py-4 bg-[#D4AF37] text-stone-950 text-[12px] uppercase tracking-eyebrow font-medium hover:bg-[#e6c34f] disabled:opacity-40 transition-colors"
            >
              {busy ? "Uploading…" : "Add to the archive"}
            </button>
          </form>

          {/* Existing photos */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-[11px] uppercase tracking-eyebrow text-stone-400">
                In archive · <span className="text-[#D4AF37]">{filteredCount}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <FilterBtn active={filter === "all"} onClick={() => setFilter("all")} testId="admin-filter-all">All</FilterBtn>
                {CATEGORY_OPTIONS.map((c) => (
                  <FilterBtn
                    key={c.slug}
                    active={filter === c.slug}
                    onClick={() => setFilter(c.slug)}
                    testId={`admin-filter-${c.slug}`}
                  >
                    {c.label}
                  </FilterBtn>
                ))}
              </div>
            </div>

            {photos.length === 0 ? (
              <div className="border border-stone-800 py-24 text-center text-stone-500 text-[13px] uppercase tracking-eyebrow">
                No photographs yet in this category.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((p) => (
                  <div
                    key={p.id}
                    data-testid={`admin-photo-${p.id}`}
                    className="group relative aspect-square overflow-hidden bg-stone-900 border border-stone-800"
                  >
                    <img src={p.image_data} alt={p.caption} className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-950/90 to-transparent">
                      <p className="text-[9px] uppercase tracking-eyebrow text-[#D4AF37] mb-1">
                        {p.category_label}
                      </p>
                      <p className="text-[12px] text-stone-100 line-clamp-2 leading-snug">
                        {p.caption || "—"}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(p.id)}
                      data-testid={`admin-delete-${p.id}`}
                      className="absolute top-2 right-2 p-2 bg-stone-950/80 border border-stone-700 text-stone-300 hover:text-[#9F1239] hover:border-[#9F1239] opacity-0 group-hover:opacity-100 transition-all"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function FilterBtn({ active, onClick, children, testId }) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className={`text-[10px] uppercase tracking-eyebrow px-3 py-1.5 border transition-colors ${
        active
          ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5"
          : "border-stone-800 text-stone-300 hover:border-stone-600"
      }`}
    >
      {children}
    </button>
  );
}
