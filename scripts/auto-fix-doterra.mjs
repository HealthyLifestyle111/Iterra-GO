import fs from "node:fs";

const SITE = "jennawilliams1";
const BASE_SITE = `https://www.doterra.com/US/en/site/${SITE}/p/`;
const BASE_US = `https://www.doterra.com/US/en/p/`;

const CONCURRENCY = 8;          // safe speed
const TIMEOUT_MS = 15000;       // don't hang forever
const OUT_FIXES = "doterra-fixes.auto.json";
const OUT_STILL = "doterra-still-broken.json";
const OUT_PROGRESS = "doterra-auto-fix.progress.json";

function looksLikeNotFound(html) {
  if (!html) return true;
  const s = html.toLowerCase();
  return (
    s.includes("looks like something went wrong") ||
    s.includes("page not found") ||
    (s.includes("cannot be found") && s.includes("we're sorry")) ||
    (s.includes("requested page") && s.includes("cannot be found"))
  );
}

async function fetchOk(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const r = await fetch(url, { method: "GET", redirect: "follow", signal: ctrl.signal });
    const html = await r.text();
    return r.status === 200 && !looksLikeNotFound(html);
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}

function candidates(slug) {
  const s = String(slug || "").trim().toLowerCase();
  if (!s) return [];

  const out = new Set([
    s,
    `${s}-oil`,
    `${s}-essential-oil`,
    `${s}-blend-oil`,
    `${s}-oil-blend`,
    `${s}-softgels`,
    `${s}-softgel`,
    `${s}-capsules`,
    `${s}-beadlets`,
  ]);

  // common cleanups
  out.add(s.replace(/-digestive-health$/, ""));
  out.add(s.replace(/-energy-metabolism-complex$/, ""));
  out.add(s.replace(/-respiratory-blend$/, "-oil"));
  out.add(s.replace(/-calming-blend$/, "-oil"));
  out.add(s.replace(/-massage-blend$/, "-massage-blend-oil"));

  // remove accidental template tokens
  for (const v of [...out]) {
    if (v.includes("${") || v.includes("}")) out.delete(v);
  }

  return [...out].filter(Boolean);
}

function loadJson(path, fallback) {
  try { return JSON.parse(fs.readFileSync(path, "utf8")); } catch { return fallback; }
}

async function resolveOne(slug) {
  const tried = [];
  for (const cand of candidates(slug)) {
    const siteUrl = BASE_SITE + cand;
    tried.push(siteUrl);
    if (await fetchOk(siteUrl)) return { slug, ok: true, fixed: cand, where: "site", url: siteUrl };

    const usUrl = BASE_US + cand;
    tried.push(usUrl);
    if (await fetchOk(usUrl)) return { slug, ok: true, fixed: cand, where: "us", url: usUrl };
  }
  return { slug, ok: false, triedCount: tried.length };
}

async function runPool(items, worker, concurrency) {
  let i = 0;
  const results = [];
  const workers = Array.from({ length: concurrency }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return results;
}

(async () => {
  const audit = loadJson("doterra-audit.json", null);
  if (!audit?.results) {
    console.error("Missing doterra-audit.json. Run your audit first.");
    process.exit(1);
  }

  const broken = audit.results.filter(r => !r.siteOk && !r.usOk).map(r => r.slug);
  const existingFixes = loadJson(OUT_FIXES, {});
  const alreadyDone = new Set(Object.keys(existingFixes));

  const todo = broken.filter(s => !alreadyDone.has(s));
  console.log(`Broken slugs: ${broken.length}`);
  console.log(`Already fixed (from ${OUT_FIXES}): ${alreadyDone.size}`);
  console.log(`To resolve now: ${todo.length}`);

  let done = 0;
  const progress = loadJson(OUT_PROGRESS, { startedAt: new Date().toISOString(), results: {} });

  const resolved = await runPool(todo, async (slug) => {
    const r = await resolveOne(slug);
    done++;
    if (done % 5 === 0) console.log(`Progress: ${done}/${todo.length}`);

    // persist incremental progress so you never "lose" a long run
    progress.results[slug] = r;
    fs.writeFileSync(OUT_PROGRESS, JSON.stringify(progress, null, 2));

    return r;
  }, CONCURRENCY);

  const fixes = { ...existingFixes };
  const still = [];

  for (const r of resolved) {
    if (r?.ok && r.fixed && r.fixed !== r.slug) fixes[r.slug] = r.fixed;
    else if (r?.ok && r.fixed === r.slug) {
      // it worked as-is; don't need mapping
    } else {
      still.push(r.slug);
    }
  }

  fs.writeFileSync(OUT_FIXES, JSON.stringify(fixes, null, 2));
  fs.writeFileSync(OUT_STILL, JSON.stringify(still.sort(), null, 2));

  console.log(`Auto-fixed mappings written: ${OUT_FIXES} (count: ${Object.keys(fixes).length})`);
  console.log(`Still broken written: ${OUT_STILL} (count: ${still.length})`);
})();
