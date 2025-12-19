import { chromium } from "playwright";

const BASE = "https://iterra-go.onrender.com";
const MAX_PAGES = 300;         // raise if you want deeper
const SAME_ORIGIN_ONLY = true; // set false to also crawl external pages

// Seed known routes for SPA
const KNOWN_ROUTES = [
  BASE,
  BASE + "/ai",
  BASE + "/Home",
  BASE + "/BackOffice",
  BASE + "/BackOffice?demo=true",
  BASE + "/WellnessIntake",
  BASE + "/WellnessIntakeResult",
  BASE + "/SpecializedIntake",
  BASE + "/HomeEssentials",
  BASE + "/LeadershipWisdom",
  BASE + "/ServiceDetail"
];

function normalize(url) {
  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}

function isInternal(url) {
  try {
    return new URL(url).origin === new URL(BASE).origin;
  } catch {
    return false;
  }
}

async function checkUrl(url) {
  // Some sites block HEAD; GET is safer.
  try {
    const r = await fetch(url, { method: "GET", redirect: "follow" });
    return { ok: r.ok, status: r.status, finalUrl: r.url };
  } catch (e) {
    return { ok: false, status: 0, error: String(e) };
  }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const queue = [...KNOWN_ROUTES]; // Seed with known SPA routes
  const seenPages = new Set();
  const seenLinks = new Set();
  const broken = [];

  while (queue.length && seenPages.size < MAX_PAGES) {
    const current = queue.shift();
    if (seenPages.has(current)) continue;
    seenPages.add(current);

    try {
      await page.goto(current, { waitUntil: "networkidle", timeout: 45000 });

      const hrefs = await page.$$eval("a[href]", (as) =>
        as.map((a) => a.getAttribute("href")).filter(Boolean)
      );

      for (const h of hrefs) {
        const abs = normalize(h.startsWith("http") ? h : new URL(h, current).toString());
        if (!abs) continue;
        if (!seenLinks.has(abs)) {
          seenLinks.add(abs);

          const res = await checkUrl(abs);
          if (!res.ok) broken.push({ from: current, link: abs, ...res });
        }

        // Crawl internal pages
        if (isInternal(abs) && !seenPages.has(abs)) queue.push(abs);
      }
    } catch (e) {
      broken.push({ from: current, link: current, ok: false, status: 0, error: String(e) });
    }
  }

  await browser.close();

  console.log(JSON.stringify({
    base: BASE,
    pagesCrawled: seenPages.size,
    linksChecked: seenLinks.size,
    brokenCount: broken.length,
    broken
  }, null, 2));
})();
