import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import { RequireBackOffice } from "./auth/RequireBackOffice";
import BackOffice from "./backoffice/BackOffice";

function Home() {
  const { user, claims, login, logout } = useAuth();

  return (
    <div style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900 }}>
      <h1 style={{ margin: 0 }}>Home</h1>
      <p style={{ opacity: 0.8 }}>
        This app protects <code>/BackOffice</code> using Firebase custom claims.
      </p>

      {user ? (
        <>
          <div style={{ marginBottom: 12 }}>
            Signed in as <b>{user.email}</b>
          </div>
          <div style={{ marginBottom: 12, opacity: 0.85 }}>
            Claims: <code>{JSON.stringify(claims)}</code>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link to="/BackOffice">Go to Back Office</Link>
            <button onClick={logout}>Logout</button>
          </div>
        </>
      ) : (
        <LoginForm onLogin={login} />
      )}
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const email = String(fd.get("email") || "");
        const password = String(fd.get("password") || "");
        await onLogin(email, password);
      }}
      style={{ display: "grid", gap: 10, maxWidth: 380 }}
    >
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" type="password" />
      <button type="submit">Login</button>
      <div style={{ fontSize: 12, opacity: 0.7 }}>
        Create users in Firebase Auth, then assign claims using the Cloud Function below.
      </div>
    </form>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/BackOffice/*"
        element={
          <RequireBackOffice>
            <BackOffice />
          </RequireBackOffice>
        }
      />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
