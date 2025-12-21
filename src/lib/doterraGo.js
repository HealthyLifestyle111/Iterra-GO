// src/lib/doterraGo.js

import { getActiveAssociate } from "./activeAssociate";

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export function doterraGoUrl(key) {
  if (typeof window === 'undefined') {
    // SSR fallback
    return `${API_BASE}/api/doterra/go/${encodeURIComponent(key || '')}`;
  }
  
  const { ownerId } = getActiveAssociate();
  const qp = ownerId ? `?ownerId=${encodeURIComponent(ownerId)}` : "";
  return `${API_BASE}/api/doterra/go/${encodeURIComponent(key || '')}${qp}`;
}
