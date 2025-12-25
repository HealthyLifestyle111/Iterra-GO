



import React, { useState } from "react";
import LotusAI from "../components/LotusAI";
import { Link } from "react-router-dom";

export default function Home() {
  const [showAI, setShowAI] = useState(false);

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen relative z-10 bg-black text-white">
        {/* Hero Title / Tagline */}
        <h1
          className="text-5xl md:text-6xl font-bold text-center mb-6"
          style={{ color: "var(--champagne)", textShadow: "0 0 32px #b9875d55" }}
        >
          iTerra <span style={{ color: "var(--rosegold)" }}>Wellness</span>
        </h1>

        <p
          className="text-xl md:text-2xl text-center mb-10 max-w-2xl"
          style={{ color: "var(--bronze)" }}
        >
          Holistic wellness, ancient wisdom, and modern science — personalized for
          you. Explore essential oils, natural solutions, and AI‑powered guidance.
        </p>

        {/* Navigation Buttons (if any) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <Link to="/wellness‑intake">
            <button className="pillar-btn">Wellness Intake</button>
          </Link>
          <Link to="/services">
            <button className="pillar-btn">Explore Services</button>
          </Link>
          <Link to="/about">
            <button className="pillar-btn">About iTerra</button>
          </Link>
        </div>
      </main>

      {/* Floating Lotus AI button */}
      <button
        onClick={() => setShowAI(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-4 rounded-full shadow-lg"
        style={{
          background: "linear-gradient(90deg, var(--bronze), var(--rosegold))",
          color: "#fff",
          fontWeight: 700,
          fontSize: 20,
          boxShadow: "0 4px 32px #b9875d44",
          border: 0,
          cursor: "pointer",
          transition: "transform 0.1s",
        }}
      >
        <span style={{ fontSize: 28 }}>🪷</span> Lotus AI
      </button>

      {/* LotusAI modal / full screen overlay */}
      {showAI && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(18,8,6,0.92)" }}>
          <LotusAI onClose={() => setShowAI(false)} />
        </div>
      )}

      {/* Gold Dust effect — if included via CSS/global script */}
      {/* That effect was implemented in the full app layout, not in this local file */}
    </>
  );
}