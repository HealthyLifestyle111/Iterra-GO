#!/usr/bin/env node
// Scan entire codebase for doTERRA product slugs and validate them all
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const SITE = "jennawilliams1";
const BASE = "https://www.doterra.com/US/en/site";

// Import the slug fix mapping
const doterraLinksPath = path.join(projectRoot, 'src', 'lib', 'doterraLinks.js');
const doterraLinksContent = fs.readFileSync(doterraLinksPath, 'utf8');

// Extract DOTERRA_SLUG_FIX object
const slugFixMatch = doterraLinksContent.match(/export const DOTERRA_SLUG_FIX = \{([^}]+)\}/s);
const DOTERRA_SLUG_FIX = {};
if (slugFixMatch) {
  const lines = slugFixMatch[1].split('\n');
  for (const line of lines) {
    const match = line.match(/"([^"]+)":\s*"([^"]+)"/);
    if (match) {
      DOTERRA_SLUG_FIX[match[1]] = match[2];
    }
  }
}

function looksLikeDoterraNotFound(html) {
  if (!html) return true;
  const s = html.toLowerCase();
  return (
    s.includes("error 404:") ||
    s.includes("oops! looks like something went wrong") ||
    (s.includes("sorry") && s.includes("can't find")) ||
    s.includes("page not found")
  );
}

async function testSlug(slug) {
  // Apply slug fix mapping
  const fixedSlug = DOTERRA_SLUG_FIX[slug] || slug;
  const url = `${BASE}/${SITE}/p/${fixedSlug}`;
  try {
    const response = await fetch(url, { redirect: 'follow' });
    const html = await response.text();
    const isErrorPage = looksLikeDoterraNotFound(html);
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].substring(0, 60) : 'No title';
    
    return {
      slug: slug,  // Original slug
      fixedSlug: fixedSlug,  // After mapping
      url,
      status: response.status,
      isValid: !isErrorPage && response.ok,
      isErrorPage,
      title
    };
  } catch (error) {
    return { slug, fixedSlug, url, status: 0, isValid: false, error: error.message };
  }
}

function extractSlugsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const slugMatches = content.matchAll(/slug:\s*["']([^"']+)["']/g);
  return [...slugMatches].map(m => m[1]);
}

function scanDirectory(dir, filePattern = /\.(jsx?|tsx?)$/) {
  const slugs = new Set();
  
  function scan(currentDir) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scan(fullPath);
      } else if (stat.isFile() && filePattern.test(file)) {
        const fileSlugs = extractSlugsFromFile(fullPath);
        fileSlugs.forEach(s => slugs.add(s));
      }
    }
  }
  
  scan(dir);
  return Array.from(slugs);
}

// Main
(async () => {
  console.log('🔍 Scanning entire codebase for doTERRA product slugs...\n');
  
  const srcDir = path.join(projectRoot, 'src');
  const allSlugs = scanDirectory(srcDir);
  
  console.log(`Found ${allSlugs.length} unique slugs in codebase\n`);
  console.log('─'.repeat(80));
  
  const results = { valid: [], broken: [], errors: [] };
  
  for (const slug of allSlugs.sort()) {
    const fixedSlug = DOTERRA_SLUG_FIX[slug] || slug;
    const indicator = fixedSlug !== slug ? '🔧' : '  ';
    process.stdout.write(`${indicator} ${slug.padEnd(43)} ... `);
    
    const result = await testSlug(slug);
    
    if (result.error) {
      console.log(`❌ ERROR`);
      results.errors.push(result);
    } else if (result.isErrorPage) {
      console.log(`❌ 404`);
      results.broken.push(result);
    } else if (result.isValid) {
      console.log(`✅`);
      results.valid.push(result);
    } else {
      console.log(`⚠️  ${result.status}`);
      results.broken.push(result);
    }
    
    // Rate limit
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log('\n' + '─'.repeat(80));
  console.log('\n📊 Results:\n');
  console.log(`✅ Valid: ${results.valid.length}`);
  console.log(`❌ Broken: ${results.broken.length}`);
  console.log(`⚠️  Errors: ${results.errors.length}`);
  
  if (results.broken.length > 0) {
    console.log('\n❌ Broken Slugs:\n');
    results.broken.forEach(r => {
      console.log(`  "${r.slug}"`);
      console.log(`    URL: ${r.url}`);
      console.log(`    Page: ${r.title}\n`);
    });
    process.exit(1);
  }
  
  console.log('\n🎉 All slugs validated!');
})();
