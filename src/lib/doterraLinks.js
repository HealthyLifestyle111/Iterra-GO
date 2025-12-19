// src/lib/doterraLinks.js

const DEFAULT_SITE = "jennawilliams1";
const BASE = "https://www.doterra.com/US/en/site";

export const DOTERRA_SLUG_FIX = {
  // Your known broken → known correct
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

  // This one depends what you intended to sell:
  // Softgels page exists:
  "on-guard-protective-blend": "onguard-protective-blend-softgel",

  // If you meant "Zendocrine" not "Zen", this exists:
  "zen-blend": "zendocrine-oil-blend",

  // Elevation doesn't show as a US product page in the same way;
  // use the blog spotlight instead (still valid content):
  // We'll handle this as a special-case below.
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
