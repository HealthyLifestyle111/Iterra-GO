# Testing Guide: doTERRA Link Resolution Fix

## Quick Verification

### 1. Check the Backend is Running
```bash
curl http://localhost:10000/api/doterra/go/lavender
```
Should return a 302 redirect.

### 2. Test Problem Slugs from User
These were the originally broken URLs that the user reported:

```bash
# Test through backend resolver
for slug in "mito2max-energy-metabolism-complex" "on-guard-plus-softgels" "peppermint-beadlets-digestive-health" "greens-digestive-health-supplement"; do
  echo "Testing: $slug"
  curl -sI "http://localhost:10000/api/doterra/go/$slug" | grep -E "^HTTP|^Location"
  echo ""
done
```

**Expected Results:**
- `mito2max-energy-metabolism-complex` → 302 redirect to `/p/supplements-mito-2-max`
- `on-guard-plus-softgels` → 302 redirect to search page
- `peppermint-beadlets-digestive-health` → 302 redirect to search page  
- `greens-digestive-health-supplement` → 302 redirect to search page

### 3. Test Frontend URL Generation
Open browser console on the app and run:
```javascript
import { doterraGoUrl } from '@/lib/doterraGo';
console.log(doterraGoUrl('lavender'));
// Should output: http://localhost:10000/api/doterra/go/lavender
```

## Full Integration Test

### Step 1: Start the Backend
```bash
cd /workspaces/Iterra-GO/server
npm start
```

### Step 2: Start the Frontend
```bash
cd /workspaces/Iterra-GO
npm run dev
```

### Step 3: Test in Browser
1. Open the app in browser
2. Navigate to the "Masculine Vitality" section
3. Click on any product (e.g., "Energy & Stamina Complex")
4. **Expected:** Should redirect through backend to doTERRA
5. **If product exists:** Opens doTERRA product page
6. **If product doesn't exist:** Opens doTERRA search with product name

### Step 4: Verify Network Traffic
1. Open browser DevTools → Network tab
2. Click a product link
3. **Expected flow:**
   - Request to: `http://localhost:10000/api/doterra/go/{slug}`
   - Response: 302 redirect
   - Browser follows redirect to doTERRA

## Common Issues & Solutions

### Issue: Links still go to 404 pages
**Solution:** Make sure VITE_API_URL is set in .env:
```bash
cat /workspaces/Iterra-GO/.env
# Should contain: VITE_API_URL=http://localhost:10000
```

Restart the frontend dev server after adding .env:
```bash
npm run dev
```

### Issue: Backend not responding
**Solution:** Check if backend is running:
```bash
curl http://localhost:10000/health
lsof -i :10000
```

### Issue: Redirects to wrong URL
**Solution:** Check the mapping in `server/server.js`:
```bash
grep "mito2max-energy-metabolism-complex" server/server.js
```

## Architecture Diagram

```
User clicks product
       ↓
Home.jsx: doterraGoUrl(slug)
       ↓
http://localhost:10000/api/doterra/go/{slug}
       ↓
Backend Resolver:
  1. Check DOTERRA_SLUG_FIX mapping
  2. Check DIRECT_SLUGS (valid products)
  3. If not found → search fallback
       ↓
302 Redirect to:
  - https://www.doterra.com/US/en/site/jennawilliams1/p/{correct-slug}
  OR
  - https://www.doterra.com/US/en/site/jennawilliams1/search/...
```

## Regression Test Cases

| Test Case | Input Slug | Expected Output |
|-----------|-----------|-----------------|
| Valid oil (single word) | `lavender` | 302 → `/p/lavender-oil` |
| Valid oil (with -oil) | `peppermint-oil` | 302 → `/p/peppermint-oil` |
| Valid product | `copaiba-softgels` | 302 → `/p/copaiba-softgels` |
| Mapped product | `mito2max-energy-metabolism-complex` | 302 → `/p/supplements-mito-2-max` |
| Unknown product | `fake-product-123` | 302 → search page |
| Discontinued product | `on-guard-plus-softgels` | 302 → search page |
| Empty/invalid | ` ` | 302 → homepage |

## Success Criteria

✅ All product links in Home.jsx use `doterraGoUrl()`  
✅ All product links in HomeEssentials.jsx use `doterraGoUrl()`  
✅ Backend resolver returns 302 for all requests  
✅ No 404 errors when clicking product links  
✅ Discontinued products redirect to search (graceful degradation)  
✅ Valid products redirect to correct product pages  
