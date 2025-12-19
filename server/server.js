import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json({ limit: "1mb" }));

const hasKey = !!process.env.OPENAI_API_KEY;
const openai = hasKey ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// DoTERRA link resolver configuration
const REGION = process.env.DOTERRA_REGION_PATH || "/US/en";
const DOTERRA_ORIGIN = "https://www.doterra.com";
const DEFAULT_SITE = process.env.DOTERRA_DEFAULT_SITE || "jennawilliams1";

// Known slug mappings (same as frontend)
const DOTERRA_SLUG_FIX = {
  // Single-word oils that need -oil suffix
  "lemon": "lemon-oil",
  "lavender": "lavender-oil",
  "peppermint": "peppermint-oil",
  "frankincense": "frankincense-oil",
  "grapefruit": "grapefruit-oil",
  "eucalyptus": "eucalyptus-oil",
  "oregano": "oregano-oil",
  "copaiba": "copaiba-oil",
  "cedarwood": "cedarwood-oil",
  "vetiver": "vetiver-oil",
  "sandalwood": "sandalwood-oil",
  "bergamot": "bergamot-oil",
  "geranium": "geranium-oil",
  "lemongrass": "lemongrass-oil",
  "marjoram": "marjoram-oil",
  "myrrh": "myrrh-oil",
  "rose": "rose-oil",
  "rosemary": "rosemary-oil",
  "wintergreen": "wintergreen-oil",
  "ginger": "ginger-oil",
  "cassia": "cassia-oil",
  
  // Blends that are already correctly formatted (keep as-is)
  "wild-orange-oil": "wild-orange-oil",
  "ylang-ylang-oil": "ylang-ylang-oil",
  "clary-sage-oil": "clary-sage-oil",
  "frankincense-oil": "frankincense-oil",
  "lavender-oil": "lavender-oil",
  "peppermint-oil": "peppermint-oil",
  "copaiba-oil": "copaiba-oil",
  "cedarwood-oil": "cedarwood-oil",
  "vetiver-oil": "vetiver-oil",
  "bergamot-oil": "bergamot-oil",
  "geranium-oil": "geranium-oil",
  "lemongrass-oil": "lemongrass-oil",
  "marjoram-oil": "marjoram-oil",
  "myrrh-oil": "myrrh-oil",
  "rose-oil": "rose-oil",
  "rosemary-oil": "rosemary-oil",
  "sandalwood-oil": "sandalwood-oil",
  "wintergreen-oil": "wintergreen-oil",
  "grapefruit-oil": "grapefruit-oil",
  "eucalyptus-oil": "eucalyptus-oil",
  "oregano-oil": "oregano-oil",
  
  // Wild orange and Ylang Ylang - short versions
  "wild-orange": "wild-orange-oil",
  "ylang-ylang": "ylang-ylang-oil",
  "clary-sage": "clary-sage-oil",
  
  // Blends - correct full product names
  "console": "console-comforting-blend-oil",
  "console-comforting-blend": "console-comforting-blend-oil",
  "aromatouch": "aromatouch-massage-blend-oil",
  "aromatouch-massage-blend": "aromatouch-massage-blend-oil",
  "cheer": "cheer-uplifting-blend-oil",
  "cheer-uplifting-blend": "cheer-uplifting-blend-oil",
  "citrus-bliss-invigorating-blend": "citrus-bliss-oil",
  "citrus-bliss": "citrus-bliss-oil",
  "digestzen": "digestzen-oil",
  "digestzen-digestive-blend": "digestzen-oil",
  "adaptiv": "adaptiv-oil",
  "adaptiv-calming-blend": "adaptiv-oil",
  "intune": "in-tune-oil",
  "intune-focus-blend": "in-tune-oil",
  "purify": "purify-oil",
  "purify-cleansing-blend": "purify-oil",
  "on-guard": "on-guard-oil",
  "on-guard-protective-blend": "on-guard-oil",
  "balance-grounding-blend": "balance-grounding-blend-oil",
  "breathe-respiratory-blend": "breathe-respiratory-blend-oil",
  "serenity-restful-blend": "serenity-restful-blend-oil",
  "terrashield-outdoor-blend": "terrashield-outdoor-blend-oil",
  
  // MetaPWR variations
  "metapwr-system": "metapwr-kit",
  "metapwr-metabolic-blend": "metapwr-oil",
  "metapwr-metabolic-system": "metapwr-metabolic-system",
  "metapwr-oil": "metapwr-oil",
  "metapwr-softgels": "metapwr-softgels",
  "metapwr-advantage": "metapwr-advantage",
  
  // Deep Blue
  "deep-blue": "deep-blue-oil",
  "deep-blue-soothing-blend": "deep-blue-soothing-blend",
  "deep-blue-polyphenol-complex": "deep-blue-polyphenol-complex",
  
  // Special product name mappings
  "melaleuca": "doterra-tea-tree",
  "melaleuca-oil": "doterra-tea-tree",
  "sage-oil": "sage-oil",
  "roman-chamomile": "roman-chamomile-oil",
  "sandalwood-indian": "sandalwood-oil",
  
  // Touch rollers and diluted versions
  "rose-touch": "doterra-rose-touch",
  "frankincense-touch": "frankincense-touch",
  "lavender-touch": "lavender-touch",
  "jasmine-touch": "jasmine-touch",
  "digestzen-touch": "digestzen-touch",
  
  // Supplements and capsules
  "terrazyme-digestive-enzyme-complex": "digestzen-terrazyme",
  "terrazyme": "digestzen-terrazyme",
  "turmeric-dual-chamber-capsules": "turmeric-dual-chamber-capsules",
  "bone-nutrient-essential-complex": "bone-nutrient-essential-complex",
  "phytoestrogen-essential-complex": "phytoestrogen-essential-complex",
  "clarycalm-monthly-blend": "clarycalm-monthly-blend",
  "ddr-prime-softgels": "ddr-prime-softgels",
  "copaiba-softgels": "copaiba-softgels",
  "adaptiv-calming-blend-capsules": "adaptiv-calming-blend-capsules",
  "on-guard-plus-softgels": "on-guard-plus-softgels",
  "peppermint-beadlets-digestive-health": "peppermint-beadlets-digestive-health",
  "on-guard-beadlets": "on-guard-beadlets",
  "on-guard-throat-drops": "on-guard-throat-drops",
  "yarrow-pom-capsules": "yarrow-pom-capsules",
  "greens-digestive-health-supplement": "greens-digestive-health-supplement",
  "mito2max-energy-metabolism-complex": "mito2max-energy-metabolism-complex",
  "pb-assist-jr": "pb-assist-jr",
  
  // Skincare
  "yarrow-pom-active-botanical-duo": "yarrow-pom-active-botanical-duo",
  "yarrow-pom-serum": "yarrow-pom-active-botanical-duo",
  "immortelle-anti-aging-blend": "immortelle-anti-aging-blend",
  "anti-aging-moisturizer": "anti-aging-moisturizer",
  "hydrating-cream": "hydrating-cream",
  "tightening-serum": "tightening-serum",
  "correct-x-essential-ointment": "correct-x-essential-ointment",
  
  // Personal care & cleaning
  "on-guard-cleaner-concentrate": "on-guard-cleaner-concentrate",
  "on-guard-foaming-hand-wash": "on-guard-foaming-hand-wash",
  "on-guard-laundry-detergent": "on-guard-laundry-detergent",
  "on-guard-mouthwash": "on-guard-mouthwash",
  "on-guard-natural-whitening-toothpaste": "on-guard-natural-whitening-toothpaste",
  "on-guard-sanitizing-mist": "on-guard-sanitizing-mist",
  "abode-multi-purpose-cleaner": "abode-multi-purpose-cleaner",
  "whisper-blend-for-women": "whisper-blend-for-women",
  "elevation-joyful-blend": "elevation-joyful-blend",
  
  // Kits and accessories
  "home-essentials-kit": "home-essentials-enrollment-kit",
  "foundational-wellness-bundle": "foundational-wellness-bundle",
  "family-essentials-kit-and-petal-diffuser": "family-essentials-kit-and-petal-diffuser",
  "vegetable-capsules": "veggie-caps",
  "fractionated-coconut-oil": "fractionated-coconut-oil",
  "carrier-oils": "carrier-oils",
  "essential-oil-accessories": "essential-oil-accessories",
  "essential-oil-bottles-5ml-amber": "essential-oil-bottles-5ml-amber",
  "essential-oil-roller-bottles": "essential-oil-roller-bottles",
  "glass-spray-bottles": "glass-spray-bottles",
  
  // Diffusers
  "petal-diffuser": "petal-diffuser",
  "laluz-diffuser": "laluz-diffuser",
  "lumo-diffuser": "lumo-diffuser",
  "roam-diffuser": "roam-diffuser"
}

