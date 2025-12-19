// src/lib/doterraLinks.js

const SITE = "jennawilliams1";
const BASE = `https://www.doterra.com/US/en/site/${SITE}`;

export const DOTERRA_SLUG_FIX = {
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
};

/**
 * Generate a doTERRA URL from a slug or path
 * @param {string} slugOrPath - Product slug or path
 * @returns {string} Full doTERRA URL
 */
export function doterraUrl(slugOrPath) {
  const raw = String(slugOrPath || "").trim();
  if (!raw) return BASE;

  // If someone accidentally passes template tokens, don't create fake internal links
  if (raw.includes("${")) return BASE;

  const key = raw.toLowerCase();
  const fixed = DOTERRA_SLUG_FIX[key] || key;

  // If fixed already looks like a full URL, return it
  if (fixed.startsWith("http://") || fixed.startsWith("https://")) return fixed;

  // If it's a product path, use product page
  return `${BASE}/p/${fixed}`;
}

/**
 * Generate a doTERRA site search URL for a query
 * @param {string} query - Search query
 * @returns {string} doTERRA search URL or homepage fallback
 */
export function doterraSearchUrl(query) {
  const q = encodeURIComponent(String(query || "").trim());
  if (!q) return BASE;
  // Using product catalog with search parameter
  return `${BASE}/shop/all?search=${q}`;
}

/**
 * Get a product URL with graceful fallback to search
 * This is the main function to use - never returns a dead link
 * @param {string} slug - Product slug
 * @returns {string} Product URL or search fallback
 */
export function doterraProductUrl(slug) {
  const key = String(slug || "").trim().toLowerCase();
  
  if (!key) return BASE;
  
  // Special case: elevation has a blog post instead
  if (key === "elevation-joyful-blend" || key === "elevation") {
    return "https://www.doterra.com/US/en/blog/spotlight-elevation-joyful-blend";
  }
  
  const fixed = DOTERRA_SLUG_FIX[key];

  // If we don't have a known-good mapping, send them to search instead of a dead product page
  if (!fixed) {
    console.warn(`[doterraProductUrl] Unknown slug "${slug}" - falling back to search`);
    return doterraSearchUrl(key);
  }

  return doterraUrl(fixed);
}

// Validate all slug mappings (use in dev/testing)
export function validateAllSlugs() {
  const results = { valid: [], invalid: [], missing: [] };
  
  // Test all mapped slugs
  Object.keys(DOTERRA_SLUG_FIX).forEach(slug => {
    try {
      const url = doterraProductUrl(slug);
      if (url.startsWith("https://www.doterra.com/") || url.startsWith("https://my.doterra.com/")) {
        results.valid.push({ slug, url });
      } else {
        results.invalid.push({ slug, url, error: "Invalid domain" });
      }
    } catch (e) {
      results.invalid.push({ slug, error: e.message });
    }
  });
  
  return results;
}
