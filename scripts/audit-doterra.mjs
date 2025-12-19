import fs from "node:fs";
import path from "node:path";

const SITE = "jennawilliams1";
const URL_SITE = (slug) => `https://www.doterra.com/US/en/site/${SITE}/p/${slug}`;
const URL_US = (slug) => `https://www.doterra.com/US/en/p/${slug}`;

// doTERRA sometimes returns "oops/not found" pages with HTTP 200.
// These strings catch that.
function looksLikeNotFound(html) {
  if (!html) return true;
  const s = html.toLowerCase();
  return (
    s.includes("page not found") ||
    s.includes("looks like something went wrong") ||
    s.includes("requested page") && s.includes("cannot be found") ||
    s.includes("we're sorry") && s.includes("cannot be found")
  );
}

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (p.endsWith(".js") || p.endsWith(".jsx") || p.endsWith(".ts") || p.endsWith(".tsx")) out.push(p);
  }
  return out;
}

function extractSlugsFromText(text) {
  const slugs = new Set();

  // Grab anything that looks like /p/<slug>
  for (const m of text.matchAll(/\/p\/([a-z0-9-]+)/gi)) slugs.add(m[1].toLowerCase());

  // Grab full doTERRA links and extract slug
  for (const m of text.matchAll(/https?:\/\/www\.doterra\.com\/US\/en\/(?:site\/[^\/]+\/)?p\/([a-z0-9-]+)/gi)) {
    slugs.add(m[1].toLowerCase());
  }

  // Extract slugs from DOTERRA_SLUG_FIX object (keys and values)
  const slugFixMatch = text.match(/DOTERRA_SLUG_FIX\s*=\s*\{([^}]+)\}/s);
  if (slugFixMatch) {
    const objContent = slugFixMatch[1];
    // Match quoted strings (keys and values)
    for (const m of objContent.matchAll(/"([a-z0-9-]+)"/gi)) {
      slugs.add(m[1].toLowerCase());
    }
  }

  return [...slugs];
}

async function fetchHtml(url) {
  const r = await fetch(url, { method: "GET", redirect: "follow" });
  const html = await r.text();
  return { status: r.status, finalUrl: r.url, html };
}

(async () => {
  const files = walk(path.resolve("src"));
  const all = new Set();

  for (const f of files) {
    const t = fs.readFileSync(f, "utf8");
    for (const s of extractSlugsFromText(t)) all.add(s);
  }

  const slugs = [...all].sort();
  const results = [];

  for (const slug of slugs) {
    // Try replicated-site URL first
    const u1 = URL_SITE(slug);
    const r1 = await fetchHtml(u1);
    const ok1 = r1.status === 200 && !looksLikeNotFound(r1.html);

    // If that fails, try the US canonical /p/ URL
    let ok2 = false, r2 = null;
    if (!ok1) {
      const u2 = URL_US(slug);
      r2 = await fetchHtml(u2);
      ok2 = r2.status === 200 && !looksLikeNotFound(r2.html);
    }

    results.push({
      slug,
      siteUrl: u1,
      siteOk: ok1,
      usUrl: URL_US(slug),
      usOk: ok2,
      siteFinal: r1.finalUrl,
      usFinal: r2?.finalUrl || null,
    });
  }

  const broken = results.filter(r => !r.siteOk && !r.usOk);
  const working = results.filter(r => r.siteOk || r.usOk);

  fs.writeFileSync("doterra-audit.json", JSON.stringify({ total: results.length, working: working.length, broken: broken.length, results }, null, 2));
  console.log(`Total slugs: ${results.length}`);
  console.log(`Working (site OR US): ${working.length}`);
  console.log(`Broken (both fail): ${broken.length}`);
  console.log(`Wrote report: doterra-audit.json`);
})();
