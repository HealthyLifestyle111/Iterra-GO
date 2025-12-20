const DOTERRA_BASE = "https://www.doterra.com/US/en";

// Oils that should always use the -oil slug
const SINGLE_OILS = new Set([
  "bergamot",
  "cassia",
  "cedarwood",
  "clary-sage",
  "copaiba",
  "eucalyptus",
  "frankincense",
  "geranium",
  "ginger",
  "grapefruit",
  "helichrysum",
  "lavender",
  "lemon",
  "lemongrass",
  "marjoram",
  "melaleuca",
  "myrrh",
  "oregano",
  "peppermint",
  "rosemary",
  "sandalwood",
  "vetiver",
  "wild-orange",
  "wintergreen",
  "ylang-ylang",
]);

function normalizeSlug(slug) {
  return String(slug || "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

export function resolveDoterraProductUrl(slug) {
  const clean = normalizeSlug(slug);

  // If the slug is exactly a known single-oil base, force "-oil"
  if (SINGLE_OILS.has(clean)) {
    return `${DOTERRA_BASE}/p/${clean}-oil`;
  }

  return `${DOTERRA_BASE}/p/${clean}`;
}
