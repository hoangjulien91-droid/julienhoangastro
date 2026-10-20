"use client";

import { useMemo, useState } from "react";
import type { MindmapNodes } from "@/lib/pst/types";
import { Palette, Eye, Sparkles, ArrowRight } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface MindmapProps {
  nodes: MindmapNodes;
  hint: string;
  defaultKey?: string;
}

function findSchemaForNode(label: string, category: string): string | null {
  const hay = (label + " " + category).toLowerCase();
  if (hay.includes("leplat") || (hay.includes("tâche") && hay.includes("régulation")) || (hay.includes("tâche") && hay.includes("activité"))) return "schema-leplat-regulation";
  if (hay.includes("clot") || hay.includes("genre") || hay.includes("réel")) return "schema-clot-activite-reelle";
  if (hay.includes("dejours") || hay.includes("reconnaissance") || hay.includes("souffrance") || hay.includes("psychodynamique")) return "schema-dejours-reconnaissance";
  if (hay.includes("bourdieu") || hay.includes("habitus") || hay.includes("capital") || hay.includes("champ")) return "schema-bourdieu-algorithme";
  if (hay.includes("habermas") || hay.includes("communication") || hay.includes("validité") || hay.includes("délibération")) return "schema-habermas-validite";
  if (hay.includes("honneth") || hay.includes("mépris") || hay.includes("sphères")) return "schema-honneth-spheres";
  if (hay.includes("bühler") || hay.includes("buhler") || hay.includes("organon")) return "schema-buhler-organon";
  if (hay.includes("iod") || hay.includes("valls") || hay.includes("castra") || hay.includes("insertion")) return "schema-valls-iod";
  if (hay.includes("dubar") || hay.includes("transaction") || hay.includes("biographique")) return "schema-dubar-double-transaction";
  if (hay.includes("sainsaulieu") || hay.includes("culture") || hay.includes("fusionnel") || hay.includes("négociateur")) return "schema-sainsaulieu-matrice";
  if (hay.includes("castel") || hay.includes("désaffiliation") || hay.includes("vulnérabilité")) return "schema-castel-desaffiliation";
  return null;
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

      <div id="mindmapHost" className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-md p-4 sm:p-5 space-y-4">
        {/* SVG Mindmap Graph */}
        <div className="w-full overflow-x-auto scrollbar-none rounded-2xl bg-slate-950 p-2 sm:p-4 border border-slate-800 shadow-inner">
          <svg
            className="mm-graph min-w-[500px] sm:min-w-full"
            viewBox="0 0 760 560"
            style={{ display: "block", width: "100%", height: 340 }}
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
                  className={`mm-node${dim ? " mm-dim" : ""}`}
                  onClick={() => {
                    playClickSound();
                    setCurrent(k);
                  }}
                  style={{ cursor: "pointer", transition: "all 0.2s" }}
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

        {/* Selected Node Detailed Inspector Card */}
        <div
          className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3"
          style={{ borderLeft: `5px solid var(--${node.a})` }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h4 className="font-black text-base text-slate-900 dark:text-slate-100 m-0">
                {node.label}
              </h4>
              <span className="text-[11px] font-mono text-slate-500 uppercase">
                Axe thématique : <b>{node.a}</b>
              </span>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-bold">
              {node.links.length} sortie(s) · {incoming.length} entrée(s)
            </span>
          </div>

          {/* Schema Bridge if matching */}
          {matchedSchema && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-indigo-500/10 border border-cyan-500/30 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="size-7 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  🎨
                </span>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                    Schéma Vectoriel SVG Disponible
                  </div>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 m-0">
                    Modèle d&apos;examen 18/20 correspondant à cette notion
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("pst:open-schemas", {
                      detail: { schemaId: matchedSchema },
                    }),
                  );
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Eye className="size-3.5" />
                <span>Voir le Schéma SVG</span>
              </button>
            </div>
          )}

          {/* Outgoing Links */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Liens &amp; Ramifications depuis ce concept :
            </span>
            <div className="flex flex-col gap-1.5">
              {node.links.map((l, li) => {
                const target = nodes[l.to];
                if (!target) return null;
                return (
                  <div
                    key={li}
                    className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs"
                  >
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                      {l.rel}
                    </span>
                    <button
                      type="button"
                      className="px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1"
                      style={{
                        borderColor: `var(--${target.a})`,
                        color: `var(--${target.a})`,
                      }}
                      onClick={() => {
                        playClickSound();
                        setCurrent(l.to);
                      }}
                    >
                      <span>{target.label}</span>
                      <ArrowRight className="size-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Incoming Links */}
          {incoming.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Concepts parents orientés vers cette notion :
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {incoming.map((k) => {
                  const inNode = nodes[k];
                  if (!inNode) return null;
                  return (
                    <button
                      key={k}
                      type="button"
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer"
                      style={{
                        borderColor: `var(--${inNode.a})`,
                        color: `var(--${inNode.a})`,
                      }}
                      onClick={() => {
                        playClickSound();
                        setCurrent(k);
                      }}
                    >
                      ➔ {inNode.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
