import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../auth/AuthProvider";

type NavItem = {
  id: string;
  label: string;
  order: number;
  tierMin: number;
  published: boolean;
};

export function BackOfficeNav() {
  const { claims } = useAuth();
  const tier = claims?.tier ?? 0;

  const [items, setItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "nav"),
      where("published", "==", true),
      orderBy("order", "asc")
    );

    return onSnapshot(q, (snap) => {
      const rows: NavItem[] = [];
      snap.forEach((d) => rows.push({ id: d.id, ...(d.data() as any) }));
      setItems(rows.filter((x) => (x.tierMin ?? 0) <= tier));
    });
  }, [tier]);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Link to="/BackOffice/library">Content Library</Link>
      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>Curriculum</div>
      {items.map((it) => (
        <div key={it.id} style={{ opacity: 0.9 }}>
          {it.label}
        </div>
      ))}
    </div>
  );
}
