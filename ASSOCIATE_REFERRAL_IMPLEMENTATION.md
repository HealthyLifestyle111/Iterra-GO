# Associate Referral System - Implementation Guide

## ✅ What's Been Created

All core infrastructure is now in place:

1. **Product Catalog** - [src/data/products.json](src/data/products.json)
   - Canonical URLs for all products (no more /site/ paths)
   - Easily expandable - add new products here

2. **Associate Database** - [src/data/associates.json](src/data/associates.json)
   - Store associate referral URLs and custom share links
   - Currently has jennawilliams1 as default

3. **Link Resolver** - [src/lib/resolveOutboundLink.js](src/lib/resolveOutboundLink.js)
   - Smart routing: credited links → redirect endpoint → canonical URLs
   - One function for ALL product links

4. **Redirect Route** - [server/routes/go.js](server/routes/go.js)
   - `/go/:associateId/:productId` endpoint
   - First-click referral activation pattern
   - Cookie-based tracking (30 days)
   - Installed cookie-parser dependency

5. **Server Integration** - Updated [server/server.js](server/server.js)
   - Mounted the /go router
   - Added cookie-parser middleware

---

## 🎯 Next Step: Membership Form Update

You need to capture the **referral URL** when someone creates an associate account.

### Where to Add This

**Find your membership signup/registration form.** Based on your codebase, this could be:

1. **In AssociateLogin.jsx** - If you have a "Create Account" flow
2. **In BackOffice.jsx** - If associates register through back office
3. **A separate signup page** - Check for any signup/registration components

### Required Form Field

Add this field to your membership form:

```jsx
<div>
  <label style={{
    display: "block",
    color: "var(--rosegold)",
    fontSize: 12,
    marginBottom: 6,
    fontWeight: 600
  }}>
    doTERRA Referral Link (Required) *
  </label>
  <Input
    type="url"
    required
    value={referralUrl}
    onChange={(e) => setReferralUrl(e.target.value)}
    placeholder="https://www.doterra.com/US/en/site/yourusername"
    style={{
      background: "rgba(245,222,179,0.04)",
      border: "1px solid rgba(245,222,179,0.12)",
      color: "var(--champagne)"
    }}
  />
  <p style={{
    fontSize: 11,
    color: "var(--rosegold)",
    opacity: 0.7,
    marginTop: 4
  }}>
    Paste your personal doTERRA referral link here
  </p>
</div>
```

### When Form is Submitted

Instead of hardcoding `SITE = "jennawilliams1"`, create a new associate record:

```javascript
const handleCreateAssociate = async (formData) => {
  const associateId = formData.username || formData.email.split('@')[0]; // or whatever they enter
  
  const newAssociate = {
    displayName: formData.fullName,
    referralUrl: formData.referralUrl, // THE CRITICAL FIELD
    shareLinks: {} // They can add custom links later
  };
  
  // Save to your database or update associates.json
  // Example API call:
  await fetch('/api/associates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: associateId,
      data: newAssociate
    })
  });
  
  // Store in local state/context
  setCurrentAssociate(associateId);
};
```

---

## 🔗 How to Use in Product Links

### React Components (Anywhere you show products)

```jsx
import { resolveOutboundLink } from '@/lib/resolveOutboundLink';
import products from '@/data/products.json';
import associates from '@/data/associates.json';

function ProductCard({ productId }) {
  const currentAssociate = associates['jennawilliams1']; // Or get from context/state
  
  return (
    <a 
      href={resolveOutboundLink({ 
        associate: currentAssociate, 
        productId, 
        products 
      })}
      target="_blank"
      rel="noopener noreferrer"
      className="product-link"
    >
      {products[productId].name}
    </a>
  );
}
```

### Example Usage in HomeEssentials.jsx

Replace this pattern:
```jsx
// ❌ OLD WAY
<a href={doterraGoUrl("lemon")} target="_blank">
  Lemon Essential Oil
</a>
```

With this:
```jsx
// ✅ NEW WAY
import { resolveOutboundLink } from '@/lib/resolveOutboundLink';
import products from '@/data/products.json';
import associates from '@/data/associates.json';

const associate = associates['jennawilliams1']; // or from context

<a 
  href={resolveOutboundLink({ 
    associate, 
    productId: 'lemon', 
    products 
  })}
  target="_blank"
  rel="noopener noreferrer"
>
  Lemon Essential Oil
</a>
```

---

## 🚀 How the System Works

### Flow Diagram

```
User clicks product link
         ↓
resolveOutboundLink() checks:
  1. Does associate have a credited shareLink for this product?
     → YES: Use that (best - already has attribution)
     → NO: Continue...
  2. Does associate exist with referralUrl?
     → YES: Use /go/:associateId/:productId
     → NO: Use canonical product URL
         ↓
If using /go route:
  1. Server checks activation cookie
     → First visit: Redirect to referralUrl (activates account)
     → Already activated: Redirect to canonical product URL
```

