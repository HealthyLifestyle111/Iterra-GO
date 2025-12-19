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
  "clary-sage": "clary-sage-oil",
  "geranium": "geranium-oil",
  "helichrysum": "helichrysum-oil",
  "lemongrass": "lemongrass-oil",
  "marjoram": "marjoram-oil",
  "myrrh": "myrrh-oil",
  "rose": "rose-oil",
  "rosemary": "rosemary-oil",
  "wild-orange": "wild-orange-oil",
  "wintergreen": "wintergreen-oil",
  "ylang-ylang": "ylang-ylang-oil",
  "ginger": "ginger-oil",
  "cinnamon-bark": "cinnamon-bark-oil",
  "cassia": "cassia-oil",
  
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
  "balance": "balance-grounding-blend-oil",
  "balance-grounding-blend": "balance-grounding-blend-oil",
  
  // MetaPWR variations
  "metapwr-system": "metapwr-kit",
  "metapwr-metabolic-blend": "metapwr-oil",
  
  // Deep Blue
  "deep-blue": "deep-blue-oil",
  "deep-blue-soothing-blend": "deep-blue-oil",
  
  // Products with special slugs
  "terrazyme-digestive-enzyme-complex": "digestzen-terrazyme",
  "terrazyme": "digestzen-terrazyme",
  "melaleuca": "doterra-tea-tree",
  "melaleuca-oil": "doterra-tea-tree",
  "rose-touch": "doterra-rose-touch",
  
  // Kits and accessories
  "home-essentials-kit": "essentials-kit",
  "vegetable-capsules": "veggie-caps",


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
