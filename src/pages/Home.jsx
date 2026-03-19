import React, { useEffect, useRef, useState } from "react";

export default function IterraVitalityDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFeminineDropdown, setShowFeminineDropdown] = useState(false);
  const [showAgelessDropdown, setShowAgelessDropdown] = useState(false);
  const [showPetDropdown, setShowPetDropdown] = useState(false);
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const [selectedAgelessCategory, setSelectedAgelessCategory] = useState(null);
  const [selectedAgelessPillar, setSelectedAgelessPillar] = useState(null);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [selectedPetPillar, setSelectedPetPillar] = useState(null);
  const [selectedMasculinePillar, setSelectedMasculinePillar] = useState(null);
  const [selectedFemininePillar, setSelectedFemininePillar] = useState(null);
  const [selectedHomePillar, setSelectedHomePillar] = useState(null);
  const triggerRef = useRef(null);
  const doterraBaseUrl = "https://my.doterra.com/jennawilliams1/p/";
  const navigateTo = (path) => { if (typeof window !== "undefined") window.location.assign(path); };
  const openLink = (url) => { if (typeof window !== "undefined") window.open(url, '_blank'); };

  useEffect(() => {
    function makeDust() {
      const d = document.createElement("div");
      d.className = "gold-dust";
      d.style.left = Math.random() * 100 + "vw";
      d.style.animationDelay = Math.random() * 20 + "s";
      d.style.animationDuration = 20 + Math.random() * 15 + "s";
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 45000);
    }
    const interval = setInterval(makeDust, 1500);
    for (let i = 0; i < 8; i++) setTimeout(makeDust, i * 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (showDropdown || showFeminineDropdown || showAgelessDropdown || showPetDropdown || showHomeDropdown)
      body.classList.add("no-scroll");
    else body.classList.remove("no-scroll");
    return () => body.classList.remove("no-scroll");
  }, [showDropdown, showFeminineDropdown, showAgelessDropdown, showPetDropdown, showHomeDropdown]);

  const masculinePillars = {
    warrior: {
      title: "WARRIOR", subtitle: "Energy • Focus • Immunity",
      tiers: [
        { name: "Tier 1 — Foundational Power", products: [
          { name: "Lifelong Vitality Pack", slug: "lifelong-vitality-pack" },
          { name: "PB Assist+", slug: "pb-assist" },
          { name: "Protective Blend", slug: "on-guard-protective-blend" },
          { name: "Peppermint Essential Oil", slug: "peppermint-oil" }
        ]},
        { name: "Tier 2 — Enhanced Stamina", products: [
          { name: "Mito2Max Energy Complex", slug: "mito2max-energy-complex" },
          { name: "Calming Blend", slug: "adaptiv-calming-blend" }
        ]},
        { name: "Tier 3 — DIY Warrior Elixir (Roll-On)", description: "A Roll-On Blend for focused energy and vitality.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Frankincense", slug: "frankincense-oil" },
            { name: "Copaiba", slug: "copaiba-oil" },
            { name: "Peppermint", slug: "peppermint-oil" }
          ], instructions: "Combine 6 drops Peppermint, 4 drops Frankincense, and 2 drops Copaiba in a 10 mL roller bottle. Top with Fractionated Coconut Oil. Apply to the temples and back of the neck each morning." }}
      ]
    },
    agileBody: { /* ... full agileBody from handoff ... */ },
    presence: { /* ... */ },
    legacy: { /* ... */ }
  };

  // Add all other pillar objects, foundationalResources, TierContent, FoundationsContent, PillarDropdown components exactly as in your handoff message

  return (
    <div>
      <style>{`/* full style block from handoff */`}</style>
      {/* full flower SVG, inner geometry, header, wellness-intake button, service-container with buttons, lotus-ai, all PillarDropdown calls, ageless/pet dropdowns */}
    </div>
  );
}
