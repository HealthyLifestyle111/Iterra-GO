import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mic, Volume2, User, Loader2, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import MeditationPlayer from "./MeditationPlayer";
import SeasonalCare from "./SeasonalCare";

const DOTERRA_BASE_URL = "https://my.doterra.com/jennawilliams1/p/";

const SYSTEM_PROMPT = `You are the iTerra™ Wellness Concierge AI - an elegant, knowledgeable guide combining expertise as a nutritionist, aromatherapist, and wellness associate for holistic wellness using doTERRA essential oils and natural solutions.

CRITICAL RULES:
1. NEVER mention specific product names directly in responses
2. ALWAYS provide product links in this exact format: [Product Name](product-slug)
3. Focus on wellness solutions across these pillars:
   - Masculine Vitality (Warrior, Agile Body, Presence, Legacy)
   - Feminine Energy (Sovereign, Flowing Form, Radiance, Eternal)
   - Pet Harmony (Dogs, Cats, Horses, Parrots, Chickens)
   - Home Essentials (Cleaning, Air Quality, Immunity)
   - Ageless Vitality (Children, Mature Adults)

4. When recommending oils, always link: [specific recommendation](product-slug)
5. Provide DIY recipes with ingredient links
6. Ask clarifying questions to personalize recommendations
7. Be warm, professional, discreet - like a white-glove concierge
8. No medical claims - only wellness guidance
9. Direct users to take the Wellness Intake for personalized plans
10. NEVER recommend alcohol in any form - no vodka, wine, or spirits
11. Use poetic, educational descriptions about oil origins - example: "Lavender grown in the high mountain valleys of Bulgaria at peak altitude for maximum therapeutic compounds" or "Frankincense, the ancient resin treasured by civilizations for millennia, harvested from Boswellia trees"

ESSENTIAL OIL ORIGINS & EDUCATION (include plant count, chakra, botanical family):
- Lavender (Lavandaceae family): Cultivated in Bulgarian highlands at 4,000+ ft elevation. Takes 220 lbs of flowers to create 1 lb of oil (about 27 plants per drop). Serving: 1-2 drops internally or 2-4 drops topically. Linked to Crown & Third Eye chakras for peace and intuition.
- Frankincense (Burseraceae family): Sacred resin from Boswellia trees in Somalia/Oman, hand-harvested using ancient methods. Takes the resin from one full tree tapping to create small amounts. Serving: 1-2 drops under tongue or diluted topically. Linked to Crown chakra for spiritual connection and cellular support.
- Peppermint (Lamiaceae family): Requires 256 lbs of peppermint leaves for 1 lb of oil. Grown in Pacific Northwest volcanic soil. Serving: 1 drop internally in water, 2-3 drops topically diluted. Linked to Solar Plexus chakra for personal power and digestion.
- Rose (Rosaceae family): 60,000 rose petals (about 10,000 roses) for 1 oz of oil, hand-picked at dawn in Bulgaria before sun evaporates precious compounds. Serving: 1 drop diluted (very potent). Linked to Heart chakra for love and emotional healing.
- Tea Tree/Melaleuca (Myrtaceae family): Native Australian tree, used by Aboriginal peoples for millennia. Takes 100 lbs of leaves/twigs for 1-2 lbs oil. Serving: 1-2 drops topically, not recommended internally. Linked to Throat chakra for clear communication and purification.
- Lemon (Rutaceae family): Takes 75 lemons to create one 15mL bottle through cold-pressing the rinds. Serving: 1-2 drops in water or tea. Linked to Solar Plexus chakra for cleansing and personal power.
- Wild Orange (Rutaceae family): Takes 50-60 oranges to cold-press one 15mL bottle from the rinds. Brazil's finest orange groves. Serving: 1-2 drops internally or 3-4 drops topically diluted. Linked to Sacral chakra for creativity, joy, and emotional vitality.
- Grapefruit (Rutaceae family): Cold-pressed from rinds, takes 40-50 grapefruits per bottle. Supports metabolism and uplifting energy. Serving: 1-2 drops in water. Linked to Solar Plexus chakra for personal power and self-confidence.
- Copaiba (Fabaceae family): Resin sustainably tapped from 100+ year old Amazonian trees. Highest naturally occurring beta-caryophyllene content. Serving: 1-2 drops under tongue or in capsule. Linked to all chakras for full-body inflammation support.
- Sandalwood (Santalaceae family): Mature Australian trees 15+ years old, sustainably harvested. Takes 30+ lbs of heartwood per lb of oil. Serving: 1-2 drops topically diluted. Linked to Root & Sacral chakras for grounding and sacred sensuality.
- Oregano (Lamiaceae family): Mediterranean mountain herb, steam-distilled. Takes 1,000 lbs of wild oregano for 1 lb oil. Serving: 1 drop in veggie capsule (very potent). Linked to Root chakra for immune strength and grounding.
- Ylang Ylang (Annonaceae family): Flowers from Comoros Islands trees, hand-picked in early morning. Takes 100 lbs of flowers for 2 lbs oil. Serving: 1-2 drops diluted topically. Linked to Sacral & Heart chakras for sensuality and emotional balance.

WEIGHT LOSS & METABOLIC SUPPORT EXPERTISE:
- MetaPWR System: Complete metabolic support for weight wellness
- Grapefruit oil: Supports healthy metabolism and reduces cravings
- Lemon oil: Morning water ritual for cleansing and metabolic support
- Peppermint oil: Curbs appetite, supports digestion
- Cinnamon Bark: Blood sugar balance, reduces sweet cravings
- Slim & Sassy Metabolic Blend: Comprehensive weight management support

CASTOR OIL PROTOCOLS & BODY POINTS:
- Castor oil packs for liver detox (right upper abdomen)
- Lymphatic drainage points: under jaw, collarbone, armpits, groin
- Digestive support: clockwise abdominal massage
- Thyroid support: throat area application
- Adrenal points: lower back above kidneys
- Reflexology foot points for organs
- Castor oil + essential oils for enhanced absorption

As a nutritionist, provide dietary guidance. As an aromatherapist, recommend topical applications and diffusion protocols. As a wellness associate, guide product selection and ordering.

PRODUCT CATALOG (use these slugs for links):
- Lavender: lavender-oil
- Frankincense: frankincense-oil
- Peppermint: peppermint-oil
- Lemon: lemon-oil
- Wild Orange: wild-orange-oil
- Grapefruit: grapefruit-oil
- Tea Tree (Melaleuca): melaleuca-oil
- Eucalyptus: eucalyptus-oil
- Oregano: oregano-oil
- Copaiba: copaiba-oil
- Deep Blue Rub: deep-blue-rub
- On Guard Protective Blend: on-guard-protective-blend
- DigestZen: digestzen-digestive-blend
- Breathe Respiratory Blend: breathe-respiratory-blend
- Lifelong Vitality Pack: lifelong-vitality-pack
- MetaPWR System: metapwr-system
- ClaryCalm: clarycalm-oil
- PB Assist+: pb-assist
- Fractionated Coconut Oil: fractionated-coconut-oil
- Adaptiv Calming Blend: adaptiv-calming-blend
- Elevation Joyful Blend: elevation-joyful-blend
- InTune Focus Blend: intune-focus-blend
- Balance Grounding Blend: balance-grounding-blend
- Cedarwood: cedarwood-oil
- Vetiver: vetiver-oil
- Japanese Zen Blend: zen-blend
- Rose Touch: rose-touch
- Ylang Ylang: ylang-ylang-oil
- Sandalwood: sandalwood-oil
- Douglas Fir: douglas-fir-oil
- Siberian Fir: siberian-fir-oil
- Petal Diffuser: petal-diffuser
- Lumo Diffuser: lumo-diffuser
- Aroma Lite Diffuser: aroma-lite-diffuser

CRITICAL LINKING RULES:
- When user asks about "orange" recommend [Wild Orange](wild-orange-oil) - there is no generic "orange oil"
- EVERY time you mention an oil name, wrap it in a link: [Oil Name](slug)
- If you mention "diffusing" or "diffuser", link to a diffuser product: [diffuser](petal-diffuser)
- If you mention "lemon", always link: [Lemon](lemon-oil)
- If you mention "grapefruit", always link: [Grapefruit](grapefruit-oil)
- If you mention "carrier oil" or "dilution", link: [Fractionated Coconut Oil](fractionated-coconut-oil)
- Never write product names without links - ALWAYS format as [Product](slug)

Always respond with compassion and practical guidance.`;

