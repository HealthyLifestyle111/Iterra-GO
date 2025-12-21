// src/lib/doterraGo.js

import { getActiveAssociate } from "./activeAssociate";

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

/**
 * Generate a doTERRA product URL via backend resolver
 * @param {string} key - Product slug or key
 * @returns {string} - Backend redirect URL with OwnerID tracking
 */
export function doterraGoUrl(key) {
  if (typeof window === 'undefined') {
    // SSR fallback
    return `${API_BASE}/api/doterra/go/${encodeURIComponent(key || '')}`;
  }
  
  const { ownerId, id } = getActiveAssociate();
  const params = new URLSearchParams();
  
  if (ownerId) params.append('owner_id', ownerId);
  if (id && !ownerId) params.append('site', id); // Fallback to site username
  
  const queryString = params.toString();
  return `${API_BASE}/api/doterra/go/${encodeURIComponent(key || '')}${queryString ? '?' + queryString : ''}`;
}
