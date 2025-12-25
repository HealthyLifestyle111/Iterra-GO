




import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LotusAI from "../components/LotusAI";

// Static data (no base44)
const masculinePillars = [
  { title: "Warrior", subtitle: "Strength & Endurance" },
  { title: "Agile Body", subtitle: "Mobility & Recovery" },
  { title: "Presence", subtitle: "Focus & Calm" },
  { title: "Legacy", subtitle: "Purpose & Longevity" },
];

const femininePillars = [
  { title: "Sovereign", subtitle: "Hormone Harmony" },
  { title: "Flowing Form", subtitle: "Body Strength" },
  { title: "Radiance", subtitle: "Skin & Glow" },
  { title: "Eternal", subtitle: "Graceful Aging" },
];

const petContent = {
  dogs: ["Calm", "Mobility", "Skin & Coat"],
  cats: ["Calm", "Digestion", "Joint Support"],
  horses: ["Hoof Care", "Calm", "Recovery"],
  parrots: ["Avian Wellness"],
  chickens: ["Poultry Balance"],
};

const agelessContent = {
  children: ["Growth Support", "Immune Boost"],
  matureWomen: ["Hormone Balance", "Energy"],
  matureMen: ["Heart Health", "Joint Comfort"],
};

export default function Home() {
  const navigate = useNavigate();
  const [showAI, setShowAI] = useState(false);

  const [showMasculine, setShowMasculine] = useState(false);
  const [showFeminine, setShowFeminine] = useState(false);
  const [showPetHarmony, setShowPetHarmony] = useState(false);
  const [showAgeless, setShowAgeless] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMasculine(false);
        setShowFeminine(false);
        setShowPetHarmony(false);
        setShowAgeless(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen relative px-6 py-12 bg-black text-[var(--champagne)]">
      {/* Gold Dust + Flower of Life Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 opacity-10 w-[600px] h-[600px] bg-[url('/flower-of-life.svg')] bg-center bg-no-repeat animate-spin-slow"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: "float 20s linear infinite",
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          iTerra<span className="text-[var(--rosegold)]">™</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-[var(--bronze)] max-w-2xl mx-auto">
          Holistic wellness, ancient wisdom, and modern science — personalized for you.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <button
          onClick={() => navigate("/WellnessIntake")}
          className="btn-main"
        >
          🧠 Wellness Intake
        </button>
        <button
          onClick={() => setShowMasculine(!showMasculine)}
          className="btn-main"
        >
          🧘‍♂️ Masculine Vitality
        </button>
        <button
          onClick={() => setShowFeminine(!showFeminine)}
          className="btn-main"
        >
          💃 Feminine Energy
        </button>
        <button
          onClick={() => setShowPetHarmony(!showPetHarmony)}
          className="btn-main"
        >
          🐾 Pet Harmony
        </button>
        <button
          onClick={() => navigate("/HomeEssentials")}
          className="btn-main"
        >
          🏠 Home Essentials
        </button>
        <button
          onClick={() => setShowAgeless(!showAgeless)}
          className="btn-main"
        >
          👵 Ageless Vitality
        </button>
        <button
          onClick={() => navigate("/LeadershipWisdom")}
          className="btn-main"
        >
          🛡 Leadership & Wisdom
        </button>
      </div>

      {/* Dropdown Panels */}
      <div className="relative z-10 mt-8">
        {showMasculine && (
          <div ref={dropdownRef} className="panel">
            {masculinePillars.map((p, i) => (
              <div key={i} className="p-2 text-[var(--rosegold)]">
                {p.title} — {p.subtitle}
              </div>
            ))}
          </div>
        )}
        {showFeminine && (
          <div ref={dropdownRef} className="panel">
            {femininePillars.map((p, i) => (
              <div key={i} className="p-2 text-[var(--rosegold)]">
                {p.title} — {p.subtitle}
              </div>
            ))}
          </div>
        )}
        {showPetHarmony && (
          <div ref={dropdownRef} className="panel">
            {Object.entries(petContent).map(([type, arr], i) => (
              <div key={i} className="p-2 text-[var(--rosegold)]">
                {type}: {arr.join(", ")}
              </div>
            ))}
          </div>
        )}
        {showAgeless && (
          <div ref={dropdownRef} className="panel">
            {Object.entries(agelessContent).map(([age, arr], i) => (
              <div key={i} className="p-2 text-[var(--rosegold)]">
                {age}: {arr.join(", ")}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Lotus AI */}
      <button
        onClick={() => setShowAI(true)}
        className="btn-ai"
      >
        🪷 Lotus AI
      </button>

      {showAI && (
        <div className="ai-modal">
          <button className="close-ai" onClick={() => setShowAI(false)}>
            ✕
          </button>
          <LotusAI />
        </div>
      )}

      {/* Styles */}
      <style>{`
        .btn-main {
          padding: 14px;
          background: linear-gradient(180deg, rgba(60,26,20,0.6), rgba(40,16,12,0.45));
          color: var(--champagne);
          font-weight: 600;
          border: 1px solid var(--bronze);
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-main:hover {
          background: rgba(60,26,20,0.75);
        }
        .panel {
          background: rgba(18,8,6,0.85);
          border: 1px solid var(--rosegold);
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 12px;
        }
        .btn-ai {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 14px 20px;
          background: linear-gradient(90deg, var(--bronze), var(--rosegold));
          color: #fff;
          font-size: 18px;
          border-radius: 999px;
          cursor: pointer;
        }
        .ai-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .close-ai {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 24px;
          background: none;
          border: none;
          color: var(--champagne);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}