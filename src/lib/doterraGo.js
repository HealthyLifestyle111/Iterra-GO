import { getActiveAssociate } from "./activeAssociate";
import { resolveOutboundLink } from "./resolveOutboundLink";
import products from "../data/products.json";

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

/**
 * Generate a doTERRA link using the active associate
 * @param {string} productId - Product ID from catalog
 * @param {string|Object} siteOrOptions - Optional override (backward compat)
 * @returns {string} URL that credits the active associate
 */
export function doterraGoUrl(productId, siteOrOptions) {
  const key = String(productId || "").trim();
  
  // Get active associate (or override if provided)
  let associate = getActiveAssociate();
  
  // Handle legacy override parameter
  if (typeof siteOrOptions === "string") {
    associate = { id: siteOrOptions, referralUrl: "", shareLinks: {} };
  } else if (siteOrOptions && typeof siteOrOptions === "object" && siteOrOptions.site) {
    associate = { id: siteOrOptions.site, referralUrl: "", shareLinks: {} };
  }
  
  // If no key, return doTERRA homepage with active associate
  if (!key) {
    return associate.referralUrl || `https://www.doterra.com/US/en/site/${associate.id}`;
  }
  
  // Use new resolver system if product exists in catalog
  if (products[key]) {
    return resolveOutboundLink({ associate, productId: key, products });
  }
  
  // Fallback to legacy backend resolver for unknown products
  const qs = associate.id !== "jennawilliams1" ? `?site=${encodeURIComponent(associate.id)}` : "";
  return `${API_BASE}/api/doterra/go/${encodeURIComponent(key)}${qs}`;
}
