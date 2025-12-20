# Fix Summary: doTERRA Link Resolution

## Problem
The user reported that product links from the app were not working. Example broken URLs:
- `https://www.doterra.com/US/en/site/jennawilliams1/p/mito2max-energy-metabolism-complex`
- `https://www.doterra.com/US/en/site/jennawilliams1/p/on-guard-plus-softgels`
- `https://www.doterra.com/US/en/site/jennawilliams1/p/peppermint-beadlets-digestive-health`
- `https://www.doterra.com/US/en/site/jennawilliams1/p/greens-digestive-health-supplement`

All of these returned 404 errors on doTERRA's website.

## Root Cause
The frontend (`Home.jsx`) was using `doterraUrl()` from `src/lib/doterraLinks.js`, which:
1. Looks up the slug in `DOTERRA_SLUG_FIX` mapping
2. Builds a direct URL to doTERRA: `https://www.doterra.com/US/en/site/{site}/p/{slug}`
3. **Does NOT handle the case where the mapped slug doesn't exist on doTERRA**

Meanwhile, the backend had proper "direct-or-search" logic:
- `/api/doterra/go/{key}` endpoint checks if the product exists
- If product exists → redirect to product page
- If product doesn't exist → redirect to search page

The frontend was bypassing this backend resolver entirely!

## Solution
Changed `Home.jsx` to use `doterraGoUrl()` from `src/lib/doterraGo.js` instead:

**Before:**
```javascript
import { doterraUrl } from "@/lib/doterraLinks";
...
onClick={() => openLink(doterraUrl(product.slug))}
```

**After:**
```javascript
import { doterraGoUrl } from "@/lib/doterraGo";
...
onClick={() => openLink(doterraGoUrl(product.slug))}
```

## How It Works Now
1. User clicks product link in `Home.jsx`
2. `doterraGoUrl(slug)` generates: `http://localhost:10000/api/doterra/go/{slug}`
3. Backend receives request at `/api/doterra/go/{slug}`
4. Backend checks:
   - Is `slug` in `DOTERRA_SLUG_FIX` mapping? If yes, use mapped value
   - Is the slug in `DIRECT_SLUGS` (known valid slugs)? If yes, redirect to `/p/{slug}`
   - Otherwise: redirect to search page
5. User gets redirected to either the product page OR a search results page
6. **No more 404 errors!**

## Files Changed
1. `/workspaces/Iterra-GO/src/pages/Home.jsx`
   - Changed import from `doterraUrl` to `doterraGoUrl`
   - Replaced all 15 usages of `doterraUrl(` with `doterraGoUrl(`

2. `/workspaces/Iterra-GO/src/pages/HomeEssentials.jsx`
   - Changed import from `doterraUrl` to `doterraGoUrl`
   - Replaced all 5 usages of `doterraUrl(` with `doterraGoUrl(`

3. `/workspaces/Iterra-GO/.env` (created)
   - Added `VITE_API_URL=http://localhost:10000`

## Testing
The backend resolver was tested and verified to work correctly:
```bash
curl -I http://localhost:10000/api/doterra/go/mito2max-energy-metabolism-complex
# → 302 redirect to /p/supplements-mito-2-max

curl -I http://localhost:10000/api/doterra/go/on-guard-plus-softgels
# → 302 redirect to search page (product not found)
```

## Benefits
- ✅ No more 404 errors - all products either go to product page or search
- ✅ Centralized mapping logic in backend
- ✅ Frontend and backend use same resolver
- ✅ Easy to update mappings in one place (server/server.js)
- ✅ Graceful degradation for discontinued products
