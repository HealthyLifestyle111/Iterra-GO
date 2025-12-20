import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("doterra-audit.json", "utf8"));

function keyFromUrl(url) {
  // normalize to the /p/<slug> part if present
  const m = url.match(/\/US\/en\/(?:site\/[^/]+\/)?p\/([^?#]+)/);
  return m ? m[1] : null;
}

const bucket = new Map();

for (const r of data.results || []) {
  // check both siteUrl and usUrl
  for (const url of [r.siteUrl, r.usUrl]) {
    if (!url) continue;
    const k = keyFromUrl(url);
    if (!k) continue;
    if (!bucket.has(k)) bucket.set(k, []);
    bucket.get(k).push(url);
  }
}

// report cases where both "x" and "x-oil" exist
const keys = Array.from(bucket.keys());
const collisions = [];

for (const k of keys) {
  if (k.endsWith("-oil")) continue;
  if (bucket.has(`${k}-oil`)) {
    collisions.push({
      base: k,
      prefer: `${k}-oil`,
      examples: [...new Set([...bucket.get(k), ...bucket.get(`${k}-oil`)])].slice(0, 6),
    });
  }
}

console.log(`Found ${collisions.length} slug collisions (base vs base-oil):\n`);
for (const c of collisions) {
  console.log(`- ${c.base}  -> prefer: ${c.prefer}`);
  for (const ex of c.examples) console.log(`   ${ex}`);
}
