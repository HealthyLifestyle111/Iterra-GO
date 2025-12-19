const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export function doterraGoUrl(key, site) {
  const k = encodeURIComponent(String(key || "").trim());
  const s = site ? encodeURIComponent(String(site).trim()) : "";
  if (!API) throw new Error("VITE_API_URL is not set");
  return `${API}/api/doterra/go/${k}${s ? `?site=${s}` : ""}`;
}
