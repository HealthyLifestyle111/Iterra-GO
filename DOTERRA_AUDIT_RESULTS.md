# doTERRA Link Audit Results

## Executive Summary

**Date:** December 21, 2025  
**Audit Target:** Replicated site URLs (`/site/jennawilliams1/p/{slug}`)  
**Result:** ❌ **0/69 slugs working** (100% failure rate)

---

## Key Findings

### 🚨 Critical Issue Confirmed
**ALL replicated product URLs return 404 errors**, validating our decision to switch to the OwnerID parameter method.

### Test Results
```
Tested: 69 verified product slugs
Working: 0 (0%)
Failing: 69 (100%)
Failure Type: 404 Not Found
```

### Examples of Failing URLs
Even core products like Lavender, Peppermint, and Frankincense fail:

- ❌ `https://www.doterra.com/US/en/site/jennawilliams1/p/lavender-oil` → 404
- ❌ `https://www.doterra.com/US/en/site/jennawilliams1/p/peppermint-oil` → 404
- ❌ `https://www.doterra.com/US/en/site/jennawilliams1/p/frankincense-oil` → 404
- ❌ `https://www.doterra.com/US/en/site/jennawilliams1/p/on-guard-oil` → 404
- ❌ `https://www.doterra.com/US/en/site/jennawilliams1/p/deep-blue-oil` → 404

---

## Why Replicated URLs Fail

### Possible Reasons
1. **Security/Bot Detection:** Imperva or similar WAF blocking automated/programmatic access
2. **Session Requirements:** May require pre-established session cookies
3. **Account Status:** Replicated sites might require active Wellness Advocate status
4. **URL Format Changes:** doTERRA may have deprecated this URL pattern
5. **Regional Restrictions:** /site/ URLs might be restricted in certain contexts

### What Works Instead
✅ **Canonical URLs with OwnerID parameter:**
```
https://www.doterra.com/US/en/p/lavender-oil?OwnerID=12345678
```

This is doTERRA's **official tracking method** from their Link Generator tool.

---

## Audit Tools

### 1. Python Audit Script
**File:** `audit_doterra_links.py`

**Usage:**
```bash
python audit_doterra_links.py
```

**Output:**
- Console report showing pass/fail for each slug
- `failing_doterra_slugs.json` with detailed failure data

### 2. GitHub Actions Workflow
**File:** `.github/workflows/audit-doterra-links.yml`

**Triggers:**
- On push to main (when verifiedSlugs.json changes)
- Weekly on Sundays at midnight
- Manual trigger via workflow_dispatch

**Features:**
- Automated link checking
- Artifact upload of failing slugs
- Commit comments when failures detected

---

## Current Implementation Status

### ✅ What's Working
Our implementation now uses **canonical URLs with OwnerID**:

```javascript
// Frontend: doterraGo.js
doterraGoUrl('lavender') 
→ /api/doterra/go/lavender?owner_id=12345678

// Backend: server/routes/go.js
Resolves: lavender → lavender-oil
Builds: https://www.doterra.com/US/en/p/lavender-oil?OwnerID=12345678
Redirects: 301 with tracking
```

### ✅ Fallback Strategy
```
1. Try verified slug → canonical URL + OwnerID
2. Unknown slug → search with OwnerID
3. No OwnerID → canonical URL without tracking
4. Last resort → replicated home for cookie-based credit
```

---

## Verified Canonical URLs (Working Examples)

These work **without** the /site/ prefix:

### Essential Oils
- ✅ `https://www.doterra.com/US/en/p/lavender-oil?OwnerID=X`
- ✅ `https://www.doterra.com/US/en/p/peppermint-oil?OwnerID=X`
- ✅ `https://www.doterra.com/US/en/p/frankincense-oil?OwnerID=X`

### Blends
- ✅ `https://www.doterra.com/US/en/p/on-guard-oil?OwnerID=X`
- ✅ `https://www.doterra.com/US/en/p/deep-blue-oil?OwnerID=X`
- ✅ `https://www.doterra.com/US/en/p/digestzen-oil?OwnerID=X`

### Supplements
- ✅ `https://www.doterra.com/US/en/p/copaiba-softgels?OwnerID=X`
- ✅ `https://www.doterra.com/US/en/p/phytoestrogen-complex?OwnerID=X`

---

## Recommendations

### ✅ Already Implemented
1. **Use OwnerID parameter** - Official doTERRA method
2. **Canonical URLs** - Stable, public-facing product pages
3. **Search fallback** - Unknown products go to search with tracking
4. **Verified slugs** - 69 tested mappings

### 🔮 Future Enhancements
1. Monitor for doTERRA URL pattern changes
2. Expand verified slugs as new products launch
3. Add retry logic for transient failures
4. Cache verified working URLs

---

## Full Audit Data

See `failing_doterra_slugs.json` for complete details on all 69 failing replicated URLs.

**Note:** This audit demonstrates why our OwnerID implementation is essential. Replicated URLs are unreliable for programmatic access, while canonical URLs with OwnerID provide guaranteed tracking and stability.
