#!/usr/bin/env node
/**
 * Test the doTERRA direct-or-search logic
 * This simulates the backend routing without needing a running server
 */

// Minimal DOTERRA_SLUG_FIX for testing
const DOTERRA_SLUG_FIX = {
  "lemon": "lemon-oil",
  "lavender": "lavender-oil",
  "peppermint": "peppermint-oil",
  "frankincense": "frankincense-oil",
  "bone-nutrient-essential-complex": "bone-nutrient-essential-complex",
  "metapwr-oil": "metapwr-oil",
  "adaptiv-calming-blend": "adaptiv-oil",
  "intune-focus-blend": "in-tune-oil",
};

const DOTERRA_ORIGIN = "https://www.doterra.com";
const REGION = "/US/en";
const DEFAULT_SITE = "jennawilliams1";

// Extract only the TARGET slugs (values) - these are known direct slugs
const DIRECT_SLUGS = new Set(Object.values(DOTERRA_SLUG_FIX));

/**
 * Check if a string looks like a valid doTERRA product slug
 */
function isLikelySlug(str) {
  return /^[a-z0-9-]{3,120}$/.test(str) && str.includes("-");
}

function buildReplicatedProductUrl(site, slug) {
  return `${DOTERRA_ORIGIN}${REGION}/site/${site}/p/${slug}`;
}

function buildFullSearchUrl(site, query) {
  const q = encodeURIComponent(query);
  return `${DOTERRA_ORIGIN}${REGION}/site/${site}/search/fullsearch?saveSearch=false&text=${q}&contentType=PRODUCT`;
}

/**
 * Simulate the /api/doterra/go/:key endpoint
 */
function resolveDoterraUrl(key, site = DEFAULT_SITE) {
  const rawKey = String(key || "").trim();
  
  if (!rawKey) {
    return {
      url: `${DOTERRA_ORIGIN}${REGION}/site/${site}`,
      type: "homepage",
      reason: "Empty key"
    };
  }

  const keyLower = rawKey.toLowerCase();
  
  // 1) If explicitly mapped, go direct to the real slug
  const mapped = DOTERRA_SLUG_FIX[keyLower];
  if (mapped) {
    return {
      url: buildReplicatedProductUrl(site, mapped),
      type: "direct",
      reason: `Mapped: "${keyLower}" → "${mapped}"`
    };
  }

  // 2) If it looks like a true slug AND is in our direct slugs set, try direct
  if (isLikelySlug(keyLower) && DIRECT_SLUGS.has(keyLower)) {
    return {
      url: buildReplicatedProductUrl(site, keyLower),
      type: "direct",
      reason: `Known slug in DIRECT_SLUGS: "${keyLower}"`
    };
  }

  // 3) Otherwise it's a dummy/generic label: go to search
  return {
    url: buildFullSearchUrl(site, rawKey),
    type: "search",
    reason: `Dummy/generic name (not a valid slug): "${rawKey}"`
  };
}

// Test cases
const tests = [
  { input: "lemon", expected: "direct", desc: "Mapped single-word oil" },
  { input: "lavender-oil", expected: "direct", desc: "Known slug (mapped)" },
  { input: "bone-nutrient-essential-complex", expected: "direct", desc: "Known slug (complex)" },
  { input: "Bone Support Complex", expected: "search", desc: "Dummy name with spaces" },
  { input: "Metabolic Blend", expected: "search", desc: "Generic display name" },
  { input: "Calming Blend Essential Oil", expected: "search", desc: "Long display name" },
  { input: "unknownitem", expected: "search", desc: "Unknown single word (no hyphen)" },
  { input: "unknown-slug-123", expected: "search", desc: "Unknown slug-like string (not in DIRECT_SLUGS)" },
  { input: "adaptiv-calming-blend", expected: "direct", desc: "Mapped blend variant" },
  { input: "", expected: "homepage", desc: "Empty string" },
];

console.log("\n" + "=".repeat(80));
console.log("doTERRA DIRECT-OR-SEARCH LOGIC TEST");
console.log("=".repeat(80) + "\n");

let passed = 0;
let failed = 0;

tests.forEach((test, i) => {
  const result = resolveDoterraUrl(test.input);
  const isPass = result.type === test.expected;
  
  if (isPass) passed++;
  else failed++;
  
  const status = isPass ? "✅ PASS" : "❌ FAIL";
  const color = isPass ? "" : "";
  
  console.log(`${i + 1}. ${test.desc}`);
  console.log(`   Input: "${test.input}"`);
  console.log(`   Expected: ${test.expected.toUpperCase()} | Got: ${result.type.toUpperCase()} ${status}`);
  console.log(`   Reason: ${result.reason}`);
  console.log(`   URL: ${result.url}`);
  console.log("");
});

console.log("=".repeat(80));
console.log(`RESULTS: ${passed} passed, ${failed} failed (${tests.length} total)`);
console.log("=".repeat(80) + "\n");

if (failed > 0) {
  process.exit(1);
}
