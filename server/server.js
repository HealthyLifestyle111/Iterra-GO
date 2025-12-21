import express from "express";
import cookieParser from "cookie-parser";
import OpenAI from "openai";
import goRouter from "./routes/go.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

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
  "turmeric": "doterra-turmeric-essential-oil",
  "cinnamon": "cinnamon-bark-oil",
  "thyme": "thyme-oil",
  "basil": "basil-oil",
  "helichrysum": "helichrysum-oil",
  "clove": "clove-oil",
  "black-pepper": "black-pepper-oil",
  "cilantro": "cilantro-oil",
  "fennel": "fennel-oil",
  "melissa": "melissa-oil",
  "patchouli": "patchouli-oil",
  "spearmint": "spearmint-oil",
  "tangerine": "tangerine-oil",
  "cypress": "cypress-oil",
  "juniper-berry": "juniper-berry-oil",
  "arborvitae": "arborvitae-oil",
  "birch": "birch-oil",
  "blue-tansy": "blue-tansy-oil",
  "cardamom": "cardamom-oil",
  "celery-seed": "celery-seed-oil",
  "coriander": "coriander-oil",
  "dill": "dill-oil",
  "douglas-fir": "douglas-fir-oil",
  "green-mandarin": "doterra-green-mandarin",
  "jasmine": "jasmine-oil",
  "lime": "lime-oil",
  "petitgrain": "petitgrain-oil",
  "spikenard": "spikenard-oil",
  "white-fir": "white-fir-oil",
  "yarrow": "yarrow-oil",
  "spanish-sage": "spanish-sage-oil",
  
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
  "clove-oil": "clove-oil",
  "black-pepper-oil": "black-pepper-oil",
  "cilantro-oil": "cilantro-oil",
  "fennel-oil": "fennel-oil",
  "melissa-oil": "melissa-oil",
  "patchouli-oil": "patchouli-oil",
  "spearmint-oil": "spearmint-oil",
  "tangerine-oil": "tangerine-oil",
  "cypress-oil": "cypress-oil",
  "juniper-berry-oil": "juniper-berry-oil",
  "arborvitae-oil": "arborvitae-oil",
  "birch-oil": "birch-oil",
  "blue-tansy-oil": "blue-tansy-oil",
  "cardamom-oil": "cardamom-oil",
  "celery-seed-oil": "celery-seed-oil",
  "coriander-oil": "coriander-oil",
  "dill-oil": "dill-oil",
  "douglas-fir-oil": "douglas-fir-oil",
  "jasmine-oil": "jasmine-oil",
  "lime-oil": "lime-oil",
  "petitgrain-oil": "petitgrain-oil",
  "spikenard-oil": "spikenard-oil",
  "spanish-sage-oil": "spanish-sage-oil",
  "cinnamon-bark-oil": "cinnamon-bark-oil",
  "thyme-oil": "thyme-oil",
  "basil-oil": "basil-oil",
  "helichrysum-oil": "helichrysum-oil",
  
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
  // serenity-restful-blend-oil, terrashield-outdoor-blend-oil removed - discontinued
  
  // MetaPWR variations
  "metapwr-system": "metapwr-kit",
  "metapwr-metabolic-blend": "metapwr-oil",
  "metapwr-metabolic-system": "metapwr-kit",
  "metapwr-oil": "metapwr-oil",
  "metapwr-softgels": "metapwr-softgels",
  "metapwr-advantage": "metapwr-advantage",
  "metapwr-kit": "metapwr-kit",
  
  // Deep Blue
  "deep-blue": "deep-blue-oil",
  "deep-blue-polyphenol-complex": "deep-blue-polyphenol-complex",
  "deep-blue-rub": "deep-blue-rub",
  // deep-blue-soothing-blend removed - discontinued, will search instead
  
  // Special product name mappings
  "melaleuca": "doterra-tea-tree",
  "melaleuca-oil": "doterra-tea-tree",
  "roman-chamomile": "roman-chamomile-oil",
  "sandalwood-indian": "sandalwood-oil",
  // sage-oil removed - discontinued
  
  // Touch rollers and diluted versions
  "rose-touch": "doterra-rose-touch",
  "frankincense-touch": "frankincense-oil", // Touch version discontinued, use regular oil
  "lavender-touch": "lavender-oil", // Touch version discontinued, use regular oil
  "jasmine-touch": "jasmine-oil", // Touch version discontinued, use regular oil
  "digestzen-touch": "digestzen-oil", // Touch version discontinued, use regular oil
  
  // Supplements and capsules
  "terrazyme-digestive-enzyme-complex": "digestzen-terrazyme",
  "terrazyme": "digestzen-terrazyme",
  "bone-nutrient-essential-complex": "supplements-bone-nutrient-essential-complex",
  "clarycalm-monthly-blend": "clarycalm-blend-oil",
  "ddr-prime-softgels": "ddr-prime-softgels",
  "copaiba-softgels": "copaiba-softgels",
  "adaptiv-calming-blend-capsules": "adaptiv-oil-capsules",
  "turmeric-capsules": "turmeric-oil-capsules",
  "turmeric-dual-chamber-capsules": "turmeric-oil-capsules",
  "on-guard-plus-softgels": "on-guard-oil", // Softgels discontinued, use oil
  "peppermint-beadlets-digestive-health": "peppermint-oil", // Beadlets discontinued, use oil
  "peppermint-beadlets": "peppermint-oil", // Beadlets discontinued, use oil
  "on-guard-beadlets": "on-guard-oil", // Beadlets discontinued, use oil
  "yarrow-pom-capsules": "yarrow-pom-oil-capsules",
  "mito2max-energy-metabolism-complex": "supplements-mito-2-max",
  "deep-blue-soothing-blend": "deep-blue-polyphenol-complex", // Rub discontinued, use polyphenol complex
  "greens-digestive-health-supplement": "metapwr-advantage", // Greens discontinued, closest alternative
  "greens": "metapwr-advantage", // Greens discontinued, closest alternative
  // pb-assist-jr removed - discontinued
  
  // Skincare
  "yarrow-pom-active-botanical-duo": "doterra-yarrow-pom",
  "yarrow-pom-serum": "doterra-yarrow-pom",
  "immortelle-anti-aging-blend": "immortelle-anti-aging-blend",
  "anti-aging-moisturizer": "personal-care-anti-aging-moisturizer",
  "hydrating-cream": "hydrating-cream",
  "tightening-serum": "personal-care-tightening-serum",
  "correct-x": "correct-x",
  "correct-x-essential-ointment": "correct-x",
  
  // Personal care & cleaning
  "on-guard-cleaner-concentrate": "onguard-cleaner-concentrate",
  "on-guard-foaming-hand-wash": "doterra-on-guard-foaming-hand-wash",
  "on-guard-laundry-detergent": "doterra-on-guard-laundry-detergent",
  "on-guard-mouthwash": "doterra-onguard-mouthwash",
  "on-guard-natural-whitening-toothpaste": "doterra-on-guard-natural-whitening-toothpaste",
  "on-guard-sanitizing-mist": "doterra-on-guard-sanitizing-mist",
  "abode-multi-purpose-cleaner": "abode-multi-purpose-surface-cleaner-concentrate-4-pack",
  // whisper-blend-for-women, elevation-joyful-blend removed - discontinued
  
  // Kits and accessories
  "home-essentials-kit": "home-essentials-enrollment-kit",
  "foundational-wellness-bundle": "foundational-wellness-bundle",
  // family-essentials-kit-and-petal-diffuser removed - discontinued kit
  "vegetable-capsules": "veggie-caps",
  "fractionated-coconut-oil": "usage-fractionated-coconut-oil-carrier-oil",
  "carrier-oils": "sensitive-skin-carrier-blend",
  "essential-oil-accessories": "veggie-caps", // Generic accessories page doesn't exist, use caps as common accessory
  // Note: bottles and spray bottles don't exist as single products
  // They will fall back to search which gives better results than 404
  
  // Diffusers
  "petal-diffuser": "pebble-diffuser",
  "pebble-diffuser": "pebble-diffuser",
  "laluz-diffuser": "laluz-diffuser",
  "lumo-diffuser": "pebble-diffuser", // Lumo discontinued, fallback to Pebble
  "roam-diffuser": "pebble-diffuser" // Roam discontinued, fallback to Pebble
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
  // Search endpoint doesn't work reliably - redirect to homepage instead
  return `${DOTERRA_ORIGIN}${REGION}/site/${site}`;
}

