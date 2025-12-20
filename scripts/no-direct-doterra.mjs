import fs from "node:fs";
import path from "node:path";

const bad = [];

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      walk(p);
    } else if (/\.(js|jsx|ts|tsx)$/.test(p)) {
      const s = fs.readFileSync(p, "utf8");
      if (s.includes("www.doterra.com") && s.includes("/p/")) {
        bad.push(p);
      }
    }
  }
}

walk("src");

if (bad.length) {
  console.error("❌ Direct doTERRA /p/ links found. Must use doterraGoUrl:");
  bad.forEach((p) => console.error("   - " + p));
  process.exit(1);
} else {
  console.log("✅ OK: no direct doTERRA /p/ links in src/");
}
