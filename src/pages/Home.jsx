import React from "react";

export default function Home() {
  return (
    <div style={{
      height: "100vh",
      background: "radial-gradient(ellipse at center, #23110d 0%, #120806 50%, #070403 100%)",
      color: "#F5DEB3",
      fontFamily: "'Cinzel Decorative', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{ fontSize: "80px" }}>iTerra™</h1>
      <p style={{ fontSize: "30px", color: "#E6B7A5" }}>Wellness Concierge</p>
      <p style={{ color: "lime", fontSize: "40px", marginTop: "50px" }}>DEPLOY SUCCESS</p>
    </div>
  );
}
