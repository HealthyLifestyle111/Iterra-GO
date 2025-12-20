# ASSOCIATE_REFERRAL_IMPLEMENTATION.md
_Last updated: 2025-12-20_

## What this solves (in plain English)

Your app is a members-only "turnkey storefront." A member buys a membership, enters their **doTERRA referral identity**, and from that moment onward the entire app routes every product click so **they** get credit — not Jenna — without breaking links or falling back to random search pages.

This guide fixes two problems at once:

1) **Broken product links** (dummy names → wrong slugs → `/search?q=` / 404 / "recommended-error")  
2) **Turnkey associate switching** (member enters info once; app uses it everywhere)

The core principle is simple and ruthless:

> **Never build doTERRA product URLs from names. Ever.**  
> Use a canonical product catalog for destinations, and a separate associate record for attribution.

---

## Terms you'll see in this guide

- **displayName**: the label you show in your UI ("Lemon", "Sunlight in a Bottle", etc.). Can be "dummy."
- **productId**: your internal stable ID (`"lemon"`, `"phytoestrogen-complex"`)
- **canonicalUrl**: the real doTERRA destination for a product (`/US/en/p/lemon-oil`)
- **referralUrl**: the associate's doTERRA referral link (`https://referral.doterra.me/...`) — *required for turnkey*
- **shareLinks**: optional per-product credited links (e.g., from Link Generator) — *best quality when available*
- **/go redirect**: your internal route that handles "activate credit → then send to product"

---

## File map (recommended)

```
src/
  data/
    products.json
    associates.json        (or DB)
  lib/
    resolveOutboundLink.js
  pages/
    MembershipSignup.jsx   (or your checkout/signup)
server/
  server.js
  routes/
    go.js
scripts/
  extract-doterra-links.sh
  report-slug-collisions.mjs
```

---

## Step 1 — Create a canonical product catalog (this fixes broken links)

### ✅ `src/data/products.json`
Store only **canonical destinations** (no `/search?q=`, no `/site/<name>/p/`):

```json
{
  "lemon": {
    "name": "Lemon",
    "canonicalUrl": "https://www.doterra.com/US/en/p/lemon-oil"
  },
  "phytoestrogen-complex": {
    "name": "Phytoestrogen Essential Complex",
    "canonicalUrl": "https://www.doterra.com/US/en/p/phytoestrogen-complex"
  }
}
```

### What changes in your UI data (dummy names)

Instead of storing external URLs per UI card, store only `productId`:

```json
{
  "displayName": "Sunlight in a Bottle",
  "productId": "lemon"
}
```

Now your "dummy names" can be poetic, branded, renamed, regrouped — and the link **never breaks**.

---

## Step 2 — Store associate attribution (this enables turnkey switching)

### ✅ Associate record shape

Minimum required to be turnkey:

```json
{
  "id": "jennawilliams1",
  "displayName": "Jenna Williams",
  "referralUrl": "https://referral.doterra.me/XXXXX",
  "shareLinks": {
    "phytoestrogen-complex": "https://<credited-link-generator-url>"
  }
}
```

**Turnkey rule:** on membership purchase, member must provide `referralUrl` (or you cannot reliably attribute without manual admin mapping).

---

## Step 3 — Implement `resolveOutboundLink()` (one function to rule all clicks)

### ✅ `src/lib/resolveOutboundLink.js`

```js
import products from "../data/products.json";

export function resolveOutboundLink({ associate, productId }) {
  const product = products[productId];
  if (!product) throw new Error(`Unknown productId: ${productId}`);

  // Best: associate has a credited per-product URL (Link Generator output).
  const credited = associate?.shareLinks?.[productId];
  if (credited && typeof credited === "string" && credited.startsWith("http")) {
    return credited;
  }

  // Default: route through your server redirect
  return `/go/${encodeURIComponent(associate.id)}/${encodeURIComponent(productId)}`;
}
```

---

## Step 4 — Add the /go redirect endpoint (credit activation + stable destination)

This makes your system "turnkey" with only one associate field: `referralUrl`.

### ✅ `server/routes/go.js`

```js
import express from "express";
import products from "../../src/data/products.json" assert { type: "json" };

// Replace this with your DB lookup.
import associates from "../../src/data/associates.json" assert { type: "json" };

const router = express.Router();

router.get("/go/:associateId/:productId", (req, res) => {
  const { associateId, productId } = req.params;

  const associate = associates[associateId];
  const product = products[productId];

  if (!associate?.referralUrl) return res.status(404).send("Unknown associate or missing referralUrl.");
  if (!product?.canonicalUrl) return res.status(404).send("Unknown product.");

  // "Activation" cookie: once set, we skip sending to referralUrl repeatedly.
  const cookieName = `dt_activated_${associateId}`;
  const activated = req.cookies?.[cookieName] === "1";

  if (!activated) {
    res.cookie(cookieName, "1", {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax"
    });
    return res.redirect(302, associate.referralUrl);
  }

  return res.redirect(302, product.canonicalUrl);
});

export default router;
```

### ✅ Mount it in `server/server.js`

