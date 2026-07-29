import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import SmoothScroll from "@/lib/SmoothScroll";
import { AuthProvider } from "@/lib/AuthContext";
import SiteLayout from "@/components/SiteLayout";

import Home from "@/pages/Home";
import Temple from "@/pages/Temple";
import RathaYatra from "@/pages/RathaYatra";
import GitaGovinda from "@/pages/GitaGovinda";
import Jagannathastakam from "@/pages/Jagannathastakam";
import Gaudiya from "@/pages/Gaudiya";
import Vedanta from "@/pages/Vedanta";
import Acharyas from "@/pages/Acharyas";
import Nityanushtanam from "@/pages/Nityanushtanam";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <SmoothScroll>
            <ScrollTop />
            <Routes>
              {/* Admin — no site layout */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Public — with site layout */}
              <Route
                path="/*"
                element={
                  <SiteLayout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/temple" element={<Temple />} />
                      <Route path="/ratha-yatra" element={<RathaYatra />} />
                      <Route path="/gita-govinda" element={<GitaGovinda />} />
                      <Route path="/jagannathastakam" element={<Jagannathastakam />} />
                      <Route path="/gaudiya" element={<Gaudiya />} />
                      <Route path="/vedanta" element={<Vedanta />} />
                      <Route path="/acharyas" element={<Acharyas />} />
                      <Route path="/nityanushtanam" element={<Nityanushtanam />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<Home />} />
                    </Routes>
                  </SiteLayout>
                }
              />
            </Routes>
          </SmoothScroll>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
