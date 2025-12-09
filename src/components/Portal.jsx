// components/Portal.jsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Defensive Portal:
 * - ensures a DOM node exists synchronously
 * - wraps non-element children in a <div> to avoid createPortal issues
 * - try/catches createPortal to avoid crashing the app during render
 */
export default function Portal({ children, id = "modal-root" }) {
  const elRef = useRef(null);

  // Synchronously ensure a DOM node reference (so first render is stable)
  if (typeof window !== "undefined" && !elRef.current) {
    const existing = document.getElementById(id);
    elRef.current = existing || document.createElement("div");
    if (!existing) elRef.current.id = id;
  }

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    // append if not already in DOM
    if (!document.getElementById(id)) {
      try {
        document.body.appendChild(el);
      } catch (err) {
        // If append fails, log and continue — fallback will cause portal to be null
        // but we avoid throwing.
        // eslint-disable-next-line no-console
        console.error("Portal: appendChild failed", err);
      }
    }
    // Intentionally do not remove the node on unmount to keep a stable root
  }, [id]);

  if (!elRef.current) {
    // eslint-disable-next-line no-console
    console.warn("Portal: no container element available");
    return null;
  }

  // If children are not valid React nodes (rare), wrap them in a div
  let safeChildren = children;
  // React.isValidElement returns false for arrays of nodes; arrays are fine.
  // But extra defensive check: if children is a primitive like number/string, wrap too.
  const isPrimitive = (c) => typeof c === "string" || typeof c === "number" || typeof c === "boolean";
  if (isPrimitive(children)) safeChildren = <div>{children}</div>;

  try {
    return createPortal(safeChildren, elRef.current);
  } catch (err) {
    // Catch portal errors to prevent white screen — surface them in console
    // eslint-disable-next-line no-console
    console.error("Portal.createPortal error:", err);
    return null;
  }
}