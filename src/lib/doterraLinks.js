// src/lib/doterraLinks.js
// DEPRECATED: Use doterraGo.js and doterraGoUrl() instead
// This file is kept for reference only - DOTERRA_SLUG_FIX is used by backend

import { getActiveAssociate } from "./activeAssociate";

const DOTERRA_BASE = "https://www.doterra.com/US/en";

export function canonicalProductUrl(slug) {
  return `${DOTERRA_BASE}/p/${slug}`;
}

// If you still need "site" URLs for any reason, make them dynamic:
export function siteProductUrl(slug) {
  const { id } = getActiveAssociate();
  return `${DOTERRA_BASE}/site/${encodeURIComponent(id)}/p/${slug}`;
}

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
  "turmeric": "doterra-turmeric-essential-oil",
  "cinnamon": "cinnamon-bark-oil",
  "thyme": "thyme-oil",
  "basil": "basil-oil",
  "helichrysum": "helichrysum-oil",
  "clove": "clove-oil",
  "black-pepper": "black-pepper-oil",
  "cilantro": "cilantro-oil",
  "fennel": "sweet-fennel-oil", // updated to correct slug
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
  // "dill": "dill-oil", // still discontinued, no replacement
  "douglas-fir": "douglas-fir-oil",
  "green-mandarin": "doterra-green-mandarin",
  "jasmine": "jasmine-oil",
  "lime": "lime-oil",
  "petitgrain": "petitgrain-oil",
  "spikenard": "spikenard-oil",
  "white-fir": "siberian-fir-oil", // updated to correct slug
  // "yarrow": "yarrow-oil", // still discontinued, only yarrow-pom exists
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
  // "fennel-oil": "fennel-oil", // removed, discontinued
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
  // "dill-oil": "dill-oil", // removed, discontinued
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
};

/**
 * DEPRECATED: Use doterraGoUrl() from doterraGo.js instead
 * Generate a doTERRA URL from a slug or path
 * @param {string} slugOrPath - Product slug or path
 * @returns {string} Full doTERRA URL
 */
export function doterraUrl(slugOrPath) {
  console.warn("doterraUrl() is deprecated. Use doterraGoUrl() from doterraGo.js instead");
  const raw = String(slugOrPath || "").trim();
  if (!raw) return BASE;

  // If someone accidentally passes template tokens, don't create fake internal links
  if (raw.includes("${")) return BASE;

  const key = raw.toLowerCase();
  const fixed = DOTERRA_SLUG_FIX[key] || key;

  // If fixed already looks like a full URL, return it
  if (fixed.startsWith("http://") || fixed.startsWith("https://")) return fixed;

  // NEVER create direct product page links - return search instead
  const searchQuery = encodeURIComponent(raw.replace(/-/g, " "));
  return `${BASE}/search/fullsearch?saveSearch=false&text=${searchQuery}&contentType=PRODUCT`;
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
