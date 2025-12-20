/**
 * Verify doTERRA product slugs by checking:
 *   https://www.doterra.com/US/en/p/<slug>
 *
 * Outputs:
 *   verifiedSlugs.json  (in repo root)
 *
 * How it works:
 * - Scans your repo for "/p/<slug>" patterns (so you don't need to hand-maintain a list)
 * - Verifies each slug against doTERRA
 * - Marks slugs that redirect to /recommended-error or homepage as invalid
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

const DOTERRA_CANONICAL = "https://www.doterra.com/US/en/p/";
const BAD_REDIRECT_HINTS = [
  "/recommended-error",
  "/US/en/site/",
  "https://www.doterra.com/US/en", // homepage-ish
  "https://www.doterra.com/US/en/",
  "https://www.doterra.com/",
];

const EXCLUDE_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", ".vercel", ".vite"]);
const INCLUDE_EXTS = new Set([".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".json", ".md"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (INCLUDE_EXTS.has(ext)) out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

function extractSlugsFromText(text) {
  // Matches "/p/<slug>" where slug is lowercase letters/numbers/hyphens
  const re = /\/p\/([a-z0-9-]{2,})/g;
  const slugs = new Set();
  let m;
  while ((m = re.exec(text))) slugs.add(m[1]);
  return slugs;
}

async function verifySlug(slug) {
  const url = `${DOTERRA_CANONICAL}${slug}`;

  // Use redirect: "manual" so we can detect doTERRA redirecting broken products away
  const res = await fetch(url, {
    method: "GET",
    redirect: "manual",
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; iTerraGoVerifier/1.0)",
      "Accept": "text/html,application/xhtml+xml",
    },
  });

  // 200 = page loaded
  if (res.status === 200) return { ok: true, status: 200, finalUrl: url };

  // 3xx = redirect somewhere else
  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get("location") || "";
    const isBad = BAD_REDIRECT_HINTS.some((hint) => loc.includes(hint));
    return { ok: !isBad, status: res.status, redirectTo: loc, finalUrl: isBad ? null : loc };
  }

  // Anything else: treat as not verified
  return { ok: false, status: res.status, finalUrl: null };
}

async function main() {
  console.log(`Scanning repo for /p/<slug> patterns...`);
  const files = walk(REPO_ROOT);

  const slugs = new Set();
  for (const f of files) {
    try {
      const text = fs.readFileSync(f, "utf8");
      for (const slug of extractSlugsFromText(text)) slugs.add(slug);
    } catch {
      // ignore binary / unreadable
    }
  }

  const slugList = [...slugs].sort();
  console.log(`Found ${slugList.length} unique slugs.`);

  // Concurrency limit (keeps you from hammering doTERRA)
  const CONCURRENCY = 6;
  let idx = 0;

  const verified = {};
  const invalid = {};

  async function worker() {
    while (idx < slugList.length) {
      const myIdx = idx++;
      const slug = slugList[myIdx];
      try {
        const r = await verifySlug(slug);
        if (r.ok) verified[slug] = r;
        else invalid[slug] = r;
        console.log(`${r.ok ? "✅" : "❌"} ${slug} (${r.status}${r.redirectTo ? ` -> ${r.redirectTo}` : ""})`);
      } catch (e) {
        invalid[slug] = { ok: false, status: "ERR", error: String(e) };
        console.log(`❌ ${slug} (ERR)`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  const out = {
    timestamp: new Date().toISOString(),
    totals: {
      found: slugList.length,
      verified: Object.keys(verified).length,
      invalid: Object.keys(invalid).length,
    },
    verifiedSlugs: Object.keys(verified),
    verified,
    invalid,
  };

  const outPath = path.join(REPO_ROOT, "verifiedSlugs.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
  console.log(`\nWrote: ${outPath}`);
  console.log(`Verified: ${out.totals.verified} | Invalid: ${out.totals.invalid}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
