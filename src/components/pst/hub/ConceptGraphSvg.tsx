"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/components/common/Navigation";
import { Sparkles } from "lucide-react";
import { INDEX, MODULES } from "@/lib/pst/hub-stats";
import { PONTS } from "@/lib/pst/data/ponts";
import { SvgFullScreenViewer } from "@/components/pst/visuals/SvgFullScreenViewer";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

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
    <div className="card graph p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 inline-flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="size-3 text-cyan-600 dark:text-cyan-400" />
          <span>Ponts Inter-Modules &amp; Circulation des Notions</span>
        </span>
        <span className="text-[10px] font-mono text-muted-foreground">
          {PONTS.length} concepts partagés
        </span>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
        Clique un concept ci-dessous pour visualiser dans quels modules il circule et sous quel angle clinique ou sociologique.
      </p>
      <SvgFullScreenViewer
        title="Graphe des Ponts & Concepts Partagés"
        subtitle={concept ? `Concept : ${concept.c}` : "Circulation des notions entre les 5 UE"}
        buttonLabel="Plein écran (Graphe)"
        activeInfo={
          concept ? (
            <div className="space-y-1">
              <div className="font-bold text-sm text-cyan-300">
                {concept.c}
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                Circule dans : {linkedIds.map((k) => `${k.toUpperCase()} (${concept.m[k]})`).join(" · ")}
              </div>
            </div>
          ) : undefined
        }
      >
        <svg
          id="gsvg"
          viewBox="0 0 760 300"
          role="img"
          aria-label="Graphe des concepts partagés"
          className="w-full h-auto"
        >
          {order.map((id) => (
            <g
              className="gnode cursor-pointer transition-transform hover:opacity-85"
              key={id}
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                router.push(`/pst/${id.replace("pst", "")}/`);
              }}
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
      </SvgFullScreenViewer>
      <div className="flex flex-wrap gap-1.5 pt-1" id="gconcepts">
        {PONTS.map((p, i) => (
          <button
            key={p.c}
            type="button"
            aria-pressed={i === selected}
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setSelected(i);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer border ${
              i === selected
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-xs font-bold"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700"
            }`}
          >
            {p.c}
          </button>
        ))}
      </div>
    </div>
  );
}
