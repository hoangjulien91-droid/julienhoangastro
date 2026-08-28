"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { INDEX, MODULES } from "@/lib/pst/hub-stats";
import { PONTS } from "@/lib/pst/data/ponts";

const CONCEPT_Y = 240;

export function ConceptGraphSvg() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  const order = useMemo(() => MODULES.map((m) => m.id), []);
  const mx = useMemo(() => {
    const map: Record<string, number> = {};
    order.forEach((id, i) => {
      map[id] = 60 + i * ((760 - 120) / (order.length - 1));
    });
    return map;
  }, [order]);

  const concept = PONTS[selected];
  const linkedIds = concept
    ? Object.keys(concept.m).filter((k) => mx[k] != null)
    : [];
  const cx = linkedIds.length
    ? linkedIds.reduce((s, k) => s + (mx[k] ?? 0), 0) / linkedIds.length
    : 380;

  return (
    <div className="card graph">
      <p style={{ margin: "0 0 6px", fontSize: 13, color: "var(--muted)" }}>
        Clique un concept pour voir dans quels modules il circule (et avec quel
        angle).
      </p>
      <svg
        id="gsvg"
        viewBox="0 0 760 300"
        role="img"
        aria-label="Graphe des concepts partagés"
      >
        {order.map((id) => (
          <g
            className="gnode"
            key={id}
            onClick={() => router.push(`/${id}/`)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={mx[id]}
              cy={58}
              r={22}
              fill={INDEX.modules[id]?.accent}
            />
            <text x={mx[id]} y={92} textAnchor="middle">
              {id.toUpperCase()}
            </text>
          </g>
        ))}
        <g id="gedges">
          {concept &&
            linkedIds.map((k) => {
              const label = concept.m[k] ?? "";
              const short =
                label.length > 26 ? label.slice(0, 24) + "…" : label;
              return (
                <g key={k}>
                  <line
                    className="gedge on"
                    x1={cx}
                    y1={CONCEPT_Y}
                    x2={mx[k]}
                    y2={58}
                  />
                  <text
                    x={(cx + (mx[k] ?? 0)) / 2}
                    y={(CONCEPT_Y + 58) / 2 - 4}
                    textAnchor="middle"
                    style={{ fontSize: 9.5, fill: "var(--muted)" }}
                  >
                    {short}
                  </text>
                </g>
              );
            })}
        </g>
        <circle id="gccirc" cx={cx} cy={CONCEPT_Y} r={9} fill="var(--ink)" />
        <text
          id="gctext"
          x={cx}
          y={CONCEPT_Y + 26}
          textAnchor="middle"
          style={{ fontSize: 12, fontWeight: 700, fill: "var(--ink)" }}
        >
          {concept ? concept.c : "Choisis un concept"}
        </text>
      </svg>
      <div className="gconcepts" id="gconcepts">
        {PONTS.map((p, i) => (
          <button
            key={p.c}
            className="chip"
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
          >
            {p.c}
          </button>
        ))}
      </div>
    </div>
  );
}
