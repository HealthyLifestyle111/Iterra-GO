import React from "react";
import { foundationalResources } from "../data/foundations";

export default function FoundationsContent() {
  return (
    <section style={{ display: "flex", flexWrap: "wrap", gap: 32, margin: "32px 0" }}>
      {Object.entries(foundationalResources).map(([key, block]) => (
        <div
          key={key}
          style={{
            flex: "1 1 320px",
            minWidth: 280,
            maxWidth: 400,
            background: "#fffbe8",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            padding: 24,
            marginBottom: 24,
            border: "1px solid #f5e6b7",
          }}
        >
          <h2 style={{ fontSize: 20, color: "#bfa77a", marginBottom: 8 }}>{block.title || key}</h2>
          {block.range && (
            <div style={{ fontSize: 14, color: "#a88c5f", marginBottom: 8 }}>
              <strong>Range:</strong> {block.range}
            </div>
          )}
          {block.focus && (
            <div style={{ fontSize: 14, color: "#a88c5f", marginBottom: 8 }}>
              <strong>Focus:</strong> {block.focus}
            </div>
          )}
          {block.products && block.products.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <strong>Products:</strong>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {block.products.map((prod, i) => (
                  <li key={prod.slug || i} style={{ fontSize: 14, color: "#6b4e1e" }}>
                    {prod.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
