import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth, formatApiErrorDetail } from "../lib/AuthContext";
import { Toaster, toast } from "sonner";

export default function AdminLogin() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  if (user && user.role === "admin") return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(email, password);
      toast.success("Jai Jagannātha — signed in.");
      nav("/admin", { replace: true });
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-stone-950 relative overflow-hidden">
      <Toaster richColors position="top-center" theme="dark" />
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="https://images.pexels.com/photos/31969419/pexels-photo-31969419.jpeg?auto=format&fit=crop&q=85&w=1800"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-stone-950/70" />
      <div className="absolute inset-0 glow-gold" />

      <form
        onSubmit={submit}
        data-testid="admin-login-form"
        className="relative w-full max-w-md mx-6 p-8 md:p-10 bg-stone-950/80 backdrop-blur-xl border border-stone-800"
      >
        <p className="text-[11px] uppercase tracking-eyebrow text-[#D4AF37] mb-3">Trust · Admin</p>
        <h1 className="font-serif-display text-4xl md:text-5xl leading-tight tracking-tight mb-2">
          Sign in.
        </h1>
        <p className="font-serif-display italic text-stone-400 mb-8">Managing Trustee only.</p>

        <label className="block mb-6">
          <span className="block text-[11px] uppercase tracking-eyebrow text-stone-400 mb-2">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-stone-700 focus:border-[#D4AF37] outline-none py-3 text-stone-100 text-lg placeholder:text-stone-600 transition-colors"
            placeholder="admin@..."
            data-testid="admin-email-input"
          />
        </label>
        <label className="block mb-8">
          <span className="block text-[11px] uppercase tracking-eyebrow text-stone-400 mb-2">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-stone-700 focus:border-[#D4AF37] outline-none py-3 text-stone-100 text-lg placeholder:text-stone-600 transition-colors"
            placeholder="••••••••"
            data-testid="admin-password-input"
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          data-testid="admin-login-submit"
          className="w-full py-4 bg-[#D4AF37] text-stone-950 text-[13px] uppercase tracking-eyebrow font-medium hover:bg-[#e6c34f] disabled:opacity-50 transition-colors"
        >
          {busy ? "Signing in…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
