"use client";

import type { MindmapNodes } from "@/lib/pst/types";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface MindmapSvgGraphProps {
  nodes: MindmapNodes;
  keys: string[];
  current: string;
  neighbours: Set<string>;
  onSelectNode: (key: string) => void;
}

export function MindmapSvgGraph({
  nodes,
  keys,
  current,
  neighbours,
  onSelectNode,
}: MindmapSvgGraphProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none rounded-2xl bg-slate-950 p-2 sm:p-4 border border-slate-800 shadow-inner">
      <svg
        className="mm-graph min-w-[500px] sm:min-w-full block w-full h-[340px]"
        viewBox="0 0 760 560"
      >
        {/* Edge Connections with smooth styling */}
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
                stroke={hot ? "#38bdf8" : "#334155"}
                strokeWidth={hot ? "2.5" : "1.2"}
                strokeDasharray={hot ? "none" : "3,3"}
              />
            );
          }),
        )}

        {/* Nodes */}
        {keys.map((k) => {
          const n = nodes[k];
          if (!n) return null;
          const sel = k === current;
          const dim = !neighbours.has(k);
          return (
            <g
              key={k}
              className={`mm-node cursor-pointer transition-all duration-200${dim ? " mm-dim" : ""}`}
              onClick={() => {
                playClickSound();
                onSelectNode(k);
              }}
            >
              {sel && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={18}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  strokeDasharray="4,3"
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={sel ? 12 : 8}
                fill={`var(--${n.a})`}
                stroke={sel ? "#ffffff" : "#0f172a"}
                strokeWidth={sel ? 2.5 : 1.5}
              />
              <text
                x={n.x}
                y={n.y - 14}
                textAnchor="middle"
                fill={sel ? "#38bdf8" : "#cbd5e1"}
                fontSize={sel ? 12 : 10.5}
                fontWeight={sel ? 800 : 500}
              >
                {n.s}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
