"use client";

import { useMemo, useState } from "react";
import type { MindmapNodes } from "@/lib/pst/types";

interface MindmapProps {
  nodes: MindmapNodes;
  hint: string;
  defaultKey?: string;
}

export function Mindmap({ nodes, hint, defaultKey }: MindmapProps) {
  const keys = useMemo(() => Object.keys(nodes), [nodes]);
  const [current, setCurrent] = useState<string>(defaultKey ?? keys[0] ?? "");

  const node = nodes[current];

  const neighbours = useMemo(() => {
    const set = new Set<string>([current]);
    node?.links.forEach((l) => set.add(l.to));
    keys.forEach((k) => {
      nodes[k]?.links.forEach((l) => {
        if (l.to === current) set.add(k);
      });
    });
    return set;
  }, [current, keys, node, nodes]);

  if (!node) return null;

  const incoming = keys.filter((k) =>
    nodes[k]?.links.some((l) => l.to === current),
  );

  return (
    <div>
      <p className="hint">{hint}</p>
      <div className="chips" style={{ marginBottom: 14 }}>
        {keys.map((k) => (
          <button
            key={k}
            className={`chip${k === current ? " active" : ""}`}
            onClick={() => setCurrent(k)}
          >
            {nodes[k]?.s}
          </button>
        ))}
      </div>
      <div id="mindmapHost">
        <svg
          className="mm-graph"
          viewBox="0 0 760 560"
          style={{ display: "block", width: "100%", height: 320 }}
        >
          {keys.map((k) =>
            nodes[k]?.links.map((l, li) => {
              const a = nodes[k];
              const b = nodes[l.to];
              if (!a || !b) return null;
              const hot = k === current || l.to === current;
              return (
                <line
                  key={`${k}-${li}`}
                  className={`mm-edge${hot ? " hot" : ""}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                />
              );
            }),
          )}
          {keys.map((k) => {
            const n = nodes[k];
            if (!n) return null;
            const sel = k === current;
            const dim = !neighbours.has(k);
            return (
              <g
                key={k}
                className={`mm-node${dim ? " mm-dim" : ""}`}
                onClick={() => setCurrent(k)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={sel ? 12 : 8}
                  fill={`var(--${n.a})`}
                  stroke="#fff"
                  strokeWidth={2}
                />
                <text
                  x={n.x}
                  y={n.y - 14}
                  textAnchor="middle"
                  fontWeight={sel ? 700 : 500}
                >
                  {n.s}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          className="schema"
          style={{ borderLeft: `4px solid var(--${node.a})`, marginTop: 14 }}
        >
          <div
            style={{
              fontWeight: 700,
              color: `var(--${node.a})`,
              fontSize: 16,
              marginBottom: 6,
            }}
          >
            {node.label}
          </div>
          <p style={{ fontSize: 13.5, margin: "0 0 10px" }}>
            Catégorie : <b>{node.a}</b>
          </p>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 6,
            }}
          >
            Relations :
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {node.links.map((l, li) => {
              const target = nodes[l.to];
              if (!target) return null;
              return (
                <div
                  key={li}
                  style={{
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>{l.rel}</span>
                  <button
                    className="chip"
                    style={{
                      borderColor: `var(--${target.a})`,
                      color: `var(--${target.a})`,
                    }}
                    onClick={() => setCurrent(l.to)}
                  >
                    {target.label} ➔
                  </button>
                </div>
              );
            })}
          </div>
          {incoming.length > 0 && (
            <>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  margin: "10px 0 6px",
                }}
              >
                Flèches arrivantes :
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {incoming.map((k) => {
                  const inNode = nodes[k];
                  if (!inNode) return null;
                  return (
                    <button
                      key={k}
                      className="chip"
                      style={{
                        borderColor: `var(--${inNode.a})`,
                        color: `var(--${inNode.a})`,
                      }}
                      onClick={() => setCurrent(k)}
                    >
                      ➔ {inNode.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
