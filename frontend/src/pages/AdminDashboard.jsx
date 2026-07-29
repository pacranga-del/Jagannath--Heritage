import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Toaster } from "sonner";
import { LogOut } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import AdminGallery from "./AdminGallery";
import AdminProducts from "./AdminProducts";
import AdminSettings from "./AdminSettings";

const TABS = [
  { key: "gallery", label: "Gallery", testId: "admin-tab-gallery" },
  { key: "products", label: "Marketplace", testId: "admin-tab-products" },
  { key: "settings", label: "Settings", testId: "admin-tab-settings" },
];

export default function AdminDashboard() {
  const { user, ready, logout } = useAuth();
  const [tab, setTab] = useState("gallery");

  if (!ready) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-500 text-[13px] uppercase tracking-eyebrow">
        Loading…
      </div>
    );
  }
  if (!user || user.role !== "admin") return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Toaster richColors position="top-center" theme="dark" />
      {/* Top bar */}
      <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" data-testid="admin-brand" className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-[#D4AF37]" />
              <span className="font-serif-display text-[15px]">
                Puri Jagannath <em className="italic text-stone-400">· Admin</em>
              </span>
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
              View site →
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
          <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-3">Admin</p>
          <h1 className="font-serif-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
            Manage the archive,<br /><span className="italic">the catalog, and the trust.</span>
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-stone-800 mb-10">
          {TABS.map((t) => (
            <button
              key={t.key}
              data-testid={t.testId}
              onClick={() => setTab(t.key)}
              className={`text-[12px] uppercase tracking-eyebrow px-5 py-3 -mb-px border-b-2 transition-colors ${
                tab === t.key
                  ? "border-[#D4AF37] text-[#D4AF37]"
                  : "border-transparent text-stone-400 hover:text-stone-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "gallery" && <AdminGallery />}
        {tab === "products" && <AdminProducts />}
        {tab === "settings" && <AdminSettings />}
      </main>
    </div>
  );
}
