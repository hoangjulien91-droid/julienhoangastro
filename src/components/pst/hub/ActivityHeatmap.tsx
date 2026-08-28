"use client";

const dayStr = (d: Date) => d.toISOString().slice(0, 10);

export function ActivityHeatmap({
  activeDays,
}: {
  activeDays: Record<string, number>;
}) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 89);

  const cells = Array.from({ length: 90 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const key = dayStr(d);
    const n = activeDays[key] || 0;
    const lvl = n === 0 ? "" : n === 1 ? "l2" : n === 2 ? "l3" : "l4";
    return { key, n, lvl };
  });

  return (
    <div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "var(--muted)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 6,
        }}
      >
        Activité (90 derniers jours, tous modules)
      </div>
      <div
        className="heat"
        id="heat"
        aria-label="Carte d'activité des 90 derniers jours"
      >
        {cells.map((c) => (
          <i
            key={c.key}
            className={c.lvl}
            title={`${c.key}${c.n ? " · " + c.n + " module(s)" : " · rien"}`}
          />
        ))}
      </div>
      <div className="heat-legend">
        Moins
        <i
          style={{
            width: 12,
            height: 12,
            borderRadius: 3,
            background: "var(--line)",
            display: "inline-block",
          }}
        />
        <i
          style={{
            width: 12,
            height: 12,
            borderRadius: 3,
            background: "#7fb295",
            display: "inline-block",
          }}
        />
        <i
          style={{
            width: 12,
            height: 12,
            borderRadius: 3,
            background: "var(--good)",
            display: "inline-block",
          }}
        />
        Plus
      </div>
    </div>
  );
}
