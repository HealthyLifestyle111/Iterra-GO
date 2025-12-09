import React, { useState } from "react";

const DOTERRA_BASE = "https://my.doterra.com/jennawilliams1/p/";

export default function SeasonalCare() {
  const [activeSeason, setActiveSeason] = useState("winter");

  const seasons = {
    spring: {
      title: "Spring Renewal",
      subtitle: "Detox • Allergy Support • Fresh Energy",
      color: "#8FBC8F",
      emoji: "🌸",
      protocols: [
        {
          name: "Spring Detox Protocol",
          products: [
            { name: "Lemon Essential Oil", slug: "lemon", use: "2 drops in water AM for liver cleanse" },
            { name: "Grapefruit Essential Oil", slug: "grapefruit", use: "Metabolic support, fat metabolism" },
            { name: "Zendocrine Softgels", slug: "zendocrine-softgels", use: "Complete detox complex" }
          ]
        },
        {
          name: "Seasonal Allergy Support",
          products: [
            { name: "Breathe Respiratory Blend", slug: "breathe", use: "Diffuse or aromatic inhaler for clear breathing" },
            { name: "Lavender", slug: "lavender", use: "Histamine response support" },
            { name: "TriEase Softgels", slug: "triease", use: "Seasonal respiratory comfort" }
          ]
        }
      ],
      diyRecipe: {
        title: "Spring Allergy Relief Roller",
        ingredients: [
          { name: "Lavender (5 drops)", slug: "lavender-oil" },
          { name: "Lemon (5 drops)", slug: "lemon-oil" },
          { name: "Peppermint (5 drops)", slug: "peppermint-oil" },
          { name: "Fractionated Coconut Oil (fill 10mL roller)", slug: "fractionated-coconut-oil" }
        ],
        instructions: "Combine in roller bottle. Apply to back of neck, chest, under nose 3-4x daily during allergy season."
      }
    },
    summer: {
      title: "Summer Vitality",
      subtitle: "Cooling • Sun Care • Outdoor Wellness",
      color: "#FFD700",
      emoji: "☀️",
      protocols: [
        {
          name: "After-Sun Skin Support",
          products: [
            { name: "Lavender", slug: "lavender-oil", use: "Apply neat to sun-exposed skin for soothing" },
            { name: "Frankincense", slug: "frankincense-oil", use: "Cellular skin repair" },
            { name: "Helichrysum", slug: "helichrysum-oil", use: "Advanced skin regeneration" }
          ]
        },
        {
          name: "Heat & Energy Management",
          products: [
            { name: "Peppermint", slug: "peppermint-oil", use: "Cooling mist, internal energy support" },
            { name: "Lemon", slug: "lemon-oil", use: "Hydration enhancement in water" },
            { name: "Mito2Max", slug: "mito2max", use: "Sustained summer energy" }
          ]
        }
      ],
      diyRecipe: {
        title: "Cooling Summer Mist",
        ingredients: [
          { name: "Peppermint (10 drops)", slug: "peppermint-oil" },
          { name: "Lavender (8 drops)", slug: "lavender-oil" },
          { name: "Distilled Water (4 oz)", slug: "glass-spray-bottle" }
        ],
        instructions: "Combine in spray bottle. Shake well. Mist on skin for instant cooling relief. Avoid eyes."
      }
    },
    fall: {
      title: "Fall Immune Building",
      subtitle: "Protection • Transition • Grounding",
      color: "#CD853F",
      emoji: "🍂",
      protocols: [
        {
          name: "Immune System Preparation",
          products: [
            { name: "On Guard Softgels", slug: "on-guard-softgels", use: "Daily immune protection" },
            { name: "Frankincense", slug: "frankincense", use: "Cellular immune support" },
            { name: "Copaiba", slug: "copaiba", use: "Inflammation modulation" }
          ]
        },
        {
          name: "Grounding & Transition Support",
          products: [
            { name: "Balance Grounding Blend", slug: "balance", use: "Emotional grounding during change" },
            { name: "Cinnamon Bark", slug: "cinnamon-bark", use: "Warming circulation support" },
            { name: "Adaptiv Capsules", slug: "adaptiv-capsules", use: "Stress adaptation" }
          ]
        }
      ],
      diyRecipe: {
        title: "Autumn Spice Immune Booster",
        ingredients: [
          { name: "On Guard Blend (4 drops)", slug: "on-guard", use: "Immune protection" },
          { name: "Cinnamon (2 drops)", slug: "cinnamon-bark", use: "Warming, antimicrobial" },
          { name: "Wild Orange (3 drops)", slug: "wild-orange", use: "Uplifting, vitamin C support" }
        ],
        instructions: "Diffuse blend daily as temperatures drop. Creates cozy atmosphere while supporting immunity."
      }
    },
    winter: {
      title: "Winter Immunity & Rest",
      subtitle: "Protection • Deep Sleep • Wellness Defense",
      color: "#4682B4",
      emoji: "❄️",
      protocols: [
        {
          name: "Cold & Flu Prevention",
          products: [
            { name: "On Guard Softgels", slug: "on-guard-softgels", use: "Internal immune protection" },
            { name: "Oregano Softgels", slug: "oregano-softgels", use: "Acute immune challenges" },
            { name: "Breathe Respiratory Blend", slug: "breathe", use: "Clear airways, respiratory comfort" },
            { name: "Frankincense", slug: "frankincense-oil", use: "Apply to feet daily for cellular immunity" }
          ]
        },
        {
          name: "Deep Rest & Restoration",
          products: [
            { name: "Serenity Restful Blend", slug: "serenity", use: "Complete sleep system" },
            { name: "Vetiver", slug: "vetiver-oil", use: "Deep grounding for winter rest" },
            { name: "Frankincense", slug: "frankincense-oil", use: "Inner reflection, meditation" }
          ]
        }
      ],
      diyRecipe: {
        title: "Winter Wellness Immunity Bomb",
        ingredients: [
          { name: "On Guard Blend (3 drops)", slug: "on-guard", use: "Immune protection" },
          { name: "Frankincense (2 drops)", slug: "frankincense-oil", use: "Cellular support" },
          { name: "Oregano (1 drop)", slug: "oregano-oil", use: "Antimicrobial power" },
          { name: "Veggie capsule", slug: "vegetable-capsules", use: "For internal use" }
        ],
        instructions: "Place oils in veggie capsule, fill rest with FCO. Take 1-2x daily during cold/flu season or at first sign of illness."
      }
    }
  };

  const currentSeason = seasons[activeSeason];

  return (
    <div>
      <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginBottom:24}}>
        <h3 style={{fontSize:22,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>🌿 Seasonal Wellness Care</h3>
        <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.6}}>
          Align your wellness protocols with nature's rhythms. Each season brings unique challenges and opportunities.
        </p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:12,marginBottom:32}}>
        {Object.entries(seasons).map(([key, season]) => (
          <button
            key={key}
            onClick={() => setActiveSeason(key)}
            style={{
              padding:16,
              borderRadius:12,
              background:activeSeason === key ? `linear-gradient(135deg, ${season.color}40, ${season.color}20)` : "rgba(245,222,179,0.04)",
              border:activeSeason === key ? `2px solid ${season.color}` : "1px solid rgba(245,222,179,0.1)",
              color:"var(--champagne)",
              cursor:"pointer",
              textAlign:"center",
              transition:"all 0.3s ease"
            }}
          >
            <div style={{fontSize:32,marginBottom:8}}>{season.emoji}</div>
            <div style={{fontSize:14,fontWeight:700}}>{season.title.split(' ')[0]}</div>
          </button>
        ))}
      </div>

      <div style={{padding:28,borderRadius:16,background:`linear-gradient(135deg, ${currentSeason.color}15, ${currentSeason.color}08)`,border:`1px solid ${currentSeason.color}40`}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:48,marginBottom:12}}>{currentSeason.emoji}</div>
          <h3 style={{fontSize:26,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>{currentSeason.title}</h3>
          <p style={{fontSize:15,color:"var(--rosegold)"}}>{currentSeason.subtitle}</p>
        </div>

        {currentSeason.protocols.map((protocol, idx) => (
          <div key={idx} style={{marginBottom:24,padding:20,borderRadius:12,background:"rgba(0,0,0,0.2)",border:"1px solid rgba(245,222,179,0.1)"}}>
            <h4 style={{fontSize:17,color:"var(--champagne)",fontWeight:700,marginBottom:14}}>{protocol.name}</h4>
            <div style={{display:"grid",gap:10}}>
              {protocol.products.map((product, i) => (
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:4}}>{product.name}</div>
                    <div style={{fontSize:11,color:"var(--rosegold)"}}>{product.use}</div>
                  </div>
                  <a
                    href={`${DOTERRA_BASE}${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{padding:"8px 16px",borderRadius:8,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,fontSize:12,textDecoration:"none",whiteSpace:"nowrap"}}
                  >
                    Shop →
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{padding:20,borderRadius:12,background:"linear-gradient(135deg, rgba(230,183,165,0.2), rgba(218,165,112,0.15))",border:"1px solid rgba(218,165,112,0.3)"}}>
          <h4 style={{fontSize:17,color:"var(--champagne)",fontWeight:700,marginBottom:14}}>✨ DIY Recipe: {currentSeason.diyRecipe.title}</h4>
          <div style={{marginBottom:14}}>
            <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:10}}>Ingredients:</p>
            <div style={{display:"grid",gap:8}}>
              {currentSeason.diyRecipe.ingredients.map((ing, i) => (
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:10,borderRadius:8,background:"rgba(245,222,179,0.06)"}}>
                  <span style={{fontSize:13,color:"var(--champagne)"}}>{ing.name}</span>
                  <a
                    href={`${DOTERRA_BASE}${ing.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{padding:"6px 12px",borderRadius:6,background:"rgba(218,165,112,0.3)",border:"1px solid rgba(218,165,112,0.4)",color:"var(--champagne)",fontSize:11,fontWeight:600,textDecoration:"none"}}
                  >
                    Shop
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:14,borderRadius:8,background:"rgba(0,0,0,0.2)",border:"1px solid rgba(245,222,179,0.1)"}}>
            <p style={{fontSize:12,color:"var(--champagne)",lineHeight:1.7,fontStyle:"italic"}}>
              <strong>Instructions:</strong> {currentSeason.diyRecipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}