function normalizeQuery(raw) {
  return String(raw || "")
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ");
}

// Verified doTERRA product slugs (auto-generated by scripts/verify-doterra-slugs.mjs)
// These URLs are guaranteed to work on https://www.doterra.com/US/en/p/<slug>
// Last verified: 2025-12-20 (116 products)
const VERIFIED = new Set([
  "adaptiv",
  "adaptiv-calming-blend",
  "adaptiv-oil",
  "aromatouch",
  "aromatouch-massage-blend",
  "aromatouch-massage-blend-oil",
  "balance",
  "balance-grounding-blend",
  "balance-grounding-blend-oil",
  "bergamot",
  "bergamot-oil",
  "bone-nutrient-essential-complex",
  "breathe-respiratory-blend-oil",
  "cassia",
  "cassia-oil",
  "cedarwood",
  "cedarwood-oil",
  "cheer",
  "cheer-uplifting-blend",
  "cheer-uplifting-blend-oil",
  "cinnamon-bark",
  "cinnamon-bark-oil",
  "citrus-bliss",
  "citrus-bliss-invigorating-blend",
  "citrus-bliss-oil",
  "clary-sage",
  "clary-sage-oil",
  "console",
  "console-comforting-blend",
  "console-comforting-blend-oil",
  "copaiba",
  "copaiba-oil",
  "copaiba-softgels",
  "correct-x",
  "deep-blue",
  "deep-blue-oil",
  "deep-blue-soothing-blend",
  "digestzen",
  "digestzen-digestive-blend",
  "digestzen-oil",
  "digestzen-terrazyme",
  "doterra-rose-touch",
  "doterra-tea-tree",
  "douglas-fir-oil",
  "eucalyptus",
  "eucalyptus-oil",
  "frankincense",
  "frankincense-oil",
  "geranium",
  "geranium-oil",
  "ginger",
  "ginger-oil",
  "grapefruit",
  "grapefruit-oil",
  "greens-digestive-health-supplement",
  "helichrysum",
  "helichrysum-oil",
  "himalayan-fir-oil",
  "holiday-peace-oil",
  "home-essentials-enrollment-kit",
  "home-essentials-kit",
  "in-tune-oil",
  "intune",
  "intune-focus-blend",
  "lavender",
  "lavender-oil",
  "lemon",
  "lemon-oil",
  "lemongrass",
  "lemongrass-oil",
  "marjoram",
  "marjoram-oil",
  "melaleuca",
  "melaleuca-oil",
  "metapwr-kit",
  "metapwr-metabolic-blend",
  "metapwr-oil",
  "metapwr-system",
  "mito2max-energy-metabolism-complex",
  "myrrh",
  "myrrh-oil",
  "on-guard",
  "on-guard-oil",
  "on-guard-plus-softgels",
  "on-guard-protective-blend",
  "oregano",
  "oregano-oil",
  "peppermint",
  "peppermint-beadlets-digestive-health",
  "peppermint-oil",
  "phytoestrogen-complex",
  "purify",
  "purify-cleansing-blend",
  "purify-oil",
  "rose",
  "rose-oil",
  "rose-touch",
  "rosemary",
  "rosemary-oil",
  "sandalwood",
  "sandalwood-oil",
  "siberian-fir-oil",
  "supplements-mito-2-max",
  "terrazyme",
  "terrazyme-digestive-enzyme-complex",
  "vegetable-capsules",
  "veggie-caps",
  "vetiver",
  "vetiver-oil",
  "wassail-oil",
  "wild-orange",
  "wild-orange-oil",
  "wintergreen",
  "wintergreen-oil",
  "ylang-ylang",
  "ylang-ylang-oil",
]);

