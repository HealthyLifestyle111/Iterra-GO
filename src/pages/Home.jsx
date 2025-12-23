

import React, { useState } from "react";
import LotusAI from "../components/LotusAI";

export default function Home() {
  const [showAI, setShowAI] = useState(false);
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6" style={{ color: 'var(--champagne)', textShadow: '0 0 32px #b9875d55' }}>
          iTerra <span style={{ color: 'var(--rosegold)' }}>Wellness</span>
        </h1>
        <p className="text-xl md:text-2xl text-center mb-10 max-w-2xl" style={{ color: 'var(--bronze)' }}>
          Holistic wellness, ancient wisdom, and modern science—personalized for you. Explore essential oils, natural solutions, and AI-powered guidance.
        </p>
        <button
          onClick={() => setShowAI(true)}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-4 rounded-full shadow-lg"
          style={{
            background: 'linear-gradient(90deg, var(--bronze), var(--rosegold))',
            color: '#fff',
            fontWeight: 700,
            fontSize: 20,
            boxShadow: '0 4px 32px #b9875d44',
            border: 0,
            cursor: 'pointer',
            transition: 'transform 0.1s',
          }}
        >
          <span style={{ fontSize: 28 }}>🪷</span> Lotus AI
        </button>
        {showAI && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(18,8,6,0.92)' }}>
            <LotusAI onClose={() => setShowAI(false)} />
          </div>
        )}
      </main>
    </>
  );
}