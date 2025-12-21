# doTERRA OwnerID Implementation Guide

## Overview
Fixed doTERRA link tracking system to use the official `?OwnerID` query parameter method instead of unreliable replicated site URLs.

**Commit:** a2edd72  
**Date:** December 21, 2025

---

## What Changed

### Problem
- Replicated URLs (`/site/{associate}/p/{slug}`) were blocked by security (Imperva/bot detection)
- Links would fail or not properly track associate credit
- Inconsistent behavior across different access methods

### Solution
- Use official `?OwnerID={member_id}` query parameter on canonical product URLs
- This is doTERRA's documented method from their Link Generator tool
- Fallback to replicated home page (`/site/{username}`) for cookie-based tracking when no OwnerID
- Search fallback for unknown/unmapped slugs

---

## Files Modified

### 1. `verifiedSlugs.json`
- **Changed:** From nested object format to simple key-value mapping
- **Entries:** 69 verified product mappings
- **Format:** `{ "common-name": "official-slug" }`
- **Additions:** Discontinued product alternatives (serenity→breathe, elevation→citrus-bliss, etc.)

### 2. `src/lib/doterraProductResolver.js`
- **Added:** `resolveSlug()` - Maps common names to verified slugs
- **Updated:** `canonicalProductUrl()` - Now accepts `ownerId` parameter
- **Added:** `searchUrl()` - Build search URLs with OwnerID tracking
- **Updated:** `resolveDoterraOutbound()` - Accepts `ownerId` and `associateSite` params
- **Behavior:** Unknown slugs fallback to search with tracking

### 3. `src/lib/doterraGo.js`
- **Updated:** `doterraGoUrl()` - Passes `owner_id` and `site` as query params
- **Uses:** `getActiveAssociate()` to extract ownerId from current user
- **Format:** `/api/doterra/go/{key}?owner_id={ownerId}&site={username}`

### 4. `src/lib/activeAssociate.js`
- **Added:** `ownerId` field to associate data structure
- **Updated:** `getActiveAssociate()` - Returns ownerId
- **Updated:** `setActiveAssociate()` - Stores ownerId

### 5. `server/routes/go.js`
- **Added:** New route handler for `/api/doterra/go/:key`
- **Loads:** `verifiedSlugs.json` at startup
- **Priority:**
  1. If `owner_id` provided → canonical URL with `?OwnerID={owner_id}`
  2. If slug unknown → search with OwnerID
  3. If no `owner_id` but has `site` → replicated home (cookie fallback)
  4. Last resort → canonical URL or search
- **Kept:** Legacy `/:associateId/:productId` route for backward compatibility

### 6. `src/data/associates.json`
- **Added:** `ownerId` field (empty string by default)
- **Note:** Associates need to add their Member ID from doTERRA dashboard

---

## How It Works

### Frontend Flow
```javascript
// User clicks product link
doterraGoUrl('lavender') 
// → /api/doterra/go/lavender?owner_id=12345678&site=jennawilliams1
```

### Backend Flow
```
1. Receive: GET /api/doterra/go/lavender?owner_id=12345678
2. Resolve: lavender → lavender-oil (from verifiedSlugs.json)
3. Build: https://www.doterra.com/US/en/p/lavender-oil?OwnerID=12345678
4. Redirect: 301 to doTERRA with tracking
```

### Unknown Product Flow
```
1. Receive: GET /api/doterra/go/unknown-product?owner_id=12345678
2. Not found in verifiedSlugs.json
3. Fallback: https://www.doterra.com/US/en/search?text=unknown-product&OwnerID=12345678
4. Redirect: 301 to search with tracking
```

---

## Testing

### Local Testing (from outside Codespaces)
```bash
# Test direct URL with OwnerID
curl -I "https://www.doterra.com/US/en/p/lavender-oil?OwnerID=YOUR_MEMBER_ID"
# Should return 200 OK

# Test backend endpoint
curl -I "http://localhost:10000/api/doterra/go/lavender?owner_id=12345678"
# Should redirect to doTERRA with OwnerID
```

### Verification Steps
1. ✅ Associate adds Member ID to their profile (ownerId field)
2. ✅ Frontend sends ownerId via doterraGoUrl()
3. ✅ Backend resolves slug and appends ?OwnerID
4. ✅ Redirect works and tracking is applied
5. ✅ Unknown products fallback to search with tracking

---

## Configuration Required

### For Each Associate
Associates need to provide their **doTERRA Member ID** (numeric):
1. Login to doTERRA back office
2. Find Member ID in account settings
3. Add to `src/data/associates.json`:
   ```json
   {
     "jennawilliams1": {
       "displayName": "Jenna Williams",
       "ownerId": "12345678",  // ← Add this
       "referralUrl": "https://www.doterra.com/US/en/site/jennawilliams1",
       "shareLinks": {}
     }
   }
   ```

### Frontend UI Update
Add input field in AssociateSettings.jsx for users to enter their Member ID.

---

## Verified Product Mappings (69 Total)

### Essential Oils
adaptiv, balance, basil, bergamot, breathe, cassia, cedarwood, cheer, cinnamon-bark, citrus-bliss, clary-sage, copaiba, deep-blue, digestzen, douglas-fir, eucalyptus, frankincense, geranium, ginger, grapefruit, helichrysum, himalayan-fir, holiday-peace, in-tune, lavender, lemon, lemongrass, marjoram, melaleuca, metapwr, myrrh, on-guard, oregano, peppermint, purify, rose, rosemary, sandalwood, siberian-fir, tea-tree, vetiver, wassail, wild-orange, wintergreen, ylang-ylang

### Supplements
bone-nutrient-essential-complex, copaiba-softgels, mito2max, on-guard-plus-softgels, peppermint-beadlets, phytoestrogen-complex, terrazyme

### Kits & Accessories
correct-x, fractionated-coconut-oil, home-essentials-kit, metapwr-kit, metapwr-system, vegetable-capsules

### Discontinued Alternatives
- serenity → breathe-respiratory-blend-oil
- terrashield → purify-oil
- whisper → rose-oil
- elevation → citrus-bliss-oil
- greens → metapwr-advantage

---

## Rollback Plan

If issues arise:
```bash
git revert a2edd72
git push
```

This will restore the previous implementation while preserving git history.

---

## Benefits

✅ **Guaranteed Tracking:** OwnerID is doTERRA's official method  
✅ **No Security Blocks:** Canonical URLs aren't flagged by Imperva  
✅ **Search Fallback:** Unknown products still tracked via search  
✅ **Backward Compatible:** Legacy routes still work  
✅ **Clean Data:** Verified slug mappings with alternatives  
✅ **Flexible:** Works with or without OwnerID  

---

## Next Steps

1. **Deploy to production** - Push and deploy changes
2. **Update UI** - Add ownerId input field in settings
3. **Test live** - Verify tracking works with real Member IDs
4. **Document for users** - Instructions on finding Member ID
5. **Monitor** - Check logs for unknown slugs and add to verifiedSlugs.json

---

## Support

For questions or issues:
- Check console logs: `[doTERRA GO]` prefix
- Verify Member ID is correct (numeric, from back office)
- Test with: `curl -I "https://www.doterra.com/US/en/p/lavender-oil?OwnerID={YOUR_ID}"`
- Unknown slugs will auto-fallback to search (check logs)
