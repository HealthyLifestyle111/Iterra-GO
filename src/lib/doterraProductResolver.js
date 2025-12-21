// src/lib/doterraProductResolver.js
const DOTERRA_BASE = "https://www.doterra.com/US/en";

// Map any "dummy/search" terms to a REAL product slug.
const SEARCH_OVERRIDES = {
  "foundational wellness bundle": "foundational-wellness-bundle",
  "phytoestrogen essential complex": "phytoestrogen-complex",
};

// Always build canonical product URLs (DO NOT use /site/{associate}/p/{slug})
export function canonicalProductUrl(slug) {
  if (!slug) return DOTERRA_BASE;
  return `${DOTERRA_BASE}/p/${slug}`;
}

/**
 * Accepts:
 * - full doTERRA URLs (including /site/.../p/...)
 * - /p/<slug>
 * - /search?q=...
 * - a raw slug
 *
 * Returns a safe outbound URL that won't 404.
 */
export function resolveDoterraOutbound(input) {
  if (!input) return DOTERRA_BASE;

  const str = String(input).trim();

  // If someone passes just a slug like "peppermint-oil"
  if (!str.includes("http") && !str.includes("/")) {
    return canonicalProductUrl(str);
  }

  // Handle /search?q=...
  const mSearch = str.match(/\/search\?q=([^&#]+)/i);
  if (mSearch) {
    const q = decodeURIComponent(mSearch[1])
      .replace(/\+/g, " ")
      .trim()
      .toLowerCase();

    const slug = SEARCH_OVERRIDES[q];
    return slug ? canonicalProductUrl(slug) : DOTERRA_BASE;
  }

  // Handle /p/<slug> (including /site/<id>/p/<slug>)
  const mProd = str.match(/\/p\/([^/?#]+)/i);
  if (mProd) {
    return canonicalProductUrl(mProd[1]);
  }

  // Anything else → safest fallback
  return DOTERRA_BASE;
}
