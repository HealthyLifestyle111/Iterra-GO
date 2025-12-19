import fs from "node:fs";

const fixes = JSON.parse(fs.readFileSync("doterra-fixes.auto.json", "utf8"));

// Change this path if your mapping lives elsewhere:
const file = "src/lib/doterraLinks.js";

let src = fs.readFileSync(file, "utf8");

// naive but effective: insert key/values just before the closing "};" of DOTERRA_SLUG_FIX
const insert = Object.entries(fixes)
  .sort(([a],[b]) => a.localeCompare(b))
  .map(([k,v]) => `  "${k}": "${v}",`)
  .join("\n");

if (!src.includes("export const DOTERRA_SLUG_FIX")) {
  throw new Error("DOTERRA_SLUG_FIX not found in " + file);
}

src = src.replace(
  /(export const DOTERRA_SLUG_FIX\s*=\s*\{\s*)([\s\S]*?)(\n\};)/,
  (m, start, body, end) => {
    // avoid duplicates if already present
    const existing = new Set([...body.matchAll(/"([^"]+)":/g)].map(x => x[1]));
    const filtered = Object.entries(fixes)
      .filter(([k]) => !existing.has(k))
      .sort(([a],[b]) => a.localeCompare(b))
      .map(([k,v]) => `  "${k}": "${v}",`)
      .join("\n");

    return `${start}${body.trimEnd()}\n${filtered}\n${end}`;
  }
);

fs.writeFileSync(file, src);
console.log("Merged fixes into", file);
