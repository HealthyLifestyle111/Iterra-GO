#!/usr/bin/env node
/**
 * Audit ALL slugs in DOTERRA_SLUG_FIX to find broken ones
 */

import { readFileSync } from 'fs';

// Read the server.js file to extract DOTERRA_SLUG_FIX
const serverJs = readFileSync('./server/server.js', 'utf8');
const match = serverJs.match(/const DOTERRA_SLUG_FIX = \{([^}]+)\}/s);

if (!match) {
  console.error('Could not find DOTERRA_SLUG_FIX in server.js');
  process.exit(1);
}

// Parse the slug mappings
const slugMap = {};
const lines = match[1].split('\n');
for (const line of lines) {
  const m = line.match(/"([^"]+)":\s*"([^"]+)"/);
  if (m) {
    slugMap[m[1]] = m[2];
  }
}

// Get unique target slugs (values)
const uniqueSlugs = [...new Set(Object.values(slugMap))];

console.log(`\n🔍 Auditing ${uniqueSlugs.length} unique product slugs...\n`);

const results = {
  working: [],
  broken: [],
  tested: 0
};

// Test each slug
for (const slug of uniqueSlugs) {
  results.tested++;
  
  try {
    const url = `https://www.doterra.com/US/en/p/${slug}`;
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    
    // Fetch the body to check for 404 content
    const bodyResponse = await fetch(url);
    const text = await bodyResponse.text();
    
    const is404 = text.includes('Error 404') || 
                  text.includes('Oops! Looks like something went wrong') ||
                  text.includes('Page Not Found');
    
    if (is404) {
      results.broken.push({ slug, url, status: response.status });
      console.log(`❌ BROKEN: ${slug}`);
    } else {
      results.working.push({ slug, url });
      console.log(`✅ OK: ${slug}`);
    }
  } catch (err) {
    results.broken.push({ slug, url: `https://www.doterra.com/US/en/p/${slug}`, error: err.message });
    console.log(`❌ ERROR: ${slug} - ${err.message}`);
  }
  
  // Rate limit - be nice to doTERRA servers
  await new Promise(resolve => setTimeout(resolve, 100));
}

console.log('\n' + '='.repeat(80));
console.log(`RESULTS: ${results.working.length} working, ${results.broken.length} broken (${results.tested} total)`);
console.log('='.repeat(80) + '\n');

if (results.broken.length > 0) {
  console.log('❌ BROKEN SLUGS:\n');
  results.broken.forEach(item => {
    console.log(`  "${item.slug}"`);
  });
  console.log('\n');
  console.log('⚠️  These slugs should be either:');
  console.log('   1. Fixed with correct slug');
  console.log('   2. Removed from DOTERRA_SLUG_FIX (will fall back to search)');
  process.exit(1);
}

console.log('✅ All slugs are working!');
