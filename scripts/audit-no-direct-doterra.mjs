import fs from "node:fs";
import path from "node:path";

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (p.endsWith(".js") || p.endsWith(".jsx") || p.endsWith(".ts") || p.endsWith(".tsx")) out.push(p);
  }
  return out;
}

const files = walk(path.resolve("src"));
const bad = [];

for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  // Allow blog links, only flag product pages
  if (t.includes("www.doterra.com/") && !t.includes("/blog/")) {
    bad.push(f);
  } else if (t.match(/\/US\/en\/site\/.*\/p\//)) {
    bad.push(f);
  }
}

if (bad.length) {
  console.error("Direct doTERRA links found in src/. Use doterraGoUrl() instead.\n");
  for (const f of bad) console.error(" -", f);
  process.exit(1);
}

console.log("OK: No direct doTERRA links in src/");
