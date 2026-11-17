"use client";

import React, { useState } from "react";

export function VygotskiPiagetDiagram() {
  const [activeStep, setActiveStep] = useState<string>("zpd");

  const stepsInfo: Record<
    string,
    {
      titre: string;
      desc: string;
      formule: string;
      containerClass: string;
      badgeClass: string;
    }
  > = {
    piaget: {
      titre: "Trajectoire selon Jean Piaget (Constructivisme cognitif)",
      desc: "Pour Piaget, la pensée précède et gouverne le langage. L'enfant commence par une pensée autistique/égocentrique (incommunicable). Le langage égocentrique n'est qu'un accompagnement asocial de l'action. Il s'étiole et disparaît progressivement avec la socialisation et la décentration cognitive.",
      formule:
        "Pensée égocentrique ➔ Langage égocentrique (asocial, voué à disparaître) ➔ Langage socialisé",
      containerClass:
        "bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800/60 shadow-xs",
      badgeClass:
        "bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/60",
    },
    vygotski: {
      titre: "Trajectoire selon Lev Vygotski (Théorie historico-culturelle)",
      desc: "Renversement complet : le langage est originellement social et relationnel. Face à un obstacle (ex. l'expérience des crayons de couleur), l'enfant extériorise sa pensée à voix haute pour résoudre le problème. Ce langage égocentrique ne disparaît JAMAIS : il s'intériorise pour devenir le langage intérieur (la pensée verbale silencieuse).",
      formule:
        "Langage social (relationnel) ➔ Langage égocentrique (outil de résolution) ➔ Langage intérieur (pensée)",
      containerClass:
        "bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800/60 shadow-xs",
      badgeClass:
        "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700/60",
    },
    zpd: {
      titre: "La Zone Proximale de Développement (ZPD) de Vygotski",
      desc: "Écart fécond entre le niveau de développement actuel (ce que l'individu sait résoudre seul en autonomie) et le niveau de développement potentiel (ce qu'il peut accomplir guidé par un tuteur ou en coopération avec des pairs plus compétents). C'est le lieu même où opèrent les dispositifs cliniques au Cnam !",
      formule:
        "Développement Actuel ➔ [ Zone Proximale de Développement (Médiation Sociale) ] ➔ Développement Potentiel",
      containerClass:
        "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/60 shadow-xs",
      badgeClass:
        "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700/60",
    },
  };

  const cur = stepsInfo[activeStep] || stepsInfo.vygotski;

  return (
    <div className="w-full space-y-4">
      <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-3 sm:p-5 overflow-x-auto scrollbar-none">
        <svg
          viewBox="0 0 920 460"
          className="w-full min-w-[700px] h-auto font-sans select-none"
        >
          {/* PANNEAU HAUT : PIAGET VS VYGOTSKI */}
          <rect
            x="20"
            y="20"
            width="880"
            height="230"
            rx="16"
            className="fill-slate-900/50 stroke-slate-800"
          />
          <text
            x="40"
            y="50"
            className="fill-white font-bold text-sm uppercase tracking-wider"
          >
            I. TRAJECTOIRES DU LANGAGE ÉGOCENTRIQUE : PIAGET VS VYGOTSKI
          </text>

          {/* LIGNE PIAGET */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.005]"
            onClick={() => setActiveStep("piaget")}
          >
            <rect
              x="40"
              y="70"
              width="840"
              height="75"
              rx="12"
              className={`fill-amber-950/30 stroke-amber-500/60 ${
                activeStep === "piaget" ? "stroke-[2.5px] fill-amber-950/50" : "stroke-1"
              }`}
            />
            <text x="60" y="100" className="fill-amber-300 font-bold text-xs">
              JEAN PIAGET (1923)
            </text>
            <text x="60" y="125" className="fill-slate-300 text-xs font-mono">
              Pensée égocentrique ➔ [ Langage égocentrique asocial ] ➔ Élimination ➔ Langage socialisé
            </text>
            <circle cx="840" cy="107" r="12" className="fill-amber-600/40" />
            <text
              x="840"
              y="112"
              textAnchor="middle"
              className="fill-amber-200 text-xs font-bold"
            >
              ✕
            </text>
          </g>

          {/* LIGNE VYGOTSKI */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.005]"
            onClick={() => setActiveStep("vygotski")}
          >
            <rect
              x="40"
              y="160"
              width="840"
              height="75"
              rx="12"
              className={`fill-indigo-950/30 stroke-indigo-500/60 ${
                activeStep === "vygotski" ? "stroke-[2.5px] fill-indigo-950/50" : "stroke-1"
              }`}
            />
            <text x="60" y="190" className="fill-indigo-300 font-bold text-xs">
              LEV VYGOTSKI (1934)
            </text>
            <text x="60" y="215" className="fill-slate-300 text-xs font-mono">
              Langage social (relationnel) ➔ [ Langage égocentrique (résolution) ] ➔ Intériorisation ➔ Langage intérieur (pensée)
            </text>
            <circle cx="840" cy="197" r="12" className="fill-indigo-600/40" />
            <text
              x="840"
              y="201"
              textAnchor="middle"
              className="fill-indigo-200 text-xs font-bold"
            >
              ✓
            </text>
          </g>

          {/* PANNEAU BAS : ZONE PROXIMALE DE DÉVELOPPEMENT (ZPD) */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.005]"
            onClick={() => setActiveStep("zpd")}
          >
            <rect
              x="20"
              y="270"
              width="880"
              height="170"
              rx="16"
              className={`fill-emerald-950/20 stroke-emerald-500/50 ${
                activeStep === "zpd" ? "stroke-[2.5px] fill-emerald-950/40" : "stroke-1"
              }`}
            />
            <text
              x="40"
              y="300"
              className="fill-emerald-300 font-bold text-sm uppercase tracking-wider"
            >
              II. LA ZONE PROXIMALE DE DÉVELOPPEMENT (ZPD) &amp; MÉDIATION SÉMIOTIQUE
            </text>

            {/* TROIS CERCLES / BOITES EMBÔITÉES */}
            {/* Zone actuelle */}
            <rect
              x="50"
              y="325"
              width="230"
              height="85"
              rx="10"
              className="fill-slate-900 stroke-slate-700"
            />
            <text x="70" y="355" className="fill-slate-200 font-bold text-xs">
              1. Développement Actuel
            </text>
            <text x="70" y="375" className="fill-slate-400 text-[11px]">
              Ce que le sujet sait
            </text>
            <text x="70" y="392" className="fill-slate-400 text-[11px]">
              accomplir SEUL en autonomie
            </text>

            {/* Flèche vers ZPD */}
            <path
              d="M 290 367 L 325 367"
              className="stroke-emerald-400 stroke-2"
              markerEnd="url(#arrow)"
            />

            {/* ZPD au centre */}
            <rect
              x="335"
              y="325"
              width="310"
              height="85"
              rx="10"
              className="fill-emerald-950/80 stroke-emerald-400 stroke-2"
            />
            <text x="355" y="355" className="fill-emerald-300 font-bold text-xs">
              2. Zone Proximale (ZPD)
            </text>
            <text x="355" y="375" className="fill-emerald-100 text-[11px] font-semibold">
              Médiation par autrui (tuteur, pair, instrument)
            </text>
            <text x="355" y="392" className="fill-emerald-200/80 text-[11px]">
              Dialogue clinique · Conflit de critères · Élingage
            </text>

            {/* Flèche vers Potentiel */}
            <path
              d="M 655 367 L 690 367"
              className="stroke-emerald-400 stroke-2"
            />

            {/* Zone potentielle */}
            <rect
              x="700"
              y="325"
              width="180"
              height="85"
              rx="10"
              className="fill-slate-900 stroke-slate-700"
            />
            <text x="720" y="355" className="fill-slate-200 font-bold text-xs">
              3. Potentiel Futur
            </text>
            <text x="720" y="375" className="fill-slate-400 text-[11px]">
              Nouvelles fonctions
            </text>
            <text x="720" y="392" className="fill-slate-400 text-[11px]">
              psychiques stabilisées
            </text>
          </g>
        </svg>
      </div>

      {/* DÉTAIL DYNAMIQUE */}
      {cur && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-2.5 transition-all ${cur.containerClass}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/5 dark:border-white/10">
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white m-0 tracking-tight">
              {cur.titre}
            </h4>
          </div>
          <div
            className={`inline-block px-3 py-1.5 rounded-xl font-mono text-xs font-bold border ${cur.badgeClass}`}
          >
            {cur.formule}
          </div>
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-xs sm:text-sm m-0">
            {cur.desc}
          </p>
        </div>
      )}
    </div>
  );
}
