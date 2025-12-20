#!/usr/bin/env node
/**
 * Validate Product Catalog Completeness
 * 
 * Ensures all productIds used in the codebase exist in products.json
 * Prevents "dummy name → broken link" regressions
 * 
 * Usage: node scripts/validate-product-catalog.mjs
 * Exit codes: 0 = pass, 1 = fail
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

const PRODUCTS_FILE = "src/data/products.json";
const SCAN_DIRS = ["src/pages", "src/components", "src/lib"];

// Load product catalog
let catalog;
try {
  catalog = JSON.parse(readFileSync(PRODUCTS_FILE, "utf8"));
} catch (err) {
  console.error(`❌ Failed to load ${PRODUCTS_FILE}:`, err.message);
  process.exit(1);
}

const validProductIds = new Set(Object.keys(catalog));
console.log(`✓ Loaded ${validProductIds.size} products from catalog\n`);

// Extract all doterraGoUrl() calls
const productIdPattern = /doterraGoUrl\(['"]([\w\-]+)['"]\)/g;
const usedProductIds = new Set();
const usageMap = {}; // productId -> [{file, line}]

function scanFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, idx) => {
      let match;
      while ((match = productIdPattern.exec(line)) !== null) {
        const productId = match[1];
        usedProductIds.add(productId);
        
        if (!usageMap[productId]) {
          usageMap[productId] = [];
        }
        usageMap[productId].push({
          file: filePath,
          line: idx + 1,
          code: line.trim().substring(0, 80)
        });
      }
    });
  } catch (err) {
    console.warn(`⚠️  Could not scan ${filePath}: ${err.message}`);
  }
}

function scanDirectory(dir) {
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if ([".js", ".jsx", ".ts", ".tsx"].includes(extname(entry))) {
      scanFile(fullPath);
    }
  }
}

// Scan all target directories
console.log("Scanning codebase for doterraGoUrl() calls...\n");
SCAN_DIRS.forEach(scanDirectory);

console.log(`✓ Found ${usedProductIds.size} unique productIds in use\n`);

// Validate: find missing products
const missing = [];
for (const productId of usedProductIds) {
  if (!validProductIds.has(productId)) {
    missing.push(productId);
  }
}

// Report results
if (missing.length === 0) {
  console.log("✅ All productIds exist in catalog - PASS\n");
  process.exit(0);
} else {
  console.error(`❌ ${missing.length} missing productIds found:\n`);
  
  missing.forEach(productId => {
    console.error(`  • "${productId}"`);
    const usages = usageMap[productId] || [];
    usages.slice(0, 3).forEach(usage => {
      console.error(`    ${usage.file}:${usage.line}`);
    });
    if (usages.length > 3) {
      console.error(`    ... and ${usages.length - 3} more`);
    }
    console.error("");
  });

  console.error("⚠️  Add these products to src/data/products.json or fix the references.\n");
  process.exit(1);
}
