#!/usr/bin/env node
// Quick test to verify all doTERRA URLs are generating correctly
import { doterraProductUrl, validateAllSlugs } from './src/lib/doterraLinks.js';

console.log('🧪 Testing doTERRA URL Generation\n');

// Test common slugs
const testCases = [
  'lemon',
  'lavender', 
  'peppermint',
  'frankincense',
  'foundational-wellness-bundle',
  'breathe-respiratory-blend',
  'on-guard-protective-blend',
  'melaleuca-oil',
  'elevation-joyful-blend', // special case - blog link
];

console.log('Testing individual slug conversions:\n');
testCases.forEach(slug => {
  const url = doterraProductUrl(slug);
  const isValid = url.startsWith('https://www.doterra.com/') || url.startsWith('https://my.doterra.com/');
  const status = isValid ? '✅' : '❌';
  console.log(`${status} ${slug}`);
  console.log(`   → ${url}\n`);
});

console.log('─'.repeat(80));
console.log('\nValidating ALL mapped slugs:\n');

const results = validateAllSlugs();
console.log(`✅ Valid URLs: ${results.valid.length}`);
console.log(`❌ Invalid URLs: ${results.invalid.length}`);

if (results.invalid.length > 0) {
  console.log('\n⚠️  Invalid mappings detected:\n');
  results.invalid.forEach(r => {
    console.log(`  ❌ ${r.slug}`);
    console.log(`     Error: ${r.error || 'Bad URL'}`);
    if (r.url) console.log(`     Generated: ${r.url}`);
    console.log();
  });
  process.exit(1);
}

console.log('\n🎉 All URL mappings validated successfully!');
console.log('\nSample working URLs:');
results.valid.slice(0, 3).forEach(r => {
  console.log(`  • ${r.slug} → ${r.url}`);
});
