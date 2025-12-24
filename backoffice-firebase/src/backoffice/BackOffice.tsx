import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { BackOfficeNav } from "./BackOfficeNav";
import { ContentList } from "./ContentList";
import { ContentStudio } from "./ContentStudio";

export default function BackOffice() {
  const { claims, logout } = useAuth();
  const tier = claims?.tier ?? 0;
  const role = claims?.role ?? "associate";

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 16,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            ← Home
          </Link>
          <b>Back Office</b>
          <span style={{ opacity: 0.7 }}>Tier: {tier}</span>
          <span style={{ opacity: 0.7 }}>Role: {role}</span>
        </div>
        <button onClick={logout}>Logout</button>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "calc(100vh - 58px)" }}>
        <aside style={{ borderRight: "1px solid rgba(0,0,0,0.1)", padding: 12 }}>
          <BackOfficeNav />
          {role === "admin" && (
            <div style={{ marginTop: 16 }}>
              <Link to="/BackOffice/studio">Content Studio</Link>
            </div>
          )}
        </aside>

        <main style={{ padding: 16 }}>
          <Routes>
            <Route path="/" element={<Navigate to="library" replace />} />
            <Route path="library" element={<ContentList />} />
            <Route path="studio" element={role === "admin" ? <ContentStudio /> : <div>Admin only.</div>} />
            <Route path="*" element={<div>Not found.</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
