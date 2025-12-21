import React, { useState } from "react";
import { doterraGoUrl } from "@/lib/doterraGo";

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
            { name: "Lavender (respiratory support)", slug: "lavender", use: "Diffuse or aromatic inhaler for clear breathing and calming" },
            { name: "Lavender", slug: "lavender", use: "Histamine response support" },
            { name: "Adaptiv Capsules", slug: "adaptiv", use: "Seasonal stress and respiratory comfort" }
          ]
        }
      ],
      diyRecipe: {
        title: "Spring Allergy Relief Roller",
        ingredients: [
          { name: "Lavender (5 drops)", slug: "lavender-oil" },
          { name: "Lemon (5 drops)", slug: "lemon-oil" },
          { name: "Peppermint (5 drops)", slug: "peppermint-oil" },
          { name: "Fractionated Coconut Oil (fill 10mL roller)", slug: "lavender-oil" }
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
            { name: "Copaiba", slug: "copaiba", use: "Sustained energy and cellular support" }
          ]
        }
      ],
      diyRecipe: {
        title: "Cooling Summer Mist"
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
            { name: "On Guard Blend", slug: "on-guard", use: "Daily immune protection" },
            { name: "Frankincense", slug: "frankincense", use: "Cellular immune support" },
            { name: "Copaiba", slug: "copaiba", use: "Inflammation modulation" }
          ]
        },
        {
          name: "Grounding & Transition Support",
          products: [
            { name: "Balance Grounding Blend", slug: "balance", use: "Emotional grounding during change" },
            { name: "Cinnamon Bark", slug: "cinnamon-bark", use: "Warming circulation support" },
            { name: "Adaptiv Blend", slug: "adaptiv", use: "Stress adaptation" }
          ]
        }
      ],
      diyRecipe: {
        title: "Autumn Spice Immune Booster"
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
            { name: "On Guard Blend", slug: "on-guard", use: "Internal immune protection" },
            { name: "Oregano Oil", slug: "oregano", use: "Acute immune challenges" },
            { name: "Eucalyptus Oil", slug: "eucalyptus", use: "Clear airways, respiratory comfort" },
            { name: "Frankincense", slug: "frankincense-oil", use: "Apply to feet daily for cellular immunity" }
          ]
        },
        {
          name: "Deep Rest & Restoration",
          products: [
            { name: "Lavender Oil", slug: "lavender", use: "Complete sleep support" },
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
      {/* Foundational Resources Section */}
      <div style={{maxWidth:600,margin:"40px auto",padding:32,borderRadius:16,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.13)",marginBottom:40}}>
        <h2 style={{fontSize:24,color:"var(--champagne)",fontWeight:700,marginBottom:18}}>Foundational Resources</h2>
        {/* Nutrition */}
        <div style={{marginBottom:28}}>
          <h3 style={{fontSize:17,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>Foundation: Nutrition</h3>
          <p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:10,lineHeight:1.6}}>
            Core Supplement Bundle: A complete pack of multivitamins, probiotics and essential oils for daily foundational nutrition.
          </p>
          <a
            href="https://www.doterra.com/US/en/p/foundational-wellness-kit"
            target="_blank"
            rel="noopener noreferrer"
            style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,padding:"7px 16px",borderRadius:8,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:13,marginBottom:4,textDecoration:"none",display:"inline-block"}}
          >
            Shop Foundational Wellness Bundle
          </a>
        </div>
        {/* Hydration */}
        <div style={{marginBottom:28}}>
          <h3 style={{fontSize:17,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>Foundation: Hydration</h3>
          <p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:8,lineHeight:1.6}}><strong>Guideline:</strong> 35 mL per kg of body weight daily. Increase based on activity level and environment.</p>
          <p style={{fontSize:13,color:"var(--rosegold)",marginBottom:8}}>Therapeutic Waters Protocol (3 times daily):</p>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
            <div style={{padding:8,borderRadius:8,background:"rgba(245,222,179,0.05)"}}>
              <div style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>Morning (Energize & Cleanse)</div>
              <div style={{fontSize:12,color:"rgba(245,222,179,0.9)",marginBottom:6}}>1-2 drops of citrus oil in water</div>
              <a href="https://www.doterra.com/US/en/p/lemon-oil" target="_blank" rel="noopener noreferrer"
                style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"4px 10px",borderRadius:6,color:"var(--champagne)",cursor:"pointer",fontSize:11,textDecoration:"none",display:"inline-block"}}>
                Lemon Oil →
              </a>
            </div>
            <div style={{padding:8,borderRadius:8,background:"rgba(245,222,179,0.05)"}}>
              <div style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>Noon (Focus & Digest)</div>
              <div style={{fontSize:12,color:"rgba(245,222,179,0.9)",marginBottom:6}}>1 drop of mint oil in water</div>
              <a href="https://www.doterra.com/US/en/p/peppermint-oil" target="_blank" rel="noopener noreferrer"
                style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"4px 10px",borderRadius:6,color:"var(--champagne)",cursor:"pointer",fontSize:11,textDecoration:"none",display:"inline-block"}}>
                Peppermint Oil →
              </a>
            </div>
            <div style={{padding:8,borderRadius:8,background:"rgba(245,222,179,0.05)"}}>
              <div style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>Evening (Calm & Soothe)</div>
              <div style={{fontSize:12,color:"rgba(245,222,179,0.9)",marginBottom:6}}>1-2 drops of floral oil in warm water</div>
              <a href="https://www.doterra.com/US/en/p/lavender-oil" target="_blank" rel="noopener noreferrer"
                style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"4px 10px",borderRadius:6,color:"var(--champagne)",cursor:"pointer",fontSize:11,textDecoration:"none",display:"inline-block"}}>
                Lavender Oil →
              </a>
            </div>
          </div>
          {/* Ayurvedic-Inspired Oil-Infused Water Routine */}
          <div style={{marginTop:16,marginBottom:12,padding:16,background:"rgba(245,222,179,0.06)",borderRadius:8,border:"1px solid rgba(245,222,179,0.13)"}}>
            <h4 style={{fontWeight:700,color:"var(--rosegold)",fontSize:15,marginBottom:8}}>Ayurvedic-Inspired Oil-Infused Water Routine</h4>
            <div style={{fontSize:13,color:"rgba(245,222,179,0.92)",marginBottom:8}}>
              This routine aligns with Ayurvedic principles: matching dosha-dominant times of day (Kapha morning, Pitta midday, Vata evening), supporting agni (digestion), detoxification, and emotional balance. Use room-temperature or warm water (never cold—cold extinguishes agni). Add oils to a glass (8-12 oz), stir, sip slowly while seated.
            </div>
            <div style={{marginBottom:10}}>
              <strong>Morning (Energize & Cleanse)</strong><br/>
              <span style={{fontSize:12}}><b>Time:</b> Upon waking, 6-8 AM (early Kapha time, after sunrise or Brahma Muhurta).<br/>
              <b>Why:</b> Flushes overnight toxins (ama), stimulates elimination, kindles digestive fire (agni), boosts energy/metabolism, and invigorates the mind/body for the day. Citrus oils enhance cleansing and uplift mood.<br/>
              <b>Temperature:</b> Room temperature or slightly warm (promotes absorption without shocking system).<br/>
              <b>Recipe:</b> 1-2 drops Lemon Oil in water (bright, detoxifying, supports liver/skin).</span>
            </div>
            <div style={{marginBottom:10}}>
              <strong>Noon (Focus & Digest)</strong><br/>
              <span style={{fontSize:12}}><b>Time:</b> Midday, 12-2 PM (peak Pitta time, when digestion is strongest).<br/>
              <b>Why:</b> Supports peak agni for lunch digestion, cools internal heat, sharpens mental focus/alertness, and prevents afternoon slump. Mint oils refresh breath, aid digestion, and clear mental fog.<br/>
              <b>Temperature:</b> Room temperature (cools Pitta fire without dulling digestion).<br/>
              <b>Recipe:</b> 1 drop Peppermint Oil in water (cooling, digestive stimulant, enhances concentration).</span>
            </div>
            <div style={{marginBottom:10}}>
              <strong>Evening (Calm & Soothe)</strong><br/>
              <span style={{fontSize:12}}><b>Time:</b> Early evening, 6-8 PM (transition to Vata time, before dinner or wind-down).<br/>
              <b>Why:</b> Calms nervous system, reduces Vata anxiety/stress accumulated from day, prepares for restful sleep, and soothes digestion/emotions. Floral oils promote relaxation and emotional balance.<br/>
              <b>Temperature:</b> Warm (grounds Vata, aids relaxation and absorption).<br/>
              <b>Recipe:</b> 1-2 drops Lavender Oil in warm water (calming, soothing, supports restful transition to night).</span>
            </div>
            <div style={{marginTop:8,fontSize:12}}>
              Drink mindfully, listening to thirst. Adjust drops for taste (oils are potent). Always use therapeutic-grade oils safe for internal use. For personalized dosha tweaks, consult an Ayurvedic practitioner.
            </div>
          </div>
        </div>
        {/* Sleep Support */}
        <div style={{marginBottom:12}}>
          <h3 style={{fontSize:17,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>Foundation: Sleep Support</h3>
          <p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:8,lineHeight:1.6}}>
            Lavender Essential Oil: Premium therapeutic support for restful sleep and relaxation. Diffuse at bedtime or apply to pulse points.
          </p>
          <a
            href="https://www.doterra.com/US/en/p/lavender-oil"
            target="_blank"
            rel="noopener noreferrer"
            style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,padding:"7px 16px",borderRadius:8,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:13,textDecoration:"none",display:"inline-block"}}
          >
            Shop Lavender Oil
          </a>
        </div>
      </div>
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
                    href={doterraGoUrl(product.slug)}
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
                    href={doterraGoUrl(ing.slug)}
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