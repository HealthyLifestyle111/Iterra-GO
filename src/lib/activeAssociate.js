// src/lib/activeAssociate.js
const KEY = "iterra_active_associate_v1";
const DEFAULT = { id: "jennawilliams1", referralUrl: "", shareLinks: {} };

function getStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getActiveAssociate() {
  const storage = getStorage();
  if (!storage) return DEFAULT;

  try {
    const raw = storage.getItem(KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw);

    return {
      id: String(parsed?.id || DEFAULT.id).trim() || DEFAULT.id,
      ownerId: String(parsed?.ownerId || "").trim(),
      referralUrl: String(parsed?.referralUrl || "").trim(),
      shareLinks: parsed?.shareLinks || {},
    };
  } catch {
    return DEFAULT;
  }
}

export function setActiveAssociate(associate) {
  const storage = getStorage();
  const cleaned = {
    id: String(associate?.id || DEFAULT.id).trim() || DEFAULT.id,
    ownerId: String(associate?.ownerId || "").trim(),
    referralUrl: String(associate?.referralUrl || "").trim(),
    shareLinks: associate?.shareLinks || {},
  };

  if (storage) {
    try {
      storage.setItem(KEY, JSON.stringify(cleaned));
    } catch {}
  }
  return cleaned;
}

export function clearActiveAssociate() {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(KEY);
  } catch {}
}
