// src/lib/activeAssociate.js
const KEY = "iterra_active_associate_v1";

export function getActiveAssociate() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // Default fallback (keeps current behavior)
  return { id: "jennawilliams1", referralUrl: "", shareLinks: {} };
}

export function setActiveAssociate(associate) {
  const cleaned = {
    id: String(associate?.id || "").trim() || "jennawilliams1",
    referralUrl: String(associate?.referralUrl || "").trim(),
    shareLinks: associate?.shareLinks || {},
  };
  localStorage.setItem(KEY, JSON.stringify(cleaned));
  return cleaned;
}
