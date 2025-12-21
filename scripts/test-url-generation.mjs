#!/usr/bin/env node
/**
 * Test doTERRA Product URL Generation
 * Verifies that all products resolve to valid canonical URLs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOTERRA_BASE = "https://www.doterra.com/US/en";
const verifiedSlugs = JSON.parse(readFileSync(join(__dirname, '../verifiedSlugs.json'), 'utf8'));

function resolveSlug(key) {
  if (!key) return null;
  const normalized = String(key).toLowerCase().replace(/\s+/g, '-').trim();
  return verifiedSlugs[normalized] || null;
}

function canonicalProductUrl(slug, ownerId = null) {
  if (!slug) return DOTERRA_BASE;
  const baseUrl = `${DOTERRA_BASE}/p/${slug}`;
  return ownerId ? `${baseUrl}?OwnerID=${ownerId}` : baseUrl;
}

// Test products from user's critical list
const testCases = [
  { input: 'supplements-mito-2-max', expected: 'supplements-mito-2-max' },
  { input: 'on-guard-plus-softgels', expected: 'on-guard-plus-softgels' },
  { input: 'peppermint-beadlets-digestive-health', expected: 'peppermint-beadlets-digestive-health' },
  { input: 'greens-digestive-health-supplement', expected: 'doterra-greens' },
  { input: 'greens', expected: 'doterra-greens' },
  { input: 'super-foods-greens', expected: 'doterra-greens' },
  { input: 'intune-focus-blend', expected: 'in-tune-oil' },
  { input: 'intune', expected: 'in-tune-oil' },
  { input: 'elevation-joyful-blend', expected: 'cheer-uplifting-blend-oil' },
  { input: 'elevation', expected: 'cheer-uplifting-blend-oil' },
  { input: 'deep-blue-soothing-blend', expected: 'deep-blue-oil' },
  { input: 'deep-blue', expected: 'deep-blue-oil' },
  { input: 'petal-diffuser', expected: 'petal-diffuser' },
  { input: 'metapwr', expected: 'metapwr-oil' },
  { input: 'lavender', expected: 'lavender-oil' },
  { input: 'peppermint', expected: 'peppermint-oil' },
  { input: 'lemon', expected: 'lemon-oil' },
  { input: 'frankincense', expected: 'frankincense-oil' },
  { input: 'mito2max', expected: 'supplements-mito-2-max' },
];

console.log('🧪 Testing doTERRA Product URL Resolution\n');
console.log('━'.repeat(80));

let passed = 0;
let failed = 0;

testCases.forEach(({ input, expected }) => {
  const resolvedSlug = resolveSlug(input);
  const url = canonicalProductUrl(resolvedSlug);
  const expectedUrl = `${DOTERRA_BASE}/p/${expected}`;
  
  const status = url === expectedUrl ? '✅' : '❌';
  if (url === expectedUrl) {
    passed++;
  } else {
    failed++;
  }
  
  console.log(`${status} ${input}`);
  console.log(`   Expected: ${expectedUrl}`);
  console.log(`   Got:      ${url}`);
  
  if (url !== expectedUrl) {
    console.log(`   ⚠️  MISMATCH: slug resolved to "${resolvedSlug}" instead of "${expected}"`);
  }
  console.log('');
});

console.log('━'.repeat(80));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${testCases.length} tests`);

if (failed === 0) {
  console.log('\n🎉 All tests passed! URLs are correctly generated.');
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed. Check verifiedSlugs.json mappings.');
  process.exit(1);
}