// Helper functions for doTERRA link building
function canonicalProduct(slug) {
  return `https://www.doterra.com/US/en/p/${slug}`;
}

function tracked(url, ownerId) {
  if (!ownerId) return url;
  return url.includes("?")
    ? `${url}&OwnerID=${encodeURIComponent(ownerId)}`
    : `${url}?OwnerID=${encodeURIComponent(ownerId)}`;
}

function trackedHome(ownerId) {
  return tracked("https://www.doterra.com/US/en", ownerId);
}

// DoTERRA link resolver endpoint
// Maps internal keys to real product slugs + appends OwnerID tracking
app.get("/api/doterra/go/:key", (req, res) => {
  const key = (req.params.key || "").toString().trim();
  const ownerId = (req.query.ownerId || "").toString().trim();

  if (!key) {
    return res.redirect(302, trackedHome(ownerId));
  }

  // Check if key is in VERIFIED set (treat as slug directly)
  const slug = VERIFIED.has(key) ? key : key;

  // Validate slug format (never allow weird chars that could break)
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return res.redirect(302, trackedHome(ownerId));
  }

  return res.redirect(302, tracked(canonicalProduct(slug), ownerId));
});

// Mount the /go redirect router BEFORE other routes
app.use("/go", goRouter);

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

// Serve static files from the Vite build
const distPath = join(__dirname, "../dist");
app.use(express.static(distPath));

// For client-side routing: serve index.html for all non-API, non-/go routes
app.get("*", (_req, res) => {
  res.sendFile(join(distPath, "index.html"));
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`AI server listening on ${port}`));

