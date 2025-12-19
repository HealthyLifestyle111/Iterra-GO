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
  "serenity-restful-blend": "serenity-restful-blend",
};

export function doterraProductUrl(slug, site = DEFAULT_SITE) {
  if (!slug) return `${BASE}/${site}`;
  if (slug === "elevation-joyful-blend") {
    // blog fallback (not a product page)
    return "https://www.doterra.com/US/en/blog/spotlight-elevation-joyful-blend";
  }
  const fixed = DOTERRA_SLUG_FIX[slug] || slug;
  return `${BASE}/${site}/p/${fixed}`;
}
