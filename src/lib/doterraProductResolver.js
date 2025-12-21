// src/lib/doterraProductResolver.js
import verifiedSlugsData from '../../verifiedSlugs.json';

const DOTERRA_BASE = "https://www.doterra.com/US/en";
const verifiedSlugs = verifiedSlugsData;

// Map any "dummy/search" terms to a REAL product slug.
const SEARCH_OVERRIDES = {
  "foundational wellness bundle": "foundational-wellness-bundle",
  "phytoestrogen essential complex": "phytoestrogen-complex",
};

/**
 * Build a product URL with optional OwnerID tracking
 * Uses official ?OwnerID parameter (stable, guaranteed credit)
 */
export function canonicalProductUrl(slug, ownerId = null) {
  if (!slug) return DOTERRA_BASE;
  const baseUrl = `${DOTERRA_BASE}/p/${slug}`;
  return ownerId ? `${baseUrl}?OwnerID=${ownerId}` : baseUrl;
}

/**
 * Resolve a product key to a verified slug
 * @param {string} key - Product key/slug
 * @returns {string|null} - Verified slug or null if not found
 */
export function resolveSlug(key) {
  if (!key) return null;
  const normalized = String(key).toLowerCase().replace(/\s+/g, '-').trim();
  return verifiedSlugs[normalized] || null;
}

/**
 * Build a search URL with optional OwnerID
 */
export function searchUrl(query, ownerId = null) {
  const searchQuery = encodeURIComponent(query);
  const baseUrl = `${DOTERRA_BASE}/search?text=${searchQuery}`;
  return ownerId ? `${baseUrl}&OwnerID=${ownerId}` : baseUrl;
}

/**
 * Main resolver: accepts various input formats and returns a tracked URL
 * @param {string} input - Product slug, key, or URL
 * @param {string|null} ownerId - doTERRA Member ID for tracking
 * @param {string|null} associateSite - Fallback site username (e.g., "jennawilliams1")
 * @returns {string} - Full doTERRA URL with tracking
 */
export function resolveDoterraOutbound(input, ownerId = null, associateSite = null) {
  if (!input) {
    // No input: fallback to replicated home or base
    if (associateSite) return `${DOTERRA_BASE}/site/${associateSite}`;
    return DOTERRA_BASE;
  }

  const str = String(input).trim();

  // Handle search queries
  const mSearch = str.match(/\/search\?q=([^&#]+)/i);
  if (mSearch) {
    const q = decodeURIComponent(mSearch[1])
      .replace(/\+/g, " ")
      .trim()
      .toLowerCase();

    const slug = SEARCH_OVERRIDES[q];
    if (slug) return canonicalProductUrl(slug, ownerId);
    return searchUrl(q, ownerId);
  }

  // Extract slug from /p/<slug> URLs
  const mProd = str.match(/\/p\/([^/?#]+)/i);
  if (mProd) {
    const slug = resolveSlug(mProd[1]) || mProd[1];
    return canonicalProductUrl(slug, ownerId);
  }

  // If it's just a raw slug/key
  if (!str.includes("http") && !str.includes("/")) {
    const slug = resolveSlug(str);
    if (slug) {
      return canonicalProductUrl(slug, ownerId);
    }
    // Unknown slug: fallback to search
    console.warn(`[doterraProductResolver] Unknown slug "${str}" - falling back to search`);
    return searchUrl(str, ownerId);
  }

  // Anything else → replicated home or base
  if (associateSite) return `${DOTERRA_BASE}/site/${associateSite}`;
  return DOTERRA_BASE;
}
