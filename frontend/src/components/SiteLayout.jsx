import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 grain relative overflow-x-hidden">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
