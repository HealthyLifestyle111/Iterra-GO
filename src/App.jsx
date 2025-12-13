import React from "react";

export default function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#ffffff",
        color: "#111827",
      }}
    >
      <section style={{ maxWidth: 720, width: "100%" }}>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>
          Iterra-GO
        </h1>

        <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.5, marginBottom: 0 }}>
          ✅ Your React app is rendering on Render.
        </p>

        <div
          style={{
            marginTop: 18,
            padding: 16,
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            background: "#f9fafb",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>What this means</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>JS bundle is loading</li>
            <li>React is in scope (no “React is not defined”)</li>
            <li>Render is serving the correct build</li>
          </ul>
        </div>
      </section>
    </main>
  );
}


