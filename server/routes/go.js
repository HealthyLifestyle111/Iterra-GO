import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load data files
let products, associates;
try {
  products = JSON.parse(readFileSync(join(__dirname, "../../src/data/products.json"), "utf8"));
  associates = JSON.parse(readFileSync(join(__dirname, "../../src/data/associates.json"), "utf8"));
} catch (err) {
  console.error("Failed to load product/associate data:", err.message);
  products = {};
  associates = {};
}

/**
 * Handle /go/:associateId/:productId redirects
 * 
 * This implements a "first-click referral activation" pattern:
 * 1. First click: redirect to associate's referral URL (activates account)
 * 2. Subsequent clicks: go directly to product (user is already activated)
 * 
 * This ensures proper attribution while providing good UX
 */
router.get("/go/:associateId/:productId", (req, res) => {
  const { associateId, productId } = req.params;

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

export default router;