// Seasonal promotions data with timing
const getSeasonalPromotion = () => {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  
  const promotions = {
    1: { title: "New Year Wellness Reset", subtitle: "Start fresh with cleansing & vitality bundles", link: "new-year-reset" },
    2: { title: "Love & Self-Care", subtitle: "Heart-opening oils & romantic wellness sets", link: "valentines-collection" },
    3: { title: "Spring Renewal Collection", subtitle: "Fresh energy & seasonal allergy support", link: "spring-collection" },
    4: { title: "Earth Day Special", subtitle: "Natural home essentials & eco-bundles", link: "earth-day-bundle" },
    5: { title: "Mother's Day Gifts", subtitle: "Spa-quality wellness sets for mom", link: "mothers-day-collection" },
    6: { title: "Summer Vitality", subtitle: "Energy, sun care & outdoor wellness kits", link: "summer-collection" },
    7: { title: "Mid-Year Loyalty Rewards", subtitle: "Special pricing for dedicated members", link: "loyalty-rewards" },
    8: { title: "Back to School Focus", subtitle: "Concentration & immune support bundles", link: "back-to-school-bundle" },
    9: { title: "Fall Harvest Wellness", subtitle: "Cozy immunity & seasonal transition support", link: "fall-collection" },
    10: { title: "Spooktacular Wellness", subtitle: "Immunity boosters & grounding blends", link: "october-specials" },
    11: { title: "Gratitude & Gathering", subtitle: "Holiday prep & stress relief essentials", link: "thanksgiving-bundle" },
    12: { title: "Holiday Wellness Gifts", subtitle: "Festive bundles & seasonal joy blends", link: "holiday-collection" }
  };
  
  return promotions[month];
};

