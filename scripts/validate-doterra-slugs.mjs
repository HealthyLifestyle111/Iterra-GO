#!/usr/bin/env node
// Comprehensive doTERRA slug validator - fetches actual pages and checks content
import { doterraProductUrl, DOTERRA_SLUG_FIX } from '../src/lib/doterraLinks.js';

const SITE = "jennawilliams1";

function looksLikeDoterraNotFound(html) {
  if (!html) return true;
  const s = html.toLowerCase();
  return (
    s.includes("error 404:") ||
    s.includes("oops! looks like something went wrong") ||
    (s.includes("sorry") && s.includes("can't find")) ||
    (s.includes("page not found"))
  );
}

async function validateSlug(slug) {
  const url = doterraProductUrl(slug, SITE);
  
  try {
    const response = await fetch(url, { redirect: 'follow' });
    const html = await response.text();
    const isErrorPage = looksLikeDoterraNotFound(html);
    
    // Extract page title for confirmation
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'No title found';
    
    return {
      slug,
      url,
      status: response.status,
      isValid: !isErrorPage && response.ok,
      isErrorPage,
      title: title.substring(0, 80)
    };
  } catch (error) {
    return {
      slug,
      url,
      status: 0,
      isValid: false,
      error: error.message
    };
  }
}

async function scanCodebaseForSlugs() {
  console.log('📂 Scanning codebase for product slugs...\n');
  
  // Get all unique slugs from the DOTERRA_SLUG_FIX map
  const mappedSlugs = new Set(Object.keys(DOTERRA_SLUG_FIX));
  
  // Also get slugs from actual product data in the codebase
  // (This would require parsing the files, for now just use the map)
  
  return Array.from(mappedSlugs);
}

// Main execution
(async () => {
  console.log('🧪 doTERRA Slug Validator (Content-Based)\n');
  console.log('Testing URLs against actual doTERRA pages...\n');
  
  const slugsToTest = await scanCodebaseForSlugs();
  console.log(`Found ${slugsToTest.length} slugs to validate\n`);
  console.log('─'.repeat(80));
  
  const results = {
    valid: [],
    broken: [],
    errors: []
  };
  
  // Test each slug
  for (const slug of slugsToTest) {
    process.stdout.write(`Testing: ${slug.padEnd(40)} ... `);
    
    const result = await validateSlug(slug);
    
    if (result.error) {
      console.log(`❌ ERROR`);
      results.errors.push(result);
    } else if (result.isErrorPage) {
      console.log(`❌ 404 PAGE (status ${result.status})`);
      results.broken.push(result);
    } else if (result.isValid) {
      console.log(`✅ OK`);
      results.valid.push(result);
    } else {
      console.log(`⚠️  Status ${result.status}`);
      results.broken.push(result);
    }
    
    // Rate limit: wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n' + '─'.repeat(80));
  console.log('\n📊 Results Summary:\n');
  console.log(`✅ Valid URLs: ${results.valid.length}`);
  console.log(`❌ Broken URLs: ${results.broken.length}`);
  console.log(`⚠️  Errors: ${results.errors.length}`);
  
  if (results.broken.length > 0) {
    console.log('\n❌ Broken Slugs (Need Fixing):\n');
    results.broken.forEach(r => {
      console.log(`  Slug: "${r.slug}"`);
      console.log(`  URL:  ${r.url}`);
      console.log(`  Page: ${r.title}`);
      console.log(`  → Add mapping to DOTERRA_SLUG_FIX\n`);
    });
  }
  
  if (results.errors.length > 0) {
    console.log('\n⚠️  Errors:\n');
    results.errors.forEach(r => {
      console.log(`  ${r.slug}: ${r.error}`);
    });
  }
  
  if (results.broken.length > 0 || results.errors.length > 0) {
    console.log('\n❌ Validation failed - some URLs are broken');
    process.exit(1);
  }
  
  console.log('\n🎉 All slugs validated successfully!');
})();