function sanitizeSite(site) {
  const s = String(site || "").trim().toLowerCase();
  if (!s) return DEFAULT_SITE;
  if (!/^[a-z0-9_-]{3,64}$/.test(s)) return DEFAULT_SITE;
  return s;
}

function sanitizeKey(key) {
  const k = String(key || "").trim();
  if (!k) return "";
  return k.slice(0, 120);
}

function buildReplicatedProductUrl(site, slug) {
  return `${DOTERRA_ORIGIN}${REGION}/site/${site}/p/${slug}`;
}

function buildReplicatedHome(site) {
  return `${DOTERRA_ORIGIN}${REGION}/site/${site}`;
}

function buildFullSearchUrl(site, query) {
  const q = encodeURIComponent(query);
  return `${DOTERRA_ORIGIN}${REGION}/site/${site}/search/fullsearch?saveSearch=false&text=${q}&contentType=PRODUCT`;
}

// DoTERRA link resolver endpoint - FIXED to prevent "everything becomes foundational-wellness-bundle"
app.get("/api/doterra/go/:key", async (req, res) => {
  const site = sanitizeSite(req.query.site);
  const rawKey = sanitizeKey(req.params.key);

  if (!rawKey) {
    return res.redirect(302, buildReplicatedHome(site));
  }

  const keyLower = rawKey.toLowerCase();
  
  // 1) Check if we have a known slug mapping
  const slug = DOTERRA_SLUG_FIX[keyLower] || keyLower;

  // 2) Determine if we should go direct to product page or to search
  // Go direct if: (a) key is in our mapping table, OR (b) key already looks like a slug (contains hyphen)
  const shouldGoDirect = Boolean(DOTERRA_SLUG_FIX[keyLower]) || rawKey.includes("-");

  if (shouldGoDirect) {
    // Try the replicated product page (with associate attribution)
    return res.redirect(302, buildReplicatedProductUrl(site, slug));
  } else {
    // For unknown/generic names, send to search results instead of guessing
    // This prevents all unknowns from collapsing to one promo product
    return res.redirect(302, buildFullSearchUrl(site, rawKey));
  }
});

