import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../lib/content";
import { useAuth } from "../lib/AuthContext";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  return (
    <header
      data-testid="site-header"
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-stone-950/70 border-b border-stone-800"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <Link to="/" data-testid="nav-brand" className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-[#D4AF37]/90 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-stone-950" />
          </span>
          <span className="font-serif-display text-[15px] tracking-tight leading-none">
            Puri Jagannath <span className="italic text-stone-400">Trust</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-5">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={l.testId}
              className={({ isActive }) =>
                `text-[11px] uppercase tracking-eyebrow font-medium whitespace-nowrap transition-opacity link-underline ${
                  isActive ? "text-[#D4AF37]" : "text-stone-300 hover:text-stone-50"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user && user.role === "admin" ? (
            <Link
              to="/admin"
              data-testid="nav-admin"
              className="hidden md:inline-block text-[11px] uppercase tracking-eyebrow border border-[#D4AF37]/50 text-[#D4AF37] px-3 py-1.5 hover:bg-[#D4AF37] hover:text-stone-950 transition-colors"
            >
              Admin
            </Link>
          ) : (
            <Link
              to="/admin/login"
              data-testid="nav-admin-login"
              className="hidden md:inline-block text-[11px] uppercase tracking-eyebrow text-stone-400 hover:text-stone-100"
            >
              Sign in
            </Link>
          )}
          <button
            data-testid="nav-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden text-stone-100"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden border-t border-stone-800 bg-stone-950/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6 grid grid-cols-2 gap-x-6 gap-y-4">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  data-testid={`${l.testId}-mobile`}
                  className={({ isActive }) =>
                    `text-[13px] uppercase tracking-eyebrow font-medium ${
                      isActive || location.pathname === l.to
                        ? "text-[#D4AF37]"
                        : "text-stone-300"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              {user && user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  data-testid="nav-admin-mobile"
                  className="text-[13px] uppercase tracking-eyebrow font-medium text-[#D4AF37]"
                >
                  Admin
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
