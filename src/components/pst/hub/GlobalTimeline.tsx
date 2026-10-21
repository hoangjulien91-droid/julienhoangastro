"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { GLOBAL_ERAS } from "@/lib/pst/data/global-eras";

export function GlobalTimeline() {
  const [activeKey, setActiveKey] = useState("era2");
  const era = GLOBAL_ERAS.find((e) => e.key === activeKey) ?? GLOBAL_ERAS[0];
  if (!era) return null;

  return (
    <div className="card p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs mb-6">
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 m-0">
        Parcourez la chronologie historique et l&apos;évolution conjointe des
        concepts théoriques du travail à travers tous les modules PST.
      </p>
      <div className="global-frise-axis" id="globalFriseAxis">
        {GLOBAL_ERAS.map((e) => (
          <button
            key={e.key}
            className={`global-frise-dot${e.key === activeKey ? " active" : ""}`}
            onClick={() => setActiveKey(e.key)}
          >
            <span className="yr">{e.year}</span>
            <span className="nm">{e.name}</span>
          </button>
        ))}
      </div>
      <div id="globalFriseHost" style={{ marginTop: 20 }}>
        <div
          className="schema"
          style={{ borderLeft: "4px solid var(--accent)", padding: "16px 20px" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
              <Clock className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Période Historique · {era.year}</span>
            </span>
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--accent)",
              marginBottom: 6,
            }}
          >
            {era.year} — {era.name}
          </div>
          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.5,
              margin: "0 0 16px",
              fontStyle: "italic",
              color: "var(--muted)",
            }}
          >
            {era.desc}
          </p>
          <div className="global-frise-cols">
            <div className="global-frise-col">
              <h4>PST106 / PST108</h4>
              <p
                style={{ fontSize: 12.5, lineHeight: 1.45, margin: 0 }}
                dangerouslySetInnerHTML={{
                  __html: era.pst106 || era.pst108 || "Non applicable",
                }}
              />
            </div>
            <div className="global-frise-col">
              <h4>PST120 / PST124</h4>
              <p
                style={{ fontSize: 12.5, lineHeight: 1.45, margin: 0 }}
                dangerouslySetInnerHTML={{
                  __html: era.pst120 || era.pst124 || "Non applicable",
                }}
              />
            </div>
            <div className="global-frise-col">
              <h4>PST123</h4>
              <p
                style={{ fontSize: 12.5, lineHeight: 1.45, margin: 0 }}
                dangerouslySetInnerHTML={{
                  __html: era.pst123 || "Non applicable",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
