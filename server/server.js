import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json({ limit: "1mb" }));

const hasKey = !!process.env.OPENAI_API_KEY;
const openai = hasKey ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// DoTERRA link resolver configuration
const REGION = process.env.DOTERRA_REGION_PATH || "/US/en";
const DOTERRA_ORIGIN = "https://www.doterra.com";
const DEFAULT_SITE = process.env.DOTERRA_DEFAULT_SITE || "jennawilliams1";
const TTL = Number(process.env.DOTERRA_CACHE_TTL_MS || 86400000);
const FETCH_TIMEOUT_MS = Number(process.env.DOTERRA_FETCH_TIMEOUT_MS || 15000);

const cache = new Map(); // key -> { slug, exp }

function now() { return Date.now(); }

function sanitizeSite(site) {
  const s = String(site || "").trim().toLowerCase();
  if (!s) return DEFAULT_SITE;
  if (!/^[a-z0-9_-]{3,64}$/.test(s)) return DEFAULT_SITE;
  return s;
}

function sanitizeKey(key) {
  const k = String(key || "").trim();
  if (!k) return "";
  return k.slice(0, 120);
}

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

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const r = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: ctrl.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (IterraGO Link Resolver)",
        "Accept": "text/html,application/xhtml+xml",
      }
    });
    const text = await r.text();
    return { ok: r.ok, status: r.status, url: r.url, text };
  } catch (e) {
    return { ok: false, status: 0, url, text: "" };
  } finally {
    clearTimeout(t);
  }
}

async function resolveSlugFromSearch(query) {
  const q = encodeURIComponent(query);
  const searchUrl =
    `${DOTERRA_ORIGIN}${REGION}/search/fullsearch?saveSearch=false` +
    `&text=${q}&contentType=PRODUCT`;

  const r = await fetchText(searchUrl);
  if (!r.ok || !r.text) return null;

  const m = r.text.match(/\/US\/en\/p\/([a-z0-9-]+)/i);
  if (!m) return null;
  return m[1].toLowerCase();
}

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (entry.exp < now()) { cache.delete(key); return null; }
  return entry.slug;
}

function setCached(key, slug) {
  cache.set(key, { slug, exp: now() + TTL });
}

function buildReplicatedProductUrl(site, slug) {
  return `${DOTERRA_ORIGIN}${REGION}/site/${site}/p/${slug}`;
}

function buildCanonicalProductUrl(slug) {
  return `${DOTERRA_ORIGIN}${REGION}/p/${slug}`;
}

function buildReplicatedSearchUrl(site, query) {
  const q = encodeURIComponent(query);
  return `${DOTERRA_ORIGIN}${REGION}/site/${site}/search?search=${q}`;
}

function buildReplicatedHome(site) {
  return `${DOTERRA_ORIGIN}${REGION}/site/${site}`;
}

// DoTERRA link resolver endpoint
app.get("/api/doterra/go/:key", async (req, res) => {
  const site = sanitizeSite(req.query.site);
  const rawKey = sanitizeKey(req.params.key);

  if (!rawKey) {
    return res.redirect(302, buildReplicatedHome(site));
  }

  // Cache lookup
  const cacheKey = `${site}::${rawKey.toLowerCase()}`;
  let slug = getCached(cacheKey);

  if (!slug) {
    slug = await resolveSlugFromSearch(rawKey);
    if (slug) setCached(cacheKey, slug);
  }

  if (!slug) {
    return res.redirect(302, buildReplicatedSearchUrl(site, rawKey));
  }

  // Prefer replicated product (attribution)
  const replicatedUrl = buildReplicatedProductUrl(site, slug);
  const rr = await fetchText(replicatedUrl);
  if (rr.ok && !looksLikeNotFound(rr.text)) {
    return res.redirect(302, replicatedUrl);
  }

  // Fallback: canonical product page
  return res.redirect(302, buildCanonicalProductUrl(slug));
});

app.get("/", (_req, res) => res.send("Iterra-GO API is running. Try /api/health"));

app.get("/api/health", (_req, res) =>
  res.json({ ok: true, ai: hasKey ? "enabled" : "stub" })
);

app.post("/api/ai", async (req, res) => {
  const { prompt, context, response_json_schema } = req.body ?? {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing prompt (string)." });
  }

  // ✅ No key yet → return stub JSON (keeps UI working)
  if (!hasKey) {
    return res.json({
      text: response_json_schema 
        ? JSON.stringify({ stub: true, message: "AI offline" })
        : "AI is offline (no API key set). Backend is healthy and ready.",
      stub: true
    });
  }

  try {
    const input = (context ? `Context:\n${context}\n\n` : "") + prompt;
    const options = {
      model: process.env.OPENAI_MODEL || "gpt-4",
      messages: [
        { role: "system", content: "You are the iTerra™ Wellness Concierge AI - an elegant, knowledgeable guide combining expertise as a nutritionist, aromatherapist, and wellness associate for holistic wellness using doTERRA essential oils and natural solutions." },
        { role: "user", content: input }
      ],
      temperature: 0.7,
      max_completion_tokens: 1500
    };

    // Enable JSON mode if schema provided
    if (response_json_schema) {
      options.response_format = { type: "json_object" };
    }

    const r = await openai.chat.completions.create(options);
    return res.json({ text: r.choices[0].message.content });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "AI server error" });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`AI server listening on ${port}`));

