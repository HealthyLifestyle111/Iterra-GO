# Quick Reference: doTERRA Direct-or-Search

## The Rule (One Sentence)

**If the key is a real doTERRA slug → go direct to `/p/<slug>`; if it's a dummy/generic label → redirect to doTERRA search for that label.**

---

## Backend Routing Logic

```js
// 1. Mapped in DOTERRA_SLUG_FIX? → Direct
if (DOTERRA_SLUG_FIX[key]) → /p/<mapped-slug>

// 2. Looks like slug AND in DIRECT_SLUGS? → Direct  
if (isLikelySlug(key) && DIRECT_SLUGS.has(key)) → /p/<key>

// 3. Otherwise → Search
else → /search?text=<key>
```

---

## What Goes Where

| Input Type | Example | Behavior |
|------------|---------|----------|
| **Mapped slug** | `"lemon"` | Direct → `/p/lemon-oil` |
| **Known slug** | `"lavender-oil"` | Direct → `/p/lavender-oil` |
| **Dummy name** | `"Bone Support"` | Search for "Bone Support" |
| **Display name** | `"Metabolic Blend"` | Search for "Metabolic Blend" |
| **Unknown** | `"xyz123"` | Search for "xyz123" |

---

## Frontend Usage

```js
import { doterraGoUrl } from '@/lib/doterraGo';

// ✅ For known products (use slug)
doterraGoUrl("bone-nutrient-essential-complex")

// ✅ For display names (will search)
doterraGoUrl("Bone Support Complex")

// ✅ With associate site
doterraGoUrl("lemon", { site: "jennawilliams1" })
```

---

## How to Identify Dummy Names

Dummy names usually have:
- ❌ Spaces: `"Bone Support Complex"`
- ❌ Human phrases: `"Metabolic Reset System"`
- ❌ Internal labels: `"Family Wellness Bundle"`
- ❌ No hyphens: `"unknownitem"`

Real slugs look like:
- ✅ Lowercase: `"lemon-oil"`
- ✅ Hyphens: `"bone-nutrient-essential-complex"`
- ✅ No spaces: `"adaptiv-calming-blend"`
- ✅ In DOTERRA_SLUG_FIX or DIRECT_SLUGS

---

## Testing

```bash
# Run automated tests
node test-direct-or-search.mjs

# Check specific URL
curl -I "http://localhost:10000/api/doterra/go/lemon"
# Should redirect to: .../p/lemon-oil

curl -I "http://localhost:10000/api/doterra/go/Bone%20Support%20Complex"
# Should redirect to: .../search?text=Bone%20Support%20Complex
```

---

## Common Mistakes

❌ **DON'T**: Pass display names expecting direct links
```js
doterraGoUrl("Bone Support Complex") 
// → Goes to SEARCH (correct behavior!)
```

✅ **DO**: Pass real slugs for direct links
```js
doterraGoUrl("bone-nutrient-essential-complex")
// → Goes to /p/bone-nutrient-essential-complex
```

---

## When to Add to DOTERRA_SLUG_FIX

**Add if:**
- You have a verified doTERRA product slug
- You want direct links to product pages
- The slug is stable and won't change

**Don't add if:**
- It's a display name or label
- You want search behavior
- It's a temporary/internal name

---

## Quick Debug

```bash
# Check if slug is in DIRECT_SLUGS
node -e "
const map = require('./server/server.js');
const slugs = new Set(Object.values(map));
console.log(slugs.has('your-slug-here'));
"
```

---

## Files to Know

- **Backend**: `server/server.js` (routing logic)
- **Frontend**: `src/lib/doterraGo.js` (URL builder)
- **Tests**: `test-direct-or-search.mjs` (validation)
- **Docs**: `DOTERRA_DIRECT_OR_SEARCH.md` (full guide)

---

**Remember**: Direct-or-search. Real slugs go direct, dummy names search. Simple, clean, no broken links.
