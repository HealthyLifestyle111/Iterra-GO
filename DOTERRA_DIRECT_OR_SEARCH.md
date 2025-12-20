# doTERRA Direct-or-Search Logic

## The Problem

Dummy/internal display names were being treated like doTERRA product slugs, causing broken or mis-routed links. For example:
- `"Bone Support Complex"` (display name) was treated like a slug → broken link
- `"Metabolic Blend"` (generic label) was treated like a slug → wrong product page

## The Solution

**If the key is a real doTERRA slug → go direct to `/p/<slug>`**  
**If it's a dummy/generic label → redirect to doTERRA search for that label**

No guessing. No scraping. Just deterministic routing.

---

## Implementation

### Backend (`server/server.js`)

#### 1. Known Direct Slugs
Extract the target slugs (values) from `DOTERRA_SLUG_FIX`:

```js
const DIRECT_SLUGS = new Set(Object.values(DOTERRA_SLUG_FIX));
```

This creates a set of all known-good product slugs that can go direct to product pages.

#### 2. Slug Validation
Detect dummy names vs real slugs:

```js
function isLikelySlug(str) {
  // Slugs are lowercase letters/numbers/dashes, no spaces
  return /^[a-z0-9-]{3,120}$/.test(str) && str.includes("-");
}
```

Dummy names usually have:
- Spaces (human phrases)
- Internal labels ("bone support", "metabolic reset system")
- No hyphen structure you'd expect in a slug

#### 3. Redirect Logic (the heart)

```js
app.get("/api/doterra/go/:key", (req, res) => {
  const site = sanitizeSite(req.query.site);
  const rawKey = sanitizeKey(req.params.key);
  const keyLower = rawKey.toLowerCase();

  // 1) If explicitly mapped, go direct to the real slug
  const mapped = DOTERRA_SLUG_FIX[keyLower];
  if (mapped) {
    return res.redirect(302, buildReplicatedProductUrl(site, mapped));
  }

  // 2) If it looks like a true slug AND is in our direct slugs set, try direct
  if (isLikelySlug(keyLower) && DIRECT_SLUGS.has(keyLower)) {
    return res.redirect(302, buildReplicatedProductUrl(site, keyLower));
  }

  // 3) Otherwise it's a dummy/generic label: go to search
  return res.redirect(302, buildFullSearchUrl(site, rawKey));
});
```

**Result:**
- ✅ Oils (and anything mapped) → exact product page
- ✅ Dummy names → doTERRA search results for that phrase
- ✅ Unknown slugs → search (never dead links)

---

## Frontend Usage

### Use `doterraGoUrl()` for Backend Routing

```js
import { doterraGoUrl } from '@/lib/doterraGo';

// For real slugs (will go direct to product page)
const url = doterraGoUrl("lavender-oil", { site: memberSite });

// For display names (will go to search)
const url = doterraGoUrl("Bone Support Complex", { site: memberSite });
```

### Best Practices

1. **For known products**: Pass the `slug` key from your data
   ```js
   product.slug // e.g., "bone-nutrient-essential-complex"
   ```

2. **For user-generated or display names**: Pass the `displayName`
   ```js
   product.displayName // e.g., "Bone Support Complex"
   ```

3. **Always prefer slugs when available**:
   ```js
   // ✅ Good - uses known slug
   { name: "Bone Support Complex", slug: "bone-nutrient-essential-complex" }
   
   // ❌ Avoid - only display name
   { name: "Bone Support Complex" } // Will go to search
   ```

---

## Examples

### Real Slugs (Direct to Product Page)

```js
doterraGoUrl("lemon-oil")
// → https://www.doterra.com/US/en/site/jennawilliams1/p/lemon-oil

doterraGoUrl("bone-nutrient-essential-complex")
// → https://www.doterra.com/US/en/site/jennawilliams1/p/bone-nutrient-essential-complex
```

### Dummy Names (Redirect to Search)

```js
doterraGoUrl("Bone Support Complex")
// → https://www.doterra.com/US/en/site/jennawilliams1/search/fullsearch?text=Bone%20Support%20Complex&contentType=PRODUCT

doterraGoUrl("Metabolic Blend")
// → https://www.doterra.com/US/en/site/jennawilliams1/search/fullsearch?text=Metabolic%20Blend&contentType=PRODUCT
```

---

## Why This Works

### Previous Approach (Broken)
1. Try to resolve slug from HTML
2. Pick first product link found
3. First match was always the same promo (Foundational Wellness Bundle)
4. **All unknowns went to one page** ❌

### New Approach (Fixed)
1. Check if key is in mapping table → direct
2. Check if key looks like a slug AND is known → direct
3. Otherwise → search for the exact phrase
4. **Each query gets relevant results** ✅

---

## Testing

Run the backend server and visit:
- http://localhost:10000/api/doterra/go/lavender → direct to lavender-oil
- http://localhost:10000/api/doterra/go/Bone%20Support%20Complex → search results
- http://localhost:10000/api/doterra/go/unknownitem → search results

Open [test-doterra-resolver.html](./test-doterra-resolver.html) in a browser to test all scenarios.

---

## Maintenance

### Adding New Products

**For products you want direct links:**
```js
const DOTERRA_SLUG_FIX = {
  // Add both the shorthand and the full slug
  "bone-support": "bone-nutrient-essential-complex",
  "bone-nutrient-essential-complex": "bone-nutrient-essential-complex",
  // ...
}
```

**For generic/dummy names:**
- Don't add to `DOTERRA_SLUG_FIX`
- They'll automatically go to search
- This is intentional and correct behavior

---

## Summary

| Input Type | Example | Behavior |
|------------|---------|----------|
| **Mapped slug** | `"lemon"` | → `/p/lemon-oil` |
| **Known slug** | `"lavender-oil"` | → `/p/lavender-oil` |
| **Dummy name** | `"Bone Support"` | → Search for "Bone Support" |
| **Display name** | `"Metabolic Blend Essential Oil"` | → Search for "Metabolic Blend Essential Oil" |
| **Unknown** | `"xyz123"` | → Search for "xyz123" |

**Clean. Sophisticated. No broken links. Ever.**