### First-Click Activation Pattern

**Why this works:**
- doTERRA tracks referrals when users visit the associate's site URL first
- After that initial activation, users can go directly to products
- Cookie persists for 30 days
- No complex tracking needed on your end

---

## 📝 Where's the Default SITE Set?

Currently hardcoded in two places:

1. **[src/lib/doterraLinks.js](src/lib/doterraLinks.js)** - Line 5:
   ```javascript
   const SITE = "jennawilliams1";
   ```

2. **[src/lib/doterraGo.js](src/lib/doterraGo.js)** - Line 22:
   ```javascript
   return "https://www.doterra.com/US/en/site/jennawilliams1";
   ```

### Migration Strategy

**Option 1: Context/State** (Recommended)
```jsx
// Create AssociateContext.jsx
import { createContext, useContext, useState } from 'react';
import associates from '@/data/associates.json';

const AssociateContext = createContext();

export function AssociateProvider({ children }) {
  const [currentAssociateId, setCurrentAssociateId] = useState('jennawilliams1');
  const currentAssociate = associates[currentAssociateId];
  
  return (
    <AssociateContext.Provider value={{ currentAssociate, setCurrentAssociateId }}>
      {children}
    </AssociateContext.Provider>
  );
}

export const useAssociate = () => useContext(AssociateContext);
```

**Option 2: URL Parameter**
```javascript
// Extract from URL: /products?associate=jennawilliams1
const params = new URLSearchParams(window.location.search);
const associateId = params.get('associate') || 'jennawilliams1';
const associate = associates[associateId];
```

---

## 🎨 Adding More Products

Edit [src/data/products.json](src/data/products.json):

```json
{
  "your-product-slug": {
    "name": "Display Name",
    "canonicalUrl": "https://www.doterra.com/US/en/p/exact-product-slug"
  }
}
```

**How to find canonical URLs:**
1. Go to doterra.com
2. Search for the product
3. Copy the /US/en/p/product-slug URL (NOT the /site/ version)

---

## 🔧 Adding Custom Share Links

If an associate has doTERRA Link Generator links, add them to their record:

```json
{
  "jennawilliams1": {
    "displayName": "Jenna Williams",
    "referralUrl": "https://www.doterra.com/US/en/site/jennawilliams1",
    "shareLinks": {
      "lemon": "https://www.doterra.com/link/ABC123",
      "lavender": "https://www.doterra.com/link/XYZ789"
    }
  }
}
```

The resolver will use these credited links first (best attribution).

---

## 🧪 Testing the System

### Test Activation Flow

1. Clear cookies
2. Click a product link: `/go/jennawilliams1/lemon`
3. Should redirect to: `https://www.doterra.com/US/en/site/jennawilliams1`
4. Go back and click again
5. Should now redirect to: `https://www.doterra.com/US/en/p/lemon-oil`

### Test Different Associates

```javascript
// Create a test associate
const associates = {
  "testuser": {
    "displayName": "Test User",
    "referralUrl": "https://www.doterra.com/US/en/site/testuser",
    "shareLinks": {}
  }
};

// Use in link
resolveOutboundLink({ 
  associate: associates.testuser, 
  productId: 'lavender', 
  products 
});
```

---

## 📦 API Endpoint for Dynamic Associates (Optional)

If you want to store associates in a database instead of JSON:

```javascript
// server/routes/associates.js
import express from 'express';
const router = express.Router();

router.post('/api/associates', async (req, res) => {
  const { id, data } = req.body;
  
  // Validate referralUrl
  if (!data.referralUrl || !data.referralUrl.includes('doterra.com')) {
    return res.status(400).json({ error: 'Valid doTERRA referral URL required' });
  }
  
  // Save to database
  await db.associates.create({ id, ...data });
  
  res.json({ success: true });
});

router.get('/api/associates/:id', async (req, res) => {
  const associate = await db.associates.findById(req.params.id);
  res.json(associate);
});

export default router;
```

---

## 🎯 Action Items

### IMMEDIATE (Stop the chaos):
1. ✅ Product catalog created
2. ✅ Link resolver created
3. ✅ Redirect endpoint created
4. ⏳ **Find your membership form**
5. ⏳ **Add referralUrl field**
6. ⏳ **Update form submission to create associate records**

### NEXT (Full migration):
7. Replace `doterraGoUrl()` calls with `resolveOutboundLink()`
8. Create AssociateContext for current associate state
9. Add associate selection UI (if multi-associate)
10. Test activation flow thoroughly

---

## 📞 Tell Me Where Your Form Is

Paste the code from:
- Where users sign up for membership
- Where `SITE = "jennawilliams1"` is set
- Where associates create accounts

I'll show you EXACTLY where to add the referralUrl field and how to wire it up.

The system is turnkey now — you just need to capture that ONE field during signup.