app.get("/", (_req, res) => res.send("Iterra-GO API is running. Try /api/health"));

app.get("/api/health", (_req, res) =>
  res.json({ ok: true, ai: hasKey ? "enabled" : "stub" })
);

app.post("/api/ai", async (req, res) => {
  const { prompt, context, response_json_schema } = req.body ?? {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing prompt (string)." });
  }

  // ✅ No key yet → return stub JSON (keeps UI working)
  if (!hasKey) {
    return res.json({
      text: response_json_schema 
        ? JSON.stringify({ stub: true, message: "AI offline" })
        : "AI is offline (no API key set). Backend is healthy and ready.",
      stub: true
    });
  }

  try {
    const input = (context ? `Context:\n${context}\n\n` : "") + prompt;
    const options = {
      model: process.env.OPENAI_MODEL || "gpt-4",
      messages: [
        { role: "system", content: "You are the iTerra™ Wellness Concierge AI - an elegant, knowledgeable guide combining expertise as a nutritionist, aromatherapist, and wellness associate for holistic wellness using doTERRA essential oils and natural solutions. SAFETY RULES: (1) Raw chicken bones with marrow: only suggest if bones will be ground to a fine, meal-like consistency with equipment that can truly handle poultry bones, because whole or poorly ground bones carry real risks (choking, broken teeth, GI injury/obstruction, digestive upset from marrow richness). Always prioritize organic/grass-fed sources to reduce exposure to lower-quality inputs and residues—this is risk management, not a medical claim. (2) Alcohol/tinctures: NEVER recommend vodka, alcohol, or alcohol-based tinctures for any purpose. Focus on alcohol-free alternatives like glycerin-based extracts, water-based preparations, or doTERRA products." },
        { role: "user", content: input }
      ],
      temperature: 0.7,
      max_completion_tokens: 1500
    };

    // Enable JSON mode if schema provided
    if (response_json_schema) {
      options.response_format = { type: "json_object" };
    }

    const r = await openai.chat.completions.create(options);
    return res.json({ text: r.choices[0].message.content });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "AI server error" });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`AI server listening on ${port}`));

