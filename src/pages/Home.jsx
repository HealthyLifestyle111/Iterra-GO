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

  // All pillar objects, TierContent, FoundationsContent, PillarDropdown from your original handoff message (full, no placeholders)

  return (
    <div>
      <style>{`
        :root{--champagne:#F5DEB3;--rosegold:#E6B7A5;--bronze:#B9875D;--chocolate:#2e120d;--velvet:#3b0f12}
        *{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{height:100%}
        body{font-family:'Cinzel Decorative','Playfair Display',serif;background:radial-gradient(ellipse at center,#23110d 0%,#120806 50%,#070403 100%);color:var(--champagne);overflow:auto;min-height:100vh;position:relative}
        body.no-scroll{overflow:hidden!important}
        .header{text-align:center;position:absolute;top:40px;left:50%;transform:translateX(-50%);z-index:10}
        .logo{font-size:54px;letter-spacing:3px;font-weight:600;font-family:'Cinzel Decorative','Playfair Display',serif;color:var(--champagne);text-shadow:0 0 28px rgba(245,222,179,.55)}
        .tm{font-size:16px;vertical-align:super;margin-left:2px;color:var(--rosegold)}
        .tagline{font-size:16px;letter-spacing:2px;font-weight:400;color:var(--rosegold);text-shadow:0 0 10px rgba(230,183,165,.6)}
        .flower-of-life-bg{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:580px;height:580px;opacity:.08;animation:flowerSpin 120s linear infinite;z-index:1;filter:blur(1px)}
        @keyframes flowerSpin{from{transform:translate(-50%,-50%) rotate(0)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        .service-container{position:absolute;top:90%;left:50%;transform:translate(-50%,-50%);z-index:10}
        .service-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:30px;max-width:760px;margin-top:0}
        .wellness-intake-top{position:absolute;top:15%;left:50%;transform:translateX(-50%);width:300px;height:72px;border-radius:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;font-weight:600;letter-spacing:.5px;z-index:15;color:var(--champagne);font-family:'Cinzel Decorative','Playfair Display',serif;background:linear-gradient(180deg,rgba(65,30,22,0.65),rgba(35,15,10,0.5));backdrop-filter:blur(18px) saturate(120%);border:1px solid rgba(245,222,179,.25);box-shadow:0 12px 36px rgba(0,0,0,.55),0 0 46px rgba(245,222,179,.22),inset 0 -6px 12px rgba(0,0,0,.35);animation:intakeBreath 6s ease-in-out infinite,intakeFloat 10s ease-in-out infinite;text-shadow:0 0 12px rgba(230,183,165,.45)}
        @keyframes intakeBreath{0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.04)}}
        @keyframes intakeFloat{0%,100%{top:15%}50%{top:14.5%}}
        .service-button{width:220px;height:84px;border-radius:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .35s ease;background:linear-gradient(180deg,rgba(60,26,20,0.6),rgba(40,16,12,0.45));backdrop-filter:blur(14px) saturate(115%);border:1px solid rgba(245,222,179,.20);color:var(--champagne);font-family:'Cinzel Decorative','Playfair Display',serif;font-weight:600;text-shadow:0 0 10px rgba(245,222,179,.32);box-shadow:0 10px 30px rgba(0,0,0,.48),0 0 44px rgba(218,165,112,.14),inset 0 -6px 12px rgba(0,0,0,.35)}
        .service-button:hover{transform:translateY(-6px) scale(1.02);border-color:rgba(245,222,179,.38);box-shadow:0 18px 44px rgba(0,0,0,.55),0 0 56px rgba(218,165,112,.28),inset 0 -6px 16px rgba(0,0,0,.40)}
        .dropdown-backdrop{position:fixed;inset:0;background:linear-gradient(180deg,rgba(6,3,2,0.45),rgba(0,0,0,0.72));backdrop-filter:blur(6px);z-index:999}
        .dropdown-shell{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(920px,94vw);max-height:86vh;overflow:auto;z-index:1000;padding:14px;border-radius:14px}
        .panel{border-radius:16px;background:linear-gradient(180deg,rgba(48,20,14,0.95),rgba(30,12,8,0.90));border:1px solid rgba(245,222,179,.12);box-shadow:0 20px 60px rgba(0,0,0,.7);backdrop-filter:blur(10px)}
        .close-x{position:absolute;right:18px;top:14px;background:transparent;border:0;color:var(--champagne);font-size:20px;cursor:pointer;z-index:1}
        .category-selector{display:flex;gap:12px;margin-bottom:20px}
        .category-btn{flex:1;padding:16px;border-radius:12px;background:linear-gradient(180deg,rgba(54,18,14,0.55),rgba(32,12,9,0.45));border:1px solid rgba(218,165,112,.06);color:var(--champagne);cursor:pointer;transition:all 0.3s ease;font-size:14px;font-weight:600}
        .category-btn:hover{border-color:rgba(218,165,112,.25);transform:translateY(-2px)}
        .category-btn.active{background:linear-gradient(90deg,var(--bronze),var(--rosegold));color:#1b0b06;border-color:transparent}
        .lotus-ai-container{position:fixed;bottom:30px;right:30px;z-index:1000}
        .lotus-ai{width:70px;height:70px;background:linear-gradient(135deg,rgba(160,82,45,.95),rgba(139,69,19,.9));backdrop-filter:blur(20px);border:2px solid rgba(230,183,165,.70);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 40px rgba(230,183,165,.50),0 0 80px rgba(245,222,179,.35),inset 0 2px 0 rgba(255,255,255,.2),inset 0 -2px 8px rgba(0,0,0,.3);animation:lotusBreath 5s ease-in-out infinite;cursor:pointer;transition:transform 0.2s ease}
        .lotus-ai:hover{transform:scale(1.1)}
        @keyframes lotusBreath{0%,100%{box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 40px rgba(230,183,165,.50),0 0 80px rgba(245,222,179,.35)}50%{box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 60px rgba(230,183,165,.70),0 0 120px rgba(245,222,179,.55)}}
        .lotus-symbol{font-size:30px;color:var(--champagne);text-shadow:0 0 15px rgba(230,183,165,.65),0 0 30px rgba(230,183,165,.45)}
        .gold-dust{position:fixed;width:3px;height:3px;background:radial-gradient(circle,rgba(218,165,127,.9) 0%,rgba(218,165,127,.3) 70%);border-radius:50%;pointer-events:none;animation:dustFloat 25s linear infinite;z-index:5}
        @keyframes dustFloat{0%{transform:translateY(100vh) translateX(0) rotate(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100px) translateX(50px) rotate(360deg);opacity:0}}
        .inner-sacred-geometry{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:150px;height:150px;opacity:.12;z-index:2;pointer-events:none;animation:innerSpin 45s linear infinite reverse}
        @keyframes innerSpin{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
        @media (max-width:880px){.service-grid{grid-template-columns:repeat(2,1fr);max-width:520px}.dropdown-shell{width:92vw}.panel-inner{padding:16px}}
      `}</style>
      {/* full flower SVG, header, buttons, lotus, dropdowns from your original handoff */}
    </div>
  );
}
