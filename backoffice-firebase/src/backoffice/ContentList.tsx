import { collection, onSnapshot, orderBy, query, where, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../auth/AuthProvider";

type ContentUnit = {
  id: string;
  title: string;
  body: string;
  tierMin: number;
  published: boolean;
};

export function ContentList() {
  const { user, claims } = useAuth();
  const tier = claims?.tier ?? 0;

  const [units, setUnits] = useState<ContentUnit[]>([]);
  const [selected, setSelected] = useState<ContentUnit | null>(null);

  useEffect(() => {
    const q = query(collection(db, "contentUnits"), where("published", "==", true), orderBy("title", "asc"));
    return onSnapshot(q, (snap) => {
      const rows: ContentUnit[] = [];
      snap.forEach((d) => rows.push({ id: d.id, ...(d.data() as any) }));
      setUnits(rows.filter((x) => (x.tierMin ?? 0) <= tier));
    });
  }, [tier]);

  const canComplete = Boolean(user && selected);

  async function markComplete() {
    if (!user || !selected) return;
    const ref = doc(db, "progress", user.uid, "items", selected.id);
    await setDoc(
      ref,
      { status: "complete", completedAt: serverTimestamp() },
      { merge: true }
    );
    alert("Marked complete.");
  }

  const sorted = useMemo(() => units, [units]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16 }}>
      <section style={{ borderRight: "1px solid rgba(0,0,0,0.08)", paddingRight: 16 }}>
        <h2 style={{ marginTop: 0 }}>Library</h2>
        <div style={{ display: "grid", gap: 8 }}>
          {sorted.map((u) => (
            <button
              key={u.id}
              onClick={() => setSelected(u)}
              style={{
                textAlign: "left",
                padding: 10,
                border: "1px solid rgba(0,0,0,0.12)",
                background: selected?.id === u.id ? "rgba(0,0,0,0.04)" : "white",
                cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: 600 }}>{u.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Tier ≥ {u.tierMin ?? 0}</div>
            </button>
          ))}
        </div>
      </section>

      <section>
        {!selected ? (
          <div style={{ opacity: 0.7 }}>Select a lesson.</div>
        ) : (
          <>
            <h2 style={{ marginTop: 0 }}>{selected.title}</h2>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{selected.body}</div>
            <div style={{ marginTop: 16 }}>
              <button disabled={!canComplete} onClick={markComplete}>
                Mark Complete
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
