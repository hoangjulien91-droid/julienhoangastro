"use client";

import { Activity } from "lucide-react";

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
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-muted-foreground inline-flex items-center gap-1.5">
          <Activity className="size-3 text-emerald-500" />
          <span>Activité (90 derniers jours · Tous modules)</span>
        </span>
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
            title={`${c.key}${c.n ? " · " + c.n + " module(s)" : " · aucune activité"}`}
          />
        ))}
      </div>

      <div className="heat-legend flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
        <span>Moins</span>
        <span className="size-2.5 rounded-xs bg-muted/80 inline-block" />
        <span className="size-2.5 rounded-xs bg-emerald-500/40 inline-block" />
        <span className="size-2.5 rounded-xs bg-emerald-500 inline-block" />
        <span>Plus</span>
      </div>
    </div>
  );
}
