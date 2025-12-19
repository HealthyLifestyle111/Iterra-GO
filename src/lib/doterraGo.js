const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

/**
 * Generate a doTERRA link through the backend resolver
 * @param {string} key - Product key or slug
 * @param {Object} options - Options object
 * @param {string} options.site - Associate site ID (optional, defaults to jennawilliams1)
 * @returns {string} Backend resolver URL that redirects to doTERRA
 */
export function doterraGoUrl(key, { site } = {}) {
  const cleanKey = String(key || "").trim();

  // Never default to a specific product - return homepage if key is missing
  if (!cleanKey) {
    const defaultSite = site || "jennawilliams1";
    return `https://www.doterra.com/US/en/site/${defaultSite}`;
  }

  if (!API) {
    console.warn("VITE_API_URL not set, falling back to direct doTERRA link");
    const defaultSite = site || "jennawilliams1";
    return `https://www.doterra.com/US/en/site/${defaultSite}/p/${encodeURIComponent(cleanKey)}`;
  }

  const qs = site ? `?site=${encodeURIComponent(site)}` : "";
  return `${API}/api/doterra/go/${encodeURIComponent(cleanKey)}${qs}`;
}
