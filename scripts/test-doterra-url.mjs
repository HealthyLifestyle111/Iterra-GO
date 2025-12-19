#!/usr/bin/env node
/**
 * Test doTERRA link generation for any product slug
 * Usage: node scripts/test-doterra-url.mjs <slug>
 */

import { doterraProductUrl, doterraSearchUrl, doterraUrl } from '../src/lib/doterraLinks.js';

const slug = process.argv[2];

if (!slug) {
  console.log('Usage: node scripts/test-doterra-url.mjs <slug>');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/test-doterra-url.mjs lavender');
  console.log('  node scripts/test-doterra-url.mjs breathe');
  console.log('  node scripts/test-doterra-url.mjs frankincense');
  process.exit(1);
}

console.log(`\n🔍 Testing slug: "${slug}"\n`);

const url = doterraProductUrl(slug);
console.log('Generated URL:');
console.log(`  ${url}`);

if (url.includes('/search') || url.includes('/shop/all?search=')) {
  console.log('\n⚠️  Status: FALLBACK TO SEARCH');
  console.log('   This slug is not in the mapping table.');
  console.log('   Users will be directed to doTERRA site search.');
} else if (url.includes('/blog/')) {
  console.log('\n📝 Status: BLOG POST');
  console.log('   This product has a special blog post reference.');
} else if (url.endsWith(slug)) {
  console.log('\n⚠️  Status: NO MAPPING');
  console.log('   Using raw slug (might work, but not verified).');
} else {
  console.log('\n✅ Status: MAPPED');
  console.log('   This slug has a verified mapping.');
}

console.log('');
