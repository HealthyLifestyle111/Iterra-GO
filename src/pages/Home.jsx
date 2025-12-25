

import React, { useState } from "react";
import LotusAI from "../components/LotusAI";

export default function Home() {

  import React, { useState } from "react";
  import LotusAI from "../components/LotusAI";
  import { Link } from "react-router-dom";

  export default function Home() {
    const [showAI, setShowAI] = useState(false);
    const [selectedPillar, setSelectedPillar] = useState(null);

    const masculinePillars = [
      "Vitality Boost", "Hormone Balance", "Strength & Stamina", "Mood Support"
    ];

    const femininePillars = [
      "Radiant Beauty", "Emotional Harmony", "Hormonal Support", "Fertility & Cycles"
    ];

    const agelessContent = [
      "Longevity Essentials", "Memory & Focus", "Energy & Mobility", "Restful Sleep"
    ];

    const petContent = [
      "Calm & Anxiety", "Mobility", "Skin & Coat", "Digestive Support", "Essential Oils for Dogs",
      "Essential Oils for Cats", "Horse Wellness", "Parrot Harmony", "Chicken Coop Balance"
    ];

    const foundationalResources = [
      "Nutrition & Supplements", "Breathwork", "Daily Rituals", "Detox & Cleanse"
    ];

    const renderDropdown = (title, items) => (
      <div className="mt-4 p-4 border rounded-xl bg-black/40 backdrop-blur-md border-[var(--bronze)]/30">
        <h3 className="text-xl font-semibold text-[var(--champagne)] mb-3">{title}</h3>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="text-[var(--rosegold)]">{item}</li>
          ))}
        </ul>
      </div>
    );

    return (
      <div className="min-h-screen px-4 py-10 md:px-12 bg-black relative">
        <div className="absolute inset-0 bg-[url('/gold-dust.png')] bg-cover opacity-10 pointer-events-none z-0" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--champagne)] mb-4">
            iTerra <span className="text-[var(--rosegold)]">Wellness</span>
          </h1>
          <p className="text-xl text-[var(--bronze)] max-w-2xl mx-auto mb-8">
            Holistic wellness, ancient wisdom, and modern science—personalized for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <button onClick={() => setSelectedPillar("Wellness Intake")} className="pillar-btn">Wellness Intake</button>
            <button onClick={() => setSelectedPillar("Masculine Vitality")} className="pillar-btn">Masculine Vitality</button>
            <button onClick={() => setSelectedPillar("Feminine Energy")} className="pillar-btn">Feminine Energy</button>
            <button onClick={() => setSelectedPillar("Pet Harmony")} className="pillar-btn">Pet Harmony</button>
            <button onClick={() => setSelectedPillar("Ageless Vitality")} className="pillar-btn">Ageless Vitality</button>
            <button onClick={() => setSelectedPillar("Foundational Resources")} className="pillar-btn">Home Essentials</button>
            <button onClick={() => setSelectedPillar(null)} className="pillar-btn">Clear</button>
          </div>

          {/* Dropdowns */}
          <div className="mt-10">
            {selectedPillar === "Masculine Vitality" && renderDropdown("Masculine Vitality", masculinePillars)}
            {selectedPillar === "Feminine Energy" && renderDropdown("Feminine Energy", femininePillars)}
            {selectedPillar === "Pet Harmony" && renderDropdown("Pet Harmony", petContent)}
            {selectedPillar === "Ageless Vitality" && renderDropdown("Ageless Vitality", agelessContent)}
            {selectedPillar === "Foundational Resources" && renderDropdown("Home Essentials", foundationalResources)}
            {selectedPillar === "Wellness Intake" && (
              <div className="mt-4">
                <Link to="/WellnessIntake" className="text-[var(--rosegold)] underline text-lg">
                  Start Your Personalized Wellness Intake →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Lotus AI Button */}
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
          }}
        >
          <span style={{ fontSize: 28 }}>🪷</span> Lotus AI
        </button>

        {showAI && (
          <div className="fixed inset-0 z-50 bg-black/80">
            <LotusAI onClose={() => setShowAI(false)} />
          </div>
        )}
      </div>
    );
  }