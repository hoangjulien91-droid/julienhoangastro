"use client";

import type { MindmapNode, MindmapNodes } from "@/lib/pst/types";
import { ArrowRight, Eye } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface MindmapNodeInspectorProps {
  node: MindmapNode;
  nodes: MindmapNodes;
  incoming: string[];
  matchedSchema: string | null;
  onSelectNode: (key: string) => void;
}

export function MindmapNodeInspector({
  node,
  nodes,
  incoming,
  matchedSchema,
  onSelectNode,
}: MindmapNodeInspectorProps) {
  return (
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
                    onSelectNode(l.to);
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
                    onSelectNode(k);
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
  );
}