export default function LotusAI({ onClose }) {
  const [view, setView] = useState("menu");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome to iTerra™ Concierge. How may I guide your wellness journey today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMood, setSelectedMood] = useState("");
  const [oilRecommendation, setOilRecommendation] = useState(null);
  const [promotion, setPromotion] = useState(getSeasonalPromotion());
  
  const messagesEndRef = useRef(null);
  const speechSynthesis = window.speechSynthesis;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const convertLinksToHTML = (text) => {
    return text.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (match, name, slug) => {
      const url = `${DOTERRA_BASE_URL}${slug}`;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--rosegold); text-decoration: underline; font-weight: 600;">${name}</a>`;
    });
  };

  const speakMessage = (text) => {
    if (!speechSynthesis) return;

    speechSynthesis.cancel();

    // Remove all markdown, formatting, and special characters
    let cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/`{1,3}[^`]+`{1,3}/g, '')
      .replace(/_{1,2}([^_]+)_{1,2}/g, '$1')
      .replace(/~~([^~]+)~~/g, '$1')
      .replace(/\n\n+/g, '. ')
      .replace(/\n/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/•/g, '')
      .replace(/–/g, '-')
      .replace(/—/g, '-')
      .trim();
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Load voices if not already loaded
    let voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
      speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices();
        selectVoice();
      };
    } else {
      selectVoice();
    }
    
    function selectVoice() {
      // Natural conversational voice (similar to ChatGPT voice)
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google US English') ||
        voice.name.includes('Microsoft Zira') ||
        voice.name.includes('Samantha') ||
        voice.lang === 'en-US'
      ) || voices.find(voice => 
        voice.lang.startsWith('en')
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      // Natural conversational settings
      utterance.rate = 1.0;      // Normal speaking pace
      utterance.pitch = 1.0;     // Natural tone
      utterance.volume = 0.9;    // Clear volume
      
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
    
    selectVoice();
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const conversationHistory = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n\n');
      const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${conversationHistory}\n\nUser: ${input}\n\nAssistant:`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: fullPrompt,
        add_context_from_internet: false
      });

      const assistantMessage = {
        role: "assistant",
        content: response || "I apologize, I couldn't process that request."
      };

      setMessages(prev => [...prev, assistantMessage]);
      speakMessage(assistantMessage.content);

    } catch (err) {
      console.error('LLM Error:', err);
      setError(err.message);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, I'm experiencing technical difficulties. Please try again in a moment."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleAssociateLogin = () => setView("login");
  const handleBackToMenu = () => { setView("menu"); stopSpeaking(); };
  const handleStartChat = () => setView("chat");
  const handleOilOfDay = () => setView("oilofday");
  const handleMeditation = () => setView("meditation");
  const handleSeasonalCare = () => setView("seasonal");

  const getOilRecommendation = (mood) => {
    const recommendations = {
      stressed: { name: "Calming Blend", slug: "adaptiv-calming-blend", description: "Promotes feelings of tranquility and composure during life's most stressful moments.", usage: "Apply to pulse points, diffuse, or inhale directly from hands." },
      anxious: { name: "Lavender Essential Oil", slug: "lavender-oil", description: "Widely recognized for calming properties, perfect for unwinding after a long day.", usage: "Add to bath, diffuse before bed, or apply topically to temples." },
      tired: { name: "Peppermint Essential Oil", slug: "peppermint-oil", description: "Invigorating and refreshing, promotes focus and sustained energy.", usage: "Diffuse for alertness, or apply to back of neck for a cooling boost." },
      sad: { name: "Uplifting Blend", slug: "elevation-joyful-blend", description: "Combats sad feelings and promotes a positive mood with citrus and spice notes.", usage: "Diffuse throughout the day or apply over the heart." },
      foggy: { name: "Focus Blend", slug: "intune-focus-blend", description: "Enhances mental clarity and supports sustained attention.", usage: "Apply to temples and back of neck before tasks requiring concentration." },
      restless: { name: "Grounding Blend", slug: "balance-grounding-blend", description: "Promotes whole-body relaxation and feelings of balance.", usage: "Apply to bottoms of feet, wrists, or diffuse for a calming atmosphere." },
      joyful: { name: "Citrus Bloom Blend", slug: "citrus-bloom", description: "Amplifies positive energy and uplifts the spirit with bright, floral notes.", usage: "Diffuse to enhance happy moments or wear as a natural perfume." },
      romantic: { name: "Whisper Blend", slug: "whisper-blend", description: "Sensual and alluring, perfect for intimate moments.", usage: "Apply to pulse points as a natural fragrance." }
    };
    
    setOilRecommendation(recommendations[mood] || null);
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "linear-gradient(135deg, rgba(32,22,20,0.98), rgba(43,31,28,0.98))",
      backdropFilter: "blur(12px)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.08,
        background: "url('data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23DAA57F' stroke-width='1.5'%3E%3Ccircle cx='200' cy='200' r='60'/%3E%3Ccircle cx='200' cy='140' r='60'/%3E%3Ccircle cx='252' cy='170' r='60'/%3E%3Ccircle cx='252' cy='230' r='60'/%3E%3Ccircle cx='200' cy='260' r='60'/%3E%3Ccircle cx='148' cy='230' r='60'/%3E%3Ccircle cx='148' cy='170' r='60'/%3E%3C/g%3E%3C/svg%3E') center/400px repeat",
        animation: "spin 240s linear infinite"
      }} />

      <div style={{
        position: "relative",
        width: "min(600px, 95vw)",
        height: "min(700px, 90vh)",
        background: "linear-gradient(180deg, rgba(218,165,127,0.12), rgba(185,135,93,0.08))",
        border: "1px solid rgba(218,165,127,0.3)",
        borderRadius: 24,
        boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(218,165,127,0.35)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        <div style={{
          padding: 20,
          borderBottom: "1px solid rgba(218,165,127,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(218,165,127,0.08)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {(view !== "menu") && (
              <button onClick={handleBackToMenu} style={{ background: "transparent", border: 0, color: "var(--champagne)", fontSize: 20, cursor: "pointer" }}>←</button>
            )}
            <div>
              <h2 style={{ fontSize: 22, color: "var(--champagne)", margin: 0, fontFamily: "'Playfair Display', serif" }}>🪷 iTerra Concierge</h2>
              <p style={{ fontSize: 12, color: "var(--rosegold)", margin: 0 }}>
                {view === "menu" ? "Wellness Intelligence Portal" : "Your Personal Guide"}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={onClose} style={{ padding: "8px 16px", borderRadius: 8, background: "linear-gradient(90deg,var(--bronze),var(--rosegold))", border: 0, color: "#1b0b06", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Back to Home</button>
            <button onClick={onClose} style={{ background: "transparent", border: 0, color: "var(--champagne)", fontSize: 24, cursor: "pointer" }}><X /></button>
          </div>
        </div>

        {view === "menu" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} style={{ fontSize: 80, marginBottom: 20, textAlign: "center" }}>🪷</motion.div>
            <h3 style={{ fontSize: 20, color: "var(--champagne)", textAlign: "center", marginBottom: 32, fontFamily: "'Playfair Display', serif" }}>How may I serve you today?</h3>
            
            <div style={{ width: "100%", maxWidth: 420, margin: "0 auto", display: "grid", gap: 16 }}>
              <motion.button
                onClick={handleStartChat}
                whileHover={{ scale: 1.02 }}
                animate={{ boxShadow: ["0 8px 24px rgba(230,183,165,0.3)", "0 12px 32px rgba(230,183,165,0.5)", "0 8px 24px rgba(230,183,165,0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "linear-gradient(135deg,rgba(230,183,165,0.35),rgba(218,165,112,0.25))",
                  border: "2px solid rgba(230,183,165,0.5)",
                  color: "var(--champagne)",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 18,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10
                }}
              >
                <span style={{ fontSize: 32, filter: "grayscale(30%)" }}>✦</span>
                <div style={{ fontSize: 20, fontFamily: "'Playfair Display', serif" }}>Personal Wellness Guidance</div>
                <div style={{ fontSize: 13, fontWeight: 400, opacity: 0.9 }}>Ask about oils, recipes, wellness programs</div>
              </motion.button>

              <button onClick={() => setView("gifts")} style={{ padding: 18, borderRadius: 12, background: "rgba(220,20,60,0.15)", border: "1px solid rgba(220,20,60,0.3)", color: "var(--champagne)", fontWeight: 600, cursor: "pointer", fontSize: 15, textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24, filter: "grayscale(30%)" }}>🎁</span>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif" }}>Holiday Wellness Gifts</div>
                  <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.8, marginTop: 3 }}>Curated gift sets & DIY holiday recipe</div>
                </div>
              </button>

              <button onClick={handleOilOfDay} style={{ padding: 18, borderRadius: 12, background: "rgba(245,222,179,0.06)", border: "1px solid rgba(218,165,112,0.2)", color: "var(--champagne)", fontWeight: 600, cursor: "pointer", fontSize: 15, textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24, filter: "grayscale(30%)" }}>✦</span>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif" }}>Oil of the Day</div>
                  <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.8, marginTop: 3 }}>Personalized mood-based recommendation</div>
                </div>
              </button>

              <button onClick={handleMeditation} style={{ padding: 18, borderRadius: 12, background: "rgba(143,188,143,0.15)", border: "1px solid rgba(143,188,143,0.3)", color: "var(--champagne)", fontWeight: 600, cursor: "pointer", fontSize: 15, textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24, filter: "grayscale(30%)" }}>✦</span>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif" }}>Deep Forest Meditation</div>
                  <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.8, marginTop: 3 }}>Guided meditation with grounding aromatics</div>
                </div>
              </button>

              <button onClick={handleSeasonalCare} style={{ padding: 18, borderRadius: 12, background: "rgba(245,222,179,0.06)", border: "1px solid rgba(218,165,112,0.2)", color: "var(--champagne)", fontWeight: 600, cursor: "pointer", fontSize: 15, textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24, filter: "grayscale(30%)" }}>✦</span>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif" }}>Seasonal Wellness Care</div>
                  <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.8, marginTop: 3 }}>Nature-aligned seasonal protocols</div>
                </div>
              </button>

              <button onClick={handleAssociateLogin} style={{ padding: 16, borderRadius: 12, background: "rgba(245,222,179,0.04)", border: "1px solid rgba(218,165,112,0.15)", color: "var(--rosegold)", fontWeight: 500, cursor: "pointer", fontSize: 14, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 8 }}>
                <User size={18} />
                <span>Associate Portal Login</span>
              </button>
            </div>
          </div>
        )}

        {view === "chat" && (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              {messages.map((msg, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                  <div style={{
                    padding: 14,
                    borderRadius: 16,
                    background: msg.role === "user" ? "linear-gradient(90deg,var(--bronze),var(--rosegold))" : "rgba(245,222,179,0.08)",
                    border: msg.role === "user" ? 0 : "1px solid rgba(245,222,179,0.12)",
                    color: msg.role === "user" ? "#1b0b06" : "var(--champagne)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    position: "relative"
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: convertLinksToHTML(msg.content) }} />
                    {msg.role === "assistant" && idx === messages.length - 1 && !loading && (
                      <button onClick={() => speaking ? stopSpeaking() : speakMessage(msg.content)} style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(218,165,112,0.2)", border: "1px solid rgba(218,165,112,0.3)", borderRadius: 6, padding: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Volume2 size={14} style={{ color: speaking ? "var(--rosegold)" : "var(--champagne)" }} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <div style={{ alignSelf: "flex-start" }}>
                  <div style={{ padding: 14, borderRadius: 16, background: "rgba(245,222,179,0.08)", border: "1px solid rgba(245,222,179,0.12)", display: "flex", alignItems: "center", gap: 8 }}>
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: "var(--rosegold)" }} />
                    <span style={{ color: "var(--champagne)", fontSize: 13 }}>Consulting...</span>
                  </div>
                </div>
              )}

              {error && <div style={{ padding: 12, borderRadius: 8, background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.3)", color: "#ffb3b3", fontSize: 12 }}>Error: {error}</div>}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: 16, borderTop: "1px solid rgba(218,165,127,0.2)", background: "rgba(218,165,127,0.06)" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask about wellness, oils, recipes, programs..." disabled={loading} style={{ flex: 1, padding: 12, borderRadius: 12, background: "rgba(245,222,179,0.06)", border: "1px solid rgba(245,222,179,0.2)", color: "var(--champagne)", fontSize: 14, resize: "none", minHeight: 50, maxHeight: 120, fontFamily: "inherit" }} rows={2} />
                <button onClick={sendMessage} disabled={!input.trim() || loading} style={{ padding: 12, borderRadius: 12, background: input.trim() && !loading ? "linear-gradient(90deg,var(--bronze),var(--rosegold))" : "rgba(245,222,179,0.1)", border: 0, color: input.trim() && !loading ? "#1b0b06" : "rgba(245,222,179,0.3)", cursor: input.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", minWidth: 50, height: 50 }}>
                  <Send size={20} />
                </button>
              </div>
              <p style={{ fontSize: 11, color: "var(--rosegold)", marginTop: 8, textAlign: "center" }}>Press Enter to send • Shift+Enter for new line</p>
            </div>
          </>
        )}

        {view === "oilofday" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 60, marginBottom: 12 }}>✦</div>
              <h3 style={{ fontSize: 22, color: "var(--champagne)", marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Oil of the Day</h3>
              <p style={{ fontSize: 14, color: "var(--rosegold)", lineHeight: 1.6 }}>Select your current mood and receive a personalized essential oil recommendation</p>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", color: "var(--rosegold)", fontSize: 13, marginBottom: 10, fontWeight: 600 }}>How are you feeling today?</label>
              <select value={selectedMood} onChange={(e) => { setSelectedMood(e.target.value); getOilRecommendation(e.target.value); }} style={{ width: "100%", padding: 14, borderRadius: 12, background: "rgba(245,222,179,0.1)", border: "1px solid rgba(245,222,179,0.25)", color: "var(--champagne)", fontSize: 15 }}>
                <option value="" style={{ background: "#2d1810" }}>Choose your mood...</option>
                <option value="stressed" style={{ background: "#2d1810" }}>Stressed & Overwhelmed</option>
                <option value="anxious" style={{ background: "#2d1810" }}>Anxious & Worried</option>
                <option value="tired" style={{ background: "#2d1810" }}>Tired & Sluggish</option>
                <option value="sad" style={{ background: "#2d1810" }}>Sad & Down</option>
                <option value="foggy" style={{ background: "#2d1810" }}>Mentally Foggy</option>
                <option value="restless" style={{ background: "#2d1810" }}>Restless & Unsettled</option>
                <option value="joyful" style={{ background: "#2d1810" }}>Joyful & Happy</option>
                <option value="romantic" style={{ background: "#2d1810" }}>Romantic & Sensual</option>
              </select>
            </div>

            {oilRecommendation && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: 24, borderRadius: 16, background: "linear-gradient(135deg, rgba(218,165,112,0.15), rgba(185,135,93,0.08))", border: "1px solid rgba(218,165,112,0.3)" }}>
                <h4 style={{ fontSize: 18, color: "var(--champagne)", marginBottom: 12, fontWeight: 700 }}>Today's Recommendation</h4>
                <div style={{ fontSize: 20, color: "var(--rosegold)", marginBottom: 8, fontWeight: 600 }}>{oilRecommendation.name}</div>
                <p style={{ fontSize: 14, color: "var(--champagne)", lineHeight: 1.6, marginBottom: 12 }}>{oilRecommendation.description}</p>
                <div style={{ padding: 12, borderRadius: 8, background: "rgba(245,222,179,0.08)", marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: "var(--rosegold)", fontWeight: 600, marginBottom: 4 }}>How to Use:</div>
                  <div style={{ fontSize: 13, color: "var(--champagne)", lineHeight: 1.5 }}>{oilRecommendation.usage}</div>
                </div>
                <a href={`${DOTERRA_BASE_URL}${oilRecommendation.slug}`} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: 14, borderRadius: 12, background: "linear-gradient(90deg,var(--bronze),var(--rosegold))", border: 0, color: "#1b0b06", fontWeight: 700, textAlign: "center", textDecoration: "none", fontSize: 15 }}>Shop This Oil →</a>
              </motion.div>
            )}
          </div>
        )}

        {view === "meditation" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
            <MeditationPlayer
              meditation={{
                    title: "Deep Forest",
                    subtitle: "A 5-Minute Nature Bath Meditation",
                    description: "A grounding guided journey into the heart of an ancient forest, designed to quiet the mind, steady the breath, and reconnect you to deep stillness.",
                    duration: 300,
                    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_4c8e54e391.mp3",
                    oils: [
                      "Douglas Fir",
                      "Siberian Fir",
                      "Balance Grounding Blend",
                      "Cedarwood",
                      "Frankincense", 
                      "Vetiver",
                      "Sandalwood",
                      "Cypress",
                      "White Fir",
                      "Arborvitae",
                      "Black Spruce",
                      "Hinoki",
                      "Saw Palmetto",
                      "Northern Escape Blend",
                      "Anchor Grounding Blend",
                      "Lemon",
                      "Wild Orange",
                      "Grapefruit",
                      "Peppermint",
                      "Spearmint",
                      "Lavender",
                      "Serenity Blend",
                      "Copaiba",
                      "Roman Chamomile",
                      "Ylang Ylang"
                    ],
                  script: `Take a slow, steady breath in… and gently release.
              Let your body soften, your shoulders uncoil, your jaw unhook.
              You are stepping out of the world of noise… and entering the realm of quiet green.

              Inhale… a cool ribbon of forest air.
              Exhale… the tension you arrived with.
              Before you, the forest opens—alive with ancient resin, soft light, and the wisdom of trunks that have weathered a thousand storms.

              Any tree oil can guide you into this sanctuary.
              Each one carries its own tale of sap and sunlight, its own medicine of leaf and bark.
              But we recommend the union of Douglas Fir and Siberian Fir for a reason:
              they don't merely scent the air—they reshape the atmosphere inside you.

              Douglas Fir rises like warm daylight—clearing the mind, widening the inner horizon, lifting what's heavy and stagnant.
              Siberian Fir answers with winter clarity—cooling the nerves, steadying the breath, sharpening presence with that crystalline stillness only the northern forests know.

              Together, they act as compass and anchor.
              Uplift and calm.
              Awakening and release.
              A precise alchemy that brings your system into a rare kind of balance—one that feels both empowered and deeply, fiercely peaceful.

              Take another breath…
              Let the blend thread itself through your ribs, behind your heart, down your spine.
              This is the threshold—where clarity returns, where your internal crown settles back onto your head, where the world quiets enough for you to hear your own authority again.`
                }}
            />
          </div>
        )}

        {view === "seasonal" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
            <SeasonalCare />
          </div>
        )}

        {view === "gifts" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 24, position: "relative" }}>
            {/* Gold Glitter Particles */}
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "fixed",
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  background: `radial-gradient(circle, ${i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FFA500' : '#DAA520'}, transparent)`,
                  borderRadius: "50%",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `float ${Math.random() * 8 + 6}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 4}s`,
                  pointerEvents: "none",
                  filter: "blur(1px)",
                  boxShadow: `0 0 ${Math.random() * 10 + 5}px ${i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FFA500' : '#DAA520'}`
                }}
              />
            ))}
            
            <div style={{textAlign:"center",marginBottom:24,position:"relative",zIndex:2}}>
              <div style={{fontSize:48,marginBottom:12,filter:"drop-shadow(0 0 20px rgba(255,215,0,0.6))"}}>🎁</div>
              <h3 style={{fontSize:22,color:"var(--champagne)",marginBottom:8,fontFamily:"'Playfair Display', serif",textShadow:"0 0 30px rgba(255,215,0,0.4)"}}>{promotion.title}</h3>
              <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.6}}>{promotion.subtitle}</p>
            </div>

            <div style={{display:"grid",gap:16,marginBottom:24,position:"relative",zIndex:2}}>
              <div style={{padding:20,borderRadius:12,background:"linear-gradient(135deg, rgba(220,20,60,0.15), rgba(139,0,0,0.08))",border:"1px solid rgba(220,20,60,0.3)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🎁 Holiday Entertaining Gift Box</h4>
                <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:12,fontStyle:"italic"}}>Perfect for festive gatherings & home ambiance</p>
                <div style={{display:"grid",gap:8,marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Holiday seasonal blend (warm spice)</span>
                    <a href="https://www.doterra.com/US/en/p/holiday-joy-essential-oil-blend" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Mulled cider blend</span>
                    <a href="https://www.doterra.com/US/en/p/wassail" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Holiday diffuser</span>
                    <a href="https://www.doterra.com/US/en/p/lantern-diffuser-holiday" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                </div>
              </div>

              <div style={{padding:20,borderRadius:12,background:"linear-gradient(135deg, rgba(220,20,60,0.15), rgba(139,0,0,0.08))",border:"1px solid rgba(220,20,60,0.3)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🛁 Luxury Spa Gift Box</h4>
                <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:12,fontStyle:"italic"}}>Complete self-care & relaxation experience</p>
                <div style={{display:"grid",gap:8,marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Hand & body lotion gift set</span>
                    <a href="https://www.doterra.com/US/en/p/spa-hand-body-lotion-gift-set" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Holiday bath bomb trio</span>
                    <a href="https://www.doterra.com/US/en/p/holiday-bath-bomb-trio" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Calming seasonal blend</span>
                    <a href="https://www.doterra.com/US/en/p/holiday-peace-essential-oil-blend" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Lavender essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/lavender-essential-oil" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                </div>
              </div>

              <div style={{padding:20,borderRadius:12,background:"linear-gradient(135deg, rgba(220,20,60,0.15), rgba(139,0,0,0.08))",border:"1px solid rgba(220,20,60,0.3)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>❄️ Winter Wellness Gift Box</h4>
                <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:12,fontStyle:"italic"}}>Immune support & seasonal respiratory care</p>
                <div style={{display:"grid",gap:8,marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Himalayan fir essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/himalayan-fir-essential-oil" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Respiratory support blend</span>
                    <a href="https://www.doterra.com/US/en/p/breathe-respiratory-blend" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Protective immune blend</span>
                    <a href="https://www.doterra.com/US/en/p/on-guard-protective-blend" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Frankincense essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/frankincense-essential-oil" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                </div>
              </div>

              <div style={{padding:20,borderRadius:12,background:"linear-gradient(135deg, rgba(220,20,60,0.15), rgba(139,0,0,0.08))",border:"1px solid rgba(220,20,60,0.3)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🌲 Forest Cabin Gift Box</h4>
                <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:12,fontStyle:"italic"}}>Grounding evergreens & woodsy aromas</p>
                <div style={{display:"grid",gap:8,marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Himalayan fir essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/himalayan-fir-essential-oil" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Douglas fir essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/douglas-fir-essential-oil" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Siberian fir essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/siberian-fir-essential-oil" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Cedarwood essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/cedarwood-essential-oil" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                </div>
              </div>

              <div style={{padding:20,borderRadius:12,background:"linear-gradient(135deg, rgba(220,20,60,0.15), rgba(139,0,0,0.08))",border:"1px solid rgba(220,20,60,0.3)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>💝 Beauty & Skincare Gift Box</h4>
                <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:12,fontStyle:"italic"}}>Premium skincare essentials for radiance</p>
                <div style={{display:"grid",gap:8,marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Hand & body lotion gift set</span>
                    <a href="https://www.doterra.com/US/en/p/spa-hand-body-lotion-gift-set" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Rose touch roller</span>
                    <a href="https://www.doterra.com/US/en/p/rose-touch" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Lavender essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/lavender-essential-oil" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>• Frankincense essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/frankincense-essential-oil" target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:11,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(218,165,112,0.2)",position:"relative",zIndex:2,boxShadow:"0 0 40px rgba(255,215,0,0.15)"}}>
              <h4 style={{fontSize:17,color:"var(--champagne)",fontWeight:700,marginBottom:14}}>🍪 Sugar-Free Holiday Cookie Recipe</h4>
              <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:12}}>Allergen-Free • Essential Oil Enhanced • Downloadable</p>
              
              <div style={{marginBottom:16}}>
                <p style={{fontSize:13,color:"var(--champagne)",lineHeight:1.7,marginBottom:10}}>
                  <strong>Ingredients:</strong>
                </p>
                <div style={{display:"grid",gap:8,marginBottom:14}}>
                  <div style={{fontSize:13,color:"var(--champagne)",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>• 2 cups almond flour</div>
                  <div style={{fontSize:13,color:"var(--champagne)",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>• 1/2 cup coconut oil (melted)</div>
                  <div style={{fontSize:13,color:"var(--champagne)",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>• 1/3 cup monk fruit sweetener</div>
                  <div style={{fontSize:13,color:"var(--champagne)",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>• 1 egg (or flax egg for vegan)</div>
                  <div style={{fontSize:13,color:"var(--champagne)",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>• 1 tsp vanilla extract</div>
                  <div style={{fontSize:13,color:"var(--champagne)",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>• 1/2 tsp baking soda</div>
                  <div style={{fontSize:13,color:"var(--champagne)",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>• 1/4 tsp sea salt</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:13,color:"var(--champagne)"}}>• 3 drops Wild Orange essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/wild-orange-oil" target="_blank" rel="noopener noreferrer" style={{padding:"4px 10px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:10,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:13,color:"var(--champagne)"}}>• 2 drops Cinnamon Bark essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/cinnamon-bark-oil" target="_blank" rel="noopener noreferrer" style={{padding:"4px 10px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:10,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:13,color:"var(--champagne)"}}>• 1 drop Ginger essential oil</span>
                    <a href="https://www.doterra.com/US/en/p/ginger-oil" target="_blank" rel="noopener noreferrer" style={{padding:"4px 10px",borderRadius:6,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,textDecoration:"none",fontSize:10,whiteSpace:"nowrap"}}>Shop</a>
                  </div>
                </div>
                <p style={{fontSize:13,color:"var(--champagne)",lineHeight:1.7,marginBottom:10}}>
                  <strong>Instructions:</strong>
                </p>
                <ol style={{fontSize:13,color:"var(--champagne)",lineHeight:1.7,paddingLeft:20,marginBottom:14}}>
                  <li>Preheat oven to 350°F</li>
                  <li>Mix dry ingredients in one bowl</li>
                  <li>Combine wet ingredients + essential oils in another</li>
                  <li>Fold wet into dry until dough forms</li>
                  <li>Roll into 1-inch balls, flatten slightly on baking sheet</li>
                  <li>Bake 10-12 minutes until edges are golden</li>
                  <li>Cool completely before serving</li>
                </ol>
              </div>

              <button onClick={() => window.open('https://healthlifestyleservices.com/holiday-cookie-recipe', '_blank')} style={{width:"100%",padding:14,borderRadius:12,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Download Full Recipe Card (PDF) →
              </button>
            </div>
          </div>
        )}

        {view === "login" && <AssociateLoginEmbed onBack={handleBackToMenu} onClose={onClose} />}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-30px) translateX(10px) rotate(90deg); opacity: 0.8; }
          50% { transform: translateY(-60px) translateX(-10px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(-30px) translateX(15px) rotate(270deg); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

function AssociateLoginEmbed({ onBack, onClose }) {
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [associateId, setAssociateId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const users = await base44.entities.User.filter({ email: email });
      
      if (users.length === 0) {
        setError('No account found. Please contact your upline to get registered.');
        setLoading(false);
        return;
      }

      const user = users[0];

      if (!user.backoffice_access) {
        setError('Your account does not have back office access. Contact your upline.');
        setLoading(false);
        return;
      }

      if (user.password !== password) {
        setError('Invalid password. Please try again or use "Forgot Password".');
        setLoading(false);
        return;
      }

      base44.auth.redirectToLogin(window.location.origin + '/BackOffice');
      
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const users = await base44.entities.User.filter({ email: email, associate_id: associateId });
      
      if (users.length === 0) {
        setError('No account found with that email and associate ID.');
        setLoading(false);
        return;
      }

      await base44.integrations.Core.SendEmail({
        to: email,
        subject: 'iTerra™ Password Recovery',
        body: `Your password is: ${users[0].password}\n\nCharter Code (backup): ${users[0].charter_code}\n\nAssociate ID: ${users[0].associate_id}\n\nKeep this secure.`
      });

      setStep('login');
      setError('');
      alert('Password sent to your email!');
      
    } catch (err) {
      setError('Recovery failed. Contact your upline for assistance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, padding: 32, overflowY: "auto" }}>
      <h3 style={{ fontSize: 20, color: "var(--champagne)", marginBottom: 6, textAlign: "center" }}>
        {step === 'reset' ? 'Recover Password' : 'Associate Portal'}
      </h3>
      <p style={{ color: "var(--rosegold)", textAlign: "center", marginBottom: 24, fontSize: 13 }}>
        {step === 'reset' ? 'Enter your email and associate ID' : 'Secure access for wellness advocates'}
      </p>

      {error && <div style={{ padding: 12, borderRadius: 8, background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.3)", marginBottom: 16, color: "#ffb3b3", fontSize: 13 }}>{error}</div>}

      {step === 'login' && (
        <form onSubmit={handleLogin} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={{ display: "block", color: "var(--rosegold)", fontSize: 12, marginBottom: 6, fontWeight: 600 }}>Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(245,222,179,0.04)", border: "1px solid rgba(245,222,179,0.12)", color: "var(--champagne)", fontSize: 14 }} />
          </div>
          <div>
            <label style={{ display: "block", color: "var(--rosegold)", fontSize: 12, marginBottom: 6, fontWeight: 600 }}>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(245,222,179,0.04)", border: "1px solid rgba(245,222,179,0.12)", color: "var(--champagne)", fontSize: 14 }} />
          </div>
          <button type="submit" disabled={loading} style={{ padding: 14, borderRadius: 12, background: "linear-gradient(90deg,var(--bronze),var(--rosegold))", border: 0, color: "#1b0b06", fontWeight: 700, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", marginTop: 8 }}>
            {loading ? "Verifying..." : "Access Back Office →"}
          </button>
          <button type="button" onClick={() => setStep('reset')} style={{ background: "transparent", border: 0, color: "var(--rosegold)", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>Forgot password?</button>
        </form>
      )}

      {step === 'reset' && (
        <form onSubmit={handleReset} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={{ display: "block", color: "var(--rosegold)", fontSize: 12, marginBottom: 6, fontWeight: 600 }}>Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(245,222,179,0.04)", border: "1px solid rgba(245,222,179,0.12)", color: "var(--champagne)", fontSize: 14 }} />
          </div>
          <div>
            <label style={{ display: "block", color: "var(--rosegold)", fontSize: 12, marginBottom: 6, fontWeight: 600 }}>Associate ID</label>
            <input type="text" required value={associateId} onChange={(e) => setAssociateId(e.target.value)} placeholder="12345678" style={{ width: "100%", padding: 12, borderRadius: 8, background: "rgba(245,222,179,0.04)", border: "1px solid rgba(245,222,179,0.12)", color: "var(--champagne)", fontSize: 14 }} />
          </div>
          <button type="submit" disabled={loading} style={{ padding: 14, borderRadius: 12, background: "linear-gradient(90deg,var(--bronze),var(--rosegold))", border: 0, color: "#1b0b06", fontWeight: 700, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", marginTop: 8 }}>
            {loading ? "Sending..." : "Send Password Recovery Email"}
          </button>
          <button type="button" onClick={() => { setStep('login'); setError(''); }} style={{ background: "transparent", border: 0, color: "var(--rosegold)", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>← Back to login</button>
        </form>
      )}
    </div>
  );
}