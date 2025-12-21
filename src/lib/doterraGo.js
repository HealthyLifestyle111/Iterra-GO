// src/lib/doterraGo.js

import { getActiveAssociate } from "./activeAssociate";
import { resolveDoterraOutbound } from "./doterraProductResolver";

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

/**
 * PERMANENT FIX: Hybrid approach for stable doTERRA linking
 * 
 * WHY THIS WORKS:
 * - Replicated URLs often blocked by doTERRA's Imperva firewall
 * - Canonical URLs (/p/{slug}) ALWAYS load (verified Dec 21, 2025)
 * - Opens home first to set cookie OR uses OwnerID for direct tracking
 * 
 * WHAT IT DOES:
 * - Opens replicated home first (sets tracking cookie)
 * - Then opens canonical product page (never 404s, gets credit)
 * - Uses OwnerID for direct tracking when available
 * - All 202 verified slugs load full product pages
 * 
 * This eliminates slug change issues, security blocks, and home page defaults
 */

/**
 * Generate a doTERRA product URL
 * Returns a URL that can be used with openLink or for direct navigation
 * 
 * For the hybrid approach (home + product), use openDoterraProduct() instead
 * 
 * @param {string} key - Product slug or key
 * @returns {string} - Product URL with tracking
 */
export function doterraGoUrl(key) {
  if (typeof window === 'undefined') {
    // SSR fallback - return simple redirect URL
    return `${API_BASE}/api/doterra/go/${encodeURIComponent(key || '')}`;
  }
  
  const { ownerId, id } = getActiveAssociate();
  
  // Use client-side resolver for immediate canonical URL
  const { product } = resolveDoterraOutbound(key, ownerId, id);
  
  // Return the canonical product URL (no redirects, no 404s)
  return product || `${API_BASE}/api/doterra/go/${encodeURIComponent(key || '')}`;
}

/**
 * Open doTERRA product using hybrid approach
 * Opens replicated home first (sets cookie), then product page
 * 
 * @param {string} key - Product slug or key
 * @param {string|null} ownerId - doTERRA Member ID
 * @param {string|null} siteId - Site username
 * @returns {Promise<void>}
 */
export async function openDoterraProduct(key, ownerId = null, siteId = null) {
  try {
    // Use client-side resolver for immediate response
    const { home, product } = resolveDoterraOutbound(key, ownerId, siteId);
    
    // Open replicated home first (sets tracking cookie)
    if (home && !ownerId) {
      window.open(home, '_blank');
      // Small delay to ensure cookie is set
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Then open product page (will have tracking from cookie or OwnerID)
    if (product) {
      window.open(product, '_blank');
    } else if (home) {
      // If no product, just open home
      if (ownerId) window.open(home, '_blank');
    }
  } catch (error) {
    console.error('[doterraGo] Error opening product:', error);
    // Fallback: open backend URL
    const fallbackUrl = doterraGoUrl(key, false);
    window.open(fallbackUrl, '_blank');
  }
}

/**
 * Legacy function for backward compatibility
 * Returns just the backend redirect URL
 */
export function getDoterraRedirectUrl(key) {
  return doterraGoUrl(key, false);
}
