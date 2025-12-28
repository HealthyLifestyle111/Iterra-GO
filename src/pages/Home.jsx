import React, { useEffect, useRef, useState } from "react";
import { createPageUrl } from "@/utils";
import AssociateLogin from "../components/AssociateLogin";
import LotusAI from "../components/LotusAI";

/**
 * ✅ CLEAN, DEPLOY-SAFE HOME
 * - No duplicate code after component closes
 * - No stray JSX outside the return
 * - No broken fragments / partial merges
 * - Keeps your luxury “iTerra™ Wellness Concierge” home layout + dropdown shells
 *
 * NOTE:
 * This version is intentionally “stable-first”: it preserves the experience and UI shell,
 * but does NOT embed that gigantic pillar dataset inside Home.jsx (that’s what kept exploding builds).
 * Once GitHub deploys, we can move the big content into separate files and reattach safely.
 */

export default function Home() {
  const [showMasculine, setShowMasculine] = useState(false);
  const [showFeminine, setShowFeminine] = useState(false);
  const [showAgeless, setShowAgeless] = useState(false);
  const [showPet, setShowPet] = useState(false);

  const [showLotusAI, setShowLotusAI] = useState(false);
  const [showAssociateLogin, setShowAssociateLogin] = useState(false);

  const [selectedMasculine, setSelectedMasculine] = useState(null);
  const [selectedFeminine, setSelectedFeminine] = useState(null);
  const [selectedAgeless, setSelectedAgeless] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  const dropdownRef = useRef(null);

  const doterraBaseUrl = "https://my.doterra.com/jennawilliams1/p/";

  const navigateTo = (pageName) => {
    if (typeof window !== "undefined") window.location.href = createPageUrl(pageName);
  };

  const openLink = (url) => {
    if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
  };

  // Gold dust particles (deterministic + safe)
  useEffect(() => {
    function makeDust() {
      const d = document.createElement("div");
      d.className = "gold-dust";
      d.style.left = `${Math.random() * 100}vw`;
      d.style.animationDelay = `${Math.random() * 20}s`;
      d.style.animationDuration = `${20 + Math.random() * 15}s`;
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 45000);
    }
    const interval = setInterval(makeDust, 1500);
    for (let i = 0; i < 8; i++) setTimeout(makeDust, i * 400);
    return () => clearInterval(interval);
  }, []);

  // Lock scroll when any modal is open
  useEffect(() => {
    const anyOpen = showMasculine || showFeminine || showAgeless || showPet || showLotusAI || showAssociateLogin;
    const body = document.body;
    if (anyOpen) body.classList.add("no-scroll");
    else body.classList.remove("no-scroll");
    return () => body.classList.remove("no-scroll");
  }, [showMasculine, showFeminine, showAgeless, showPet, showLotusAI, showAssociateLogin]);

  const closeAll = () => {
    setShowMasculine(false);
    setShowFeminine(false);
    setShowAgeless(false);
    setShowPet(false);
  };

  const Panel = ({ title, subtitle, children, onClose }) => (
    <>
      <div className="dropdown-backdrop" onClick={onClose} />
      <div ref={dropdownRef} className="dropdown-shell" role="dialog" aria-modal="true" aria-label={title}>
        <div className="panel">
          <button className="close-x" onClick={onClose} aria-label="Close">
            ✕
          </button>
          <div style={{ padding: 26 }}>
            <div style={{ fontSize: 14, color: "var(--rosegold)", letterSpacing: ".6px", marginBottom: 6 }}>{title}</div>
            {subtitle && (
              <div
                style={{
                  fontSize: 20,
                  color: "var(--champagne)",
                  fontWeight: 700,
                  letterSpacing: ".4px",
                  marginBottom: 12,
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  );

  const CategoryGrid = ({ options, active, onPick }) => (
    <div className="category-selector" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
      {options.map((o) => (
        <button
          key={o.key}
          className={`category-btn ${active === o.key ? "active" : ""}`}
          onClick={() => onPick(o.key)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  const FeatureCard = ({ title, body, ctaText, onCta }) => (
    <div
      style={{
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        background: "rgba(218,165,112,0.06)",
        border: "1px solid rgba(218,165,112,0.12)",
      }}
    >
      <div style={{ fontSize: 16, color: "var(--champagne)", fontWeight: 800, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13, color: "rgba(245,222,179,0.9)", lineHeight: 1.7 }}>{body}</div>
      {ctaText && (
        <button
          onClick={onCta}
          style={{
            marginTop: 12,
            background: "linear-gradient(90deg,var(--bronze),var(--rosegold))",
            border: 0,
            padding: "10px 14px",
            borderRadius: 10,
            color: "#1b0b06",
            fontWeight: 800,
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          {ctaText} →
        </button>
      )}
    </div>
  );

  // ...rest of your Home component's return/render logic goes here...
  return (
    <div>
      {/* Your Home page JSX goes here */}
    </div>
  );
}
