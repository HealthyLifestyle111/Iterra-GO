export function Loading({ label = "Loading…" }: { label?: string }) {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <div style={{ opacity: 0.8 }}>{label}</div>
    </div>
  );
}
