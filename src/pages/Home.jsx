import React from "react";

export default function Home() {
  return (
    <div style={{ 
      height: "100vh", 
      background: "radial-gradient(ellipse at center, #23110d 0%, #120806 50%, #070403 100%)",
      color: "#F5DEB3",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Cinzel Decorative', serif"
    }}>
      <h1 style={{ fontSize: "60px" }}>iTerra™</h1>
      <p style={{ fontSize: "24px", color: "#E6B7A5" }}>Wellness Concierge</p>
      <p style={{ color: "red", fontSize: "30px", marginTop: "40px" }}>TEST RENDER - if you see this, code is working</p>
    </div>
  );
}
