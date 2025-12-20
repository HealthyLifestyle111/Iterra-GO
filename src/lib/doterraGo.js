const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

/**
 * Generate a doTERRA link through the backend resolver
 * @param {string} key - Product key or slug
 * @param {string|Object} siteOrOptions - Associate site ID or options object
 * @returns {string} Backend resolver URL that redirects to doTERRA
 */
export function doterraGoUrl(key, siteOrOptions) {
  const k = String(key || "").trim();
  
  // Extract site from either string or options object
  let site = null;
  if (typeof siteOrOptions === "string") {
    site = siteOrOptions;
  } else if (siteOrOptions && typeof siteOrOptions === "object") {
    site = siteOrOptions.site;
  }
  
  // If no key, return doTERRA homepage
  if (!k) {
    return "https://www.doterra.com/US/en/site/jennawilliams1";
  }
  
  // Always use backend resolver (never direct links)
  const qs = site ? `?site=${encodeURIComponent(String(site).trim())}` : "";
  return `${API_BASE}/api/doterra/go/${encodeURIComponent(k)}${qs}`;
}
