import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Loading } from "../ui/Loading";

export function RequireBackOffice({ children }: { children: JSX.Element }) {
  const { ready, user, claims } = useAuth();
  const loc = useLocation();

  if (!ready) return <Loading label="Checking access…" />;
  if (!user) return <Navigate to="/" replace state={{ from: loc.pathname }} />;

  const allowed = Boolean(claims?.backoffice_access);
  if (!allowed) return <Navigate to="/" replace />;

  return children;
}
