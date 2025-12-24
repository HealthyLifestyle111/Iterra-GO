import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User, onAuthStateChanged, getIdTokenResult, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

type Claims = {
  backoffice_access?: boolean;
  role?: "associate" | "manager" | "admin";
  tier?: number;
};

type AuthState = {
  user: User | null;
  claims: Claims | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshClaims: () => Promise<void>;
};

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<Claims | null>(null);
  const [ready, setReady] = useState(false);

  async function loadClaims(u: User) {
    // Force refresh occasionally if you’re changing claims
    const token = await getIdTokenResult(u, true);
    setClaims((token.claims || {}) as Claims);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) await loadClaims(u);
      else setClaims(null);
      setReady(true);
    });
    return () => unsub();
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      claims,
      ready,
      login: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
      },
      logout: async () => {
        await signOut(auth);
      },
      refreshClaims: async () => {
        if (!auth.currentUser) return;
        await loadClaims(auth.currentUser);
      },
    }),
    [user, claims, ready]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