```js
import cookieParser from "cookie-parser";
import goRouter from "./routes/go.js";

app.use(cookieParser());
app.use(goRouter);
```

---

## Step 5 — Fix the UI click handler (avoid SPA/router hijacking)

**Do not** use React Router `<Link>` for external destinations.
Use a plain anchor.

```jsx
import { resolveOutboundLink } from "../lib/resolveOutboundLink";

export function ProductCard({ associate, productId, label }) {
  const href = resolveOutboundLink({ associate, productId });

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}
```

---

## Step 6 — Membership form: add `referralUrl` (this is the turnkey switch)

You said: "When they purchase a membership, they enter their associate name and it switches."
**Replace that input** (or add alongside it) with the **referralUrl**, because that is what your system can reliably use.

### ✅ Typical membership form fields

* `associateDisplayName` (optional, for UI)
* `associateId` (optional, for your internal key)
* **`referralUrl` (required)**

### Where is the membership form?

Run this in your repo to find it:

```bash
rg -n "membership|checkout|subscribe|pricing|plan|stripe|purchase|register|signup" src
rg -n "form|onSubmit|handleSubmit" src/pages src/components
```

### Exact code change pattern (React)

In the form state:

```js
const [referralUrl, setReferralUrl] = useState("");
```

Add an input:

```jsx
<label>
  doTERRA Referral Link (required)
  <input
    value={referralUrl}
    onChange={(e) => setReferralUrl(e.target.value)}
    placeholder="https://referral.doterra.me/..."
    required
  />
</label>
```

Validate before saving:

```js
function isValidReferralUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname === "referral.doterra.me";
  } catch {
    return false;
  }
}

if (!isValidReferralUrl(referralUrl)) {
  setError("Please paste a valid doTERRA referral link (referral.doterra.me/...).");
  return;
}
```

Save it to the member/associate profile (DB or json):

```js
await saveAssociate({
  id: associateIdOrGenerated,
  displayName: associateDisplayName,
  referralUrl,
  shareLinks: {}
});
```

Then, when the member logs in, load that associate and set it as "active associate" across the app.

---

## Migration: from `doterraGoUrl()` → `resolveOutboundLink()`

If you currently have `src/lib/doterraGo.js` or `doterraGoUrl(slug)` producing `/site/<name>/p/<slug>`, that's the source of breakage.

### ✅ Replace usage sites

Search:

```bash
rg -n "doterraGoUrl\\(|doterraGo\\(|/US/en/site/" src
```

Refactor:

**Before**

```js
const href = doterraGoUrl(slug);   // fragile
```

**After**

```js
const href = resolveOutboundLink({ associate, productId });
```

### Temporary adapter (if you need it)

If you must keep old call sites alive during migration:

```js
// src/lib/doterraGo.js
import { resolveOutboundLink } from "./resolveOutboundLink";

export function doterraGoUrl(slugOrProductId, associate) {
  // treat the old slug as productId if you used slugs as IDs
  return resolveOutboundLink({ associate, productId: slugOrProductId });
}
```

Then migrate component-by-component until the adapter is unused and delete it.

---

## Testing procedures (don't guess — prove)

### 1) Unit test the resolver

* When shareLinks has a product → returns shareLinks URL
* Else → returns `/go/:associate/:productId`

### 2) Integration test the /go route

* First click → 302 to referralUrl and sets activation cookie
* Second click → 302 to canonicalUrl

### 3) Manual QA checklist (fast)

* Open product from a fresh incognito session:
  * first click should hit referral link (activation)
  * second click should go directly to product
* Swap active associate:
  * activation cookie should be associate-specific
  * product click should route to the new associate's referralUrl first

---

## How to add more products (repeatable, no chaos)

1. Add product entry to `src/data/products.json` with a known-good `canonicalUrl`
2. In your UI listings, reference it by `productId`
3. Run your link audit script and ensure no `/search?q=` or `/site/` URLs are being used

---

## Guardrails (prevent regressions)

### Block known-bad patterns in CI

Add this to `package.json` scripts:

```json
{
  "scripts": {
    "check:no-bad-doterra-links": "rg -n \"doterra\\.com/US/en/(search\\?q=|site/|recommended-error)\" . && exit 1 || exit 0"
  }
}
```

Run:

```bash
npm run check:no-bad-doterra-links
```

---

## What this architecture guarantees

✅ Dummy names never break links  
✅ Associate switching is instant and global  
✅ You stop chasing doTERRA slug inconsistencies  
✅ You can onboard a new associate in minutes (one required field)

What it does **not** magically guarantee:

* Perfect "credited" tracking for every single click if the associate refuses to provide any doTERRA-issued referral identity.
  A username alone cannot reliably generate doTERRA-issued tracking URLs.

---

## Next: show me where your membership form lives

Run:

```bash
rg -n "Membership|Subscribe|Plan|Checkout|Stripe|Purchase|Signup|Register" src
```

Paste the file path(s) and ~40 lines around the submit handler, and I'll tell you **exactly** where to add `referralUrl` so the associate flips immediately after purchase.
