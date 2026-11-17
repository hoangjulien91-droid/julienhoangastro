"use client";

import { useMemo, useState } from "react";
import type { MindmapNodes } from "@/lib/pst/types";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { SvgFullScreenViewer } from "@/components/pst/visuals/SvgFullScreenViewer";
import { findSchemaForNode } from "@/lib/pst/data/mindmap-schema-matcher";
import { MindmapSvgGraph } from "./mindmap/MindmapSvgGraph";
import { MindmapNodeInspector } from "./mindmap/MindmapNodeInspector";

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

  const matchedSchema = findSchemaForNode(node.label, node.a);

  return (
    <div className="space-y-4">
      <p className="hint m-0">{hint}</p>

      {/* Chips Filter Row */}
      <div className="chips flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1.5 scrollbar-none">
        {keys.map((k) => (
          <button
            key={k}
            className={`chip shrink-0${k === current ? " active" : ""}`}
            onClick={() => {
              playClickSound();
              setCurrent(k);
            }}
          >
            {nodes[k]?.s}
          </button>
        ))}
      </div>

      <div
        id="mindmapHost"
        className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-md p-4 sm:p-5 space-y-4"
      >
        {/* SVG Mindmap Graph */}
        <SvgFullScreenViewer
          title="Carte Mentale des Concepts Clés"
          subtitle={
            node?.label
              ? `Notion sélectionnée : ${node.label} (${node.a})`
              : "Explorez les liens conceptuels"
          }
          buttonLabel="Plein écran (Carte)"
          activeInfo={
            node ? (
              <div className="space-y-1">
                <div className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                  <span>{node.label}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    Axe : {node.a}
                  </span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  {node.links.length > 0
                    ? `Ramifications directes : ${node.links
                        .map((l) => nodes[l.to]?.s)
                        .filter(Boolean)
                        .join(" · ")}`
                    : "Aucune ramification sortante"}
                </div>
              </div>
            ) : undefined
          }
        >
          <MindmapSvgGraph
            nodes={nodes}
            keys={keys}
            current={current}
            neighbours={neighbours}
            onSelectNode={setCurrent}
          />
        </SvgFullScreenViewer>

        {/* Selected Node Detailed Inspector Card */}
        <MindmapNodeInspector
          node={node}
          nodes={nodes}
          incoming={incoming}
          matchedSchema={matchedSchema}
          onSelectNode={setCurrent}
        />
      </div>
    </div>
  );
}
