import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const DOTERRA_BASE = "https://www.doterra.com/US/en";

// Load data files
let products, associates, verifiedSlugs;
try {
  products = JSON.parse(readFileSync(join(__dirname, "../../src/data/products.json"), "utf8"));
  associates = JSON.parse(readFileSync(join(__dirname, "../../src/data/associates.json"), "utf8"));
  verifiedSlugs = JSON.parse(readFileSync(join(__dirname, "../../verifiedSlugs.json"), "utf8"));
} catch (err) {
  console.error("Failed to load data files:", err.message);
  products = {};
  associates = {};
  verifiedSlugs = {};
}

/**
 * Resolve a product key to verified slug
 */
function resolveSlug(key) {
  if (!key) return null;
  const normalized = String(key).toLowerCase().replace(/\s+/g, '-').trim();
  return verifiedSlugs[normalized] || null;
}

/**
 * Build product URL with OwnerID tracking
 */
function buildProductUrl(slug, ownerId = null) {
  const baseUrl = `${DOTERRA_BASE}/p/${slug}`;
  return ownerId ? `${baseUrl}?OwnerID=${ownerId}` : baseUrl;
}

/**
 * Build search URL with OwnerID tracking
 */
function buildSearchUrl(query, ownerId = null) {
  const searchQuery = encodeURIComponent(query);
  const baseUrl = `${DOTERRA_BASE}/search?text=${searchQuery}`;
  return ownerId ? `${baseUrl}&OwnerID=${ownerId}` : baseUrl;
}

/**
 * LEGACY: Handle /api/doterra/go/:associateId/:productId redirects
 * Kept for backward compatibility
 * Must come BEFORE /:key route since it's more specific
 */
router.get("/:associateId/:productId", (req, res) => {
  const { associateId, productId } = req.params;
  
  console.log(`[GO Route LEGACY] ${associateId}/${productId}`);

  const associate = associates[associateId];
  const product = products[productId];

  if (!associate || !associate.referralUrl) {
    return res.status(404).send("Unknown associate. Please contact support.");
  }
  
  if (!product) {
    return res.status(404).send("Unknown product. Please contact support.");
  }

  // Check if user has already been activated for this associate
  const cookieName = `dt_activated_${associateId}`;
  const activated = req.cookies?.[cookieName] === "1";

  if (!activated) {
    // First click - activate by redirecting to referral URL
    // Set cookie for 30 days
    res.cookie(cookieName, "1", { 
      maxAge: 30 * 24 * 60 * 60 * 1000, 
      httpOnly: true, 
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });

    console.log(`[Activation] ${associateId} - redirecting to referral URL`);
    return res.redirect(302, associate.referralUrl);
  }

  // User already activated - go directly to product
  console.log(`[Product] ${associateId}/${productId} - redirecting to ${product.canonicalUrl}`);
  return res.redirect(302, product.canonicalUrl);
});

/**
 * NEW: Handle /api/doterra/go/:key redirects
 * Uses OwnerID query parameter for stable tracking
 * Must come AFTER the two-param route
 */
router.get("/:key", (req, res) => {
  const { key } = req.params;
  const { owner_id, site } = req.query;

  console.log(`[doTERRA GO] Key: ${key}, OwnerID: ${owner_id || 'none'}, Site: ${site || 'none'}`);

  // Try to resolve slug
  const slug = resolveSlug(key);

  if (slug) {
    // Verified slug: build URL with OwnerID
    const url = buildProductUrl(slug, owner_id);
    console.log(`[doTERRA GO] Resolved to: ${url}`);
    return res.redirect(301, url);
  }

  // Unknown slug: fallback to search
  if (owner_id) {
    const searchQuery = buildSearchUrl(key, owner_id);
    console.log(`[doTERRA GO] Unknown slug, search with tracking: ${searchQuery}`);
    return res.redirect(301, searchQuery);
  }

  // No owner_id: fallback to replicated home (sets cookie)
  if (site) {
    const homeUrl = `${DOTERRA_BASE}/site/${site}`;
    console.log(`[doTERRA GO] Fallback to replicated home: ${homeUrl}`);
    return res.redirect(301, homeUrl);
  }

  // Last resort: canonical product URL or search
  const fallbackUrl = slug ? buildProductUrl(slug) : buildSearchUrl(key);
  console.log(`[doTERRA GO] Fallback: ${fallbackUrl}`);
  return res.redirect(301, fallbackUrl);
});

export default router;
