import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

type ContentUnit = {
  id: string;
  title: string;
  body: string;
  tierMin: number;
  published: boolean;
};

export function ContentStudio() {
  const [units, setUnits] = useState<ContentUnit[]>([]);
  const [title, setTitle] = useState("");
  const [tierMin, setTierMin] = useState(0);
  const [body, setBody] = useState("");

  useEffect(() => {
    const q = query(collection(db, "contentUnits"), orderBy("updatedAt", "desc"));
    return onSnapshot(q, (snap) => {
      const rows: ContentUnit[] = [];
      snap.forEach((d) => rows.push({ id: d.id, ...(d.data() as any) }));
      setUnits(rows);
    });
  }, []);

  async function create() {
    if (!title.trim()) return alert("Title required.");
    await addDoc(collection(db, "contentUnits"), {
      title: title.trim(),
      tierMin: Number(tierMin) || 0,
      body: body ?? "",
      published: false,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
    setTitle("");
    setTierMin(0);
    setBody("");
  }

  async function togglePublish(u: ContentUnit) {
    await updateDoc(doc(db, "contentUnits", u.id), {
      published: !u.published,
      updatedAt: serverTimestamp(),
    });
  }

  return (
    <div style={{ maxWidth: 980 }}>
      <h2 style={{ marginTop: 0 }}>Content Studio</h2>

      <div style={{ display: "grid", gap: 10, padding: 12, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8 }}>
        <div style={{ fontWeight: 700 }}>Create new content</div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input
          value={tierMin}
          onChange={(e) => setTierMin(Number(e.target.value))}
          type="number"
          placeholder="Tier min"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body (plain text for now — you can upgrade to rich text later)"
          rows={8}
        />
        <button onClick={create}>Create Draft</button>
      </div>

      <h3>All content</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {units.map((u) => (
          <div key={u.id} style={{ padding: 12, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{u.title}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  Tier ≥ {u.tierMin ?? 0} · {u.published ? "Published" : "Draft"}
                </div>
              </div>
              <button onClick={() => togglePublish(u)}>{u.published ? "Unpublish" : "Publish"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
