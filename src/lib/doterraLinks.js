// src/lib/doterraLinks.js

const DEFAULT_SITE = "jennawilliams1";
const BASE = "https://www.doterra.com/US/en/site";

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
  
  // Blend/product slug corrections
  "digestzen-digestive-blend": "digestzen-oil",
  "terrazyme-digestive-enzyme-complex": "digestzen-terrazyme",
  "breathe-respiratory-blend": "breathe-respiratory-blend-oil",
  "lifelong-vitality-pack": "doterra-lifelong-vitality-pack",
  "metapwr-system": "metapwr-kit",
  "clarycalm-oil": "clarycalm-blend-oil",
  "fractionated-coconut-oil": "usage-fractionated-coconut-oil-carrier-oil",
  "adaptiv-calming-blend": "adaptiv-oil",
  "intune-focus-blend": "in-tune-oil",
  "balance-grounding-blend": "balance-grounding-blend-oil",
  "melaleuca-oil": "doterra-tea-tree",
  "rose-touch": "doterra-rose-touch",
  "on-guard-protective-blend": "onguard-protective-blend-softgel",
  "zen-blend": "zendocrine-oil-blend",
  // Note: "serenity-restful-blend" slug not found on doTERRA - may be discontinued
  // Users searching for sleep support should use specific products
};

export function doterraProductUrl(slug, site = DEFAULT_SITE) {
  if (!slug) return `${BASE}/${site}`;
  if (slug === "elevation-joyful-blend") {
    // blog fallback (not a product page)
    return "https://www.doterra.com/US/en/blog/spotlight-elevation-joyful-blend";
  }
  const fixed = DOTERRA_SLUG_FIX[slug] || slug;
  const url = `${BASE}/${site}/p/${fixed}`;
  
  // Sanity check in development
  if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
    if (!url.startsWith("https://www.doterra.com/") && !url.startsWith("https://my.doterra.com/")) {
      console.error(`[doterraProductUrl] Invalid URL generated: ${url}`);
      console.error(`  Input slug: "${slug}"`);
      console.error(`  Fixed slug: "${fixed}"`);
      throw new Error(`Invalid doTERRA URL: ${url}`);
    }
  }
  
  return url;
}

// Validate all slug mappings (use in dev/testing)
export function validateAllSlugs() {
  const results = { valid: [], invalid: [] };
  
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
