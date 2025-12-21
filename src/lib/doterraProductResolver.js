// src/lib/doterraProductResolver.js
import verifiedSlugsData from '../../verifiedSlugs.json';

const DOTERRA_BASE = "https://www.doterra.com/US/en";
const verifiedSlugs = verifiedSlugsData;

/**
 * PERMANENT FIX: Hybrid approach for stable doTERRA linking
 * 
 * WHY CANONICAL URLS:
 * - Replicated URLs (/site/{user}/p/{slug}) are blocked by Imperva firewall
 * - Canonical URLs (/p/{slug}) ALWAYS load (verified Dec 21, 2025)
 * - doTERRA recommends using Link Generator tool for official tracked links
 * 
 * HYBRID APPROACH:
 * - Canonical product URLs (never 404, no firewall blocks)
 * - Replicated home sets tracking cookie OR use OwnerID parameter
 * - All 202 verified slugs load full product pages
 * 
 * This eliminates slug change issues, security blocks, and home page defaults
 */

/**
 * Build a canonical product URL with optional OwnerID tracking
 * Uses official ?OwnerID parameter (stable, guaranteed credit)
 * 
 * @param {string} slug - Verified product slug
 * @param {string|null} ownerId - doTERRA Member ID for direct tracking
 * @returns {string} - Canonical product URL
 */
export function canonicalProductUrl(slug, ownerId = null) {
  if (!slug) return DOTERRA_BASE;
  const baseUrl = `${DOTERRA_BASE}/p/${slug}`;
  return ownerId ? `${baseUrl}?OwnerID=${ownerId}` : baseUrl;
}

/**
 * Build replicated home URL (sets tracking cookie)
 * 
 * @param {string} associateSite - Site username (e.g., "jennawilliams1")
 * @returns {string} - Replicated home URL
 */
export function replicatedHomeUrl(associateSite) {
  return `${DOTERRA_BASE}/site/${associateSite}`;
}

/**
 * Resolve a product key to a verified slug
 * 
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
 * 
 * @param {string} query - Search query
 * @param {string|null} ownerId - doTERRA Member ID for tracking
 * @returns {string} - Search URL
 */
export function searchUrl(query, ownerId = null) {
  const searchQuery = encodeURIComponent(query);
  const baseUrl = `${DOTERRA_BASE}/search?text=${searchQuery}`;
  return ownerId ? `${baseUrl}&OwnerID=${ownerId}` : baseUrl;
}

/**
 * Main resolver: Returns both replicated home and product URLs for hybrid approach
 * Frontend should open home first (sets cookie), then product (gets credit)
 * 
 * @param {string} input - Product slug, key, or URL
 * @param {string|null} ownerId - doTERRA Member ID for tracking
 * @param {string|null} associateSite - Site username for cookie setting
 * @returns {Object} - { home: string|null, product: string }
 */
export function resolveDoterraOutbound(input, ownerId = null, associateSite = null) {
  if (!input) {
    // No input: return home only
    const home = associateSite ? replicatedHomeUrl(associateSite) : DOTERRA_BASE;
    return { home, product: null };
  }

  const str = String(input).trim();

  // Extract slug from /p/<slug> URLs
  const mProd = str.match(/\/p\/([^/?#]+)/i);
  if (mProd) {
    const slug = resolveSlug(mProd[1]) || mProd[1];
    const product = canonicalProductUrl(slug, ownerId);
    const home = associateSite ? replicatedHomeUrl(associateSite) : null;
    return { home, product };
  }

  // If it's just a raw slug/key
  if (!str.includes("http") && !str.includes("/")) {
    const slug = resolveSlug(str);
    if (slug) {
      const product = canonicalProductUrl(slug, ownerId);
      const home = associateSite ? replicatedHomeUrl(associateSite) : null;
      return { home, product };
    }
    // Unknown slug: fallback to search
    console.warn(`[doterraProductResolver] Unknown slug "${str}" - falling back to search`);
    const product = searchUrl(str, ownerId);
    const home = associateSite ? replicatedHomeUrl(associateSite) : null;
    return { home, product };
  }

  // Anything else → home only
  const home = associateSite ? replicatedHomeUrl(associateSite) : DOTERRA_BASE;
  return { home, product: null };
}

/**
 * Legacy function for backward compatibility
 * Returns just the product URL (no hybrid approach)
 */
export function getProductUrl(input, ownerId = null) {
  const result = resolveDoterraOutbound(input, ownerId, null);
  return result.product || result.home;
}
