"use client";

import React, { useState } from "react";
import { Sparkles, BookOpen } from "lucide-react";

export function GolseFonctionsPenseeDiagram() {
  const [activeFct, setActiveFct] = useState<number>(1);

  const fcts = [
    {
      num: 1,
      titre: "1. Fonction de Pare-excitation & Contenance",
      auteurs: "S. Freud (1920) · D.W. Winnicott (holding) · W.R. Bion (1962)",
      concepts: [
        "Appareil à penser les pensées (Bion)",
        "Éléments bêta ➔ alpha",
        "Holding maternel",
        "Membrane pare-excitante (Freud)",
      ],
      desc: "Le nouveau-né est submergé par un flux d'excitations pulsionnelles et sensorielles sans frontière entre dedans et dehors. Le parent offre une contenance psychique en lui prêtant un « appareil à penser les pensées » (Bion : métabolisation des éléments bêta bruts en éléments alpha pensables) jusqu'à ce que le bébé intériorise sa propre membrane pare-excitante.",
      cardStyle: {
        container:
          "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/60 shadow-xs",
        badge:
          "bg-rose-100 dark:bg-rose-900/50 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700/60",
        numBadge: "bg-rose-600 text-white",
        tag: "bg-rose-100/70 dark:bg-rose-900/30 text-rose-900 dark:text-rose-300 border-rose-200 dark:border-rose-800/40",
        strokeSel: "stroke-rose-400",
        fillBadge: "#e11d48",
      },
    },
    {
      num: 2,
      titre: "2. Fonction de Réparation Symbolique",
      auteurs: "S. Freud (1920, Au-delà du principe de plaisir) · Jeu du Fort/Da",
      concepts: [
        "Jeu de la bobine (Fort/Da)",
        "Symbolisation de l'absence",
        "Passivité subie ➔ Maîtrise active",
        "Pulsion de mort & répétition",
      ],
      desc: "La pensée humaine permet de symboliser l'absence et de surmonter la détresse de la perte. Freud l'illustre par le jeu de la bobine chez son petit-fils Ernst (18 mois) : en lançant la bobine ('Fort' = partie) et en la ramenant ('Da' = voilà), l'enfant passe de la passivité d'un abandon subi à la maîtrise active de l'absence maternelle.",
      cardStyle: {
        container:
          "bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800/60 shadow-xs",
        badge:
          "bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/60",
        numBadge: "bg-amber-600 text-white",
        tag: "bg-amber-100/70 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800/40",
        strokeSel: "stroke-amber-400",
        fillBadge: "#d97706",
      },
    },
    {
      num: 3,
      titre: "3. Fonction Narcissique & Continuité d'Existence",
      auteurs: "D.W. Winnicott · B. Golse (1999)",
      concepts: [
        "Going-on-being (continuité d'être)",
        "Permanence du Soi",
        "Sécurité ontologique",
        "Capacité d'être seul (solitude habitée)",
      ],
      desc: "La pensée assure au sujet le sentiment rassurant de la continuité d'être (going-on-being). Penser permet de se sentir exister dans le temps, même dans les moments de solitude ou de rupture d'activité.",
      cardStyle: {
        container:
          "bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800/60 shadow-xs",
        badge:
          "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700/60",
        numBadge: "bg-indigo-600 text-white",
        tag: "bg-indigo-100/70 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/40",
        strokeSel: "stroke-indigo-400",
        fillBadge: "#4f46e5",
      },
    },
    {
      num: 4,
      titre: "4. Accès à la Tiercéité & Intersubjectivité",
      auteurs: "B. Golse · Enveloppe monadique ➔ Enveloppe triadique",
      concepts: [
        "Enveloppe triadique",
        "Tiers séparateur (père / loi / parole)",
        "Intersubjectivité & altérité",
        "Reconnaissance d'autrui comme sujet",
      ],
      desc: "Le passage à la communication verbale suppose la reconnaissance de l'autre comme sujet distinct. L'enfant s'arrache à la fusion mère-bébé (enveloppe monadique) grâce à l'introduction d'un tiers séparateur (le père, la parole, la règle), accédant ainsi à l'intersubjectivité et au dialogue.",
      cardStyle: {
        container:
          "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60 shadow-xs",
        badge:
          "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700/60",
        numBadge: "bg-emerald-600 text-white",
        tag: "bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40",
        strokeSel: "stroke-emerald-400",
        fillBadge: "#059669",
      },
    },
  ];

  const cur = fcts.find((f) => f.num === activeFct) || fcts[0];

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-3 sm:p-5 overflow-x-auto scrollbar-none">
        <svg
          viewBox="0 0 920 380"
          className="w-full min-w-[700px] h-auto font-sans select-none"
        >
          {fcts.map((f, idx) => {
            const x = 30 + idx * 220;
            const isSel = f.num === activeFct;
            const auts = f.auteurs.split("·");
            return (
              <g
                key={f.num}
                className="cursor-pointer transition-transform hover:scale-[1.01]"
                onClick={() => setActiveFct(f.num)}
              >
                <rect
                  x={x}
                  y={40}
                  width="205"
                  height="300"
                  rx="14"
                  className={`transition-all ${
                    isSel
                      ? `fill-slate-900 ${f.cardStyle.strokeSel} stroke-2 shadow-xl`
                      : "fill-slate-950/80 stroke-slate-800 hover:stroke-slate-700 stroke-1"
                  }`}
                />
                <circle
                  cx={x + 35}
                  cy="75"
                  r="16"
                  fill={isSel ? f.cardStyle.fillBadge : "#334155"}
                />
                <text
                  x={x + 35}
                  y="81"
                  textAnchor="middle"
                  className="fill-white font-bold text-xs font-mono"
                >
                  {f.num}
                </text>
                <text
                  x={x + 20}
                  y="120"
                  className="fill-white font-bold text-xs max-w-[170px]"
                >
                  {f.titre.replace(/^\d+\.\s*/, "").split("&")[0]}
                </text>
                {f.titre.includes("&") && (
                  <text
                    x={x + 20}
                    y="138"
                    className="fill-white font-bold text-xs"
                  >
                    &amp; {f.titre.split("&")[1]}
                  </text>
                )}

                <line
                  x1={x + 20}
                  y1="155"
                  x2={x + 185}
                  y2="155"
                  className="stroke-slate-800"
                />

                <text
                  x={x + 20}
                  y="178"
                  className="fill-amber-400 text-[10px] font-mono font-semibold"
                >
                  Auteurs de référence :
                </text>
                <text
                  x={x + 20}
                  y="198"
                  className="fill-slate-200 text-[11px] leading-tight font-medium"
                >
                  {auts[0]?.trim()}
                </text>
                {auts[1] && (
                  <text
                    x={x + 20}
                    y="216"
                    className="fill-slate-300 text-[10px] leading-tight"
                  >
                    · {auts[1].trim()}
                  </text>
                )}
                {auts[2] && (
                  <text
                    x={x + 20}
                    y="234"
                    className="fill-slate-400 text-[10px] leading-tight"
                  >
                    · {auts[2].trim()}
                  </text>
                )}

                <rect
                  x={x + 20}
                  y="280"
                  width="165"
                  height="35"
                  rx="8"
                  className={isSel ? "fill-slate-800" : "fill-slate-900"}
                  stroke={isSel ? f.cardStyle.fillBadge : "#334155"}
                  strokeWidth="1"
                />
                <text
                  x={x + 102}
                  y="302"
                  textAnchor="middle"
                  className={`text-[11px] font-bold ${
                    isSel ? "fill-white" : "fill-slate-400"
                  }`}
                >
                  {isSel ? "✓ Actif (affiché)" : "Cliquer pour détails"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {cur && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-3 transition-all ${cur.cardStyle.container}`}
        >
          {/* Header row: Number badge + Title + Authors Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className={`size-7 rounded-xl flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-xs ${cur.cardStyle.numBadge}`}
              >
                {cur.num}
              </span>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white m-0 tracking-tight">
                {cur.titre}
              </h4>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border shrink-0 ${cur.cardStyle.badge}`}
            >
              <BookOpen className="size-3.5 shrink-0 opacity-80" />
              <span>{cur.auteurs}</span>
            </span>
          </div>

          {/* Core Description - High Contrast Accessible typography */}
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-xs sm:text-sm m-0 font-normal">
            {cur.desc}
          </p>

          {/* Concepts repères pour copie d'examen Cnam */}
          {cur.concepts && cur.concepts.length > 0 && (
            <div className="pt-1 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1">
                <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
                <span>Repères Cnam :</span>
              </span>
              {cur.concepts.map((c) => (
                <span
                  key={c}
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${cur.cardStyle.tag}`}
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
